import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  TextInput,
  View,
  StyleSheet,
  TextInputProps,
  Easing,
} from "react-native";

interface Props extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
}

const UserInfoTextField: React.FC<Props> = ({
  label,
  value,
  onChangeText,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const animatedIsFocused = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: isFocused || value ? 1 : 0,
      duration: 150,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const labelStyle = {
    position: "absolute" as const,
    left: 0,
    paddingHorizontal: 2,
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [10, -12], // initial = center inside input, animated = top above
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: ["#aaa", "#444"],
    }),
    backgroundColor: "#fff",
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={labelStyle}>{label}</Animated.Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder=" "
        {...props}
      />
    </View>
  );
};

export default UserInfoTextField;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    marginBottom: 20,
  },
  input: {
    height: 40,
    fontSize: 16,
    borderBottomWidth: 1.5,
    borderColor: "#ccc",
    color: "#000",
  },
});
