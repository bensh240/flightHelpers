import React from 'react';
import { motion } from 'framer-motion';
import { 
  Plane, 
  Clock, 
  MapPin,
  Star,
  ExternalLink,
  Check
} from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';
import { FlightResult } from '../types/flight.types';

interface FlightCardProps {
  flight: FlightResult;
}

export const FlightCard: React.FC<FlightCardProps> = ({ flight }) => {
  const { t } = useTranslation();
  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatTime = (time: string) => {
    return time;
  };

  const getFlightTypeIcon = () => {
    if (flight.isDirect) {
      return <Plane className="w-4 h-4 text-green-500" />;
    }
    return <div className="flex items-center space-x-1 space-x-reverse">
      <Plane className="w-3 h-3 text-blue-500" />
      <span className="text-xs text-blue-500">{flight.totalStops}</span>
    </div>;
  };

  const getFlightTypeText = () => {
    if (flight.isDirect) {
      return t('direct');
    }
    return `${flight.totalStops} ${t('stops')}`;
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="flight-card"
    >
      <div className="flex flex-col lg:flex-row lg:items-center gap-6">
        {/* Main Flight Info */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3 space-x-reverse">
              {flight.airlineLogos.map((logo, index) => (
                <img
                  key={index}
                  src={logo}
                  alt="Airline logo"
                  className="w-8 h-8 rounded-full object-contain"
                />
              ))}
              <div>
                <h3 className="font-semibold text-lg">{flight.segments[0].airline}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {flight.segments.map(segment => segment.flightNumber).join(' + ')}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 space-x-reverse">
              {getFlightTypeIcon()}
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {getFlightTypeText()}
              </span>
            </div>
          </div>

          {/* Flight Route */}
          <div className="space-y-3">
            {flight.segments.map((segment, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-4 space-x-reverse">
                  {/* Departure */}
                  <div className="text-right">
                    <div className="font-semibold text-lg">
                      {formatTime(segment.departure.time)}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {segment.departure.airportCode}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-500">
                      {segment.departure.airport}
                    </div>
                  </div>

                  {/* Flight Duration */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-px bg-slate-300 dark:bg-slate-600 relative">
                      <Plane className="w-3 h-3 text-primary-500 absolute -top-1.5 left-1/2 transform -translate-x-1/2" />
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                      {segment.duration}
                    </span>
                  </div>

                  {/* Arrival */}
                  <div className="text-left">
                    <div className="font-semibold text-lg">
                      {formatTime(segment.arrival.time)}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {segment.arrival.airportCode}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-500">
                      {segment.arrival.airport}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Flight Details */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center space-x-4 space-x-reverse text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center space-x-1 space-x-reverse">
                <Clock className="w-4 h-4" />
                <span>{t('total.duration')}: {flight.totalDuration}</span>
              </div>
              <div className="flex items-center space-x-1 space-x-reverse">
                <MapPin className="w-4 h-4" />
                <span>{flight.cabinClass}</span>
              </div>
            </div>

            {/* Features */}
            <div className="flex items-center space-x-2 space-x-reverse">
              {flight.refundable && (
                <div className="flex items-center space-x-1 space-x-reverse text-green-600">
                  <Check className="w-3 h-3" />
                  <span className="text-xs">{t('refundable')}</span>
                </div>
              )}
              {flight.changeable && (
                <div className="flex items-center space-x-1 space-x-reverse text-blue-600">
                  <Check className="w-3 h-3" />
                  <span className="text-xs">{t('changeable')}</span>
                </div>
              )}
              {flight.baggageIncluded && (
                <div className="flex items-center space-x-1 space-x-reverse text-purple-600">
                  <Check className="w-3 h-3" />
                  <span className="text-xs">{t('baggage')}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Price and Booking */}
        <div className="flex flex-col items-center lg:items-end space-y-4">
          {/* Price */}
          <div className="text-center lg:text-right">
            <div className="text-3xl font-bold text-gradient">
              {formatPrice(flight.price, flight.currency)}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              {flight.pricePerPerson ? t('per.person') : t('per.ticket')}
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-1 space-x-reverse">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  star <= 4 ? 'text-yellow-400 fill-current' : 'text-slate-300 dark:text-slate-600'
                }`}
              />
            ))}
            <span className="text-sm text-slate-600 dark:text-slate-400 mr-1">4.2</span>
          </div>

          {/* Book Button */}
          <a
            href={flight.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex items-center"
          >
            {t('book.now')}
            <ExternalLink className="w-4 h-4 mr-1" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}; 