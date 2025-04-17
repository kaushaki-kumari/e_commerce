import React, { useState } from "react";
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  TextInputProps,
  Platform,
} from "react-native";

interface TextFieldProps extends TextInputProps {
  label?: string;
  error?: string;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  error,
  style,
  value,
  onFocus,
  onBlur,
  ...props
}) => {
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
    <View style={styles.wrapper}>
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
        <TextInput
          {...props}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={[
            styles.input,
            style,
            isFocused && styles.inputFocused,
            error && styles.inputError,
            label && { paddingTop: 22 },
          ]}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default TextField;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 24,
    width: "100%",
  },
  container: {
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
    top: 16,
    fontSize: 13,
  },
  labelFloating: {
    top: -8,
    fontSize: 13,
    fontWeight: "bold",
  },
  labelFocused: {
    color: "#7881FC",
    fontWeight: "bold",
  },
  labelError: {
    color: "#ff4d4f",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === "ios" ? 14 : 8,
    fontSize: 16,
  },
  inputFocused: {
    borderColor: "#7881FC",
  },
  inputError: {
    borderColor: "#ff4d4f",
  },
  errorText: {
    marginTop: 4,
    marginLeft: 4,
    color: "#ff4d4f",
    fontSize: 13,
  },
});
