import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import LottieView from 'lottie-react-native';

const AppLoader = () => {
    return(
        <View style={[StyleSheet.absoluteFillObject, styles.container]}>
            <View style={styles.centered}>
                <View style={styles.lottieContainer}>
                    <LottieView source={ require('../assets/loading.json')} autoPlay loop style={styles.lottie}/>
                </View>
                <Text style={styles.text}>Loading...</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ead8ca',
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    lottieContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    lottie: {
        width: 200,
        height: 200,
    },
    text: {
        fontSize: 20,
        alignSelf: 'center',
    },
});

export default AppLoader