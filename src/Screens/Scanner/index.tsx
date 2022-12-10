import * as React from 'react';
import { Text, Linking, Dimensions, SafeAreaView, TouchableOpacity, StyleSheet, View, Platform, Alert, Switch, BackHandler } from 'react-native';
import { DBRConfig, decode, TextResult } from 'vision-camera-dynamsoft-barcode-reader';
import * as REA from 'react-native-reanimated';
import { Camera, useCameraDevices, useFrameProcessor } from 'react-native-vision-camera';

import { Polygon, Text as SVGText, Svg, Rect } from 'react-native-svg';
// import ActionSheet from '@alessiocancian/react-native-actionsheet';
// import Clipboard from '@react-native-clipboard/clipboard';

let pressedResult: TextResult | undefined;

const Scanner = ({ navigation }: any) => {
    const mounted = REA.useSharedValue(true);
    const rotated = REA.useSharedValue(false);
    const [hasPermission, setHasPermission] = React.useState(false);
    const [barcodeResults, setBarcodeResults] = React.useState([] as TextResult[]);
    const [isActive, setIsActive] = React.useState(true);
    const [frameWidth, setFrameWidth] = React.useState(1280);
    const [frameHeight, setFrameHeight] = React.useState(720);
    const [torchEnabled, setTorchEnabled] = React.useState(false);

    const devices = useCameraDevices();
    const backCam = devices.back;

    let scanned = false;

    React.useEffect(() => {
        (async () => {
            const status = await Camera.requestCameraPermission();
            setHasPermission(status === 'authorized');
        })();
        const backAction = () => {
            setIsActive(false);
            navigation.goBack();
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);


    React.useEffect(() => {
        mounted.value = true; // to avoid the error: Can’t perform a React state update on an unmounted component.
        return () => { mounted.value = false };
    });

    const onBarCodeDetected = (results: TextResult[]) => {

        if (scanned == false) {
            setIsActive(false);
            scanned = true;
            navigation.reset({
                index: 0,
                routes: [{ name: 'Result', params: { data: results[0].barcodeText } }],
            });
        }
    };

    const getPointsData = (lr: TextResult) => {
        var pointsData = lr.x1 + "," + lr.y1 + " ";
        pointsData = pointsData + lr.x2 + "," + lr.y2 + " ";
        pointsData = pointsData + lr.x3 + "," + lr.y3 + " ";
        pointsData = pointsData + lr.x4 + "," + lr.y4;
        return pointsData;
    }

    const getViewBox = () => {
        const frameSize = getFrameSize();
        const viewBox = "0 0 " + frameSize[0] + " " + frameSize[1];
        updateRotated();
        return viewBox;
    }

    const getFrameSize = (): number[] => {
        let width: number, height: number;
        if (HasRotation()) {
            width = frameHeight;
            height = frameWidth;
        } else {
            width = frameWidth;
            height = frameHeight;
        }
        return [width, height];
    }

    const HasRotation = () => {
        let value = false
        if (Platform.OS === 'android') {
            if (!(frameWidth > frameHeight && Dimensions.get('window').width > Dimensions.get('window').height)) {
                value = true;
            }
        }
        return value;
    }

    const updateRotated = () => {
        rotated.value = HasRotation();
    }

    const updateFrameSize = (width: number, height: number) => {
        if (mounted.value) {
            setFrameWidth(width);
            setFrameHeight(height);
        }
    }

    const onBarcodeScanned = (results: TextResult[]) => {
        if (mounted.value) {
            setBarcodeResults(results);
            if (results.length > 0) {
                onBarCodeDetected(results);
            }
        }
    }
    const format = React.useMemo(() => {
        const desiredWidth = 1280;
        const desiredHeight = 720;
        const selectedCam = backCam;
        if (selectedCam) {
            for (let index = 0; index < selectedCam.formats.length; index++) {
                const format = selectedCam.formats[index];
                if (format.videoWidth == desiredWidth && format.videoHeight == desiredHeight) {
                    return format;
                }
            };
        }
        return undefined;
    }, [])
    const frameProcessor = useFrameProcessor((frame) => {
        'worklet'
        REA.runOnJS(updateFrameSize)(frame.width, frame.height);
        const config: DBRConfig = {};
        let settings;
        if (config.template) {
            settings = JSON.parse(config.template);
        } else {
            const template =
                `{
              "ImageParameter": {
                "Name": "Settings"
              },
              "Version": "3.0"
            }`;
            settings = JSON.parse(template);
        }
        settings["ImageParameter"]["RegionDefinitionNameArray"] = ["Settings"];
        settings["RegionDefinition"] = {
            "Left": 10,
            "Right": 90,
            "Top": 20,
            "Bottom": 65,
            "MeasuredByPercentage": 1,
            "Name": "Settings",
        };
        config.template = JSON.stringify(settings);

        const results: TextResult[] = decode(frame, config)
        REA.runOnJS(onBarcodeScanned)(results);
    }, [])
    return (<SafeAreaView style={styles.container}>
        {backCam != null &&
            hasPermission && (
                <>
                    <Camera
                        style={StyleSheet.absoluteFill}
                        device={backCam}
                        isActive={isActive}
                        format={format}
                        torch={torchEnabled ? "on" : "off"}
                        frameProcessor={frameProcessor}
                        frameProcessorFps={5}
                    />
                </>)}
        <Svg style={StyleSheet.absoluteFill} viewBox={getViewBox()}>

            <Rect
                x={0.1 * getFrameSize()[0]}
                y={0.2 * getFrameSize()[1]}
                width={0.8 * getFrameSize()[0]}
                height={0.45 * getFrameSize()[1]}
                strokeWidth="4"
                stroke="blue"
            />
            {barcodeResults.map((barcode, idx) => (
                <Polygon key={"poly-" + idx}
                    points={getPointsData(barcode)}
                    fill="lime"
                    stroke="green"
                    opacity="0.5"
                    strokeWidth="1"
                    onPress={() => {
                        setIsActive(false);
                        pressedResult = barcode;
                    }}
                />
            ))}
            {barcodeResults.map((barcode, idx) => (
                <SVGText key={"text-" + idx}
                    fill="white"
                    stroke="purple"
                    fontSize={getFrameSize()[0] / 400 * 20}
                    fontWeight="bold"
                    x={barcode.x1}
                    y={barcode.y1}
                >
                    {barcode.barcodeText}
                </SVGText>
            ))}
        </Svg>
        <View style={styles.control}>
            <View style={styles.switchContainer}>
                <Text style={styles.torchHeading}>Torch</Text>
                <Switch
                    style={{ alignSelf: "center" }}
                    trackColor={{ false: "#767577", true: "black" }}
                    thumbColor={torchEnabled ? "white" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={(newValue) => {
                        setTorchEnabled(newValue);
                    }}
                    value={torchEnabled}
                />
            </View>
        </View>

    </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    barcodeText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    toggleCameraStatusButton: {
        flex: 0.2,
        justifyContent: 'center',
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 5,
        padding: 8,
        margin: 5,
    },
    control: {
        flexDirection: "row",
        height: "15%",
        width: "100%",
        alignSelf: "center",
        bottom: 0,
        position: "absolute",
        borderColor: "white",
        borderWidth: 0.1,
        backgroundColor: "rgba(255,255,255,0.2)",
        alignItems: 'center',
        display: "flex",
        justifyContent: "center"
    },
    switchContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    torchHeading: {
        color: "white"
    }
});
export default Scanner