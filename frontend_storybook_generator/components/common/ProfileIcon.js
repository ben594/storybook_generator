import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const ProfileIcon = ({ onPress, style }) => (
  <View style={[styles.wrapper, style]}>
    <TouchableOpacity style={styles.button} onPress={onPress}>
    <FontAwesome name="user" size={24} color="#5a8896" />
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

export default ProfileIcon;
