import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { theme } from "../theme";
import { ButtonProps } from "../types/types";
import { useTheme } from "../theme/ThemeContext";

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
  style,
}) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    button: {
      borderRadius: theme.borderRadius.medium,
      alignItems: "center",
      justifyContent: "center",
    },
    primary: {
      backgroundColor: colors.primary,
    },
    secondary: {
      backgroundColor: "transparent",
      borderWidth: 2,
      borderColor: colors.primary,
    },
    medium: {
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
    },
    large: {
      paddingVertical: theme.spacing.lg,
      paddingHorizontal: theme.spacing.xl,
    },
    disabled: {
      opacity: 0.5,
    },
    text: {
      fontSize: 16,
      fontWeight: "600",
    },
    primaryText: {
      color: "white",
    },
    secondaryText: {
      color: colors.primary,
    },
  });

  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[variant],
        styles[size],
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, styles[`${variant}Text`]]}>{title}</Text>
    </TouchableOpacity>
  );
};
