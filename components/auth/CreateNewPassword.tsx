import {
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Button } from "@/components/common/Button";
import { useFieldValidation } from "@/hooks/useFieldValidation";
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


      <View style={styles.imageWrapper}>
        <Image
          source={require("../../assets/images/favicon.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.title}>Create New Password</Text>
      <Text style={styles.infoText}>
        Your new password must be different from previously used password.
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
      <Button title="Save" onPress={handleSubmit} style={{ width: "90%" }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    marginTop:20
  },
  title: {
    fontSize: 24,
    fontFamily: "HelveticaBold",
    textAlign: "center",
  },
  imageWrapper: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#CCDAF9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    width: 80,
    height: 90,
  },
  infoText: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    width: "80%",
    marginBottom: 20,
    fontFamily: "Helvetica",
    lineHeight:20
  },
  inputGroup: {
    width: "90%",
  },
});
