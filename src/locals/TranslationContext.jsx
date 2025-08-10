import React, { createContext, useContext, useState, useEffect } from "react";

// Sample translations object — extend as needed
const TRANSLATIONS = {
  en: {
    welcome: "Welcome",
    language: "Language",
    exitGame: "Exit Game",
    rules: "Rules",
    myBets: "My Bets",
    balance: 'Balance'
  },
  fr: {
    welcome: "Bienvenue",
    language: "Langue",
    exitGame: "Quitter le jeu",
    rules: "Règles",
    myBets: "Mes Paris",
    balance: 'Solde'
  },
  ar: {
    welcome: "مرحبا",
    language: "اللغة",
    exitGame: "إنهاء اللعبة",
    rules: "القواعد",
    myBets: "رهاناتي",
    balance: 'الرصيد'
  },
};

const TranslationContext = createContext({
  locale: "en",
  setLocale: () => {},
  t: (key) => key,
});

export function TranslationProvider({ children }) {
  const [locale, setLocale] = useState("en");

  // Simple translate function to get string by key and current locale
  const t = (key) => {
    return TRANSLATIONS[locale]?.[key] || key;
  };

  // Optional: persist locale in localStorage or sync with browser language
  useEffect(() => {
    const savedLocale = localStorage.getItem("locale");
    if (savedLocale && TRANSLATIONS[savedLocale]) setLocale(savedLocale);
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

// Custom hook for consuming translation context
export function useTranslation() {
  return useContext(TranslationContext);
}
