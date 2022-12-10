import { Button, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"

const HomeScreen = ({ navigation }: any) => {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.heading}>
                    Welcome to NFT Scanner
                </Text>
                <View style={styles.buttonContainer}>

                    <Button title="Scan NFT" onPress={() => navigation.navigate("Scanner")} />
                </View>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        marginTop: "10%"
    },
    heading: {
        fontSize: 20
    },
    buttonContainer: {
        marginTop: "10%"
    }
})
export default HomeScreen