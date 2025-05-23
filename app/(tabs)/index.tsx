import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DailyPhrase from "../../components/DailyPhrase";
import TotalReflections from "../../components/TotalReflections";
import PositiveReflections from "../../components/PositiveReflections";
import NegativeReflections from "../../components/NegativeReflections";
import { LinearGradient } from "expo-linear-gradient";

export default function Home() {
  return (
    <LinearGradient
      colors={["#789EFF", "#BEECFF"]}
      style={styles.background}
    >
      <SafeAreaView style={styles.container} >
        <Image
          source={require("../../assets/logo.png")}
          style={{ marginBottom: 32, alignSelf: "center" }}
        />
        <DailyPhrase />
        <View style={styles.diaryContainer}>
          <Text style={{ color: "white", fontSize: 24, fontWeight: "medium" }}>
            Suas Reflexões em Números
          </Text>
          <View style={styles.diaryContent}>
            <TotalReflections/>
            <PositiveReflections/>
            <NegativeReflections/>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  diaryContainer: {
    marginTop: 32,
  },
  diaryContent: {
    marginTop: 16,
    flexDirection:'row',
    flexWrap:'wrap',
    gap: 8
  },
});
