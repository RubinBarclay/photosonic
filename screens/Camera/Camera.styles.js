import { StyleSheet } from "react-native";
import theme from "../../theme.styles";

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: theme.white,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
  },
  flashBtn: {
    position: "absolute",
    top: 160,
    right: 8,
    color: theme.white,
  },
  flipBtn: {
    position: "absolute",
    top: 200,
    right: 8,
    color: theme.purple,
  },
  translationPopup: {
    fontSize: 20,
    marginVertical: 5,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: theme.white,
    color: theme.black,
    borderRadius: 8,
  },
  requestPermission: {
    backgroundColor: theme.purpleLight,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 10,
  },
});

export default styles;
