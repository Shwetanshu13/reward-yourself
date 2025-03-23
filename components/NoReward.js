import { StyleSheet, Text, View, Animated } from "react-native";
import React, { useEffect, useRef } from "react";

const NoReward = () => {
    const scaleAnim = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 5,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
            <Text style={styles.title}>😞 No Reward This Time</Text>
            <Text style={styles.message}>
                Sorry, you didn't get a reward this time. Keep working hard for the next one! 💪
            </Text>
        </Animated.View>
    );
};

export default NoReward;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FF5252",
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
