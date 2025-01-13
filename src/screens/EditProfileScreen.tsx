import React, { useState } from "react";
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

type Props = NativeStackScreenProps<RootStackParamList, "EditProfile">;

export const EditProfileScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const { colors } = useTheme();
  const styles = createProfileStyles(colors);

  const handleSave = () => {
    // TODO: Implement save functionality
    navigation.goBack();
  };

  const pickImage = async (useCamera: boolean) => {
    // Request permissions
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

    // Launch camera or image picker
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
      setProfileImage(result.assets[0].uri);
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
              profileImage
                ? { uri: profileImage }
                : require("../../assets/splash-icon.png")
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
