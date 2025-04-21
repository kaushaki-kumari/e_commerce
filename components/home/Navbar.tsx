import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface NavbarProps {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <View style={styles.navbar}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          onPress={() => setActiveTab(tab)}
          style={styles.navItemWrapper}
        >
          {tab === "Categories" ? (
            <Ionicons
              name="grid-outline"
              size={20}
              color={activeTab === tab ? "#7881FC" : "#333"}
            />
          ) : (
            <Text
              style={[
                styles.navItemText,
                activeTab === tab && styles.activeNavItemText,
              ]}
            >
              {tab}
            </Text>
          )}
          {activeTab === tab && <View style={styles.activeLine} />}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  navItemWrapper: {
    alignItems: "center",
  },
  navItemText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    fontFamily:'Helvetica'
  },
  activeLine: {
    marginTop: 4,
    height: 2,
    width: "100%",
    backgroundColor: "#7881FC",
    borderRadius: 1,
  },
  activeNavItemText: {
    color: "#7881FC",
    fontFamily: "HelveticaBold",
  },
});

export default Navbar;
