import React, { useState, useEffect, useContext, useCallback } from 'react';
import { TextInput, Button, View, StyleSheet, FlatList, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import UserProvider, { UserContext } from '../UserContext';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

import { REACT_APP_BACKEND_URL } from '../BackendURL';
import BackButton from '../common/BackButton';
import CreateListModal from './CreateListModal';
import ViewListModal from './ViewListModal';
import AddStory from '../AddStory';
import CircularButton from '../common/CircularButton';

const LearnScreen = ({ route, navigation }) => {
  const { username } = useContext(UserContext);
  const [storyData, setStoryData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [lists, setLists] = useState([]);
  const [viewListModal, setViewListModal] = useState(false);
  const [selectedList, setSelectedList] = useState({});
  const [addStoryModal, setAddStoryModal] = useState(false);

  const handleCreateList = async (name, words) => {
    setShowModal(false); // hide the modal after submission
    await axios.post(`${REACT_APP_BACKEND_URL}/vocab-list/create`, { username: username, title: name, words: words })
      .then(() => {
        getLists();
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleOpenStoryCreator = async () => {
    setViewListModal(false);
    setAddStoryModal(false);
    setTimeout(() => {
      setAddStoryModal(true);
    }, 500)
  };

  const handleAddNewStory = async (age, character, setting, year) => {
    // axios POST request to backend server to create and save the new story
    await axios.post(`${REACT_APP_BACKEND_URL}/create-story/vocab`, { username: username, age: age, mainCharacter: character, setting: setting, year: year, words: selectedList.words })
      .then((response) => {
        const responseStoryData = response.data;
        const storyID = responseStoryData.storyID;
        const texts = responseStoryData.texts;
        const imageURLs = responseStoryData.images;
        navigation.navigate('BookViewerScreen', {
          username: username,
          storyID: storyID,
          texts: texts,
          imageURLs: imageURLs,
          startPage: 0
        });
        setAddStoryModal(false); // hide the modal after submission
      })
      .catch(error => {
        console.error(error);
        setAddStoryModal(false); // hide the modal after submission
      });
  };

  const returnToLearnScreen = () => {
    navigation.navigate('Learn');
  };

  const selectList = (item) => {
    setSelectedList(item);
    setViewListModal(true);
    setAddStoryModal(false);
  }

  const getLists = async () => {
    await axios.post(`${REACT_APP_BACKEND_URL}/vocab-list/get-lists`, { username: username })
      .then((response) => {
        setLists(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  useEffect(() => {
    getLists();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}> Vocabulary Lists </Text>
      <BackButton style={styles.backButton} onPress={returnToLearnScreen} />
      <CreateListModal isVisible={showModal} onCreate={handleCreateList} onClose={() => setShowModal(false)} />
      <ViewListModal
        isVisible={viewListModal}
        vocabList={selectedList}
        onCreate={handleOpenStoryCreator}
        onClose={() => {
          setViewListModal(false);
        }} />
      <AddStory
        isVisible={addStoryModal}
        onAddStory={handleAddNewStory}
        onClose={() => setAddStoryModal(false)}
      />
      <TouchableOpacity
        style={[styles.createButton, { backgroundColor: '#ba7538' }]}
        onPress={() => setShowModal(true)}
      >
        <Text style={styles.createButtonText}>
          Create List
        </Text>
      </TouchableOpacity>
      <View style={styles.subjectContainer}>
        <FlatList
          data={lists}
          numColumns={1}

          renderItem={({ item }) =>
            <TouchableOpacity
              style={[styles.subjectBanner]}
              onPress={() => selectList(item)}
            >
              <Text style={styles.bannerTitle}>
                {item.title}
              </Text>
            </TouchableOpacity>
          }
          keyExtractor={this._keyExtractor}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ead8ca',
    alignItems: 'center',
  },
  logo: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 25,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  subjectContainer: {
    marginTop: 20,
    width: '100%',
    flexGrow: 1,
  },
  subjectBanner: {
    alignSelf: 'center',
    padding: 30,
    margin: 5,
    borderRadius: 15,
    width: '95%',
    backgroundColor: '#ba7538',
  },
  bannerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ead8ca',
  },
  bannerText: {
    fontSize: 22,
    color: '#ead8ca',
  },
  createButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginHorizontal: 5,
    marginVertical: 20,
  },
  createButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 15
  },
});

export default LearnScreen;
