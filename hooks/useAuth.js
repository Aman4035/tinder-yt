import { useEffect, useState, createContext, useContext } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

WebBrowser.maybeCompleteAuthSession();

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signInWithGoogle = async () => {
    const config = {
      androidClientId:
        "743997305584-616q9hsm4c7mtflbjvesuievt7a3924q.apps.googleusercontent.com",
      iosClientId:
        "743997305584-tl81mkv4mtbqtrbqdnlt88q38dptpffc.apps.googleusercontent.com",
    };

    try {
      const logInResult = await Google.logInAsync(config);
      if (logInResult.type === "success") {
        const { accessToken } = logInResult.authentication;
        setUser({ accessToken });
      }
    } catch (error) {
      // Add your own error handler here
    }
  };

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}

export default function App() {
  const { user, signInWithGoogle } = useAuth();
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await fetch(
          "https://www.googleapis.com/userinfo/v2/me",
          {
            headers: { Authorization: `Bearer ${user.accessToken}` },
          }
        );

        const userInfo = await response.json();
        setUserInfo(userInfo);
      } catch (error) {
        // Add your own error handler here
      }
    };

    if (user?.accessToken) {
      getUserInfo();
    }
  }, [user]);

  return (
    <View style={styles.container}>
      {userInfo?.name ? (
        <Text style={styles.text}>{userInfo.name}</Text>
      ) : (
        <Button
          title="Sign in with Google"
          onPress={() => {
            signInWithGoogle();
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
