import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function ProfileHeader() {
  const router = useRouter();

  const handleLoginPress = () => {
    router.push("/login");
  };

  return (
    <View>
      <View style={styles.headerContainer}>
        <View style={styles.header} />
        <View style={styles.contentContainer}>
          <View style={styles.rowContainer}>
            <View style={styles.avatarContainer}>
              <Image
                source={require("../../assets/images/avtar-profile.png")}
                style={styles.avatarImage}
              />
            </View>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLoginPress}
            >
              <View style={styles.solidButton}>
                <Text style={styles.loginText}>LOG IN/SIGN UP</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    position: "relative",
    height: 215,
  },
  header: {
    backgroundColor: "#505464",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 130,
  },
  contentContainer: {
    paddingHorizontal: 15,
  },
  rowContainer: {
    marginTop: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  avatarContainer: {
    width: 120,
    height: 125,
    backgroundColor: "white",
    borderRadius: 5,
    borderColor: "#ddd",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarImage: {
    width: "55%",
    height: "55%",
    resizeMode: "cover",
    borderRadius: 5,
  },
  loginButton: {
    marginTop: 75,
    width: "62%",
  },
  solidButton: {
    backgroundColor: "#1E2637",
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  loginText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },
});
