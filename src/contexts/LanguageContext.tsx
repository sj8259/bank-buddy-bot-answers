
import React, { createContext, useContext, useEffect, useState } from 'react';

// Define the supported languages
export type Language = 'en' | 'hi' | 'ta' | 'te';

export interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get initial language from localStorage or use browser language or default to English
  const getInitialLanguage = (): Language => {
    const savedLanguage = localStorage.getItem('bankBuddy_language') as Language;
    if (savedLanguage && ['en', 'hi', 'ta', 'te'].includes(savedLanguage)) {
      return savedLanguage;
    }
    
    // Try to match browser language
    const browserLang = navigator.language.split('-')[0];
    if (['hi', 'ta', 'te'].includes(browserLang)) {
      return browserLang as Language;
    }
    
    return 'en'; // Default to English
  };

  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  // Store language preference in localStorage
  const setLanguage = (newLanguage: Language) => {
    localStorage.setItem('bankBuddy_language', newLanguage);
    setLanguageState(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
