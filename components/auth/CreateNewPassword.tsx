import { View, Text, TextInput, Alert, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import Button from "../common/Button";

export default function CreateNewPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    if (newPassword === confirmPassword) {
      Alert.alert("Success", "Your password has been reset successfully");
    } else {
      Alert.alert("Error", "Passwords do not match. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Password</Text>

      <View style={styles.imageWrapper}>
        <Image
          source={require("../../assets/images/images/lock.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.infoText}>
        Your New Password Must Be Different from Previously Used Password.
      </Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Enter New Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter new password"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Re-enter password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      <Button
        title="Save"
        onPress={handleSubmit}
        style={{ borderRadius: 50, width: "80%", marginTop: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  imageWrapper: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#F8E6FB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  image: {
    width: 80,
    height: 90,
  },
  infoText: {
    fontSize: 14,
    color: "#444",
    textAlign: "center",
    width: "80%",
    marginBottom: 20,
    letterSpacing: 1.1,
  },
  inputGroup: {
    width: "80%",
    marginBottom: 28,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
    marginLeft: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
});
