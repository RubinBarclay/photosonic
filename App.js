import { Camera } from "expo-camera";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImageManipulator from "expo-image-manipulator";
import styles from "./App.styles.js";
import config from "./config.json";

// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function App() {
  const [cameraAccess, setCameraAccess] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [picture, setPicture] = useState(null);
  const [base64, setBase64] = useState(null);
  const [identifiedObject, setIdentifiedObject] = useState("");
  const [translatedObject, setTranslatedObject] = useState("");

  const cameraRef = useRef(null);

  useEffect(() => {
    requestCameraAccess();
  }, []);

  const requestCameraAccess = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setCameraAccess(status === "granted");
  };

  const takePicture = async () => {
    const picture = await cameraRef.current.takePictureAsync();
    const manipulatedPicture = await ImageManipulator.manipulateAsync(
      picture.uri,
      [], // [{ resize: { width: 300 } }],
      { base64: true, compress: 0.65, format: "jpeg" }
    );
    setPicture(picture);
    setBase64(manipulatedPicture.base64);
    setShowPreview(true);
  };

  const closePreview = () => {
    setPicture(null);
    setShowPreview(false);
    setIdentifiedObject("");
  };

  const callGoogleCloudVision = async () => {
    const response = await fetch(
      config.googleCloud.cloudVisionApi + config.googleCloud.apiKey,
      {
        method: "POST",
        body: JSON.stringify({
          requests: [
            {
              image: {
                content: base64,
              },
              features: [{ type: "LABEL_DETECTION", maxResults: 1 }],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    setIdentifiedObject(data.responses[0].labelAnnotations[0].description);
    console.log(data.responses[0].labelAnnotations[0].description);
    translateWord(data.responses[0].labelAnnotations[0].description);
  };

  const translateWord = async (identifiedObject) => {
    const baseURL = config.googleCloud.translateApi;
    // const params = `${config.googleCloud.apiKey}&q=${identifiedObject}&target=${translateLanguage}&source=en`;
    const params = `${config.googleCloud.apiKey}&q=${identifiedObject}&target=sv&source=en`;
    // const response = await fetch(
    //   `${config.googleCloud.translateApi}${config.googleCloud.apiKey}&q=${identifiedObject}&target=${translateLanguage}&source=en`,
    const response = await fetch(baseURL + params, {
      method: "POST",
      // body: JSON.stringify({})
    });

    const data = await response.json();
    setTranslatedObject(data.data.translations[0].translatedText);
    console.log(data.data.translations[0].translatedText);
  };

  return cameraAccess ? (
    <View style={styles.container}>
      {showPreview && picture ? (
        <ImageBackground
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
          source={picture}
        >
          <TouchableOpacity style={styles.retakeBtn} onPress={closePreview}>
            <Text style={{ fontSize: 18 }}>
              <Ionicons name="close" size={16} /> Retake
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.searchBtn}
            onPress={callGoogleCloudVision}
          >
            <Text style={{ fontSize: 18 }}>
              {/* Find song <Ionicons name="musical-notes" size={16} /> */}
              Identify <Ionicons name="search" size={16} />
            </Text>
          </TouchableOpacity>
          {identifiedObject !== "" && translatedObject !== "" && (
            <>
              <Text
                style={{
                  fontSize: 20,
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                  backgroundColor: "#222",
                  borderRadius: 8,
                }}
              >
                {identifiedObject}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                  backgroundColor: "#222",
                  borderRadius: 8,
                  marginTop: 12,
                }}
              >
                {translatedObject}
              </Text>
            </>
          )}
        </ImageBackground>
      ) : (
        <Camera style={styles.camera} ref={cameraRef}>
          <TouchableOpacity style={styles.cameraBtn} onPress={takePicture} />
        </Camera>
      )}
      <StatusBar style="auto" />
    </View>
  ) : (
    <View style={styles.container}>
      <Text>This app requires your camera in order to work</Text>
      <TouchableOpacity
        style={styles.requestPermission}
        onPress={requestCameraAccess}
      >
        <Text>Allow camera access</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

// // ONLY FOR LEARNING BUCKO

// function Bong({ route, navigation }) {
//   const { msg } = route.params;
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>Bong bing</Text>
//       <Text>Message: {JSON.stringify(msg)}</Text>
//       <Button
//         title="Go Bing"
//         onPress={() =>
//           navigation.navigate("Bing", {
//             msg: "Facka u Bing! I hate all u Bongs!",
//           })
//         }
//       />
//     </View>
//   );
// }

// function Bing({ route, navigation }) {
//   const { msg } = route.params;
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>Bing bong</Text>
//       <Text>Message: {msg}</Text>
//       <Button
//         title="Go Bong"
//         onPress={() =>
//           navigation.navigate("Bong", { msg: "Why u no Bing, Bong?!" })
//         }
//       />
//     </View>
//   );
// }

// export default function App() {
//   const Stack = createNativeStackNavigator();

//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         initialRouteName="Bing"
//         screenOptions={{ headerShown: false }}
//       >
//         <Stack.Screen
//           name="Bing"
//           component={Bing}
//           initialParams={{ msg: "" }}
//         />
//         <Stack.Screen
//           name="Bong"
//           component={Bong}
//           initialParams={{ msg: "" }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
