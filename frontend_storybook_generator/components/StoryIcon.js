// StoryIcon.js
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const StoryIcon = ({ title, onPress, imageURL }) => (
  <View>
    <TouchableOpacity style={styles.storyIcon} onPress={onPress}>
      <View style={styles.book}>
        <View style={styles.spine} />
        <LinearGradient
          // colors = {['#3f6d73', 'black', '#3f6d73', '#6b95a0', '#3f6d73']}
          colors={['#8a3c1a', 'black', '#8a3c1a', '#b55c35', '#8a3c1a']}
          start={[0, 0]} end={[1, 0]}
          locations={[0.0, 0.2, 0.3, 0.5, 1]}
          style={[styles.gradient, { width: 30 }]} />
        <LinearGradient
          // colors = {['#3f6d73', '#6b95a0','#3f6d73']}
          colors={['#8a3c1a', '#b55c35', '#8a3c1a']}
          start={[0, 0]} end={[1, 0]}
          locations={[0.0, 0.2, 0.5]}
          style={[styles.gradient, { height: '100%', left: 5 }]} />

        <Image
          style={styles.imageView}
          source={{ uri: imageURL }}
        />

        <LinearGradient
          // colors = {['#3f6d73', 'black']}
          colors={['#8a3c1a', 'black']}
          start={[0, 0]} end={[1, 0]}
          locations={[0.2, 1]}
          style={[styles.gradient, {
            height: '100%', width: 10, left: 110, position: 'absolute', borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0, borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
          }]} />
      </View>
      <Text style={styles.title}>
        {title}
      </Text>
    </TouchableOpacity>
  </View>
);

const width = 200

const styles = StyleSheet.create({
  storyIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    marginHorizontal: 30,
  },
  book: {
    width: width * 0.6,
    height: width * 0.9,
    backgroundColor: '#8a3c1a', // Cartoonish book cover color
    // backgroundColor: '#3f6d73', // Cartoonish book cover color
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,

    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 15, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10, // for Android shadow effect
  },
  spine: {
    position: 'absolute',
    width: 20,
    height: '95%',
    // backgroundColor: '#3f6d73', // Spine color
    backgroundColor: '#8a3c1a', // Spine color
    left: -10, // Adjust the position to simulate the book's depth
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  gradient: {
    position: 'absolute',
    width: 30,
    height: '95%',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    opacity: 0.7,
    left: -5, // Adjust the position to simulate the book's depth
    borderLeftRadius: 3,
    borderRightRadius: 3,
  },
  title: {
    fontWeight: 'bold',
    fontFamily: 'Cochin',
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    paddingTop: 20,
    width: width * 0.6
  },
  imageView: {
    height: width * 0.75,
    width: '70%'
  },
});

export default StoryIcon;
