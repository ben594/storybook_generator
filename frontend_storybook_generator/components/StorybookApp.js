// StorybookApp.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import StoryIcon from './StoryIcon'; // Assuming StoryIcon.js is in the same folder
import NavBar from './NavBar'; // Assuming NavBar.js is in the same folder

const StorybookApp = () => {
  // Function to handle story icon press
  const handlePress = (story) => {
    console.log(`Open story: ${story}`);
    // Here you would navigate to the story's screen or component
  };

  return (
    <View style={styles.container}>
      {/* Story icons */}
      <View style={styles.storiesContainer}>
        <StoryIcon title="Story 1" onPress={() => handlePress('Story 1')} />
        <StoryIcon title="Story 2" onPress={() => handlePress('Story 2')} />
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
