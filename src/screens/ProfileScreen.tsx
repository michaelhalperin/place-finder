import React from "react";
import { View, Text, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, UserSettings } from "../types/types";
import { Button } from "../components/Button";
import { Chip } from "../components/Chip";
import { getPersonalizedDescription } from "@/utils/recommendations";
import { SafeAreaContainer } from "../components/layout/SafeAreaContainer";
import { ContentContainer } from "../components/layout/ContentContainer";
import { ProfileAvatar } from "../components/layout/ProfileAvatar";
import { ProfileSection } from "../components/layout/ProfileSection";
import { createProfileStyles } from "../theme/constants";
import { theme } from "@/theme";
import { useTheme } from "@/theme/ThemeContext";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

export const ProfileScreen: React.FC<Props> = ({ route, navigation }) => {
  const userAnswers = route.params?.userAnswers as UserSettings;
  const personalizedDescription = getPersonalizedDescription(userAnswers);
  const { colors } = useTheme();
  const styles = createProfileStyles(colors);

  return (
    <SafeAreaContainer>
      <ContentContainer scrollable>
        <View style={styles.header}>
          <ProfileAvatar styles={styles} initials="JD" />
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.email}>john.doe@example.com</Text>
        </View>

        <ProfileSection styles={styles.sectionTitle} title="About You">
          <View style={styles.chipContainer}>
            {personalizedDescription.interests.map((interest) => (
              <Chip key={interest} label={interest} />
            ))}
          </View>
          <Text style={styles.description}>{personalizedDescription.text}</Text>
          {personalizedDescription.needsQuestionnaire && (
            <Button
              title="Start Quick Quiz"
              onPress={() => navigation.navigate("Questionnaire")}
              variant="secondary"
            />
          )}
        </ProfileSection>

        <ProfileSection styles={styles.sectionTitle} title="Preferences">
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceLabel}>Food Types</Text>
            <Text style={styles.preferenceValue}>Italian, Japanese</Text>
          </View>
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceLabel}>Activities</Text>
            <Text style={styles.preferenceValue}>Outdoor, Cultural</Text>
          </View>
        </ProfileSection>

        <ProfileSection styles={styles.sectionTitle} title="Saved Places">
          <Text style={styles.description}>no saved places yet</Text>
          {/* Add saved places list here */}
        </ProfileSection>

        <Button
          title="Edit Profile"
          onPress={() => navigation.navigate('EditProfile')}
          variant="secondary"
          style={{ margin: theme.spacing.lg }}
        />
      </ContentContainer>
    </SafeAreaContainer>
  );
};
