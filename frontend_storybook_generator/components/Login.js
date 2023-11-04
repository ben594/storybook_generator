import React, { useState } from 'react';
import { SafeAreaView, KeyboardAvoidingView, StyleSheet, View, TextInput, Text, TouchableOpacity, Platform } from 'react-native';

const loginScreen = ( { navigation } ) => {
  const onPressLogin = async () => {
    // TODO implement AuthU 
    // try {
    // log in attempt
    // const response = await axios.get('', { username: state.username });
    // if (response.isSuccess) {
        // If login is successful, navigate to the 'Dashboard' screen and pass username
    navigation.navigate('StoryScreen', { username: state.username });
    // } else {
    //     // If there is a login error, handle it appropriately
    //     setState({ ...state, loginError: response.errorMessage });
    // }
    // } catch (error) {
    // // Handle exceptions
    // setState({ ...state, loginError: error.message });
    // }
  };

  const onPressForgotPassword = () => {
    // TODO
  };

  const onPressSignUp = () => {
    // TODO
  };

  const [state, setState] = useState({
    username: '',
    password: '',
  });

  return (
    <SafeAreaView style={styles.safeArea}>
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
      <TouchableOpacity
        onPress={onPressLogin}
        style={styles.loginBtn}
      >
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onPressSignUp}
      >
        <Text style={styles.forgotAndSignUpText}>Signup</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  </SafeAreaView>
);
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#4FD3DA', // Set the background color of the safe area
  },
  container: {
    flex: 1,
    backgroundColor: '#4FD3DA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#fb5b5a',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#3AB4BA',
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
    color: 'white',
    fontSize: 11,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
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

export default loginScreen;

          
