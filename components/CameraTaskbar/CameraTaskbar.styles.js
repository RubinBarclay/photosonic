import { StyleSheet } from "react-native";
import theme from "../../theme.styles";

const styles = StyleSheet.create({
  taskbar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    paddingHorizontal: 12,

    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.white,
  },
  cameraBtn: {
    height: 100,
    width: 100,
    marginBottom: 40,
    borderRadius: 100,
    borderWidth: 6,
    borderColor: theme.white,
    backgroundColor: theme.purple,

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: theme.purple,
    color: theme.white,
    width: 100,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 4,
  },
  retakeIcon: {
    color: theme.purpleLight,
  },
});

export default styles;
