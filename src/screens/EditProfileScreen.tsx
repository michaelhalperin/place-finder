import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";
import { SafeAreaContainer } from "../components/layout/SafeAreaContainer";
import { ContentContainer } from "../components/layout/ContentContainer";
import { Button } from "../components/Button";
import { useTheme } from "@/theme/ThemeContext";
import { createProfileStyles } from "../theme/constants";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateUserSettings, getUserProfile } from "../api/backApi";
import { useUserDataRefresh } from "@/hooks/useUserDataRefresh";

type Props = NativeStackScreenProps<RootStackParamList, "EditProfile">;

export const EditProfileScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const { colors } = useTheme();
  const styles = createProfileStyles(colors);
  const { refreshUserData } = useUserDataRefresh();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) {
        navigation.navigate("Auth");
        return;
      }

      const user = await getUserProfile(userId);
      setName(user.name || "");
      setEmail(user.email || "");
      setImage(user.image || null);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleSave = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const token = await AsyncStorage.getItem("userToken");

      if (!userId || !token) {
        Alert.alert("Error", "Please log in to update your profile");
        navigation.navigate("Auth");
        return;
      }

      const response = await updateUserSettings(userId, {
        name,
        email,
        image,
        action: "updateProfile",
      });

      if (response.status === 200) {
        await refreshUserData();
        navigation.goBack();
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Failed to update profile. Please try again.");
    }
  };

  const pickImage = async (useCamera: boolean) => {
    const permissionResult = useCamera
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Required",
        "Please grant permission to access the " +
          (useCamera ? "camera" : "photo library")
      );
      return;
    }

    const result = await (useCamera
      ? ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.5,
        })
      : ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.5,
        }));

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const showImageOptions = () => {
    Alert.alert("Change Profile Picture", "Choose an option", [
      { text: "Take Photo", onPress: () => pickImage(true) },
      { text: "Choose from Library", onPress: () => pickImage(false) },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  return (
    <SafeAreaContainer>
      <ContentContainer scrollable>
        <View style={styles.header}>
          <Text style={styles.sectionTitle}>Edit Profile</Text>
        </View>

        <TouchableOpacity
          onPress={showImageOptions}
          style={styles.imageContainer}
        >
          <Image
            source={
              image ? { uri: image } : require("../../assets/splash-icon.png")
            }
            style={styles.profileImage}
          />
          <Text style={styles.changePhotoText}>Change Photo</Text>
        </TouchableOpacity>

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
          <Button title="Save Changes" onPress={handleSave} variant="primary" />
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
