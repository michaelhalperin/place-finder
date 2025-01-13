import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/types';
import { SafeAreaContainer } from '../components/layout/SafeAreaContainer';
import { ContentContainer } from '../components/layout/ContentContainer';
import { Button } from '../components/Button';
import { useTheme } from '@/theme/ThemeContext';
import { createProfileStyles } from '../theme/constants';

type Props = NativeStackScreenProps<RootStackParamList, 'EditProfile'>;

export const EditProfileScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const { colors } = useTheme();
  const styles = createProfileStyles(colors);

  const handleSave = () => {
    // TODO: Implement save functionality
    navigation.goBack();
  };

  return (
    <SafeAreaContainer>
      <ContentContainer scrollable>
        <View style={styles.header}>
          <Text style={styles.sectionTitle}>Edit Profile</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Save Changes"
            onPress={handleSave}
            variant="primary"
          />
          <Button
            title="Cancel"
            onPress={() => navigation.goBack()}
            variant="secondary"
          />
        </View>
      </ContentContainer>
    </SafeAreaContainer>
  );
}; 