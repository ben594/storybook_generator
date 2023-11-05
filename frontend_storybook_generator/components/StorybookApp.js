// StorybookApp.js
import React, { useState, useEffect, useContext } from 'react';
import { TextInput, Button, View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';
import StoryIcon from './StoryIcon'; 
import NavBar from './NavBar'; 
import CircularButton from './CircularButton';
import axios from 'axios';
import AddStory from './AddStory';
import UserProvider, { UserContext } from './UserContext';

// const username = req.body.username;
// const title = req.body.title;
// const age = req.body.age;
// const mainCharacter = req.body.mainCharacter;
// const keywords = req.body.keywords;
// const userPrompt = req.body.prompt;


const StorybookApp = ( { route, navigation } ) => {
  const { username } = useContext(UserContext);
  const [storyData, setStoryData] = useState([]);
  // construct a modal for adding new stories
  const [isAddStoryModalVisible, setAddStoryModalVisible] = useState(false);

  // function to handle adding a new story
  const handleAddNewStory = (age, character, setting, year) => {
    // logic to send the new story inputs to the backend or to add it to the local state
    console.log("Create story pressed");
    // axios POST request to backend server to save the new story
    // axios.post('https://storybookaiserver.azurewebsites.net/createStory', { username: username })
    // .then(response => {
    //   if (response.data.loginStatus == true) {
    //       setUsername(state.username); // Update the context value
    //       navigation.navigate('StoryScreen', { username: username });
    //   } else {
    //     // TODO, update state to reflect username not found
    //     setState({ ...state, loginError: response.data.errorMessage });
    //   }
    // })
    // .catch(error => {
    //   // Handle exceptions
    //   setState({ ...state, loginError: error.message });
    // });
    setAddStoryModalVisible(false); // hhde the modal after submission
  };

  // run this when this page first renders
  useEffect(() => {
    // call backend api to get list of basic story info
    axios.get(`https://storybookaiserver.azurewebsites.net/get-stories`, { params: { username: username } })
    .then(response => {
      const responseStoryData = response.data.storyInfo;
      let retrievedData = [];

      // loop through response data to get ids and titles of stories
      for (var i = 0; i < responseStoryData.length; i++) {
        const story = responseStoryData[i];
        const storyInfo = {
          id: story.storyID,
          title: story.title
        };

        retrievedData.push(storyInfo);
      }

      setStoryData(retrievedData);
    })
    .catch(error => {
      console.error(error);
    });
  }, []);

  // Function to handle story icon press
  const handlePress = (storyID) => {
    console.log(`Open story: ${storyID}`);
    console.log(username)
    // get full story data (text and image urls) from the database
    axios.get(`https://storybookaiserver.azurewebsites.net/get-story`, { params: { storyID: storyID } })
    .then(response => {
      const responseStoryData = response.data.story;
      const texts = responseStoryData.texts;
      const imageURLs = responseStoryData.imageURLs;

      // navigate to book viewer and pass the username, story id, texts, images
      navigation.navigate('BookViewerScreen', {
        username: username,
        storyID: storyID,
        texts: texts,
        imageURLs: imageURLs
      });
    })
    .catch(error => {
      console.error(error);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Story icons */}
      <Text style={styles.logo}> StoryBook </Text>
      <CircularButton style={styles.addStoryButton} onPress={() => setAddStoryModalVisible(true)} />
      <AddStory
        isVisible={isAddStoryModalVisible}
        onAddStory={handleAddNewStory}
        onClose={() => setAddStoryModalVisible(false)}
      />
      <View style={styles.storiesContainer}>
        <FlatList style={styles.FlatlistStyles} data={storyData}
          numColumns={2}
          renderItem={ ({ item }) =>
            <StoryIcon
              title={item.title}
              onPress={() => { 
                handlePress(item.id)
              }}
            />
          }
          keyExtractor={this._keyExtractor}
        />

        {/* Add more StoryIcons as needed */}
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
  logo: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 25,
  },
  storiesContainer: {
    height: 670,
    alignItems: 'center',
    top: 50
  },
  addStoryButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
});

export default StorybookApp;
