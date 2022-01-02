import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
  },
  cameraBtn: {
    width: 80,
    height: 80,
    marginBottom: 20,
    // backgroundColor: "#FFF",
    borderRadius: 100,
    borderWidth: 5,
    borderColor: "#FFF",
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
    bottom: 10,
    left: 15,
    backgroundColor: "#FFF",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  searchBtn: {
    position: "absolute",
    bottom: 10,
    right: 15,
    backgroundColor: "#FFF",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});

export default styles;
