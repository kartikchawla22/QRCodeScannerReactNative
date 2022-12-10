import React, { useEffect, useState } from "react";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native"
import axios from 'axios';

const ResultScreen = ({ route, navigation }: any) => {
    const { data } = route.params
    const [nftData, setNftData] = useState<any>({ "item": "Apple watch", "SKU": 123123, "model": "7 Pro", "company": "Apple inc.", "id": 12 })
    useEffect(() => {
        const getData = async () => {
            try {
                const result = await axios.get(data)
                console.log(result.data);
                setNftData(result.data)
            } catch (error) {
                console.log(error);
            }
        }
        getData()
    }, [data])
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text>
                    Profuct Details
                </Text>
                {
                    nftData && nftData.id && (<View style={styles.details}>
                        <View style={styles.detailsContainer}>
                            <Text>Company: </Text>
                            <Text>{nftData.company} </Text>
                        </View>
                        <View style={styles.detailsContainer}>
                            <Text>Item: </Text>
                            <Text>{nftData.item} </Text>
                        </View>
                        <View style={styles.detailsContainer}>
                            <Text>SKU: </Text>
                            <Text>{nftData.SKU} </Text>
                        </View>
                    </View>)
                }


                <Button title="Go To Home" onPress={() => navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                })} />
            </View>
        </SafeAreaView >
    )
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        marginTop: 20
    },
    details: {
        display: "flex",
        justifyContent: "center",
        width: "100%",
        marginVertical: "10%"
    },
    detailsContainer: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    }
})
export default ResultScreen