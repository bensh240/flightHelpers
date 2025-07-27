export interface TranslationData {
  [key: string]: {
    he: string;
    en: string;
  };
}

export type Language = 'he' | 'en';

export interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
} 