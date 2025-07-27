import React from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage, t } = useTranslation();

  const toggleLanguage = () => {
    setLanguage(language === 'he' ? 'en' : 'he');
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 space-x-reverse px-3 py-2 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-primary-300 transition-all duration-300 bg-white dark:bg-slate-800"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Globe className="w-4 h-4" />
      <span className="text-sm font-medium">
        {language === 'he' ? 'EN' : 'עב'}
      </span>
    </motion.button>
  );
}; 