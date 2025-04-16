import PasswordField from "@/components/common/PasswordField";
import TextField from "@/components/common/TextField";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Button from "@/components/common/Button";
import { useRouter } from "expo-router";

const signUpScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const router = useRouter();

  const handleLoginPress = () => {
    router.push("/login");
  };

  const handleSignUp = () => {
    if (!termsAccepted) {
      alert("Please accept the Terms & Privacy Policy.");
      return;
    }
    alert("Signed up!");
  };

  return (
    <View style={styles.container}>
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
          label="Email or Mobile Number"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <PasswordField
          label="Password"
          value={password}
          onChangeText={setPassword}
        />

        <PasswordField
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity
          style={styles.termsContainer}
          onPress={() => setTermsAccepted(!termsAccepted)}
        >
          <View
            style={[styles.checkbox, termsAccepted && styles.checkboxChecked]}
          >
            {termsAccepted && <Text style={styles.checkmark}>✔</Text>}
          </View>
          <Text style={styles.termsText}>
            By continuing, you confirm that you are above 18 years of age , and you agree to our {" "}
            <Text style={styles.link}>Terms of use</Text> and{" "}
            <Text style={styles.link}>Privacy Policy</Text>.
          </Text>
        </TouchableOpacity>

        <Button title="SIGN UP" onPress={handleSignUp} />

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Already have an account?</Text>
          <TouchableOpacity onPress={handleLoginPress}>
            <Text style={styles.signupLink}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default signUpScreen;

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
    fontSize: 30    ,
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
});
