import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Logo } from './Logo';
import { PageTab } from '../types';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ShieldAlert, 
  Sliders, 
  FileText, 
  Award, 
  BookOpen,
  Lock,
  ShieldCheck,
  MessageCircle,
  Calendar
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, setActiveTab, siteSettings, setIsCMSStudioOpen, isAdminAuthenticated, openBookingModal } = useCMS();
  const isEn = language === 'en';

  const rawPhone = siteSettings.whatsappPhone || siteSettings.contactPhone || '+966 54 083 2104';
  const cleanPhone = rawPhone.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    isEn ? 'Hello Dr. Mahmoud, I would like to inquire about booking a consultation.' : 'السلام عليكم ورحمة الله و بركاته دكتور محمود، أود الاستفسار عن حجز استشارة.'
  )}`;

  const navigateTo = (tab: PageTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Purpose */}
          <div className="space-y-4">
            <div className="bg-white p-2.5 rounded-2xl inline-block shadow-sm" dir="ltr">
              <Logo showSubtitle={true} />
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {isEn 
                ? 'Dedicated bilingual personal portfolio and medical cupping knowledge center of Dr. Mahmoud Ali Nabih Abdelghaney, SCFHS-registered Physiotherapy Specialist.'
                : 'الموقع المهني والمركز المعرفي التثقيفي المعتمد للدكتور محمود علي نبيه عبد الغني، أخصائي علاج طبيعي مسجل بالهيئة السعودية للتخصصات الصحية.'}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-blue-400 font-bold uppercase tracking-wider">
              <span>{isEn ? 'Personal Portfolio • Non-Commercial' : 'موقع بورتفوليو مهني غير تجاري'}</span>
            </div>
          </div>

          {/* Quick Portfolio Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold tracking-widest uppercase text-slate-400">
              {isEn ? 'Professional Profile' : 'الملف المهني'}
            </h3>
            <ul className="space-y-2.5 text-xs font-medium text-slate-400">
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors cursor-pointer">
                  {isEn ? 'About Dr. Mahmoud' : 'السيرة الذاتية والشخصية'}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('qualifications')} className="hover:text-white transition-colors cursor-pointer">
                  {isEn ? 'Degrees & Certifications' : 'الشهادات والمؤهلات الأكاديمية'}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('licenses')} className="hover:text-white transition-colors cursor-pointer">
                  {isEn ? 'SCFHS License & Prometric' : 'تراخيص الهيئة السعودية واختبار البرومتريك'}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('experience')} className="hover:text-white transition-colors cursor-pointer">
                  {isEn ? 'Clinical Hospital Experience' : 'الخبرات السريرية في المستشفيات'}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('faq')} className="hover:text-white transition-colors cursor-pointer">
                  {isEn ? 'FAQ About Dr. Mahmoud' : 'الأسئلة الشائعة حول المؤهلات والممارسة'}
                </button>
              </li>
            </ul>
          </div>

          {/* Knowledge Center Categories */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold tracking-widest uppercase text-slate-400">
              {isEn ? 'Knowledge Center' : 'مركز المعرفة بالحجامة'}
            </h3>
            <ul className="space-y-2.5 text-xs font-medium text-slate-400">
              <li>
                <button onClick={() => navigateTo('knowledge')} className="hover:text-blue-400 transition-colors text-start cursor-pointer">
                  {isEn ? 'Understanding Cupping' : 'فهم الحجامة وآليات عملها'}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('knowledge')} className="hover:text-blue-400 transition-colors text-start cursor-pointer">
                  {isEn ? 'Safety & Infection Control' : 'السلامة والتعقيم ومكافحة العدوى'}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('knowledge')} className="hover:text-blue-400 transition-colors text-start cursor-pointer">
                  {isEn ? 'History & Islamic Heritage' : 'التاريخ والتراث والطب النبوي'}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('knowledge')} className="hover:text-blue-400 transition-colors text-start cursor-pointer">
                  {isEn ? 'Musculoskeletal Topics' : 'آلام الظهر والمفاصل والموضوعات الصحية'}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('knowledge')} className="hover:text-blue-400 transition-colors text-start cursor-pointer">
                  {isEn ? 'Pre & Post Cupping Care' : 'إرشادات الاستعداد والرعاية اللاحقة'}
                </button>
              </li>
            </ul>
          </div>

          {/* Verified Contact Details */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold tracking-widest uppercase text-slate-400">
              {isEn ? 'Verified Contact' : 'معلومات التواصل المعتمدة'}
            </h3>
            <div className="space-y-2.5 text-xs font-medium text-slate-300">
              <a 
                href={`tel:${siteSettings.contactPhone}`} 
                className="flex items-center gap-2.5 hover:text-white transition-colors"
                dir="ltr"
              >
                <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>{siteSettings.contactPhone}</span>
              </a>
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400 shrink-0" />
                <span>{isEn ? 'WhatsApp: +966 54 083 2104' : 'واتساب: 0540832104'}</span>
              </a>
              <button
                type="button"
                onClick={() => openBookingModal()}
                className="flex items-center gap-2.5 text-blue-400 hover:text-blue-300 font-bold transition-colors cursor-pointer text-start"
              >
                <Calendar className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>{isEn ? 'Book a Consultation' : 'حجز استشارة وموعد طبي'}</span>
              </button>
              <a 
                href={`mailto:${siteSettings.contactEmailPrimary}`} 
                className="flex items-center gap-2.5 hover:text-white transition-colors"
                dir="ltr"
              >
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span className="truncate">{siteSettings.contactEmailPrimary}</span>
              </a>
              <a 
                href={`mailto:${siteSettings.contactEmailSecondary}`} 
                className="flex items-center gap-2.5 hover:text-white transition-colors"
                dir="ltr"
              >
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span className="truncate">{siteSettings.contactEmailSecondary}</span>
              </a>
              <div className="flex items-center gap-2.5 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>{isEn ? siteSettings.locationEn : siteSettings.locationAr}</span>
              </div>
            </div>

            <div className="pt-2">
              {isAdminAuthenticated ? (
                <button
                  onClick={() => setIsCMSStudioOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/60 transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isEn ? 'Framer CMS Studio (Unlocked)' : 'لوحة الإدارة (نشطة ومفتوحة)'}</span>
                </button>
              ) : (
                <button
                  onClick={() => setIsCMSStudioOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
                  title={isEn ? "Medical Admin Portal (Protected)" : "بوابة الإدارة الطبية (محمية برمز مرور)"}
                >
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{isEn ? 'Medical Admin Portal' : 'بوابة الإدارة الطبية (محمي)'}</span>
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Medical & Scientific Disclaimer Notice */}
        <div className="my-8 p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-xs text-slate-400 leading-relaxed flex items-start gap-3.5">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-200">
              {isEn ? 'Medical and Educational Disclaimer: ' : 'إخلاء مسؤولية طبي وإرشادي: '}
            </span>
            {isEn 
              ? 'All articles in the Knowledge Center are strictly published for educational and awareness purposes. They do not constitute a medical diagnosis, do not guarantee treatment outcomes, and do not replace formal clinical assessment or prescribed treatment from licensed medical physicians.'
              : 'جميع المقالات المنشورة في مركز المعرفة هي لأغراض التثقيف الصحي والتوعية العامة فقط. لا تُعد تشخيصاً طبياً ولا تقدم وعوداً بالشفاء أو تضمن نتائج محددة، ولا تُغني عن استشارة الطبيب المختص أو مراجعة المنشآت الطبية المعتمدة.'}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <p>
            {isEn 
              ? `© ${new Date().getFullYear()} Dr. Mahmoud Ali Nabih Abdelghaney. All rights reserved.`
              : `© ${new Date().getFullYear()} د. محمود علي نبيه عبد الغني. جميع الحقوق محفوظة.`}
          </p>
          <div className="flex items-center gap-4">
            <button onClick={() => navigateTo('cms-guide')} className="hover:text-white underline transition-colors cursor-pointer">
              {isEn ? 'Framer CMS Guide' : 'دليل إدارة المحتوى Framer'}
            </button>
            <span className="text-slate-700">|</span>
            <button onClick={() => navigateTo('licenses')} className="hover:text-white transition-colors cursor-pointer">
              {isEn ? 'SCFHS Verification' : 'التحقق من ترخيص الهيئة'}
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
