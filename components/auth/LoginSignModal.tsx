import React, { useRef, useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Image } from "react-native";
const LoginForm = () => {
  return (
    <View>
      <LoginHeader />
      <PhoneInput />
      <TermsAndConditions />
      <LoginButton />
      <HelpSection />
    </View>
  );
};

const LoginHeader = () => {
  return (
    <View>
      <Image
        source={require("../../assets/images/images/loginImage.jpg")}
        style={styles.headerImage}
        resizeMode="contain"
      />
      <View style={styles.loginHeader}>
        <Text style={styles.loginTitle}>Login</Text>
        <Text style={styles.orTitle}>or</Text>
        <Text style={styles.signupTitle}>Signup</Text>
      </View>
    </View>
  );
};

const PhoneInput = () => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.floatingLabelContainer}>
        <Text style={styles.floatingLabel}>
          Mobile Number
          <Text style={styles.requiredAsterisk}>*</Text>
        </Text>
        <View style={styles.phoneInput}>
          <Text style={styles.countryCode}>+91</Text>
          <TextInput
            style={styles.mobileInput}
            placeholder="Enter your mobile number"
            keyboardType="phone-pad"
          />
        </View>
      </View>
    </View>
  );
};

const TermsAndConditions = () => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <View style={styles.termsContainer}>
      <TouchableOpacity
        style={[styles.checkbox, isChecked && styles.checkedBox]}
        onPress={toggleCheckbox}
      >
        {isChecked && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>
      <Text style={styles.termsText}>
        By continuing, you confirm that you are above 18 years of age, and you
        agree to Myntra's <Text style={styles.termsLink}>Terms of Use</Text> &{" "}
        <Text style={styles.termsLink}>Privacy Policy</Text>
      </Text>
    </View>
  );
};

const LoginButton = () => {
  return (
    <TouchableOpacity style={styles.otpButton}>
      <Text style={styles.otpButtonText}>Login using OTP</Text>
    </TouchableOpacity>
  );
};

const HelpSection = () => {
  return (
    <TouchableOpacity style={styles.helpButton}>
      <Text style={styles.helpText}>
        Having trouble logging in? <Text style={styles.helpLink}>Get help</Text>
      </Text>
    </TouchableOpacity>
  );
};

type LoginModalProps = {
  visible: boolean;
  onClose: () => void;
};

const LoginModal: React.FC<LoginModalProps> = ({ visible, onClose }) => {
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="none"
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <Animated.View
          style={[
            styles.modalContent,
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          <View style={styles.headerRow}>
            <Image
              source={require("../../assets/images/icons/logo.webp")}
              style={styles.logo}
              resizeMode="contain"
            />
            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
              <AntDesign name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <LoginForm />
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    maxHeight: "90%",
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 5,
  },

  headerImage: {
    width: "100%",
    height: 150,
    marginBottom: 10,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
    paddingHorizontal: 30,
    paddingTop: 25,
  },
  logo: {
    width: 55,
    height: 50,
  },
  loginHeader: {
    flexDirection: "row",
    marginBottom: 20,
    paddingHorizontal: 30,
  },
  loginTitle: {
    fontSize: 20,
    fontWeight: "bold",

    color: "black",
    paddingBottom: 5,
  },
  signupTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  orTitle: {
    fontSize: 18,
    fontWeight: "semibold",
    color: "#8a8888",
    marginHorizontal: 10,
  },
  inputContainer: {
    paddingHorizontal: 30,
    marginBottom: 15,
  },
  requiredAsterisk: {
    color: "red",
  },
  floatingLabelContainer: {
    position: "relative",
  },

  floatingLabel: {
    position: "absolute",
    top: -10,
    left: 54,
    backgroundColor: "white",
    paddingHorizontal: 6,
    fontSize: 12,
    color: "#666",
    zIndex: 1,
  },

  phoneInput: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 3,
    alignItems: "center",
    backgroundColor: "white",
  },

  inputLabel: {
    fontSize: 14,
    marginBottom: 8,
    color: "#333",
  },
  countryCode: {
    paddingHorizontal: 15,
    borderRightWidth: 1,
    borderRightColor: "#ddd",
    textAlignVertical: "center",
    paddingTop: 5,
  },
  mobileInput: {
    flex: 1,
    paddingHorizontal: 15,
  },
  termsContainer: {
    paddingHorizontal: 30,
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "flex-start",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: 10,
    marginTop: 16,
  },
  checkedBox: {
    backgroundColor: "#ff3e6c",
    borderColor: "#ff3e6c",
    justifyContent: "center",
    alignItems: "center",
  },

  checkmark: {
    color: "white",
    fontSize: 13,
    fontWeight: "bold",
  },

  termsText: {
    flex: 1,
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
  },
  termsLink: {
    color: "#ff3e6c",
    fontWeight:'bold'
  },
  otpButton: {
    marginHorizontal: 30,
    backgroundColor: "#ff3e6c",
    height: 45,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  otpButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  helpButton: {
    margin: 30,
  },
  helpText: {
    color: "#666",
    fontSize: 14,
  },
  helpLink: {
    color: "#ff3e6c",
    fontWeight: "bold",
  },
});

export default LoginModal;
