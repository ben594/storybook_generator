import React, { useState, useEffect, useContext, useCallback } from 'react';
import { TouchableOpacity, TextInput, View, StyleSheet, FlatList, Text, SafeAreaView, Modal } from 'react-native';
import axios from 'axios';

import BackButton from '../common/BackButton';
import UserProvider, { UserContext } from '../UserContext';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useFocusEffect } from '@react-navigation/native';

// topic suggestions for menus
const topicData = {
  history: [
    'Age of Dinosaurs',
    'Ancient Egypt',
    'Ancient Rome',
    'The Civil War',
    'Declaration of Independence',
    'World War II',
    'Civil Rights Movement'
  ],
  science: [
    'Photosynthesis',
    'The Water Cycle',
    'The Solar System',
    'States of Matter',
    'Laws of Motion',
    'Magnetism',
    'The Food Chain',
  ],
  geography: [
    'The Seven Wonders',
    'The Oceans',
    'The Amazon Rainforest',
    'Major Cities',
    'National Parks',
    'Antarctica',
  ],
};

const SubjectScreen = ({ route, navigation }) => {
  const { username } = useContext(UserContext);
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState('');
  const [color, setColor] = useState('');

  useEffect(() => {
    setSubject(route.params.subject);
    setColor(route.params.color);
  }, []);

  const returnToLearnScreen = () => {
    navigation.navigate('Learn');
  };

  const continueToEducationSelect = () => {
    navigation.navigate('CharacterSelection', { subject: subject, topic: topic, color: color });
  }

  return (
    <SafeAreaView style={styles.container}>
      <BackButton style={styles.backButton} onPress={returnToLearnScreen} />
      <View style={styles.menuContainer}>
        <Text style={styles.menuTitle}>Choose a topic in {subject} for your story</Text>
        <View style={styles.topicContainer}>
          <TextInput
            placeholder="Enter a topic"
            value={topic}
            onChangeText={setTopic}
            style={styles.textInput}
            multiline={true}
            maxLength={100}
          />
          <FlatList
            data={topicData[subject]}
            numColumns={2}
            renderItem={({ item }) =>
              <TouchableOpacity
                style={[styles.topicIcon, { backgroundColor: color }]}
                onPress={() => {setTopic(item)}}
              >
                <Text style={styles.topicText}>
                  {item}
                </Text>
              </TouchableOpacity>
            }
            keyExtractor={this._keyExtractor} 
          />
        </View>
      </View>
      <TouchableOpacity
        style={[styles.createButton, { backgroundColor: topic != "" ? color : 'grey' }]}
        onPress={continueToEducationSelect}
        disabled={topic == ""}
      >
        <Text style={styles.createButtonText}>
          Continue
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
  menuContainer: {
    flex: 1,
    width: '100%',
    marginTop: 40,
    alignItems: 'center',
  },
  topicContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center',
    flexGrow: 1,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  topicIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
    marginHorizontal: '5%',
    borderRadius: 10,
    width: '40%',
  },
  topicText: {
    fontSize: 18,
    padding: 10,
    color: "#ead8ca",
    fontWeight: 'bold',
  },
  menuTitle: {
    padding: 25,
    fontSize: 35,
    fontWeight: 'bold',
    position: 'relative',
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    fontSize: 26,
    marginBottom: 30,
    width: '80%'
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

export default SubjectScreen;
