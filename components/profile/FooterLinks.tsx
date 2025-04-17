import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type FooterLinksProps = {
  onLinkPress: (label: string) => void;
};

const links = ['FAQs', 'ABOUT US', 'TERMS OF USE', 'PRIVACY POLICY', 'GRIEVANCE REDRESSAL'];

export default function FooterLinks({ onLinkPress }: FooterLinksProps) {
  return (
    <View style={styles.container}>
      {links.map((link, index) => (
        <TouchableOpacity key={index} onPress={() => onLinkPress(link)}>
          <Text style={styles.link}>{link}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );  
}

const styles = StyleSheet.create({
  container: {
    marginTop: 6,
    paddingHorizontal: 45,
    paddingBottom: 10,
  },
  link: {
    fontSize: 12,
    paddingVertical: 10,
    color: '#82807f',
    fontFamily:'helveticaRoundedBold'
  },
});

