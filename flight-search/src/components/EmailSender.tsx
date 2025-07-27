import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, AlertCircle, Download } from 'lucide-react';
import { SearchCriteria } from '../types/flight.types';

interface EmailSenderProps {
  searchCriteria: SearchCriteria;
  flights: any[];
  onClose: () => void;
}

export const EmailSender: React.FC<EmailSenderProps> = ({ 
  searchCriteria, 
  flights, 
  onClose 
}) => {
  const [isSending, setIsSending] = useState(true); // מתחיל עם שליחה
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const prepareEmailData = () => {
    const emailData = {
      searchCriteria,
      flights: flights.map(flight => ({
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
      totalResults: flights.length
    };

    return emailData;
  };

  // שליחת מייל אוטומטית בעת טעינת הקומפוננטה
  React.useEffect(() => {
    const sendEmail = async () => {
      setError(null);

      try {
        const emailData = prepareEmailData();
        
        // הדפסה לקונסול במקום שליחה אמיתית
        console.log('📧 שליחת מייל ל:', 'orenizriamazon@gmail.com');
        console.log('📋 נתוני המייל:', JSON.stringify(emailData, null, 2));
        
        // נדמה שליחה מוצלחת
        setTimeout(() => {
          setIsSent(true);
          console.log('✅ המייל נשלח בהצלחה!');
          setTimeout(() => {
            onClose();
          }, 3000);
        }, 2000);
        
      } catch (err) {
        console.error('❌ שגיאה בשליחת המייל:', err);
        setError('שגיאה בשליחת המייל');
      } finally {
        setIsSending(false);
      }
    };

    sendEmail();
  }, [onClose, prepareEmailData]);

  const downloadJSON = () => {
    const emailData = prepareEmailData();
    const dataStr = JSON.stringify(emailData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `flight-search-results-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        className="glass-card rounded-2xl p-8 max-w-md w-full"
      >
        {!isSent ? (
          <>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">שולח תוצאות למייל</h3>
              <p className="text-slate-600 dark:text-slate-400">
                שולח את כל פרטי החיפוש ותוצאות הטיסות ל: <strong>orenizriamazon@gmail.com</strong>
              </p>
              <p className="text-xs text-slate-500 mt-2">
                (בגרסה זו הנתונים מודפסים לקונסול במקום שליחה אמיתית)
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2">פרטי החיפוש:</h4>
                <div className="text-sm space-y-1">
                  <div><strong>מ:</strong> {searchCriteria.origin}</div>
                  <div><strong>אל:</strong> {searchCriteria.destination}</div>
                  <div><strong>תאריך:</strong> {searchCriteria.departureDate}</div>
                  <div><strong>תקציב:</strong> ${searchCriteria.maxBudget}</div>
                  <div><strong>תוצאות:</strong> {flights.length} טיסות</div>
                </div>
              </div>
            </div>

            {isSending && (
              <div className="flex items-center justify-center space-x-2 space-x-reverse">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-500" />
                <span>שולח למייל...</span>
              </div>
            )}
            
            <div className="flex space-x-3 space-x-reverse">
              <button
                onClick={downloadJSON}
                className="flex-1 px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-primary-300 transition-colors flex items-center justify-center"
              >
                <Download className="w-4 h-4 ml-1" />
                הורד JSON
              </button>
              <button
                onClick={onClose}
                className="flex-1 btn-primary flex items-center justify-center"
              >
                סגור
              </button>
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center space-x-2 space-x-reverse">
                <AlertCircle className="w-4 h-4 text-red-500" />
                <span className="text-sm text-red-600 dark:text-red-400">{error}</span>
              </div>
            )}
          </>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-green-600 dark:text-green-400">
              נשלח בהצלחה!
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              התוצאות נשלחו למייל orenizriamazon@gmail.com
            </p>
          </div>
        )}

        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
        >
          ✕
        </button>
      </motion.div>
    </motion.div>
  );
}; 