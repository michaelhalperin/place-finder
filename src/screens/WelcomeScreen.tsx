import React from 'react';
import { View, Text, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from '../components/Button';
import { useTheme } from "@/theme/ThemeContext";
import { createWelcomeStyles } from "@/theme/constants";
import { RootStackParamList } from '../types/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = createWelcomeStyles(colors);
  
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/background.jpeg')}
        style={styles.backgroundImage}
      />
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>
            Welcome to PlaceFinder
          </Text>
          <Text style={styles.subtitle}>
            Discover amazing places tailored just for you
          </Text>
        </View>
        
        <View style={styles.buttonContainer}>
          <Button
            title="Get Started"
            onPress={() => navigation.navigate('Home', {})}
            variant="primary"
            size="large"
          />
        </View>
      </View>
    </View>
  );
};
