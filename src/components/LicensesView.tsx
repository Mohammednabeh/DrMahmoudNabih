import React from 'react';
import { useCMS } from '../context/CMSContext';
import { 
  ShieldCheck, 
  CheckCircle2, 
  FileCheck, 
  Building2, 
  Award, 
  HeartHandshake, 
  Sparkles, 
  ExternalLink, 
  AlertCircle 
} from 'lucide-react';
import { initialLicenses } from '../data/initialData';

export const LicensesView: React.FC = () => {
  const { language, setActiveTab } = useCMS();
  const isEn = language === 'en';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-14">
      
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>{isEn ? 'Official Regulatory Credentials' : 'التراخيص والاعتمادات الصحية الرسمية'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
          {isEn ? 'Professional Licenses & Registrations' : 'التراخيص والتسجيل المهني الرسمي'}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          {isEn 
            ? 'Official professional classifications and health ministry licenses held by Dr. Mahmoud in both the Kingdom of Saudi Arabia and the Arab Republic of Egypt.' 
            : 'التراخيص والتصنيفات المهنية المعتمدة الصادرة من الهيئة السعودية للتخصصات الصحية ووزارة الصحة المصرية ونقابة العلاج الطبيعي.'}
        </p>
      </div>

      {/* Featured Primary License: SCFHS */}
      <div className="rounded-3xl bg-slate-900 p-8 sm:p-10 text-white shadow-xl relative overflow-hidden border border-slate-800">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-bold text-blue-400 uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{isEn ? 'Official Saudi License • Active Status' : 'ترخيص ممارس صحي رسمي ساري المفعول في السعودية'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {isEn 
                ? 'Saudi Commission for Health Specialties (SCFHS)' 
                : 'الهيئة السعودية للتخصصات الصحية (SCFHS)'}
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {isEn 
                ? 'Classified and registered as a Specialist Physiotherapist. This statutory licensure verifies academic qualifications, clinical competency evaluations, and compliance with healthcare safety standards within the Kingdom of Saudi Arabia.'
                : 'مصنف ومسجل رسمياً كـ "أخصائي علاج طبيعي". يثبت هذا الترخيص الرسمي استيفاء كافة المتطلبات الأكاديمية والسريرية واجتياز التقييمات المهنية المعتمدة لممارسة المهنة في المملكة.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700">
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">{isEn ? 'Application / Profile Number' : 'رقم الطلب / ملف التسجيل'}</div>
                <div className="text-xl font-mono font-bold text-white mt-1">22392609</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700">
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">{isEn ? 'Professional Classification' : 'التصنيف المهني المعتمد'}</div>
                <div className="text-base font-bold text-white mt-1">
                  {isEn ? 'Specialist Physiotherapist' : 'أخصائي علاج طبيعي'}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-slate-800/60 backdrop-blur-md rounded-2xl p-6 border border-slate-700/80 space-y-3 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div className="text-lg font-bold text-white">
              {isEn ? 'Verified & In Good Standing' : 'معتمد ومسجل نظامياً'}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isEn 
                ? 'Authorized to practice physical therapy and clinical therapeutic cupping within accredited healthcare facilities in Saudi Arabia.' 
                : 'مرخص له بممارسة العلاج الطبيعي والحجامة الطبية السريرية في المنشآت الطبية المعتمدة بالمملكة العربية السعودية.'}
            </p>
          </div>

        </div>
      </div>

      {/* Grid of All Licenses & Exams */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {initialLicenses.map((lic) => (
          <div
            key={lic.id}
            className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  {lic.status.toUpperCase()}
                </span>
                <span className="text-xs text-slate-400 font-semibold">
                  {isEn ? lic.authorityEn : lic.authorityAr}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 leading-snug">
                {isEn ? lic.titleEn : lic.titleAr}
              </h3>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs space-y-1.5">
                {lic.number && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">{isEn ? 'Credential Ref:' : 'رقم القيد:'}</span>
                    <span className="font-mono font-bold text-slate-900">{lic.number}</span>
                  </div>
                )}
                {lic.score && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">{isEn ? 'Exam Score:' : 'النتيجة:'}</span>
                    <span className="font-bold text-emerald-600">{lic.score}</span>
                  </div>
                )}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {isEn ? lic.notesEn : lic.notesAr}
              </p>
            </div>

            <div className="pt-3.5 border-t border-slate-100 flex items-center gap-2 text-xs text-blue-700 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{isEn ? 'Full Compliance Verified' : 'مطابق للاشتراطات السريرية'}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Clear Patient Safety Explanation Box (Crucial user requirement) */}
      <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 text-slate-900 font-bold">
          <AlertCircle className="w-5 h-5 text-blue-600 shrink-0" />
          <h2 className="text-xl">
            {isEn ? 'Why Professional Licensure Matters for Patient Safety' : 'ماذا تعني هذه التراخيص الرسمية لسلامة وأمان المراجعين؟'}
          </h2>
        </div>

        <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3">
          <p>
            {isEn 
              ? 'Receiving cupping therapy from a licensed healthcare specialist registered with the Saudi Commission for Health Specialties (SCFHS) ensures that the practitioner has undergone rigorous, accredited academic education in human anatomy, physiology, and pathology.'
              : 'إن تلقي الحجامة الطبية والعلاج الطبيعي على يد أخصائي مرخص ومسجل رسمياً لدى الهيئة السعودية للتخصصات الصحية يضمن للمراجع أن الممارس خضع لسنوات طويلة من التعليم الأكاديمي والسريري المعتمد في علم التشريح، ووظائف الأعضاء، وعلم الأمراض.'}
          </p>
          <p>
            {isEn 
              ? 'Unlike unverified, unregulated providers, a licensed specialist is legally and clinically bound to standard infection prevention protocols, certified medical sterilization, vital signs screening, and strict contraindication identification — preventing complications, cross-infection, or inappropriate interventions.'
              : 'بخلاف الممارسات العشوائية أو غير المرخصة، فإن الممارس الصحي المرخص يلتزم نظامياً وأخلاقياً ببروتوكولات التعقيم الصارمة، واستخدام المستلزمات الطبية ذات الاستخدام الواحد، ومراجعة الأدوية وموانع النزيف، والتعامل الآمن مع كافة الحالات الصحية.'}
          </p>
        </div>
      </div>

    </div>
  );
};
