import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeContext";

type ChipProps = {
  label: string;
};

export const Chip: React.FC<ChipProps> = ({ label }) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    chip: {
      backgroundColor: colors.primary + "20",
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      marginRight: 8,
      marginBottom: 8,
    },
    label: {
      color: colors.primary,
      fontSize: 14,
      fontWeight: "500",
    },
  });

  return (
    <View style={styles.chip}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};
