import React, { useState } from 'react';
import { GeneratedSEO } from '../utils/seo';
import { Language } from '../types';
import { Search, Globe, Code2, Copy, Check, Sparkles, ChevronDown, ChevronUp, Share2 } from 'lucide-react';

interface ArticleSEOCardProps {
  seo: GeneratedSEO;
  language: Language;
  slug: string;
}

export const ArticleSEOCard: React.FC<ArticleSEOCardProps> = ({ seo, language, slug }) => {
  const isEn = language === 'en';
  const [isOpen, setIsOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const titleLength = seo.title.length;
  const descLength = seo.description.length;

  // Citation string
  const citationText = isEn
    ? `Nabih, M. A. (${seo.publishedTime.substring(0, 4)}). "${seo.ogTitle.split(' | ')[0]}". Medical Cupping Knowledge Repository, Dammam, Saudi Arabia. Retrieved from ${seo.canonicalUrl}`
    : `نبيه، محمود علي (${seo.publishedTime.substring(0, 4)}). "${seo.ogTitle.split(' | ')[0]}". مركز المعرفة والتوعية بالحجامة الطبية، الدمام، المملكة العربية السعودية. متاح عبر: ${seo.canonicalUrl}`;

  return (
    <div 
      id="article-seo-meta-card"
      className="rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-xs shadow-xs overflow-hidden transition-all duration-200"
    >
      {/* Header Bar */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between gap-4 bg-slate-50/70 hover:bg-slate-100/70 transition-colors text-left cursor-pointer"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 shadow-2xs">
            <Search className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900">
                {isEn ? "Programmatic SEO & Search Engine Indexing" : "تهيئة محركات البحث والفهرسة الطبية (Dynamic SEO)"}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                {isEn ? "Schema.org Verified" : "مفهرس تلقائياً"}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {isEn 
                ? "Dynamically generated meta title, description & MedicalWebPage Schema.org structured data" 
                : "توليد ديناميكي لعنوان ومقتطف الميتا ومخطط البيانات المنظمة الطبية للمقال"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-blue-600 hidden sm:inline">
            {isOpen ? (isEn ? "Hide Details" : "إخفاء التفاصيل") : (isEn ? "View Google Snippet & Meta" : "معاينة نتائج جوجل والميتا")}
          </span>
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </div>
      </button>

      {/* Expanded Content */}
      {isOpen && (
        <div className="p-6 space-y-6 border-t border-slate-100 animate-in fade-in duration-150">
          
          {/* Google Search Result Snippet Simulation */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-blue-600" />
                <span>{isEn ? "Google Search Result Preview (SERP)" : "معاينة الظهور في نتائج بحث جوجل"}</span>
              </label>
              <span className="text-[11px] text-slate-400 font-mono">
                {isEn ? "Desktop & Mobile Format" : "صيغة أجهزة الجوال وسطح المكتب"}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1 font-sans max-w-2xl">
              {/* URL Breadcrumb */}
              <div className="flex items-center gap-1.5 text-xs text-slate-600 direction-ltr text-left">
                <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-[10px] text-slate-500 font-bold">
                  G
                </div>
                <span className="text-slate-800 font-medium">drmahmoud-cupping.com</span>
                <span className="text-slate-400">&rsaquo;</span>
                <span className="text-slate-600">{seo.section}</span>
                <span className="text-slate-400">&rsaquo;</span>
                <span className="text-slate-500 truncate max-w-xs">{slug}</span>
              </div>

              {/* Dynamic Title Link */}
              <div className="pt-1">
                <a 
                  href={seo.canonicalUrl} 
                  onClick={(e) => e.preventDefault()}
                  className="text-base sm:text-lg font-medium text-[#1a0dab] hover:underline cursor-pointer leading-snug line-clamp-2"
                >
                  {seo.title}
                </a>
              </div>

              {/* Dynamic Snippet Description */}
              <p className="text-xs sm:text-sm text-[#4d5156] leading-relaxed line-clamp-2 pt-0.5">
                <span className="text-slate-500 font-semibold">{seo.publishedTime} — </span>
                {seo.description}
              </p>
            </div>
          </div>

          {/* Generated Meta Breakdown Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Meta Title */}
            <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">
                  {isEn ? "Dynamic Meta Title (<title>)" : "عنوان الميتا الديناميكي (<title>)"}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  titleLength <= 65 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {titleLength} {isEn ? "chars (optimal 50-65)" : "حرف (المثالي: 50-65)"}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-800 break-words flex items-start justify-between gap-2">
                <span>{seo.title}</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(seo.title, 'title')}
                  className="p-1 rounded text-slate-400 hover:text-blue-600 hover:bg-slate-100 shrink-0"
                  title={isEn ? "Copy Title" : "نسخ العنوان"}
                >
                  {copiedField === 'title' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Meta Description */}
            <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">
                  {isEn ? "Dynamic Meta Description (<meta description>)" : "وصف الميتا الديناميكي (<meta description>)"}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  descLength <= 165 && descLength >= 120 ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {descLength} {isEn ? "chars (optimal 140-160)" : "حرف (المثالي: 140-160)"}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-800 break-words flex items-start justify-between gap-2">
                <span>{seo.description}</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(seo.description, 'desc')}
                  className="p-1 rounded text-slate-400 hover:text-blue-600 hover:bg-slate-100 shrink-0"
                  title={isEn ? "Copy Description" : "نسخ الوصف"}
                >
                  {copiedField === 'desc' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

          </div>

          {/* Targeted Search Indexing Keywords */}
          <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-2">
            <span className="text-xs font-bold text-slate-700">
              {isEn ? "Targeted Clinical Search Keywords & Topics" : "الكلمات المفتاحية والموضوعات السريرية المستهدفة"}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {seo.keywords.split(', ').map((kw, i) => (
                <span 
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-700 shadow-2xs"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Academic & Clinical Citation */}
          <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>{isEn ? "Clinical & Academic Citation Format" : "صيغة الاقتباس الأكاديمي والتوثيق الطبي"}</span>
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(citationText, 'citation')}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-blue-200 text-xs font-semibold text-blue-700 hover:bg-blue-50 transition-colors shadow-2xs"
              >
                {copiedField === 'citation' ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>{isEn ? "Copied!" : "تم النسخ"}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-blue-600" />
                    <span>{isEn ? "Copy Citation" : "نسخ الاقتباس"}</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-xs text-slate-700 font-mono bg-white p-3 rounded-xl border border-blue-100/80 leading-relaxed break-words">
              {citationText}
            </p>
          </div>

          {/* JSON-LD Schema Code Inspector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-blue-600" />
                <span>Schema.org MedicalWebPage JSON-LD (Search Bot Structured Data)</span>
              </label>
              <button
                type="button"
                onClick={() => copyToClipboard(JSON.stringify(seo.schemaJsonLd, null, 2), 'schema')}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition-colors"
              >
                {copiedField === 'schema' ? (
                  <Check className="w-3 h-3 text-emerald-600" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
                <span>{copiedField === 'schema' ? (isEn ? "Copied JSON" : "تم نسخ الكود") : (isEn ? "Copy Schema" : "نسخ الكود")}</span>
              </button>
            </div>
            <pre className="p-3 rounded-xl bg-slate-900 text-slate-200 text-[11px] font-mono overflow-x-auto max-h-48 border border-slate-800 direction-ltr text-left">
              {JSON.stringify(seo.schemaJsonLd, null, 2)}
            </pre>
          </div>

        </div>
      )}
    </div>
  );
};
