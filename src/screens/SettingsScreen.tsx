import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  ScrollView,
  TouchableOpacity,
  Platform,
  SafeAreaView,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";
import { useTheme as useThemeContext } from "../theme/ThemeContext";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type Props = NativeStackScreenProps<RootStackParamList, "Settings">;

type SettingsSectionProps = {
  title: string;
  children: React.ReactNode;
};

const SettingsSection: React.FC<SettingsSectionProps> = ({
  title,
  children,
}) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionContent}>{children}</View>
  </View>
);

type SettingsToggleProps = {
  title: string;
  description?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  icon?: string;
};

const SettingsToggle: React.FC<SettingsToggleProps> = ({
  title,
  description,
  value,
  onValueChange,
  icon,
}) => (
  <View style={styles.settingItem}>
    <View style={styles.settingInfo}>
      {icon && <Icon name={icon} size={24} style={styles.settingIcon} />}
      <View>
        <Text style={styles.settingTitle}>{title}</Text>
        {description && (
          <Text style={styles.settingDescription}>{description}</Text>
        )}
      </View>
    </View>
    <Switch
      value={value}
      onValueChange={onValueChange}
      ios_backgroundColor="#3e3e3e"
    />
  </View>
);

export const SettingsScreen: React.FC<Props> = () => {
  const { isDarkMode, toggleTheme } = useThemeContext();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isLocationEnabled, setIsLocationEnabled] = useState(true);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  return (
    <SafeAreaView
      style={[styles.safeArea, isDarkMode && styles.darkBackground]}
    >
      <ScrollView
        style={[styles.container, isDarkMode && styles.darkBackground]}
      >
        <SettingsSection title="Appearance">
          <SettingsToggle
            title="Dark Mode"
            description="Switch between light and dark theme"
            value={isDarkMode}
            onValueChange={toggleTheme}
            icon="theme-light-dark"
          />
          <SettingsToggle
            title="High Contrast"
            description="Increase text and UI contrast"
            value={isHighContrast}
            onValueChange={setIsHighContrast}
            icon="contrast-box"
          />
        </SettingsSection>

        <SettingsSection title="Content">
          <SettingsToggle
            title="Auto-play Videos"
            description="Automatically play videos when in view"
            value={isAutoPlay}
            onValueChange={setIsAutoPlay}
            icon="play-circle-outline"
          />
          <SettingsToggle
            title="Offline Mode"
            description="Download content for offline access"
            value={isOfflineMode}
            onValueChange={setIsOfflineMode}
            icon="cloud-download-outline"
          />
        </SettingsSection>

        <SettingsSection title="Privacy">
          <SettingsToggle
            title="Push Notifications"
            description="Receive updates and recommendations"
            value={isNotificationsEnabled}
            onValueChange={setIsNotificationsEnabled}
            icon="bell-outline"
          />
          <SettingsToggle
            title="Location Services"
            description="Enable location-based features"
            value={isLocationEnabled}
            onValueChange={setIsLocationEnabled}
            icon="map-marker-outline"
          />
        </SettingsSection>

        <SettingsSection title="About">
          <TouchableOpacity style={styles.linkItem}>
            <View style={styles.settingInfo}>
              <Icon
                name="information-outline"
                size={24}
                style={styles.settingIcon}
              />
              <Text style={styles.settingTitle}>Version 1.0.0</Text>
            </View>
            <Icon name="chevron-right" size={24} style={styles.chevron} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkItem}>
            <View style={styles.settingInfo}>
              <Icon
                name="file-document-outline"
                size={24}
                style={styles.settingIcon}
              />
              <Text style={styles.settingTitle}>Privacy Policy</Text>
            </View>
            <Icon name="chevron-right" size={24} style={styles.chevron} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkItem}>
            <View style={styles.settingInfo}>
              <Icon
                name="help-circle-outline"
                size={24}
                style={styles.settingIcon}
              />
              <Text style={styles.settingTitle}>Help & Support</Text>
            </View>
            <Icon name="chevron-right" size={24} style={styles.chevron} />
          </TouchableOpacity>
        </SettingsSection>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    paddingTop: 20,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    textTransform: "uppercase",
    marginBottom: 8,
    marginTop: 16,
  },
  sectionContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  settingInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingIcon: {
    marginRight: 12,
    color: "#666",
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  settingDescription: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
  linkItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  chevron: {
    color: "#666",
  },
  darkBackground: {
    backgroundColor: "#1a1a1a",
  },
  darkText: {
    color: "#fff",
  },
});
