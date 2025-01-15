import React from "react";
import { View, Text } from "react-native";
import { createProfileStyles } from "@/theme/constants";
import { useTheme } from "@react-navigation/native";

interface ProfileSectionProps {
  title: string;
  children: React.ReactNode;
  styles?: any;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  title,
  children,
  styles,
}) => {
  const { colors } = useTheme();
  const sectionStyles = createProfileStyles(colors);

  return (
    <View style={sectionStyles.section}>
      <Text style={styles}>{title}</Text>
      {children}
    </View>
  );
};
