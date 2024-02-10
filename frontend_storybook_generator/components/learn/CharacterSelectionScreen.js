import React, { useState, useEffect, useContext, useCallback } from 'react';
import { TouchableOpacity, TextInput, View, StyleSheet, FlatList, Text, SafeAreaView, Modal } from 'react-native';
import axios from 'axios';

import BackButton from '../common/BackButton';
import UserProvider, { UserContext } from '../UserContext';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useFocusEffect } from '@react-navigation/native';

const CharacterSelectionScreen = ({ route, navigation }) => {
    const { username } = useContext(UserContext);
    const [subject, setSubject] = useState("");
    const [age, setAge] = useState(-1);
    const [character, setCharacter] = useState('');
    const [topic, setTopic] = useState('');
    const [color, setColor] = useState('');

    useEffect(() => {
        setSubject(route.params.subject);
        setTopic(route.params.topic);
        setColor(route.params.color);
    }, []);

    const returnToTopicScreen = () => {
        navigation.navigate('SubjectScreen', {
            subject: subject,
            color: color
        });
    };

    const selectAge = (index) => {
        setAge(index + 1);
    }

    const continueToEducationOptions = () => {
        navigation.navigate('EducationOptions', {
            subject: subject,
            color: color,
            topic: topic,
            character: character,
            age: age,
        });
    }

    const ages = new Array(100).fill(0);
    for (var i = 0; i < 100; i++) {
        ages[i] = i + 1;
    }

    return (
        <SafeAreaView style={styles.container}>
            <BackButton style={styles.backButton} onPress={returnToTopicScreen} />
            <View style={styles.menuContainer}>
                <Text style={styles.menuTitle}>Choose a name and age for your character</Text>
                <View style={styles.characterMenuContainer}>
                    <Text style={styles.characterMenuText}>
                        Select your age
                    </Text>
                    <FlatList
                        style={{ backgroundColor: 'white', borderRadius: 10 }}
                        data={ages}
                        horizontal
                        renderItem={
                            ({ item, index }) => {
                                if (index + 1 === age) {
                                    return (
                                        <TouchableOpacity style={{ marginHorizontal: 10, backgroundColor: color, borderRadius: 5 }} onPress={() => selectAge(index)}><Text style={{ fontSize: 30, padding: 5, color: 'white' }}>{item}</Text></TouchableOpacity>
                                    )
                                } else {
                                    return (
                                        <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={() => selectAge(index)}><Text style={{ fontSize: 30, padding: 5 }}>{item}</Text></TouchableOpacity>
                                    )
                                }
                            }
                        }

                    />
                    <Text style={styles.characterMenuText}>
                        Your character
                    </Text>
                    <TextInput
                        placeholder="Enter your character"
                        value={character}
                        onChangeText={setCharacter}
                        style={styles.textInput}
                        multiline={true}
                        maxLength={100}
                    />
                </View>
            </View>
            <TouchableOpacity
                style={[styles.createButton, { backgroundColor: age > 0 && character != "" ? color : 'grey' }]}
                onPress={continueToEducationOptions}
                disabled={age < 0 || character == ""}
            >
                <Text style={styles.createButtonText}>
                    Continue
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ead8ca',
        justifyContent: 'space-between',
    },
    menuContainer: {
        flex: 1,
        width: '100%',
        marginTop: 40,
        alignItems: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
    },
    menuTitle: {
        padding: 25,
        fontSize: 35,
        fontWeight: 'bold',
        position: 'relative',
    },
    characterMenuContainer: {
        justifyContent: 'center',
        width: '70%',
        alignItems: 'center',
    },
    characterMenuText: {
        fontSize: 30,
        marginTop: 10,
        padding: 10,
        fontWeight: 'bold',
    },
    textInput: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        fontSize: 30,
        width: '100%',
    },
    createButton: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginHorizontal: 5,
        marginVertical: 5,
    },
    createButtonText: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        padding: 15
    },
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
    },
    centeredView: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: '10%',
        marginHorizontal: '5%',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.88)',
        borderRadius: 20,
        padding: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%',
    },
});

export default CharacterSelectionScreen;
