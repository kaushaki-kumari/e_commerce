import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface PasswordFieldProps extends TextInputProps {
  label?: string;
  value?: string;
  error?: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  label,
  style,
  value,
  error,
  onFocus,
  onBlur,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const isFloating = isFocused || !!value;

  return (
    <View style={styles.container}>
      {label && (
        <Text
          style={[
            styles.label,
            isFloating ? styles.labelFloating : styles.labelStatic,
            isFocused && styles.labelFocused,
            error && styles.labelError, 
          ]}
        >
          {label}
        </Text>
      )}
      <View style={styles.inputWrapper}>
        <TextInput
          style={[
            styles.input,
            style,
            isFocused && styles.inputFocused,
            error && styles.inputError, 
            label && { paddingTop: 22 },
          ]}
          secureTextEntry={!showPassword}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        <TouchableOpacity
          style={styles.icon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Ionicons
            name={showPassword ? "eye" : "eye-off"}
            size={20}
            color="#888"
          />
        </TouchableOpacity>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default PasswordField;

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    position: "relative",
  },
  label: {
    position: "absolute",
    left: 12,
    color: "#777",
    backgroundColor: "#fff",
    zIndex: 1,
    paddingHorizontal: 4,
  },
  labelStatic: {
    top: 18,
    fontSize: 13,
  },
  labelFloating: {
    top: -8,
    fontSize: 13,
    fontWeight: "bold",
  },
  labelFocused: {
    color: "#0C4A6E",
    fontWeight: "bold",
  },
  labelError: {
    color: "red", 
  },
  inputWrapper: {
    position: "relative",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === "ios" ? 14 : 10,
    fontSize: 16,
    paddingRight: 50,
  },
  inputFocused: {
    borderColor: "#0C4A6E",
  },
  inputError: {
    borderColor: "red", 
  },
  icon: {
    position: "absolute",
    right: 15,
    top: 18,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});
