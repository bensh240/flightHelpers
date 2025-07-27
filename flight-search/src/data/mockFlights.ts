import { FlightResult, PopularDestination, Airline } from '../types/flight.types';

export const popularDestinations: PopularDestination[] = [
  {
    name: 'תל אביב',
    code: 'TLV',
    country: 'ישראל',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400'
  },
  {
    name: 'ניו יורק',
    code: 'JFK',
    country: 'ארה"ב',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400'
  },
  {
    name: 'לונדון',
    code: 'LHR',
    country: 'בריטניה',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400'
  },
  {
    name: 'פריז',
    code: 'CDG',
    country: 'צרפת',
    image: 'https://images.unsplash.com/photo-1502602898534-37c1c19a7e70?w=400'
  },
  {
    name: 'רומא',
    code: 'FCO',
    country: 'איטליה',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400'
  },
  {
    name: 'טוקיו',
    code: 'NRT',
    country: 'יפן',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400'
  },
  {
    name: 'בנגקוק',
    code: 'BKK',
    country: 'תאילנד',
    image: 'https://images.unsplash.com/photo-1502602898534-37c1c19a7e70?w=400'
  },
  {
    name: 'דובאי',
    code: 'DXB',
    country: 'איחוד האמירויות',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400'
  }
];

export const airlines: Airline[] = [
  { name: 'אל על', code: 'LY', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/El_Al_logo.svg/200px-El_Al_logo.svg.png', rating: 4.2 },
  { name: 'Turkish Airlines', code: 'TK', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Turkish_Airlines_logo_2011.svg/200px-Turkish_Airlines_logo_2011.svg.png', rating: 4.5 },
  { name: 'Lufthansa', code: 'LH', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Lufthansa_Logo_2018.svg/200px-Lufthansa_Logo_2018.svg.png', rating: 4.3 },
  { name: 'British Airways', code: 'BA', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/British_Airways_Logo.svg/200px-British_Airways_Logo.svg.png', rating: 4.1 },
  { name: 'Air France', code: 'AF', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Air_France_Logo.svg/200px-Air_France_Logo.svg.png', rating: 4.0 },
  { name: 'Emirates', code: 'EK', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/200px-Emirates_logo.svg.png', rating: 4.6 },
  { name: 'Qatar Airways', code: 'QR', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Qatar_Airways_Logo.svg/200px-Qatar_Airways_Logo.svg.png', rating: 4.7 },
  { name: 'American Airlines', code: 'AA', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/American_Airlines_logo_2013.svg/200px-American_Airlines_logo_2013.svg.png', rating: 3.8 }
];

export const mockFlights: FlightResult[] = [
  {
    id: '1',
    price: 450,
    currency: 'USD',
    totalDuration: '4h 30m',
    segments: [
      {
        airline: 'אל על',
        airlineCode: 'LY',
        flightNumber: 'LY001',
        departure: {
          airport: 'תל אביב בן גוריון',
          airportCode: 'TLV',
          time: '08:00',
          date: '2025-02-15'
        },
        arrival: {
          airport: 'ניו יורק JFK',
          airportCode: 'JFK',
          time: '11:30',
          date: '2025-02-15'
        },
        duration: '4h 30m',
        stops: 0,
        aircraft: 'Boeing 787'
      }
    ],
    isDirect: true,
    totalStops: 0,
    departureDate: '2025-02-15',
    bookingUrl: 'https://www.elal.com',
    airlineLogos: ['https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/El_Al_logo.svg/200px-El_Al_logo.svg.png'],
    pricePerPerson: true,
    cabinClass: 'Economy',
    refundable: false,
    changeable: true,
    baggageIncluded: true
  },
  {
    id: '2',
    price: 380,
    currency: 'USD',
    totalDuration: '6h 15m',
    segments: [
      {
        airline: 'Turkish Airlines',
        airlineCode: 'TK',
        flightNumber: 'TK789',
        departure: {
          airport: 'תל אביב בן גוריון',
          airportCode: 'TLV',
          time: '14:30',
          date: '2025-02-15'
        },
        arrival: {
          airport: 'איסטנבול',
          airportCode: 'IST',
          time: '16:45',
          date: '2025-02-15'
        },
        duration: '2h 15m',
        stops: 0,
        aircraft: 'Airbus A321'
      },
      {
        airline: 'Turkish Airlines',
        airlineCode: 'TK',
        flightNumber: 'TK15',
        departure: {
          airport: 'איסטנבול',
          airportCode: 'IST',
          time: '18:30',
          date: '2025-02-15'
        },
        arrival: {
          airport: 'ניו יורק JFK',
          airportCode: 'JFK',
          time: '22:45',
          date: '2025-02-15'
        },
        duration: '4h 15m',
        stops: 0,
        aircraft: 'Boeing 777'
      }
    ],
    isDirect: false,
    totalStops: 1,
    departureDate: '2025-02-15',
    bookingUrl: 'https://www.turkishairlines.com',
    airlineLogos: ['https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Turkish_Airlines_logo_2011.svg/200px-Turkish_Airlines_logo_2011.svg.png'],
    pricePerPerson: true,
    cabinClass: 'Economy',
    refundable: true,
    changeable: true,
    baggageIncluded: true
  },
  {
    id: '3',
    price: 520,
    currency: 'USD',
    totalDuration: '5h 45m',
    segments: [
      {
        airline: 'Lufthansa',
        airlineCode: 'LH',
        flightNumber: 'LH680',
        departure: {
          airport: 'תל אביב בן גוריון',
          airportCode: 'TLV',
          time: '06:15',
          date: '2025-02-15'
        },
        arrival: {
          airport: 'מינכן',
          airportCode: 'MUC',
          time: '09:30',
          date: '2025-02-15'
        },
        duration: '3h 15m',
        stops: 0,
        aircraft: 'Airbus A320'
      },
      {
        airline: 'Lufthansa',
        airlineCode: 'LH',
        flightNumber: 'LH410',
        departure: {
          airport: 'מינכן',
          airportCode: 'MUC',
          time: '11:45',
          date: '2025-02-15'
        },
        arrival: {
          airport: 'ניו יורק JFK',
          airportCode: 'JFK',
          time: '15:00',
          date: '2025-02-15'
        },
        duration: '2h 30m',
        stops: 0,
        aircraft: 'Boeing 747'
      }
    ],
    isDirect: false,
    totalStops: 1,
    departureDate: '2025-02-15',
    bookingUrl: 'https://www.lufthansa.com',
    airlineLogos: ['https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Lufthansa_Logo_2018.svg/200px-Lufthansa_Logo_2018.svg.png'],
    pricePerPerson: true,
    cabinClass: 'Economy',
    refundable: false,
    changeable: false,
    baggageIncluded: false
  },
  {
    id: '4',
    price: 650,
    currency: 'USD',
    totalDuration: '7h 20m',
    segments: [
      {
        airline: 'British Airways',
        airlineCode: 'BA',
        flightNumber: 'BA164',
        departure: {
          airport: 'תל אביב בן גוריון',
          airportCode: 'TLV',
          time: '12:00',
          date: '2025-02-15'
        },
        arrival: {
          airport: 'לונדון היתרו',
          airportCode: 'LHR',
          time: '15:30',
          date: '2025-02-15'
        },
        duration: '3h 30m',
        stops: 0,
        aircraft: 'Boeing 787'
      },
      {
        airline: 'British Airways',
        airlineCode: 'BA',
        flightNumber: 'BA178',
        departure: {
          airport: 'לונדון היתרו',
          airportCode: 'LHR',
          time: '17:45',
          date: '2025-02-15'
        },
        arrival: {
          airport: 'ניו יורק JFK',
          airportCode: 'JFK',
          time: '21:20',
          date: '2025-02-15'
        },
        duration: '3h 50m',
        stops: 0,
        aircraft: 'Boeing 777'
      }
    ],
    isDirect: false,
    totalStops: 1,
    departureDate: '2025-02-15',
    bookingUrl: 'https://www.britishairways.com',
    airlineLogos: ['https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/British_Airways_Logo.svg/200px-British_Airways_Logo.svg.png'],
    pricePerPerson: true,
    cabinClass: 'Economy',
    refundable: true,
    changeable: true,
    baggageIncluded: true
  },
  {
    id: '5',
    price: 320,
    currency: 'USD',
    totalDuration: '8h 45m',
    segments: [
      {
        airline: 'Emirates',
        airlineCode: 'EK',
        flightNumber: 'EK958',
        departure: {
          airport: 'תל אביב בן גוריון',
          airportCode: 'TLV',
          time: '03:30',
          date: '2025-02-15'
        },
        arrival: {
          airport: 'דובאי',
          airportCode: 'DXB',
          time: '07:15',
          date: '2025-02-15'
        },
        duration: '3h 45m',
        stops: 0,
        aircraft: 'Airbus A380'
      },
      {
        airline: 'Emirates',
        airlineCode: 'EK',
        flightNumber: 'EK203',
        departure: {
          airport: 'דובאי',
          airportCode: 'DXB',
          time: '09:30',
          date: '2025-02-15'
        },
        arrival: {
          airport: 'ניו יורק JFK',
          airportCode: 'JFK',
          time: '15:15',
          date: '2025-02-15'
        },
        duration: '5h 15m',
        stops: 0,
        aircraft: 'Boeing 777'
      }
    ],
    isDirect: false,
    totalStops: 1,
    departureDate: '2025-02-15',
    bookingUrl: 'https://www.emirates.com',
    airlineLogos: ['https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/200px-Emirates_logo.svg.png'],
    pricePerPerson: true,
    cabinClass: 'Economy',
    refundable: false,
    changeable: true,
    baggageIncluded: true
  },
  {
    id: '6',
    price: 750,
    currency: 'USD',
    totalDuration: '4h 15m',
    segments: [
      {
        airline: 'אל על',
        airlineCode: 'LY',
        flightNumber: 'LY003',
        departure: {
          airport: 'תל אביב בן גוריון',
          airportCode: 'TLV',
          time: '22:00',
          date: '2025-02-15'
        },
        arrival: {
          airport: 'ניו יורק JFK',
          airportCode: 'JFK',
          time: '02:15',
          date: '2025-02-16'
        },
        duration: '4h 15m',
        stops: 0,
        aircraft: 'Boeing 787'
      }
    ],
    isDirect: true,
    totalStops: 0,
    departureDate: '2025-02-15',
    bookingUrl: 'https://www.elal.com',
    airlineLogos: ['https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/El_Al_logo.svg/200px-El_Al_logo.svg.png'],
    pricePerPerson: true,
    cabinClass: 'Business',
    refundable: true,
    changeable: true,
    baggageIncluded: true
  },
  {
    id: '7',
    price: 280,
    currency: 'USD',
    totalDuration: '9h 30m',
    segments: [
      {
        airline: 'Qatar Airways',
        airlineCode: 'QR',
        flightNumber: 'QR572',
        departure: {
          airport: 'תל אביב בן גוריון',
          airportCode: 'TLV',
          time: '01:45',
          date: '2025-02-15'
        },
        arrival: {
          airport: 'דוחה',
          airportCode: 'DOH',
          time: '05:30',
          date: '2025-02-15'
        },
        duration: '3h 45m',
        stops: 0,
        aircraft: 'Airbus A350'
      },
      {
        airline: 'Qatar Airways',
        airlineCode: 'QR',
        flightNumber: 'QR701',
        departure: {
          airport: 'דוחה',
          airportCode: 'DOH',
          time: '07:15',
          date: '2025-02-15'
        },
        arrival: {
          airport: 'ניו יורק JFK',
          airportCode: 'JFK',
          time: '13:15',
          date: '2025-02-15'
        },
        duration: '5h 45m',
        stops: 0,
        aircraft: 'Boeing 777'
      }
    ],
    isDirect: false,
    totalStops: 1,
    departureDate: '2025-02-15',
    bookingUrl: 'https://www.qatarairways.com',
    airlineLogos: ['https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Qatar_Airways_Logo.svg/200px-Qatar_Airways_Logo.svg.png'],
    pricePerPerson: true,
    cabinClass: 'Economy',
    refundable: true,
    changeable: true,
    baggageIncluded: true
  },
  {
    id: '8',
    price: 420,
    currency: 'USD',
    totalDuration: '6h 45m',
    segments: [
      {
        airline: 'Air France',
        airlineCode: 'AF',
        flightNumber: 'AF1620',
        departure: {
          airport: 'תל אביב בן גוריון',
          airportCode: 'TLV',
          time: '10:30',
          date: '2025-02-15'
        },
        arrival: {
          airport: 'פריז שארל דה גול',
          airportCode: 'CDG',
          time: '14:15',
          date: '2025-02-15'
        },
        duration: '3h 45m',
        stops: 0,
        aircraft: 'Airbus A320'
      },
      {
        airline: 'Air France',
        airlineCode: 'AF',
        flightNumber: 'AF008',
        departure: {
          airport: 'פריז שארל דה גול',
          airportCode: 'CDG',
          time: '16:30',
          date: '2025-02-15'
        },
        arrival: {
          airport: 'ניו יורק JFK',
          airportCode: 'JFK',
          time: '19:15',
          date: '2025-02-15'
        },
        duration: '3h 00m',
        stops: 0,
        aircraft: 'Boeing 787'
      }
    ],
    isDirect: false,
    totalStops: 1,
    departureDate: '2025-02-15',
    bookingUrl: 'https://www.airfrance.com',
    airlineLogos: ['https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Air_France_Logo.svg/200px-Air_France_Logo.svg.png'],
    pricePerPerson: true,
    cabinClass: 'Economy',
    refundable: false,
    changeable: true,
    baggageIncluded: false
  },
  {
    id: '9',
    price: 890,
    currency: 'USD',
    totalDuration: '4h 00m',
    segments: [
      {
        airline: 'אל על',
        airlineCode: 'LY',
        flightNumber: 'LY005',
        departure: {
          airport: 'תל אביב בן גוריון',
          airportCode: 'TLV',
          time: '16:00',
          date: '2025-02-15'
        },
        arrival: {
          airport: 'ניו יורק JFK',
          airportCode: 'JFK',
          time: '20:00',
          date: '2025-02-15'
        },
        duration: '4h 00m',
        stops: 0,
        aircraft: 'Boeing 787'
      }
    ],
    isDirect: true,
    totalStops: 0,
    departureDate: '2025-02-15',
    bookingUrl: 'https://www.elal.com',
    airlineLogos: ['https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/El_Al_logo.svg/200px-El_Al_logo.svg.png'],
    pricePerPerson: true,
    cabinClass: 'First',
    refundable: true,
    changeable: true,
    baggageIncluded: true
  },
  {
    id: '10',
    price: 310,
    currency: 'USD',
    totalDuration: '10h 15m',
    segments: [
      {
        airline: 'American Airlines',
        airlineCode: 'AA',
        flightNumber: 'AA1234',
        departure: {
          airport: 'תל אביב בן גוריון',
          airportCode: 'TLV',
          time: '02:00',
          date: '2025-02-15'
        },
        arrival: {
          airport: 'לונדון היתרו',
          airportCode: 'LHR',
          time: '05:30',
          date: '2025-02-15'
        },
        duration: '3h 30m',
        stops: 0,
        aircraft: 'Boeing 737'
      },
      {
        airline: 'American Airlines',
        airlineCode: 'AA',
        flightNumber: 'AA100',
        departure: {
          airport: 'לונדון היתרו',
          airportCode: 'LHR',
          time: '08:00',
          date: '2025-02-15'
        },
        arrival: {
          airport: 'ניו יורק JFK',
          airportCode: 'JFK',
          time: '11:15',
          date: '2025-02-15'
        },
        duration: '3h 15m',
        stops: 0,
        aircraft: 'Boeing 777'
      }
    ],
    isDirect: false,
    totalStops: 1,
    departureDate: '2025-02-15',
    bookingUrl: 'https://www.aa.com',
    airlineLogos: ['https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/American_Airlines_logo_2013.svg/200px-American_Airlines_logo_2013.svg.png'],
    pricePerPerson: true,
    cabinClass: 'Economy',
    refundable: false,
    changeable: false,
    baggageIncluded: false
  }
]; 