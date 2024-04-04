import React, { useRef } from 'react';
import { StyleSheet, Animated, PanResponder, View, Image } from 'react-native';

const DraggableImage = ({source}) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: pan.x, dy: pan.y }, // dx and dy are the gesture deltas
        ],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        Animated.spring(
          pan, // Auto-multiplexed
          { toValue: { x: 0, y: 0 }, useNativeDriver: false } // Back to initial position
        ).start();
      },
    })
  ).current;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Animated.View
        {...panResponder.panHandlers}
        style={{
          transform: pan.getTranslateTransform(),
        }}
      >
        <Image
          source={{ uri: source }}
          style={styles.imageView}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
    imageView: {
      width: 100,
      height: "100%",
      position: 'absolute',
      top: 0,
      left: 0,
    //   flex: 1,
    },

  });

export default DraggableImage;
