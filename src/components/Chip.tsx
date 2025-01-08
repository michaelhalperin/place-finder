import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';

type ChipProps = {
  label: string;
};

export const Chip: React.FC<ChipProps> = ({ label }) => (
  <View style={styles.chip}>
    <Text style={styles.label}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  chip: {
    backgroundColor: theme.colors.primary + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  label: {
    color: theme.colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
});