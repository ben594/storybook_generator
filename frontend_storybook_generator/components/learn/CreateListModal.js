import React, { useState } from 'react';
import { Text, TextInput, FlatList, Button, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import Modal from 'react-native-modal';

const CreateListModal = ({ isVisible, onCreate, onClose }) => {
  const [name, setName] = useState('');
  const [words, setWords] = useState([])

  const renderItem = ({ item, id }) => (
    <View style={styles.item}>
      <TextInput
        style={styles.input}
        placeholder="Enter a word"
        value={item.text}
        onChangeText={(text) => handleChangeText(text, item.id)}
      />
    </View>
  );

  const handleChangeText = (text, id) => {
    setWords((prevData) =>
      prevData.map((item) => (item.id === id ? { ...item, text } : item))
    );
  };

  const addNewItem = () => {
    if (words.length >= 10) {
      return;
    }

    const newItem = { text: "", id: words.length };
    setWords([...words, newItem]);
  };

  const handleAddList = async (name, words) => {
    var textList = [];
    for (var i = 0; i < words.length; i++) {
      textList.push(words[i].text);
    }

    await onCreate(name, textList);

    // reset input fields
    setName("");
    setWords([]);
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modal}
      backdropColor="transparent"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.centeredView}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTextPrompt}>List name:</Text>
          <TextInput
            placeholder="Enter list name"
            value={name}
            onChangeText={setName}
            style={styles.modalTextInput}
            maxLength={20}
          />

          <View style={styles.listContainer}>
            <FlatList
              data={words}
              renderItem={renderItem}
              keyExtractor={this._keyExtractor}
            />
            <TouchableOpacity style={styles.addButton} onPress={addNewItem}>
              <Text style={styles.addButtonLabel}>Add word</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.createButton}
              onPress={() => handleAddList(name, words)}
            >
              <Text style={{ fontSize: 20, color: "black", fontWeight: 'bold' }}>Create list!</Text>
            </TouchableOpacity>
          </View>


        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    margin: 0,
  },
  centeredView: {
    marginVertical: '10%',
    marginHorizontal: '5%',
  },
  modalView: {
    alignSelf: 'center',
    height: '80%',
    margin: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.88)',
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
  modalTextPrompt: {
    alignSelf: 'center',
    marginTop: 20,
    fontWeight: 'bold'
  },
  modalTextInput: {
    margin: 5,
    borderWidth: 1,
    padding: 10,
    borderColor: '#000', // change border color to black
    borderRadius: 10, // add some border radius
    width: '80%',
  },
  createButton: {
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#ead8ca',
    borderColor: '#ead8ca',
    padding: 5,
    marginTop: 10
  },
  listContainer: {
    height: '70%',
    width: '90%',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  addButton: {
    marginTop: 20,
    alignSelf: 'center',
    width: '50%',
    borderRadius: 10,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  addButtonLabel: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CreateListModal;