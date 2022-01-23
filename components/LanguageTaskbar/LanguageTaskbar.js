import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "./LanguageTaskbar.styles";
import theme from "../../theme.styles";

function LanguageTaskbar({ languageInfo, mode, setMode }) {
  return (
    <View style={styles.taskbar}>
      <TouchableOpacity
        onPress={() => setMode("from")}
        style={{
          ...styles.tab,
          borderColor: mode === "from" ? theme.purple : theme.white,
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
          borderColor: mode === "to" ? theme.purple : theme.white,
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

export default LanguageTaskbar;
