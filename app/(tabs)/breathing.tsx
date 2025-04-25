import React from "react";
import { ImageBackground, Text, View, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Breathing() {
 
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginHorizontal: 10,
    alignItems: "center",
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#E6F0FF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderColor: "#4DA6FF",
    shadowColor: "#4DA6FF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  circleText: {
    fontSize: 18,
    color: "#000",
    fontWeight: "500",
  },
});
