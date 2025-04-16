import React from "react";
import { Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface ButtonProps {
  title: string;
  onPress: () => void;
  gradient?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({ title, onPress, gradient = true, style, textStyle }) => {
  const content = (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={[styles.button, style]}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );

  return gradient ? (
    <LinearGradient
      colors={["#7881FC", "#E330FF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[styles.button, style]}
    >
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </TouchableOpacity>
    </LinearGradient>
  ) : (
    content
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    padding: 14,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});
