import React, { createContext, useContext, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18next from "../utils/i18n";

interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (language: string) => Promise<void>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentLanguage, setCurrentLanguage] = useState("en");

  const changeLanguage = useCallback(async (language: string) => {
    try {
      await i18next.changeLanguage(language);
      setCurrentLanguage(language);
      await AsyncStorage.setItem("user-language", language);
    } catch (error) {
      console.error("Error changing language:", error);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
