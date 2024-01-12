import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Animated } from 'react-native';
import PagerView from 'react-native-pager-view';
import { useFocusEffect } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as Speech from 'expo-speech';
import OptionChoices from './OptionChoices';
import axios from 'axios';

import Button from './Button';
import { SafeAreaView } from 'react-native-safe-area-context';

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

const BookViewer = ({ route, navigation }) => {
  const [texts, setTexts] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const [pages, setPages] = useState([]);
  const [position, setPosition] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [storyID, setStoryID] = useState('');

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
    setTexts(route.params.texts);
    setImageURLs(route.params.imageURLs);
    setStoryID(route.params.storyID);
  }, []);

  useEffect(() => {
    console.log("trigger create new pages");
    var newPages = [];
    let imgCnt = 0;
    for (var i = 0; i < route.params.texts.length; i++) {
      const text = route.params.texts[i];
      if (!text.toLowerCase().startsWith('option')) {  //if it is a paragraph
        const imageURL = route.params.imageURLs[imgCnt];
        let options = []
        for (const text of route.params.texts.slice(i+1)) {
          if (!text.toLowerCase().startsWith('option')) {  //if next text is not option, break
            break
          }
          options.push(text)
        }

        const page = {
          text: text,
          imageURL: imageURL,
          pageNumber: (i + 1),
          options: options
        };
        newPages.push(page);
        imgCnt += 1;
      }
    }

    setPages(newPages);
  }, []);

  const handlePageScroll = async (e) => {
    const newPos = e.nativeEvent.position;
    const offset = e.nativeEvent.offset;
  }

  useEffect(() => {
    console.log("new pages created");
  }, [pages]);

  return (
      <AnimatedPagerView
        style={styles.pagerView}
        initialPage={route.params.startPage}
        onPageScroll={(e) => handlePageScroll(e) }
        onPageSelected={async (e) =>{
          Speech.stop();
          Speech.speak(pages[e.nativeEvent.position].text, { rate: 0.8, voice: "com.apple.ttsbundle.Karen-compact" });
          setCurrentPage(e.nativeEvent.position)
        }}
      >
        {
        pages.map((page, index) => {
          const isLastPage = index === pages.length - 1;

          return (
            <View key={`${page.pageNumber}`} style={styles.page}>
              <Image style={styles.imageView} source={{ uri: page.imageURL }} />
              <View style={isLastPage ? styles.lastPageTextContainer : styles.textContainer}>
                <Text style={styles.textView}>{page.text}</Text>
                {/* Render OptionChoices only on the last page */}
                {page.options.length > 0 && (
                  <ScrollView>
                  <OptionChoices
                    options={page.options}
                    onChoiceSelect={async (choiceId) => {
                      if (isLastPage) {  //request continueStory
                        console.log(`User selected: ${choiceId}`);

                        // make post request to continue story
                        axios.post('https://storybookaiserver.azurewebsites.net/continue-story', { storyID: storyID, option: choiceId })
                        .then((response) => {
                          console.log("response.data: ", response.data);
                          const responseStoryData = response.data;
                          const newTexts = responseStoryData.texts;
                          const newImageURLs = responseStoryData.images;

                          // make new pages
                          var newPages = [];
                          let imgCnt = 0;
                          for (var i = 0; i < newTexts.length; i++) {
                            const text = newTexts[i];
                            if (!text.toLowerCase().startsWith('option')) {  //if it is a paragraph
                              const imageURL = newImageURLs[imgCnt];
                              let options = []
                              for (const text of newTexts.slice(i+1)) {
                                if (!text.toLowerCase().startsWith('option')) {  //if next text is not option, break
                                  break
                                }
                                options.push(text)
                              }

                              const page = {
                                text: text,
                                imageURL: imageURL,
                                pageNumber: (i + 1),
                                options: options
                              };
                              newPages.push(page);
                              imgCnt += 1;
                            }
                          }

                          setPages(newPages);
                        })
                        .catch(error => {
                          console.error(error);
                        });
                      }
                    }}
                  />
                  </ScrollView>
                )}
              </View>
            </View>
          );
        })}
      </AnimatedPagerView>
  );
};

const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
  },
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
  },
  lastPageTextContainer: {
    flex: 1,
    justifyContent: 'flex-start', // align text to the top for the last page
  },
  textView: {
    fontSize: 15,
    fontFamily: 'Baskerville',
    marginTop: 20,
    margin: 10,
    marginRight: 50,
  },
  imageView: {
    width: 375,
    height: 375,
    flex: 1
  },
});

export default BookViewer;