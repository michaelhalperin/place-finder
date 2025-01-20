import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../theme/ThemeContext";

type ChipProps = {
  label: string;
  onPress?: () => void;
  onDelete?: () => void;
};

export const Chip: React.FC<ChipProps> = ({ label, onPress, onDelete }) => {
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
    chipContent: {
      flexDirection: "row",
      alignItems: "center",
    },
    deleteButton: {
      marginLeft: 6,
      color: colors.primary,
      fontSize: 16,
      fontWeight: "bold",
    },
  });

  const ChipContent = (
    <View style={styles.chip}>
      <View style={styles.chipContent}>
        <Text style={styles.label}>{label}</Text>
        {onDelete && (
          <TouchableOpacity onPress={onDelete}>
            <Text style={styles.deleteButton}>×</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return onPress ? (
    <TouchableOpacity onPress={onPress}>{ChipContent}</TouchableOpacity>
  ) : (
    ChipContent
  );
};
