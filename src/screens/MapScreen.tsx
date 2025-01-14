import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { FAB, TextInput, Card } from "react-native-paper";
import axios from "axios";

import { theme } from "@/theme";
import { useFavorites } from "@/context/FavoritesContext";

export const MapScreen = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [places, setPlaces] = useState<
    { latitude: number; longitude: number; title: string }[]
  >([]);
  const [search, setSearch] = useState("");
  const mapRef = React.useRef<MapView>(null);
  const { addFavorite } = useFavorites();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Please grant location permissions to use the map."
        );
        return;
      }
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    })();
  }, []);

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
    if (!location) return;
    const region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
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

  return (
    <View style={styles.container}>
      {location ? (
        <>
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            // onPress={(e) =>
            //   addPlace(
            //     e.nativeEvent.coordinate.latitude,
            //     e.nativeEvent.coordinate.longitude,
            //     "New Marker"
            //   )
            // }
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
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
            style={styles.searchBar}
            placeholder="Search for places"
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={handleSearch}
          />
        </>
      ) : (
        <Card style={styles.card}>
          <Card.Title title="Loading Location" />
          <Card.Content>
            <Text>Fetching your location, please wait...</Text>
          </Card.Content>
        </Card>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#6200ee",
  },
  searchBar: {
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
    backgroundColor: "white",
    borderRadius: 5,
    marginTop: theme.spacing.xxl,
  },
  card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing.xxl,
  },
});

export default MapScreen;
