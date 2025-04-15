import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Collapsible from "../Collapsible";
interface ExpandableContentProps {
  heading: string;
  description: string;
  number?: number;
}

const ExpandableContent: React.FC<ExpandableContentProps> = ({
  heading,
  description,
  number,
}) => {
  return (
    <View style={styles.faqContainer}>
      <Collapsible
        title={
          <View style={styles.headingRow}>
            {number !== undefined && (
              <Text style={styles.number}>{number}.</Text>
            )}
            <Text style={styles.heading}>{heading}</Text>
          </View>
        }
      >
        <Text style={styles.answer}>{description}</Text>
      </Collapsible>
    </View>
  );
};

const styles = StyleSheet.create({
  faqContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#eee",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  headingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  number: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginRight: 6,
  },
  heading: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
    flexShrink: 1,
  },
  answer: {
    textAlign: "justify",
    fontSize: 14,
    color: "#666",
  },
});

export default ExpandableContent;
