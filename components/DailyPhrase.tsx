import { View, Text, Image, StyleSheet } from 'react-native'

export default function DailyPhrase(){
  return (
    <View style={styles.dailyContainer}>
        <Image source={require("../assets/quote.png")}/>
        <Text style={{color: "white"}}>Um passo de cada vez, dia após dia, você está se tornando quem estava destinado a ser.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    dailyContainer: {
        gap: 8,
        backgroundColor: "#00000010",
        padding: 16,
        borderRadius: 16
    }   
});
