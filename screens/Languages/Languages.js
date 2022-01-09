import { Feather } from "@expo/vector-icons";
// import { NavigationContainer } from "@react-navigation/native";
import { useContext, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import LanguageTaskbar from "../../components/LanguageTaskbar";
import LanguageInfoContext from "../../context/languageInfoContext";
import data from "./data";

function Language({ info, updateLanguage }) {
  return (
    <TouchableOpacity
      key={info[1]}
      style={styles.listItem}
      onPress={() => updateLanguage(info)}
    >
      <Text>{info[0]}</Text>
    </TouchableOpacity>
  );
}

function Languages({ navigation }) {
  const [mode, setMode] = useState("from");
  const { languageInfo, setLanguageInfo } = useContext(LanguageInfoContext);

  const languageSelectHandler = (item) => {
    setMode((prev) => (prev === "from" ? "to" : "from"));
    setLanguageInfo((prev) => ({ ...prev, [mode]: item }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Language info={item} updateLanguage={languageSelectHandler} />
        )}
        keyExtractor={(item) => item[1]}
      />
      <LanguageTaskbar
        mode={mode}
        setMode={setMode}
        languageInfo={languageInfo}
      />
      <TouchableOpacity
        style={styles.closeBtn}
        onPress={() => navigation.navigate("Camera")}
      >
        <Feather name="x" size={22} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    paddingBottom: 80,
  },
  listItem: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  closeBtn: {
    position: "absolute",
    // top: (StatusBar.currentHeight || 0) + 10,
    top: 10,
    right: 20,
    padding: 15,
    borderRadius: 100,
    backgroundColor: "#000",
  },
});

export default Languages;
