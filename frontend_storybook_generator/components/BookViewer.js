import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import PagerView from 'react-native-pager-view';
import { useFocusEffect } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as Speech from 'expo-speech';
import OptionChoices from './OptionChoices';

import Button from './Button';

const BookViewer = ({ route, navigation }) => {
  const [pages, setPages] = useState([]);
  const [position, setPosition] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

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

  const isLastPage = currentPage === pages.length - 1;

  useEffect(() => {
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

    setTimeout(() => {
      Speech.speak(newPages[0].text, { rate: 0.8, voice: "com.apple.ttsbundle.Karen-compact" });
    }, 2000);
  }, []);

  const handlePageScroll = async (e) => {
    const newPos = e.nativeEvent.position;
    const offset = e.nativeEvent.offset;
    if (offset == 0) {
      const currentlySpeaking = await Speech.isSpeakingAsync();
      if (currentlySpeaking) {
        Speech.stop();
      }  
      Speech.speak(pages[newPos].text, { rate: 0.8, voice: "com.apple.ttsbundle.Karen-compact" });
    }
  }

  return (
    <PagerView
      style={styles.pagerView}
      initialPage={0}
      onPageScroll={(e) => handlePageScroll(e) }
      onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
    >
      {pages.map((page, index) => {
        const isLastPage = index === pages.length - 1;

        return (
          <View key={page.pageNumber} style={styles.page}>
            <Image style={styles.imageView} source={{ uri: page.imageURL }} />
            <View style={isLastPage ? styles.lastPageTextContainer : styles.textContainer}>
              <Text style={styles.textView}>{page.text}</Text>
              {/* Render OptionChoices only on the last page */}
              {isLastPage && (
                <OptionChoices
                  onChoiceSelect={(choiceId) => {
                    console.log(`User selected: ${choiceId}`);
                  }}
                />
              )}
            </View>
          </View>
        );
      })}
    </PagerView>
  );
};

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
    backgroundColor: '#ead8ca',
  },
  page: {
    flexDirection: 'row', // set children to be in a row
    flex: 1,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  lastPageTextContainer: {
    flex: 1,
    justifyContent: 'flex-start', // align text to the top for the last page
  },
  textView: {
    fontSize: 20,
    fontFamily: 'Baskerville',
    margin: 20,
    marginRight: 50,
  },
  imageView: {
    width: 375,
    height: 375,
    flex: 1
  },
  // add styles for your OptionChoices component as needed
});

export default BookViewer;