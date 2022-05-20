import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationsEnglish from "../lang/en-GB.json";

i18n.use(initReactI18next).init({
  resources: {
    "en-GB": { translation: translationsEnglish },
  },
  lng: "en-GB",
});

export default i18n;
