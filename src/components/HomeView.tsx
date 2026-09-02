import React from 'react';
import { useCMS } from '../context/CMSContext';
import { 
  ShieldCheck, 
  Award, 
  Briefcase, 
  BookOpen, 
  ArrowRight, 
  ArrowLeft, 
  PhoneCall, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  Activity, 
  HeartHandshake, 
  Stethoscope, 
  Sparkles, 
  HelpCircle,
  ExternalLink,
  Camera,
  MessageCircle,
  Calendar
} from 'lucide-react';
import { initialExperiences } from '../data/initialData';

export const HomeView: React.FC = () => {
  const { 
    language, 
    siteSettings, 
    articles, 
    setActiveTab, 
    setSelectedArticleSlug,
    setIsPhotoModalOpen,
    openBookingModal
  } = useCMS();
  const isEn = language === 'en';
  const ArrowIcon = isEn ? ArrowRight : ArrowLeft;

  const rawPhone = siteSettings.whatsappPhone || siteSettings.contactPhone || '+966 54 083 2104';
  const cleanPhone = rawPhone.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    isEn ? 'Hello Dr. Mahmoud, I would like to inquire about booking a consultation.' : 'السلام عليكم ورحمة الله و بركاته دكتور محمود، أود الاستفسار عن حجز استشارة.'
  )}`;

  // 3 latest published articles
  const latestArticles = articles.filter(a => a.status === 'published').slice(0, 3);

  const keyExpertise = [
    {
      titleAr: 'الحجامة الطبية المعقمة (الرطبة والجافة)',
      titleEn: 'Aseptic Medical Cupping (Wet & Dry)',
      descAr: 'تطبيق الإجراء بأعلى معايير مكافحة العدوى، واستخدام الأدوات المعقمة أحادية الاستخدام لتخفيف الألم وتنشيط التروية.',
      descEn: 'Applied under strict infection control standards with single-use sterile consumables to ease pain and promote perfusion.'
    },
    {
      titleAr: 'التأهيل البدني والعلاج الطبيعي التكاملي',
      titleEn: 'Integrated Physiotherapy & Musculoskeletal Rehab',
      descAr: 'دمج تقنيات العلاج الطبيعي الحديث، والعلاج اليدوي، والتمارين العلاجية مع الحجامة لتسريع التئام الأنسجة.',
      descEn: 'Synthesizing modern physical therapy modalities, manual therapy, and corrective exercise to accelerate tissue healing.'
    },
    {
      titleAr: 'إدارة وتسكين الآلام المزمنة للعمود الفقري',
      titleEn: 'Chronic Spine & Myofascial Pain Management',
      descAr: 'تقييم ميكانيكي دقيق لآلام أسفل الظهر وتيبس العضلات المحيطة بالكتف ولوح الكتف وعلاج نقاط الزناد.',
      descEn: 'Precise biomechanical evaluation for low back pain, periscapular tension, and myofascial trigger-point release.'
    },
    {
      titleAr: 'التثقيف الصحي والتقييم السريري الدقيق',
      titleEn: 'Clinical Health Education & Patient Assessment',
      descAr: 'فحص المؤشرات الحيوية واستبعاد الموانع الطبية، وتوجيه المراجعين نحو الرعاية اللاحقة ونمط الحياة الصحي.',
      descEn: 'Vital signs screening, strict contraindication exclusion, and tailored lifestyle and post-care guidance.'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 py-6 sm:py-10">
      
      {/* Sleek Interface Hero Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column (Col 4 in Sleek Theme): Portrait Card + SCFHS Verification Card */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Sleek Portrait Frame */}
            <div className="bg-white p-2 sm:p-2.5 rounded-3xl shadow-xl border border-slate-100 overflow-hidden relative group">
              <div className="aspect-4/5 bg-slate-200 rounded-2xl flex items-end justify-center overflow-hidden relative">
                <img
                  src={siteSettings.doctorPhotoUrl || '/dr-mahmoud.jpg'}
                  alt={isEn ? "Dr. Mahmoud Ali Nabih" : "د. محمود علي نبيه"}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-103"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&auto=format&fit=crop&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />

                {/* Quick Photo Upload Trigger */}
                <button
                  type="button"
                  id="home-open-photo-modal-btn"
                  onClick={() => setIsPhotoModalOpen(true)}
                  title={isEn ? "Update / Replace with Authentic Photo" : "استبدال بالصورة الأصلية الحقيقية"}
                  className="absolute top-3 end-3 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-blue-600 backdrop-blur-md text-[11px] font-bold shadow-md border border-white/50 flex items-center gap-1.5 transition-all opacity-80 hover:opacity-100"
                >
                  <Camera className="w-3.5 h-3.5 text-blue-600" />
                  <span>{isEn ? "Authentic Photo" : "الصورة الأصلية"}</span>
                </button>
              </div>
              
              {/* Floating Sleek Glass Overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/92 backdrop-blur-md rounded-2xl shadow-lg border border-white/40">
                <h2 className="font-bold text-slate-900 text-base sm:text-lg">
                  {isEn ? 'Dr. Mahmoud Ali Nabih' : 'د. محمود علي نبيه'}
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm font-medium">
                  {isEn ? 'Specialist in Therapeutic Cupping' : 'أخصائي علاج طبيعي وخبير الحجامة'}
                </p>
              </div>
            </div>

            {/* Deep Rich Navy Verification Card */}
            <div className="bg-blue-900 text-white p-6 sm:p-8 rounded-3xl flex-grow flex flex-col justify-between shadow-xl">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] opacity-60">
                  {isEn ? 'Verification' : 'الاعتماد والتصنيف'}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold mt-2 leading-tight">
                  {isEn ? 'SCFHS Certified & Licensed Specialist' : 'أخصائي معتمد ومرخص من الهيئة السعودية'}
                </h3>
              </div>

              <div className="my-6 space-y-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full shrink-0" />
                  <p className="text-xs sm:text-sm opacity-85">
                    {isEn ? 'Al-Dawaa Cupping Center — Dammam' : 'مجمع عيادات الدواء الأمثل — الدمام'}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full shrink-0" />
                  <p className="text-xs sm:text-sm opacity-85">
                    {isEn ? 'Expert in Integrated Clinical Practice' : 'خبير الممارسة السريرية والتأهيل المتكامل'}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full shrink-0" />
                  <p className="text-xs sm:text-sm opacity-85">
                    {isEn ? 'Prometric Unified Exam Passed (71%)' : 'اجتياز اختبار البرومتريك الموحد (71%)'}
                  </p>
                </div>
              </div>

              <div className="pt-5 border-t border-blue-800 flex items-center justify-between">
                <p className="text-xs opacity-60 font-mono">
                  REF: SCFHS-22392609
                </p>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-800 text-blue-200">
                  Active
                </span>
              </div>
            </div>

          </div>

          {/* Right Column (Col 8 in Sleek Theme): Hero Heading + 2 Cards + Status Bar */}
          <div className="lg:col-span-8 flex flex-col justify-between gap-6 sm:gap-8">
            
            {/* Header Text & Lead */}
            <div className="flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>{isEn ? 'Professional Medical Portfolio' : 'الملف المهني والسريري المعتمد'}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.02]">
                {isEn ? (
                  <>
                    Bridging Heritage & <span className="text-blue-600 underline decoration-blue-200 underline-offset-8">Clinical Excellence.</span>
                  </>
                ) : (
                  <>
                    الجمع بين أصالة الحجامة و<span className="text-blue-600 underline decoration-blue-200 underline-offset-8">التميز السريري.</span>
                  </>
                )}
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-slate-500 leading-relaxed max-w-2xl">
                {isEn ? siteSettings.heroDescriptionEn : siteSettings.heroDescriptionAr}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={() => openBookingModal()}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25 transition-all cursor-pointer active:scale-98"
                  id="hero-book-consultation-btn"
                >
                  <Calendar className="w-4 h-4 text-blue-200" />
                  <span>{isEn ? 'Book Consultation' : 'حجز استشارة وموعد طبي'}</span>
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/25 transition-all cursor-pointer active:scale-98"
                  id="hero-whatsapp-btn"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>{isEn ? 'WhatsApp Direct' : 'واتساب مباشر'}</span>
                </a>

                <button
                  onClick={() => {
                    setActiveTab('knowledge');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 transition-all cursor-pointer shadow-2xs"
                  id="hero-explore-knowledge-btn"
                >
                  <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                  <span>{isEn ? 'Knowledge Center' : 'مركز المعرفة'}</span>
                  <ArrowIcon className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>
            </div>

            {/* 2-Card Sleek Grid: Educational Repository + Professional FAQ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
              
              {/* Card 1: Educational Repository */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      {isEn ? 'Knowledge Center' : 'مركز المعرفة'}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                    {isEn ? 'Educational Repository' : 'المستودع المعرفي التعليمي'}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6">
                    {isEn 
                      ? 'Explore verified insights on safety, heritage, and modern aseptic practice based on our comprehensive cupping knowledge base.' 
                      : 'مقالات وأبحاث موثقة حول مكافحة العدوى والتعقيم، وتأصيل ممارسة الحجامة السريرية الحديثة.'}
                  </p>
                </div>
                
                <button 
                  onClick={() => {
                    setActiveTab('knowledge');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="mt-auto flex items-center gap-2 text-xs sm:text-sm font-bold text-blue-600 group cursor-pointer"
                >
                  <span>{isEn ? 'Browse 23 Articles' : 'تصفح جميع المقالات (23 مقالاً)'}</span>
                  <ArrowIcon className="w-4 h-4 transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Card 2: Professional FAQ */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                      <HelpCircle className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      {isEn ? 'About Dr. Mahmoud' : 'عن الدكتور محمود'}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                    {isEn ? 'Professional FAQ' : 'الأسئلة المهنية الشائعة'}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6">
                    {isEn 
                      ? 'Direct answers regarding Dr. Mahmoud’s credentials, clinical qualifications, licensing, and ethical standards.' 
                      : 'إجابات واضحة حول مؤهلات وتراخيص ومسيرة الدكتور محمود ونطاق الممارسة الطبية المعتمدة.'}
                  </p>
                </div>

                <button 
                  onClick={() => {
                    setActiveTab('faq');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="mt-auto flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-600 group cursor-pointer"
                >
                  <span>{isEn ? 'View Credentials & FAQ' : 'عرض المؤهلات والأسئلة الشائعة'}</span>
                  <ArrowIcon className="w-4 h-4 transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </button>
              </div>

            </div>

            {/* Sleek Horizontal Status Highlight Strip */}
            <div className="bg-slate-100/60 rounded-3xl border border-slate-200 flex flex-wrap md:flex-nowrap items-center px-6 sm:px-8 py-4 sm:py-5 gap-6 sm:gap-10 shadow-2xs">
              
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                  {isEn ? 'Latest Practice' : 'المقر الحالي'}
                </span>
                <span className="font-bold text-slate-800 text-xs sm:text-sm">
                  {isEn ? 'Al-Dawaa Center, Dammam' : 'مركز الدواء الأمثل، الدمام'}
                </span>
              </div>

              <div className="w-px h-8 bg-slate-200 hidden md:block" />

              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                  {isEn ? 'Academic Basis' : 'المؤهل الأكاديمي'}
                </span>
                <span className="font-bold text-slate-800 text-xs sm:text-sm">
                  {isEn ? 'Cairo University (B.Sc.)' : 'جامعة القاهرة (جيد جداً)'}
                </span>
              </div>

              <div className="w-px h-8 bg-slate-200 hidden md:block" />

              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                  {isEn ? 'Clinical Status' : 'الحالة المهنية'}
                </span>
                <span className="font-bold text-emerald-600 text-xs sm:text-sm flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  {isEn ? 'Verified Specialist Practice' : 'ممارسة سريرية معتمدة'}
                </span>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Verified Professional Philosophy (4 Sleek Cards) */}
      <section className="bg-slate-100/40 border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest">
              <HeartHandshake className="w-4 h-4" />
              <span>{isEn ? 'Clinical Philosophy' : 'الفلسفة والممارسة السريرية'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
              {isEn 
                ? 'A Balanced, Evidence-Informed Integrated Care Model' 
                : 'نموذج علاجي متكامل يجمع بين أصالة الحجامة والعلم الحديث'}
            </h2>
            <p className="text-sm sm:text-base text-slate-500">
              {isEn
                ? 'Grounded in anatomical assessment, patient safety, and collaborative clinical medicine.'
                : 'مبني على التقييم التشريحي الدقيق، ومعايير السلامة الصارمة، والتكامل مع الطب الحديث.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                {isEn ? 'Patient Safety First' : 'الأولوية القصوى لسلامة المراجع'}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {isEn 
                  ? 'Strict screening of medical history, medications (especially anticoagulants), vital signs, and exclusion of clinical contraindications.' 
                  : 'فحص مسبق شامل للتاريخ الصحي والأدوية وموانع النزيف، والامتثال الصارم لبروتوكولات مكافحة العدوى والتعقيم.'}
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                {isEn ? 'Physiotherapy Synergy' : 'تكامل مع برامج العلاج الطبيعي'}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {isEn 
                  ? 'Integrating sterile cupping with physical therapy modalities, manual therapy, and therapeutic movement to optimize tissue repair.' 
                  : 'دمج تقنيات الحجامة مع أساليب العلاج الطبيعي والتأهيل الحركي لتحسين مرونة العضلات وتسريع التعافي.'}
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                {isEn ? 'Complementary Care' : 'رعاية تكميلية وليست بديلاً'}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {isEn 
                  ? 'Cupping works alongside specialized physician care, never displacing diagnostic investigations or prescribed pharmacology.' 
                  : 'الحجامة ممارسة مساندة وتكميلية تعمل بالتوازي مع توجيهات الأطباء المتخصصين دون التوقف عن العلاج الدوائي.'}
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-sm">
                04
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                {isEn ? 'Evidence & Education' : 'التثقيف والتوعية بالدليل'}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {isEn 
                  ? 'Empowering patients through clear, realistic health education without unverified claims or false promises of cure.' 
                  : 'توعية المرضى بالحقائق السريرية الدقيقة دون مبالغة أو وعود زائفة بالشفاء التام من الأمراض المزمنة.'}
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Key Areas of Clinical Expertise */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-xs font-bold text-slate-600 uppercase tracking-widest">
            <Activity className="w-3.5 h-3.5 text-blue-600" />
            <span>{isEn ? 'Core Competencies' : 'مجالات التخصص والخبرة السريرية'}</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900">
            {isEn ? 'Areas of Professional Specialization' : 'المهارات والخبرات السريرية المعتمدة'}
          </h2>
          <p className="text-slate-500 text-sm sm:text-base">
            {isEn 
              ? 'Proven competencies combining clinical physiotherapy, aseptic cupping, and nutrition management.' 
              : 'خبرات سريرية راسخة تجمع بين العلاج الطبيعي التأهيلي، الحجامة الطبية المقننة، والتغذية العلاجية.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {keyExpertise.map((item, idx) => (
            <div 
              key={idx}
              className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-blue-500/40 transition-all shadow-xs hover:shadow-md flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {isEn ? item.titleEn : item.titleAr}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {isEn ? item.descEn : item.descAr}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => openBookingModal(item.titleAr)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>{isEn ? 'Request Consultation' : 'حجز استشارة لهذه الخدمة'}</span>
                  <ArrowIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Selected Clinical Experience Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">
              <Briefcase className="w-3.5 h-3.5" />
              <span>{isEn ? 'Career Milestones' : 'محطات المسيرة المهنية'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {isEn ? 'Selected Clinical Experience' : 'أبرز الخبرات والمسؤوليات السريرية'}
            </h2>
          </div>
          <button
            onClick={() => {
              setActiveTab('experience');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
          >
            <span>{isEn ? 'View Complete Experience Timeline' : 'عرض السجل الوظيفي الكامل'}</span>
            <ArrowIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Highlight 2 primary recent centers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {initialExperiences.slice(0, 2).map((exp) => (
            <div 
              key={exp.id} 
              className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-4 relative"
            >
              {exp.isCurrent && (
                <span className="absolute top-6 right-6 rtl:right-auto rtl:left-6 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  {isEn ? 'Current Practice' : 'العمل الحالي'}
                </span>
              )}
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-1">
                  {isEn ? exp.periodEn : exp.periodAr}
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  {isEn ? exp.titleEn : exp.titleAr}
                </h3>
                <div className="text-sm font-semibold text-blue-900 mt-0.5">
                  {isEn ? exp.organizationEn : exp.organizationAr}
                </div>
                <div className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{isEn ? exp.locationEn : exp.locationAr}</span>
                </div>
              </div>

              <ul className="space-y-2 text-xs text-slate-600">
                {(isEn ? exp.responsibilitiesEn : exp.responsibilitiesAr).slice(0, 3).map((r, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Educational Articles (3 Sleek Cards) */}
      <section className="bg-slate-100/40 border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{isEn ? 'Educational Knowledge Center' : 'مركز المعرفة والتثقيف الصحي'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {isEn ? 'Latest Educational Articles' : 'أحدث المقالات التعليمية المعتمدة'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
                {isEn 
                  ? 'Educational insights strictly sourced from the clinical cupping knowledge base.' 
                  : 'مقالات توعوية شاملة حول الحجامة الطبية، معايير السلامة، والموضوعات الصحية.'}
              </p>
            </div>
            <button
              onClick={() => {
                setActiveTab('knowledge');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
              id="view-all-articles-btn"
            >
              <span>{isEn ? 'Browse All 23 Articles' : 'تصفح جميع المقالات (23 مقالاً)'}</span>
              <ArrowIcon className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => {
                  setActiveTab('knowledge');
                  setSelectedArticleSlug(article.slug);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group p-8 rounded-3xl bg-white border border-slate-200 hover:border-blue-500/40 transition-all shadow-xs hover:shadow-md cursor-pointer flex flex-col justify-between"
                id={`latest-article-card-${article.slug}`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 font-semibold text-slate-600 text-[11px]">
                      {article.readingTimeMinutes} {isEn ? 'min read' : 'دقائق قراءة'}
                    </span>
                    <span>{article.publishedDate}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                    {isEn ? article.titleEn : article.titleAr}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                    {isEn ? article.shortAnswerEn : article.shortAnswerAr}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                  <span>{isEn ? 'Read Article' : 'قراءة المقال بالكامل'}</span>
                  <ArrowIcon className="w-3.5 h-3.5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Sleek Dark Navy Contact Callout Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="rounded-3xl bg-slate-900 p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden border border-slate-800">
          
          <div className="relative z-10 max-w-2xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-bold uppercase tracking-wider text-blue-400">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{isEn ? 'Direct Professional Inquiries' : 'قنوات التواصل المهني المباشر'}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              {isEn 
                ? 'Connect with Dr. Mahmoud Ali Nabih' 
                : 'التواصل المهني مع الدكتور محمود علي نبيه'}
            </h2>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              {isEn 
                ? 'For professional collaboration, clinical inquiries, or academic communication, reach out through verified contact channels.' 
                : 'لأي استفسارات مهنية أو تعاون سريري أو أكاديمي، يسعدنا تواصلكم عبر وسائل الاتصال المعتمدة.'}
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={() => openBookingModal()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider bg-blue-600 hover:bg-blue-500 text-white shadow-lg transition-all active:scale-98 cursor-pointer"
                id="home-book-direct-btn"
              >
                <Calendar className="w-4 h-4 text-blue-200" />
                <span>{isEn ? 'Book Consultation' : 'حجز استشارة وموعد طبي'}</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition-all active:scale-98 cursor-pointer"
                id="home-whatsapp-direct-btn"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>{isEn ? 'WhatsApp Chat' : 'واتساب مباشر'}</span>
              </a>

              <button
                onClick={() => {
                  setActiveTab('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-bold text-xs uppercase tracking-wider bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer"
                id="home-contact-direct-btn"
              >
                <Mail className="w-4 h-4" />
                <span>{isEn ? 'Contact Page' : 'صفحة التواصل'}</span>
              </button>
              
              <a 
                href={`tel:${siteSettings.contactPhone}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-bold text-xs uppercase tracking-wider bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
                dir="ltr"
              >
                <PhoneCall className="w-4 h-4 text-blue-400" />
                <span>{siteSettings.contactPhone}</span>
              </a>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

