import React, { useState, useContext } from 'react';
import { KeyboardAvoidingView, StyleSheet, View, TextInput, Text, Platform } from 'react-native';
import axios from 'axios';

import Button from './Button';
import UserProvider, { UserContext } from './UserContext';
import { REACT_APP_BACKEND_URL } from './BackendURL';

const LoginScreen = ({ navigation }) => {
  const { setUsername } = useContext(UserContext);
  const [state, setState] = useState({
    username: '',
    password: '',
  });

  const onPressLogin = () => {
    axios.post(`${REACT_APP_BACKEND_URL}/login`, { username: state.username, password: state.password })
      .then(response => {
        if (response.data.loginStatus == true) {
          setUsername(state.username); // Update the context value
          navigation.navigate('HomeScreen', { username: state.username });
        } else {
          // TODO, update state to reflect username not found
          alert("Login failed")
          setState({ ...state, loginError: response.data.errorMessage });
        }
      })
      .catch(error => {
        // Handle exceptions
        alert("Login failed")
        setState({ ...state, loginError: error.message });
      });
  };

  const onPressForgotPassword = () => {
    // TODO
  };

  const onPressSignUp = async () => {
    // check if username is empty
    if (state.username.trim() === '' || state.password.trim() === '') {
      alert('Username and password cannot be empty.');
      return;
    }

    axios.post(`${REACT_APP_BACKEND_URL}/create-User`, {
      username: state.username,
      password: state.password,
    })
      .then(response => {
        console.log(response.data)
        if (response.data) {
          setUsername(state.username); // update context value
          navigation.navigate('HomeScreen', { username: state.username });
        } else {
          alert("Signup failed, an account with this username may already exist");
        }
      })
      .catch(error => {
        alert("Signup failed, an account with this username may already exist");
      });
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
      {/* <TouchableOpacity onPress={onPressForgotPassword}>
        <Text style={styles.forgotAndSignUpText}>Forgot Password?</Text>
      </TouchableOpacity> */}

      {/* login and signup options */}
      <View style={{ flexDirection: 'row' }}>
        <Button onPress={onPressLogin} text={'Login'} />

        <Button onPress={onPressSignUp} text={'Sign Up'} />
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


