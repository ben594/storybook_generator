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
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  storyTitle: {
    fontSize: 16,
  },
});

export default StoryIcon;
