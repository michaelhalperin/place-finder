import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
  ActionSheetIOS,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";
import { useTheme } from "@/theme/ThemeContext";
import { createPlaceDetailsStyles } from "@/theme/constants";

type Props = NativeStackScreenProps<RootStackParamList, "PlaceDetails">;

export const PlaceDetailsScreen: React.FC<Props> = ({ route }) => {
  const { placeData } = route.params;
  const { colors } = useTheme();
  const styles = createPlaceDetailsStyles(colors);

  const openWaze = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    Linking.openURL(`waze://?q=${encodedAddress}&navigate=yes`).catch(() => {
      Alert.alert("Error", "Couldn't open Waze. Make sure it's installed.", [
        { text: "OK" },
      ]);
    });
  };

  const openGoogleMaps = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    const url = Platform.select({
      ios: `comgooglemaps://?daddr=${encodedAddress}&nav=1`,
      android: `google.navigation:q=${encodedAddress}`,
    });

    Linking.openURL(url!).catch(() => {
      // Fallback to web URL if app isn't installed
      Linking.openURL(
        `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`
      );
    });
  };

  const openAppleMaps = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    Linking.openURL(`maps://app?daddr=${encodedAddress}`).catch(() => {
      Alert.alert("Error", "Couldn't open Maps", [{ text: "OK" }]);
    });
  };

  const openMaps = async (address: string) => {
    if (Platform.OS === "ios") {
      const hasWaze = await Linking.canOpenURL("waze://");

      const options = ["Cancel"];
      const actions: (() => void)[] = [null as any];

      if (hasWaze) {
        options.push("Waze");
        actions.push(() => openWaze(address));
      }

      // Always add Google Maps option
      options.push("Google Maps");
      actions.push(() => openGoogleMaps(address));

      options.push("Apple Maps");
      actions.push(() => openAppleMaps(address));

      ActionSheetIOS.showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          const action = actions[buttonIndex];
          if (action) action();
        }
      );
    } else {
      // For Android
      const hasWaze = await Linking.canOpenURL("waze://");
      const options = [
        { text: "Google Maps", onPress: () => openGoogleMaps(address) },
      ];

      if (hasWaze) {
        options.unshift({ text: "Waze", onPress: () => openWaze(address) });
      }

      Alert.alert(
        "Choose Navigation App",
        "Select your preferred navigation app",
        [...options, { text: "Cancel", style: "cancel" }]
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: placeData.image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.name}>{placeData.name}</Text>

        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>⭐ {placeData.rating}</Text>
          <Text style={styles.distance}>{placeData.distance}</Text>
        </View>

        <TouchableOpacity onPress={() => openMaps(placeData.address)}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Address</Text>
            <Text style={styles.sectionText}>{placeData.address}</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Opening Hours</Text>
          <Text style={styles.sectionText}>{placeData.openingHours}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.sectionText}>{placeData.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.featuresList}>
            {placeData.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <View style={styles.featureDot} />
                <Text style={styles.feature}>{feature}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
