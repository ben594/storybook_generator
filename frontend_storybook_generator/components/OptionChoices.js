// AddStory.js
import React, { useState } from 'react';
import { Text, TextInput, Button, View, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

const OptionChoices = ({ isVisible, onAddStory, onClose }) => {
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
});

export default OptionChoices;