import React from 'react';
import { useCMS } from '../context/CMSContext';
import { 
  Briefcase, 
  Building2, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Award, 
  Building, 
  Sparkles 
} from 'lucide-react';
import { initialExperiences } from '../data/initialData';

export const ExperienceView: React.FC = () => {
  const { language } = useCMS();
  const isEn = language === 'en';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider">
          <Briefcase className="w-4 h-4 text-blue-600" />
          <span>{isEn ? 'Clinical Career Timeline' : 'السجل الوظيفي والخبرات السريرية'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
          {isEn ? 'Professional Hospital Experience' : 'المسيرة المهنية والخبرات السريرية'}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          {isEn 
            ? 'Over 15 years of progressive clinical expertise across prominent tertiary hospitals, specialized rehabilitation institutions, and authorized cupping centers in Saudi Arabia and Egypt.' 
            : 'أكثر من 15 عاماً من العمل السريري التخصصي في كبرى المستشفيات الجامعية والدولية ومراكز الحجامة الطبية المعتمدة في المملكة العربية السعودية ومصر.'}
        </p>
      </div>

      {/* Timeline List */}
      <div className="relative border-s-2 border-slate-200 rtl:border-s-0 rtl:border-e-2 ms-4 rtl:ms-0 rtl:me-4 space-y-10">
        
        {initialExperiences.map((exp, index) => {
          return (
            <div key={exp.id} className="relative ps-8 rtl:ps-0 rtl:pe-8 group">
              
              {/* Timeline Marker Dot */}
              <div className={`absolute -start-[9px] rtl:-start-auto rtl:-end-[9px] top-1.5 w-4 h-4 rounded-full border-2 border-white transition-all ${
                exp.isCurrent 
                  ? 'bg-blue-600 ring-4 ring-blue-100 scale-125' 
                  : 'bg-slate-300 group-hover:bg-blue-600'
              }`} />

              {/* Experience Card */}
              <div className={`p-6 sm:p-8 rounded-3xl bg-white border transition-all shadow-xs hover:shadow-md space-y-4 ${
                exp.isCurrent 
                  ? 'border-blue-300 bg-linear-to-b from-blue-50/30 to-white' 
                  : 'border-slate-200'
              }`}>
                
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-blue-600">
                        {isEn ? exp.periodEn : exp.periodAr}
                      </span>
                      {exp.isCurrent && (
                        <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                          {isEn ? 'Current Practice' : 'العمل الحالي'}
                        </span>
                      )}
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                      {isEn ? exp.titleEn : exp.titleAr}
                    </h2>
                  </div>

                  <div className="text-start sm:text-end">
                    <div className="font-bold text-slate-800 text-sm sm:text-base flex items-center gap-1.5 sm:justify-end">
                      <Building2 className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{isEn ? exp.organizationEn : exp.organizationAr}</span>
                    </div>
                    <div className="text-xs text-slate-400 font-medium flex items-center gap-1 mt-0.5 sm:justify-end">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{isEn ? exp.locationEn : exp.locationAr}</span>
                    </div>
                  </div>
                </div>

                {/* Responsibilities list */}
                <div className="space-y-2">
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {isEn ? 'Key Clinical Responsibilities & Achievements:' : 'المهام والمسؤوليات السريرية والإنجازات:'}
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1">
                    {(isEn ? exp.responsibilitiesEn : exp.responsibilitiesAr).map((resp, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          );
        })}

      </div>

    </div>
  );
};
