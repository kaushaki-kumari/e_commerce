import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import TextField from "@/components/common/TextField";
import { LinearGradient } from "expo-linear-gradient";
import Button from "@/components/common/Button";
import { FontAwesome } from "@expo/vector-icons";
const { height } = Dimensions.get("window");

const UserInformationScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState<"male" | "female" | null>(null);
  const [userType, setUserType] = useState<"user" | "seller" | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleContinue = () => {
    alert("Continue pressed!");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient colors={["#7881FC", "#E330FF"]} style={styles.topCurve}>
        <Text style={styles.accountText}>Account Details !</Text>
      </LinearGradient>

      <TouchableOpacity onPress={pickImage} style={styles.avatarWrapper}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.iconWrapper]}>
            <FontAwesome name="user" size={50} color="#ccc" />
          </View>
        )}
        <Text style={styles.uploadText}>Tap to upload your image</Text>
      </TouchableOpacity>

      <View style={styles.rowInput}>
        <View style={{ flex: 1 }}>
          <TextField
            label="First Name *"
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>

        <View style={{ flex: 1 }}>
          <TextField
            label="Last Name *"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>
      </View>

      <TextField
        label="Phone Number *"
        value={lastName}
        onChangeText={setLastName}
      />

      <Text style={styles.label}>Select Gender</Text>
      <View style={styles.cardRow}>
        <TouchableOpacity
          onPress={() => setGender("male")}
          style={[styles.card, gender === "male" && styles.selectedCard]}
        >
          <Image
            source={require("../../assets/images/images/gender-male.png")}
            style={styles.cardImage}
          />
          <Text style={styles.cardText}>Male</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setGender("female")}
          style={[styles.card, gender === "female" && styles.selectedCard]}
        >
          <Image
            source={require("../../assets/images/images/gender-female.png")}
            style={styles.cardImage}
          />
          <Text style={styles.cardText}>Female</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Select Role</Text>
      <View style={styles.cardRow}>
        <TouchableOpacity
          onPress={() => setUserType("user")}
          style={[styles.card, userType === "user" && styles.selectedCard]}
        >
          <Image
            source={require("../../assets/images/images/user.png")}
            style={styles.cardImage}
          />
          <Text style={styles.cardText}>User</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setUserType("seller")}
          style={[styles.card, userType === "seller" && styles.selectedCard]}
        >
          <Image
            source={require("../../assets/images/images/seller.png")}
            style={styles.cardImage}
          />
          <Text style={styles.cardText}>Seller</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonWrapper}>
        <Button title="Continue" onPress={handleContinue} />
      </View>
      <View style={styles.helpContainer}>
        <Text style={styles.helpText}>Having trouble filling this out?</Text>
        <TouchableOpacity>
          <Text style={styles.helpLink}> Get help</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default UserInformationScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: height * 0.18,
    flex: 1,
  },
  topCurve: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.25,
    backgroundColor: "#7881FC",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    zIndex: -1,
    justifyContent: "center",
    alignItems: "center",
  },
  accountText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
  },
  avatarWrapper: {
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 60,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },
  iconWrapper: {
    backgroundColor: "#f1f1f1",
  },
  uploadText: {
    fontSize: 15,
    color: "#666",
    marginBottom: 8,
    fontWeight: "bold",
    borderBottomWidth: 2,
    borderColor: "#eee",
    borderStyle: "dotted",
  },
  rowInput: {
    flexDirection: "row",
    width: "100%",
    gap: 15,
  },
  buttonWrapper: {
    width: "80%",
  },
  label: {
    fontWeight: "600",
    marginBottom: 6,
    alignSelf: "flex-start",
    color: "#333",
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
    marginBottom: 20,
    width: "100%",
  },

  card: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    backgroundColor: "#fff",
  },

  selectedCard: {
    borderColor: "#7881FC",
    backgroundColor: "#f0f4ff",
  },

  cardImage: {
    width: 60,
    height: 55,
    marginBottom: 8,
    resizeMode: "contain",
  },

  cardText: {
    fontWeight: "600",
    fontSize: 14,
    color: "#333",
  },

  dobPicker: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 15,
  },

  dobText: {
    fontSize: 16,
    color: "#333",
  },
  helpContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  helpText: {
    marginTop: -5,
    fontSize: 13,
    color: "#878686",
  },
  helpLink: {
    marginTop: -5,
    color: "#7881FC",
    fontWeight: "bold",
  },
});
