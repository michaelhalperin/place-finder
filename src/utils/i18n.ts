import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { en } from "../translations/english/translation";
import { he } from "../translations/hebrew/translation";
import { LanguageDetectorAsyncModule } from "i18next";

const LANGUAGE_DETECTOR: LanguageDetectorAsyncModule = {
  type: "languageDetector",
  async: true,
  detect: async (
    callback: (lng: string | readonly string[] | undefined) => void
  ) => {
    try {
      const language = await AsyncStorage.getItem("user-language");
      callback(language || "en");
      return language || "en";
    } catch (error) {
      callback("en");
      return "en";
    }
  },
  init: () => {},
  cacheUserLanguage: async (lng: string) => {
    try {
      await AsyncStorage.setItem("user-language", lng);
    } catch (error) {
      console.error("Error caching language", error);
    }
  },
};

i18next
  .use(LANGUAGE_DETECTOR)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en,
      },
      he: {
        translation: he,
      },
    },
    fallbackLng: "en",
    compatibilityJSON: "v4",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
