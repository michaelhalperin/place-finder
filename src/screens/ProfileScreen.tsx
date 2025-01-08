import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Button } from "../components/Button";
import { theme } from "../theme";
import { getPersonalizedDescription } from "@/utils/recommendations";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, UserSettings } from "../types/types";
import { Chip } from "../components/Chip";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

export const ProfileScreen: React.FC<Props> = ({ route }) => {
  const userAnswers = route.params?.userAnswers as UserSettings;
  const personalizedDescription = getPersonalizedDescription(userAnswers);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>JD</Text>
        </View>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.email}>john.doe@example.com</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About You</Text>
        <View style={styles.chipContainer}>
          {personalizedDescription.interests.map((interest) => (
            <Chip key={interest} label={interest} />
          ))}
          {personalizedDescription.specifics.map((specific) => (
            <Chip key={specific} label={specific} />
          ))}
        </View>
        <Text style={styles.description}>{personalizedDescription.text}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.preferenceItem}>
          <Text>Food Types</Text>
          <Text style={styles.preferenceValue}>Italian, Japanese</Text>
        </View>
        <View style={styles.preferenceItem}>
          <Text>Activities</Text>
          <Text style={styles.preferenceValue}>Outdoor, Cultural</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Saved Places</Text>
        {/* Add saved places list here */}
      </View>

      <Button
        title="Edit Profile"
        onPress={() => {}}
        variant="secondary"
        style={styles.button}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    alignItems: "center",
    padding: theme.spacing.xl,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.md,
  },
  avatarText: {
    color: "white",
    fontSize: 36,
    fontWeight: "bold",
  },
  name: {
    ...theme.typography.h2,
    marginBottom: theme.spacing.xs,
  },
  email: {
    ...theme.typography.body,
    color: theme.colors.text,
    opacity: 0.8,
  },
  section: {
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  sectionTitle: {
    ...theme.typography.h2,
    marginBottom: theme.spacing.md,
  },
  preferenceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: theme.spacing.sm,
  },
  preferenceValue: {
    color: theme.colors.primary,
  },
  button: {
    margin: theme.spacing.lg,
  },
  description: {
    ...theme.typography.body,
    color: theme.colors.text,
    lineHeight: 24,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: theme.spacing.sm,
  },
});