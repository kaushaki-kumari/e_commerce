import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ReactNode } from 'react';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  icon: ReactNode;
  label: string;
  subtitle?: string;
  customStyle?: object;
}

export default function ProfileOption({ icon, label, subtitle, customStyle }: Props) {
  return (
    <TouchableOpacity style={[styles.option, customStyle]}>
      <View style={styles.leftSection}>
        <View style={styles.iconWrapper}>{icon}</View>
        <View>
          <Text style={styles.label}>{label}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
      </View>
      <Ionicons name="chevron-forward" size={12} color="#8a8a8a" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    padding: 16,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    alignItems: 'center',
    backgroundColor: "#fff",
    justifyContent: 'space-between',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    marginRight: 12,
  },
  label: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
  },
  subtitle: {
    marginTop: 3,
    color: '#7d7c7c',
    fontSize: 13,
  },
});
