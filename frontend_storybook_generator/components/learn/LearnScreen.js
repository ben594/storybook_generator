import React, { useState, useEffect, useContext, useCallback } from 'react';
import { TextInput, Button, View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';
import NavBar from '../NavBar';
import UserProvider, { UserContext } from '../UserContext';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useFocusEffect } from '@react-navigation/native';

import SubjectBanner from './SubjectBanner';

const LearnScreen = ({ route, navigation }) => {
  const { username } = useContext(UserContext);
  const [storyData, setStoryData] = useState([]);
  // construct a modal for adding new stories
  const [bannerReset, setBannerReset] = useState(false);

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
        <FlatList 
          style={[styles.subjectList]}
          data={bannersData}
          numColumns={1}
          renderItem={({ item }) =>
            <SubjectBanner
              title={item.title}
              color={item.color}
              description={item.description}
              navigation={navigation}
            />
          }
          keyExtractor={this._keyExtractor}
        />
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

export default LearnScreen;
