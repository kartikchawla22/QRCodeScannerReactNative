import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from '../../Screens/Home';
import ResultScreen from '../../Screens/Result';
import Scanner from '../../Screens/Scanner';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Stack = createStackNavigator()

const HomeStackNavigationDelegate = ({ navigation, route }: any) => {
    React.useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (routeName === "Scanner" || routeName === "Result") {
            navigation.setOptions({ tabBarStyle: { display: 'none' } });
        } else {
            navigation.setOptions({ tabBarStyle: { display: 'flex' } });
        }
    }, [navigation, route]);
    return (
        <SafeAreaProvider>
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen name='Home' component={HomeScreen} />
                <Stack.Screen name='Scanner' component={Scanner} options={{ title: "Scan Your NFT" }} />
                <Stack.Screen name='Result' component={ResultScreen} />
            </Stack.Navigator>
        </SafeAreaProvider>
    )
}
export default HomeStackNavigationDelegate