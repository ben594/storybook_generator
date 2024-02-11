import React, { useState, useEffect, useContext, useCallback } from 'react';
import { TextInput, Button, View, StyleSheet, FlatList, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import UserProvider, { UserContext } from '../UserContext';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialIcons, Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const bannersData = [
  {
    title: 'Science',
    color: '#3f6570',
    description: 'Discover how the universe around us works!',
    icon: <MaterialIcons name="science" size={32} color="#ead8ca" />
  },
  {
    title: 'History',
    color: '#a35d5d',
    description: 'Learn about the civilizations, people, and events that shaped the world!',
    icon: <Entypo name="feather" size={32} color="#ead8ca" />
  },
  {
    title: 'Geography',
    color: '#657d57',
    description: 'Travel the world to visit cities and natural wonders!',
    icon: <Ionicons name="earth-sharp" size={32} color="#ead8ca" />
  },
  {
    title: 'Vocabulary',
    color: '#ba7538',
    description: 'Create custom word lists to study and include in your stories!',
    icon: <MaterialCommunityIcons name="book-search" size={32} color="#ead8ca" />
  },
];

const LearnScreen = ({ route, navigation }) => {
  const { username } = useContext(UserContext);

  return (
    <SafeAreaView style={styles.container}>
      {/* Story icons */}
      <Text style={styles.logo}> Aesop AI </Text>
      <View style={styles.subjectContainer}>
        <FlatList
          data={bannersData}
          numColumns={1}
          renderItem={({ item }) =>
            <TouchableOpacity
              style={[styles.subjectBanner, { backgroundColor: item.color }]}
              onPress={() => {
                if (item.title == 'Vocabulary') {
                  navigation.navigate('VocabListScreen');
                } else {
                  navigation.navigate('SubjectScreen', { subject: item.title.toLowerCase(), color: item.color });
                }
              }}
            >
              {item.icon}
              <Text style={styles.bannerTitle}>
                {item.title}
              </Text>
              <Text style={styles.bannerText}>
                {item.description}
              </Text>
            </TouchableOpacity>
          }
          keyExtractor={this._keyExtractor}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ead8ca',
  },
  logo: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 25,
  },
  subjectContainer: {
    paddingHorizontal: 10,
    marginTop: 20,
    flexGrow: 1,
    marginBottom: 80,
  },
  subjectBanner: {
    width: '95%',
    alignSelf: 'center',
    padding: 30,
    margin: 5,
    borderRadius: 15,
  },
  bannerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ead8ca',
  },
  bannerText: {
    fontSize: 22,
    color: '#ead8ca',
  }
});

export default LearnScreen;
