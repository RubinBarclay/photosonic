import { useEffect, useRef, useState } from "react";
import { Camera as PhoneCamera } from "expo-camera";
import { StatusBar } from "expo-status-bar";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import * as ImageManipulator from "expo-image-manipulator";
import styles from "./Camera.styles";
import config from "../../config.json";
import CameraTaskbar from "../../components/CameraTaskbar";

function Camera({ navigation }) {
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
    const { status } = await PhoneCamera.requestCameraPermissionsAsync();
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
    console.log(data.responses[0].labelAnnotations[0].description);
    setIdentifiedObject(data.responses[0].labelAnnotations[0].description);
    translateWord(data.responses[0].labelAnnotations[0].description);
  };

  const translateWord = async (identifiedObject) => {
    const baseURL = config.googleCloud.translateApi;
    // const params = `${config.googleCloud.apiKey}&q=${identifiedObject}&target=${translateLanguage}&source=en`;
    const params = `${config.googleCloud.apiKey}&q=${identifiedObject}&target=sv&source=en`;
    // const response = await fetch(
    //   `${config.googleCloud.translateApi}${config.googleCloud.apiKey}&q=${identifiedObject}&target=${translateLanguage}&source=en`,
    const response = await fetch(baseURL + params, { method: "POST" });

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
        <PhoneCamera style={styles.camera} ref={cameraRef} />
      )}
      <CameraTaskbar
        navigation={navigation}
        showPreview={showPreview}
        takePicture={takePicture}
        closePreview={closePreview}
        identify={callGoogleCloudVision}
      />
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

export default Camera;
