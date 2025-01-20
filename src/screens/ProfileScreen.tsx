import React, { useState, useCallback } from "react";
import { View, Text, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, User } from "../types/types";
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
import { logoutUser, deleteSavedPlace } from "@/api/backApi";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserProfile } from "@/api/backApi";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

const formatPlaceName = (fullAddress: string) => {
  const parts = fullAddress.split(",").map((part) => part.trim());
  if (parts.length >= 2) {
    return {
      name: parts[0],
      town: parts[2],
    };
  }
  return {
    name: parts[0],
    town: "",
  };
};

export const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const [userData, setUserData] = useState<User | null>(null);
  const { colors } = useTheme();
  const styles = createProfileStyles(colors);

  const fetchUserData = useCallback(async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (userId) {
        const user = await getUserProfile(userId);
        setUserData(user);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, []);

  const handleDeletePlace = async (placeId: string) => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) return;

      const updatedUserData = await deleteSavedPlace(userId, placeId);
      setUserData(updatedUserData);
    } catch (error) {
      console.error("Error deleting place:", error);
      Alert.alert("Error", "Failed to delete place");
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, [fetchUserData])
  );

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
            image={userData?.image}
          />
          <Text style={styles.name}>{userData?.name || "User"}</Text>
          <Text style={styles.email}>
            {userData?.email || "No email provided"}
          </Text>
        </View>

        <ProfileSection styles={styles.sectionTitle} title="About You">
          <View style={styles.chipContainer}>
            {getPersonalizedDescription(
              userData?.preferences || {}
            ).interests.map((interest) => (
              <Chip key={interest} label={interest} />
            ))}
          </View>
          <Text style={styles.description}>
            {getPersonalizedDescription(userData?.preferences || {}).text}
          </Text>
          {getPersonalizedDescription(userData?.preferences || {})
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
          {(userData?.settings?.savedPlaces?.length ?? 0) > 0 ? (
            <View style={styles.chipContainer}>
              {userData?.settings?.savedPlaces?.map(
                (place: {
                  title: string;
                  latitude: number;
                  longitude: number;
                  _id: string;
                }) => {
                  const { name, town } = formatPlaceName(place.title);
                  return (
                    <Chip
                      key={place._id}
                      label={`${name}${town ? ` • ${town}` : ""}`}
                      onPress={() => {
                        navigation.navigate("Map", {
                          latitude: place.latitude,
                          longitude: place.longitude,
                        });
                      }}
                      onDelete={() => handleDeletePlace(place._id)}
                    />
                  );
                }
              )}
            </View>
          ) : (
            <Text style={styles.description}>No saved places yet</Text>
          )}
        </ProfileSection>

        <ProfileSection styles={styles.sectionTitle} title="Friends">
          {userData?.settings?.friends &&
          userData.settings.friends.length > 0 ? (
            <View style={styles.chipContainer}>
              {userData.settings.friends.map((friend) => (
                <Chip key={friend.id} label={friend.name} />
              ))}
            </View>
          ) : (
            <Text style={styles.description}>No friends added yet</Text>
          )}
        </ProfileSection>

        <Button
          title="Edit Profile"
          onPress={() => navigation.navigate("EditProfile")}
          variant="secondary"
          style={{ margin: theme.spacing.lg }}
        />
        <Button
          title="Logout"
          onPress={() => {
            Alert.alert("Confirm Logout", "Are you sure you want to logout?", [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "Logout",
                style: "destructive",
                onPress: async () => {
                  await logoutUser();
                  navigation.reset({
                    index: 0,
                    routes: [{ name: "Home" }],
                  });
                },
              },
            ]);
          }}
          variant="danger"
          style={{ margin: theme.spacing.lg }}
        />
      </ContentContainer>
    </SafeAreaContainer>
  );
};
