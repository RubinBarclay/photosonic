import { Camera } from "expo-camera";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImageManipulator from "expo-image-manipulator";
import config from "./config.json";

export default function App() {
  const [cameraAccess, setCameraAccess] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [picture, setPicture] = useState(null);
  const [base64, setBase64] = useState(null);
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
    const resizedPhoto = await ImageManipulator.manipulateAsync(
      picture.uri,
      [],
      // [{ resize: { width: 300 } }], // resize to width of 300 and preserve aspect ratio
      { base64: true, compress: 0.65, format: "jpeg" }
    );
    // console.log(Object.keys(resizedPhoto)); // { height, width, uri, base64}
    // console.log(resizedPhoto);
    setPicture(resizedPhoto);
    setBase64(resizedPhoto.base64);
    setShowPreview(true);
  };

  const closePreview = () => {
    setPicture(null);
    setShowPreview(false);
  };

  const callGoogleCloudVision = async () => {
    // const base64 = await FileSystem.readAsStringAsync(picture.uri, {
    //   encoding: "base64",
    // });
    const response = await fetch(
      config.googleCloud.api + config.googleCloud.apiKey,
      {
        method: "POST",
        body: JSON.stringify({
          requests: [
            {
              image: {
                content: base64,
              },
              features: [
                { type: "LABEL_DETECTION", maxResults: 3 },
                // { type: "LANDMARK_DETECTION", maxResults: 5 },
                // { type: "FACE_DETECTION", maxResults: 5 },
                // { type: "LOGO_DETECTION", maxResults: 5 },
                // { type: "TEXT_DETECTION", maxResults: 5 },
                // { type: "DOCUMENT_TEXT_DETECTION", maxResults: 5 },
                // { type: "SAFE_SEARCH_DETECTION", maxResults: 5 },
                // { type: "IMAGE_PROPERTIES", maxResults: 5 },
                // { type: "CROP_HINTS", maxResults: 5 },
                // { type: "WEB_DETECTION", maxResults: 5 },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    console.log(data.responses);
  };

  return cameraAccess ? (
    <View style={styles.container}>
      {showPreview && picture ? (
        <ImageBackground style={{ flex: 1, width: "100%" }} source={picture}>
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
              Find song <Ionicons name="musical-notes" size={16} />
            </Text>
          </TouchableOpacity>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
  },
  cameraBtn: {
    width: 80,
    height: 80,
    marginBottom: 20,
    // backgroundColor: "#FFF",
    borderRadius: 100,
    borderWidth: 5,
    borderColor: "#FFF",
  },
  requestPermission: {
    backgroundColor: "#DDD",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 10,
  },
  retakeBtn: {
    position: "absolute",
    bottom: 10,
    left: 15,
    backgroundColor: "#FFF",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  searchBtn: {
    position: "absolute",
    bottom: 10,
    right: 15,
    backgroundColor: "#FFF",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});
