import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { motion } from 'framer-motion';
import { 
  Plane, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Clock,
  ChevronRight,
  ChevronLeft,
  Check
} from 'lucide-react';
import { SearchCriteria, TripType, FlightType, WeekDay } from '../types/flight.types';
import { popularDestinations, airlines } from '../data/mockFlights';
import { useTranslation } from '../contexts/TranslationContext';

interface FlightSearchFormProps {
  onSubmit: (data: SearchCriteria) => void;
  isLoading?: boolean;
}

const weekDays: { value: WeekDay; label: string }[] = [
  { value: 'sunday', label: 'ראשון' },
  { value: 'monday', label: 'שני' },
  { value: 'tuesday', label: 'שלישי' },
  { value: 'wednesday', label: 'רביעי' },
  { value: 'thursday', label: 'חמישי' },
  { value: 'friday', label: 'שישי' },
  { value: 'saturday', label: 'שבת' }
];

const flightTypes: { value: FlightType; label: string; description: string }[] = [
  { value: 'direct', label: 'טיסה ישירה בלבד', description: 'ללא עצירות ביניים' },
  { value: 'oneStop', label: 'עד קונקשן אחד', description: 'עצירה אחת בלבד' },
  { value: 'twoStops', label: 'עד 2 קונקשנים', description: 'עד שתי עצירות' },
  { value: 'cheapest', label: 'לא משנה (הכי זול)', description: 'כל האפשרויות' }
];

