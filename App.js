import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Camera from "./screens/Camera/Camera.js";
import Languages from "./screens/Languages/Languages.js";
import { useEffect, useState, useMemo } from "react";
import { NativeModules, Platform } from "react-native";
import LanguageInfoContext from "./context/languageInfoContext.js";

function App() {
  const Stack = createNativeStackNavigator();

  const [languageInfo, setLanguageInfo] = useState({
    from: ["English", "en"],
    to: ["Swedish", "sv"],
  });
  const value = useMemo(
    () => ({ languageInfo, setLanguageInfo }),
    [languageInfo]
  );

  return (
    <LanguageInfoContext.Provider value={value}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Camera"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Camera" component={Camera} />
          <Stack.Screen name="Languages" component={Languages} />
        </Stack.Navigator>
      </NavigationContainer>
    </LanguageInfoContext.Provider>
  );
}

export default App;
