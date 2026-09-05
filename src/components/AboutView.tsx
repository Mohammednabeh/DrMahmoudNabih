import React from 'react';
import { useCMS } from '../context/CMSContext';
import { 
  GraduationCap, 
  ShieldCheck, 
  MapPin, 
  Languages, 
  CheckCircle2, 
  Stethoscope, 
  HeartHandshake, 
  Activity, 
  PhoneCall, 
  Mail, 
  BookOpen, 
  Building2 
} from 'lucide-react';
import { initialSkills, drMahmoudDefaultPhoto } from '../data/initialData';

export const AboutView: React.FC = () => {
  const { language, setActiveTab, siteSettings } = useCMS();
  const isEn = language === 'en';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      
      {/* Header Banner */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>{isEn ? 'Professional Profile & Biography' : 'السيرة المهنية والذاتية المعتمدة'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
          {isEn ? 'Dr. Mahmoud Ali Nabih Abdelghaney' : 'د. محمود علي نبيه عبد الغني'}
        </h1>
        <p className="text-base sm:text-lg text-blue-900 font-semibold">
          {isEn 
            ? 'Specialist Physiotherapist (SCFHS #22392609) | Clinical Cupping Specialist' 
            : 'أخصائي علاج طبيعي معتمد من الهيئة السعودية للتخصصات الصحية | خبير وممارس الحجامة الطبية'}
        </p>
      </div>

      {/* Main Profile Grid: Photo + Core Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        
        {/* Photo Card (Col 5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl overflow-hidden bg-white p-2.5 border border-slate-200 shadow-xl relative">
            <div className="aspect-3/4 rounded-2xl overflow-hidden relative group">
              <img
                src={siteSettings.doctorPhotoUrl || drMahmoudDefaultPhoto}
                alt={isEn ? "Dr. Mahmoud Ali Nabih" : "د. محمود علي نبيه"}
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  if (img.src !== drMahmoudDefaultPhoto) {
                    img.src = drMahmoudDefaultPhoto;
                  }
                }}
              />
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-slate-950/90 via-slate-950/40 to-transparent p-5 text-white">
                <div className="font-bold text-lg">
                  {isEn ? 'Dr. Mahmoud Ali Nabih' : 'د. محمود علي نبيه'}
                </div>
                <div className="text-xs text-blue-300 font-medium">
                  {isEn ? 'Current Practice: Al-Dawaa Cupping Center, Dammam' : 'المقر الحالي: مجمع عيادات الدواء الأمثل للحجامة، الدمام'}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Snapshot Card */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3.5 text-xs sm:text-sm">
            <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-2 uppercase tracking-wider text-xs">
              {isEn ? 'Key Information' : 'بيانات سريعة'}
            </h3>
            
            <div className="flex items-center justify-between">
              <span className="text-slate-500">{isEn ? 'SCFHS License' : 'ترخيص الهيئة السعودية'}</span>
              <span className="font-bold text-blue-900">#22392609 (Specialist)</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-slate-500">{isEn ? 'Prometric Exam' : 'اختبار البرومتريك'}</span>
              <span className="font-bold text-emerald-600">{isEn ? 'Passed (Score: 71%)' : 'ناجح (درجة: 71%)'}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">{isEn ? 'Clinical Experience' : 'سنوات الخبرة'}</span>
              <span className="font-bold text-slate-800">{isEn ? '15+ Years (Since 2008)' : 'أكثر من 15 عاماً (منذ 2008)'}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">{isEn ? 'Location' : 'مقر العمل الحالي'}</span>
              <span className="font-bold text-slate-800">{isEn ? 'Dammam, Saudi Arabia' : 'الدمام، المملكة العربية السعودية'}</span>
            </div>
          </div>
        </div>

        {/* Detailed Biography Text & Philosophy (Col 7) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Detailed Biography */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              {isEn ? 'About Dr. Mahmoud' : 'نبذة تعريفية شاملة'}
            </h2>
            <div className="text-slate-600 text-xs sm:text-sm leading-relaxed space-y-3">
              <p>
                {isEn 
                  ? 'Dr. Mahmoud Ali Nabih Abdelghaney is a highly dedicated, Saudi Commission for Health Specialties (SCFHS)-registered Specialist Physiotherapist and clinical cupping practitioner currently practicing at Al-Dawaa Cupping Center in Dammam, Saudi Arabia.'
                  : 'الدكتور محمود علي نبيه عبد الغني، أخصائي علاج طبيعي معتمد ومسجل رسمياً لدى الهيئة السعودية للتخصصات الصحية برقم (22392609)، وخبير وممارس الحجامة الطبية السريرية في مجمع عيادات الدواء الأمثل للحجامة بمدينة الدمام.'}
              </p>
              <p>
                {isEn
                  ? 'He graduated from the prestigious Faculty of Physical Therapy at Cairo University in 2008 with a Bachelor\'s Degree in Physical Therapy, earning a general grade of "Very Good". With over 15 years of uninterrupted clinical experience across prominent general hospitals, specialized rehabilitation clinics, and authorized cupping centers in both Egypt and Saudi Arabia, he has successfully treated thousands of musculoskeletal, neurological, and post-surgical rehabilitation cases.'
                  : 'تخرج من كلية العلاج الطبيعي العريقة بجامعة القاهرة عام 2008 وحصل على درجة البكالوريوس بتقدير عام "جيد جداً". ويمتلك خبرة إكلينيكية متواصلة تزيد عن 15 عاماً في كبرى المستشفيات العامة والمراكز التخصصية المعتمدة في جمهورية مصر العربية والمملكة العربية السعودية، حيث قام بمناظرة وتأهيل آلاف الحالات العضلية والعصبية وحالات ما بعد الجراحات.'}
              </p>
              <p>
                {isEn
                  ? 'Dr. Mahmoud has completed advanced postgraduate clinical diplomas, including a Post-Graduate Diploma in Clinical Nutrition (Cairo University, 2013) and a Post-Graduate Diploma in Traditional Chinese Medicine & Cupping Therapy (WFCMS / Egyptian Physical Therapy Syndicate, 2017). His approach uniquely harmonizes scientific biomechanical assessment with strictly aseptic, evidence-informed cupping procedures.'
                  : 'أثريت مسيرته المهنية بحصوله على دبلومات دراسات عليا متقدمة، تشمل دبلوم الدراسات العليا في التغذية الإكلينيكية (جامعة القاهرة 2013) ودبلوم الطب الصيني التكميلي والحجامة الطبية (الاتحاد العالمي للطب الصيني WFCMS ونقابة العلاج الطبيعي 2017). ويتفرد أسلوبه بالدمج الواعي بين التقييم الميكانيكي الحيوي الحديث وأعلى بروتوكولات التعقيم ومكافحة العدوى.'}
              </p>
            </div>
          </div>

          {/* Education Details */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 text-blue-600 font-bold">
              <GraduationCap className="w-5 h-5" />
              <h2 className="text-xl text-slate-900">
                {isEn ? 'Formal University Education' : 'التعليم الجامعي الأكاديمي'}
              </h2>
            </div>

            <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h3 className="font-bold text-slate-900 text-base">
                  {isEn ? "Bachelor's Degree in Physical Therapy (B.Sc.)" : "بكالوريوس العلاج الطبيعي"}
                </h3>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-800 w-fit">
                  2003 - 2008
                </span>
              </div>
              <div className="text-sm font-semibold text-blue-900">
                {isEn ? 'Faculty of Physical Therapy, Cairo University, Egypt' : 'كلية العلاج الطبيعي - جامعة القاهرة، مصر'}
              </div>
              <div className="text-xs text-slate-600 flex items-center gap-2 pt-1">
                <span className="font-semibold text-slate-700">{isEn ? 'Graduation Grade:' : 'التقدير العام:'}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-white border border-blue-200 font-bold text-blue-800 text-xs">
                  {isEn ? 'Very Good' : 'جيد جداً'}
                </span>
              </div>
            </div>
          </div>

          {/* Languages */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 text-slate-900 font-bold">
              <Languages className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl">
                {isEn ? 'Language Proficiencies' : 'اللغات المتقنة'}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{isEn ? 'Native Language' : 'اللغة الأم'}</div>
                <div className="text-base font-bold text-slate-900">{isEn ? 'Arabic (اللغة العربية)' : 'اللغة العربية (اللغة الأم)'}</div>
                <p className="text-xs text-slate-500">
                  {isEn ? 'Native fluency in medical, clinical, and patient communication.' : 'إتقان تام وسلاسة في التواصل الطبي والسريري.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{isEn ? 'Working Proficiency' : 'لغة العمل المهني'}</div>
                <div className="text-base font-bold text-slate-900">{isEn ? 'English (اللغة الإنجليزية)' : 'اللغة الإنجليزية (كفاءة مهنية)'}</div>
                <p className="text-xs text-slate-500">
                  {isEn ? 'Professional working proficiency in clinical documentation and consultations.' : 'كفاءة مهنية عالية في المراجع الطبية والاستشارات السريرية.'}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Clinical Approach & Core Philosophy (4 Pillars) */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-xs font-bold text-slate-600 uppercase tracking-widest">
            <HeartHandshake className="w-3.5 h-3.5 text-blue-600" />
            <span>{isEn ? 'Clinical Standards' : 'معايير الممارسة السريرية'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {isEn ? 'Our 4 Core Clinical Pillars' : 'الركائز السريرية الأربعة للدكتور محمود'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
              01
            </div>
            <h3 className="font-bold text-slate-900 text-base">
              {isEn ? 'Integration with Physical Therapy' : 'تكامل الحجامة مع العلاج الطبيعي'}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {isEn 
                ? 'Coupling therapeutic suction with biomechanical movement assessments and targeted muscle rehabilitation.' 
                : 'الدمج المتناغم بين الحجامة الطبية والتقييم الحركي الميكانيكي وبرامج تقوية العضلات لتحقيق نتائج مستدامة.'}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h3 className="font-bold text-slate-900 text-base">
              {isEn ? 'Patient-First Safety' : 'سلامة المراجع أولاً'}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {isEn 
                ? 'Strict single-use sterile consumables, certified antiseptic prep, and comprehensive contraindication screening.' 
                : 'استخدام كؤوس وشفرات معقمة ذات استخدام واحد لكل مراجع، والتطهير الطبي المعتمد واستبعاد موانع النزيف بحزم.'}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold text-sm">
              03
            </div>
            <h3 className="font-bold text-slate-900 text-base">
              {isEn ? 'Evidence-Informed Care' : 'ممارسة مبنية على الدليل العلمي'}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {isEn 
                ? 'Clear scientific anatomical placement without esoteric claims or ungrounded promises.' 
                : 'تحديد مواضع الكؤوس بدقة تشريحية تتبع مسارات الأعصاب وتجمعات الألياف العضلية بعيداً عن المبالغات.'}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-sm">
              04
            </div>
            <h3 className="font-bold text-slate-900 text-base">
              {isEn ? 'Complementary Collaboration' : 'التعاون الطبي التكاملي'}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {isEn 
                ? 'Respecting specialized physician diagnoses, medication regimes, and referring cases when outside scope.' 
                : 'احترام الخطة العلاجية المقررة من الأطباء، وتوجيه المراجعين للفحوصات المخبرية والأشعة متى ما لزم الأمر.'}
            </p>
          </div>
        </div>
      </div>

      {/* Verified Skills & Competencies List from CV */}
      <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {isEn ? 'Clinical & Technical Competencies (From Verified CV)' : 'المهارات والقدرات السريرية (الموثقة في السيرة الذاتية)'}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {isEn ? 'Directly extracted from Dr. Mahmoud’s verified curriculum vitae' : 'مستخرجة مباشرة ومطابقة للسيرة الذاتية المعتمدة'}
            </p>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 w-fit">
            {initialSkills.length} {isEn ? 'Verified Competencies' : 'مهارة معتمدة'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {initialSkills.map((skill) => (
            <div 
              key={skill.id} 
              className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-xs text-slate-700"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span className="font-medium leading-snug">{isEn ? skill.nameEn : skill.nameAr}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
