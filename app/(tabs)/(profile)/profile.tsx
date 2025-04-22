import React, { useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { useState } from "react";

import {
  AntDesign,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import FAQs from "@/components/profile/FAQs";
import AboutUs from "@/components/profile/AboutUs";
import TermsOfUs from "@/components/profile/TermsOfUs";
import PrivacyPolicy from "@/components/profile/PrivacyPolicy";
import Grievance from "@/components/profile/Grievance";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileOption from "@/components/profile/ProfileOption";
import FooterLinks from "@/components/profile/FooterLinks";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const [selectedSection, setSelectedSection] = useState("Profile");
  const router = useRouter();
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (selectedSection !== "Profile") {
          setSelectedSection("Profile");
          return true;
        }
        return false;
      }
    );

    return () => {
      backHandler.remove();
    };
  }, [selectedSection]);

  const renderSectionContent = () => {
    const sectionComponents: { [key: string]: React.ReactNode } = {
      Profile: (
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
          <FooterLinks onLinkPress={(link) => setSelectedSection(link)} />
          <View style={styles.optionsContainer}>
            <Text style={styles.versionText}>APP VERSION 4.2503.21</Text>
          </View>
        </>
      ),
      FAQs: <FAQs />,
      "ABOUT US": <AboutUs />,
      "TERMS OF USE": <TermsOfUs />,
      "PRIVACY POLICY": <PrivacyPolicy />,
      "GRIEVANCE REDRESSAL": <Grievance />,
    };

    return sectionComponents[selectedSection] || <ProfileHeader />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            if (selectedSection !== "Profile") {
              setSelectedSection("Profile");
            } else {
              router.back();
            }
          }}
        >
          <AntDesign name="arrowleft" size={18} color="black" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{selectedSection}</Text>
      </View>

      <ScrollView style={styles.container}>{renderSectionContent()}</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E2637",
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
