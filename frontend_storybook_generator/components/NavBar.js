// NavBar.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Button from './Button';

const NavBar = () => (
  <View style={styles.navBar}>
    <Button text={"Home"}/>
    <Button text={"Search"}/>
    <Button text={"Settings"}/>
  </View>
);

const styles = StyleSheet.create({
  navBar: {
    // alignSelf: 'end',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#DDD',
  },
});

export default NavBar;
