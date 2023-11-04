import React, { useEffect, useState } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import StorybookApp from './components/StorybookApp';
import LoginScreen from './components/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeScreenContainer } from 'react-native-screens';
import AppLoader from './components/AppLoader';


async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    changeScreenOrientation();
    // Simulate a loading process
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds
  }, []);


  const Stack = createNativeStackNavigator();

  if (isLoading) {
    return <AppLoader />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='LoginScreen'>
        <Stack.Screen name='LoginScreen' component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen 
        name='StoryScreen' 
        component={StorybookApp} 
        options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({

});
