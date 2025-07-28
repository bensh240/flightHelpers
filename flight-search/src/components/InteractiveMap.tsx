import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useTranslation } from '../contexts/TranslationContext';

// תיקון לבעיית האייקונים של Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

interface City {
  name: string;
  code: string;
  country: string;
  lat: number;
  lng: number;
  airports?: string[];
  category: 'israel' | 'europe' | 'america' | 'asia' | 'middle-east' | 'africa' | 'oceania';
}

interface InteractiveMapProps {
  onCitySelect: (city: City) => void;
  selectedCity?: string;
}

// קומפוננטה לעדכון המרכז של המפה
function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ onCitySelect, selectedCity }) => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [mapCenter, setMapCenter] = useState<[number, number]>([31.7683, 35.2137]); // ישראל

  const cities: City[] = [
    // ישראל
    { name: 'תל אביב', code: 'TLV', country: 'ישראל', lat: 32.0853, lng: 34.7818, category: 'israel' },
    { name: 'ירושלים', code: 'JRS', country: 'ישראל', lat: 31.7683, lng: 35.2137, category: 'israel' },
    { name: 'חיפה', code: 'HFA', country: 'ישראל', lat: 32.7940, lng: 34.9896, category: 'israel' },
    { name: 'אילת', code: 'ETH', country: 'ישראל', lat: 29.5577, lng: 34.9519, category: 'israel' },

    // אירופה
    { name: 'לונדון', code: 'LON', country: 'בריטניה', lat: 51.5074, lng: -0.1278, category: 'europe' },
    { name: 'פריז', code: 'PAR', country: 'צרפת', lat: 48.8566, lng: 2.3522, category: 'europe' },
    { name: 'רומא', code: 'ROM', country: 'איטליה', lat: 41.9028, lng: 12.4964, category: 'europe' },
    { name: 'מילאנו', code: 'MIL', country: 'איטליה', lat: 45.4642, lng: 9.1900, category: 'europe' },
    { name: 'מדריד', code: 'MAD', country: 'ספרד', lat: 40.4168, lng: -3.7038, category: 'europe' },
    { name: 'ברצלונה', code: 'BCN', country: 'ספרד', lat: 41.3851, lng: 2.1734, category: 'europe' },
    { name: 'אמסטרדם', code: 'AMS', country: 'הולנד', lat: 52.3676, lng: 4.9041, category: 'europe' },
    { name: 'ברלין', code: 'BER', country: 'גרמניה', lat: 52.5200, lng: 13.4050, category: 'europe' },
    { name: 'מינכן', code: 'MUC', country: 'גרמניה', lat: 48.1351, lng: 11.5820, category: 'europe' },
    { name: 'פרנקפורט', code: 'FRA', country: 'גרמניה', lat: 50.1109, lng: 8.6821, category: 'europe' },
    { name: 'וינה', code: 'VIE', country: 'אוסטריה', lat: 48.2082, lng: 16.3738, category: 'europe' },
    { name: 'פראג', code: 'PRG', country: 'צ\'כיה', lat: 50.0755, lng: 14.4378, category: 'europe' },
    { name: 'בודפשט', code: 'BUD', country: 'הונגריה', lat: 47.4979, lng: 19.0402, category: 'europe' },
    { name: 'ורשה', code: 'WAW', country: 'פולין', lat: 52.2297, lng: 21.0122, category: 'europe' },

    // צפון אמריקה
    { name: 'ניו יורק', code: 'NYC', country: 'ארה"ב', lat: 40.7128, lng: -74.0060, category: 'america' },
    { name: 'לוס אנג\'לס', code: 'LAX', country: 'ארה"ב', lat: 34.0522, lng: -118.2437, category: 'america' },
    { name: 'שיקגו', code: 'CHI', country: 'ארה"ב', lat: 41.8781, lng: -87.6298, category: 'america' },
    { name: 'מיאמי', code: 'MIA', country: 'ארה"ב', lat: 25.7617, lng: -80.1918, category: 'america' },
    { name: 'טורונטו', code: 'YYZ', country: 'קנדה', lat: 43.6532, lng: -79.3832, category: 'america' },
    { name: 'מונטריאול', code: 'YUL', country: 'קנדה', lat: 45.5017, lng: -73.5673, category: 'america' },
    { name: 'ונקובר', code: 'YVR', country: 'קנדה', lat: 49.2827, lng: -123.1207, category: 'america' },

    // אסיה
    { name: 'טוקיו', code: 'TYO', country: 'יפן', lat: 35.6762, lng: 139.6503, category: 'asia' },
    { name: 'בנגקוק', code: 'BKK', country: 'תאילנד', lat: 13.7563, lng: 100.5018, category: 'asia' },
    { name: 'סינגפור', code: 'SIN', country: 'סינגפור', lat: 1.3521, lng: 103.8198, category: 'asia' },
    { name: 'הונג קונג', code: 'HKG', country: 'הונג קונג', lat: 22.3193, lng: 114.1694, category: 'asia' },
    { name: 'סיאול', code: 'SEL', country: 'דרום קוריאה', lat: 37.5665, lng: 126.9780, category: 'asia' },
    { name: 'בייג\'ינג', code: 'PEK', country: 'סין', lat: 39.9042, lng: 116.4074, category: 'asia' },
    { name: 'שנחאי', code: 'SHA', country: 'סין', lat: 31.2304, lng: 121.4737, category: 'asia' },
    { name: 'מומבאי', code: 'BOM', country: 'הודו', lat: 19.0760, lng: 72.8777, category: 'asia' },
    { name: 'דלהי', code: 'DEL', country: 'הודו', lat: 28.7041, lng: 77.1025, category: 'asia' },

    // המזרח התיכון
    { name: 'דובאי', code: 'DXB', country: 'איחוד האמירויות', lat: 25.2048, lng: 55.2708, category: 'middle-east' },
    { name: 'אבו דאבי', code: 'AUH', country: 'איחוד האמירויות', lat: 24.4539, lng: 54.3773, category: 'middle-east' },
    { name: 'דוחה', code: 'DOH', country: 'קטר', lat: 25.2854, lng: 51.5310, category: 'middle-east' },
    { name: 'ריאד', code: 'RUH', country: 'ערב הסעודית', lat: 24.7136, lng: 46.6753, category: 'middle-east' },
    { name: 'ג\'דה', code: 'JED', country: 'ערב הסעודית', lat: 21.4858, lng: 39.1925, category: 'middle-east' },
    { name: 'איסטנבול', code: 'IST', country: 'טורקיה', lat: 41.0082, lng: 28.9784, category: 'middle-east' },
    { name: 'אנקרה', code: 'ESB', country: 'טורקיה', lat: 39.9334, lng: 32.8597, category: 'middle-east' },

    // אפריקה
    { name: 'קהיר', code: 'CAI', country: 'מצרים', lat: 30.0444, lng: 31.2357, category: 'africa' },
    { name: 'יוהנסבורג', code: 'JNB', country: 'דרום אפריקה', lat: -26.2041, lng: 28.0473, category: 'africa' },
    { name: 'קזבלנקה', code: 'CMN', country: 'מרוקו', lat: 33.5731, lng: -7.5898, category: 'africa' },

    // אוקיאניה
    { name: 'סידני', code: 'SYD', country: 'אוסטרליה', lat: -33.8688, lng: 151.2093, category: 'oceania' },
    { name: 'מלבורן', code: 'MEL', country: 'אוסטרליה', lat: -37.8136, lng: 144.9631, category: 'oceania' },
    { name: 'אוקלנד', code: 'AKL', country: 'ניו זילנד', lat: -36.8485, lng: 174.7633, category: 'oceania' }
  ];

  const categories = [
    { id: 'all', name: 'כל הערים', color: 'bg-slate-500' },
    { id: 'israel', name: 'ישראל', color: 'bg-blue-500' },
    { id: 'europe', name: 'אירופה', color: 'bg-green-500' },
    { id: 'america', name: 'אמריקה', color: 'bg-red-500' },
    { id: 'asia', name: 'אסיה', color: 'bg-yellow-500' },
    { id: 'middle-east', name: 'המזרח התיכון', color: 'bg-purple-500' },
    { id: 'africa', name: 'אפריקה', color: 'bg-orange-500' },
    { id: 'oceania', name: 'אוקיאניה', color: 'bg-pink-500' }
  ];

  const filteredCities = selectedCategory === 'all' 
    ? cities 
    : cities.filter(city => city.category === selectedCategory);

  const handleCityClick = (city: City) => {
    onCitySelect(city);
    setMapCenter([city.lat, city.lng]);
  };

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.color.replace('bg-', '') : 'slate';
  };

  return (
    <div className="w-full">
      {/* Category Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          {t('filter.by.region')}
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                selectedCategory === category.id
                  ? `${category.color} text-white`
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="relative h-96 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
        <MapContainer
          center={mapCenter}
          zoom={4}
          style={{ height: '100%', width: '100%' }}
          className="z-0"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {filteredCities.map((city) => (
            <Marker
              key={city.code}
              position={[city.lat, city.lng]}
              eventHandlers={{
                click: () => handleCityClick(city)
              }}
            >
              <Popup>
                <div className="text-center">
                  <h3 className="font-bold text-lg">{city.name}</h3>
                  <p className="text-sm text-slate-600">{city.country}</p>
                  <p className="text-xs text-slate-500">קוד: {city.code}</p>
                  <button
                    onClick={() => handleCityClick(city)}
                    className="mt-2 px-3 py-1 bg-primary-500 text-white rounded-lg text-sm hover:bg-primary-600 transition-colors"
                  >
                    {t('select.city')}
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
          
          <MapUpdater center={mapCenter} />
        </MapContainer>
      </div>

      {/* Selected City Info */}
      {selectedCity && (
        <div className="mt-4 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800">
                  <h3 className="font-medium text-primary-900 dark:text-primary-100">
          {t('selected.city')} {selectedCity}
        </h3>
        </div>
      )}
    </div>
  );
}; 