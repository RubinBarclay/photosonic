import { StyleSheet } from "react-native";
import theme from "../../theme.styles";

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
    width: "50%",
    paddingTop: 12,
    paddingHorizontal: 20,
    backgroundColor: theme.white,
    borderBottomWidth: 4,
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

export default styles;
