import React from 'react';
import { motion } from 'framer-motion';
import { 
  Filter, 
  DollarSign, 
  Clock, 
  Plane
} from 'lucide-react';
import { FilterOptions, FlightResult } from '../types/flight.types';

interface FilterPanelProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  flights: FlightResult[];
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ 
  filters, 
  onFiltersChange, 
  flights 
}) => {
  const updateFilter = <K extends keyof FilterOptions>(
    key: K, 
    value: FilterOptions[K]
  ) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      priceRange: [0, 2000],
      durationRange: [0, 24],
      maxStops: 2,
      airlines: [],
      departureTimes: [],
      cabinClass: []
    });
  };

  const getAvailableAirlines = () => {
    const airlines = new Set<string>();
    flights.forEach(flight => {
      flight.segments.forEach(segment => {
        airlines.add(segment.airlineCode);
      });
    });
    return Array.from(airlines);
  };

  const getAvailableCabinClasses = () => {
    const classes = new Set<string>();
    flights.forEach(flight => {
      classes.add(flight.cabinClass);
    });
    return Array.from(classes);
  };

  const availableAirlines = getAvailableAirlines();
  const availableCabinClasses = getAvailableCabinClasses();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-card rounded-2xl p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2 space-x-reverse">
          <Filter className="w-5 h-5 text-primary-500" />
          <h3 className="font-semibold text-lg">פילטרים</h3>
        </div>
        <button
          onClick={clearAllFilters}
          className="text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
        >
          נקה הכל
        </button>
      </div>

      <div className="space-y-6">
        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
            <DollarSign className="inline w-4 h-4 mr-2" />
            טווח מחירים
          </label>
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
            <div className="relative">
              <input
                type="range"
                min="0"
                max="2000"
                step="50"
                value={filters.priceRange[0]}
                onChange={(e) => updateFilter('priceRange', [
                  parseInt(e.target.value),
                  filters.priceRange[1]
                ])}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
              />
              <input
                type="range"
                min="0"
                max="2000"
                step="50"
                value={filters.priceRange[1]}
                onChange={(e) => updateFilter('priceRange', [
                  filters.priceRange[0],
                  parseInt(e.target.value)
                ])}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer slider absolute top-0"
              />
            </div>
          </div>
        </div>

        {/* Duration Range */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
            <Clock className="inline w-4 h-4 mr-2" />
            משך זמן טיסה (שעות)
          </label>
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
              <span>{filters.durationRange[0]}h</span>
              <span>{filters.durationRange[1]}h</span>
            </div>
            <div className="relative">
              <input
                type="range"
                min="0"
                max="24"
                step="1"
                value={filters.durationRange[0]}
                onChange={(e) => updateFilter('durationRange', [
                  parseInt(e.target.value),
                  filters.durationRange[1]
                ])}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
              />
              <input
                type="range"
                min="0"
                max="24"
                step="1"
                value={filters.durationRange[1]}
                onChange={(e) => updateFilter('durationRange', [
                  filters.durationRange[0],
                  parseInt(e.target.value)
                ])}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer slider absolute top-0"
              />
            </div>
          </div>
        </div>

        {/* Max Stops */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
            <Plane className="inline w-4 h-4 mr-2" />
            מקסימום עצירות
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((stops) => (
              <button
                key={stops}
                onClick={() => updateFilter('maxStops', stops)}
                className={`p-2 rounded-lg border-2 transition-all duration-300 text-sm ${
                  filters.maxStops === stops
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                    : 'border-slate-200 dark:border-slate-700 hover:border-primary-300'
                }`}
              >
                {stops === 0 ? 'ישירה' : `${stops} עצירה${stops > 1 ? 'ות' : ''}`}
              </button>
            ))}
          </div>
        </div>

        {/* Airlines */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
            חברות תעופה
          </label>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {availableAirlines.map((airline) => (
              <label key={airline} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.airlines.includes(airline)}
                  onChange={(e) => {
                    const newAirlines = e.target.checked
                      ? [...filters.airlines, airline]
                      : filters.airlines.filter(a => a !== airline);
                    updateFilter('airlines', newAirlines);
                  }}
                  className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm">{airline}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Cabin Class */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
            מחלקת טיסה
          </label>
          <div className="space-y-2">
            {availableCabinClasses.map((cabinClass) => (
              <label key={cabinClass} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.cabinClass.includes(cabinClass)}
                  onChange={(e) => {
                    const newCabinClasses = e.target.checked
                      ? [...filters.cabinClass, cabinClass]
                      : filters.cabinClass.filter(c => c !== cabinClass);
                    updateFilter('cabinClass', newCabinClasses);
                  }}
                  className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm">{cabinClass}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Departure Times */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
            זמני המראה
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'בוקר', value: 'morning', time: '06:00-12:00' },
              { label: 'צהריים', value: 'afternoon', time: '12:00-18:00' },
              { label: 'ערב', value: 'evening', time: '18:00-24:00' },
              { label: 'לילה', value: 'night', time: '00:00-06:00' }
            ].map((timeSlot) => (
              <button
                key={timeSlot.value}
                onClick={() => {
                  const newTimes = filters.departureTimes.includes(timeSlot.value)
                    ? filters.departureTimes.filter(t => t !== timeSlot.value)
                    : [...filters.departureTimes, timeSlot.value];
                  updateFilter('departureTimes', newTimes);
                }}
                className={`p-2 rounded-lg border-2 transition-all duration-300 text-sm ${
                  filters.departureTimes.includes(timeSlot.value)
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                    : 'border-slate-200 dark:border-slate-700 hover:border-primary-300'
                }`}
              >
                <div>{timeSlot.label}</div>
                <div className="text-xs text-slate-500">{timeSlot.time}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}; 