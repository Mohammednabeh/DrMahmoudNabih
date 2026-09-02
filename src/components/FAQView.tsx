import React, { useState, useMemo } from 'react';
import { useCMS } from '../context/CMSContext';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  Sliders, 
  ShieldCheck, 
  UserCheck, 
  Award, 
  MapPin, 
  Briefcase 
} from 'lucide-react';

export const FAQView: React.FC = () => {
  const { language, faqs, setIsCMSStudioOpen } = useCMS();
  const isEn = language === 'en';

  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'faq-1': true,
    'faq-2': true
  });

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const expandAll = () => {
    const allOpen: Record<string, boolean> = {};
    faqs.forEach(f => { allOpen[f.id] = true; });
    setOpenItems(allOpen);
  };

  const collapseAll = () => {
    setOpenItems({});
  };

  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return faqs;
    const q = searchQuery.toLowerCase().trim();

    return faqs.filter(f => {
      const qMatch = (isEn ? f.questionEn : f.questionAr).toLowerCase().includes(q);
      const aMatch = (isEn ? f.answerEn : f.answerAr).toLowerCase().includes(q);
      return qMatch || aMatch;
    });
  }, [faqs, searchQuery, isEn]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Header */}
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-4 h-4 text-blue-600" />
          <span>{isEn ? 'Professional Inquiries & Background' : 'الأسئلة الشائعة حول الدكتور ومؤهلاته'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
          {isEn ? 'Frequently Asked Questions' : 'الأسئلة الشائعة حول الدكتور محمود'}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          {isEn 
            ? 'Detailed answers regarding Dr. Mahmoud’s qualifications, licensing with the Saudi Commission (SCFHS), Prometric score, and clinical practice.' 
            : 'إجابات وافية وموثقة حول المؤهلات الأكاديمية للدكتور محمود، ترخيص الهيئة السعودية، نتيجة البرومتريك، وسجله السريري.'}
        </p>

        {/* Note on Scope */}
        <div className="inline-block p-3 px-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-500 shadow-xs">
          {isEn 
            ? 'Note: This FAQ specifically addresses Dr. Mahmoud’s professional credentials. For questions about cupping therapy itself, please explore the Knowledge Center.' 
            : 'تنويه: هذا القسم مخصص للمعلومات والمؤهلات المهنية للدكتور محمود. للأسئلة العامة حول الحجامة وآلياتها يرجى زيارة مركز المعرفة.'}
        </div>
      </div>

      {/* Search and Action Bar */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute start-4 top-3.5 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              isEn 
                ? "Search FAQs (e.g. SCFHS license, Prometric, Cairo University, Dammam center, experience)..." 
                : "ابحث في الأسئلة الشائعة (مثل: ترخيص الهيئة، البرومتريك، جامعة القاهرة، مقر الدمام، سنوات الخبرة)..."
            }
            className="w-full ps-12 pe-4 py-3 rounded-full bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm text-slate-800 shadow-xs"
            id="faq-search-input"
          />
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider px-2">
          <span>
            {isEn ? `${filteredFaqs.length} questions available` : `${filteredFaqs.length} أسئلة متاحة`}
          </span>
          <div className="flex items-center gap-3">
            <button onClick={expandAll} className="hover:text-blue-600 underline cursor-pointer">
              {isEn ? 'Expand all' : 'فتح الكل'}
            </button>
            <span>•</span>
            <button onClick={collapseAll} className="hover:text-blue-600 underline cursor-pointer">
              {isEn ? 'Collapse all' : 'طي الكل'}
            </button>
          </div>
        </div>
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-4">
        {filteredFaqs.map((faq) => {
          const isOpen = !!openItems[faq.id];

          return (
            <div
              key={faq.id}
              className={`rounded-3xl border transition-all overflow-hidden ${
                isOpen 
                  ? 'bg-white border-blue-300 shadow-xs' 
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full p-5 sm:p-6 text-start flex items-center justify-between gap-4 cursor-pointer"
                id={`faq-btn-${faq.id}`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-xs ${
                    isOpen ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'
                  }`}>
                    ?
                  </div>
                  <span className="font-bold text-base sm:text-lg text-slate-900 leading-snug">
                    {isEn ? faq.questionEn : faq.questionAr}
                  </span>
                </div>

                <div className="shrink-0 text-slate-400">
                  {isOpen ? <ChevronUp className="w-5 h-5 text-blue-600" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-in fade-in duration-150">
                  <p className="whitespace-pre-line">
                    {isEn ? faq.answerEn : faq.answerAr}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick CMS Trigger Footer */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 text-center space-y-3 shadow-xs">
        <p className="text-xs text-slate-600">
          {isEn 
            ? 'Need to update or add questions in Framer CMS? Open the dashboard anytime.' 
            : 'هل ترغب في تحديث أو إضافة أسئلة جديدة عبر لوحة Framer CMS؟ يمكنك فتح اللوحة بنقرة واحدة.'}
        </p>
        <button
          onClick={() => setIsCMSStudioOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-700 shadow-xs cursor-pointer"
        >
          <Sliders className="w-3.5 h-3.5 text-blue-600" />
          <span>{isEn ? 'Open FAQ in Framer CMS' : 'إدارة الأسئلة في Framer CMS'}</span>
        </button>
      </div>

    </div>
  );
};
