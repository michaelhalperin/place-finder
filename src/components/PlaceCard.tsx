import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  Linking,
} from "react-native";
import { PlaceCardProps } from "@/types/types";
import { useTheme } from "@/theme/ThemeContext";
import { createPlaceCardStyles } from "@/theme/constants";

export const PlaceCard: React.FC<PlaceCardProps> = ({ place, onPress }) => {
  const { colors } = useTheme();
  const styles = createPlaceCardStyles(colors);

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
