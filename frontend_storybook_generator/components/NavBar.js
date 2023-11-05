// NavBar.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Button from './Button';

const NavBar = ({ navigation }) => (
  <View style={styles.navBar}>
    <Button onPress={() => navigation.goBack()} text={"Signout"}/>
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
    height: 20,
  },
});

export default NavBar;
