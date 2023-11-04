// StorybookApp.js
import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import StoryIcon from './StoryIcon'; // Assuming StoryIcon.js is in the same folder
import NavBar from './NavBar'; // Assuming NavBar.js is in the same folder

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
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];


  return (
    <View style={styles.container}>
      {/* Story icons */}
      <View style={styles.storiesContainer}>
        <FlatList style={styles.FlatlistStyles} data={DATA}
          numColumns={4}
          renderItem={({item}) => <StoryIcon title={item.title} onPress={() => handlePress('Story 1')}/>}
          keyExtractor={this._keyExtractor}
        />

        {/* Add more StoryIcons as needed */}
      </View>

      {/* Navigation Bar */}
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  storiesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StorybookApp;
