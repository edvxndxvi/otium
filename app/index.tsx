import React from "react";
import { ImageBackground, Text, View, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DailyPhrase from "../components/DailyPhrase";

export default function Home() {
  return (
    <ImageBackground
      source={require("../assets/gradient-bg.jpg")}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <Image source={require("../assets/logo.png")} style={{marginVertical: 64, alignSelf: 'center'}}/>
        <DailyPhrase/>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1
  },
  container: {
    flex: 1,
    marginHorizontal: 10
  }
});
