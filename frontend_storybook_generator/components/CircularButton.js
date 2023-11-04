// CircularButton.js
import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import {AntDesign} from '@expo/vector-icons'

const CircularButton = ({ onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <AntDesign name="pluscircle" size={24} color="grey"/>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    height: 30,
    width: 30,
    marginHorizontal: 5,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CircularButton;
