import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  const t = (key) => {
    const dictionary = {
      en: {
        reportFraud: "Report Scam / Fraud",
        trackCase: "Track Case Status",
        staffLogin: "Institutional Staff Login"
      },
      am: {
        reportFraud: "ማጭበርበር ሪፖርት ያድርጉ",
        trackCase: "የኬስ ሁኔታ ይከታተሉ",
        staffLogin: "የሰራተኞች መግቢያ"
      }
    };
    return dictionary[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    // If context is missing, return a safe default instead of crashing the whole app
    return {
      language: 'en',
      setLanguage: () => {},
      t: (key) => key
    };
  }
  return context;
}
