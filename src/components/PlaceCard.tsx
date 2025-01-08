import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { PlaceCardProps } from '@/types/types';
import { theme } from '../theme';

export const PlaceCard: React.FC<PlaceCardProps> = ({ place, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image 
        source={{ uri: place.image }} 
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.name}>{place.name}</Text>
        <Text style={styles.rating}>⭐ {place.rating}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {place.description}
        </Text>
        {place.distance && (
          <Text style={styles.distance}>{place.distance}</Text>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: theme.borderRadius.medium,
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: theme.spacing.md,
  },
  name: {
    ...theme.typography.h2,
    marginBottom: theme.spacing.xs,
  },
  rating: {
    ...theme.typography.body,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  description: {
    ...theme.typography.body,
    color: theme.colors.text,
    opacity: 0.8,
  },
  distance: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    marginTop: theme.spacing.xs,
  },
});