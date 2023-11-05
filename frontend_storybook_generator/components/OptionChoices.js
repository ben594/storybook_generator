import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const OptionChoices = ({ onChoiceSelect }) => {
  // state for continue button
  const [selectedChoice, setSelectedChoice] = useState(null);

  // TODO, ADD IN CHOICES FROM PARAGRAPH LIST
  const choices = [
    { id: 'choice1', text: 'Go to the castle' },
    { id: 'choice2', text: 'Search for the key' },
    { id: 'choice3', text: 'Talk to the wizard' }
  ];

  const handleChoiceSelection = (choiceId) => {
    // set the selected choice state
    setSelectedChoice(choiceId);
  };

  const handleContinue = () => {
    // passed onChoiceSelect function with the selected choice
    onChoiceSelect(selectedChoice);
  };

  return (
    <View style={styles.container}>
      {choices.map((choice) => (
        <TouchableOpacity
          key={choice.id}
          style={[
            styles.choiceButton,
            choice.id === selectedChoice && styles.choiceButtonSelected,
          ]}
          onPress={() => handleChoiceSelection(choice.id)}
        >
          <Text style={styles.choiceText}>{choice.text}</Text>
        </TouchableOpacity>
      ))}
      {/* TODO: CALL API TO GET MORE IMAGES AND PROMPT */}
      {selectedChoice && (
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  choiceButton: {
    backgroundColor: '#618289',
    padding: 15,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center', 
    borderRadius: 5,
  },
  choiceButtonSelected: {
    backgroundColor: '9DBBBC',
  },
  choiceText: {
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: 'BAC8C7',
    padding: 15,
    marginTop: 10, 
    borderRadius: 5,
    alignItems: 'center', 
  },
  continueText: {
    color: 'white', 
    fontWeight: 'bold',
  },
});

export default OptionChoices;