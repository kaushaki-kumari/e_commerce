import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Button } from "@/components/common/Button";
import { useRouter } from "expo-router";
import { useFieldValidation } from "@/hooks/useFieldValidation";
import {
  clearAuthError,
  registerUser,
  resetRegistration,
} from "@/store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import PasswordField from "@/components/common/PasswordField";
import TextField from "@/components/common/TextField";
import { Ionicons } from "@expo/vector-icons";

interface SignUpModalProps {
  visible: boolean;
  onClose: () => void;
  onLoginPress: () => void;
}

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
}

const SignUpModal: React.FC<SignUpModalProps> = ({
  visible,
  onClose,
  onLoginPress,
}) => {
  const [formData, setFormData] = useState<FormData>({
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
    resetErrors,
  } = useFieldValidation();

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, registered } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (registered) {
      onClose();
      onLoginPress();
      dispatch(resetRegistration());
    }
  }, [registered, onClose, router, dispatch]);

  const handleChange = (
    field: keyof FormData,
    value: string | boolean
  ): void => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleEmailChange = (text: string): void => {
    handleChange("email", text);
    handleEmailValidation(text);
  };

  const handlePasswordChange = (text: string): void => {
    handleChange("password", text);
    handlePasswordValidation(text);
    if (formData.confirmPassword) {
      handlePasswordMatch(text, formData.confirmPassword);
    }
  };

  const handleConfirmPasswordChange = (text: string): void => {
    handleChange("confirmPassword", text);
    handlePasswordMatch(formData.password, text);
  };

  const handleTermsChange = (): void => {
    handleChange("termsAccepted", !formData.termsAccepted);
  };

  const handleSignUp = (): void => {
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

    if (!hasErrors && allFieldsFilled && formData.termsAccepted) {
      dispatch(
        registerUser({
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.confirmPassword,
        })
      );
    }
  };

  useEffect(() => {
    if (!visible) {
      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
        termsAccepted: false,
      });
      resetErrors();
      dispatch(clearAuthError());
    }
  }, [visible]);

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalContainer}
      >
        <View style={styles.backdropTouchable}>
          <View style={styles.modalContent}>
            <ScrollView
              style={styles.container}
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              bounces={false}
            >
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#1E2637" />
              </TouchableOpacity>

              <View>
                <Image
                  source={require("../../assets/images/logo-blue.png")}
                  style={styles.image}
                  resizeMode="contain"
                />
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
                {error && <Text style={styles.apiError}>{error}</Text>}

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
                    {formData.termsAccepted && (
                      <Text style={styles.checkmark}>✔</Text>
                    )}
                  </View>
                  <Text style={styles.termsText}>
                    By continuing, you confirm that you are above 18 years of
                    age, and you agree to our{" "}
                    <Text style={styles.link}>Terms of use</Text> and{" "}
                    <Text style={styles.link}>Privacy Policy</Text>.
                  </Text>
                </TouchableOpacity>

                <Button
                  title="Sign Up"
                  onPress={handleSignUp}
                  disabled={!formData.termsAccepted || loading}
                  loading={loading}
                  style={
                    !formData.termsAccepted || loading
                      ? styles.disabledButton
                      : {}
                  }
                />

                <View style={styles.signupContainer}>
                  <Text style={styles.signupText}>
                    Already have an account?
                  </Text>
                  <TouchableOpacity onPress={onLoginPress}>
                    <Text style={styles.signupLink}> Login</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  backdropTouchable: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
  container: {
    width: "100%",
    backgroundColor: "#fff",
  },
  scrollContent: {
    padding: 30,
    paddingBottom: 30,
  },
  image: {
    width: "100%",
    height: 55,
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#585959",
    textAlign: "center",
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#0C4A6E",
    borderRadius: 4,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#0C4A6E",
  },
  checkmark: {
    color: "#fff",
    fontSize: 12,
  },
  termsText: {
    fontSize: 12.5,
    color: "#333",
    flexShrink: 1,
  },
  link: {
    color: "#0C4A6E",
    fontWeight: "600",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  signupText: {
    color: "#555",
  },
  signupLink: {
    color: "#0C4A6E",
    fontWeight: "bold",
  },
  disabledButton: {
    opacity: 0.5,
  },
  apiError: {
    color: "red",
    fontSize: 13,
    marginTop: -10,
    textAlign: "left",
  },
  closeButton: {
    position: "absolute",
    top: 15,
    right: 15,
  },
  extraText: {
    fontSize: 13,
    color: "#333",
    marginTop: 10,
  },
});

export default SignUpModal;
