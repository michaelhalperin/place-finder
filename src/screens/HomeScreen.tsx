import React from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { PlaceCard } from "../components/PlaceCard";
import { theme } from "../theme";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";
import { mockPlaces } from "../utils/MockPlaces";
import { getRecommendations } from "../utils/recommendations";

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

export const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<HomeScreenRouteProp>();
  const userAnswers = route.params?.userAnswers;

  // Get recommended places based on user answers
  const recommendedPlaces = userAnswers 
    ? getRecommendations(userAnswers, mockPlaces).recommendations
    : mockPlaces;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Recommended Places</Text>
      </View>
      <FlatList
        data={recommendedPlaces}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
  },
  headerTitle: {
    ...theme.typography.h2,
    color: "white",
  },
  listContent: {
    padding: theme.spacing.md,
  },
});
