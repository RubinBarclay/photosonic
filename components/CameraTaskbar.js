import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

function Taskbar({
  navigation,
  showPreview,
  takePicture,
  closePreview,
  identify,
}) {
  return (
    <View style={styles.taskbar}>
      <TouchableOpacity onPress={() => navigation.navigate("Languages")}>
        <Text style={styles.btn}>
          EN <Feather name="arrow-right" size={16} /> SV
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
