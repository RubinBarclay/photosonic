import { useEffect, useRef, useState, useContext } from "react";
import { Camera as CameraComponent } from "expo-camera";
import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImageManipulator from "expo-image-manipulator";
import styles from "./Camera.styles";
import config from "../../config.json";
import CameraTaskbar from "../../components/CameraTaskbar/CameraTaskbar";
import LanguageInfoContext from "../../context/languageInfoContext";
import { useIsFocused } from "@react-navigation/core";
import { Feather } from "@expo/vector-icons";
import theme from "../../theme.styles";

function Camera({ navigation }) {
  const [cameraAccess, setCameraAccess] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [picture, setPicture] = useState(null);
  const [base64, setBase64] = useState(null);
  const [identifiedObject, setIdentifiedObject] = useState("");
  const [translatedObject, setTranslatedObject] = useState("");
  const [flashMode, setFlashMode] = useState(
    CameraComponent.Constants.FlashMode.off
  );
  const [cameraType, setCameraType] = useState(
    CameraComponent.Constants.Type.back
  );

  const { languageInfo } = useContext(LanguageInfoContext);
  const cameraRef = useRef(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    requestCameraAccess();
  }, []);

  useEffect(() => {
    setShowLoading(false);
  }, [translatedObject]);

  const requestCameraAccess = async () => {
    const { status } = await CameraComponent.requestCameraPermissionsAsync();
    setCameraAccess(status === "granted");
  };

  const takePicture = async () => {
    // setShowLoading(true);
    const picture = await cameraRef.current.takePictureAsync();
    setPicture(picture);
    setShowPreview(true);
    convertImageToBase64(picture);
  };

  const closePreview = () => {
    setPicture(null);
    setShowPreview(false);
    setIdentifiedObject("");
    setTranslatedObject("");
  };

  const convertImageToBase64 = async (picture) => {
    const manipulatedPicture = await ImageManipulator.manipulateAsync(
      picture.uri,
      [],
      { base64: true, compress: 0.65, format: "jpeg" }
    );
    setBase64(manipulatedPicture.base64);
  };

  const callGoogleCloudVision = async () => {
    setShowLoading(true);
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
    translateWord(data.responses[0].labelAnnotations[0].description);
  };

  const translateWord = async (identifiedObject) => {
    const baseURL = config.googleCloud.translateApi;
    const params = `${config.googleCloud.apiKey}&q=${identifiedObject}&target=${languageInfo.to[1]}&source=${languageInfo.from[1]}`;
    const response = await fetch(baseURL + params, { method: "POST" });

    const data = await response.json();
    setTranslatedObject(data.data.translations[0].translatedText);
  };

  const toggleCameraTypeHandler = () => {
    setCameraType(
      cameraType === CameraComponent.Constants.Type.back
        ? CameraComponent.Constants.Type.front
        : CameraComponent.Constants.Type.back
    );
  };

  const toggleFlashHandler = () => {
    setFlashMode(
      flashMode === CameraComponent.Constants.FlashMode.off
        ? CameraComponent.Constants.FlashMode.on
        : CameraComponent.Constants.FlashMode.off
    );
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
          {identifiedObject !== "" && translatedObject !== "" ? (
            <>
              <Text style={styles.translationPopup}>{identifiedObject}</Text>
              <Text style={styles.translationPopup}>{translatedObject}</Text>
            </>
          ) : showLoading ? (
            <ActivityIndicator
              size="large"
              color={theme.purple}
              style={styles.spinner}
            />
          ) : null}
        </ImageBackground>
      ) : isFocused ? ( // isFocused ensures the camera mounts when navigating
        <>
          <CameraComponent
            style={styles.camera}
            ref={cameraRef}
            autoFocus="on"
            type={cameraType}
            flashMode={flashMode}
          />
          <TouchableOpacity
            style={styles.flashBtn}
            onPress={toggleFlashHandler}
          >
            {flashMode === CameraComponent.Constants.FlashMode.off ? (
              <Feather name="zap" size={24} color={theme.white} />
            ) : (
              <Feather name="zap-off" size={24} color={theme.white} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.flipBtn}
            onPress={toggleCameraTypeHandler}
          >
            <Feather name="refresh-ccw" size={24} color={theme.white} />
          </TouchableOpacity>
        </>
      ) : null}
      <CameraTaskbar
        navigation={navigation}
        showPreview={showPreview}
        takePicture={takePicture}
        closePreview={closePreview}
        identify={callGoogleCloudVision}
        languageInfo={languageInfo}
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
