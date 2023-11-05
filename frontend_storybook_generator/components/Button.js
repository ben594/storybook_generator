// Button.js
import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const Button = ({ text, onPress, style }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 50,
    borderRadius: 30,
    marginHorizontal: 5,
    marginVertical: 5,
    backgroundColor: '#618289',
    alignItems: 'center',
    justifyContent: 'center',

  },
  text: {
    color: '#dfe7e8',
    fontWeight: 'bold',
    // alignSelf: 'center'
  },
});

export default Button;
