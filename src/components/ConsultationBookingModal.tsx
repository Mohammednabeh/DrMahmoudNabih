import React, { useState, useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  X, 
  MapPin, 
  ShieldCheck, 
  AlertCircle,
  Stethoscope,
  Send,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

export const ConsultationBookingModal: React.FC = () => {
  const { 
    language, 
    siteSettings, 
    isBookingModalOpen, 
    setIsBookingModalOpen,
    bookingServiceType
  } = useCMS();

  const isEn = language === 'en';

  const services = [
    {
      id: 'cupping',
      titleAr: 'جلسة حجامة طبية معقمة (رطبة / جافة)',
      titleEn: 'Sterile Medical Cupping Session (Wet / Dry)',
      descAr: 'تطبيق الإجراء بأعلى معايير مكافحة العدوى والتعقيم الفردي لتنشيط الدورة الدموية وتخفيف التوتر العضلي.',
      descEn: 'Aseptic medical procedure following SCFHS infection control standards.'
    },
    {
      id: 'spine',
      titleAr: 'استشارة وتأهيل آلام العمود الفقري وأسفل الظهر',
      titleEn: 'Spine & Low Back Pain Consultation',
      descAr: 'تقييم سريري وميكانيكي متكامل لمشاكل الفقرات، الانزلاق الغضروفي، وتيبس الرقبة والكتفين.',
      descEn: 'Comprehensive musculoskeletal evaluation and rehabilitation planning.'
    },
    {
      id: 'sports',
      titleAr: 'تأهيل الإصابات الرياضية والعلاج الطبيعي',
      titleEn: 'Sports Injury & Physical Therapy Rehab',
      descAr: 'برامج تأهيلية متقدمة لاستعادة المدى الحركي وعلاج إصابات الملاعب والأوتار والمفاصل.',
      descEn: 'Targeted recovery protocols for athletes and musculoskeletal strain.'
    },
    {
      id: 'general',
      titleAr: 'استشارة وقائية وتقييم سريري عام',
      titleEn: 'Preventive Consultation & General Assessment',
      descAr: 'فحص العلامات الحيوية، مراجعة التاريخ الصحي، وتحديد مدى ملاءمة الحجامة والتمارين لحالتك.',
      descEn: 'Health status assessment and contraindication screening.'
    }
  ];

  const [selectedService, setSelectedService] = useState<string>(services[0].id);
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState(isEn ? 'Evening (4:00 PM - 9:00 PM)' : 'الفترة المسائية (4:00 م - 9:00 م)');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (bookingServiceType) {
      const match = services.find(s => s.id === bookingServiceType || s.titleAr.includes(bookingServiceType) || s.titleEn.includes(bookingServiceType));
      if (match) {
        setSelectedService(match.id);
      }
    }
  }, [bookingServiceType, isBookingModalOpen]);

  if (!isBookingModalOpen) return null;

  // Clean phone digits for WhatsApp URL
  const rawPhone = siteSettings.whatsappPhone || siteSettings.contactPhone || '+966 54 083 2104';
  const cleanPhone = rawPhone.replace(/\D/g, '');

  const handleWhatsAppBooking = (e: React.FormEvent) => {
    e.preventDefault();

    const currentServiceObj = services.find(s => s.id === selectedService) || services[0];
    const serviceName = isEn ? currentServiceObj.titleEn : currentServiceObj.titleAr;

    const messageLines = isEn ? [
      `Hello Dr. Mahmoud, I would like to inquire about booking a consultation.`,
      ``,
      `*Medical Consultation & Appointment Request*`,
      `━━━━━━━━━━━━━━━━━━━━━━`,
      `👨‍⚕️ *Doctor:* Dr. Mahmoud Ali Nabih`,
      `🏥 *Center:* Al-Dawaa Cupping Center, Dammam`,
      ``,
      `📋 *Service Requested:* ${serviceName}`,
      `👤 *Patient Name:* ${patientName || 'Not provided'}`,
      `📱 *Contact Phone:* ${patientPhone || 'Not provided'}`,
      `📅 *Preferred Date:* ${preferredDate || 'Earliest available'}`,
      `⏰ *Preferred Time:* ${preferredTime}`,
      notes ? `💬 *Health Notes / Symptoms:* ${notes}` : '',
      ``,
      `_Sent via Dr. Mahmoud Ali Nabih Professional Website_`
    ] : [
      `السلام عليكم ورحمة الله و بركاته دكتور محمود، أود الاستفسار عن حجز استشارة.`,
      ``,
      `*طلب حجز استشارة وموعد طبي*`,
      `━━━━━━━━━━━━━━━━━━━━━━`,
      `👨‍⚕️ *الدكتور:* د. محمود علي نبيه عبد الغني`,
      `🏥 *العيادة:* مجمع عيادات الدواء الأمثل للحجامة - الدمام`,
      ``,
      `📋 *الخدمة المطلوبة:* ${serviceName}`,
      `👤 *اسم المراجع:* ${patientName || 'لم يُحدد'}`,
      `📱 *رقم الجوال:* ${patientPhone || 'لم يُحدد'}`,
      `📅 *اليوم المفضل:* ${preferredDate || 'أقرب موعد متاح'}`,
      `⏰ *الوقت المفضل:* ${preferredTime}`,
      notes ? `💬 *ملاحظات صحية / الشكوى:* ${notes}` : '',
      ``,
      `_مرسل عبر الموقع المهني الرسمي للدكتور محمود علي نبيه_`
    ];

    const encodedMessage = encodeURIComponent(messageLines.filter(Boolean).join('\n'));
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;

    setIsSuccess(true);
    setTimeout(() => {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div 
        id="consultation-booking-modal"
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden flex flex-col my-auto max-h-[92vh]"
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-blue-900 to-slate-900 text-white flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
              <Stethoscope className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">
                  {isEn ? 'Book a Medical Consultation' : 'حجز استشارة وموعد طبي'}
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-300 border border-emerald-500/40">
                  {isEn ? 'Direct WhatsApp' : 'واتساب مباشر'}
                </span>
              </div>
              <p className="text-xs text-blue-200/90 mt-0.5 font-medium">
                {isEn ? 'Dr. Mahmoud Ali Nabih — Al-Dawaa Cupping Center' : 'د. محمود علي نبيه — مجمع عيادات الدواء الأمثل بالدمام'}
              </p>
            </div>
          </div>

          <button
            id="close-booking-modal-btn"
            onClick={() => setIsBookingModalOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Quick Notice Banner */}
          <div className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-200 text-blue-900 text-xs flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0" />
            <p className="leading-relaxed">
              {isEn 
                ? 'Your request connects directly to Dr. Mahmoud on verified WhatsApp: ' 
                : 'سيتم تحويل طلبك مباشرة للمحادثة مع الدكتور محمود عبر الواتساب المعتمد: '}
              <strong className="font-mono text-blue-950 font-bold" dir="ltr">{rawPhone}</strong>
            </p>
          </div>

          {isSuccess ? (
            <div className="py-8 text-center space-y-4 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-slate-900">
                  {isEn ? 'Opening WhatsApp Chat...' : 'جاري فتح محادثة الواتساب...'}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                  {isEn 
                    ? 'Your consultation request has been prepared and formatted. You will be redirected to WhatsApp to confirm with Dr. Mahmoud.' 
                    : 'تم تجهيز وتنسيق بيانات استشارتك بدقة. سيتم نقلك إلى تطبيق الواتساب لإرسالها مباشرة للدكتور محمود.'}
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
                <a
                  href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                    isEn ? 'Hello Dr. Mahmoud, I would like to inquire about booking a consultation.' : 'السلام عليكم ورحمة الله و بركاته دكتور محمود، أود الاستفسار عن حجز استشارة.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{isEn ? 'Open WhatsApp Again' : 'فتح الواتساب مجدداً'}</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
                <button
                  onClick={() => {
                    setIsSuccess(false);
                    setIsBookingModalOpen(false);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                >
                  {isEn ? 'Close Window' : 'إغلاق النافذة'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleWhatsAppBooking} className="space-y-5">
              
              {/* Service Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Stethoscope className="w-3.5 h-3.5 text-blue-600" />
                  <span>{isEn ? 'Select Consultation / Service Type *' : 'اختر نوع الاستشارة أو الجلسة المطلوبة *'}</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {services.map(svc => {
                    const isSelected = selectedService === svc.id;
                    return (
                      <button
                        key={svc.id}
                        type="button"
                        onClick={() => setSelectedService(svc.id)}
                        className={`text-start p-3 rounded-2xl border transition-all text-xs cursor-pointer ${
                          isSelected 
                            ? 'border-blue-600 bg-blue-50/70 shadow-2xs text-blue-950 font-bold' 
                            : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="leading-snug">{isEn ? svc.titleEn : svc.titleAr}</span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 ms-1.5" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Patient Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-slate-500" />
                    <span>{isEn ? 'Full Name *' : 'الاسم الكريم *'}</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder={isEn ? "e.g. Mohammed Al-Otaibi" : "مثال: عبد الله السعيد"}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-500" />
                    <span>{isEn ? 'Mobile / WhatsApp Number *' : 'رقم الجوال / الواتساب *'}</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    placeholder="05xxxxxxxx"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all font-mono"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Date & Time Preferences */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>{isEn ? 'Preferred Date' : 'اليوم المفضل'}</span>
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>{isEn ? 'Preferred Time Slot' : 'الوقت المفضل'}</span>
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                  >
                    <option value={isEn ? "Evening (4:00 PM - 9:00 PM)" : "الفترة المسائية (4:00 م - 9:00 م)"}>
                      {isEn ? "Evening (4:00 PM - 9:00 PM)" : "الفترة المسائية (4:00 م - 9:00 م)"}
                    </option>
                    <option value={isEn ? "Morning (9:00 AM - 1:00 PM)" : "الفترة الصباحية (9:00 ص - 1:00 م)"}>
                      {isEn ? "Morning (9:00 AM - 1:00 PM)" : "الفترة الصباحية (9:00 ص - 1:00 م)"}
                    </option>
                    <option value={isEn ? "Any convenient time" : "أي وقت مناسب للدكتور"}>
                      {isEn ? "Any convenient time" : "أي وقت مناسب للدكتور"}
                    </option>
                  </select>
                </div>
              </div>

              {/* Brief Health Notes */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  {isEn ? 'Brief Symptoms or Health Notes (Optional)' : 'وصف موجز للشكوى أو الأعراض (اختياري)'}
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={isEn ? "e.g. Chronic neck pain, previous disc surgery, cupping session inquiry..." : "مثال: ألم أسفل الظهر منذ شهر، تيبس الرقبة، أو استفسار عن مواعيد الحجامة..."}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all resize-none"
                />
              </div>

              {/* Clinic Location Footnote */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                  <span className="font-semibold">
                    {isEn ? 'Al-Dawaa Cupping Center — Dammam, Saudi Arabia' : 'مركز الدواء الأمثل للحجامة — الدمام، المملكة العربية السعودية'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <button
                  type="submit"
                  id="submit-whatsapp-booking-btn"
                  className="flex-1 py-3 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>{isEn ? 'Confirm & Send to WhatsApp' : 'تأكيد وحجز الموعد عبر الواتساب'}</span>
                </button>

                <a
                  href={`tel:${rawPhone}`}
                  className="py-3 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-2 text-center"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-600" />
                  <span>{isEn ? 'Direct Call' : 'اتصال مباشر'}</span>
                </a>
              </div>

            </form>
          )}

        </div>
      </div>
    </div>
  );
};
