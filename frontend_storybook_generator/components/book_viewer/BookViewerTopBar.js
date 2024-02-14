import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Touchable } from 'react-native';
import * as Speech from 'expo-speech';
import * as ScreenOrientation from 'expo-screen-orientation';

const BookViewerTopBar = ({ topBarVisible, navigation }) => {
    const [animation] = useState(new Animated.Value(0));

    // when screen clicked, show top bar for several seconds
    useEffect(() => {
        if (topBarVisible) {
            Animated.timing(animation, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start(() => {
                // Automatically hide after 2 seconds
                setTimeout(() => {
                }, 2000);
            });
        } else {
            Animated.timing(animation, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [topBarVisible]);

    const translateY = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [-50, 0],
    });

    const returnHome = async () => {
        Speech.stop();
        await ScreenOrientation.unlockAsync();
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        navigation.navigate("HomeScreen");
      }

    return (
        <Animated.View style={[styles.topBar, { transform: [{ translateY }] }]}>
            <TouchableOpacity style={styles.homeButton} onPress={returnHome}>
                <Text style={styles.homeButtonText}>
                    Home
                </Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    topBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#618289',
        padding: 10,
        zIndex: 999,
        height: 75,
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
    },
    homeButton: {
        left: 20,
        backgroundColor: '#ead8ca',
        borderRadius: 10,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    homeButtonText: {
        color: 'black',
        fontWeight: 'bold',
        padding: 5,
    }
});

export default BookViewerTopBar;
