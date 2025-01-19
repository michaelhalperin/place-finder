import React, { useState } from "react";
import {
  View,
  Text,
  Switch,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Modal,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";
import { useTheme } from "../theme/ThemeContext";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useLocationContext } from "../context/LocationContext";
import { createSettingsStyles } from "@/theme/constants";

type Props = NativeStackScreenProps<RootStackParamList, "Settings">;

type SettingsSectionProps = {
  title: string;
  children: React.ReactNode;
  styles: any;
};

const SettingsSection: React.FC<SettingsSectionProps> = ({
  title,
  children,
  styles,
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
  colors: any;
  styles: any;
};

const SettingsToggle: React.FC<SettingsToggleProps> = ({
  title,
  description,
  value,
  onValueChange,
  icon,
  colors,
  styles,
}) => (
  <View style={styles.settingItem}>
    <View style={styles.settingInfo}>
      {icon && <Icon name={icon} size={24} style={styles.settingIcon} />}
      <View style={styles.textContainer}>
        <Text style={styles.settingTitle}>{title}</Text>
        {description && (
          <Text style={styles.settingDescription}>{description}</Text>
        )}
      </View>
    </View>
    <Switch
      value={value}
      onValueChange={onValueChange}
      ios_backgroundColor={colors.border}
    />
  </View>
);

export const SettingsScreen: React.FC<Props> = () => {
  const { isDarkMode, toggleTheme, colors } = useTheme();
  const { isLocationEnabled, setIsLocationEnabled } = useLocationContext();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false);

  const languages = [
    { id: "english", label: "English" },
    { id: "hebrew", label: "Hebrew" },
  ];

  const styles = createSettingsStyles(colors);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <SettingsSection title="Appearance" styles={styles}>
          <SettingsToggle
            title="Dark Mode"
            description="Switch between light and dark theme"
            value={isDarkMode}
            onValueChange={toggleTheme}
            icon="theme-light-dark"
            colors={colors}
            styles={styles}
          />
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => setIsLanguageModalVisible(true)}
          >
            <View style={styles.settingInfo}>
              <Icon name="translate" size={24} style={styles.settingIcon} />
              <View style={styles.textContainer}>
                <Text style={styles.settingTitle}>Language</Text>
                <Text style={styles.settingDescription}>
                  {
                    languages.find((lang) => lang.id === selectedLanguage)
                      ?.label
                  }
                </Text>
              </View>
            </View>
            <Icon name="chevron-right" size={24} style={styles.chevron} />
          </TouchableOpacity>
        </SettingsSection>

        <Modal
          visible={isLanguageModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setIsLanguageModalVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setIsLanguageModalVisible(false)}
          >
            <View
              style={[
                styles.modalContent,
                { backgroundColor: colors.background },
              ]}
            >
              {languages.map((language) => (
                <TouchableOpacity
                  key={language.id}
                  style={[
                    styles.languageOption,
                    selectedLanguage === language.id && styles.selectedLanguage,
                  ]}
                  onPress={() => {
                    setSelectedLanguage(language.id);
                    setIsLanguageModalVisible(false);
                  }}
                >
                  <Text style={[styles.languageText, { color: colors.text }]}>
                    {language.label}
                  </Text>
                  {selectedLanguage === language.id && (
                    <Icon name="check" size={20} style={styles.checkIcon} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>

        <SettingsSection title="Privacy" styles={styles}>
          <SettingsToggle
            title="Push Notifications"
            description="Receive updates and recommendations"
            value={isNotificationsEnabled}
            onValueChange={setIsNotificationsEnabled}
            icon="bell-outline"
            colors={colors}
            styles={styles}
          />
          <SettingsToggle
            title="Location Services"
            description="Enable location-based features"
            value={isLocationEnabled}
            onValueChange={setIsLocationEnabled}
            icon="map-marker-outline"
            colors={colors}
            styles={styles}
          />
        </SettingsSection>

        <SettingsSection title="About" styles={styles}>
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
