import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import Navbar from "@/components/home/Navbar";

const HomeScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("All");
  const tabs: string[] = ["All", "Men", "Women", "Kids", "Categories"];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.addressContainer}>
        <View style={styles.addressTextContainer}>
          <Ionicons name="location-outline" size={20} color="#333" />
          <Text style={styles.addressText}>Add Address</Text>
        </View>
        <MaterialIcons name="keyboard-arrow-down" size={28} color="#333" />
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons
            name="search-outline"
            size={20}
            color="#999"
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search products..."
            style={styles.searchInput}
            placeholderTextColor="#999"
          />
        </View>
        <TouchableOpacity style={styles.iconButton}>
          <Feather name="heart" size={22} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Feather name="user" size={22} color="#333" />
        </TouchableOpacity>
      </View>

      <Navbar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  addressContainer: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    marginBottom: 12,
    marginTop: 30,
  },
  addressTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  addressText: {
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "500",
    color: "#333",
    fontFamily: "HelveticaBold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 14,
    color: "#333",
  },
  iconButton: {
    marginLeft: 12,
  },
});

export default HomeScreen;
