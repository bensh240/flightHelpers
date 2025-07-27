import React, { useState } from 'react';
import { TranslationProvider } from './contexts/TranslationContext';
import { AppContent } from './components/AppContent';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <TranslationProvider>
      <AppContent isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
    </TranslationProvider>
  );
}

export default App;
