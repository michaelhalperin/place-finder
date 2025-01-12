import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Button } from '../components/Button';
import { useTheme } from "@/theme/ThemeContext";
import { createAuthStyles } from "@/theme/constants";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Auth'>;

export const AuthScreen: React.FC<Props> = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = createAuthStyles(colors);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Add authentication logic here
    navigation.navigate('Home', {});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title="Sign In"
        onPress={handleLogin}
        variant="primary"
        style={styles.button}
      />
      <Text style={styles.link} onPress={() => {}}>
        Don't have an account? Sign up
      </Text>
    </View>
  );
};
