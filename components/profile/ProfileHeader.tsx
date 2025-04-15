import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import LoginModal from "../auth/LoginSignModal";

export default function ProfileHeader() {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
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

            <TouchableOpacity style={styles.loginButton} onPress={openModal}>
              <Text style={styles.loginText}>LOG IN/SIGN UP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <LoginModal visible={modalVisible} onClose={closeModal} />
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
  avatarImage: {
    width: "55%",
    height: "55%",
    resizeMode: "cover",
    borderRadius: 5,
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
  avatarIcon: {
    fontSize: 35,
  },
  loginButton: {
    marginTop: 75,
    backgroundColor: "#ff4d6d",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 2,
    alignItems: "center",
    width: "62%",
  },
  loginText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },
});
