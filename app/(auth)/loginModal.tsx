import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { useFieldValidation } from "@/hooks/useFieldValidation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearAuthError, loginUser } from "@/store/auth/authSlice";
import TextField from "@/components/common/TextField";
import PasswordField from "@/components/common/PasswordField";
import { Button } from "@/components/common/Button";
import { Ionicons } from "@expo/vector-icons";

interface LoginModalProps {
  visible: boolean;
  onClose: () => void;
  onSignupPress: () => void;
}

interface FormData {
  email: string;
  password: string;
}

const LoginModal: React.FC<LoginModalProps> = ({
  visible,
  onClose,
  onSignupPress,
}) => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const { error, loading } = useAppSelector((state) => state.auth);
  const { errors, handleEmailValidation, handleLoginPasswordValidation ,resetErrors} =
    useFieldValidation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleEmailChange = (text: string): void => {
    setFormData((prev) => ({ ...prev, email: text }));
    handleEmailValidation(text);
  };

  const handlePasswordChange = (text: string): void => {
    setFormData((prev) => ({ ...prev, password: text }));
    handleLoginPasswordValidation(text);
  };

  const handleLoginPress = async (): Promise<void> => {
    handleEmailValidation(formData.email);
    handleLoginPasswordValidation(formData.password);
    const hasErrors = !!(errors.email || errors.password);
    const allFieldsFilled = formData.email && formData.password;

    if (!hasErrors && allFieldsFilled) {
      const resultAction = await dispatch(
        loginUser({
          email: formData.email,
          password: formData.password,
        })
      );

      if (loginUser.fulfilled.match(resultAction)) {
        onClose();
        router.push("/userInformation");
      }
    }
  };

  const handleForgetPress = (): void => {
    onClose();
    router.push("/forgetPassword");
    dispatch(clearAuthError());
  };
  useEffect(() => {
    if (!visible) {
      setFormData({ email: "", password: "" });
      resetErrors()
      dispatch(clearAuthError());
    }
  }, [visible]);

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#f1E2637" />
          </TouchableOpacity>

          <Image
            source={require("../../assets/images/logo-blue.png")}
            style={styles.image}
            resizeMode="contain"
          />
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
          {error && <Text style={styles.apiError}>{error}</Text>}

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

            <TouchableOpacity onPress={handleForgetPress}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <Button title="LOGIN" onPress={handleLoginPress} loading={loading} />

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account?</Text>
            <TouchableOpacity onPress={onSignupPress}>
              <Text style={styles.signupLink}>Sign up</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.helpContainer}>
            <Text style={styles.signupText}>Having trouble logging in?</Text>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.signupLink}>Get help</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 30,
    width: "100%",
    position: "relative",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  image: {
    width: "100%",
    height: 55,
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 15,
    color: "#555",
    marginBottom: 12,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  apiError: {
    color: "red",
    fontSize: 14,
    marginTop: -15,
    marginBottom: 5,
    textAlign: "left",
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
    backgroundColor: "#0C4A6E",
  },
  forgotPasswordText: {
    color: "#0C4A6E",
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
    borderColor: "#0C4A6E",
    borderRadius: 4,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  rememberMeText: {
    color: "#333",
    fontSize: 14,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  signupText: {
    color: "#555",
  },
  signupLink: {
    color: "#0C4A6E",
    fontWeight: "bold",
  },
  helpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 5,
  },
  closeButton: {
    position: "absolute",
    top: 15,
    right: 15,
  },
});

export default LoginModal;
