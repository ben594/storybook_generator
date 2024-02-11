import React, { useEffect, useState } from 'react';
import { Text, TextInput, FlatList, Button, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import Modal from 'react-native-modal';

const ViewListModal = ({ isVisible, vocabList, onCreate, onClose }) => {
  const [name, setName] = useState('');
  const [words, setWords] = useState([]);

  useEffect(() => {
    setName(vocabList.title);
    setWords(vocabList.words);
  }, [vocabList]);

  const renderItem = ({ item, id }) => (
    <View style={styles.item}>
      <Text style={styles.input}>{item}</Text>
    </View>
  );

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modal}
      backdropColor="transparent"
    >
      <View
        style={styles.centeredView}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTextPrompt}>List name: {name}</Text>
          <View style={styles.listContainer}>
            <FlatList
              data={words}
              renderItem={renderItem}
              keyExtractor={this._keyExtractor}
            />
          </View>
          <TouchableOpacity
            style={styles.createButton}
            onPress={onCreate}
          >
            <Text style={{ fontSize: 20, color: "black", fontWeight: 'bold' }}>Create story with this vocabulary list!</Text>
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

export default ViewListModal;