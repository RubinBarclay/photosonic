import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
  },
  requestPermission: {
    backgroundColor: "#DDD",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 10,
  },
  retakeBtn: {
    position: "absolute",
    bottom: 90,
    left: 15,
    backgroundColor: "#FFF",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  searchBtn: {
    position: "absolute",
    bottom: 90,
    right: 15,
    backgroundColor: "#FFF",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});

export default styles;
