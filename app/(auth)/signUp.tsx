import PasswordField from "@/components/common/PasswordField";
import TextField from "@/components/common/TextField";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { Button } from "@/components/common/Button";
import { useRouter } from "expo-router";
import { useFieldValidation } from "@/hooks/useFieldValidation";

const SignUpScreen: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const {
    errors,
    handleEmailValidation,
    handlePasswordValidation,
    handlePasswordMatch,
  } = useFieldValidation();
  const router = useRouter();

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleEmailChange = (text: string) => {
    handleChange("email", text);
    handleEmailValidation(text);
  };

  const handlePasswordChange = (text: string) => {
    handleChange("password", text);
    handlePasswordValidation(text);
    if (formData.confirmPassword) {
      handlePasswordMatch(text, formData.confirmPassword);
    }
  };

  const handleConfirmPasswordChange = (text: string) => {
    handleChange("confirmPassword", text);
    handlePasswordMatch(formData.password, text);
  };

  const handleTermsChange = () => {
    handleChange("termsAccepted", !formData.termsAccepted);
  };

  const handleLoginPress = () => {
    router.push("/login");
  };

  const handleSignUp = () => {
    handleEmailValidation(formData.email);
    handlePasswordValidation(formData.password);
    handlePasswordMatch(formData.password, formData.confirmPassword);

    const hasErrors = !!(
      errors.email ||
      errors.password ||
      errors.confirmPassword
    );
    const allFieldsFilled =
      formData.email && formData.password && formData.confirmPassword;

    if (!hasErrors && allFieldsFilled) {
      router.push("/login");
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.section}>
        <Image
          source={require("../../assets/images/logo/login-logo1.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>Create Your Account</Text>
        <Text style={styles.subTitle}>
          Sign up and shop your favourite brands, all in one place
        </Text>

        <TextField
          label="Enter Your Email"
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

        <PasswordField
          label="Confirm Password"
          value={formData.confirmPassword}
          onChangeText={handleConfirmPasswordChange}
          error={errors.confirmPassword}
        />

        <TouchableOpacity
          style={styles.termsContainer}
          onPress={handleTermsChange}
        >
          <View
            style={[
              styles.checkbox,
              formData.termsAccepted && styles.checkboxChecked,
            ]}
          >
            {formData.termsAccepted && <Text style={styles.checkmark}>✔</Text>}
          </View>
          <Text style={styles.termsText}>
            By continuing, you confirm that you are above 18 years of age, and
            you agree to our <Text style={styles.link}>Terms of use</Text> and{" "}
            <Text style={styles.link}>Privacy Policy</Text>.
          </Text>
        </TouchableOpacity>

        <Button
          title="SIGN UP"
          onPress={handleSignUp}
          disabled={!formData.termsAccepted}
          style={!formData.termsAccepted ? styles.disabledButton : {}}
        />

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Already have an account?</Text>
          <TouchableOpacity onPress={handleLoginPress}>
            <Text style={styles.signupLink}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
  },
  section: {
    padding: 30,
    paddingTop: 70,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
    color: "#000",
    textAlign: "center",
  },
  subTitle: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#585959",
    textAlign: "center",
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
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
  checkboxChecked: {
    backgroundColor: "#7881FC",
  },
  checkmark: {
    color: "#fff",
    fontSize: 12,
  },
  termsText: {
    fontSize: 13,
    color: "#333",
    flexShrink: 1,
  },
  link: {
    color: "#7881FC",
    fontWeight: "600",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  signupText: {
    color: "#555",
  },
  signupLink: {
    color: "#7881FC",
    fontWeight: "bold",
  },
  disabledButton: {
    opacity: 0.5,
  },
});
