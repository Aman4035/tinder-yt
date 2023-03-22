import React from 'react';

import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './StackNavigator';
import { AuthProvider } from './hooks/useAuth';

import {useTailwind} from 'tailwind-rn'
export default function App() {
  const tailwind = useTailwind();

  return (
    <NavigationContainer>
        <AuthProvider>
          <StackNavigator />
        </AuthProvider>
        
    </NavigationContainer>
  );
}


