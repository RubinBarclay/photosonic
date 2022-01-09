import { Feather } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
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
import data from "./data";

function Language({ info }) {
  return (
    <View key={info[1]} style={styles.listItem}>
      <Text>{info[0]}</Text>
    </View>
  );
}

function Languages({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <Language info={item} />}
        keyExtractor={(item) => item[1]}
      />
      <LanguageTaskbar />
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
