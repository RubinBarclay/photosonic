import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

function LanguageTaskbar({ languageInfo, mode, setMode }) {
  return (
    <View style={styles.taskbar}>
      <TouchableOpacity
        onPress={() => setMode("from")}
        style={{
          ...styles.tab,
          backgroundColor: mode === "from" ? "#333" : null,
          // opacity: active === "from" ? 1 : 0.5,
        }}
      >
        <Text style={styles.textSmall}>From</Text>
        <Text style={styles.textLarge} numberOfLines={1}>
          {languageInfo.from[0].toUpperCase()}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setMode("to")}
        style={{
          ...styles.tab,
          backgroundColor: mode === "to" ? "#333" : null,
          // opacity: active === "to" ? 1 : 0.5,
        }}
      >
        <Text style={styles.textSmall}>To</Text>
        <Text style={styles.textLarge} numberOfLines={1}>
          {languageInfo.to[0].toUpperCase()}
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

    flex: 1,
    flexDirection: "row",
  },
  tab: {
    // flexGrow: 1,
    width: "50%",
    paddingTop: 12,
    paddingHorizontal: 20,
  },
  smallTab: {
    backgroundColor: "orangered",
    flexGrow: 0.4,
    paddingTop: 12,
  },
  textSmall: {
    fontSize: 15,
    opacity: 0.5,
    textAlign: "center",
  },
  textLarge: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default LanguageTaskbar;
