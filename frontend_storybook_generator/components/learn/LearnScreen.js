import React, { useState, useEffect, useContext, useCallback } from 'react';
import { TextInput, Button, View, StyleSheet, FlatList, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import NavBar from '../NavBar';
import UserProvider, { UserContext } from '../UserContext';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useFocusEffect } from '@react-navigation/native';

import SubjectBanner from './SubjectBanner';

const bannersData = [
  { title: 'Science', color: '#3f6570', description: 'Discover how the universe around us works!' },
  { title: 'History', color: '#FF6969', description: 'Learn about the civilizations, people, and events that shaped the world!' },
  { title: 'Geography', color: '#657d57', description: 'Travel the world to visit cities and natural wonders!' },
  { title: 'Vocabulary', color: '#ba7538', description: 'Create custom word lists to study and include in your stories!' },
];

const LearnScreen = ({ route, navigation }) => {
  const { username } = useContext(UserContext);
  const [storyData, setStoryData] = useState([]);
  // construct a modal for adding new stories
  const [bannerReset, setBannerReset] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Story icons */}
      <Text style={styles.logo}> Aesop AI </Text>
      <View style={styles.subjectContainer}>
        <FlatList 
          data={bannersData}
          numColumns={1}
          renderItem={({ item }) =>
            <TouchableOpacity
              style={[styles.subjectBanner, { backgroundColor: item.color }]}
              onPress={() => navigation.navigate('SubjectScreen', {subject: item.title.toLowerCase(), color: item.color})}
            >
              <Text style={styles.bannerTitle}>
                {item.title}
              </Text>
              <Text style={styles.bannerText}>
                {item.description}
              </Text>
            </TouchableOpacity>
          }
          keyExtractor={this._keyExtractor}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ead8ca',
    marginBottom: 80,
  },
  logo: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 25,
  },
  subjectContainer: {
    alignItems: 'center',
    paddingHorizontal: 10, 
    marginTop: 20,
    flexGrow: 1,
  },
  subjectBanner: {
    padding: 30,
    margin: 5,
    borderRadius: 15,
  },
  bannerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ead8ca',
  },
  bannerText: {
   fontSize: 22, 
   color: '#ead8ca',
  },
});

export default LearnScreen;
