import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import PagerView from 'react-native-pager-view';
import Button from './Button';

const BookViewer = ({ route, navigation }) => {
  const [pages, setPages] = useState([]);

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
    <PagerView style={styles.pagerView} initialPage={0} transitionStyle={'curl'} scrollEnabled={true}>
      {pages.map((page) => {
        return (
          <View key={page.pageNumber}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Button style={{ width: 50 }} onPress={null} text={'Login'}/>
              <Button onPress={null} text={'Sign Up'}/>
            </View>
            <View style={styles.pageView}>
              <Image
                style={styles.imageView}
                source={{ uri: page.imageURL }}
              />
              <Text style={styles.textView}>
                {page.text}
              </Text>
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
    backgroundColor: '#ead8ca'
  },
  pageView: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textView: {
    margin: 30,
    fontSize: 20,
    fontFamily: 'Baskerville'
  },
  imageView: {
    margin: "auto",
    width: 256,
    height: 256
  }
});

export default BookViewer;
