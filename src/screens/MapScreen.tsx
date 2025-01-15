import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Alert,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { FAB, TextInput } from "react-native-paper";
import axios from "axios";
import { useRoute, RouteProp } from "@react-navigation/native";

import { useFavorites } from "@/context/FavoritesContext";
import { createMapStyles } from "@/theme/constants";
import { useTheme } from "@/theme/ThemeContext";
import { useLocation } from "@/hooks/useLocation";
import { useLocationContext } from "@/context/LocationContext";
import { RootStackParamList } from "@/types/types";

type MapScreenRouteProp = RouteProp<RootStackParamList, "Map">;

export const MapScreen = () => {
  const { colors } = useTheme();
  const styles = createMapStyles(colors);
  const { setIsLocationEnabled } = useLocationContext();
  const { latitude, longitude, loading, error } = useLocation();
  const [places, setPlaces] = useState<
    { latitude: number; longitude: number; title: string }[]
  >([]);
  const [search, setSearch] = useState("");
  const mapRef = useRef<MapView>(null);
  const { addFavorite } = useFavorites();
  const route = useRoute<MapScreenRouteProp>();

  useEffect(() => {
    if (route.params?.latitude && route.params?.longitude) {
      mapRef.current?.animateToRegion(
        {
          latitude: route.params.latitude,
          longitude: route.params.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000
      );
    }
  }, [route.params?.latitude, route.params?.longitude]);

  const addPlace = (latitude: number, longitude: number, title: string) => {
    setPlaces((prev) => [...prev, { latitude, longitude, title }]);
  };

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
        const region = {
          latitude: parseFloat(firstPlace.lat),
          longitude: parseFloat(firstPlace.lon),
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };

        addPlace(
          parseFloat(firstPlace.lat),
          parseFloat(firstPlace.lon),
          firstPlace.display_name
        );

        mapRef.current?.animateToRegion(region, 1000);
        setSearch("");
      }
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  const centerOnUser = () => {
    if (!latitude || !longitude) return;
    const region = {
      latitude,
      longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
    mapRef.current?.animateToRegion(region, 1000);
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
        {
          text: "Cancel",
          style: "cancel",
        },
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
        <Text style={[styles.errorText, { marginBottom: 16 }]}>{error}</Text>
        <TouchableOpacity
          onPress={handleEnableLocation}
          style={styles.enableButton}
        >
          <Text style={styles.enableButtonText}>Enable Location Services</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!loading && latitude && longitude ? (
        <>
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
              latitude: route.params?.latitude || latitude,
              longitude: route.params?.longitude || longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude,
                longitude,
              }}
              title="My Location"
              pinColor="blue"
            />

            {places.map((place, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: place.latitude,
                  longitude: place.longitude,
                }}
                title={place.title}
                onPress={() => handleMarkerPress(place)}
              />
            ))}
          </MapView>
          <FAB
            style={styles.fab}
            icon="crosshairs-gps"
            onPress={centerOnUser}
          />
          <TextInput
            style={[styles.searchBar, { color: colors.text }]}
            placeholder="Search for places"
            placeholderTextColor={colors.textSecondary}
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={handleSearch}
            selectionColor={colors.primary}
          />
        </>
      ) : (
        <View style={styles.indicator}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}
    </View>
  );
};

export default MapScreen;
