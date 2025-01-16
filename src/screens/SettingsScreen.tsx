import React, { useState } from "react";
import {
  View,
  Text,
  Switch,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";
import { useTheme } from "../theme/ThemeContext";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useLocationContext } from "../context/LocationContext";
import { createSettingsStyles } from "@/theme/constants";
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';

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

type SettingsSelectProps = {
  title: string;
  description?: string;
  value: string;
  onPress: () => void;
  icon?: string;
  styles: any;
};

const SettingsSelect: React.FC<SettingsSelectProps> = ({
  title,
  description,
  value,
  onPress,
  icon,
  styles,
}) => (
  <TouchableOpacity style={styles.linkItem} onPress={onPress}>
    <View style={styles.settingInfo}>
      {icon && <Icon name={icon} size={24} style={styles.settingIcon} />}
      <View style={styles.textContainer}>
        <Text style={styles.settingTitle}>{title}</Text>
        {description && (
          <Text style={styles.settingDescription}>{description}</Text>
        )}
      </View>
    </View>
    <View style={styles.valueContainer}>
      <Text style={styles.valueText}>{value}</Text>
      <Icon name="chevron-right" size={24} style={styles.chevron} />
    </View>
  </TouchableOpacity>
);

export const SettingsScreen: React.FC<Props> = () => {
  const { isDarkMode, toggleTheme, colors } = useTheme();
  const { isLocationEnabled, setIsLocationEnabled } = useLocationContext();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();

  const styles = createSettingsStyles(colors);

  const toggleLanguage = async () => {
    const newLang = language === 'en' ? 'he' : 'en';
    await setLanguage(newLang);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <SettingsSection title={t('settings.appearance')} styles={styles}>
          <SettingsToggle
            title={t('settings.darkMode')}
            description={t('settings.darkModeDesc')}
            value={isDarkMode}
            onValueChange={toggleTheme}
            icon="theme-light-dark"
            colors={colors}
            styles={styles}
          />
          <SettingsSelect
            title={t('settings.language')}
            description={t('settings.languageDesc')}
            value={language === 'en' ? t('common.english') : t('common.hebrew')}
            onPress={toggleLanguage}
            icon="translate"
            styles={styles}
          />
        </SettingsSection>

        <SettingsSection title={t('settings.privacy')} styles={styles}>
          <SettingsToggle
            title={t('settings.notifications')}
            description={t('settings.notificationsDesc')}
            value={isNotificationsEnabled}
            onValueChange={setIsNotificationsEnabled}
            icon="bell-outline"
            colors={colors}
            styles={styles}
          />
          <SettingsToggle
            title={t('settings.location')}
            description={t('settings.locationDesc')}
            value={isLocationEnabled}
            onValueChange={setIsLocationEnabled}
            icon="map-marker-outline"
            colors={colors}
            styles={styles}
          />
        </SettingsSection>

        <SettingsSection title={t('settings.about')} styles={styles}>
          <TouchableOpacity style={styles.linkItem}>
            <View style={styles.settingInfo}>
              <Icon
                name="information-outline"
                size={24}
                style={styles.settingIcon}
              />
              <Text style={styles.settingTitle}>{t('settings.version', { version: '1.0.0' })}</Text>
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
              <Text style={styles.settingTitle}>{t('settings.privacyPolicy')}</Text>
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
              <Text style={styles.settingTitle}>{t('settings.helpSupport')}</Text>
            </View>
            <Icon name="chevron-right" size={24} style={styles.chevron} />
          </TouchableOpacity>
        </SettingsSection>
      </ScrollView>
    </SafeAreaView>
  );
};
