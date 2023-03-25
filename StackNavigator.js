import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
//import { View, Text } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import LoginScreen from './screens/LoginScreen';
//import useAuth from './hooks/useAuth';
import App from './App';
//const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const { user }= promptAsync();
return (
<Stack.Navigator>
  {user ? (
    <>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </>
  ) : (
    <Stack.Screen name="Login" component={LoginScreen} />
  
  )}
</Stack.Navigator>
);
};
export default StackNavigator