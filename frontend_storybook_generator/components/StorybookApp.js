// StorybookApp.js
import React from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';
import StoryIcon from './StoryIcon'; // Assuming StoryIcon.js is in the same folder
import NavBar from './NavBar'; // Assuming NavBar.js is in the same folder
import CircularButton from './CircularButton';

const StorybookApp = () => {
  // Function to handle story icon press
  const handlePress = (story) => {
    console.log(`Open story: ${story}`);
    // Here you would navigate to the story's screen or component
  };

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
  ];


  return (
    <SafeAreaView style={styles.container}>
      {/* Story icons */}
      <Text style={styles.logo}> StoryBook </Text>
      <CircularButton style={styles.addStoryButton}/>
      <View style={styles.storiesContainer}>
        <FlatList style={styles.FlatlistStyles} data={DATA}
          numColumns={2}
          renderItem={({item}) => <StoryIcon title={item.title} onPress={() => handlePress('Story 1')}/>}
          keyExtractor={this._keyExtractor}
        />

        {/* Add more StoryIcons as needed */}
      </View>

      {/* Navigation Bar */}
      <NavBar />
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
