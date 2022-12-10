import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from '../../Screens/Home';
import ResultScreen from '../../Screens/Result';
import Scanner from '../../Screens/Scanner';
const Stack = createStackNavigator()

const HomeStackNavigationDelegate = () => {
    return (
        <SafeAreaProvider>
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen name='Home' component={HomeScreen} />
                <Stack.Screen name='Scanner' component={Scanner} />
                <Stack.Screen name='Result' component={ResultScreen} />
            </Stack.Navigator>
        </SafeAreaProvider>
    )
}
export default HomeStackNavigationDelegate