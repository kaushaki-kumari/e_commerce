import React from "react";
import {
  ScrollView,
  View,
  Text,
  Linking,
  TouchableOpacity,
} from "react-native";
import { StyleSheet } from "react-native";

const Grievance = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Consumer Grievance Resolution</Text>
        <Text style={styles.text}>
          Myntra is duty-bound to provide fair treatment to our consumers and
          resolve any grievances.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>What does 'Grievance' mean?</Text>
        <Text style={styles.text}>
          A grievance refers to any issue related to the product or service that
          has been availed by the consumer from the Myntra platform, for which
          the consumer is seeking a resolution.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>
          How to Contact Myntra for Grievances?
        </Text>
        <Text style={styles.text}>
          If you have any queries or complaints, you can reach out to us via the
          "Contact Us" tab available on the Myntra page or by clicking the link
          below:
        </Text>

        <Text style={styles.linkText}>Contact Us</Text>

        <Text style={styles.text}>
          It will open the Myntra Help Center with 24x7 Customer Care Support.
          Choose from the type of issue or help topics and submit your query.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Escalating a Complaint</Text>
        <Text style={styles.text}>
          If your query or complaint is not resolved and needs escalation, you
          may contact our Grievance Officer. Please provide the ticket ID
          generated during your interaction with Customer Support.
        </Text>
        <Text style={styles.subHeading}>Grievance Officer Contact:</Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Name:</Text> Mr. Arshwaal Singh
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Designation:</Text> Sr Manager - CC -
          Escalation Desk
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Address:</Text> Myntra Designs Pvt Ltd,
          Alyssa, Begonia and Clover, Embassy Tech Village, Outer Ring Road,
          Devarabeesanahalli Village, Varthur Hobli, Bengaluru, Karnataka:
          560103, India
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Email:</Text> customergrievance@myntra.com
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Phone:</Text> 080-61561999
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Time:</Text> Mon - Fri (9:00 AM - 6:00 PM)
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Acknowledgment and Resolution</Text>
        <Text style={styles.text}>
          The Consumer shall receive an acknowledgment - a system-generated
          "Unique ID" within 48 hours through email to track the grievance
          status.
        </Text>
        <Text style={styles.text}>
          A Grievance will be considered as closed when the consumer is
          communicated with a solution to their grievance by Consumer Support or
          the Grievance Officer.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.text}>
          For more details, please visit{" "}
            <Text style={styles.linkText}>Terms of Use</Text>
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
  },
  section: {
    marginBottom: 16,
  },
  title: {
    fontSize: 23,
    fontWeight: "600",
    marginTop: 25,
    marginBottom: 10,
    color: "#444",
    borderBottomWidth: 1,
    borderColor: "#eee",
    borderStyle: "dotted",
  },
  heading: {
    fontSize: 18,
    fontWeight: "semibold",
    marginBottom: 5,
  },
  subHeading: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    color: "#333",
    lineHeight: 21,
    marginBottom:5
  },
  bold: {
    fontWeight: "bold",
  },
  linkButton: {
    marginVertical: 8,
  },
  linkText: {
    color: "#007aff",
    textDecorationLine: "underline",
    marginVertical:5
  },
});

export default Grievance;
