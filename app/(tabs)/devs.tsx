import React from "react";
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DevCard from "../../components/DevCard";
import { LinearGradient } from "expo-linear-gradient";

const profiles = [
  {
    name: "Edvan Davi",
    username: "edvxndxvi",
    image: require("../../assets/edvandavi-pic.jpg"),
    linkedin: "https://www.linkedin.com/in/edvan-davi-119970236/",
    github: "https://github.com/edvxndxvi",
  },
  {
    name: "Fernando Aguiar",
    username: "fernando1211",
    image: require("../../assets/fernandoaguiar-pic.jpg"),
    linkedin: "https://www.linkedin.com/in/fernando-henrique-vilela-aguiar-322aa2301/",
    github: "https://github.com/fernando1211",
  },
  {
    name: "Rafael Romanini",
    username: "rafaelromanini",
    image: require("../../assets/rafaelromanini-pic.jpg"),
    linkedin: "https://www.linkedin.com/in/rafaelromanini/",
    github: "https://github.com/rafaelromanini",
  },
];
export default function Devs() {    
  return (
    <LinearGradient
      colors={["#789EFF", "#BEECFF"]}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <Image
          source={require("../../assets/logo.png")}
          style={{ marginBottom: 32, alignSelf: "center" }}
        />

        <View>
          {profiles.map((profile, index) => (
            <DevCard key={index} {...profile} />
          ))}
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
