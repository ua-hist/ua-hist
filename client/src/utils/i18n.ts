import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from '../locales/en/translation.json'; // English translations
import uaTranslation from '../locales/ua/translation.json'; // Ukrainian translations

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: enTranslation,
      },
      ua: {
        translation: uaTranslation,
      },
      // Add translations for other languages as needed
    }
  });

export default i18n;