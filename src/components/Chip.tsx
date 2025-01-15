import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../theme/ThemeContext";

type ChipProps = {
  label: string;
  onPress?: () => void;
};

export const Chip: React.FC<ChipProps> = ({ label, onPress }) => {
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
    <TouchableOpacity onPress={onPress}>
      <View style={styles.chip}>
        <Text style={styles.label}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};
