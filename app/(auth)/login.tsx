import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
      <Text style={styles.title}>Login to your account</Text>

      <TextInput
        placeholder="Email or Mobile Number"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
      />

      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity >
        <Text style={styles.linkText}>
          Forgot your password? <Text style={styles.linkHighlight}>Reset here</Text>
        </Text>
      </TouchableOpacity>

      <TouchableOpacity >
        <Text style={styles.linkText}>
          Having trouble logging in? <Text style={styles.linkHighlight}>Get help</Text>
        </Text>
      </TouchableOpacity>
      </View>

    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  section:{
padding:25,
marginTop:40
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#1a1a1a',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  loginButton: {
    backgroundColor: '#ff3f6c',
    padding: 16,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 24,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
    marginBottom: 8,
  },
  linkHighlight: {
    color: '#ff3f6c',
    fontWeight: 'bold',
  },
});
