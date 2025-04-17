import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import ExpandableContent from "../ui/ExpandableContent";
type FaqItem = {
  heading: string;
  description: string;
};

type FaqSectionProps = {
  title: string;
  subtitle: string;
  buttonText: string;
  onPress: () => void;
  faqs: FaqItem[];
};

const FaqSection: React.FC<FaqSectionProps> = ({
  title,
  subtitle,
  buttonText,
  onPress,
  faqs,
}) => {
  return (
    <View>
      <View style={styles.headingContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>

      {faqs.map((faq, index) => (
        <ExpandableContent
          key={`${title}-${index}`}
          heading={faq.heading}
          description={faq.description}
        />
      ))}
    </View>
  );
};

export default FaqSection;

const styles = StyleSheet.create({
  headingContainer: {
    borderBottomWidth: 1,
    borderColor: "#eee",
    borderStyle: "dotted",
    marginBottom: 15,
  },
  title: {
    fontSize: 25,
    fontFamily:'helveticaRoundedBold',
    marginTop: 10,
    marginBottom: 5,
    color: "#444",
  },
  subtitle: {
    fontSize: 16,
    color: "#393a3b",
    marginBottom: 10,
    fontFamily:'Helvetica',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 10,
    alignSelf: "flex-end",
    borderWidth: 1,
    borderColor: "#eee",
  },
  buttonText: {
    color: "#123458",
    fontSize: 14,
    fontFamily:'HelveticaBold'
  },
  answer: {
    fontSize: 14,
    color: "#666",
    paddingTop: 10,
  },
});
