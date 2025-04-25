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
    <ImageBackground
      source={require("../../assets/gradient-bg.jpg")}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <Image
          source={require("../../assets/logo.png")}
          style={{ marginVertical: 64, alignSelf: "center" }}
        />

        <View>
          {profiles.map((profile, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.userInfo}>
                <Image source={profile.image} style={styles.avatar} />
                <View>
                  <Text style={styles.name}>{profile.name}</Text>
                  <Text style={styles.username}>{profile.username}</Text>
                </View>
              </View>
              <View style={styles.links}>
                <TouchableOpacity onPress={() => Linking.openURL(profile.linkedin)}>
                  <Image
                    source={require("../../assets/logo-linkedin.png")}
                    style={styles.icon}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL(profile.github)}>
                  <Image
                    source={require("../../assets/logo-github.png")}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
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
  card: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 100,
    marginRight: 10,
  },
  name: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  username: {
    color: "#ddd",
    fontSize: 13,
  },
  links: {
    flexDirection: "row",
    gap: 8,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: "#fff",
    marginLeft: 10,
  },
});
