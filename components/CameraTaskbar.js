import React from "react";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

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
        {showPreview && <Feather name="x" size={50} color="gray" />}
      </TouchableOpacity>
      <TouchableOpacity disabled={!showPreview} onPress={identify}>
        <Text style={styles.btn}>
          <Feather name="search" size={16} /> Identify
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  taskbar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    paddingHorizontal: 12,

    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
  },
  cameraBtn: {
    // position: "absolute",
    // bottom: 16,
    height: 100,
    width: 100,
    marginBottom: 40,
    borderRadius: 100,
    borderWidth: 8,
    borderColor: "white",
    backgroundColor: "#ccc",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    fontSize: 16,
    textAlign: "center",
    backgroundColor: "#ddd",
    width: 100,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 4,
  },
});

export default Taskbar;
