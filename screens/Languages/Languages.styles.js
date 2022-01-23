import { StyleSheet, StatusBar } from "react-native";
import theme from "../../theme.styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    paddingBottom: 80,
  },
  topBar: {
    position: "relative",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 5,
    paddingVertical: 8,
  },
  searchBar: {
    flexGrow: 1,
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: theme.white,
    borderRadius: 50,
    color: theme.black,
  },
  backBtn: {
    marginRight: 5,
  },
  clearSearch: {
    position: "absolute",
    right: 25,
    top: 22,
  },
  list: {
    backgroundColor: theme.white,
  },
  listItem: {
    fontSize: 18,
    padding: 20,
    marginHorizontal: 12,
    backgroundColor: theme.white,
    color: theme.black,
    borderBottomWidth: 1,
    borderBottomColor: theme.gray,
  },
  title: {
    fontSize: 32,
  },
});

export default styles;
