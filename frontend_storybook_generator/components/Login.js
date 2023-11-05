import React, { useState, useContext } from 'react';
import { SafeAreaView, KeyboardAvoidingView, StyleSheet, View, TextInput, Text, TouchableOpacity, Platform } from 'react-native';
import axios from 'axios';
import Button from './Button';
import UserProvider, { UserContext } from './UserContext';

const LoginScreen = ( { navigation } ) => {
  const { setUsername } = useContext(UserContext);
  const [state, setState] = useState({
      username: '',
      password: '',
  });

    const onPressLogin = () => {
        axios.post("https://storybookaiserver.azurewebsites.net/login", { username: state.username })
          .then(response => {
            if (response.data.loginStatus == true) {
                setUsername(state.username); // Update the context value
                navigation.navigate('StoryScreen', { username: state.username });
            } else {
              // TODO, update state to reflect username not found
              setState({ ...state, loginError: response.data.errorMessage });
            }
          })
          .catch(error => {
            // Handle exceptions
            setState({ ...state, loginError: error.message });
          });
      };

  const onPressForgotPassword = () => {
    // TODO
  };

  const onPressSignUp = () => {
    // TODO
  };

  return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        {/* Login title text */}
        <Text style={styles.title}>Login</Text>
        {/* user username and password field */}
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Username"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setState({ ...state, username: text })}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            secureTextEntry
            placeholder="Password"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setState({ ...state, password: text })} 
          />
        </View>
      <TouchableOpacity onPress={onPressForgotPassword}>
        <Text style={styles.forgotAndSignUpText}>Forgot Password?</Text>
      </TouchableOpacity>

        {/* login and signup options */}
      <View style={{flexDirection: 'row'}}>
        <Button onPress={onPressLogin} text={'Login'}/>

        <Button onPress={onPressSignUp} text={'Sign Up'}/>
      </View>
    </KeyboardAvoidingView>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ead8ca',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 50,
    color: 'black',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#c8b8aa',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'white',
  },
  forgotAndSignUpText: {
    color: 'black',
    marginVertical: 10,
    fontSize: 11,
  },
  loginBtn: {
    width: '80%',

    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
  },
});

export default LoginScreen;

          
