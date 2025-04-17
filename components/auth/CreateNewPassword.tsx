import {
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Button } from "@/components/common/Button";
import { useFieldValidation } from "@/utils/useFieldValidation";
import { useRouter } from "expo-router";
import PasswordField from "../common/PasswordField";

export default function CreateNewPassword() {
  const { errors, handlePasswordValidation, handlePasswordMatch } =
    useFieldValidation();
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = (text: string) => {
    setNewPassword(text);
    handlePasswordValidation(text);

    if (confirmPassword) {
      handlePasswordMatch(text, confirmPassword);
    }
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    handlePasswordMatch(newPassword, text);
  };

  const handleSubmit = () => {
    handlePasswordValidation(newPassword);
    handlePasswordMatch(newPassword, confirmPassword);

    const hasErrors = !!(errors.password || errors.confirmPassword);
    const allFieldsFilled = newPassword && confirmPassword;

    if (!hasErrors && allFieldsFilled) {
      router.push("/login");
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
        <PasswordField
          label="Enter New Password"
          value={newPassword}
          onChangeText={handlePasswordChange}
          error={errors.password}
        />
        <PasswordField
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
          error={errors.confirmPassword}
        />
      </View>
      <Button title="Save" onPress={handleSubmit} style={{ width: "80%" }} />
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
  },
});
