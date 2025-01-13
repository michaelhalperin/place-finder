import React, { useEffect, useState, useMemo } from "react";
import { View, FlatList, Text, ActivityIndicator } from "react-native";
import { PlaceCard } from "../components/PlaceCard";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Activity, RootStackParamList } from "../types/types";
import { placesApi } from "../api/api";
import { getRecommendations } from "../utils/recommendations";
import { useLocation } from "../hooks/useLocation";
import { useTheme } from "@/theme/ThemeContext";
import { createHomeStyles } from "@/theme/constants";
import { useSortContext } from "../context/SortContext";
import { SkeletonLoader } from "../components/SkeletonLoader";

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
  const styles = createHomeStyles(colors);
  const { sortType } = useSortContext();

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

  const sortedPlaces = useMemo(() => {
    return [...places].sort((a, b) => {
      switch (sortType) {
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "name":
          return a.name.localeCompare(b.name);
        case "popularity":
          return (b.rating || 0) - (a.rating || 0);
        case "distance":
          // Default to original order if distance not available
          return 0;
        default:
          return 0;
      }
    });
  }, [places, sortType]);

  const isLoading = loading || locationLoading;

  return (
    <View style={styles.container}>
      {locationError ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.errorText}>{locationError}</Text>
        </View>
      ) : isLoading ? (
        <FlatList
          data={[1, 2]}
          renderItem={() => <SkeletonLoader />}
          keyExtractor={(item) => item.toString()}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <FlatList
          data={sortedPlaces}
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
