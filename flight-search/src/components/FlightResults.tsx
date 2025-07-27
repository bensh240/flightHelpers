import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, 
  SortAsc, 
  SortDesc, 
  Plane, 
  MapPin, 
  DollarSign,
  RefreshCw,
  Calendar
} from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';
import { FlightResult, FilterOptions } from '../types/flight.types';
import { FlightCard } from './FlightCard';
import { FilterPanel } from './FilterPanel';


interface FlightResultsProps {
  flights: FlightResult[];
  isLoading?: boolean;
  searchCriteria?: any;
}

type SortOption = 'price' | 'duration' | 'departure' | 'airline';
type SortDirection = 'asc' | 'desc';

export const FlightResults: React.FC<FlightResultsProps> = ({ 
  flights, 
  isLoading = false,
  searchCriteria 
}) => {
  const { t } = useTranslation();
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('price');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 2000],
    durationRange: [0, 24],
    maxStops: 2,
    airlines: [],
    departureTimes: [],
    cabinClass: []
  });

  const sortedAndFilteredFlights = useMemo(() => {
    let filtered = flights.filter(flight => {
      // Price filter
      if (flight.price < filters.priceRange[0] || flight.price > filters.priceRange[1]) {
        return false;
      }

      // Duration filter (convert to hours for comparison)
      const durationHours = parseFloat(flight.totalDuration.replace('h', '').replace('m', ''));
      if (durationHours < filters.durationRange[0] || durationHours > filters.durationRange[1]) {
        return false;
      }

      // Stops filter
      if (flight.totalStops > filters.maxStops) {
        return false;
      }

      // Airlines filter
      if (filters.airlines.length > 0) {
        const flightAirlines = flight.segments.map(segment => segment.airlineCode);
        const hasPreferredAirline = filters.airlines.some(airline => 
          flightAirlines.includes(airline)
        );
        if (!hasPreferredAirline) {
          return false;
        }
      }

      return true;
    });

    // Sort flights
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (sortBy) {
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'duration':
          aValue = parseFloat(a.totalDuration.replace('h', '').replace('m', ''));
          bValue = parseFloat(b.totalDuration.replace('h', '').replace('m', ''));
          break;
        case 'departure':
          aValue = new Date(a.departureDate + ' ' + a.segments[0].departure.time);
          bValue = new Date(b.departureDate + ' ' + b.segments[0].departure.time);
          break;
        case 'airline':
          aValue = a.segments[0].airline;
          bValue = b.segments[0].airline;
          break;
        default:
          return 0;
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [flights, filters, sortBy, sortDirection]);

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  const getSortIcon = () => {
    return sortDirection === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />;
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="glass-card rounded-2xl p-8">
          <div className="flex items-center justify-center space-x-4">
            <RefreshCw className="w-6 h-6 animate-spin text-primary-500" />
                            <span className="text-lg">{t('loading')}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gradient">
              תוצאות חיפוש טיסות
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              נמצאו {sortedAndFilteredFlights.length} טיסות
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4 space-x-reverse">
            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center px-4 py-2 rounded-xl border-2 transition-all duration-300 ${
                showFilters
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                  : 'border-slate-200 dark:border-slate-700 hover:border-primary-300'
              }`}
            >
              <Filter className="w-4 h-4 ml-2" />
              {t('filters')}
            </button>

            {/* Sort */}
            <div className="flex items-center space-x-2 space-x-reverse">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
              >
                <option value="price">מחיר</option>
                <option value="duration">משך זמן</option>
                <option value="departure">זמן המראה</option>
                <option value="airline">חברת תעופה</option>
              </select>
              <button
                onClick={toggleSortDirection}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-primary-300 transition-colors"
              >
                {getSortIcon()}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="lg:col-span-1"
            >
              <FilterPanel
                filters={filters}
                onFiltersChange={setFilters}
                flights={flights}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <div className={`space-y-4 ${showFilters ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
          {sortedAndFilteredFlights.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-card rounded-2xl p-8 text-center"
            >
              <Plane className="w-16 h-16 mx-auto text-slate-400 mb-4" />
              <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
                {t('no.results')}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                נסה לשנות את הקריטריונים שלך או להסיר חלק מהפילטרים
              </p>
            </motion.div>
          ) : (
            <AnimatePresence>
              {sortedAndFilteredFlights.map((flight, index) => (
                <motion.div
                  key={flight.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <FlightCard flight={flight} />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Search Criteria Summary */}
      {searchCriteria && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 glass-card rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold mb-4">פרטי החיפוש</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center space-x-2 space-x-reverse">
              <MapPin className="w-4 h-4 text-primary-500" />
              <span>
                <strong>מ:</strong> {searchCriteria.origin}
              </span>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <Plane className="w-4 h-4 text-primary-500" />
              <span>
                <strong>אל:</strong> {searchCriteria.destination}
              </span>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <Calendar className="w-4 h-4 text-primary-500" />
              <span>
                <strong>תאריך:</strong> {searchCriteria.departureDate}
              </span>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <DollarSign className="w-4 h-4 text-primary-500" />
              <span>
                <strong>תקציב:</strong> ${searchCriteria.maxBudget}
              </span>
            </div>
          </div>
        </motion.div>
      )}


    </div>
  );
}; 