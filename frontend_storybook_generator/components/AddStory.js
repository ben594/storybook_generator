// AddStory.js
import React, { useState } from 'react';
import { Text, TextInput, Button, View, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

const AddStory = ({ isVisible, onAddStory, onClose }) => {
  const [age, setAge] = useState('');
  const [character, setCharacter] = useState('');
  const [setting, setSetting] = useState('');
  const [year, setYear] = useState('');

  const handleAddNewStory = () => {
    onAddStory();

    // reset input fields
    setAge('');
    setCharacter('');
    setSetting('');
    setYear('');
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modal}
      backdropColor="transparent"
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTextPrompt}>Age:</Text>
          <TextInput
            placeholder="Enter age"
            value={age}
            onChangeText={setAge}
            style={styles.modalTextInput}
            maxLength={4}
          />

          <Text style={styles.modalTextPrompt}>Main character of the story:</Text>
          <TextInput
            placeholder="Enter character"
            value={character}
            onChangeText={setCharacter}
            style={styles.modalTextInput}
            multiline={true}
            maxLength={100}
          />

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.suggestionButton1} onPress={() => { setCharacter("Dragon") }}>
              <Text style={{ fontSize: 10, color: "white" }}>Dragon 🐉</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.suggestionButton2} onPress={() => { setCharacter("Pirate") }}>
              <Text style={{ fontSize: 10, color: "white" }}>Pirate ☠️</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.suggestionButton3} onPress={() => { setCharacter("Spongebob") }}>
              <Text style={{ fontSize: 10, color: "white" }}>Spongebob 🧽</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.modalTextPrompt}>Story setting:</Text>
          <TextInput
            placeholder="Enter setting"
            value={setting}
            onChangeText={setSetting}
            style={styles.modalTextInput}
            maxLength={30}
          />

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.suggestionButton1} onPress={() => { setSetting("Castle") }}>
              <Text style={{ fontSize: 10, color: "white" }}>Castle 🏰</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.suggestionButton2} onPress={() => { setSetting("Desert") }}>
              <Text style={{ fontSize: 10, color: "white" }}>Desert 🐪</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.suggestionButton3} onPress={() => { setSetting("Underwater") }}>
              <Text style={{ fontSize: 10, color: "white" }}>Underwater 🐠</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.modalTextPrompt}>Story time period:</Text>
          <TextInput
            placeholder="Enter time"
            value={year}
            onChangeText={setYear}
            style={styles.modalTextInput}
            maxLength={20}
          />

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.suggestionButton1} onPress={() => { setYear("1000 BCE") }}>
              <Text style={{ fontSize: 10, color: "white" }}>1000 BCE 🏛</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.suggestionButton2} onPress={() => { setYear("2000 CE") }}>
              <Text style={{ fontSize: 10, color: "white" }}>2000 CE 📆</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.suggestionButton3} onPress={() => { setYear("3577 CE") }}>
              <Text style={{ fontSize: 10, color: "white" }}>3577 CE 🛸</Text>
            </TouchableOpacity>
          </View>


          <TouchableOpacity style={styles.createButton} onPress={() => handleAddNewStory(age, character, setting, year)}>
              <Text style={{ fontSize: 20, color: "black", fontWeight: 'bold' }}>Create story!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
      backgroundColor: "white",
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
    modalTextPrompt: {
      marginTop: 20,
      fontWeight: 'bold'
    },
    modalTextInput: {
      margin: 5,
      borderWidth: 1,
      padding: 10,
      borderColor: '#000', // change border color to black
      borderRadius: 10, // add some border radius
    },
    suggestionButton1: {
      backgroundColor: '#579BB1',
      borderColor: '#579BB1',
      borderWidth: 1,
      borderRadius: 5,
      padding: 5,
      margin: 5
    },
    suggestionButton2: {
      backgroundColor: '#FF6969',
      borderColor: '#FF6969',
      borderWidth: 1,
      borderRadius: 5,
      padding: 5,
      margin: 5
    },
    suggestionButton3: {
      backgroundColor: '#99A98F',
      borderColor: '#99A98F',
      borderWidth: 1,
      borderRadius: 5,
      padding: 5,
      margin: 5
    },
    createButton: {
      borderWidth: 1,
      borderRadius: 5,
      backgroundColor: '#ead8ca',
      borderColor: '#ead8ca',
      padding: 5,
      marginTop: 10
    }
});

export default AddStory;