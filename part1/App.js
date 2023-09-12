import React from "react";
import { StyleSheet, View } from "react-native";
import CustomHook from "./CustomHook";

export default function App() {
  return (
    <View style={styles.container}>
      <CustomHook />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});