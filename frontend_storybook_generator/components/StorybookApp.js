// StorybookApp.js
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { TextInput, Button, View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

import StoryIcon from './StoryIcon';
import CircularButton from './common/CircularButton';
import AddStory from './AddStory';
import UserProvider, { UserContext } from './UserContext';
import { REACT_APP_BACKEND_URL } from './BackendURL';
import ProfileIcon from './common/ProfileIcon';

const StorybookApp = ({ route, navigation }) => {
  const { username } = useContext(UserContext);
  const [storyData, setStoryData] = useState([]);
  // construct a modal for adding new stories
  const [isAddStoryModalVisible, setAddStoryModalVisible] = useState(false);

  // function to handle adding a new story
  const handleAddNewStory = async (age, character, setting, year) => {
    // axios POST request to backend server to create and save the new story
    await axios.post(`${REACT_APP_BACKEND_URL}/create-story`, { username: username, age: age, mainCharacter: character, setting: setting, year: year })
      .then(async (response) => {
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
        setAddStoryModalVisible(false); // hide the modal after submission
      })
      .catch(error => {
        console.error(error);
        setAddStoryModalVisible(false); // hide the modal after submission
      });
  };

  // get possible new books after creation
  useFocusEffect(
    useCallback(() => {
      // call backend api to get list of basic story info
      axios.get(`${REACT_APP_BACKEND_URL}/get-stories`, { params: { username: username } })
        .then(response => {
          const responseStoryData = response.data.storyInfo;
          let retrievedData = [];

          // loop through response data to get ids and titles of stories
          for (var i = 0; i < responseStoryData.length; i++) {
            const story = responseStoryData[i];
            const storyInfo = {
              id: story.storyID,
              title: story.title,
              imageURL: story.thumbnailURL
            };

            retrievedData.push(storyInfo);
          }

          setStoryData(retrievedData);
        })
        .catch(error => {
          console.error(error);
        });
    }, [])
  );

  // Function to handle story icon press
  const handlePress = async (storyID) => {
    try {
      // get full story data (text and image urls) from the database
      const response = await axios.get(`${REACT_APP_BACKEND_URL}/get-story`, { params: { storyID: storyID } });
      const responseStoryData = response.data.story;
      const texts = responseStoryData.texts;
      const imageURLs = responseStoryData.imageURLs;

      await ScreenOrientation.unlockAsync();
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);

      // Navigate to book viewer and pass the username, story id, texts, images
      navigation.navigate('BookViewerScreen', {
        username: username,
        storyID: storyID,
        texts: texts,
        imageURLs: imageURLs,
        startPage: 0
      });
    } catch (error) {
      console.error(error);
    }
  };

  const navigateToProfileScreen = () => {
    navigation.navigate('ProfileScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Story icons */}
      <Text style={styles.logo}> Aesop AI </Text>
      <CircularButton style={styles.addStoryButton} onPress={() => setAddStoryModalVisible(true)} />
      <ProfileIcon style={styles.profileButton} onPress={navigateToProfileScreen}/>
      <AddStory
        isVisible={isAddStoryModalVisible}
        onAddStory={handleAddNewStory}
        onClose={() => setAddStoryModalVisible(false)}
      />
      <View style={styles.storiesContainer}>
        <FlatList style={styles.FlatlistStyles} data={storyData}
          numColumns={2}
          renderItem={({ item }) =>
            <StoryIcon
              title={item.title}
              imageURL={item.imageURL}
              onPress={() => {
                handlePress(item.id)
              }}
            />
          }
          keyExtractor={(item) => item.id}
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
    flexGrow: 1,
  },
  logo: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 25,
  },
  storiesContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
    flexGrow: 1,
  },
  addStoryButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  profileButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    alignSelf: 'flex-end',
  },
});

export default StorybookApp;
