import React, { useState, useEffect, useContext, useCallback } from 'react';
import { TouchableOpacity, Button, View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';
import axios from 'axios';


import StoryIcon from '../StoryIcon';
import NavBar from '../NavBar';
import BackButton from '../common/BackButton';
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

  const returnToLearnScreen = () => {
    navigation.navigate('Learn');
  };

  const topicData = [
    'Age of Dinosaurs',
    'Ancient Egypt',
    'Ancient Rome',
    'The Revolutionary War',
    'Medieval Ages',
    'Mesopotamia'
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Story icons */}
      <Text style={styles.logo}> Aesop AI </Text>
      <BackButton style={styles.backButton} onPress={returnToLearnScreen} />
      <View style={styles.topicContainer}>
        <FlatList 
          // style={[styles.topicList]}
          data={topicData}
          numColumns={2}
          renderItem={({ item }) =>
            <TouchableOpacity style={styles.topicIcon}>
              <Text>
                {item}
              </Text>
            </TouchableOpacity>
          }
          keyExtractor={this._keyExtractor}
        />
      </View>
      <TouchableOpacity>
        <Text>
          Create Story
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ead8ca',
    justifyContent: 'space-between',
  },
  logo: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 25,
  },
  topicContainer: {
    flex: 1,
    height: '90%',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  topicIcon: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    marginHorizontal: '5%',
    borderRadius: 10,
    height: 100,
    width: '40%',
  }
});

export default SubjectScreen;
