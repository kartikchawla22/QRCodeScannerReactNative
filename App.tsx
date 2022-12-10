/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import * as DBR from 'vision-camera-dynamsoft-barcode-reader';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Scanner from './src/Screens/Scanner';
import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/Screens/Home';
import ProfileScreen from './src/Screens/Profile';
import HomeStackNavigationDelegate from './src/Delegates/HomeRouting';
import Icon from 'react-native-vector-icons/AntDesign';


const Tab = createBottomTabNavigator();

const licensePart1 = "DLS2eyJoYW5kc2hha2VDb2RlIjoiMjAwMDAxLTE2NDk4"
const licensePart2 = "Mjk3OTI2MzUiLCJvcmdhbml6YXRpb25JRCI6IjIwMDAwM"
const licensePart3 = "SIsInNlc3Npb25QYXNzd29yZCI6IndTcGR6Vm05WDJrcEQ5YUoifQ=="
const App = () => {
  React.useEffect(() => {
    (async () => {
      await DBR.initLicense(`${licensePart1}${licensePart2}${licensePart3}`);
    })();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator initialRouteName='HomeRoutes' >
          <Tab.Screen name="HomeRoutes" component={HomeStackNavigationDelegate} options={{ headerShown: false, title: "Home", tabBarIcon: () => <Icon name="home" size={20} /> }} />
          <Tab.Screen name="profile" component={ProfileScreen} options={{ title: "Profile", tabBarIcon: () => <Icon name="profile" size={20} /> }} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
