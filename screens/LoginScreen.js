import React from "react";
import { View, Text, Button } from "react-native";
//import useAuth from "../hooks/useAuth";
import App from './App';
const LoginScreen= () => {
const { user } = promptAsync();
return (
<View>
<Text>Login to the app</Text>
{<Button title="login" onPress={ user } />}
</View>
);
};
export default LoginScreen;