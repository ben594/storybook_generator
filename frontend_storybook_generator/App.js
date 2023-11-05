import React, { useEffect, useState, useContext } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import StorybookApp from './components/StorybookApp';
import LoginScreen from './components/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeScreenContainer } from 'react-native-screens';
import AppLoader from './components/AppLoader';
import UserProvider from './components/UserContext';

async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
}

export default function App() {
  const [username, setUsername] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    changeScreenOrientation();
    // simulate a loading process
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds
  }, []);


  const Stack = createNativeStackNavigator();

  if (isLoading) {
    return <AppLoader />;
  }

  return (
    <UserProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='LoginScreen'>
        <Stack.Screen name='LoginScreen' component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen 
        name='StoryScreen' 
        component={StorybookApp} 
        options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
    </UserProvider>
  );
}


const styles = StyleSheet.create({

});
