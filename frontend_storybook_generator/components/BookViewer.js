import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import PagerView from 'react-native-pager-view';
import { useFocusEffect } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';

import Button from './Button';

const BookViewer = ({ route, navigation }) => {
  const [pages, setPages] = useState([]);

  useFocusEffect(
    useCallback(() => {
      // Function to lock the orientation
      const lockOrientation = async () => {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
      };

      lockOrientation();

      // Function to unlock the orientation when the component is unmounted or loses focus
      return () => {
        ScreenOrientation.unlockAsync();
      };
    }, [])
  );

  useEffect(() => {
    console.log("images: ", route.params);
    var newPages = [];
    for (var i = 0; i < route.params.texts.length; i++) {
      const text = route.params.texts[i];
      const imageURL = route.params.imageURLs[i];
      const page = {
        text: text,
        imageURL: imageURL,
        pageNumber: (i + 1)
      };

      newPages.push(page);
    }

    setPages(newPages);
  }, []);

  return (
    <PagerView style={styles.pagerView} initialPage={0}>
      {pages.map((page) => {
        return (
          <View key={page.pageNumber} style={styles.page}>
            <Image
              style={styles.imageView}
              source={{ uri: page.imageURL }}
            />
            <Text style={styles.textView}>
              {page.text}
            </Text>
          </View>
        );
      })}
    </PagerView>
  );
};

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
    backgroundColor: '#ead8ca'
  },
  page: {
    flexDirection: 'row', // Set the children to be in a row
    justifyContent: 'center',
    flex: 1, // Ensure the page takes full height
  },
  textView: {
    flex: 1, // Take up remaining space after image
    margin: 20,
    fontSize: 20,
    fontFamily: 'Baskerville'
  },
  imageView: {
    width: 375,
    height: 375,
  }
});

export default BookViewer;
