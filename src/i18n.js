import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import fiTranslations from "./locales/fi.json";
import enTranslations from "./locales/en.json";
import fiStops from "./locales/stops/fi.json";
import enStops from "./locales/stops/en.json";
import fiStories from "./locales/stories/fi.json";
import enStories from "./locales/stories/en.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fi: {
        translation: fiTranslations,
        stops: fiStops,
        stories: fiStories,
      },
      en: {
        translation: enTranslations,
        stops: enStops,
        stories: enStories,
      },
    },
    fallbackLng: "fi",
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
