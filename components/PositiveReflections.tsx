import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, Text, Image, View } from "react-native";

export default function PositiveReflections() {
  const [total, setTotal] = useState(0);

  useFocusEffect(
  useCallback(() => {
    async function contarReflexoes() {
      const stored = await AsyncStorage.getItem("@reflections");
      const reflections = stored ? JSON.parse(stored) : [];
      setTotal(reflections.filter((r: { feeling: string; }) => r.feeling === "positivo").length);
    }

    contarReflexoes();
  }, [])
  );

  return (
    <LinearGradient
      colors={["#FF9EBFCC", "#FFCC80CC"]}
      style={styles.reflection}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      locations={[0.6, 0.85]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: "white", fontWeight: "medium", fontSize: 20 }}>
          Reflexões {"\n"}
          <Text style={{ color: "#00000044" }}>Positivas</Text>
        </Text>
        <Image
          source={require("../assets/positive-icon.png")}
          style={{ width: 48, height: 48 }}
        />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <View style={styles.decorative} />
        <Text style={styles.infos}>{total}</Text>
        <Text style={styles.infos}>total</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  reflection: {
    padding: 16,
    borderRadius: 16,
    gap: 16,
    width: "48%",
  },
  decorative: {
    height: 27,
    width: 2,
    backgroundColor: "#FFE0B2",
  },
  infos: {
    color: "white",
    fontSize: 32,
  },
});
