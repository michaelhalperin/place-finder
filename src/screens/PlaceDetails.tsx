import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/types';
import { useTheme } from '@/theme/ThemeContext';
import { createPlaceDetailsStyles } from '@/theme/constants';

type Props = NativeStackScreenProps<RootStackParamList, 'PlaceDetails'>;

export const PlaceDetailsScreen: React.FC<Props> = ({ route }) => {
  const { placeData } = route.params;
  const { colors } = useTheme();
  const styles = createPlaceDetailsStyles(colors);

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
