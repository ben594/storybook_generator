import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const OptionChoices = ({ options, onChoiceSelect, enabled, isLastPage, isLoading }) => {
  // state for continue button
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [continueEnabled, setContinueEnabled] = useState(enabled);

  // TODO, ADD IN CHOICES FROM PARAGRAPH LIST
  const choices = options.map((option, idx)=>({id: (idx+1).toString(), text: option}));

  const handleChoiceSelection = (choiceId) => {
    // set the selected choice state
    setSelectedChoice(choiceId);
  };

  const handleContinue = () => {
    // passed onChoiceSelect function with the selected choice
    onChoiceSelect(selectedChoice);
    setContinueEnabled(false)
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
          disabled={!enabled}
        >
          <Text style={styles.choiceText}>{choice.text}</Text>
        </TouchableOpacity>
      ))}

      {/* Continue button */}
      {selectedChoice && continueEnabled && (
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      )}

      {/* Loading view */}
      {isLoading && isLastPage && (
        <View style={styles.loadingView}>
          <LottieView source={ require('../assets/loading.json')} autoPlay loop style={styles.lottie}/>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  choiceButton: {
    // backgroundColor: '#618289',
    backgroundColor: '#dba98a',
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
    // backgroundColor: '9DBBBC',
    backgroundColor: '#baa191',
    opacity: 0.4
  },
  choiceText: {
    textAlign: 'center',
    fontSize: 10,
    fontFamily: 'Cochin',
  },
  continueButton: {
    // backgroundColor: '#618289', 
    backgroundColor: '#dba98a', 
    paddingVertical: 8, 
    paddingHorizontal: 10, 
    marginTop: 10, 
    borderRadius: 5,
    alignSelf: 'center', 
  },
  continueText: {
    color: 'black', 
    fontWeight: 'bold',
    fontFamily: 'Cochin',
  },
  loadingView: {
    alignSelf: 'center', 
  },
  lottie: {
    height: 75,
    width: 75,
  },
});

export default OptionChoices;