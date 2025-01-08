import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { theme } from '../theme';
import { RootStackParamList } from '../types/types';

type Props = NativeStackScreenProps<RootStackParamList, 'PlaceDetails'>;

export const PlaceDetailsScreen: React.FC<Props> = ({ route }) => {
  const { placeData } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: placeData.image }}
        style={styles.image}
      />
      
      <View style={styles.content}>
        <Text style={styles.name}>{placeData.name}</Text>
        
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>★ {placeData.rating}</Text>
          <Text style={styles.distance}>{placeData.distance}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Address</Text>
          <Text style={styles.sectionText}>{placeData.address}</Text>
        </View>

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
          {placeData.features.map((feature, index) => (
            <Text key={index} style={styles.feature}>• {feature}</Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  image: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: theme.spacing.lg,
  },
  name: {
    ...theme.typography.h1,
    marginBottom: theme.spacing.sm,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFB800',
    marginRight: theme.spacing.md,
  },
  distance: {
    fontSize: 16,
    color: theme.colors.text,
    opacity: 0.7,
  },
  section: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.h2,
    marginBottom: theme.spacing.sm,
  },
  sectionText: {
    ...theme.typography.body,
    lineHeight: 24,
  },
  feature: {
    ...theme.typography.body,
    marginBottom: theme.spacing.xs,
  },
});
