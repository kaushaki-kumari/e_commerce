import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
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
    <View style={styles.container}>
      <Text style={styles.title}>Myntra/About</Text>

      {aboutUsData.map((item, index) => (
        <View key={index} style={styles.section}>
          <ExpandableContent
            heading={item.heading}
            description={item.description}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 25,
    fontWeight: "semibold",
    marginTop: 50,
    marginBottom: 25,
    color: "#444",
    borderBottomWidth: 1,
    borderColor: "#eee",
    borderStyle: "dotted",
  },
  section: {
    marginBottom: 5,
  },
});

export default AboutUs;
