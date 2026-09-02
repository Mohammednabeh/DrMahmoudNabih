import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { MessageCircle, Calendar, X, ExternalLink, ShieldCheck } from 'lucide-react';

export const FloatingWhatsAppButton: React.FC = () => {
  const { language, siteSettings, openBookingModal } = useCMS();
  const isEn = language === 'en';
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const rawPhone = siteSettings.whatsappPhone || siteSettings.contactPhone || '+966 54 083 2104';
  const cleanPhone = rawPhone.replace(/\D/g, '');

  const defaultMsg = isEn
    ? 'Hello Dr. Mahmoud, I would like to inquire about booking a consultation.'
    : 'السلام عليكم ورحمة الله و بركاته دكتور محمود، أود الاستفسار عن حجز استشارة.';

  const directWhatsAppUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(defaultMsg)}`;

  return (
    <div className="fixed bottom-5 end-5 z-40 flex flex-col items-end gap-2 print:hidden">
      
      {/* Quick Menu Popup */}
      {isOpenMenu && (
        <div 
          id="whatsapp-quick-popup"
          className="w-72 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden mb-1 animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          {/* Header */}
          <div className="p-4 bg-emerald-600 text-white flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-xs font-bold leading-tight">
                  {isEn ? 'Dr. Mahmoud Ali Nabih' : 'د. محمود علي نبيه'}
                </h4>
                <p className="text-[10px] text-emerald-100 font-medium">
                  {isEn ? 'Direct WhatsApp & Booking' : 'واتساب مباشر وحجز استشارات'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpenMenu(false)}
              className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-3.5 space-y-2 bg-slate-50">
            <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-[11px] text-slate-600 leading-relaxed">
              {isEn 
                ? 'Welcome! You can chat directly with Dr. Mahmoud on WhatsApp or fill out the booking form for your appointment.' 
                : 'أهلاً بك! يمكنك بدء محادثة مباشرة مع الدكتور محمود عبر الواتساب أو تحديد موعد استشارتك.'}
            </div>

            {/* Action 1: Book Consultation Modal */}
            <button
              onClick={() => {
                setIsOpenMenu(false);
                openBookingModal();
              }}
              className="w-full p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>{isEn ? 'Book a Consultation' : 'حجز استشارة وموعد طبي'}</span>
            </button>

            {/* Action 2: Direct WhatsApp Chat */}
            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{isEn ? 'Direct WhatsApp Chat' : 'محادثة واتساب مباشرة'}</span>
              <ExternalLink className="w-3 h-3 opacity-80" />
            </a>

            <div className="text-center pt-1">
              <span className="text-[10px] text-slate-400 font-mono" dir="ltr">
                {rawPhone}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <div className="flex items-center gap-2">
        {!isOpenMenu && (
          <span className="hidden sm:inline-block px-3 py-1.5 rounded-full bg-slate-900/90 text-white text-xs font-bold shadow-lg backdrop-blur-xs border border-white/20 animate-in fade-in slide-in-from-end-2">
            {isEn ? 'WhatsApp Consultation' : 'حجز واستشارة واتساب'}
          </span>
        )}

        <button
          type="button"
          id="floating-whatsapp-btn"
          onClick={() => setIsOpenMenu(!isOpenMenu)}
          aria-label={isEn ? "WhatsApp Consultation" : "حجز واستشارة واتساب"}
          className="relative w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white shadow-xl shadow-emerald-500/30 flex items-center justify-center transition-all transform hover:scale-105 cursor-pointer"
        >
          {/* Pulse ring */}
          <span className="absolute -inset-1 rounded-full bg-emerald-400/40 animate-ping pointer-events-none" />
          
          {isOpenMenu ? (
            <X className="w-7 h-7 relative z-10" />
          ) : (
            <MessageCircle className="w-7 h-7 relative z-10 fill-white stroke-emerald-500" />
          )}

          {/* Active online dot */}
          <span className="absolute top-1 end-1 w-3.5 h-3.5 rounded-full bg-white border-2 border-emerald-500 z-20 flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
          </span>
        </button>
      </div>

    </div>
  );
};
