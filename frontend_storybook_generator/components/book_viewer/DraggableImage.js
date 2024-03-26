import React, { useRef } from 'react';
import { Animated, PanResponder, View, Image } from 'react-native';

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
          style={{ width: 100, height: 100 }}
        />
      </Animated.View>
    </View>
  );
};

export default DraggableImage;
