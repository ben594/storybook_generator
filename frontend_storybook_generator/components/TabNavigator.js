import React, { useEffect, useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

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
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Learn"
        component={LearnScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bulb" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;