import React from 'react';
import { SearchCriteria } from '../types/flight.types';
import { useTranslation } from '../contexts/TranslationContext';

interface EmailSenderProps {
  searchCriteria: SearchCriteria;
  flights: any[];
}

export const EmailSender: React.FC<EmailSenderProps> = ({ searchCriteria, flights }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t } = useTranslation();

  const generateAgentPrompt = (criteria: SearchCriteria) => {
    const formatDate = (dateStr: string) => {
      const date = new Date(dateStr);
      return date.toLocaleDateString('he-IL', { 
        year: 'numeric', 
        month: 'long' 
      });
    };

    const getFlightTypeText = (flightType: string) => {
      switch (flightType) {
        case 'direct': return 'טיסות ישירות בלבד';
        case 'oneStop': return 'עד עצירה אחת';
        case 'twoStops': return 'עד שתי עצירות';
        case 'cheapest': return 'הכי זול (כל האפשרויות)';
        default: return flightType;
      }
    };

    const getBlockedDaysText = (blockedDays: string[]) => {
      if (blockedDays.length === 0) return 'אין מגבלות ימים';
      
      const dayNames = {
        'sunday': 'ראשון',
        'monday': 'שני', 
        'tuesday': 'שלישי',
        'wednesday': 'רביעי',
        'thursday': 'חמישי',
        'friday': 'שישי',
        'saturday': 'שבת'
      };
      
      return blockedDays.map(day => dayNames[day as keyof typeof dayNames]).join(', ');
    };

    const getAirlinesText = (airlines: string[]) => {
      if (airlines.length === 0) return 'כל חברות התעופה';
      return airlines.join(', ');
    };

    const prompt = `
# פרומפט לסוכן חכם - חיפוש טיסות מתקדם

## פרטי הטיסה המבוקשת

### מסלול הטיסה
* **מקור:** ${criteria.origin}
* **יעד:** ${criteria.destination}
* **סוג טיול:** ${criteria.tripType === 'roundTrip' ? 'הלוך-חזור' : 'חד כיוונית'}
* **שנת הטיסה:** ${new Date(criteria.departureDate).getFullYear()}

       ### תאריכי הטיסה
       ${criteria.departureDate ? `* **תאריך יציאה:** ${formatDate(criteria.departureDate)}` : ''}
       ${criteria.departureMonth ? `* **חודש יציאה:** ${criteria.departureMonth}` : ''}
       ${criteria.returnDate ? `* **תאריך חזרה:** ${formatDate(criteria.returnDate)}` : ''}
       ${criteria.returnMonth ? `* **חודש חזרה:** ${criteria.returnMonth}` : ''}
       ${criteria.tripDuration ? `* **משך השהייה:** ${criteria.tripDuration} ימים` : ''}
       ${criteria.durationFlexibility ? `* **גמישות משך:** ±${criteria.durationFlexibility} ימים` : ''}

### אסטרטגיית החיפוש
* **סוג טיסה:** ${getFlightTypeText(criteria.flightType)}
* **תקציב מקסימלי:** ${criteria.maxBudget} USD
* **מגבלת ימים:** ${getBlockedDaysText(criteria.blockedDays)}

### העדפות חברות תעופה
* **חברות מועדפות:** ${getAirlinesText(criteria.preferredAirlines)}
* **חברות חסומות:** ${getAirlinesText(criteria.blockedAirlines)}
* **אפשרות חברות מעורבות:** ${criteria.mixedAirlines ? 'כן' : 'לא'}

### עצירות ביניים
* **אפשרות עצירות:** ${criteria.stopovers.allowed ? 'כן' : 'לא'}
${criteria.stopovers.allowed ? `* **מקסימום ימי עצירה:** ${criteria.stopovers.maxDays} ימים` : ''}

## הנחיות לחיפוש

### קריטריונים עיקריים
1. **מחיר:** המחיר הוא השיקול הראשי - חפש את האפשרויות הזולות ביותר
2. **מגבלת תקציב:** לא לעלות על ${criteria.maxBudget} USD
3. **מגבלת ימים:** להימנע מטיסות בימים: ${getBlockedDaysText(criteria.blockedDays)}

### אסטרטגיית חיפוש מומלצת
1. **חפש בכל האתרים הבאים:**
   * Google Flights
   * Skyscanner
   * Kayak
   * Momondo
   * Kiwi.com (מתמחה בטיסות מחוברות)
   * אתרי חברות תעופה ישירים

2. **בדוק אפשרויות שונות:**
   * טיסות ישירות
   * טיסות עם עצירות ביניים
   * חברות תעופה שונות
   * תאריכים שונים בטווח הגמישות

### תוצאה מבוקשת
עבור כל אפשרות שתמצא, ספק:

#### פירוט מלא של המסלול:
1. **פרטי הטיסה:**
   * תאריך ושעת המראה/נחיתה
   * חברת תעופה ומספר טיסה
   * משך הטיסה
   * מספר עצירות
   * מחיר
   * לינק הזמנה

2. **סיכום לכל אפשרות:**
   * מחיר כולל
   * משך טיסה כולל
   * מספר עצירות
   * חברות התעופה
   * יתרונות וחסרונות

### הנחיות מיוחדות
1. **חפש לפחות 3-5 אפשרויות שונות**
2. **אם לא מוצא מתחת לתקציב - דווח על האפשרויות הזולות ביותר**
3. **בדוק משכי זמן בין טיסות - וודא שיש מספיק זמן לחיבורים**
4. **התייחס לעמלות נוספות (מזוודות, בחירת מקום)**
5. **ציין אם יש צורך בויזה ליעדי הביניים**

### פורמט נדרש לתוצאות
אחרי שתמצא את הטיסות, אנא ספק את הנתונים בפורמט הבא:

\`\`\`json
{
  "id": "מזהה ייחודי",
  "price": מספר_המחיר,
  "currency": "מטבע",
  "totalDuration": "משך_כולל_בשעות_ודקות",
  "segments": [
    {
      "airline": "שם_חברת_התעופה",
      "airlineCode": "קוד_חברת_התעופה",
      "flightNumber": "מספר_טיסה",
      "departure": {
        "airport": "שם_שדה_התעופה",
        "airportCode": "קוד_שדה_התעופה",
        "time": "שעת_יציאה_HH:MM",
        "date": "תאריך_יציאה_YYYY-MM-DD"
      },
      "arrival": {
        "airport": "שם_שדה_התעופה",
        "airportCode": "קוד_שדה_התעופה", 
        "time": "שעת_נחיתה_HH:MM",
        "date": "תאריך_נחיתה_YYYY-MM-DD"
      },
      "duration": "משך_טיסה_בשעות_ודקות",
      "stops": מספר_עצירות,
      "aircraft": "סוג_מטוס"
    }
  ],
  "isDirect": true/false,
  "totalStops": מספר_עצירות_כולל,
  "departureDate": "תאריך_יציאה_YYYY-MM-DD",
  "returnDate": "תאריך_חזרה_YYYY-MM-DD",
  "bookingUrl": "קישור_להזמנה",
  "airlineLogos": ["URL_ללוגו"],
  "pricePerPerson": true/false,
  "cabinClass": "מחלקת_כיסא",
  "refundable": true/false,
  "changeable": true/false,
  "baggageIncluded": true/false
}
\`\`\`

**חשוב:** וודא שכל הנתונים מדויקים וכוללים קישורי הזמנה פעילים.
`;

    return prompt;
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('הטקסט הועתק ללוח!');
    } catch (err) {
      console.error('שגיאה בהעתקה:', err);
      alert('שגיאה בהעתקה ללוח');
    }
  };

  const promptText = generateAgentPrompt(searchCriteria);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            📧 טקסט לשליחה לסוכן חכם
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            העתק את הטקסט הבא ושלח אותו לסוכן חכם כדי שיחפש עבורך את הטיסות הטובות ביותר
          </p>
        </div>
        
        <div className="p-6">
          <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 mb-4">
            <pre className="whitespace-pre-wrap text-sm text-slate-800 dark:text-slate-200 font-mono overflow-x-auto">
              {promptText}
            </pre>
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={() => copyToClipboard(promptText)}
              className="btn-primary flex items-center"
            >
              📋 העתק ללוח
            </button>
            
            <button
              onClick={() => {
                const emailSubject = `חיפוש טיסות: ${searchCriteria.origin} → ${searchCriteria.destination}`;
                const emailBody = encodeURIComponent(promptText);
                window.open(`mailto:?subject=${encodeURIComponent(emailSubject)}&body=${emailBody}`);
              }}
              className="btn-secondary flex items-center"
            >
              📧 פתח במייל
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 