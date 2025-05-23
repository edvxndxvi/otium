import { useEffect, useState, useRef } from "react";
import { 
  Text, 
  View, 
  Image, 
  StyleSheet, 
  Animated, 
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';

export default function Breathing() {
    const bubbleAnimation = useRef(new Animated.Value(1)).current;
    const [isPlaying, setIsPlaying] = useState(false);
    const [breathingPhase, setBreathingPhase] = useState("Inspire");
    const isPlayingRef = useRef(false);
    
    const toggleAnimation = () => {
        if (isPlaying) {
            stopAnimation();
        } else {
            startAnimation();
        }
    };
    
    const startAnimation = () => {
        setIsPlaying(true);
        isPlayingRef.current = true;
        
        bubbleAnimation.setValue(1);
        setBreathingPhase("Inspire");
        
        animate();
    };
    
    const stopAnimation = () => {
        setIsPlaying(false);
        isPlayingRef.current = false;
        
        bubbleAnimation.setValue(1);
        setBreathingPhase("Inspire");
    };
    
    const animate = () => {
        if (!isPlayingRef.current) return;
        
        setBreathingPhase("Inspire");
        Animated.timing(bubbleAnimation, {
            toValue: 1.5,
            duration: 4500,
            useNativeDriver: true,
        }).start(({ finished }) => {
            if (!finished || !isPlayingRef.current) return;
            
            setBreathingPhase("Segure");
            Animated.timing(bubbleAnimation, {
                toValue: 1.5,
                duration: 1500,
                useNativeDriver: true,
            }).start(({ finished }) => {
                if (!finished || !isPlayingRef.current) return;
                
                setBreathingPhase("Expire");
                Animated.timing(bubbleAnimation, {
                    toValue: 1,
                    duration: 4500,
                    useNativeDriver: true,
                }).start(({ finished }) => {
                    if (!finished || !isPlayingRef.current) return;
                    
                    setBreathingPhase("Pausa");
                    Animated.timing(bubbleAnimation, {
                        toValue: 1,
                        duration: 1500,
                        useNativeDriver: true,
                    }).start(({ finished }) => {
                        if (!finished || !isPlayingRef.current) return;

                        if (isPlayingRef.current) {
                            animate();
                        }
                    });
                });
            });
        });
    };
    
    useEffect(() => {
        return () => {
            isPlayingRef.current = false;
        };
    }, []);

    return (
        <LinearGradient
            colors={["#789EFF", "#BEECFF"]}
            style={styles.background}
        >
            <SafeAreaView style={styles.container}>
                <Image
                    source={require("../../assets/logo.png")}
                    style={styles.logo}
                />
                <View style={styles.bubbleContainer}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={toggleAnimation}
                    >
                        <Animated.View 
                            style={[
                                styles.bubble, 
                                {transform: [{scale: bubbleAnimation}]}
                            ]} 
                        >
                            <Text style={styles.bubbleText}>{breathingPhase}</Text>
                            <Text style={styles.instructionText}>
                                {isPlaying ? "Toque para parar" : "Toque para iniciar"}
                            </Text>
                        </Animated.View>
                    </TouchableOpacity>
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
        paddingBottom: 80, 
    },
    logo: {
        marginBottom: 32,
        alignSelf: "center"
    },
    bubbleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bubble: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.3)",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#fff",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        overflow: "hidden",
    },
    bubbleText: {
        fontSize: 28,
        color: "white",
        fontWeight: "500",
    },
    instructionText: {
        fontSize: 12,
        color: "rgba(255, 255, 255, 0.8)",
        marginTop: 10,
    }
});