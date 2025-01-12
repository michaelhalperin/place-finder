import React from 'react';
import { View, Text } from 'react-native';

interface ProfileAvatarProps {
  styles: any;
  initials: string;
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ styles, initials }) => {
  return (
    <View style={styles.avatarContainer}>
      <Text style={styles.avatarText}>{initials}</Text>
    </View>
  );
};