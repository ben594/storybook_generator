// StorybookApp.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';
import StoryIcon from './StoryIcon'; // Assuming StoryIcon.js is in the same folder
import NavBar from './NavBar'; // Assuming NavBar.js is in the same folder
import CircularButton from './CircularButton';
import axios from 'axios';

const StorybookApp = ( { route, navigation } ) => {
  const [username, setUsername] = useState('');
  const [storyData, setStoryData] = useState([]);

  // run this when this page first renders
  useEffect(() => {
    setUsername(route.params.username);
   
    // call backend api to get list of basic story info
    axios.get(`https://storybookaiserver.azurewebsites.net/get-stories`, { params: { username: route.params.username } })
    .then(response => {
      const responseStoryData = response.data.storyInfo;
      let retrievedData = [];

      // loop through response data to get ids and titles of stories
      for (var i = 0; i < responseStoryData.length; i++) {
        story = responseStoryData[i];
        storyInfo = {
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
    // Here you would navigate to the story's screen or component
    // get full story data (text and image urls) from the database
    axios.get(`https://storybookaiserver.azurewebsites.net/get-story`, { params: { storyID: storyID } })
    .then(response => {
      const responseStoryData = response.data.story;

      const texts = responseStoryData.texts;
      const images = responseStoryData.images;

      // navigate to book viewer and pass the username, story id, texts, images
      navigation.navigate('BookViewerScreen', { username: username, storyID: storyID, texts: texts, images: images });
    })
    .catch(error => {
      console.error(error);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Story icons */}
      <Text style={styles.logo}> StoryBook </Text>
      <CircularButton style={styles.addStoryButton}/>
      <View style={styles.storiesContainer}>
        <FlatList style={styles.FlatlistStyles} data={storyData}
          numColumns={2}
          renderItem={ ({ item }) => <StoryIcon title={item.title} onPress={ () => handlePress(item.storyID) }/> }
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
    alignItems: 'center'
  },
  addStoryButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  }
});

export default StorybookApp;
