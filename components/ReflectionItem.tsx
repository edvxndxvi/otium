import {
  View,
  Text,
  Image,
  StyleSheet,
  PanResponder,
  TouchableOpacity,
  Animated,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRef } from 'react';

export default function ReflectionItem(props: any) {
  
  const { id, title, reflection, feeling, onDelete } = props;

  const translateX = useRef(new Animated.Value(0)).current;
  const panResponder = useRef(PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      if (gestureState.dx < 0) {
        translateX.setValue(gestureState.dx);
      }
    },
    onPanResponderRelease(_, gestureState) {
      if (gestureState.dx < -50) {
        Animated.spring(translateX, {
          toValue: -100,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  })).current;

  return (
    <View style={styles.reflectionContainer}>
      <Animated.View style={{flex: 1, transform: [{ translateX }]}}>
        <LinearGradient
          {...panResponder.panHandlers}
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
              {title}
            </Text>
            <Image
              style={{ width: 32, height: 32 }}
              source={
                feeling === "positivo"
                  ? require("../assets/positive-icon.png")
                  : require("../assets/negative-icon.png")
              }
            />
          </View>
          <Text style={{ color: "white", height: "auto" }}>
            {props.reflection}
          </Text>
        </LinearGradient>
        <TouchableOpacity
          onPress={() => onDelete(id)}
          style={styles.deleteBtn}
        >
          <Ionicons name="trash" size={32} color="white" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  reflectionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  reflection: {
    padding: 16,
    borderRadius: 16,
    gap: 16,
    width: "100%",
  },
  deleteBtn: {
    height: "100%",
    justifyContent: "center",
    paddingHorizontal: 24,
    borderRadius: 16,
    backgroundColor: "rgba(255, 0, 0, 0.7)",
    position: "absolute",
    right: -100,
  },
});
