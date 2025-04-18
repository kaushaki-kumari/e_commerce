import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import ExpandableContent from "../ui/ExpandableContent";

const aboutUsData = [
  {
    heading: "Introduction",
    description:
      "Myntra is a one stop shop for all your fashion and lifestyle needs. Being India's largest e-commerce store for fashion and lifestyle products, Myntra aims at providing a hassle free and enjoyable shopping experience to shoppers across the country with the widest range of brands and products on its portal. The brand is making a conscious effort to bring the power of fashion to shoppers with an array of the latest and trendiest products available in the country.",
  },
  {
    heading: "Value Proposition",
    description:
      "Myntra's value proposition lies in its wide selection, quality customer service, and trend-setting fashion curation, offering unmatched convenience and variety to its customers.",
  },
  {
    heading: "Brands",
    description:
      "Myntra houses a wide range of popular and premium brands, catering to all fashion and lifestyle preferences including apparel, footwear, accessories, and more.",
  },
  {
    heading: "Recognitions",
    description:
      "Myntra has received numerous awards for its innovation, customer service, and leadership in the fashion e-commerce industry.",
  },
];

const AboutUs = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/logo/about-usLogo.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Get to Know Myntra</Text>
        <Text style={styles.subtitle}>
          Discover the values and mission behind Myntra. Join us on our fashion journey.
        </Text>
      </View>

      <View style={styles.content}>
        {aboutUsData.map((item, index) => (
          <View key={index} style={styles.section}>
            <ExpandableContent
              heading={item.heading}
              description={item.description}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f7f9fc",
  },
  header: {
    backgroundColor: "#ffffff",
    paddingVertical: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
    borderBottomWidth: 1,
    borderColor: "#e4e4e4",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  logo: {
    width: 100,
    height: 100,
  
  },
  title: {
    fontSize: 28,
    fontFamily:'AbriFatfaceRegular',
    color: "#333",
    textAlign: "center",
    marginBottom:5,
  },
  subtitle: {
    fontSize: 14,
    color: "#a5a4a6",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 10,
    fontFamily:'Helvetica',
    paddingHorizontal:30
  },
  content: {
    paddingHorizontal: 20,
  },
  section: {
    backgroundColor: "#ffffff",
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#ddd",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
});

export default AboutUs;
