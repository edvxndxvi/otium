import axios from "axios";
import { useEffect, useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";

export default function Motivation() {
  const api_url = "https://zenquotes.io/api/random";

  const [quote, setQuote] = useState<{ q: string, a: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getQuote() {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await axios.get(api_url);
      setQuote(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getQuote();
  }, []);

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
        <View style={{ flex: 1, position: "absolute", top: "50%", }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 24,
              fontWeight: "bold",
              color: "white",
            }}
          >
            {quote[0]?.q}
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "medium",
              fontSize: 18,
              color: "white",
              marginTop: 16
            }}
          >
            ― {quote[0]?.a}
          </Text>
        </View>
        <TouchableOpacity
          onPress={getQuote}
          style={{ position: "absolute", bottom: 180, alignSelf: "center" }}
        >
          <Ionicons name="refresh" size={32} color="white" />
        </TouchableOpacity>
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
