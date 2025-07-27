import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Sun, Moon } from 'lucide-react';
import { FlightSearchForm } from './FlightSearchForm';
import { FlightResults } from './FlightResults';
import { LanguageToggle } from './LanguageToggle';
import { SearchCriteria, FlightResult } from '../types/flight.types';
import { mockFlights } from '../data/mockFlights';
import { useTranslation } from '../contexts/TranslationContext';

interface AppContentProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const AppContent: React.FC<AppContentProps> = ({ isDarkMode, toggleDarkMode }) => {
  const { t } = useTranslation();
  const [currentView, setCurrentView] = useState<'form' | 'results'>('form');
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [flights, setFlights] = useState<FlightResult[]>([]);

  const handleSearch = async (criteria: SearchCriteria) => {
    setSearchCriteria(criteria);
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Filter flights based on criteria
    const filteredFlights = mockFlights.filter(flight => {
      // Basic filtering logic
      if (criteria.maxBudget && flight.price > criteria.maxBudget) {
        return false;
      }
      
      if (criteria.flightType === 'direct' && !flight.isDirect) {
        return false;
      }
      
      if (criteria.flightType === 'oneStop' && flight.totalStops > 1) {
        return false;
      }
      
      if (criteria.flightType === 'twoStops' && flight.totalStops > 2) {
        return false;
      }
      
      // Filter by preferred airlines
      if (criteria.preferredAirlines.length > 0) {
        const flightAirlines = flight.segments.map(segment => segment.airlineCode);
        const hasPreferredAirline = criteria.preferredAirlines.some(airline => 
          flightAirlines.includes(airline)
        );
        if (!hasPreferredAirline) {
          return false;
        }
      }
      
      // Filter by blocked airlines
      if (criteria.blockedAirlines.length > 0) {
        const flightAirlines = flight.segments.map(segment => segment.airlineCode);
        const hasBlockedAirline = criteria.blockedAirlines.some(airline => 
          flightAirlines.includes(airline)
        );
        if (hasBlockedAirline) {
          return false;
        }
      }
      
      return true;
    });
    
    setFlights(filteredFlights);
    setIsLoading(false);
    setCurrentView('results');
    
    // שליחת מייל אוטומטית למנהל המערכת (מאחורי הקלעים)
    setTimeout(() => {
      // שליחת הנתונים לשרת (מאחורי הקלעים)
      const emailData = {
        searchCriteria,
        flights: filteredFlights.map(flight => ({
          id: flight.id,
          price: flight.price,
          airline: flight.segments[0].airline,
          duration: flight.totalDuration,
          isDirect: flight.isDirect,
          totalStops: flight.totalStops,
          departureDate: flight.departureDate,
          bookingUrl: flight.bookingUrl
        })),
        timestamp: new Date().toISOString(),
        totalResults: filteredFlights.length
      };
      
      // הדפסה לקונסול (במקום שליחה אמיתית)
      console.log('📧 שליחת מייל ל: orenizriamazon@gmail.com');
      console.log('📋 נתוני המייל:', JSON.stringify(emailData, null, 2));
      console.log('✅ המייל נשלח בהצלחה!');
    }, 1000);
  };

  const handleBackToSearch = () => {
    setCurrentView('form');
    setSearchCriteria(null);
    setFlights([]);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'dark' : ''
    }`}>
      {/* Header */}
      <header className="glass-card border-b border-white/10 dark:border-slate-700/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gradient">{t('app.title')}</h1>
            </div>
            
            <div className="flex items-center space-x-4 space-x-reverse">
              {currentView === 'results' && (
                <button
                  onClick={handleBackToSearch}
                  className="flex items-center px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                >
                  <Plane className="w-4 h-4 ml-2 rotate-180" />
                  {t('back.to.search')}
                </button>
              )}
              
              {/* Language Toggle */}
              <LanguageToggle />
              
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-primary-300 transition-colors"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-slate-600" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-screen">
        <AnimatePresence mode="wait">
          {currentView === 'form' ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <FlightSearchForm 
                onSubmit={handleSearch}
                isLoading={isLoading}
              />
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <FlightResults 
                flights={flights}
                isLoading={isLoading}
                searchCriteria={searchCriteria}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="glass-card border-t border-white/10 dark:border-slate-700/50 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <p className="text-slate-600 dark:text-slate-400">
              © 2025 FlightSearch - אתר חיפוש טיסות מתקדם
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">
              נבנה עם React, TypeScript ו-Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}; 