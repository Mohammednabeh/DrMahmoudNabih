import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { 
  Award, 
  GraduationCap, 
  ShieldCheck, 
  FileBadge, 
  Calendar, 
  Building, 
  CheckCircle, 
  HeartPulse, 
  Flame, 
  Activity, 
  Filter 
} from 'lucide-react';
import { initialQualifications } from '../data/initialData';

export const QualificationsView: React.FC = () => {
  const { language } = useCMS();
  const isEn = language === 'en';

  const [activeFilter, setActiveFilter] = useState<'all' | 'degree' | 'diploma' | 'certificate'>('all');

  const filteredItems = initialQualifications.filter(item => {
    if (activeFilter === 'all') return true;
    return item.type === activeFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider">
          <Award className="w-4 h-4 text-blue-600" />
          <span>{isEn ? 'Academic Credentials & Certificates' : 'المؤهلات الأكاديمية والشهادات المهنية'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
          {isEn ? 'Verified Qualifications' : 'المؤهلات والشهادات المعتمدة'}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          {isEn 
            ? 'Complete record of Dr. Mahmoud’s university degree, postgraduate clinical diplomas, and specialized professional certifications.' 
            : 'السجل الأكاديمي والمهني الشامل لشهادات الدكتور محمود علي نبيه من جامعة القاهرة، دبلومات الدراسات العليا، والشهادات التخصصية.'}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 me-2">
          <Filter className="w-3.5 h-3.5" />
          <span>{isEn ? 'Filter by:' : 'تصنيف حسب:'}</span>
        </div>
        
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeFilter === 'all' 
              ? 'bg-slate-900 text-white shadow-xs' 
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          {isEn ? `All Credentials (${initialQualifications.length})` : `الكل (${initialQualifications.length})`}
        </button>

        <button
          onClick={() => setActiveFilter('degree')}
          className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeFilter === 'degree' 
              ? 'bg-slate-900 text-white shadow-xs' 
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          {isEn ? 'University Degrees' : 'الشهادات الجامعية'}
        </button>

        <button
          onClick={() => setActiveFilter('diploma')}
          className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeFilter === 'diploma' 
              ? 'bg-slate-900 text-white shadow-xs' 
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          {isEn ? 'Postgraduate Diplomas' : 'دبلومات الدراسات العليا'}
        </button>

        <button
          onClick={() => setActiveFilter('certificate')}
          className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeFilter === 'certificate' 
              ? 'bg-slate-900 text-white shadow-xs' 
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          {isEn ? 'Clinical Certifications' : 'الدورات والشهادات السريرية'}
        </button>
      </div>

      {/* Grid of Qualifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const isDegree = item.type === 'degree';
          const isDiploma = item.type === 'diploma';

          return (
            <div
              key={item.id}
              className={`p-6 rounded-3xl bg-white border transition-all shadow-xs hover:shadow-md flex flex-col justify-between ${
                isDegree 
                  ? 'border-blue-300 bg-blue-50/20' 
                  : isDiploma 
                  ? 'border-indigo-300/80 bg-indigo-50/20' 
                  : 'border-slate-200'
              }`}
            >
              <div className="space-y-3.5">
                {/* Badge header */}
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    isDegree 
                      ? 'bg-blue-100 text-blue-800' 
                      : isDiploma 
                      ? 'bg-indigo-100 text-indigo-800' 
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {isDegree 
                      ? (isEn ? 'University Degree' : 'درجة جامعية')
                      : isDiploma 
                      ? (isEn ? 'Postgraduate Diploma' : 'دبلوم دراسات عليا')
                      : (isEn ? 'Clinical Certificate' : 'شهادة مهنية')}
                  </span>
                  
                  <div className="flex items-center gap-1 text-xs text-slate-400 font-semibold">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{isEn ? item.yearEn : item.yearAr}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {isEn ? item.titleEn : item.titleAr}
                </h3>

                {/* Institution */}
                <div className="flex items-start gap-2 text-xs text-slate-600">
                  <Building className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span className="font-medium">{isEn ? item.institutionEn : item.institutionAr}</span>
                </div>

                {/* Details / Specialization */}
                {(item.detailsEn || item.detailsAr) && (
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 leading-relaxed">
                    <span>{isEn ? item.detailsEn : item.detailsAr}</span>
                  </div>
                )}
              </div>

              {/* Verified check indicator */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5 text-blue-700 font-bold">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{isEn ? 'Verified in CV' : 'موثق في السيرة الذاتية'}</span>
                </span>
                <span className="text-[10px] font-bold text-slate-400 tracking-wider">
                  {item.type.toUpperCase()}
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
