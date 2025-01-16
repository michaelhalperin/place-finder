import React, { createContext, useContext, useEffect, useState } from 'react';
import { storage } from '../utils/storage';
import i18n from '../utils/i18n';

type LanguageContextType = {
  language: 'en' | 'he';
  setLanguage: (lang: 'en' | 'he') => Promise<void>;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<'en' | 'he'>('en');

  useEffect(() => {
    // Initialize language from storage on app start
    const initLanguage = async () => {
      try {
        const savedLanguage = await storage.getItem<'en' | 'he'>('userLanguage');
        if (savedLanguage) {
          await i18n.changeLanguage(savedLanguage);
          setLanguageState(savedLanguage);
        }
      } catch (error) {
        console.error('Error loading language preference:', error);
      }
    };

    initLanguage();
  }, []);

  const setLanguage = async (newLanguage: 'en' | 'he') => {
    try {
      await i18n.changeLanguage(newLanguage);
      await storage.setItem('userLanguage', newLanguage);
      setLanguageState(newLanguage);
    } catch (error) {
      console.error('Error setting language:', error);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 