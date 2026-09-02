import React from 'react';
import { useCMS } from '../context/CMSContext';
import { 
  Sliders, 
  Layers, 
  FileText, 
  HelpCircle, 
  Settings, 
  Download, 
  Database, 
  Code2, 
  ExternalLink, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft 
} from 'lucide-react';

export const CMSGuideView: React.FC = () => {
  const { language, setIsCMSStudioOpen, exportCMSData } = useCMS();
  const isEn = language === 'en';
  const ArrowIcon = isEn ? ArrowRight : ArrowLeft;

  const handleExport = () => {
    const jsonStr = exportCMSData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `dr-mahmoud-framer-cms-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs sm:text-sm font-semibold">
          <Sliders className="w-4 h-4 text-teal-700" />
          <span>{isEn ? 'Framer CMS Architecture Specification' : 'هيكلية وإدارة محتوى موقع Framer CMS'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
          {isEn ? 'Framer CMS Implementation Guide' : 'دليل إدارة المحتوى وهيكلية Framer CMS'}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
          {isEn 
            ? 'This website is built with a complete Framer CMS-driven data architecture. Every article, FAQ entry, and global setting is decoupled into structured collections ready for Framer import or live in-app management.' 
            : 'تم بناء هذا الموقع المعماري وفق فلسفة Framer CMS بالكامل. كل مقال، وسؤال شائع، وإعداد عام مبني داخل مجموعات بيانات منظمة جاهزة للاستيراد المباشر إلى Framer أو الإدارة الحية.'}
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={() => setIsCMSStudioOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
          >
            <Sliders className="w-4 h-4 text-orange-300" />
            <span>{isEn ? 'Open Interactive CMS Studio' : 'فتح لوحة التحكم التفاعلية CMS'}</span>
          </button>

          <button
            onClick={handleExport}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-700 border border-stone-300 font-bold text-xs transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-teal-700" />
            <span>{isEn ? 'Export Full CMS Data (JSON)' : 'تصدير كامل بيانات CMS (JSON)'}</span>
          </button>
        </div>
      </div>

      {/* 4 Core Collections Schema Cards */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">
          {isEn ? 'The 4 Framer CMS Collections' : 'مجموعات بيانات Framer CMS الأربعة'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Collection 1: Knowledge Center Articles */}
          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-800 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  {isEn ? '1. Collection: "Knowledge Center"' : '١. مجموعة: مقالات مركز المعرفة'}
                </h3>
                <span className="text-xs text-slate-500 font-mono">Collection Name: articles</span>
              </div>
            </div>

            <div className="text-xs text-slate-600 space-y-2 leading-relaxed">
              <p className="font-semibold text-slate-800">
                {isEn ? 'Field Schema & Types:' : 'الحقول والأنواع البرمجية:'}
              </p>
              <ul className="space-y-1.5 font-mono text-[11px] bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                <li>• <span className="text-teal-800 font-bold">titleAr / titleEn</span>: Text (Heading)</li>
                <li>• <span className="text-teal-800 font-bold">slug</span>: Slug / Unique URL Path</li>
                <li>• <span className="text-teal-800 font-bold">category</span>: Reference (to Categories)</li>
                <li>• <span className="text-teal-800 font-bold">publishedDate</span>: Date / String</li>
                <li>• <span className="text-teal-800 font-bold">readingTimeMinutes</span>: Number</li>
                <li>• <span className="text-teal-800 font-bold">shortAnswerAr / shortAnswerEn</span>: Formatted Text / Callout</li>
                <li>• <span className="text-teal-800 font-bold">contentAr / contentEn</span>: Formatted Markdown Text</li>
                <li>• <span className="text-teal-800 font-bold">safetyWarningAr / safetyWarningEn</span>: Text (Optional)</li>
                <li>• <span className="text-teal-800 font-bold">tags</span>: Array / Tag Multi-select</li>
              </ul>
            </div>
          </div>

          {/* Collection 2: Dr. Mahmoud FAQ */}
          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-50 text-orange-700 flex items-center justify-center">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  {isEn ? '2. Collection: "Dr. Mahmoud FAQ"' : '٢. مجموعة: أسئلة الدكتور محمود الشائعة'}
                </h3>
                <span className="text-xs text-slate-500 font-mono">Collection Name: faqs</span>
              </div>
            </div>

            <div className="text-xs text-slate-600 space-y-2 leading-relaxed">
              <p className="font-semibold text-slate-800">
                {isEn ? 'Field Schema & Types:' : 'الحقول والأنواع البرمجية:'}
              </p>
              <ul className="space-y-1.5 font-mono text-[11px] bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                <li>• <span className="text-orange-700 font-bold">questionAr / questionEn</span>: Text</li>
                <li>• <span className="text-orange-700 font-bold">answerAr / answerEn</span>: Formatted Text</li>
                <li>• <span className="text-orange-700 font-bold">category</span>: Option / String</li>
                <li>• <span className="text-orange-700 font-bold">order</span>: Number (Integer Sort)</li>
              </ul>
              <p className="text-[11px] text-stone-500 italic">
                {isEn 
                  ? 'Strict rule: Exclusively contains professional background, qualifications, and licensing inquiries.' 
                  : 'قاعدة صارمة: تحتوي حصرياً على أسئلة المؤهلات والتراخيص والمسيرة المهنية للدكتور محمود.'}
              </p>
            </div>
          </div>

          {/* Collection 3: Categories */}
          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  {isEn ? '3. Collection: "Categories"' : '٣. مجموعة: التصنيفات المعرفية'}
                </h3>
                <span className="text-xs text-slate-500 font-mono">Collection Name: categories</span>
              </div>
            </div>

            <div className="text-xs text-slate-600 space-y-2 leading-relaxed">
              <p className="font-semibold text-slate-800">
                {isEn ? 'Field Schema & Types:' : 'الحقول والأنواع البرمجية:'}
              </p>
              <ul className="space-y-1.5 font-mono text-[11px] bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                <li>• <span className="text-slate-800 font-bold">id / slug</span>: String (understanding, safety, etc.)</li>
                <li>• <span className="text-slate-800 font-bold">nameAr / nameEn</span>: Text</li>
                <li>• <span className="text-slate-800 font-bold">descriptionAr / descriptionEn</span>: Text</li>
              </ul>
            </div>
          </div>

          {/* Collection 4: Site Settings */}
          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  {isEn ? '4. Single Item: "Site Settings"' : '٤. إعدادات الموقع العامة (Single Item)'}
                </h3>
                <span className="text-xs text-slate-500 font-mono">Global Fields / Single Collection</span>
              </div>
            </div>

            <div className="text-xs text-slate-600 space-y-2 leading-relaxed">
              <p className="font-semibold text-slate-800">
                {isEn ? 'Global Config Fields:' : 'حقول الإعدادات الشاملة:'}
              </p>
              <ul className="space-y-1.5 font-mono text-[11px] bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                <li>• <span className="text-amber-800 font-bold">heroHeadlineAr / heroHeadlineEn</span>: Text</li>
                <li>• <span className="text-amber-800 font-bold">heroSubtitleAr / heroSubtitleEn</span>: Text</li>
                <li>• <span className="text-amber-800 font-bold">contactPhone</span>: Text (+966 54 083 2104)</li>
                <li>• <span className="text-amber-800 font-bold">contactEmailPrimary / Secondary</span>: Text</li>
                <li>• <span className="text-amber-800 font-bold">locationAr / locationEn</span>: Text (Dammam, KSA)</li>
                <li>• <span className="text-amber-800 font-bold">drPhotoUrl</span>: Image asset path</li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* Step-by-Step Guide for Updating via Framer */}
      <div className="p-8 rounded-3xl bg-stone-100/80 border border-stone-200 space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900">
            {isEn ? 'How Content is Updated in Framer Studio' : 'كيفية تحديث محتوى الموقع في بيئة Framer'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {isEn 
              ? 'Clear 3-step operational workflow for Framer designers, medical editors, and content managers.' 
              : 'خطوات العمل التشغيلية لإدارة وتحديث المحتوى للمصممين ومحرري المحتوى الطبي.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-white border border-stone-200 space-y-2 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center font-bold text-xs">
              01
            </div>
            <h3 className="font-bold text-slate-900 text-sm">
              {isEn ? 'Open CMS Panel in Framer' : 'فتح لوحة CMS في Framer'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isEn 
                ? 'From Framer’s left-hand sidebar, navigate to the CMS Collections icon to view "Knowledge Center" or "Dr. Mahmoud FAQ".' 
                : 'من الشريط الجانبي في Framer، انقر على أيقونة CMS واختر المجموعة المراد تعديلها سواء المقالات أو الأسئلة الشائعة.'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-stone-200 space-y-2 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-700 flex items-center justify-center font-bold text-xs">
              02
            </div>
            <h3 className="font-bold text-slate-900 text-sm">
              {isEn ? 'Edit Bilingual Fields' : 'تحرير الحقول ثنائية اللغة'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isEn 
                ? 'Fill in the corresponding Arabic and English text fields. Framer components dynamically bind to the active language.' 
                : 'قم بتعديل النصوص باللغتين العربية والإنجليزية. ترتبط المكونات تلقائياً بالحقول حسب اللغة النشطة.'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-stone-200 space-y-2 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-xs">
              03
            </div>
            <h3 className="font-bold text-slate-900 text-sm">
              {isEn ? 'Publish / Sync' : 'النشر والتحديث الفوري'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isEn 
                ? 'Click Publish in Framer. The static pages, detail views, and category filters re-index automatically.' 
                : 'انقر على Publish لنشر التعديلات فورياً، حيث تتحدث صفحات المقالات وفلاتر البحث تلقائياً.'}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
