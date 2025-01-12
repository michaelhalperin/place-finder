import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from '../components/Button';
import { theme } from '../theme';
import { RootStackParamList } from '../types/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: theme.spacing.lg,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: theme.spacing.xxl * 3.2,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: theme.spacing.xl,
  },
  title: {
    ...theme.typography.h1,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
    color: '#fff',
  },
  subtitle: {
    ...theme.typography.body,
    textAlign: 'center',
    color: '#fff',
    opacity: 0.8,
  },
  buttonContainer: {
    paddingBottom: theme.spacing.xl,
  },
});
