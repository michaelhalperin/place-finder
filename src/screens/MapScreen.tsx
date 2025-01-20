import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  View,
  Alert,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";
import { WebView } from "react-native-webview";
import { FAB, TextInput } from "react-native-paper";
import axios from "axios";
import { useRoute, RouteProp, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useFavorites } from "@/context/FavoritesContext";
import { createMapStyles } from "@/theme/constants";
import { useTheme } from "@/theme/ThemeContext";
import { useLocation } from "@/hooks/useLocation";
import { RootStackParamList } from "@/types/types";
import { generateMapHTML } from "@/utils/mapHtml";
import { useLocationContext } from "@/context/LocationContext";
import { updateUserSettings } from "@/api/backApi";
import { useUserDataRefresh } from "@/hooks/useUserDataRefresh";
import { getUserProfile } from "@/api/backApi";

type MapScreenRouteProp = RouteProp<RootStackParamList, "Map">;

export const MapScreen = () => {
  const { colors } = useTheme();
  const styles = createMapStyles(colors);
  const webViewRef = useRef<WebView>(null);
  const [places, setPlaces] = useState<
    { latitude: number; longitude: number; title: string; saved?: boolean }[]
  >([]);
  const [search, setSearch] = useState("");
  const { latitude, longitude, loading, error } = useLocation();
  const { addFavorite } = useFavorites();
  const route = useRoute<MapScreenRouteProp>();
  const { setIsLocationEnabled } = useLocationContext();
  const { refreshUserData } = useUserDataRefresh();
  const [shouldRefresh, setShouldRefresh] = useState(false);

  useEffect(() => {
    if (route.params?.latitude && route.params?.longitude) {
      centerOnLocation(route.params.latitude, route.params.longitude);
    }
  }, [route.params?.latitude, route.params?.longitude]);

  useEffect(() => {
    const fetchSavedPlaces = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        if (!userId) return;

        const userData = await getUserProfile(userId);
        if (userData?.settings?.savedPlaces) {
          const savedPlaces = userData.settings.savedPlaces.map((place) => ({
            latitude: place.latitude,
            longitude: place.longitude,
            title: place.title,
            saved: true,
          }));

          setPlaces((prevPlaces) => {
            // Combine existing unsaved places with saved places
            const unsavedPlaces = prevPlaces.filter((p) => !p.saved);
            return [...unsavedPlaces, ...savedPlaces];
          });
        }
      } catch (error) {
        console.error("Error fetching saved places:", error);
      }
    };

    fetchSavedPlaces();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (shouldRefresh) {
        refreshUserData();
        const fetchSavedPlaces = async () => {
          try {
            const userId = await AsyncStorage.getItem("userId");
            if (!userId) return;

            const userData = await getUserProfile(userId);
            if (userData?.settings?.savedPlaces) {
              const savedPlaces = userData.settings.savedPlaces.map(
                (place) => ({
                  latitude: place.latitude,
                  longitude: place.longitude,
                  title: place.title,
                  saved: true,
                })
              );

              setPlaces((prevPlaces) => {
                const unsavedPlaces = prevPlaces.filter((p) => !p.saved);
                return [...unsavedPlaces, ...savedPlaces];
              });
            }
          } catch (error) {
            console.error("Error fetching saved places:", error);
          }
        };
        fetchSavedPlaces();
        setShouldRefresh(false);
      }
    }, [refreshUserData, shouldRefresh])
  );

  const handleSearch = async () => {
    if (!search.trim()) return;

    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search`,
        {
          params: {
            q: search,
            format: "json",
            addressdetails: 1,
            limit: 5,
          },
        }
      );

      if (response.data.length === 0) {
        Alert.alert("No Results", "No places found for your search.");
      } else {
        const firstPlace = response.data[0];
        const newPlace = {
          latitude: parseFloat(firstPlace.lat),
          longitude: parseFloat(firstPlace.lon),
          title: firstPlace.display_name,
          saved: false,
        };

        setPlaces((prev) => [...prev, newPlace]);
        centerOnLocation(newPlace.latitude, newPlace.longitude);
        setSearch("");
      }
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  const centerOnLocation = (latitude: number, longitude: number) => {
    webViewRef.current?.injectJavaScript(`
      map.setView([${latitude}, ${longitude}], 16);
    `);
  };

  const centerOnUser = () => {
    if (latitude && longitude) {
      centerOnLocation(latitude, longitude);
    }
  };

  const handleWebViewMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === "markerClick") {
        handleMarkerPress(data.place);
      }
    } catch (error) {
      console.error("Error parsing WebView message:", error);
    }
  };

  const handleMarkerPress = async (place: {
    latitude: number;
    longitude: number;
    title: string;
    saved?: boolean;
  }) => {
    if (place.saved) {
      return;
    }

    Alert.alert(
      "Save Location",
      "Would you like to save this location to favorites?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Save",
          onPress: async () => {
            try {
              const userId = await AsyncStorage.getItem("userId");
              const token = await AsyncStorage.getItem("userToken");

              if (!userId || !token) {
                Alert.alert("Error", "Please log in to save locations");
                return;
              }

              const response = await updateUserSettings(userId, {
                place: {
                  latitude: place.latitude,
                  longitude: place.longitude,
                  title: place.title,
                },
                action: "addPlace",
              });

              if (response.status === 200) {
                setPlaces(
                  places.map((p) =>
                    p.latitude === place.latitude &&
                    p.longitude === place.longitude
                      ? { ...p, saved: true }
                      : p
                  )
                );
                addFavorite({
                  latitude: place.latitude,
                  longitude: place.longitude,
                  title: place.title,
                });
                Alert.alert("Success", "Location saved to favorites!");
                setShouldRefresh(true);
              } else {
                throw new Error("Failed to save location");
              }
            } catch (error) {
              console.error("Error saving place:", error);
              if (axios.isAxiosError(error) && error.response?.status === 401) {
                Alert.alert("Error", "Please log in again to save locations");
              } else {
                Alert.alert(
                  "Error",
                  "Failed to save location. Please try again."
                );
              }
            }
          },
        },
      ]
    );
  };

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

  if (error) {
    return (
      <View style={[styles.container, styles.indicator]}>
        <Text
          style={[styles.errorText, { color: colors.error, marginBottom: 16 }]}
        >
          {error}
        </Text>
        <TouchableOpacity
          onPress={handleEnableLocation}
          style={[styles.enableButton, { backgroundColor: colors.primary }]}
        >
          <Text style={[styles.enableButtonText, { color: colors.background }]}>
            Enable Location Services
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (loading || !latitude || !longitude) {
    return (
      <View style={[styles.container, styles.indicator]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ html: generateMapHTML(latitude, longitude, places) }}
        style={styles.map}
        onMessage={handleWebViewMessage}
      />
      <FAB style={styles.fab} icon="crosshairs-gps" onPress={centerOnUser} />
      <TextInput
        style={[styles.searchBar, { color: colors.text }]}
        placeholder="Search for places"
        placeholderTextColor={colors.textSecondary}
        value={search}
        textColor={colors.text}
        onChangeText={setSearch}
        onSubmitEditing={handleSearch}
        selectionColor={colors.primary}
        right={
          search ? (
            <TextInput.Icon icon="close" onPress={() => setSearch("")} />
          ) : null
        }
      />
    </View>
  );
};

export default MapScreen;
