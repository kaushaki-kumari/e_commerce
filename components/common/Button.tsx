import React from "react";
import { Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface ButtonProps {
  title: string;
  onPress: () => void;
  gradient?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean; 
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  gradient = true,
  style,
  textStyle,
  disabled = false, 
}) => {
  const content = (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.button, style, disabled && styles.disabled]}
      disabled={disabled}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );

  return gradient ? (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
      style={[style, disabled && styles.disabled]}
    >
      <LinearGradient
        colors={["#7881FC", "#E330FF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.button, disabled && styles.disabled]}
      >
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  ) : (
    content
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 14,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    width: "100%",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  disabled: {
    opacity: 0.8,
  },
});
