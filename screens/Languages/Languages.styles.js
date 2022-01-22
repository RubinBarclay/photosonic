import { StyleSheet, StatusBar } from "react-native";
// import { initialWindowMetrics } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    paddingBottom: 80,
  },
  topBar: {
    position: "relative",
    // flexWrap: "wrap",
    alignItems: "center",
    flexDirection: "row",
    padding: 5,
    // flexDirection: "row",
    // alignItems: "center",
    // height: 40,
  },
  searchBar: {
    // height: 40,
    flexGrow: 1,
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 50,
    color: "black",
  },
  backBtn: {
    marginHorizontal: 5,
    // width: 40,
    // height: 40,
    // backgroundColor: "#000",
  },
  clearSearch: {
    position: "absolute",
    right: 25,
    top: 18,
  },
  list: {
    // marginTop: 40,
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

export default styles;
