import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function ReflectionItem(props:any) {
  return (
    <LinearGradient
      colors={
        props.feeling === "positivo"
          ? ["#FF9EBFCC", "#FFCC80CC"]
          : ["#8F64DDCC", "#D1BCF9CC"]
      }
      style={styles.reflection}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      locations={[0.8, 0.95]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
          {props.title}
        </Text>
        <Image
          style={{ width: 32, height: 32 }}
          source={
            props.feeling === "positivo"
              ? require("../assets/positive-icon.png")
              : require("../assets/negative-icon.png")
          }
        />
      </View>
      <Text style={{ color: "white", height: "auto" }}>{props.reflection}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  reflection: {
    padding: 16,
    borderRadius: 16,
    gap: 16,
    marginBottom: 24
  }
});
