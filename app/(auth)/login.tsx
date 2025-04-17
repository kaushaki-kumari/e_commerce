import PasswordField from "@/components/common/PasswordField";
import TextField from "@/components/common/TextField";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Button } from "@/components/common/Button";
import { useRouter } from "expo-router";
import { useFieldValidation } from "@/hooks/useFieldValidation";

const LoginScreen: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const { errors, handleEmailValidation, handleLoginPasswordValidation } =
    useFieldValidation();
  const router = useRouter();

  const handleSignUpPress = () => {
    router.push("/signUp");
  };

  const handleLoginPress = () => {
    handleEmailValidation(formData.email);
    handleLoginPasswordValidation(formData.password);
    const hasErrors = !!(errors.email || errors.password);
    const allFieldsFilled = formData.email && formData.password;

    if (!hasErrors && allFieldsFilled) {
      router.push("/userInformation");
    }
  };

  const handleForgetPress = () => {
    router.push("/forgetPassword");
  };

  const handleEmailChange = (text: string) => {
    setFormData((prev) => ({ ...prev, email: text }));
    handleEmailValidation(text);
  };

  const handlePasswordChange = (text: string) => {
    setFormData((prev) => ({ ...prev, password: text }));
    handleLoginPasswordValidation(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Image
          source={require("../../assets/images/logo/login-logo1.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subTitle}>Login to your account</Text>

        <TextField
          label="Enter your Email"
          value={formData.email}
          onChangeText={handleEmailChange}
          keyboardType="email-address"
          error={errors.email}
        />

        <PasswordField
          label="Password"
          value={formData.password}
          onChangeText={handlePasswordChange}
          error={errors.password}
        />

        <View style={styles.rowContainer}>
          <TouchableOpacity
            onPress={() => setRememberMe(!rememberMe)}
            style={styles.rememberMeContainer}
          >
            <View
              style={[styles.checkbox, rememberMe && styles.checkboxChecked]}
            >
              {rememberMe && <Text style={styles.checkmark}>✔</Text>}
            </View>

            <Text style={styles.rememberMeText}>Remember Me</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.forgotPasswordText} onPress={handleForgetPress}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>

        <Button title="LOGIN" onPress={handleLoginPress} />

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don’t have an account?</Text>
          <TouchableOpacity>
            <Text style={styles.signupLink} onPress={handleSignUpPress}>
              {" "}
              Sign up
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.helpContainer}>
          <Text style={styles.signupText}>Having trouble logging in?</Text>
          <TouchableOpacity>
            <Text style={styles.signupLink}> Get help</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  section: {
    padding: 30,
    marginTop: 70,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 3,
    color: "#00000",
    textAlign: "center",
  },
  subTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#585959",
    textAlign: "center",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  helpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  signupText: {
    color: "#555",
  },
  signupLink: {
    color: "#7881FC",
    fontWeight: "bold",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  checkmark: {
    color: "#fff",
    fontSize: 12,
  },
  checkboxChecked: {
    backgroundColor: "#7881FC",
  },
  forgotPasswordText: {
    color: "#7881FC",
    fontWeight: "600",
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#7881FC",
    borderRadius: 4,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  rememberMeText: {
    color: "#333",
    fontSize: 14,
  },
});
