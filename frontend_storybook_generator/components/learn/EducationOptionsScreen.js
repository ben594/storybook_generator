import React, { useState, useEffect, useContext, useCallback } from 'react';
import { TouchableOpacity, TextInput, View, StyleSheet, FlatList, Text, SafeAreaView, Modal } from 'react-native';
import axios from 'axios';

import BackButton from '../common/BackButton';
import UserProvider, { UserContext } from '../UserContext';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useFocusEffect } from '@react-navigation/native';

import { REACT_APP_BACKEND_URL } from '../BackendURL';

const EducationOptionsScreen = ({ route, navigation }) => {
  const { username } = useContext(UserContext);
  const [subject, setSubject] = useState("");
  const [age, setAge] = useState(-1);
  const [character, setCharacter] = useState('');
  const [topic, setTopic] = useState('');
  const [color, setColor] = useState('');
  const [creatingStory, setCreatingStory] = useState(false);

  useEffect(() => {
    setSubject(route.params.subject);
    setTopic(route.params.topic);
    setColor(route.params.color);
    setAge(route.params.age);
    setCharacter(route.params.character);
  }, []);

  // function to handle adding a new story
  const handleAddNewStory = async () => {
    // axios POST request to backend server to create and save the new story
    if (creatingStory) {
      return;
    }

    setCreatingStory(true)
    await axios.post(`${REACT_APP_BACKEND_URL}/create-story/education`, { username: username, age: age, mainCharacter: character, subject: subject, topic: topic })
      .then(async (response) => {
        setCreatingStory(false);
        const responseStoryData = response.data;
        const storyID = responseStoryData.storyID;
        const texts = responseStoryData.texts;
        const imageURLs = responseStoryData.images;
        await ScreenOrientation.unlockAsync();
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
        navigation.navigate('BookViewerScreen', {
          username: username,
          storyID: storyID,
          texts: texts,
          imageURLs: imageURLs,
          startPage: 0
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  const returnToCharacterScreen = () => {
    navigation.navigate('CharacterSelection', {
      subject: subject,
      color: color,
      topic: topic,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton style={styles.backButton} onPress={returnToCharacterScreen} />
      <View style={styles.menuContainer}>
        <Text style={styles.menuTitle}>Placeholder</Text>
      </View>
      <TouchableOpacity
        style={[styles.createButton, { backgroundColor: color }]}
        onPress={handleAddNewStory}
      >
        <Text style={styles.createButtonText}>
          Create
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
  menuContainer: {
    flex: 1,
    width: '100%',
    marginTop: 40,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  menuTitle: {
    padding: 25,
    fontSize: 35,
    fontWeight: 'bold',
    position: 'relative',
  },
  characterMenuContainer: {
    justifyContent: 'center',
    width: '70%',
    alignItems: 'center',
  },
  characterMenuText: {
    fontSize: 30,
    marginTop: 10,
    padding: 10,
    fontWeight: 'bold',
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    fontSize: 30,
    width: '100%',
  },
  createButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  createButtonText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    padding: 15
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: '10%',
    marginHorizontal: '5%',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.88)',
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
});

export default EducationOptionsScreen;
