import CreateNewPassword from "@/components/auth/CreateNewPassword";
import {Button} from "@/components/common/Button";
import { useRouter } from "expo-router";
import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
} from "react-native";

export default function ForgetPassword() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(30);
  const [isVerified, setIsVerified] = useState(false);
  const inputsRef = useRef<Array<TextInput | null>>([]);
  const router = useRouter();

  const handleSignUpPress = () => {
    router.push("/signUp");
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  const handleChange = (text: string, index: number) => {
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
      console.log("Resend code");
      setTimer(30);
    }
  };

  const handleSubmit = () => {
    console.log("Submitted OTP:", otp.join(""));
    setIsVerified(true);
  };

  return (
    <View style={styles.container}>
      {!isVerified ? (
        <>
          <Text style={styles.title}>Verification</Text>
          <Text style={styles.subtitle}>Enter Verification Code</Text>
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
                style={styles.otpBox}
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={(text) => handleChange(text, index)}
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

          <Button
            title="Verify"
            onPress={handleSubmit}
            style={{ borderRadius: 50, width: "80%", marginTop: 25 }}
          />
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Create a new account</Text>
            <TouchableOpacity>
              <Text style={styles.resendLink} onPress={handleSignUpPress}>
                {" "}
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <CreateNewPassword />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 50,
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
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: 50,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 30,
    fontWeight: "500",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 10,
  },
  disabledResend: {
    color: "#aaa",
  },
  otpBox: {
    width: 45,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    textAlign: "center",
    fontSize: 20,
  },
  resendText: {
    fontSize: 12,
    marginVertical: 25,
    color: "gray",
  },
  resendLink: {
    color: "#7881FC",
    fontWeight: "600",
  },
  sendText: {
    color: "#fff",
    fontWeight: "600",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  signupText: {
    color: "#555",
  },
});
