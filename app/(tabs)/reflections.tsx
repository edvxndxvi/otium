import { useRouter } from "expo-router";
import { Plus } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from 'expo-linear-gradient';
import ReflectionItem from "../../components/ReflectionItem";

export default function Reflections() {
  const [reflections, setReflections] = useState<{
    reflection: string;
    feeling: string; title: string 
}[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function getReflections() {
      const stored = await AsyncStorage.getItem("@reflections");
      if(stored){
        setReflections(JSON.parse(stored));
      }
    }

    getReflections();

  }, []);
 
  return (
    <ImageBackground
      source={require("../../assets/gradient-bg.jpg")}
      style={styles.background}
    >
      <SafeAreaView style={styles.container} >
        <Image
          source={require("../../assets/logo.png")}
          style={{ marginVertical: 64, alignSelf: "center" }}
        />
        <View style={styles.reflectionsContainer}>
            <View style={{alignItems: "center", flexDirection: "row", justifyContent: "space-between"}}>
                <Text style={{color: "white", fontSize:24, fontWeight: "bold"}}>Reflexões</Text>
                <TouchableOpacity style={{backgroundColor: "#00000010", padding: 12, borderRadius: 100}} onPress={() => router.push("/addReflection")}>
                    <Plus size={18} color={"white"}/>
                </TouchableOpacity>
            </View>
            <FlatList
              style={{marginTop: 32, height: 430}}
              data={reflections}
              renderItem={({ item }) => {
                return (
                  <ReflectionItem title={item.title} reflection={item.reflection} feeling={item.feeling} />
                )
              }}
            />   
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
  reflectionsContainer: {
    marginTop: 32
  },
  
});
