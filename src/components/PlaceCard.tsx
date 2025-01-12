import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Linking,
} from "react-native";
import { PlaceCardProps } from "@/types/types";
import { theme } from "../theme";
import { useTheme } from "@/theme/ThemeContext";

export const PlaceCard: React.FC<PlaceCardProps> = ({ place, onPress }) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
      borderRadius: theme.borderRadius.medium,
      overflow: "hidden",
      marginBottom: theme.spacing.md,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    image: {
      width: "100%",
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
      color: colors.text,
      marginBottom: theme.spacing.xs,
    },
    description: {
      ...theme.typography.body,
      color: colors.text,
      opacity: 0.8,
    },
    distance: {
      ...theme.typography.caption,
      color: colors.primary,
      marginTop: theme.spacing.xs,
    },
    website: {
      ...theme.typography.caption,
      color: colors.text,
      marginTop: theme.spacing.xs,
    },
    link: {
      color: colors.primary,
      textDecorationLine: "underline",
    },
  });

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image source={{ uri: place.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{place.name}</Text>
        <Text style={styles.rating}>⭐ {place.rating}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {place.description}
        </Text>
        {place.distance && (
          <Text style={styles.distance}>{place.distance}</Text>
        )}
        <Pressable
          onPress={() => place.website && Linking.openURL(place.website)}
        >
          <Text style={[styles.website, place.website && styles.link]}>
            {place.website ? "Visit Website" : "No website available"}
          </Text>
        </Pressable>
      </View>
    </Pressable>
  );
};
