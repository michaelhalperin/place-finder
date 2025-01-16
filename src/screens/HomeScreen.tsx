import React, { useEffect, useState, useMemo } from "react";
import { View, FlatList, Text, TouchableOpacity, Alert } from "react-native";
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
import { getLocalizedActivities } from "../utils/mockPlaces";
import { useLocationContext } from "@/context/LocationContext";
import { useTranslation } from "react-i18next";

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
  const { sortType, isAscending } = useSortContext();
  const { setIsLocationEnabled } = useLocationContext();
  const { i18n } = useTranslation();

  useEffect(() => {
    const recommendedPlaces = userAnswers
      ? getRecommendations(
          userAnswers,
          getLocalizedActivities(i18n.language as "en" | "he")
        ).recommendations
      : getLocalizedActivities(i18n.language as "en" | "he");

    setPlaces(recommendedPlaces);
  }, [userAnswers, i18n.language]);

  // sorting logic
  const sortedPlaces = useMemo(() => {
    return [...places].sort((a, b) => {
      const multiplier = isAscending ? 1 : -1;

      switch (sortType) {
        case "rating":
          return multiplier * ((a.rating || 0) - (b.rating || 0));
        case "name":
          return multiplier * a.name.localeCompare(b.name);
        case "popularity":
          return multiplier * ((a.rating || 0) - (b.rating || 0));
        case "distance":
          return (
            multiplier *
            (parseFloat(a.distance || "0") - parseFloat(b.distance || "0"))
          );
        default:
          return 0;
      }
    });
  }, [places, sortType, isAscending]);

  const isLoading = false;

  const handleEnableLocation = () => {
    Alert.alert(
      "Location Services Disabled",
      "This app needs access to location services for better experience. Would you like to enable it?",
      [
        {
          text: "Not Now",
          style: "cancel",
        },
        {
          text: "Enable",
          onPress: () => setIsLocationEnabled(true),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {locationError ? (
        <View style={[styles.container, styles.indicator]}>
          <Text style={[styles.errorText, { marginBottom: 16 }]}>
            {locationError}
          </Text>
          <TouchableOpacity
            onPress={handleEnableLocation}
            style={styles.enableButton}
          >
            <Text style={styles.enableButtonText}>
              Enable Location Services
            </Text>
          </TouchableOpacity>
        </View>
      ) : isLoading ? (
        <FlatList
          data={[1, 2]}
          renderItem={() => <SkeletonLoader />}
          keyExtractor={(item) => item.toString()}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View>
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
        </View>
      )}
    </View>
  );
};
