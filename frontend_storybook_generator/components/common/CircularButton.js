import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import {AntDesign} from '@expo/vector-icons'

const CircularButton = ({ onPress, style }) => (
  <View style={[styles.wrapper, style]}>
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <AntDesign name="pluscircle" size={28} color="#5a8896"/>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
  },
  button: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});

export default CircularButton;
