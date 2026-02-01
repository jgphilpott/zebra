import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import MatchingScreen from './src/screens/MatchingScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'Zebra Dating' }}
        />
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen}
          options={{ title: 'Your Profile' }}
        />
        <Stack.Screen 
          name="Matching" 
          component={MatchingScreen}
          options={{ title: 'Find Matches' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
