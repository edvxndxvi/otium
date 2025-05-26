import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ReflectionItem from "../../components/ReflectionItem";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function Reflections() {
  const [reflections, setReflections] = useState<
    {
      id: string;
      reflection: string;
      feeling: string;
      title: string;
    }[]
  >([]);

  const router = useRouter();

  useEffect(() => {
    async function getReflections() {
      const stored = await AsyncStorage.getItem("@reflections");
      if (stored) {
        setReflections(JSON.parse(stored).reverse());
      }
    }

    getReflections();
  }, []);

  async function deleteReflection(id: string) {
    const newReflections = reflections.filter((item) => item.id !== id);
    setReflections(newReflections);
    await AsyncStorage.setItem("@reflections", JSON.stringify(newReflections));
  }

  return (
    <LinearGradient colors={["#789EFF", "#BEECFF"]} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <Image
          source={require("../../assets/logo.png")}
          style={{ marginBottom: 32, alignSelf: "center" }}
        />
        <View>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{ color: "white", fontSize: 24, fontWeight: "medium" }}
            >
              Reflexões
            </Text>
            <TouchableOpacity onPress={() => router.push("/addReflection")}>
              <Ionicons name="add" size={32} color="white" />
            </TouchableOpacity>
          </View>
          <FlatList
            style={{ marginTop: 32, height: "100%" }}
            data={reflections}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <ReflectionItem
                  id={item.id}
                  title={item.title}
                  reflection={item.reflection}
                  feeling={item.feeling}
                  onDelete={deleteReflection}
                />
              );
            }}
          />
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
});
