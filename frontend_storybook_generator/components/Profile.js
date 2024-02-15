import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

import BackButton from './common/BackButton';
import UserProvider, { UserContext } from './UserContext';

const ProfileScreen = ({ navigation, onPress }) => {
  const { username } = useContext(UserContext);

  // Function to handle sign out
  const handleSignOut = () => {
    navigation.navigate('LoginScreen');
  };

  const returnToHomeScreen = () => {
    navigation.navigate('HomeScreen');
  };

  return (
    <View style={styles.container}>
      <BackButton style={styles.backButton} onPress={returnToHomeScreen} />
      <Text style={styles.username}>Username: {username}</Text>
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutText}>
          Sign Out
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ead8ca',
  },
  username: {
    marginTop: '20%',
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    top: '5%',
    left: 20,
  },
  signOutButton: {
    backgroundColor: '#5a8896',
    borderRadius: 10,
  },
  signOutText: {
    color: 'white',
    padding: 10,
    fontWeight: 'bold',
    fontSize: 20,
  }
});

export default ProfileScreen;
