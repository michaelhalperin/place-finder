import React, { useEffect, useState, useMemo } from "react";
import { View, FlatList, Text, ActivityIndicator } from "react-native";
import { PlaceCard } from "../components/PlaceCard";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Activity, RootStackParamList } from "../types/types";
// import { placesApi } from "../api/api";
import { getRecommendations } from "../utils/recommendations";
import { useLocation } from "../hooks/useLocation";
import { useTheme } from "@/theme/ThemeContext";
import { createHomeStyles } from "@/theme/constants";
import { useSortContext } from "../context/SortContext";
import { SkeletonLoader } from "../components/SkeletonLoader";
import { mockPlaces } from "../utils/mockPlaces";

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
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<HomeScreenRouteProp>();
  const userAnswers = route.params?.userAnswers;
  const styles = createHomeStyles(colors);
  const { sortType } = useSortContext();

  useEffect(() => {
    const recommendedPlaces = userAnswers
      ? getRecommendations(userAnswers, mockPlaces).recommendations
      : mockPlaces;

    setPlaces(recommendedPlaces);
  }, [userAnswers]);

  // sorting logic
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

  const isLoading = false;

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
