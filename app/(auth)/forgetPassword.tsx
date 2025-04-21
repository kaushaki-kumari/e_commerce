import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Keyboard,
} from "react-native";
import { useRouter } from "expo-router";
import CreateNewPassword from "@/components/auth/CreateNewPassword";
import TextField from "@/components/common/TextField";
import { useFieldValidation } from "@/hooks/useFieldValidation";

export default function ForgetPassword() {
  const router = useRouter();
  const { errors, handleEmailValidation } = useFieldValidation();
  const [step, setStep] = useState<"email" | "otp" | "password">("email");
  const [email, setEmail] = useState("");

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputsRef = useRef<Array<TextInput | null>>([]);

  const [timer, setTimer] = useState(30);
  const [otpError, setOtpError] = useState("");

  const otpNumber = "080524";

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (step === "otp" && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [step, timer]);

  const handleCancel = () => {
    if (step === "otp") {
      setStep("email");
      setOtp(new Array(6).fill(""));
      setTimer(30);
      setOtpError(""); 
    } else {
      router.back();
    }
  };

  const onEmailChange = (text: string) => {
    setEmail(text);
    handleEmailValidation(text);
  };

  const handleConfirmEmail = () => {
    handleEmailValidation(email);
    if (!email.trim()) return;
    if (errors.email) return;

    setStep("otp");
  };

  const handleChangeOtp = (text: string, index: number) => {
    if (/^\d$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
      if (index < 5) {
        inputsRef.current[index + 1]?.focus();
      } else {
        Keyboard.dismiss();
      }
    } else if (text === "") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    if (timer === 0) {
      console.log("Resending OTP...");
      setTimer(30);
    }
  };

  const handleVerifyOtp = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length === 6) {
      if (enteredOtp === otpNumber) {
        console.log("OTP verified:", enteredOtp);
        setStep("password");
      } else {
        setOtpError("Invalid OTP");
        setOtp(new Array(6).fill(""));
      }
    } else {
      setOtpError("Please enter the complete OTP");
    }
  };

  return (
    <View style={styles.container}>
      {step === "email" && (
        <>
          <Image
            source={require("../../assets/images/favicon.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Reset Password</Text>
          <TextField
            label="Enter your Email"
            onChangeText={onEmailChange}
            keyboardType="email-address"
            error={errors.email}
            value={email}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleCancel}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={handleConfirmEmail}
            >
              <Text style={styles.confirmText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {step === "otp" && (
        <>
          <Image
            source={require("../../assets/images/favicon.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Verification</Text>
          <Text style={styles.subtitle}>Enter the code sent to your email</Text>
          <View style={styles.timerBox}>
            {timer > 0 ? (
              <Text style={styles.timerText}>Resend code in {timer}s</Text>
            ) : (
              <Text style={styles.timerText}>Resend code now</Text>
            )}
          </View>
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                style={[styles.otpBox, otpError && styles.otpError]}
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={(text) => handleChangeOtp(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                ref={(ref) => (inputsRef.current[index] = ref)}
              />
            ))}
          </View>
          <Text style={styles.resendText}>
            Didn't get the code?{" "}
            <Text
              style={[styles.resendLink, timer > 0 && styles.disabledResend]}
              onPress={timer === 0 ? handleResend : undefined}
            >
              Resend
            </Text>
          </Text>
          {otpError && <Text style={styles.errorMessage}>{otpError}</Text>}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleCancel}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={handleVerifyOtp}
            >
              <Text style={styles.confirmText}>Verify</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {step === "password" && <CreateNewPassword />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 24,
  },
  logo: {
    width: 120,
    height: 150,
  },
  title: {
    fontSize: 26,
    fontFamily: "HelveticaBold",
    marginBottom: 20,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 15,
    color: "#555",
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#000",
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 15,
    marginTop:20
  },
  button: {
    flex: 1,
    height: 48,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#eee",
  },
  confirmButton: {
    backgroundColor: "#1E2637",
  },
  cancelText: {
    color: "#333",
    fontFamily: "HelveticaBold",
  },
  confirmText: {
    color: "#fff",
    fontFamily: "HelveticaBold",
  },
  timerBox: {
    alignItems: "center",
    marginTop: 10,
  },
  timerText: {
    fontSize: 14,
    color: "gray",
    fontWeight: "500",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 10,
  },
  otpBox: {
    width: 45,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    textAlign: "center",
    fontSize: 20,
  },
  otpError: {
    borderColor: "red",
  },
  resendText: {
    fontSize: 12,
    marginTop:25,
    color: "gray",
  },
  resendLink: {
    color: "#7881FC",
    fontWeight: "600",
  },
  disabledResend: {
    color: "#aaa",
  },
  errorMessage: {
    color: "red",
    fontSize: 14,
    marginTop:10
  },
});
