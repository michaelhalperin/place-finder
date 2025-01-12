import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
} from "react-native";
import { PlaceCard } from "../components/PlaceCard";
import { theme } from "../theme";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Activity, RootStackParamList } from "../types/types";
import { placesApi } from "../api/api";
import { getRecommendations } from "../utils/recommendations";
import { useLocation } from "../hooks/useLocation";
import { useTheme } from "../theme/ThemeContext";

type HomeScreenRouteProp = RouteProp<RootStackParamList, "User">;

export const HomeScreen = () => {
  const { colors } = useTheme();
  const [places, setPlaces] = useState<Activity[]>([]);
  const {
    latitude,
    longitude,
    loading: locationLoading,
    error: locationError,
  } = useLocation();
  const [loading, setLoading] = useState(true);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<HomeScreenRouteProp>();
  const userAnswers = route.params?.userAnswers;

  useEffect(() => {
    const fetchPlaces = async () => {
      if (!latitude || !longitude) return;

      try {
        const nearbyPlaces = await placesApi.getNearbyPlacesWithWebsites(
          latitude,
          longitude
        );

        const activities = nearbyPlaces.map((place) => ({
          id: place.place_id,
          name: place.name,
          rating: place.rating || 0,
          image: place.photos?.[0]
            ? placesApi.getPhotoUrl(place.photos[0].photo_reference)
            : "https://picsum.photos/400/200",
          description: place.vicinity || "",
          distance: "",
          address: place.vicinity || "",
          openingHours: place.opening_hours?.open_now ? "Open" : "Closed",
          features: place.types || [],
          tags: place.types || [],
          difficulty: userAnswers?.q3 || "moderate",
          duration: userAnswers?.q4 || "1-2 hours",
          timeOfDay: userAnswers?.q5 || "any",
          website: place.website || null,
          phone: place.phone || null,
        }));

        const recommendedPlaces = userAnswers
          ? getRecommendations(userAnswers, activities).recommendations
          : activities;

        setPlaces(recommendedPlaces);
      } catch (error) {
        console.error("Failed to fetch places:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [latitude, longitude, userAnswers]);

  const isLoading = loading || locationLoading;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      padding: theme.spacing.lg,
      backgroundColor: colors.primary,
    },
    headerTitle: {
      ...theme.typography.h2,
      color: "white",
    },
    listContent: {
      padding: theme.spacing.md,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    errorText: {
      ...theme.typography.errorText,
      color: colors.error,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Recommended Places</Text>
      </View>
      {locationError ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.errorText}>{locationError}</Text>
        </View>
      ) : isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={places}
          renderItem={({ item }) => (
            <PlaceCard
              place={item}
              onPress={() =>
                navigation.navigate("PlaceDetails", {
                  placeId: item.id,
                  placeData: item,
                })
              }
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};
