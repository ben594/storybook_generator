// NavBar.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const NavBar = () => (
  <View style={styles.navBar}>
    <TouchableOpacity>
      <Text>Home</Text>
    </TouchableOpacity>
    <TouchableOpacity>
      <Text>Search</Text>
    </TouchableOpacity>
    <TouchableOpacity>
      <Text>Settings</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#DDD',
  },
});

export default NavBar;
