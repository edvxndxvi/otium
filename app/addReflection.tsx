import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

export default function AddReflection() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [reflection, setReflection] = useState("");
  const [open, setOpen] = useState(false);
  const [feelingValue, setFeelingValue] = useState(null);
  const [feelings, setFeelings] = useState([
    { label: "Positivo", value: "positivo" },
    { label: "Negativo", value: "negativo" },
  ]);

  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  }

  async function saveReflection() {
    const trimmedTitle = title.trim();
    const trimmedReflection = reflection.trim();

    if (!trimmedTitle || !trimmedReflection || !feelingValue) {
      alert("Preencha todos os campos antes de salvar!");
      return;
    }
    let reflections = [];

    const stored = await AsyncStorage.getItem("@reflections");
    if (stored) {
      reflections = JSON.parse(stored);
    }

    reflections.push({
      id: generateId(),
      title: trimmedTitle,
      reflection: trimmedReflection,
      feeling: feelingValue,
    });
    await AsyncStorage.setItem("@reflections", JSON.stringify(reflections));

    alert("Sua reflexão foi salva!");

    router.push("/reflections");
  }
  return (
    <LinearGradient colors={["#789EFF", "#BEECFF"]} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <Image
          source={require("../assets/logo.png")}
          style={{ marginBottom: 32, alignSelf: "center" }}
        />
        <View>
          <View
            style={{
              width: "100%",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={32} color="white" />
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <DropDownPicker
                open={open}
                value={feelingValue}
                items={feelings}
                setOpen={setOpen}
                setValue={setFeelingValue}
                setItems={setFeelings}
                style={styles.picker}
                placeholder="Sentimento"
                placeholderStyle={{
                  color: "white",
                }}
                ArrowUpIconComponent={() => (
                  <Ionicons name="chevron-up" size={20} color="white" />
                )}
                ArrowDownIconComponent={() => (
                  <Ionicons name="chevron-down" size={20} color="white" />
                )}
                dropDownContainerStyle={{
                  width: 140,
                  alignSelf: "center",
                  borderRadius: 12,
                  borderWidth: 0,
                  zIndex: 1000,
                  backgroundColor: "#00000010",
                }}
                listItemLabelStyle={{
                  color: "white",
                }}
                textStyle={{
                  color: "white",
                }}
                TickIconComponent={() => (
                  <Ionicons name="checkmark" size={18} color="white" />
                )}
              />
            </View>

            <TouchableOpacity onPress={saveReflection}>
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 24 }}
              >
                OK
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.formContent}>
            <TextInput
              maxLength={20}
              placeholder="Título"
              value={title}
              onChangeText={setTitle}
              style={{ ...styles.input, fontSize: 24, fontWeight: "bold" }}
            />

            <TextInput
              numberOfLines={5}
              maxLength={300}
              placeholder="Faça sua reflexão"
              value={reflection}
              onChangeText={setReflection}
              style={{ ...styles.input, fontSize: 18 }}
              keyboardType="default"
            />
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
  formContent: {
    marginTop: 24,
    gap: 16,
    alignItems: "center",
  },
  input: {
    color: "white",
    paddingRight: 8,
    borderRadius: 12,
    width: "100%",
  },
  picker: {
    backgroundColor: "#00000010",
    paddingHorizontal: 16,
    borderRadius: 12,
    maxWidth: 140,
    alignSelf: "center",
    borderWidth: 0,
  },
});
