import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TranslationContextType, Language } from '../types/translation.types';
import { translations } from '../data/translations';

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

interface TranslationProviderProps {
  children: ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('he');

  // Initialize document direction on mount
  React.useEffect(() => {
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'he';
  }, []);

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translation[language];
  };

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    // Update document direction - עברית RTL, אנגלית LTR
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    
    // Force re-render
    window.dispatchEvent(new Event('resize'));
    
    // Log for debugging
    console.log('Language changed to:', lang, 'Direction:', document.documentElement.dir);
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = (): TranslationContextType => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}; 