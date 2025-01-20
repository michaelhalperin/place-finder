import React from "react";
import { View, Text, Image } from "react-native";

interface ProfileAvatarProps {
  styles: any;
  initials: string;
  image?: string | null;
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  styles,
  initials,
  image,
}) => {
  return (
    <View style={styles.avatarContainer}>
      {image ? (
        <Image source={{ uri: image }} style={styles.avatarImage} />
      ) : (
        <Text style={styles.avatarText}>{initials}</Text>
      )}
    </View>
  );
};
