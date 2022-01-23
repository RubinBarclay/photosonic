import React from "react";
import { Feather } from "@expo/vector-icons";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "./CameraTaskbar.styles";

function Taskbar({
  navigation,
  showPreview,
  takePicture,
  closePreview,
  identify,
  languageInfo,
}) {
  return (
    <View style={styles.taskbar}>
      <TouchableOpacity onPress={() => navigation.navigate("Languages")}>
        <Text style={styles.btn}>
          {languageInfo.from[2] // Third item check is error handling for chinese
            ? languageInfo.from[2].toUpperCase()
            : languageInfo.from[1].toUpperCase()}
          <Feather name="arrow-right" size={16} />{" "}
          {languageInfo.to[2] // Third item check is error handling for chinese
            ? languageInfo.to[2].toUpperCase()
            : languageInfo.to[1].toUpperCase()}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cameraBtn}
        onPress={!showPreview ? takePicture : closePreview}
      >
        {showPreview && (
          <Feather name="x" size={50} style={styles.retakeIcon} />
        )}
      </TouchableOpacity>
      <TouchableOpacity disabled={!showPreview} onPress={identify}>
        <Text
          style={{
            ...styles.btn,
            textDecorationLine: !showPreview ? "line-through" : null,
          }}
        >
          <Feather name="search" size={16} /> Identify
        </Text>
      </TouchableOpacity>
    </View>
  );
}
export default Taskbar;
