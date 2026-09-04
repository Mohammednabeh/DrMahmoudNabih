import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { 
  X, 
  Layers, 
  FileText, 
  HelpCircle, 
  Settings, 
  Plus, 
  Trash2, 
  Edit3, 
  Download, 
  RotateCcw, 
  Check, 
  ExternalLink, 
  Search, 
  Sliders,
  Camera,
  Lock,
  KeyRound,
  ShieldCheck,
  LogOut,
  AlertCircle,
  CheckCircle2,
  Key,
  Copy,
  Eye,
  EyeOff,
  RefreshCw
} from 'lucide-react';
import { Article, FAQItem } from '../types';

export const CMSStudioModal: React.FC = () => {
  const {
    language,
    isCMSStudioOpen,
    setIsCMSStudioOpen,
    articles,
    categories,
    faqs,
    siteSettings,
    updateSiteSettings,
    addArticle,
    updateArticle,
    deleteArticle,
    addFAQ,
    updateFAQ,
    deleteFAQ,
    resetCMSData,
    exportCMSData,
    setIsPhotoModalOpen,
    logoutAdmin,
    changeAdminPin,
    masterRecoveryKey,
    updateMasterRecoveryKey,
    verifyMasterKeyAndResetPin
  } = useCMS();

  const isEn = language === 'en';
  const [activeCollection, setActiveCollection] = useState<'articles' | 'faqs' | 'settings' | 'export'>('articles');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Editing states
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [editingFAQId, setEditingFAQId] = useState<string | null>(null);
  const [isAddingArticle, setIsAddingArticle] = useState(false);
  const [isAddingFAQ, setIsAddingFAQ] = useState(false);

  // Form states for settings
  const [tempSettings, setTempSettings] = useState(siteSettings);

  // Security PIN states
  const [currentPinInput, setCurrentPinInput] = useState('');
  const [newPinInput, setNewPinInput] = useState('');
  const [confirmPinInput, setConfirmPinInput] = useState('');
  const [forgotMode, setForgotMode] = useState(false);
  const [masterKeyForgotInput, setMasterKeyForgotInput] = useState('');
  const [showMasterKey, setShowMasterKey] = useState(false);
  const [copiedMasterKey, setCopiedMasterKey] = useState(false);
  const [newMasterKeyInput, setNewMasterKeyInput] = useState('');
  const [isEditingMasterKey, setIsEditingMasterKey] = useState(false);
  const [pinChangeStatus, setPinChangeStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [masterKeyStatus, setMasterKeyStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  if (!isCMSStudioOpen) return null;

  const handlePinChange = (e: React.FormEvent) => {
    e.preventDefault();
    setPinChangeStatus(null);

    if (forgotMode) {
      if (!masterKeyForgotInput.trim() || !newPinInput.trim()) {
        setPinChangeStatus({
          type: 'error',
          message: isEn ? 'Please enter your Master Recovery Key and new PIN.' : 'يرجى إدخال مفتاح الطوارئ السري والرمز الجديد.'
        });
        return;
      }
      if (newPinInput.trim() !== confirmPinInput.trim()) {
        setPinChangeStatus({
          type: 'error',
          message: isEn ? 'New PIN and confirmation do not match.' : 'الرمز الجديد وتأكيد الرمز غير متطابقين.'
        });
        return;
      }
      const result = verifyMasterKeyAndResetPin(masterKeyForgotInput.trim(), newPinInput.trim());
      if (result.success) {
        setPinChangeStatus({
          type: 'success',
          message: isEn ? 'Admin PIN successfully reset via Master Key!' : 'تم التحقق من مفتاح الطوارئ السري وتعيين رمز المرور بنجاح!'
        });
        setNewPinInput('');
        setConfirmPinInput('');
        setMasterKeyForgotInput('');
        setForgotMode(false);
      } else {
        setPinChangeStatus({
          type: 'error',
          message: result.error || (isEn ? 'Verification failed.' : 'فشل التحقق من مفتاح الطوارئ.')
        });
      }
      return;
    }

    if (!currentPinInput.trim() || !newPinInput.trim()) {
      setPinChangeStatus({
        type: 'error',
        message: isEn ? 'Please fill in all PIN fields.' : 'يرجى ملء جميع حقول الرمز السري.'
      });
      return;
    }

    if (newPinInput.trim() !== confirmPinInput.trim()) {
      setPinChangeStatus({
        type: 'error',
        message: isEn ? 'New PIN and confirmation do not match.' : 'الرمز الجديد وتأكيد الرمز غير متطابقين.'
      });
      return;
    }

    const result = changeAdminPin(currentPinInput, newPinInput);
    if (result.success) {
      setPinChangeStatus({
        type: 'success',
        message: isEn ? 'Admin PIN successfully updated!' : 'تم تحديث رمز مرور الإدارة بنجاح!'
      });
      setCurrentPinInput('');
      setNewPinInput('');
      setConfirmPinInput('');
    } else {
      setPinChangeStatus({
        type: 'error',
        message: result.error || (isEn ? 'Failed to update PIN.' : 'فشل تحديث رمز المرور.')
      });
    }
  };

  const handleCopyMasterKey = () => {
    navigator.clipboard.writeText(masterRecoveryKey);
    setCopiedMasterKey(true);
    setTimeout(() => setCopiedMasterKey(false), 2500);
  };

  const handleUpdateMasterKey = (e: React.FormEvent) => {
    e.preventDefault();
    setMasterKeyStatus(null);
    if (newMasterKeyInput.trim().length < 8) {
      setMasterKeyStatus({
        type: 'error',
        message: isEn ? 'Master Key must be at least 8 characters.' : 'يجب ألا يقل مفتاح الطوارئ عن 8 خانات.'
      });
      return;
    }

    updateMasterRecoveryKey(newMasterKeyInput.trim());
    setMasterKeyStatus({
      type: 'success',
      message: isEn ? 'Master Recovery Key successfully updated!' : 'تم تحديث مفتاح الطوارئ السري بنجاح!'
    });
    setNewMasterKeyInput('');
    setIsEditingMasterKey(false);
  };

  const handleGenerateRandomMasterKey = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = 'NABIH-';
    for (let i = 0; i < 4; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
    code += '-';
    for (let i = 0; i < 4; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
    setNewMasterKeyInput(code);
  };

  const handleExport = () => {
    const jsonStr = exportCMSData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `dr-mahmoud-cms-export-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-5xl h-[90vh] bg-slate-50 rounded-3xl border border-slate-300 shadow-2xl flex flex-col overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2 font-bold text-base">
                <span>CMS Studio</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-blue-900 text-blue-200">
                  Live Sync
                </span>
                <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>{isEn ? 'Admin Authorized' : 'إدارة معتمدة'}</span>
                </span>
              </div>
              <div className="text-xs text-slate-400">
                {isEn ? 'Manage Articles, FAQs, Categories, and Global Site Settings' : 'لوحة إدارة محتوى المقالات والأسئلة الشائعة وإعدادات الموقع'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold uppercase tracking-wider border border-slate-700 transition-colors cursor-pointer"
              title="Export JSON CMS Data"
            >
              <Download className="w-3.5 h-3.5 text-blue-400" />
              <span>{isEn ? 'Export JSON' : 'تصدير'}</span>
            </button>

            {/* Lock / Sign Out Button */}
            <button
              type="button"
              onClick={logoutAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-950/70 hover:bg-rose-900 text-rose-300 text-xs font-bold border border-rose-800/60 transition-colors cursor-pointer"
              title={isEn ? "Lock Admin Session" : "قفل جلسة الإدارة وتأمين اللوحة"}
              id="admin-lock-session-btn"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden sm:inline">{isEn ? 'Lock Session' : 'قفل الإدارة'}</span>
            </button>

            <button
              onClick={() => setIsCMSStudioOpen(false)}
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              id="close-cms-modal-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Collection Tabs */}
        <div className="flex items-center gap-2 px-6 pt-3 pb-2 bg-slate-100 border-b border-slate-200 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveCollection('articles')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all cursor-pointer ${
              activeCollection === 'articles' 
                ? 'bg-white text-blue-700 shadow-xs border border-slate-200' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4 text-blue-600" />
            <span>{isEn ? `Knowledge Center Articles (${articles.length})` : `مقالات مركز المعرفة (${articles.length})`}</span>
          </button>

          <button
            onClick={() => setActiveCollection('faqs')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all cursor-pointer ${
              activeCollection === 'faqs' 
                ? 'bg-white text-blue-700 shadow-xs border border-slate-200' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-blue-600" />
            <span>{isEn ? `Dr. Mahmoud FAQs (${faqs.length})` : `الأسئلة الشائعة (${faqs.length})`}</span>
          </button>

          <button
            onClick={() => setActiveCollection('settings')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all cursor-pointer ${
              activeCollection === 'settings' 
                ? 'bg-white text-blue-700 shadow-xs border border-slate-200' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Settings className="w-4 h-4 text-slate-700" />
            <span>{isEn ? 'Global Site Settings' : 'إعدادات الموقع العامة'}</span>
          </button>
        </div>

        {/* Studio Body Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* COLLECTION 1: ARTICLES */}
          {activeCollection === 'articles' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {isEn ? 'Collection: Knowledge Center Articles' : 'مجموعة البيانات: مقالات مركز المعرفة'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {isEn 
                      ? 'Structured CMS Schema: title, slug, category, readingTime, shortAnswer, content, tags, safetyWarnings' 
                      : 'هيكل بيانات منظم: العنوان، الرابط المختصر، التصنيف، وقت القراءة، الخلاصة، النص، التحذيرات'}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const titleAr = prompt('عنوان المقال الجديد (بالعربية):');
                      if (!titleAr) return;
                      const titleEn = prompt('Article Title (in English):') || titleAr;
                      const shortAr = prompt('الخلاصة السريعة (بالعربية):') || '';
                      const shortEn = prompt('Short Answer (English):') || shortAr;
                      
                      addArticle({
                        slug: `art-${Date.now()}`,
                        titleAr,
                        titleEn,
                        category: 'understanding',
                        readingTimeMinutes: 4,
                        publishedDate: new Date().toISOString().slice(0, 10),
                        shortAnswerAr: shortAr,
                        shortAnswerEn: shortEn,
                        contentAr: `${titleAr}\n\n${shortAr}`,
                        contentEn: `${titleEn}\n\n${shortEn}`,
                        authorNameAr: 'د. محمود علي نبيه',
                        authorNameEn: 'Dr. Mahmoud Ali Nabih',
                        tags: ['cupping', 'education'],
                        status: 'published'
                      });
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{isEn ? 'New Article Item' : 'إضافة مقال جديد'}</span>
                  </button>
                </div>
              </div>

              {/* Articles Table / List */}
              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="divide-y divide-slate-100 max-h-[50vh] overflow-y-auto">
                  {articles.map((art, idx) => (
                    <div key={art.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between gap-4">
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-slate-400">#{idx + 1}</span>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100">
                            {art.category}
                          </span>
                          <span className="text-xs text-slate-400">{art.readingTimeMinutes} min</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 truncate">
                          {isEn ? art.titleEn : art.titleAr}
                        </h4>
                        <p className="text-xs text-slate-500 truncate max-w-xl">
                          {isEn ? art.shortAnswerEn : art.shortAnswerAr}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => {
                            const newTitle = prompt(isEn ? 'Edit English Title:' : 'تعديل العنوان بالعربية:', isEn ? art.titleEn : art.titleAr);
                            if (newTitle) {
                              updateArticle(art.id, isEn ? { titleEn: newTitle } : { titleAr: newTitle });
                            }
                          }}
                          className="p-2 rounded-full text-slate-600 hover:bg-slate-100 hover:text-blue-600 cursor-pointer"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(isEn ? `Delete article "${art.titleEn}"?` : `حذف المقال "${art.titleAr}"؟`)) {
                              deleteArticle(art.id);
                            }
                          }}
                          className="p-2 rounded-full text-slate-400 hover:bg-red-50 hover:text-red-700 cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* COLLECTION 2: FAQS */}
          {activeCollection === 'faqs' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {isEn ? 'Collection: Dr. Mahmoud FAQ' : 'مجموعة البيانات: الأسئلة الشائعة للدكتور محمود'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {isEn 
                      ? 'Structured CMS Schema: question, answer, category, order' 
                      : 'هيكل بيانات منظم: السؤال، الإجابة، التصنيف، الترتيب'}
                  </p>
                </div>

                <button
                  onClick={() => {
                    const qAr = prompt('السؤال الجديد (بالعربية):');
                    if (!qAr) return;
                    const qEn = prompt('Question (English):') || qAr;
                    const aAr = prompt('الإجابة (بالعربية):') || '';
                    const aEn = prompt('Answer (English):') || aAr;

                    addFAQ({
                      questionAr: qAr,
                      questionEn: qEn,
                      answerAr: aAr,
                      answerEn: aEn,
                      category: 'general',
                      order: faqs.length + 1
                    });
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isEn ? 'New FAQ Item' : 'إضافة سؤال جديد'}</span>
                </button>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 divide-y divide-slate-100 max-h-[50vh] overflow-y-auto shadow-xs">
                {faqs.map((f, idx) => (
                  <div key={f.id} className="p-4 hover:bg-slate-50 transition-colors flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="text-xs font-mono font-bold text-slate-400">Q{idx + 1}</div>
                      <h4 className="text-sm font-bold text-slate-900">
                        {isEn ? f.questionEn : f.questionAr}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2">
                        {isEn ? f.answerEn : f.answerAr}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          const newAns = prompt(isEn ? 'Edit Answer:' : 'تعديل الإجابة:', isEn ? f.answerEn : f.answerAr);
                          if (newAns) {
                            updateFAQ(f.id, isEn ? { answerEn: newAns } : { answerAr: newAns });
                          }
                        }}
                        className="p-2 rounded-full text-slate-600 hover:bg-slate-100 hover:text-blue-600 cursor-pointer"
                        title="Edit Answer"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(isEn ? 'Delete this FAQ item?' : 'حذف هذا السؤال؟')) {
                            deleteFAQ(f.id);
                          }
                        }}
                        className="p-2 rounded-full text-slate-400 hover:bg-red-50 hover:text-red-700 cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* COLLECTION 3: SITE SETTINGS */}
          {activeCollection === 'settings' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {isEn ? 'Global Site Settings (Single-Item Collection)' : 'إعدادات الموقع العامة (Single-Item Collection)'}
                </h3>
                <p className="text-xs text-slate-500">
                  {isEn 
                    ? 'Changes made here reflect immediately across the Hero section, Navbar, and Footer.' 
                    : 'التغييرات المحفوظة هنا تنعكس فوراً على قسم الهيرو، القائمة الرئيسية، والتذييل.'}
                </p>
              </div>

              {/* Official Photo Card */}
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-20 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                    <img
                      src={siteSettings.doctorPhotoUrl || '/dr-mahmoud.jpg'}
                      alt={isEn ? "Dr. Mahmoud Ali Nabih" : "د. محمود علي نبيه"}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      {isEn ? "Doctor's Official Authentic Photo" : "الصورة الرسمية المعتمدة لدكتور محمود"}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {isEn 
                        ? "Preserve authentic facial features & characteristics without AI alteration" 
                        : "حفظ الملامح والهوية الحقيقية بدون أي تعديل بالذكاء الاصطناعي"}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsPhotoModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-2 shrink-0"
                >
                  <Camera className="w-4 h-4" />
                  <span>{isEn ? "Replace / Upload Original" : "رفع / استبدال بالصورة الأصلية"}</span>
                </button>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 shadow-xs">
                
                {/* Headlines */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Hero Headline (Arabic)</label>
                    <input
                      type="text"
                      value={tempSettings.heroHeadlineAr}
                      onChange={(e) => setTempSettings({ ...tempSettings, heroHeadlineAr: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Hero Headline (English)</label>
                    <input
                      type="text"
                      value={tempSettings.heroHeadlineEn}
                      onChange={(e) => setTempSettings({ ...tempSettings, heroHeadlineEn: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                {/* Subtitles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Hero Subtitle (Arabic)</label>
                    <input
                      type="text"
                      value={tempSettings.heroSubtitleAr}
                      onChange={(e) => setTempSettings({ ...tempSettings, heroSubtitleAr: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Hero Subtitle (English)</label>
                    <input
                      type="text"
                      value={tempSettings.heroSubtitleEn}
                      onChange={(e) => setTempSettings({ ...tempSettings, heroSubtitleEn: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                {/* Contact Info & WhatsApp / Booking */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 border-t border-slate-100">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Phone</label>
                    <input
                      type="text"
                      value={tempSettings.contactPhone}
                      onChange={(e) => setTempSettings({ ...tempSettings, contactPhone: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-emerald-700">WhatsApp Phone</label>
                    <input
                      type="text"
                      value={tempSettings.whatsappPhone || ''}
                      placeholder="+966 54 083 2104"
                      onChange={(e) => setTempSettings({ ...tempSettings, whatsappPhone: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-emerald-200 bg-emerald-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Primary Email</label>
                    <input
                      type="text"
                      value={tempSettings.contactEmailPrimary}
                      onChange={(e) => setTempSettings({ ...tempSettings, contactEmailPrimary: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-blue-700">Booking URL (Optional)</label>
                    <input
                      type="text"
                      value={tempSettings.bookingUrl || ''}
                      placeholder="https://..."
                      onChange={(e) => setTempSettings({ ...tempSettings, bookingUrl: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-blue-200 bg-blue-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div className="pt-3 flex justify-end">
                  <button
                    onClick={() => {
                      updateSiteSettings(tempSettings);
                      alert(isEn ? 'Site settings saved successfully!' : 'تم حفظ الإعدادات بنجاح!');
                    }}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>{isEn ? 'Save & Apply Global Settings' : 'حفظ وتطبيق الإعدادات'}</span>
                  </button>
                </div>

              </div>

              {/* Admin Security & PIN Management Card */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                      <KeyRound className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        {isEn ? "Admin Portal Security & PIN" : "أمان لوحة التحكم ورمز مرور الإدارة"}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {isEn 
                          ? "Change the restricted access PIN code for this control dashboard" 
                          : "تغيير رمز المرور السري (PIN) لمنع أي زائر من الدخول أو تعديل المحتوى"}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={logoutAdmin}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-700 text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>{isEn ? "Test Lock Now" : "قفل اللوحة الآن للتجربة"}</span>
                  </button>
                </div>

                {pinChangeStatus && (
                  <div 
                    className={`p-3.5 rounded-2xl text-xs flex items-center gap-2.5 ${
                      pinChangeStatus.type === 'success' 
                        ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' 
                        : 'bg-rose-50 border border-rose-200 text-rose-800'
                    }`}
                  >
                    {pinChangeStatus.type === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    )}
                    <span className="font-semibold">{pinChangeStatus.message}</span>
                  </div>
                )}

                <form onSubmit={handlePinChange} className="space-y-3 pt-2">
                  {forgotMode ? (
                    <div className="space-y-3 p-3.5 bg-blue-50/70 rounded-2xl border border-blue-200">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                          <Key className="w-3.5 h-3.5 text-blue-600" />
                          <span>{isEn ? "Reset via Confidential Master Recovery Key" : "استرجاع وتعيين الرمز بواسطة مفتاح الطوارئ السري"}</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => setForgotMode(false)}
                          className="text-[11px] text-blue-700 hover:text-blue-900 underline font-semibold cursor-pointer"
                        >
                          {isEn ? "Back to standard change" : "العودة للتغيير المعتاد"}
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700">
                            {isEn ? "Master Recovery Key" : "مفتاح الطوارئ السري"}
                          </label>
                          <input
                            type="password"
                            value={masterKeyForgotInput}
                            onChange={(e) => setMasterKeyForgotInput(e.target.value)}
                            placeholder="••••••••••••••••"
                            className="w-full px-3 py-2 text-xs rounded-xl border border-blue-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono font-bold"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700">
                            {isEn ? "New PIN" : "الرمز السري الجديد"}
                          </label>
                          <input
                            type="password"
                            value={newPinInput}
                            onChange={(e) => setNewPinInput(e.target.value)}
                            placeholder="••••"
                            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700">
                            {isEn ? "Confirm New PIN" : "تأكيد الرمز الجديد"}
                          </label>
                          <input
                            type="password"
                            value={confirmPinInput}
                            onChange={(e) => setConfirmPinInput(e.target.value)}
                            placeholder="••••"
                            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-slate-700">
                            {isEn ? "Current PIN" : "رمز المرور الحالي"}
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              setForgotMode(true);
                              setPinChangeStatus(null);
                            }}
                            className="text-[10px] text-blue-600 hover:text-blue-800 underline cursor-pointer"
                          >
                            {isEn ? "Forgot?" : "نسيته؟"}
                          </button>
                        </div>
                        <input
                          type="password"
                          value={currentPinInput}
                          onChange={(e) => setCurrentPinInput(e.target.value)}
                          placeholder="••••"
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">
                          {isEn ? "New PIN" : "الرمز السري الجديد"}
                        </label>
                        <input
                          type="password"
                          value={newPinInput}
                          onChange={(e) => setNewPinInput(e.target.value)}
                          placeholder={isEn ? "Min 4 characters" : "4 خانات على الأقل"}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">
                          {isEn ? "Confirm New PIN" : "تأكيد الرمز الجديد"}
                        </label>
                        <input
                          type="password"
                          value={confirmPinInput}
                          onChange={(e) => setConfirmPinInput(e.target.value)}
                          placeholder={isEn ? "Re-enter new PIN" : "أعد كتابة الرمز"}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-1">
                    {!forgotMode && (
                      <button
                        type="button"
                        onClick={() => {
                          setForgotMode(true);
                          setPinChangeStatus(null);
                        }}
                        className="text-xs text-blue-600 hover:text-blue-800 underline font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Key className="w-3.5 h-3.5" />
                        <span>{isEn ? "Forgot current PIN? Reset with Master Recovery Key" : "نسيت رمز المرور الحالي؟ استرجاع بواسطة مفتاح الطوارئ"}</span>
                      </button>
                    )}
                    {forgotMode && <div />}

                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer ml-auto"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>{forgotMode ? (isEn ? "Verify & Reset PIN" : "تأكيد التحقق وتعيين الرمز") : (isEn ? "Update Admin PIN" : "تحديث وحفظ رمز المرور")}</span>
                    </button>
                  </div>
                </form>

                {/* Emergency Master Recovery Key Management Card */}
                <div className="mt-5 p-4 rounded-2xl bg-slate-900 text-white space-y-3 shadow-sm border border-slate-800">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                        <Key className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white flex items-center gap-2">
                          <span>{isEn ? "Emergency Master Recovery Key" : "مفتاح الطوارئ السري الخاص بالإدارة"}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-900/60 text-blue-300 font-mono border border-blue-700/50">
                            {isEn ? "Confidential" : "سري وخاص"}
                          </span>
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {isEn 
                            ? "Use this key to recover admin access if you ever forget your PIN or lack phone access."
                            : "استخدم هذا المفتاح السري لاستعادة لوحة الإدارة في أي وقت في حال نسيان رمز المرور أو عدم توفر الجوال."}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setShowMasterKey(!showMasterKey)}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                        title={showMasterKey ? (isEn ? "Hide Key" : "إخفاء المفتاح") : (isEn ? "Show Key" : "إظهار المفتاح")}
                      >
                        {showMasterKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        <span>{showMasterKey ? (isEn ? "Hide" : "إخفاء") : (isEn ? "Show" : "إظهار")}</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleCopyMasterKey}
                        className="px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        {copiedMasterKey ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedMasterKey ? (isEn ? "Copied!" : "تم النسخ!") : (isEn ? "Copy" : "نسخ")}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setIsEditingMasterKey(!isEditingMasterKey)}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>{isEditingMasterKey ? (isEn ? "Close Edit" : "إلغاء التعديل") : (isEn ? "Change Key" : "تغيير المفتاح")}</span>
                      </button>
                    </div>
                  </div>

                  {/* Active Key Display */}
                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-medium">
                      {isEn ? "Active Master Key:" : "المفتاح الفعّال حالياً:"}
                    </span>
                    <span className="font-mono text-sm font-bold tracking-wider text-emerald-400">
                      {showMasterKey ? masterRecoveryKey : '••••••••••••••••'}
                    </span>
                  </div>

                  {masterKeyStatus && (
                    <div className={`p-2.5 rounded-xl text-xs flex items-center gap-2 ${
                      masterKeyStatus.type === 'success' ? 'bg-emerald-950/60 border border-emerald-800 text-emerald-300' : 'bg-rose-950/60 border border-rose-800 text-rose-300'
                    }`}>
                      {masterKeyStatus.type === 'success' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                      <span>{masterKeyStatus.message}</span>
                    </div>
                  )}

                  {/* Edit/Change Master Key Form */}
                  {isEditingMasterKey && (
                    <form onSubmit={handleUpdateMasterKey} className="space-y-2 pt-1 border-t border-slate-800 animate-in fade-in">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-300">
                          {isEn ? "Set New Master Key (min 8 chars)" : "تعيين مفتاح طوارئ جديد (8 خانات على الأقل)"}
                        </label>
                        <button
                          type="button"
                          onClick={handleGenerateRandomMasterKey}
                          className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer font-semibold"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>{isEn ? "Generate Random Safe Key" : "توليد كود عشوائي قوي"}</span>
                        </button>
                      </div>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newMasterKeyInput}
                          onChange={(e) => setNewMasterKeyInput(e.target.value)}
                          placeholder={isEn ? "Enter new secret key" : "أدخل مفتاح الطوارئ الجديد"}
                          className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white font-mono font-bold focus:outline-none focus:border-blue-500"
                        />
                        <button
                          type="submit"
                          className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold cursor-pointer"
                        >
                          {isEn ? "Save Master Key" : "حفظ المفتاح الجديد"}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Bottom Status Bar */}
        <div className="px-6 py-3 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{isEn ? 'CMS State Synced with Local Storage' : 'البيانات متزامنة مع التخزين المحلي'}</span>
          </div>

          <button
            onClick={() => {
              if (confirm(isEn ? 'Reset all CMS collections back to the original verified data?' : 'استعادة كافة المقالات والأسئلة لبيانات المصدر المعتمدة الأصلية؟')) {
                resetCMSData();
                setTempSettings(siteSettings);
                alert(isEn ? 'Data reset to defaults.' : 'تم استعادة البيانات الأصلية.');
              }
            }}
            className="inline-flex items-center gap-1 text-slate-500 hover:text-red-700 font-semibold cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isEn ? 'Reset to Initial Verified Data' : 'استعادة البيانات المعتمدة الأصلية'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
