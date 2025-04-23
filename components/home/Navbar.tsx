import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

interface NavbarProps {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ tabs, activeTab, setActiveTab }) => {
  const handleTabPress = (tab: string) => {
    if (tab === "Categories") {
      router.push("/categories");
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.navbar}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => handleTabPress(tab)}
            style={styles.navItemWrapper}
          >
            {tab === "Categories" ? (
              <View style={styles.categoryTab}>
                <Ionicons name="grid-outline" size={20} color="#fff" />
              </View>
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
    </SafeAreaView>
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
    fontFamily: "Helvetica",
  },
  activeLine: {
    marginTop: 4,
    height: 2,
    width: "100%",
    backgroundColor: "#1E2637",
    borderRadius: 1,
  },
  activeNavItemText: {
    color: "#1E2637",
    fontFamily: "HelveticaBold",
  },
  categoryTab: {
    backgroundColor: "#1E2637",
    padding: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#fff",
    elevation: 3,
  },
});

export default Navbar;
