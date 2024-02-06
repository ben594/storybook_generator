import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

const SubjectBanner = ({ navigation, title, description, color }) => {
  const [expanded, setExpanded] = useState(false);
  const animatedValue = new Animated.Value(expanded ? 1 : 0);

  const handlePress = () => {
    setExpanded(!expanded);
    Animated.timing(animatedValue, {
      toValue: expanded ? 0 : 1,
      duration: 300, // Adjust duration as needed
      useNativeDriver: false,
    }).start();
  };

  const visitSubject = () => {
    navigation.navigate('SubjectScreen', { subject: title });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={[styles.bannerContainer]}>
      <Animated.View style={[styles.banner, { backgroundColor: color }]}>
        <Text style={styles.bannerText}>{title}</Text>
        {expanded &&
        <View style={styles.descriptionView}>
          <Text style={styles.description}>{description}</Text>
          <TouchableOpacity style={styles.visitSubjectButton} onPress={visitSubject}>
            <Text style={styles.visitSubjectButtonText}>
              Explore {title}!
            </Text>
          </TouchableOpacity>
        </View>
        }

      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    width: '100%',
  },
  banner: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  bannerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    padding: 30,
  },
  description: {
    fontSize: 24,
    color: '#ffffff',
    padding: 10,
  },
  descriptionView: {
    height: 150,
    alignItems: 'center',
  },
  visitSubjectButton: {
    backgroundColor: '#ead8ca',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  visitSubjectButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  }
});

export default SubjectBanner;
