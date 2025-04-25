import React from "react";
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const profiles = [
  {
    name: "Edvan Davi",
    username: "edvxndxvi",
    image: require("../assets/edvan.jpg"),
    linkedin: "https://www.linkedin.com/in/edvxndxvi",
    github: "https://github.com/edvxndxvi",
  },
  {
    name: "Fernando Aguiar",
    username: "fernando1211",
    image: require("../assets/fernando.jpg"),
    linkedin: "https://www.linkedin.com/in/fernando1211",
    github: "https://github.com/fernando1211",
  },
  {
    name: "Rafael Romanini",
    username: "rafaelromanini",
    image: require("../assets/rafael.jpg"),
    linkedin: "https://www.linkedin.com/in/rafaelromanini",
    github: "https://github.com/rafaelromanini",
  },
];

export default function Devs() {


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

        <ScrollView>
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
                <TouchableOpacity>
                  <Image
                    source={require("../assets/linkedin-icon.png")}
                    style={styles.icon}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    source={require("../assets/github-icon.png")}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
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
    backgroundColor: "rgba(255, 255, 255, 0.1)",
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
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "#fff",
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
    width: 20,
    height: 20,
    tintColor: "#fff",
    marginLeft: 10,
  },
});
