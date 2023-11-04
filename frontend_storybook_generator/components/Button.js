// Button.js
import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const Button = ({ text, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    width: 70,
    height: 30,
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 5,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white'
    // alignSelf: 'center'
  },
});

export default Button;
