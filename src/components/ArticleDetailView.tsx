import React from 'react';
import { useCMS } from '../context/CMSContext';
import { 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  Calendar, 
  User, 
  AlertTriangle, 
  ShieldAlert, 
  Tag, 
  BookOpen, 
  CheckCircle2, 
  Share2, 
  BookmarkCheck, 
  Printer 
} from 'lucide-react';

interface ArticleDetailViewProps {
  slug: string;
  onBack: () => void;
}

export const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({ slug, onBack }) => {
  const { language, articles, categories, setSelectedArticleSlug, siteSettings } = useCMS();
  const isEn = language === 'en';
  const BackArrow = isEn ? ArrowLeft : ArrowRight;

  const article = articles.find(a => a.slug === slug) || articles[0];
  const category = categories.find(c => c.id === article?.category);

  // Related articles from same category
  const relatedArticles = articles
    .filter(a => a.id !== article?.id && a.category === article?.category)
    .slice(0, 3);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">
          {isEn ? 'Article Not Found' : 'المقال غير موجود'}
        </h2>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 bg-teal-800 text-white rounded-lg text-sm font-semibold"
        >
          <BackArrow className="w-4 h-4" />
          <span>{isEn ? 'Back to Knowledge Center' : 'العودة لمركز المعرفة'}</span>
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    alert(isEn ? 'Link copied to clipboard!' : 'تم نسخ الرابط بنجاح!');
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      
      {/* Top Back Nav & Quick Tools */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
          id="article-back-btn"
        >
          <BackArrow className="w-4 h-4" />
          <span>{isEn ? 'Back to All Articles' : 'الرجوع إلى جميع المقالات'}</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            className="p-2.5 rounded-full text-slate-500 hover:text-blue-600 hover:bg-slate-100 transition-colors cursor-pointer"
            title={isEn ? "Share / Copy Link" : "نسخ الرابط"}
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={handlePrint}
            className="p-2.5 rounded-full text-slate-500 hover:text-blue-600 hover:bg-slate-100 transition-colors cursor-pointer"
            title={isEn ? "Print Article" : "طباعة المقال"}
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Article Header Metadata */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
            {category ? (isEn ? category.nameEn : category.nameAr) : article.category}
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1 text-slate-400 font-medium">
            <Clock className="w-3.5 h-3.5" />
            <span>{article.readingTimeMinutes} {isEn ? 'min read' : 'دقائق قراءة'}</span>
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1 text-slate-400 font-medium">
            <Calendar className="w-3.5 h-3.5" />
            <span>{article.publishedDate}</span>
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
          {isEn ? article.titleEn : article.titleAr}
        </h1>

        {/* Author Byline */}
        <div className="flex items-center gap-3 pt-2">
          <img
            src={siteSettings.doctorPhotoUrl || '/dr-mahmoud.jpg'}
            alt={isEn ? "Dr. Mahmoud Ali Nabih" : "د. محمود علي نبيه"}
            className="w-10 h-10 rounded-full object-cover border border-slate-200"
          />
          <div>
            <div className="text-sm font-bold text-slate-900">
              {isEn ? article.authorNameEn : article.authorNameAr}
            </div>
            <div className="text-xs text-slate-400 font-medium">
              {isEn ? 'Specialist Physiotherapist & Cupping Practitioner' : 'أخصائي علاج طبيعي وخبير الحجامة الطبية'}
            </div>
          </div>
        </div>
      </div>

      {/* Short Answer / Key Takeaway Box (Prominently Featured) */}
      <div className="p-6 sm:p-7 rounded-3xl bg-blue-50/60 border border-blue-100 shadow-xs space-y-2">
        <div className="flex items-center gap-2 text-blue-900 font-bold text-xs uppercase tracking-widest">
          <BookmarkCheck className="w-4 h-4 text-blue-600" />
          <span>{isEn ? 'Key Takeaway / Short Answer' : 'خلاصة المقال والإجابة السريعة'}</span>
        </div>
        <p className="text-sm sm:text-base text-blue-950 font-medium leading-relaxed">
          {isEn ? article.shortAnswerEn : article.shortAnswerAr}
        </p>
      </div>

      {/* Safety Warnings / Contraindications (When Applicable) */}
      {((isEn && article.safetyWarningEn) || (!isEn && article.safetyWarningAr)) && (
        <div className="p-6 rounded-3xl bg-amber-50/70 border border-amber-200 text-amber-950 space-y-2">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{isEn ? 'Important Clinical Caution & Contraindications' : 'تنبيه سريري هام وموانع الاستخدام'}</span>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed text-amber-900">
            {isEn ? article.safetyWarningEn : article.safetyWarningAr}
          </p>
        </div>
      )}

      {/* Full Detailed Explanation Content */}
      <div className="prose prose-slate max-w-none text-slate-700 text-base leading-relaxed space-y-4 pt-2">
        {(isEn ? article.contentEn : article.contentAr)
          .split('\n\n')
          .filter(paragraph => paragraph.trim().length > 0)
          .map((paragraph, index) => {
            // Check if paragraph is a heading or bullet list
            if (paragraph.startsWith('### ') || paragraph.startsWith('## ')) {
              return (
                <h3 key={index} className="text-xl font-bold text-slate-900 pt-4 pb-1 border-b border-slate-100">
                  {paragraph.replace(/^[#\s]+/, '')}
                </h3>
              );
            }
            if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
              const items = paragraph.split('\n').filter(line => line.trim());
              return (
                <ul key={index} className="space-y-2 ps-4">
                  {items.map((it, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{it.replace(/^[-*]\s*/, '')}</span>
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={index} className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {paragraph}
              </p>
            );
          })}
      </div>

      {/* Tags */}
      {article.tags && article.tags.length > 0 && (
        <div className="pt-6 border-t border-slate-200">
          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{isEn ? 'Tags:' : 'الوسوم:'}</span>
            {article.tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Medical Disclaimer inside Article */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 text-xs text-slate-600 leading-relaxed flex items-start gap-3.5 shadow-xs">
        <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-slate-900">
            {isEn ? 'Medical Awareness Note: ' : 'إخلاء مسؤولية طبي: '}
          </span>
          {isEn
            ? 'This article is prepared solely for health education and awareness. It is not a substitute for formal clinical consultation, lab testing, or treatment prescribed by authorized physicians.'
            : 'هذا المحتوى مقدم لأغراض التثقيف الصحي والتوعية العامة فقط، ولا يغني بأي حال عن الاستشارة الطبية المتخصصة أو التقييم السريري لدى الأطباء المصرح لهم.'}
        </div>
      </div>

      {/* Related Articles in Same Category */}
      {relatedArticles.length > 0 && (
        <div className="pt-8 border-t border-slate-200 space-y-6">
          <div className="flex items-center gap-2 text-lg font-bold text-slate-900">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <h2>{isEn ? 'Related Educational Articles' : 'مقالات ذات صلة في نفس التصنيف'}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedArticles.map((rel) => (
              <div
                key={rel.id}
                onClick={() => {
                  setSelectedArticleSlug(rel.slug);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-blue-300 transition-all shadow-xs hover:shadow-md cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="text-xs text-slate-400 font-medium">
                    {rel.readingTimeMinutes} {isEn ? 'min read' : 'دقائق قراءة'}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                    {isEn ? rel.titleEn : rel.titleAr}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {isEn ? rel.shortAnswerEn : rel.shortAnswerAr}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-100 text-xs font-bold text-blue-600">
                  {isEn ? 'Read →' : '← قراءة'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Back Button */}
      <div className="pt-6 text-center">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider shadow-xs transition-all cursor-pointer"
        >
          <BackArrow className="w-4 h-4" />
          <span>{isEn ? 'Return to Knowledge Center' : 'العودة لقائمة المقالات'}</span>
        </button>
      </div>

    </article>
  );
};
