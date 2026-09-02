import React, { useState, useMemo } from 'react';
import { useCMS } from '../context/CMSContext';
import { ArticleDetailView } from './ArticleDetailView';
import { 
  BookOpen, 
  Search, 
  Clock, 
  Calendar, 
  Tag, 
  Sliders, 
  ArrowRight, 
  ArrowLeft, 
  X, 
  AlertCircle, 
  ShieldCheck 
} from 'lucide-react';

export const KnowledgeCenterView: React.FC = () => {
  const { 
    language, 
    articles, 
    categories, 
    selectedArticleSlug, 
    setSelectedArticleSlug,
    setIsCMSStudioOpen 
  } = useCMS();
  
  const isEn = language === 'en';
  const ArrowIcon = isEn ? ArrowRight : ArrowLeft;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Filtered & Searched Articles
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      // Category filter
      if (selectedCategory !== 'all' && article.category !== selectedCategory) {
        return false;
      }
      // Search query filter
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const titleMatch = (isEn ? article.titleEn : article.titleAr).toLowerCase().includes(q);
      const answerMatch = (isEn ? article.shortAnswerEn : article.shortAnswerAr).toLowerCase().includes(q);
      const contentMatch = (isEn ? article.contentEn : article.contentAr).toLowerCase().includes(q);
      const tagsMatch = article.tags?.some(tag => tag.toLowerCase().includes(q));

      return titleMatch || answerMatch || contentMatch || tagsMatch;
    });
  }, [articles, selectedCategory, searchQuery, isEn]);

  // If viewing a single article detail
  if (selectedArticleSlug) {
    return (
      <ArticleDetailView
        slug={selectedArticleSlug}
        onBack={() => {
          setSelectedArticleSlug(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span>{isEn ? 'Evidence-Informed Health Education' : 'المركز التثقيفي والمعرفي للحجامة الطبية'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            {isEn ? 'Medical Cupping Knowledge Center' : 'مركز المعرفة والتوعية بالحجامة الطبية'}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {isEn 
              ? 'An authoritative clinical repository addressing fundamental questions, mechanisms, infection control standards, and musculoskeletal therapy.' 
              : 'مرجع تثقيفي وسريري معتمد يقدم إجابات علمية موثقة حول آليات الحجامة، معايير مكافحة العدوى، وتأهيل آلام الظهر والمفاصل.'}
          </p>
        </div>

        {/* CMS Studio Quick Trigger */}
        <button
          onClick={() => setIsCMSStudioOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold uppercase tracking-wider transition-colors shrink-0 shadow-xs cursor-pointer"
          id="knowledge-cms-manage-btn"
        >
          <Sliders className="w-3.5 h-3.5 text-blue-600" />
          <span>{isEn ? 'Manage via Framer CMS' : 'إدارة المقالات عبر Framer CMS'}</span>
        </button>
      </div>

      {/* Search and Category Filter Controls */}
      <div className="space-y-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute start-4 top-3.5 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              isEn 
                ? "Search 23 articles by keyword, condition (e.g. back pain, safety, fasting, mechanisms)..." 
                : "ابحث في 23 مقالاً بالعنوان، أو الكلمات المفتاحية (مثل: آلام الظهر، التعقيم، الصيام، الآلية السريرية)..."
            }
            className="w-full ps-12 pe-10 py-3 rounded-full bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-sm text-slate-800 transition-all"
            id="articles-search-input"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute end-4 top-3.5 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
            id="cat-filter-all"
          >
            {isEn ? `All Articles (${articles.length})` : `جميع المقالات (${articles.length})`}
          </button>

          {categories.map((cat) => {
            const count = articles.filter(a => a.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
                id={`cat-filter-${cat.id}`}
              >
                {isEn ? `${cat.nameEn} (${count})` : `${cat.nameAr} (${count})`}
              </button>
            );
          })}
        </div>

      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider px-1">
        <span>
          {isEn 
            ? `Showing ${filteredArticles.length} of ${articles.length} educational articles` 
            : `عرض ${filteredArticles.length} من أصل ${articles.length} مقالاً تثقيفياً`}
        </span>

        {(searchQuery || selectedCategory !== 'all') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            {isEn ? 'Reset filters' : 'إعادة ضبط الفلترة'}
          </button>
        )}
      </div>

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => {
            const categoryObj = categories.find(c => c.id === article.category);

            return (
              <div
                key={article.id}
                onClick={() => {
                  setSelectedArticleSlug(article.slug);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group p-6 rounded-3xl bg-white border border-slate-200 hover:border-blue-300 transition-all shadow-xs hover:shadow-md cursor-pointer flex flex-col justify-between"
                id={`article-card-${article.slug}`}
              >
                <div className="space-y-3.5">
                  {/* Category & Time */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
                      {categoryObj ? (isEn ? categoryObj.nameEn : categoryObj.nameAr) : article.category}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{article.readingTimeMinutes} {isEn ? 'min' : 'د'}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                    {isEn ? article.titleEn : article.titleAr}
                  </h3>

                  {/* Short Answer Excerpt */}
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {isEn ? article.shortAnswerEn : article.shortAnswerAr}
                  </p>

                  {/* Tags */}
                  {article.tags && article.tags.length > 0 && (
                    <div className="flex items-center gap-1.5 flex-wrap pt-1">
                      {article.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="text-[10px] text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full font-medium">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer read action */}
                <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                  <span>{isEn ? 'Read Complete Article' : 'قراءة المقال بالكامل'}</span>
                  <ArrowIcon className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            {isEn ? 'No educational articles matched your search' : 'لم يتم العثور على مقالات تطابق بحثك'}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {isEn 
              ? 'Try different keywords such as "back pain", "infection control", "fasting", or clear the category filter.' 
              : 'جرب كلمات بحث أخرى مثل: "آلام الظهر"، "التعقيم"، "الصيام"، أو أعد ضبط الفلاتر.'}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="px-5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
          >
            {isEn ? 'Show All Articles' : 'عرض كافة المقالات'}
          </button>
        </div>
      )}

      {/* Medical Disclaimer Banner */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 text-xs text-slate-600 leading-relaxed flex items-start gap-3.5 shadow-xs">
        <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-slate-900">
            {isEn ? 'Clinical Educational Standard: ' : 'المعيار التثقيفي والسريري: '}
          </span>
          {isEn
            ? 'All articles are curated for health literacy and patient awareness. They strictly reflect safe clinical practices and do not constitute independent medical prescription or medical diagnostic tests.'
            : 'جميع المقالات مخصصة لرفع الوعي الصحي والتثقيف الطبي الموثق. تعكس الممارسات السريرية الآمنة ولا تُعد وصفة علاجية مستقلة أو بديلاً عن الفحوصات الطبية.'}
        </div>
      </div>

    </div>
  );
};
