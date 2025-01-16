import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, UserSettings, User } from "../types/types";
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
import { useFavorites } from "@/context/FavoritesContext";
import { getUserProfile } from "@/api/backApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

const formatPlaceName = (fullAddress: string) => {
  // Split the address by commas and get first two parts (typically name and town)
  const parts = fullAddress.split(",").map((part) => part.trim());
  if (parts.length >= 2) {
    return {
      name: parts[0],
      town: parts[2],
    };
  }
  // Fallback if address format is different
  return {
    name: parts[0],
    town: "",
  };
};

const userToSettings = (user: User | null): UserSettings => {
  if (!user) return {};
  return {
    name: user.name,
    email: user.email,
    ...user.preferences,
  };
};

export const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const [userData, setUserData] = useState<User | null>(null);
  const { colors } = useTheme();
  const styles = createProfileStyles(colors);
  const { favorites } = useFavorites();

  // useEffect(() => {
  //   fetchUserData();
  // }, []);

  const fetchUserData = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) {
        navigation.navigate("Auth");
        return;
      }

      const user = await getUserProfile(userId);
      setUserData(user);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <SafeAreaContainer>
      <ContentContainer scrollable>
        <View style={styles.header}>
          <ProfileAvatar
            styles={styles}
            initials={
              userData?.name
                ? userData.name.substring(0, 2).toUpperCase()
                : "??"
            }
          />
          <Text style={styles.name}>{userData?.name || "User"}</Text>
          <Text style={styles.email}>
            {userData?.email || "No email provided"}
          </Text>
        </View>

        <ProfileSection styles={styles.sectionTitle} title="About You">
          <View style={styles.chipContainer}>
            {getPersonalizedDescription(userToSettings(userData)).interests.map(
              (interest) => (
                <Chip key={interest} label={interest} />
              )
            )}
          </View>
          <Text style={styles.description}>
            {getPersonalizedDescription(userToSettings(userData)).text}
          </Text>
          {getPersonalizedDescription(userToSettings(userData))
            .needsQuestionnaire && (
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
          {favorites.length > 0 ? (
            <View style={styles.chipContainer}>
              {favorites.map(
                (
                  place: { title: string; latitude: any; longitude: any },
                  index: React.Key | null | undefined
                ) => {
                  const { name, town } = formatPlaceName(place.title);
                  return (
                    <Chip
                      key={index}
                      label={`${name}${town ? ` • ${town}` : ""}`}
                      onPress={() => {
                        navigation.navigate("Map", {
                          latitude: place.latitude,
                          longitude: place.longitude,
                        });
                      }}
                    />
                  );
                }
              )}
            </View>
          ) : (
            <Text style={styles.description}>No saved places yet</Text>
          )}
        </ProfileSection>

        <Button
          title="Edit Profile"
          onPress={() => navigation.navigate("EditProfile")}
          variant="secondary"
          style={{ margin: theme.spacing.lg }}
        />
      </ContentContainer>
    </SafeAreaContainer>
  );
};
