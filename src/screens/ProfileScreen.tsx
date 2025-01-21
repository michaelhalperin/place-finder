import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Alert,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import { Button } from "../components/Button";
import { Chip } from "../components/Chip";
import { SafeAreaContainer } from "../components/layout/SafeAreaContainer";
import { ContentContainer } from "../components/layout/ContentContainer";
import { ProfileAvatar } from "../components/layout/ProfileAvatar";
import { ProfileSection } from "../components/layout/ProfileSection";

import { theme } from "@/theme";
import { useTheme } from "@/theme/ThemeContext";
import { createProfileStyles } from "../theme/constants";
import { RootStackParamList, User } from "../types/types";
// import { getPersonalizedDescription } from "@/utils/recommendations";
import {
  logoutUser,
  deleteSavedPlace,
  getUserProfile,
  updateUserSettings,
} from "@/api/backApi";
import { FoodTypes, Activities } from "@/utils/preferences";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

export const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const [userData, setUserData] = useState<User | null>(null);
  const { colors } = useTheme();
  const styles = createProfileStyles(colors);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<"foodTypes" | "activities">(
    "foodTypes"
  );
  const [modalMode, setModalMode] = useState<"edit" | "view">("edit");
  const [tempSelections, setTempSelections] = useState<string[]>([]);

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

  const handleUpdatePreferences = async (
    type: "foodTypes" | "activities",
    value: string[]
  ) => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId || !userData) return;

      const updatedPreferences = {
        ...userData.preferences,
        [type]: value,
      };

      await updateUserSettings(userId, {
        action: "updatePreferences",
        preferences: updatedPreferences,
      });
      setUserData({
        ...userData,
        preferences: updatedPreferences,
      });
    } catch (error) {
      console.error("Error updating preferences:", error);
      Alert.alert("Error", "Failed to update preferences");
    }
  };

  const openPreferenceModal = (
    type: "foodTypes" | "activities",
    mode: "edit" | "view" = "edit"
  ) => {
    setModalType(type);
    setModalMode(mode);
    setTempSelections(userData?.preferences?.[type] || []);
    setModalVisible(true);
  };

  const handleSavePreferences = async () => {
    await handleUpdatePreferences(modalType, tempSelections);
    setModalVisible(false);
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
          {/* <Text style={styles.description}>
            {getPersonalizedDescription(userData?.preferences || {}).text}
          </Text>
          {getPersonalizedDescription(userData?.preferences || {})
            .needsQuestionnaire && (
            )} */}
          <Button
            title="Start Quick Quiz"
            onPress={() => navigation.navigate("Questionnaire")}
            variant="secondary"
          />
        </ProfileSection>

        <ProfileSection styles={styles.sectionTitle} title="Preferences">
          <View style={styles.preferenceItem}>
            <View style={styles.preferenceHeader}>
              <Text style={styles.preferenceLabel}>Food Types</Text>
            </View>
            <View style={styles.preferencesRow}>
              {userData?.preferences?.foodTypes && (
                <View style={styles.preferencesContent}>
                  {userData.preferences.foodTypes.length > 2 ? (
                    <TouchableOpacity
                      style={styles.chipSpacing}
                      onPress={() => openPreferenceModal("foodTypes", "view")}
                    >
                      <Chip
                        label={`View all (${userData.preferences.foodTypes.length})`}
                      />
                    </TouchableOpacity>
                  ) : (
                    <View style={[styles.chipContainer, styles.chipSpacing]}>
                      {userData.preferences.foodTypes.map((type) => (
                        <Chip key={type} label={type} />
                      ))}
                    </View>
                  )}
                </View>
              )}
              <TouchableOpacity
                onPress={() => openPreferenceModal("foodTypes")}
              >
                <Ionicons
                  name="add-circle-outline"
                  size={24}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.preferenceItem}>
            <View style={styles.preferenceHeader}>
              <Text style={styles.preferenceLabel}>Activities</Text>
            </View>
            <View style={styles.preferencesRow}>
              {userData?.preferences?.activities && (
                <View style={styles.preferencesContent}>
                  {userData.preferences.activities.length > 2 ? (
                    <TouchableOpacity
                      style={styles.chipSpacing}
                      onPress={() => openPreferenceModal("activities", "view")}
                    >
                      <Chip
                        label={`View all (${userData.preferences.activities.length})`}
                      />
                    </TouchableOpacity>
                  ) : (
                    <View style={[styles.chipContainer, styles.chipSpacing]}>
                      {userData.preferences.activities.map((activity) => (
                        <Chip key={activity} label={activity} />
                      ))}
                    </View>
                  )}
                </View>
              )}
              <TouchableOpacity
                onPress={() => openPreferenceModal("activities")}
              >
                <Ionicons
                  name="add-circle-outline"
                  size={24}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </View>
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

        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  {modalMode === "view" ? "Selected" : "Select"}{" "}
                  {modalType === "foodTypes" ? "Food Types" : "Activities"}
                </Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Ionicons name="close" size={24} color={colors.text} />
                </TouchableOpacity>
              </View>
              <ScrollView>
                {(modalMode === "view"
                  ? userData?.preferences?.[modalType] || []
                  : Object.values(
                      modalType === "foodTypes" ? FoodTypes : Activities
                    )
                ).map((item) => (
                  <TouchableOpacity
                    key={item}
                    style={styles.modalItem}
                    onPress={
                      modalMode === "edit"
                        ? () => {
                            setTempSelections((current) =>
                              current.includes(item)
                                ? current.filter((type) => type !== item)
                                : [...current, item]
                            );
                          }
                        : undefined
                    }
                  >
                    <Text style={styles.modalItemText}>{item}</Text>
                    {(modalMode === "edit"
                      ? tempSelections
                      : userData?.preferences?.[modalType]
                    )?.includes(item) && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>
              {modalMode === "edit" && (
                <Button
                  title="Save"
                  onPress={handleSavePreferences}
                  variant="primary"
                />
              )}
            </View>
          </View>
        </Modal>
      </ContentContainer>
    </SafeAreaContainer>
  );
};
