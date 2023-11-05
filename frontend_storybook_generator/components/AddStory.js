// AddStory.js
import React, { useState } from 'react';
import { TextInput, Button, View, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

const AddStory = ({ isVisible, onAddStory, onClose }) => {
  const [newStoryTitle, setNewStoryTitle] = useState('');

  const handleAddNewStory = () => {
    onAddStory(newStoryTitle);
    setNewStoryTitle(''); // reset the input field
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
          <TextInput
            placeholder="Enter new story title"
            value={newStoryTitle}
            onChangeText={setNewStoryTitle}
            style={styles.modalTextInput}
          />
          <Button
            title="Add Story"
            onPress={handleAddNewStory}
          />
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
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%', // make the modal narrower
      },
      modalTextInput: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: '100%', // make the text input take up the full width of the modal
        borderColor: '#000', // change border color to black
        borderRadius: 10, // add some border radius
      },
});

export default AddStory;