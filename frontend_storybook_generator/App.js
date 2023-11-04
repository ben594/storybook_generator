import React, { useEffect } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import StorybookApp from './components/StorybookApp';

async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
}

export default function App() {
  useEffect(() => {
    changeScreenOrientation();
  }, []);

  return (
      <StorybookApp />
  )
}


const styles = StyleSheet.create({

});
