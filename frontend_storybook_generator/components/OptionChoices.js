import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const OptionChoices = ({ options, onChoiceSelect }) => {
  // state for continue button
  const [selectedChoice, setSelectedChoice] = useState(null);

  // TODO, ADD IN CHOICES FROM PARAGRAPH LIST
  const choices = options.map((option, idx)=>({id: (idx+1).toString(), text: option}));

  const handleChoiceSelection = (choiceId) => {
    // set the selected choice state
    setSelectedChoice(choiceId);
  };

  const handleContinue = () => {
    // passed onChoiceSelect function with the selected choice
    onChoiceSelect(selectedChoice);
  };
  console.log("CHOICES: ")

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
    padding: 10,
    marginVertical: 3,
    marginHorizontal: 50,
    justifyContent: 'center',
    alignItems: 'center', 
    borderRadius: 5,
    position: 'relative',
    left: -20,
  },
  choiceButtonSelected: {
    backgroundColor: '9DBBBC',
    opacity: 0.4
  },
  choiceText: {
    textAlign: 'center',
    fontSize: 10,
  },
  continueButton: {
    backgroundColor: '#618289', 
    paddingVertical: 8, 
    paddingHorizontal: 10, 
    marginTop: 10, 
    borderRadius: 5,
    alignSelf: 'center', 
  },
  continueText: {
    color: 'black', 
    fontWeight: 'bold',
  },
});

export default OptionChoices;