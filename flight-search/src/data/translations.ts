import { TranslationData } from '../types/translation.types';

export const translations: TranslationData = {
  // Header
  'app.title': {
    he: 'חיפוש טיסות',
    en: 'Flight Search'
  },
  'dark.mode': {
    he: 'מצב כהה',
    en: 'Dark Mode'
  },
  'light.mode': {
    he: 'מצב בהיר',
    en: 'Light Mode'
  },

  // Form Steps
  'step.basic': {
    he: 'יעד ומוצא',
    en: 'Destination & Origin'
  },
  'step.preferences': {
    he: 'העדפות',
    en: 'Preferences'
  },
  'step.advanced': {
    he: 'מתקדם',
    en: 'Advanced'
  },

  // Basic Form
  'destination': {
    he: 'יעד',
    en: 'Destination'
  },
  'destination.placeholder': {
    he: 'איפה אתה רוצה לטוס?',
    en: 'Where do you want to fly?'
  },
  'origin': {
    he: 'מוצא',
    en: 'Origin'
  },
  'origin.placeholder': {
    he: 'מאיפה אתה יוצא?',
    en: 'Where are you departing from?'
  },
  'use.location': {
    he: 'השתמש במיקום הנוכחי',
    en: 'Use Current Location'
  },
  'trip.type': {
    he: 'סוג טיול',
    en: 'Trip Type'
  },
  'one.way': {
    he: 'כיוון אחד',
    en: 'One Way'
  },
  'round.trip': {
    he: 'הלוך ושוב',
    en: 'Round Trip'
  },
  'departure.date': {
    he: 'תאריך יציאה',
    en: 'Departure Date'
  },
  'return.date': {
    he: 'תאריך חזרה',
    en: 'Return Date'
  },
  'date.flexibility': {
    he: 'גמישות תאריכים',
    en: 'Date Flexibility'
  },
  'days': {
    he: 'ימים',
    en: 'Days'
  },

  // Flight Preferences
  'flight.type': {
    he: 'סוג טיסה מועדף',
    en: 'Preferred Flight Type'
  },
  'direct': {
    he: 'ישירה',
    en: 'Direct'
  },
  'one.stop': {
    he: 'עצירה אחת',
    en: '1 Stop'
  },
  'two.stops': {
    he: 'שתי עצירות',
    en: '2 Stops'
  },
  'cheapest': {
    he: 'הזולה ביותר',
    en: 'Cheapest'
  },
  'send.to.agent': {
    he: 'שלח לסוכן חכם',
    en: 'Send to Smart Agent'
  },
  'hide': {
    he: 'הסתר',
    en: 'Hide'
  },
  'max.budget': {
    he: 'תקציב מקסימלי',
    en: 'Max Budget'
  },
  'trip.duration': {
    he: 'משך טיול',
    en: 'Trip Duration'
  },
  'duration.flexibility': {
    he: 'גמישות משך',
    en: 'Duration Flexibility'
  },
  'weeks': {
    he: 'שבועות',
    en: 'Weeks'
  },

  // Advanced Preferences
  'blocked.days': {
    he: 'ימים חסומים',
    en: 'Blocked Days'
  },
  'preferred.airlines': {
    he: 'חברות תעופה מועדפות',
    en: 'Preferred Airlines'
  },
  'blocked.airlines': {
    he: 'חברות תעופה חסומות',
    en: 'Blocked Airlines'
  },
  'mixed.airlines': {
    he: 'חברות מעורבות',
    en: 'Mixed Airlines'
  },
  'stopovers': {
    he: 'עצירות',
    en: 'Stopovers'
  },
  'stopovers.allowed': {
    he: 'עצירות מותרות',
    en: 'Stopovers Allowed'
  },
  'max.stopover.days': {
    he: 'מקסימום ימי עצירה',
    en: 'Max Stopover Days'
  },

  // Buttons
  'search.flights': {
    he: 'חפש טיסות',
    en: 'Search Flights'
  },
  'back.to.search': {
    he: 'חזור לחיפוש',
    en: 'Back to Search'
  },
  'next': {
    he: 'הבא',
    en: 'Next'
  },
  'previous': {
    he: 'קודם',
    en: 'Previous'
  },
  'filters': {
    he: 'פילטרים',
    en: 'Filters'
  },
  'sort.by': {
    he: 'מיון לפי',
    en: 'Sort By'
  },
  'price': {
    he: 'מחיר',
    en: 'Price'
  },
  'duration': {
    he: 'משך',
    en: 'Duration'
  },
  'stops': {
    he: 'עצירות',
    en: 'Stops'
  },
  'book.now': {
    he: 'הזמן עכשיו',
    en: 'Book Now'
  },
  'total.duration': {
    he: 'סה"כ',
    en: 'Total'
  },
  'per.person': {
    he: 'לאדם',
    en: 'per person'
  },
  'per.ticket': {
    he: 'לכרטיס',
    en: 'per ticket'
  },
  'refundable': {
    he: 'החזר כספי',
    en: 'Refundable'
  },
  'changeable': {
    he: 'שינוי',
    en: 'Changeable'
  },
  'baggage': {
    he: 'כבודה',
    en: 'Baggage'
  },

  // Results
  'results.found': {
    he: 'תוצאות נמצאו',
    en: 'Results Found'
  },
  'no.results': {
    he: 'לא נמצאו תוצאות',
    en: 'No Results Found'
  },
  'loading': {
    he: 'טוען...',
    en: 'Loading...'
  },

  // Popular Destinations
  'popular.destinations': {
    he: 'יעדים פופולריים',
    en: 'Popular Destinations'
  },

  // Airlines
  'all.airlines': {
    he: 'כל החברות',
    en: 'All Airlines'
  },

  // Cabin Classes
  'economy': {
    he: 'כלכלי',
    en: 'Economy'
  },
  'business': {
    he: 'עסקי',
    en: 'Business'
  },
  'first.class': {
    he: 'מחלקה ראשונה',
    en: 'First Class'
  },

  // Error Messages
  'required.origin': {
    he: 'נדרש להזין מוצא',
    en: 'Origin is required'
  },
  'required.destination': {
    he: 'נדרש להזין יעד',
    en: 'Destination is required'
  },
  'required.departure.date': {
    he: 'נדרש להזין תאריך הלוך',
    en: 'Departure date is required'
  },
  'required.return.date': {
    he: 'נדרש להזין תאריך חזור',
    en: 'Return date is required'
  },

  // Additional Form Labels
  'yes': {
    he: 'כן',
    en: 'Yes'
  },
  'no': {
    he: 'לא',
    en: 'No'
  },
  'no.flexibility': {
    he: 'ללא גמישות',
    en: 'No Flexibility'
  },
  'max.flexibility': {
    he: 'גמישות מקסימלית',
    en: 'Maximum Flexibility'
  },
  'one.day': {
    he: 'יום אחד',
    en: 'One Day'
  },
  'one.month': {
    he: 'חודש',
    en: 'One Month'
  },

  // Trip Types
  'one.way.only': {
    he: 'הלוך בלבד',
    en: 'One Way Only'
  },
  'round.trip.only': {
    he: 'הלוך וחזור',
    en: 'Round Trip Only'
  },
  'one.way.description': {
    he: 'טיסה בכיוון אחד',
    en: 'One-way flight'
  },
  'round.trip.description': {
    he: 'טיסה הלוך וחזור',
    en: 'Round-trip flight'
  },

  // Flight Types
  'direct.only': {
    he: 'טיסה ישירה בלבד',
    en: 'Direct Only'
  },
  'no.stops': {
    he: 'ללא עצירות ביניים',
    en: 'No layovers'
  },
  'one.connection': {
    he: 'עד קונקשן אחד',
    en: 'Up to 1 connection'
  },
  'one.stop.only': {
    he: 'עצירה אחת בלבד',
    en: 'One stop only'
  },
  'two.connections': {
    he: 'עד 2 קונקשנים',
    en: 'Up to 2 connections'
  },
  'up.to.two.stops': {
    he: 'עד שתי עצירות',
    en: 'Up to two stops'
  },
  'dont.care': {
    he: 'לא משנה (הכי זול)',
    en: 'Don\'t care (cheapest)'
  },
  'all.options': {
    he: 'כל האפשרויות',
    en: 'All options'
  },

  // Week Days
  'sunday': {
    he: 'ראשון',
    en: 'Sunday'
  },
  'monday': {
    he: 'שני',
    en: 'Monday'
  },
  'tuesday': {
    he: 'שלישי',
    en: 'Tuesday'
  },
  'wednesday': {
    he: 'רביעי',
    en: 'Wednesday'
  },
  'thursday': {
    he: 'חמישי',
    en: 'Thursday'
  },
  'friday': {
    he: 'שישי',
    en: 'Friday'
  },
  'saturday': {
    he: 'שבת',
    en: 'Saturday'
  },

  // Popular Cities
  'tel.aviv': {
    he: 'תל אביב',
    en: 'Tel Aviv'
  },
  'new.york': {
    he: 'ניו יורק',
    en: 'New York'
  },
  'london': {
    he: 'לונדון',
    en: 'London'
  },
  'paris': {
    he: 'פריז',
    en: 'Paris'
  },

  // Countries
  'israel': {
    he: 'ישראל',
    en: 'Israel'
  },
  'usa': {
    he: 'ארה"ב',
    en: 'USA'
  },
  'uk': {
    he: 'בריטניה',
    en: 'UK'
  },
  'france': {
    he: 'צרפת',
    en: 'France'
  }
}; 