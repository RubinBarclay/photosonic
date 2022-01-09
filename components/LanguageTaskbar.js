import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

function LanguageTaskbar({ navigation }) {
  const [active, setActive] = useState("from");

  return (
    <View style={styles.taskbar}>
      <TouchableOpacity
        onPress={() => setActive("from")}
        style={{
          ...styles.tab,
          backgroundColor: active === "from" ? null : "#333",
          // opacity: active === "from" ? 1 : 0.5,
        }}
      >
        <Text style={styles.textSmall}>From</Text>
        <Text style={styles.textLarge}>English</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setActive("to")}
        style={{
          ...styles.tab,
          backgroundColor: active === "to" ? null : "#333",
          // opacity: active === "to" ? 1 : 0.5,
        }}
      >
        <Text style={styles.textSmall}>To</Text>
        <Text style={styles.textLarge}>Swedish</Text>
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
    // justifyContent: "space-between",
    // alignItems: "center",
    // backgroundColor: "white",
    // backgroundColor: "#333",
  },
  tab: {
    flexGrow: 1,
    paddingTop: 12,
    // backgroundColor: "#333",
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
