import React, { useEffect, useState, useContext } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import StorybookApp from './components/StorybookApp';
import LoginScreen from './components/Login';
import BookViewer from './components/book_viewer/BookViewer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NativeScreenContainer } from 'react-native-screens';
import { LogBox } from 'react-native'; 

import UserProvider from './components/UserContext';
import TabNavigator from './components/TabNavigator';
import SubjectScreen from './components/learn/SubjectScreen';
import CharacterSelectionScreen from './components/learn/CharacterSelectionScreen';
import EducationOptionsScreen from './components/learn/EducationOptionsScreen';

const Tab = createBottomTabNavigator();

async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
}

export default function App() {
  const [username, setUsername] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    changeScreenOrientation();
    LogBox.ignoreAllLogs(true)
  }, []);


  const Stack = createNativeStackNavigator();

  return (
    <UserProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='LoginScreen' screenOptions={{ gestureEnabled: false }}>
        <Stack.Screen
          name='LoginScreen'
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='BookViewerScreen'
          component={BookViewer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='SubjectScreen'
          component={SubjectScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='CharacterSelection'
          component={CharacterSelectionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='EducationOptions'
          component={EducationOptionsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </UserProvider>
  );
}


const styles = StyleSheet.create({

});
