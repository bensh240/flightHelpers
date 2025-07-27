export type TripType = 'oneWay' | 'roundTrip';

export type FlightType = 'direct' | 'oneStop' | 'twoStops' | 'cheapest';

export type WeekDay = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';

export interface Stopover {
  allowed: boolean;
  maxDays: number;
}

export interface SearchCriteria {
  destination: string;
  origin: string;
  tripType: TripType;
  departureDate: string;
  returnDate?: string;
  dateFlexibility: number;
  flightType: FlightType;
  maxBudget: number;
  tripDuration?: number;
  durationFlexibility?: number;
  blockedDays: WeekDay[];
  preferredAirlines: string[];
  blockedAirlines: string[];
  mixedAirlines: boolean;
  stopovers: Stopover;
}

export interface FlightSegment {
  airline: string;
  airlineCode: string;
  flightNumber: string;
  departure: {
    airport: string;
    airportCode: string;
    time: string;
    date: string;
  };
  arrival: {
    airport: string;
    airportCode: string;
    time: string;
    date: string;
  };
  duration: string;
  stops: number;
  aircraft: string;
}

export interface FlightResult {
  id: string;
  price: number;
  currency: string;
  totalDuration: string;
  segments: FlightSegment[];
  isDirect: boolean;
  totalStops: number;
  departureDate: string;
  returnDate?: string;
  bookingUrl: string;
  airlineLogos: string[];
  pricePerPerson: boolean;
  cabinClass: string;
  refundable: boolean;
  changeable: boolean;
  baggageIncluded: boolean;
}

export interface FilterOptions {
  priceRange: [number, number];
  durationRange: [number, number];
  maxStops: number;
  airlines: string[];
  departureTimes: string[];
  cabinClass: string[];
}

export interface PopularDestination {
  name: string;
  code: string;
  country: string;
  image: string;
}

export interface Airline {
  name: string;
  code: string;
  logo: string;
  rating: number;
}

export interface FormStep {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
} 