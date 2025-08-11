import React, { createContext, useContext, useState, useEffect } from "react";
import { TRANSLATIONS } from "./translations/index";

const TranslationContext = createContext({
  locale: "en",
  setLocale: () => {},
  t: (key) => key,
});

export function TranslationProvider({ children }) {
  const [locale, setLocale] = useState("en");

  const t = (key) => {
    // Support nested keys like "header.language.ar"
    return key.split(".").reduce((obj, k) => obj?.[k], TRANSLATIONS[locale]) || key;
  };

  useEffect(() => {
    const savedLocale = localStorage.getItem("locale");
    if (savedLocale && TRANSLATIONS[savedLocale]) {
      setLocale(savedLocale);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("locale", locale);
  }, [locale]);

  return (
    <TranslationContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  return useContext(TranslationContext);
}
