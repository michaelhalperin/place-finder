import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { storage } from './storage';

// English translations
const enTranslations = {
  common: {
    language: 'Language',
    english: 'English',
    hebrew: 'Hebrew',
  },
  questions: {
    q1: {
      title: 'What type of experience are you looking for?',
      options: {
        adventure: 'Adventure & Outdoors',
        culture: 'Cultural & Arts',
        food: 'Food & Dining',
        relax: 'Relaxation & Wellness',
        nightlife: 'Nightlife & Entertainment',
      },
    },
    // Add more translations as needed
  },
};

// Hebrew translations
const heTranslations = {
  common: {
    language: 'שפה',
    english: 'אנגלית',
    hebrew: 'עברית',
  },
  questions: {
    q1: {
      title: 'איזה סוג של חוויה אתה מחפש?',
      options: {
        adventure: 'הרפתקאות וטבע',
        culture: 'תרבות ואמנות',
        food: 'אוכל ואירוח',
        relax: 'רגיעה ובריאות',
        nightlife: 'חיי לילה ובידור',
      },
    },
    // Add more translations as needed
  },
};

// Language configuration
const resources = {
  en: {
    translation: enTranslations,
  },
  he: {
    translation: heTranslations,
  },
};

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

// Function to change language
export const changeLanguage = async (language: 'en' | 'he') => {
  await i18n.changeLanguage(language);
  await storage.setItem('userLanguage', language);
};

// Function to initialize language from storage
export const initializeLanguage = async () => {
  const savedLanguage = await storage.getItem<'en' | 'he'>('userLanguage');
  if (savedLanguage) {
    await i18n.changeLanguage(savedLanguage);
  }
};

export default i18n; 