// import React from "react";
// import { FlatList, SafeAreaView, View, Text } from "react-native";
// import styles from "./Languages.styles";
import data from "./data";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from "react-native";

function Language({ info }) {
  return (
    <View key={info[1]} style={styles.listItem}>
      {/* <View style={styles.listItem}> */}
      <Text>{info[0]}</Text>
    </View>
  );
}

function Languages() {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <Language info={item} />}
        keyExtractor={(item) => item[1]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
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
});

export default Languages;
