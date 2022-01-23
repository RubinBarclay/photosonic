import { Feather } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
  TextInput,
  View,
} from "react-native";
import LanguageTaskbar from "../../components/LanguageTaskbar/LanguageTaskbar";
import LanguageInfoContext from "../../context/languageInfoContext";
import styles from "./Languages.styles";
import theme from "../../theme.styles";
import data from "./data";

function Language({ info, languageSelectHandler }) {
  return (
    <TouchableOpacity
      key={info[1]}
      style={styles.listItem}
      onPress={() => languageSelectHandler(info)}
    >
      <Text>{info[0]}</Text>
    </TouchableOpacity>
  );
}

function Header({
  searchString,
  searchHandler,
  clearSearchHandler,
  navigateBack,
}) {
  return (
    <View style={styles.topBar}>
      <TouchableOpacity style={styles.backBtn} onPress={navigateBack}>
        <Feather name="arrow-left" size={32} color={theme.black} />
      </TouchableOpacity>
      <TextInput
        placeholder="Search"
        style={styles.searchBar}
        onChangeText={searchHandler}
        value={searchString}
      />
      <TouchableOpacity style={styles.clearSearch} onPress={clearSearchHandler}>
        <Feather name="x" size={20} color={theme.black} />
      </TouchableOpacity>
    </View>
  );
}

function Languages({ navigation }) {
  const [searchString, setSearchString] = useState("");
  const [listItems, setListItems] = useState(data);
  const [mode, setMode] = useState("from");
  const { languageInfo, setLanguageInfo } = useContext(LanguageInfoContext);

  const searchHandler = (string) => {
    const filteredItems = data.filter((item) =>
      RegExp(searchString, "i").test(item[0])
    );
    setListItems(filteredItems);
    setSearchString(string);
  };

  const languageSelectHandler = (item) => {
    setMode((prev) => (prev === "from" ? "to" : "from"));
    setLanguageInfo((prev) => ({ ...prev, [mode]: item }));

    if (mode === "to") {
      navigation.navigate("Camera");
    }
  };

  const clearSearchHandler = () => {
    setSearchString("");
    setListItems(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        searchString={searchString}
        searchHandler={searchHandler}
        clearSearchHandler={clearSearchHandler}
        navigateBack={() => navigation.navigate("Camera")}
      />
      <FlatList
        data={listItems}
        renderItem={({ item }) => (
          <Language info={item} languageSelectHandler={languageSelectHandler} />
        )}
        keyExtractor={(item) => item[1]}
        style={styles.list}
      />
      <LanguageTaskbar
        mode={mode}
        setMode={setMode}
        languageInfo={languageInfo}
      />
    </SafeAreaView>
  );
}

export default Languages;
