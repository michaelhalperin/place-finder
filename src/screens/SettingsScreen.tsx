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
import { createSettingsStyles } from "../theme/constants";
import { useTheme } from "../theme/ThemeContext";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type Props = NativeStackScreenProps<RootStackParamList, "Settings">;

type SettingsSectionProps = {
  title: string;
  children: React.ReactNode;
};

const SettingsSection: React.FC<SettingsSectionProps> = ({
  title,
  children,
}) => {
  const { colors } = useTheme();
  const styles = createSettingsStyles(colors);
  
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContent}>{children}</View>
    </View>
  );
};

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
}) => {
  const { colors } = useTheme();
  const styles = createSettingsStyles(colors);
  
  return (
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
};

export const SettingsScreen: React.FC<Props> = () => {
  const { isDarkMode, toggleTheme, colors } = useTheme();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isLocationEnabled, setIsLocationEnabled] = useState(true);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const styles = createSettingsStyles(colors);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
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
