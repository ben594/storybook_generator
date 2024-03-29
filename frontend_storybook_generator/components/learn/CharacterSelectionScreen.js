import React, { useState, useEffect, useContext, useCallback } from 'react';
import { TouchableOpacity, TextInput, View, StyleSheet, FlatList, Text, SafeAreaView, Modal, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import axios from 'axios';
import UserProvider, { UserContext } from '../UserContext';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useFocusEffect } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

import BackButton from '../common/BackButton';
import { REACT_APP_BACKEND_URL } from '../BackendURL';

const CharacterSelectionScreen = ({ route, navigation }) => {
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
  }, []);

  const returnToTopicScreen = () => {
    navigation.navigate('SubjectScreen', {
      subject: subject,
      color: color
    });
  };

  const selectAge = (index) => {
    setAge(index + 1);
  }

  const continueToEducationOptions = () => {
    navigation.navigate('EducationOptions', {
      subject: subject,
      color: color,
      topic: topic,
      character: character,
      age: age,
    });
  }

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

  const ages = new Array(100).fill(0);
  for (var i = 0; i < 100; i++) {
    ages[i] = i + 1;
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <BackButton style={styles.backButton} onPress={returnToTopicScreen} />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.menuContainer}>
            <Text style={styles.menuTitle}>Choose a name and age for your character</Text>
            <View style={styles.characterMenuContainer}>
              <Text style={styles.characterMenuText}>
                Select your age
              </Text>
              <FlatList
                style={{ backgroundColor: 'white', borderRadius: 10 }}
                data={ages}
                horizontal
                keyExtractor={this._keyExtractor}
                renderItem={
                  ({ item, index }) => {
                    if (index + 1 === age) {
                      return (
                        <TouchableOpacity style={{ marginHorizontal: 10, backgroundColor: color, borderRadius: 5 }} onPress={() => selectAge(index)}><Text style={{ fontSize: 30, padding: 5, color: 'white' }}>{item}</Text></TouchableOpacity>
                      )
                    } else {
                      return (
                        <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={() => selectAge(index)}><Text style={{ fontSize: 30, padding: 5 }}>{item}</Text></TouchableOpacity>
                      )
                    }
                  }
                }

              />
              <Text style={styles.characterMenuText}>
                Your character
              </Text>
              <TextInput
                placeholder="Enter your character"
                value={character}
                onChangeText={setCharacter}
                style={styles.textInput}
                multiline={true}
                maxLength={100}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
        {/* Loading view */}
        {creatingStory && (
          <View style={styles.loadingView}>
            <LottieView source={require('../../assets/loading.json')} autoPlay loop style={styles.lottie} />
          </View>
        )}
      </KeyboardAvoidingView>
      <TouchableOpacity
        style={[styles.createButton, { backgroundColor: age > 0 && character != "" && !creatingStory ? color : 'grey' }]}
        onPress={handleAddNewStory}
        disabled={age < 0 || character == "" || creatingStory}
      >
        <Text style={styles.createButtonText}>
          Create story!
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
    marginTop: 70,
    alignItems: 'center',
  },
  backButton: {
    position: 'relative',
    top: '5%',
    left: 20,
  },
  menuTitle: {
    padding: 10,
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
  loadingView: {
    alignSelf: 'center',
  },
  lottie: {
    height: 75,
    width: 75,
  },
});

export default CharacterSelectionScreen;
