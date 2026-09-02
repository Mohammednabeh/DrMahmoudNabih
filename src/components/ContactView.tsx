import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Building2, 
  Clock, 
  ShieldCheck, 
  Calendar, 
  MessageSquare, 
  Sparkles,
  MessageCircle,
  ExternalLink
} from 'lucide-react';

export const ContactView: React.FC = () => {
  const { language, siteSettings, openBookingModal } = useCMS();
  const isEn = language === 'en';

  const rawPhone = siteSettings.whatsappPhone || siteSettings.contactPhone || '+966 54 083 2104';
  const cleanPhone = rawPhone.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    isEn ? 'Hello Dr. Mahmoud, I would like to inquire about booking a consultation.' : 'السلام عليكم ورحمة الله و بركاته دكتور محمود، أود الاستفسار عن حجز استشارة.'
  )}`;

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: isEn ? 'Professional Collaboration' : 'استفسار مهني',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider">
          <PhoneCall className="w-4 h-4 text-blue-600" />
          <span>{isEn ? 'Professional Inquiries & Collaboration' : 'التواصل المهني المباشر'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
          {isEn ? 'Get in Touch' : 'تواصل مع الدكتور محمود'}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          {isEn 
            ? 'For professional collaboration, academic lectures, or clinical inquiries, please reach out via phone, email, or the contact form below.' 
            : 'للتواصل المهني، التعاون الأكاديمي، أو الاستفسارات السريرية، يمكنكم الاتصال مباشرة أو إرسال رسالتكم عبر النموذج أدناه.'}
        </p>
      </div>

      {/* Main Grid: Verified Information Cards + Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact Information & Center Details (Col 5) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Important Non-Commercial Notice Box */}
          <div className="p-6 rounded-3xl bg-amber-50/70 border border-amber-200 text-amber-950 space-y-2 shadow-xs">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-amber-900">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              <span>{isEn ? 'Non-Commercial Portfolio Notice' : 'تنويه: موقع بورتفوليو مهني غير تجاري'}</span>
            </div>
            <p className="text-xs text-amber-900 leading-relaxed">
              {isEn 
                ? 'This website is a personal portfolio and educational resource, not an automated commercial booking platform. For appointments or cupping sessions at Al-Dawaa Cupping Center in Dammam, please contact the center directly via phone.' 
                : 'هذا الموقع بورتفوليو مهني شخصي ومرجع تثقيفي غير مخصص للحجز التجاري الآلي. لتحديد المواعيد أو الاستفسار عن جلسات الحجامة في مجمع عيادات الدواء الأمثل بالدمام، يرجى الاتصال هاتفياً بالمركز.'}
            </p>
          </div>

          {/* WhatsApp Direct & Booking Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-emerald-50/50 border-2 border-emerald-500/30 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
                <MessageCircle className="w-6 h-6 fill-white" />
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                {isEn ? 'Fastest Response' : 'الرد الأسرع'}
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900">
                {isEn ? 'WhatsApp Direct Consultation' : 'استشارات ومواعيد الواتساب المباشر'}
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {isEn 
                  ? 'Connect directly with Dr. Mahmoud on the registered mobile number for prompt medical coordination.' 
                  : 'تواصل مباشرة مع الدكتور محمود عبر رقم الواتساب المسجل للاستفسار وتنسيق المواعيد السريرية.'}
              </p>
              
              <div className="mt-3 flex items-center gap-2">
                <span className="text-lg sm:text-xl font-mono font-bold text-emerald-900" dir="ltr">
                  {rawPhone}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>{isEn ? 'Open WhatsApp' : 'فتح محادثة واتساب'}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <button
                type="button"
                onClick={() => openBookingModal()}
                className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>{isEn ? 'Book Appointment' : 'حجز استشارة وموعد'}</span>
              </button>
            </div>
          </div>

          {/* Direct Phone Card */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {isEn ? 'Direct Phone & WhatsApp' : 'الهاتف المباشر والواتساب'}
              </h3>
              <a 
                href={`tel:${siteSettings.contactPhone}`}
                className="text-xl sm:text-2xl font-mono font-bold text-slate-900 hover:text-blue-600 transition-colors block mt-1"
                dir="ltr"
              >
                {siteSettings.contactPhone}
              </a>
              <p className="text-xs text-slate-400 mt-1">
                {isEn ? 'Available for clinical inquiries and center coordination' : 'متاح للاستفسارات السريرية وتنسيق مواعيد العيادة'}
              </p>
            </div>
          </div>

          {/* Email Card */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {isEn ? 'Verified Emails' : 'البريد الإلكتروني المعتمد'}
              </h3>
              <div className="space-y-1.5 mt-2">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">{isEn ? 'Primary Email:' : 'البريد الرئيسي:'}</div>
                  <a 
                    href={`mailto:${siteSettings.contactEmailPrimary}`}
                    className="text-sm font-semibold text-slate-800 hover:text-blue-600 font-mono transition-colors block"
                    dir="ltr"
                  >
                    {siteSettings.contactEmailPrimary}
                  </a>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">{isEn ? 'Secondary Email:' : 'البريد الثانوي:'}</div>
                  <a 
                    href={`mailto:${siteSettings.contactEmailSecondary}`}
                    className="text-sm font-semibold text-slate-800 hover:text-blue-600 font-mono transition-colors block"
                    dir="ltr"
                  >
                    {siteSettings.contactEmailSecondary}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Center Location Card */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {isEn ? 'Current Clinical Practice' : 'مقر العيادة الحالية'}
              </h3>
              <div className="text-base font-bold text-slate-900 mt-1">
                {isEn ? siteSettings.locationEn : siteSettings.locationAr}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {isEn 
                  ? 'Kingdom of Saudi Arabia (Eastern Province)' 
                  : 'المملكة العربية السعودية (المنطقة الشرقية)'}
              </p>
            </div>
          </div>

        </div>

        {/* Contact Form (Col 7) */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
            
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {isEn ? 'Send a Direct Message' : 'إرسال رسالة مباشرة'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {isEn 
                  ? 'Please fill in the details below. Dr. Mahmoud will review and respond promptly.' 
                  : 'يرجى تدوين بياناتك ورسالتك أدناه وسيقوم الدكتور محمود بالرد عليك في أقرب وقت.'}
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-3xl bg-blue-50/60 border border-blue-200 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {isEn ? 'Message Sent Successfully!' : 'تم إرسال رسالتك بنجاح!'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  {isEn 
                    ? 'Thank you for reaching out. Dr. Mahmoud Ali Nabih will review your inquiry shortly.' 
                    : 'شكراً لتواصلك. سيقوم الدكتور محمود علي نبيه بمراجعة رسالتك والتواصل معك.'}
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormState({
                      name: '',
                      email: '',
                      phone: '',
                      subject: isEn ? 'Professional Collaboration' : 'استفسار مهني',
                      message: ''
                    });
                  }}
                  className="px-5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold uppercase tracking-wider mt-2 cursor-pointer"
                >
                  {isEn ? 'Send Another Message' : 'إرسال رسالة أخرى'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    {isEn ? 'Full Name *' : 'الاسم الكامل *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder={isEn ? "e.g. Dr. Ahmed Hassan" : "مثال: د. أحمد حسن"}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-sm text-slate-800 transition-all"
                    id="contact-name-input"
                  />
                </div>

                {/* Email & Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">
                      {isEn ? 'Email Address *' : 'البريد الإلكتروني *'}
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-sm text-slate-800 transition-all"
                      id="contact-email-input"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">
                      {isEn ? 'Phone Number (Optional)' : 'رقم الهاتف (اختياري)'}
                    </label>
                    <input
                      type="tel"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      placeholder="+966 ..."
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-sm text-slate-800 transition-all"
                      id="contact-phone-input"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    {isEn ? 'Inquiry Type' : 'موضوع التواصل'}
                  </label>
                  <select
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-sm text-slate-800 transition-all"
                    id="contact-subject-select"
                  >
                    <option value={isEn ? "Professional Collaboration" : "استفسار وتعاون مهني"}>
                      {isEn ? "Professional Collaboration" : "استفسار وتعاون مهني"}
                    </option>
                    <option value={isEn ? "Clinical Case Discussion" : "استشارة حالة سريرية"}>
                      {isEn ? "Clinical Case Discussion" : "استشارة حالة سريرية"}
                    </option>
                    <option value={isEn ? "Academic & Educational Inquiries" : "تواصل أكاديمي وتدريبي"}>
                      {isEn ? "Academic & Educational Inquiries" : "تواصل أكاديمي وتدريبي"}
                    </option>
                    <option value={isEn ? "Center Appointment Coordination" : "تنسيق مواعيد العيادة"}>
                      {isEn ? "Center Appointment Coordination" : "تنسيق مواعيد العيادة"}
                    </option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    {isEn ? 'Your Message *' : 'نص الرسالة *'}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder={
                      isEn 
                        ? "Please provide brief details regarding your inquiry..." 
                        : "يرجى كتابة تفاصيل استفسارك أو طلبك هنا..."
                    }
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-sm text-slate-800 transition-all"
                    id="contact-message-input"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  id="contact-submit-btn"
                >
                  <Send className="w-4 h-4 text-blue-400" />
                  <span>{isEn ? 'Send Message to Dr. Mahmoud' : 'إرسال الرسالة للدكتور محمود'}</span>
                </button>

              </form>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};
