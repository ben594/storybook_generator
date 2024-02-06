import React, { useState, useEffect, useContext, useCallback } from 'react';
import { TextInput, Button, View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';
import StoryIcon from '../StoryIcon';
import NavBar from '../NavBar';
import CircularButton from '../CircularButton';
import axios from 'axios';
import AddStory from '../AddStory';
import UserProvider, { UserContext } from '../UserContext';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useFocusEffect } from '@react-navigation/native';

import { REACT_APP_BACKEND_URL } from '../BackendURL';

const SubjectScreen = ({ route, navigation }) => {
  const { username } = useContext(UserContext);
  const [subject, setSubject] = useState("");

  useFocusEffect(
    useCallback(() => {
      // Function to lock the orientation
      const lockOrientation = async () => {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
      };

      lockOrientation();

      // Function to unlock the orientation when the component is unmounted or loses focus
      return () => {
        ScreenOrientation.unlockAsync();
      };
    }, [])
  );

  useEffect(() => {
    setSubject(route.params.subject);
  }, []);

  // function to handle adding a new story
  const handleAddNewStory = async (age, character, setting, year) => {
    // axios POST request to backend server to create and save the new story
    await axios.post(`${REACT_APP_BACKEND_URL}/create-story`, { username: username, age: age, mainCharacter: character, setting: setting, year: year })
      .then((response) => {
        const responseStoryData = response.data;
        const storyID = responseStoryData.storyID;
        const texts = responseStoryData.texts;
        const imageURLs = responseStoryData.images;
        navigation.navigate('BookViewerScreen', {
          username: username,
          storyID: storyID,
          texts: texts,
          imageURLs: imageURLs,
          startPage: 0
        });
        setAddStoryModalVisible(false); // hide the modal after submission
      })
      .catch(error => {
        console.error(error);
        setAddStoryModalVisible(false); // hide the modal after submission
      });
  };

  const bannersData = [
    { title: 'Science', color: '#5a8896', description: 'This banner is about science.' },
    { title: 'History', color: '#FF6969', description: 'This banner is about history.' },
    { title: 'Geography', color: '#99A98F', description: 'This banner is about geography.' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Story icons */}
      <Text style={styles.logo}> Aesop AI </Text>
      <View style={styles.subjectContainer}>
        <Text>{subject}</Text>
      </View>

      {/* Navigation Bar */}
      <NavBar navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ead8ca',
    justifyContent: 'space-between',
  },
  subjectList: {
    width: '90%',
  },
  logo: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 25,
  },
  subjectContainer: {
    height: '90%',
    width: '100%',
    alignItems: 'center',
  },
});

export default SubjectScreen;
