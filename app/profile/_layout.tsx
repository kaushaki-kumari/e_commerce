import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileOption from "../../components/profile/ProfileOption";
import FooterLinks from "../../components/profile/FooterLinks";
import {
  AntDesign,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";

export default function ProfileScreen() {
  const [selectedSection, setSelectedSection] = useState("Profile");

  const renderSectionContent = () => {
    if (selectedSection === "Profile") {
      return (
        <>
          <ProfileHeader />
          <View style={styles.optionsContainer}>
            <ProfileOption
              icon={<FontAwesome5 name="box-open" size={24} color="#8a8a8a" />}
              label="Orders"
              subtitle="Check your order status"
            />
            <ProfileOption
              icon={<MaterialIcons name="help" size={24} color="#8a8a8a" />}
              label="Help Center"
              subtitle="Help regarding your recent purchases"
            />
            <ProfileOption
              icon={<Ionicons name="heart-outline" size={24} color="#8a8a8a" />}
              label="Wishlist"
              subtitle="Your most loved styles"
            />
            <ProfileOption
              icon={
                <MaterialIcons
                  name="qr-code-scanner"
                  size={24}
                  color="#8a8a8a"
                />
              }
              label="Scan for coupon"
              customStyle={{ marginVertical: 15 }}
            />
          </View>
        </>
      );
    }
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{selectedSection}</Text>
        <Text style={styles.sectionBody}>
          This is the content for {selectedSection}. 
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setSelectedSection("Profile")}
        >
          <AntDesign name="arrowleft" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{selectedSection}</Text>
      </View>

      <ScrollView style={styles.container}>
        {renderSectionContent()}
        <FooterLinks onLinkPress={(link) => setSelectedSection(link)} />
        <View style={styles.optionsContainer}>
          <Text style={styles.versionText}>APP VERSION 4.2503.21</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#7d7c7c",
    fontFamily: "Arial",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  optionsContainer: {
    backgroundColor: "#f5f5f5",
  },
  versionText: {
    fontSize: 13,
    textAlign: "center",
    color: "#616161",
    paddingVertical: 50,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "white",
    paddingTop: 45,
    paddingBottom: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 10,
  },
  sectionContainer: {
    padding: 20,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionBody: {
    fontSize: 14,
    color: "#666",
  },
});
