import { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Animated } from "react-native";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import Reward from "./components/Reward";
import NoReward from "./components/NoReward";

export default function App() {
  return (
    <SQLiteProvider databaseName="rewards.db">
      <MainApp />
    </SQLiteProvider>
  );
}

function MainApp() {
  const { executeSql } = useSQLiteContext();
  const [count, setCount] = useState(0);
  const [reward, setReward] = useState(false);
  const [rewardGet, setRewardGet] = useState(false);
  const [eligible, setEligible] = useState(false);
  const progress = new Animated.Value(count / 10);

  useEffect(() => {
    initializeDatabase();
    loadCount();
    resetCountAtMidnight();
  }, []);

  // Create Table if it does not exist
  const initializeDatabase = async () => {
    await executeSql(
      `CREATE TABLE IF NOT EXISTS rewards (id INTEGER PRIMARY KEY, count INTEGER);`
    );
  };

  // Load count from DB
  const loadCount = async () => {
    const result = await executeSql("SELECT count FROM rewards WHERE id = 1;");
    if (result.rows.length > 0) {
      const storedCount = result.rows.item(0).count;
      setCount(storedCount);
      setEligible(storedCount === 10);
      progress.setValue(storedCount / 10);
    } else {
      saveCount(0);
    }
  };

  // Save count to DB
  const saveCount = async (newCount) => {
    await executeSql("INSERT OR REPLACE INTO rewards (id, count) VALUES (1, ?);", [newCount]);
  };

  // Reset count at midnight
  const resetCountAtMidnight = () => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    const timeUntilMidnight = midnight.getTime() - now.getTime();

    setTimeout(() => {
      resetCount();
      resetCountAtMidnight();
    }, timeUntilMidnight);
  };

  // Reset count to 0
  const resetCount = () => {
    setCount(0);
    setEligible(false);
    saveCount(0);
    progress.setValue(0);
  };

  // Increase Count
  const increaseCount = () => {
    if (count < 10) {
      const newCount = count + 1;
      setCount(newCount);
      saveCount(newCount);

      Animated.timing(progress, {
        toValue: newCount / 10,
        duration: 300,
        useNativeDriver: false,
      }).start();

      if (newCount === 10) {
        setEligible(true);
      }
    }
  };

  // Handle Reward Chance
  const getReward = () => {
    setRewardGet(true);
    setReward(Math.random() < 0.5);
    resetCount();

    // Auto-dismiss popup after 3 seconds
    setTimeout(() => {
      setRewardGet(false);
    }, 3000);
  };

  // Manually dismiss reward popup on click
  const dismissRewardPopup = () => {
    setRewardGet(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.countText}>{count} / 10</Text>

      {/* Progress Bar */}
      <View style={styles.progressBar}>
        <Animated.View
          style={[
            styles.progressFill,
            { width: progress.interpolate({ inputRange: [0, 1], outputRange: ["0%", "100%"] }) },
          ]}
        />
      </View>

      {/* Button: Count++ or Get Reward */}
      {eligible ? (
        <TouchableOpacity style={styles.btn} onPress={getReward}>
          <Text style={styles.txt}>Get Reward</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.btn} onPress={increaseCount}>
          <Text style={styles.txt}>cnt++</Text>
        </TouchableOpacity>
      )}

      {/* Reward Popup with Auto-Dismiss */}
      {rewardGet && (
        <TouchableOpacity style={styles.popup} onPress={dismissRewardPopup}>
          {reward ? <Reward /> : <NoReward />}
        </TouchableOpacity>
      )}
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  countText: {
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  progressBar: {
    width: "80%",
    height: 20,
    backgroundColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 10,
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "#000",
    paddingVertical: 15,
    paddingHorizontal: 40,
  },
  txt: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
  popup: {
    position: "absolute",
    top: "40%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
});

