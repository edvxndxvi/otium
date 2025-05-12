import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  async function saveReflection() {
    const trimmedTitle = title.trim();
    const trimmedReflection = reflection.trim();
  
    if (!trimmedTitle || !trimmedReflection || !feelingValue) {
      alert("Preencha todos os campos antes de salvar!");
      return;
    }
    let reflections = [];

    const stored = await AsyncStorage.getItem("@reflections");
    if(stored){
      reflections = JSON.parse(stored);
    }

    reflections.push({  title: trimmedTitle,
      reflection: trimmedReflection,
      feeling: feelingValue});
    await AsyncStorage.setItem("@reflections", JSON.stringify(reflections));

    alert("Sua reflexão foi salva!")

    router.push("/reflections")
  }

  return (
    <ImageBackground
      source={require("../assets/gradient-bg.jpg")}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <Image
          source={require("../assets/logo.png")}
          style={{ marginVertical: 64, alignSelf: "center" }}
        />
        <View style={styles.formContainer}>
          <View style={{ alignItems: "center", flexDirection: "row", gap: 8 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#00000010",
                padding: 12,
                borderRadius: 100,
              }}
              onPress={() => router.push("/reflections")}
            >
              <Ionicons name="arrow-back" size={18} color="white" />
            </TouchableOpacity>
            <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
              Voltar
            </Text>
          </View>

          <View style={styles.formContent}>
            <DropDownPicker
              open={open}
              value={feelingValue}
              items={feelings}
              setOpen={setOpen}
              setValue={setFeelingValue}
              setItems={setFeelings}
              style={styles.picker}
              placeholder="Selecione o sentimento"
              placeholderStyle={{
                color: "#B5B5B5",
              }}
              dropDownContainerStyle={{
                width: 300,
                alignSelf: "center",
                borderRadius: 12,
                borderWidth: 0,
                zIndex: 1000,
              }}
            />
            <TextInput
              maxLength={20}
              placeholder="Título da sua reflexão"
              value={title}
              onChangeText={setTitle}
              style={styles.input}
            />
            <TextInput
      
              numberOfLines={5}
              maxLength={300}
              placeholder="Faça sua reflexão"
              value={reflection}
              onChangeText={setReflection}
              style={{ ...styles.input,  }}
              keyboardType="default"
            />
            <TouchableOpacity style={styles.btn} onPress={saveReflection}>
              <Text style={{ color: "white", fontWeight: "bold" }}>Salvar Relfexão</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
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
  formContainer: {
    marginTop: 32,
  },
  formContent: {
    marginTop: 64,
    gap: 16,
    alignItems: "center",
  },
  input: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    width: 300,
  },
  picker: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    borderRadius: 12,
    width: 300,
    alignSelf: "center",
    borderWidth: 0,
  },
  btn: {
    backgroundColor: "#5798FB",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    width: 300,
    alignItems: "center",
  }
});
