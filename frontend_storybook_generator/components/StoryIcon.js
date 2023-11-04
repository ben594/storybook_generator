// StoryIcon.js
import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const StoryIcon = ({ title, onPress }) => (
  <TouchableOpacity style={styles.storyIcon} onPress={onPress}>
    <Text style={styles.storyTitle}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  storyIcon: {
    width: 70,
    height: 100,
    marginHorizontal: 20,
    marginVertical: 30,
    backgroundColor: 'black',
  },
  storyTitle: {
  },
});

export default StoryIcon;
