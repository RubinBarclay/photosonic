import { Camera } from "expo-camera";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function App() {
  const [cameraAccess, setCameraAccess] = useState(false);
  const [picture, setPicture] = useState(null);
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
    setPicture(picture.uri);
    console.log(picture);
  };

  return cameraAccess ? (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={cameraRef}>
        <TouchableOpacity style={styles.cameraBtn} onPress={takePicture} />
      </Camera>
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
});
