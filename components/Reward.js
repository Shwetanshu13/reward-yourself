import { StyleSheet, Text, Animated } from "react-native";
import React, { useEffect, useRef } from "react";

const Reward = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <Text style={styles.title}>🎉 Reward Unlocked! 🎉</Text>
            <Text style={styles.message}>
                Okay, watch a movie. **One**, not more. Then get back to what you're
                supposed to do! 😜
            </Text>
        </Animated.View>
    );
};

export default Reward;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#4CAF50",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        margin: 20,
        elevation: 5,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 10,
    },
    message: {
        fontSize: 16,
        color: "#fff",
        textAlign: "center",
    },
});
