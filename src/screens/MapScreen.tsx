import React, { useState, useRef, useEffect } from "react";
import { View, Alert, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import { FAB, TextInput } from "react-native-paper";
import axios from "axios";
import { useRoute, RouteProp } from "@react-navigation/native";

import { useFavorites } from "@/context/FavoritesContext";
import { createMapStyles } from "@/theme/constants";
import { useTheme } from "@/theme/ThemeContext";
import { useLocation } from "@/hooks/useLocation";
import { RootStackParamList } from "@/types/types";
import { generateMapHTML } from "@/utils/mapHtml";

type MapScreenRouteProp = RouteProp<RootStackParamList, "Map">;

export const MapScreen = () => {
  const { colors } = useTheme();
  const styles = createMapStyles(colors);
  const webViewRef = useRef<WebView>(null);
  const [places, setPlaces] = useState<
    { latitude: number; longitude: number; title: string }[]
  >([]);
  const [search, setSearch] = useState("");
  const { latitude, longitude, loading } = useLocation();
  const { addFavorite } = useFavorites();
  const route = useRoute<MapScreenRouteProp>();

  useEffect(() => {
    if (route.params?.latitude && route.params?.longitude) {
      centerOnLocation(route.params.latitude, route.params.longitude);
    }
  }, [route.params?.latitude, route.params?.longitude]);

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
      map.setView([${latitude}, ${longitude}], 13);
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

  const handleMarkerPress = (place: {
    latitude: number;
    longitude: number;
    title: string;
  }) => {
    Alert.alert(
      "Save Location",
      "Would you like to save this location to favorites?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Save",
          onPress: () => {
            addFavorite(place);
            Alert.alert("Success", "Location saved to favorites!");
          },
        },
      ]
    );
  };

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