export const FlightSearchForm: React.FC<FlightSearchFormProps> = ({ onSubmit, isLoading = false }) => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);

  
  const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm<SearchCriteria>({
    defaultValues: {
      destination: '',
      origin: '',
      tripType: 'roundTrip',
      departureDate: '',
      returnDate: '',
      dateFlexibility: 1,
      flightType: 'cheapest',
      maxBudget: 1000,
      tripDuration: 7,
      durationFlexibility: 2,
      blockedDays: [],
      preferredAirlines: [],
      blockedAirlines: [],
      mixedAirlines: false,
      stopovers: {
        allowed: false,
        maxDays: 3
      }
    }
  });

  const watchedTripType = watch('tripType');


  const steps = [
    { id: 1, title: t('step.basic'), description: t('destination.placeholder') },
    { id: 2, title: t('departure.date'), description: t('return.date') },
    { id: 3, title: t('step.preferences'), description: t('flight.type') },
    { id: 4, title: t('step.advanced'), description: t('blocked.days') }
  ];

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onFormSubmit = (data: SearchCriteria) => {
    onSubmit(data);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-gradient mb-4">
          {t('app.title')}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg">
          {t('destination.placeholder')}
        </p>
      </motion.div>

      {/* Progress Steps */}
      <div className="flex justify-center mb-8">
        <div className="flex space-x-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                currentStep >= step.id 
                  ? 'border-primary-500 bg-primary-500 text-white' 
                  : 'border-slate-300 dark:border-slate-600 text-slate-500'
              }`}>
                {currentStep > step.id ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="font-medium">{step.id}</span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 mx-2 transition-all duration-300 ${
                  currentStep > step.id ? 'bg-primary-500' : 'bg-slate-300 dark:bg-slate-600'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="glass-card rounded-2xl p-8"
      >
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          
          {/* Step 1: Destination and Origin */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Origin */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    <MapPin className="inline w-4 h-4 mr-2" />
                    {t('origin')}
                  </label>
                  <Controller
                    name="origin"
                    control={control}
                    rules={{ required: t('required.origin') }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder={t('origin.placeholder')}
                        className="input-field"
                      />
                    )}
                  />
                  {errors.origin && (
                    <p className="text-red-500 text-sm mt-1">{errors.origin.message}</p>
                  )}
                </div>

                {/* Destination */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    <Plane className="inline w-4 h-4 mr-2" />
                    {t('destination')}
                  </label>
                  <Controller
                    name="destination"
                    control={control}
                    rules={{ required: t('required.destination') }}
                    render={({ field }) => (
                      <div className="relative">
                        <input
                          {...field}
                          type="text"
                          placeholder={t('destination.placeholder')}
                          className="input-field"
                        />
                        {/* Popular Destinations */}
                        <div className="mt-4">
                          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{t('popular.destinations')}:</p>
                          <div className="flex flex-wrap gap-2">
                            {popularDestinations.slice(0, 4).map((dest) => (
                              <button
                                key={dest.code}
                                type="button"
                                onClick={() => setValue('destination', dest.name)}
                                className="px-3 py-1 text-sm bg-slate-100 dark:bg-slate-700 rounded-full hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors"
                              >
                                {dest.code === 'TLV' ? t('tel.aviv') : 
                                 dest.code === 'JFK' ? t('new.york') : 
                                 dest.code === 'LHR' ? t('london') : 
                                 dest.code === 'CDG' ? t('paris') : dest.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  />
                  {errors.destination && (
                    <p className="text-red-500 text-sm mt-1">{errors.destination.message}</p>
                  )}
                </div>
              </div>

              {/* Trip Type */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                  {t('trip.type')}
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(['oneWay', 'roundTrip'] as TripType[]).map((type) => (
                    <Controller
                      key={type}
                      name="tripType"
                      control={control}
                      render={({ field }) => (
                        <button
                          type="button"
                          onClick={() => field.onChange(type)}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                            field.value === type
                              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                              : 'border-slate-200 dark:border-slate-700 hover:border-primary-300'
                          }`}
                        >
                          <div className="text-left">
                            <div className="font-medium">
                              {type === 'oneWay' ? t('one.way.only') : t('round.trip.only')}
                            </div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">
                              {type === 'oneWay' ? t('one.way.description') : t('round.trip.description')}
                            </div>
                          </div>
                        </button>
                      )}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Dates */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Departure Date */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    <Calendar className="inline w-4 h-4 mr-2" />
                    {t('departure.date')}
                  </label>
                  <Controller
                    name="departureDate"
                    control={control}
                    rules={{ required: t('required.departure.date') }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        className="input-field"
                      />
                    )}
                  />
                  {errors.departureDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.departureDate.message}</p>
                  )}
                </div>

                {/* Return Date */}
                {watchedTripType === 'roundTrip' && (
                  <div>
                                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    <Calendar className="inline w-4 h-4 mr-2" />
                    {t('return.date')}
                  </label>
                    <Controller
                      name="returnDate"
                      control={control}
                      rules={{ required: watchedTripType === 'roundTrip' ? t('required.return.date') : false }}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="date"
                          min={watch('departureDate') || new Date().toISOString().split('T')[0]}
                          className="input-field"
                        />
                      )}
                    />
                    {errors.returnDate && (
                      <p className="text-red-500 text-sm mt-1">{errors.returnDate.message}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Date Flexibility */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  {t('date.flexibility')} (±{t('days')})
                </label>
                <Controller
                  name="dateFlexibility"
                  control={control}
                  render={({ field }) => (
                    <div className="space-y-2">
                      <input
                        {...field}
                        type="range"
                        min="0"
                        max="7"
                        className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                        <span>{t('no.flexibility')}</span>
                        <span>±{field.value} {t('days')}</span>
                        <span>{t('max.flexibility')}</span>
                      </div>
                    </div>
                  )}
                />
              </div>
            </motion.div>
          )}

          {/* Step 3: Preferences */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Flight Type */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                  {t('flight.type')}
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {flightTypes.map((type) => (
                    <Controller
                      key={type.value}
                      name="flightType"
                      control={control}
                      render={({ field }) => (
                        <button
                          type="button"
                          onClick={() => field.onChange(type.value)}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 text-right ${
                            field.value === type.value
                              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                              : 'border-slate-200 dark:border-slate-700 hover:border-primary-300'
                          }`}
                        >
                          <div className="font-medium">{t(type.value === 'direct' ? 'direct.only' : type.value === 'oneStop' ? 'one.connection' : type.value === 'twoStops' ? 'two.connections' : 'dont.care')}</div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">{t(type.value === 'direct' ? 'no.stops' : type.value === 'oneStop' ? 'one.stop.only' : type.value === 'twoStops' ? 'up.to.two.stops' : 'all.options')}</div>
                        </button>
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  <DollarSign className="inline w-4 h-4 mr-2" />
                  {t('max.budget')} (USD)
                </label>
                <Controller
                  name="maxBudget"
                  control={control}
                  render={({ field }) => (
                    <div className="space-y-2">
                      <input
                        {...field}
                        type="range"
                        min="100"
                        max="2000"
                        step="50"
                        className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                        <span>$100</span>
                        <span className="font-medium">${field.value}</span>
                        <span>$2000</span>
                      </div>
                    </div>
                  )}
                />
              </div>

              {/* Trip Duration for Round Trip */}
              {watchedTripType === 'roundTrip' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    <Clock className="inline w-4 h-4 mr-2" />
                    {t('trip.duration')} ({t('days')})
                  </label>
                  <Controller
                    name="tripDuration"
                    control={control}
                    render={({ field }) => (
                      <div className="space-y-2">
                        <input
                          {...field}
                          type="range"
                          min="1"
                          max="30"
                          className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                          <span>{t('one.day')}</span>
                          <span className="font-medium">{field.value} {t('days')}</span>
                          <span>{t('one.month')}</span>
                        </div>
                      </div>
                    )}
                  />
                </div>
              )}
            </motion.div>
          )}

          {/* Step 4: Advanced Settings */}
          {currentStep === 4 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Blocked Days */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                  {t('blocked.days')}
                </label>
                <div className="grid grid-cols-2 md:grid-cols-7 gap-2">
                  {weekDays.map((day) => (
                    <Controller
                      key={day.value}
                      name="blockedDays"
                      control={control}
                      render={({ field }) => (
                        <button
                          type="button"
                          onClick={() => {
                            const current = field.value || [];
                            const newValue = current.includes(day.value)
                              ? current.filter(d => d !== day.value)
                              : [...current, day.value];
                            field.onChange(newValue);
                          }}
                          className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                            (field.value || []).includes(day.value)
                              ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                              : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                          }`}
                        >
                          {t(day.value)}
                        </button>
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Airlines */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Preferred Airlines */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                    {t('preferred.airlines')}
                  </label>
                  <Controller
                    name="preferredAirlines"
                    control={control}
                    render={({ field }) => (
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {airlines.map((airline) => (
                          <label key={airline.code} className="flex items-center space-x-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={(field.value || []).includes(airline.code)}
                              onChange={(e) => {
                                const current = field.value || [];
                                const newValue = e.target.checked
                                  ? [...current, airline.code]
                                  : current.filter(code => code !== airline.code);
                                field.onChange(newValue);
                              }}
                              className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                            />
                            <span className="text-sm">{airline.name}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  />
                </div>

                {/* Blocked Airlines */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                    {t('blocked.airlines')}
                  </label>
                  <Controller
                    name="blockedAirlines"
                    control={control}
                    render={({ field }) => (
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {airlines.map((airline) => (
                          <label key={airline.code} className="flex items-center space-x-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={(field.value || []).includes(airline.code)}
                              onChange={(e) => {
                                const current = field.value || [];
                                const newValue = e.target.checked
                                  ? [...current, airline.code]
                                  : current.filter(code => code !== airline.code);
                                field.onChange(newValue);
                              }}
                              className="rounded border-slate-300 text-red-600 focus:ring-red-500"
                            />
                            <span className="text-sm">{airline.name}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  />
                </div>
              </div>

              {/* Mixed Airlines */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                  {t('mixed.airlines')}
                </label>
                <Controller
                  name="mixedAirlines"
                  control={control}
                  render={({ field }) => (
                    <div className="flex space-x-4">
                      {[true, false].map((value) => (
                        <button
                          key={value.toString()}
                          type="button"
                          onClick={() => field.onChange(value)}
                          className={`px-4 py-2 rounded-lg border-2 transition-all duration-300 ${
                            field.value === value
                              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                              : 'border-slate-200 dark:border-slate-700 hover:border-primary-300'
                          }`}
                        >
                          {value ? t('yes') : t('no')}
                        </button>
                      ))}
                    </div>
                  )}
                />
              </div>

              {/* Stopovers */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                  {t('stopovers')}
                </label>
                <Controller
                  name="stopovers.allowed"
                  control={control}
                  render={({ field }) => (
                    <div className="space-y-4">
                      <div className="flex space-x-4">
                        {[true, false].map((value) => (
                          <button
                            key={value.toString()}
                            type="button"
                            onClick={() => field.onChange(value)}
                            className={`px-4 py-2 rounded-lg border-2 transition-all duration-300 ${
                              field.value === value
                                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                : 'border-slate-200 dark:border-slate-700 hover:border-primary-300'
                            }`}
                          >
                            {value ? t('yes') : t('no')}
                          </button>
                        ))}
                      </div>
                      
                      {field.value && (
                        <div>
                          <label className="block text-sm text-slate-600 dark:text-slate-400 mb-2">
                            {t('max.stopover.days')}
                          </label>
                          <Controller
                            name="stopovers.maxDays"
                            control={control}
                            render={({ field: maxDaysField }) => (
                              <input
                                {...maxDaysField}
                                type="number"
                                min="1"
                                max="7"
                                className="input-field w-32"
                              />
                            )}
                          />
                        </div>
                      )}
                    </div>
                  )}
                />
              </div>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4 ml-1" />
              {t('previous')}
            </button>

            {currentStep < steps.length ? (
              <button
                type="button"
                onClick={nextStep}
                className="btn-primary flex items-center"
              >
                {t('next')}
                <ChevronRight className="w-4 h-4 mr-1" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary flex items-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2" />
                    {t('loading')}
                  </>
                ) : (
                  <>
                    <Plane className="w-4 h-4 mr-1" />
                    {t('search.flights')}
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
}; 