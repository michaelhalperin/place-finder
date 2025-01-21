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
import { useTranslation } from "react-i18next";
import { useLanguage } from "../context/LanguageContext";

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
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false);

  const languages = [
    { id: "en", label: t("english") },
    { id: "he", label: t("hebrew") },
  ];

  const styles = createSettingsStyles(colors);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <SettingsSection title={t("preferences")} styles={styles}>
          <SettingsToggle
            title={t("darkMode")}
            description={t("lightAndDark")}
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
                <Text style={styles.settingTitle}>{t("language")}</Text>
                <Text style={styles.settingDescription}>
                  {languages.find((lang) => lang.id === currentLanguage)?.label}
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
                    currentLanguage === language.id && styles.selectedLanguage,
                  ]}
                  onPress={() => {
                    changeLanguage(language.id);
                    setIsLanguageModalVisible(false);
                  }}
                >
                  <Text style={[styles.languageText, { color: colors.text }]}>
                    {language.label}
                  </Text>
                  {currentLanguage === language.id && (
                    <Icon name="check" size={20} style={styles.checkIcon} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>

        <SettingsSection title={t("privacy")} styles={styles}>
          <SettingsToggle
            title={t("pushNotifications")}
            description={t("recieveUpdates")}
            value={isNotificationsEnabled}
            onValueChange={setIsNotificationsEnabled}
            icon="bell-outline"
            colors={colors}
            styles={styles}
          />
          <SettingsToggle
            title={t("locationServices")}
            description={t("enableLocation")}
            value={isLocationEnabled}
            onValueChange={setIsLocationEnabled}
            icon="map-marker-outline"
            colors={colors}
            styles={styles}
          />
        </SettingsSection>

        <SettingsSection title={t("about")} styles={styles}>
          {/* <TouchableOpacity style={styles.linkItem}>
            <View style={styles.settingInfo}>
              <Icon
                name="information-outline"
                size={24}
                style={styles.settingIcon}
              />
              <Text style={styles.settingTitle}>Version 1.0.0</Text>
            </View>
            <Icon name="chevron-right" size={24} style={styles.chevron} />
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.linkItem}>
            <View style={styles.settingInfo}>
              <Icon
                name="file-document-outline"
                size={24}
                style={styles.settingIcon}
              />
              <Text style={styles.settingTitle}>{t("privacy")}</Text>
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
              <Text style={styles.settingTitle}>{t("helpAndSupport")}</Text>
            </View>
            <Icon name="chevron-right" size={24} style={styles.chevron} />
          </TouchableOpacity>
        </SettingsSection>
      </ScrollView>
    </SafeAreaView>
  );
};
