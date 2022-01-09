import { Button, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Camera from "./screens/Camera/Camera.js";
import Languages from "./screens/Languages/Languages.js";
import { useEffect } from "react";

import { NativeModules, Platform } from "react-native";

function App() {
  const Stack = createNativeStackNavigator();

  // Get current language (locale) from users phone
  // Set that locale as default (source) lang when displaying object label
  useEffect(() => {
    const deviceLanguage =
      Platform.OS === "ios"
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
        : NativeModules.I18nManager.localeIdentifier;

    console.log(deviceLanguage); //en_GB
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Camera"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Camera" component={Camera} />
        <Stack.Screen name="Languages" component={Languages} />
        {/* <Stack.Screen
          name="Bong"
          component={Bong}
          initialParams={{ msg: "" }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
