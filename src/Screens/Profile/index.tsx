import React from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native"

const ProfileScreen = () => {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View>
                    <Image
                        style={styles.photoStyle}
                        source={require('../../Assets/profile.png')}
                    />
                </View>
                <View style={styles.detailsContainer}>
                    <Text>Name: </Text>
                    <Text>Kartik </Text>
                </View>
                <View style={styles.detailsContainer}>
                    <Text>Email: </Text>
                    <Text>kchawla1995@gmail.com </Text>
                </View>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        marginTop: 20
    },
    photoStyle: {
        width: 150,
        height: 150,
        marginBottom: 100,
        borderRadius: 50,
        overflow: 'hidden',
        borderWidth: 3,
    },
    detailsContainer: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    }
});

export default ProfileScreen