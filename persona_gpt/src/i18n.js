import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en.json";
import ko from "./locales/ko.json";

const getBrowserLanguage = () => {
    const browserLang = navigator.language || navigator.userLanguage;
    return browserLang.toLowerCase().startsWith('ko') ? 'ko' : 'en';
};

// 초기 언어 설정
const initialLanguage = getBrowserLanguage();

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ko: { translation: ko },
    },
    lng: initialLanguage, // 초기 언어 명시적 설정
    fallbackLng: "ko",
    detection: {
      order: ["localStorage", "navigator"],
      caches: ['localStorage'], // 언어 설정 캐시
    },
    interpolation: {
      escapeValue: false,
    },
  });

// 초기 언어를 강제로 설정
i18n.changeLanguage(initialLanguage);

export default i18n;