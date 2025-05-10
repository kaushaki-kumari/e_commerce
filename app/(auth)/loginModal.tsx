import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { useRouter } from "expo-router";
import { useFieldValidation } from "@/hooks/useFieldValidation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearAuthError, loginUser } from "@/store/auth/authSlice";
import TextField from "@/components/common/TextField";
import PasswordField from "@/components/common/PasswordField";
import { Button } from "@/components/common/Button";
import { Ionicons } from "@expo/vector-icons";
import colors from "@/style/staticColors";
import textStyles from "@/style/textStyles";
import spacingStyles from "@/style/spacingStyles";

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
  const {
    errors,
    handleEmailValidation,
    handleLoginPasswordValidation,
    resetErrors,
  } = useFieldValidation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleInputChange = (field: 'email' | 'password', text: string): void => {
    setFormData((prev) => ({ ...prev, [field]: text }));
  
    if (field === 'email') {
      handleEmailValidation(text);
    } else if (field === 'password') {
      handleLoginPasswordValidation(text);
    }
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
      resetErrors();
      dispatch(clearAuthError());
    }
  }, [visible]);

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
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
                onChangeText={(text) => handleInputChange('email', text)}
                keyboardType="email-address"
                error={errors.email}
              />

              <PasswordField
                label="Password"
                value={formData.password}
                onChangeText={(text) => handleInputChange('password', text)}
                error={errors.password}
              />
              {error && <Text style={styles.apiError}>{error}</Text>}

              <View style={styles.rowContainer}>
                <TouchableOpacity
                  onPress={() => setRememberMe(!rememberMe)}
                  style={styles.rememberMeContainer}
                >
                  <View
                    style={[
                      styles.checkbox,
                      rememberMe && styles.checkboxChecked,
                    ]}
                  >
                    {rememberMe && <Text style={styles.checkmark}>✔</Text>}
                  </View>
                  <Text style={styles.rememberMeText}>Remember Me</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleForgetPress}>
                  <Text style={styles.forgotPasswordText}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>

              <Button
                title="LOGIN"
                onPress={handleLoginPress}
                loading={loading}
              />

              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Don't have an account?</Text>
                <TouchableOpacity onPress={onSignupPress}>
                  <Text style={styles.signupLink}>Sign up</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.helpContainer}>
                <Text style={styles.signupText}>
                  Having trouble logging in?
                </Text>
                <TouchableOpacity onPress={() => {}}>
                  <Text style={styles.signupLink}>Get help</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: colors.whiteColor,
    ...spacingStyles.p25,
    width: "100%",
    position: "relative",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  image: {
    width: "100%",
    height: 55,
    ...spacingStyles.mb5,
  },
  subTitle: {
    ...textStyles.subtitle,
    textAlign: "center",
  },

  errorInput: {
    borderColor: colors.errorColor,
  },
  errorText: {
    color: colors.errorColor,
    fontSize: 12,
    ...spacingStyles.mb10,
  },
  apiError: {
    color: colors.errorColor,
    fontSize: 14,
    marginTop: -15,
    ...spacingStyles.mb15,
    textAlign: "left",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    ...spacingStyles.mb15,
  },
  checkmark: {
    color: colors.whiteColor,
    fontSize: 12,
  },
  checkboxChecked: {
    backgroundColor: colors.primaryColor,
  },
  forgotPasswordText: {
    color: colors.linkPrimaryColor,
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
    borderColor: colors.linkPrimaryColor,
    borderRadius: 4,
    ...spacingStyles.mr5,
    justifyContent: "center",
    alignItems: "center",
  },
  rememberMeText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  signupText: {
    color: colors.textSecondary,
  },
  signupLink: {
    color: colors.linkPrimaryColor,
    fontWeight: "bold",
    ...spacingStyles.px5,
  },
  helpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    ...spacingStyles.mt5,
  },
  closeButton: {
    position: "absolute",
    top: 15,
    right: 15,
  },
});

export default LoginModal;
