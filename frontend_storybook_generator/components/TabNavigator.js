import React, { useEffect, useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useFocusEffect } from '@react-navigation/native';

import StorybookApp from './StorybookApp';
import LearnScreen from './learn/LearnScreen';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerShown: false,
        tabBarStyle: {
          height: 80,
          paddingHorizontal: 5,
          paddingTop: 0,
          backgroundColor: '#ead8ca',
          position: 'absolute',
          borderTopWidth: 0,
        },
      })}
    >
      <Tab.Screen
        name="Library"
        component={StorybookApp}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Learn"
        component={LearnScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;