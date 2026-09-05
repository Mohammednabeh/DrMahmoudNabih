import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Language, 
  PageTab, 
  Category, 
  Article, 
  FAQItem, 
  SiteSettings 
} from '../types';
import { 
  initialCategories, 
  initialArticles, 
  initialFAQ, 
  initialSiteSettings,
  drMahmoudDefaultPhoto 
} from '../data/initialData';
import { 
  optimizePhoto, 
  savePhotoToIndexedDB, 
  getPhotoFromIndexedDB, 
  clearPhotoFromIndexedDB 
} from '../utils/photoStorage';

interface CMSContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  activeTab: PageTab;
  setActiveTab: (tab: PageTab) => void;
  selectedArticleSlug: string | null;
  setSelectedArticleSlug: (slug: string | null) => void;
  
  // CMS Collections
  categories: Category[];
  articles: Article[];
  faqs: FAQItem[];
  siteSettings: SiteSettings;
  
  // Actions
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
  addArticle: (article: Omit<Article, 'id'>) => void;
  updateArticle: (id: string, article: Partial<Article>) => void;
  deleteArticle: (id: string) => void;
  addFAQ: (faq: Omit<FAQItem, 'id'>) => void;
  updateFAQ: (id: string, faq: Partial<FAQItem>) => void;
  deleteFAQ: (id: string) => void;
  resetCMSData: () => void;
  exportCMSData: () => string;
  
  // CMS Studio Drawer / View
  isCMSStudioOpen: boolean;
  setIsCMSStudioOpen: (open: boolean) => void;
  isPhotoModalOpen: boolean;
  setIsPhotoModalOpen: (open: boolean) => void;
  uploadDoctorPhoto: (file: File) => Promise<string>;

  // Consultation Booking Modal
  isBookingModalOpen: boolean;
  setIsBookingModalOpen: (open: boolean) => void;
  bookingServiceType: string;
  openBookingModal: (service?: string) => void;

  // Admin Protection
  isAdminAuthenticated: boolean;
  isAdminAuthModalOpen: boolean;
  setIsAdminAuthModalOpen: (open: boolean) => void;
  loginAdmin: (pin: string) => { success: boolean; error?: string };
  logoutAdmin: () => void;
  changeAdminPin: (oldPin: string, newPin: string) => { success: boolean; error?: string };
  masterRecoveryKey: string;
  updateMasterRecoveryKey: (newKey: string) => void;
  verifyMasterKeyAndResetPin: (masterKeyInput: string, newPin: string) => { success: boolean; error?: string };
  openCMSStudioSecurely: () => void;
  openPhotoModalSecurely: () => void;
  makeCurrentPhotoGlobalDefault: () => Promise<{ success: boolean; message?: string }>;
}

const STORAGE_KEY_ARTICLES = 'dr_mahmoud_cms_articles_v2';
const STORAGE_KEY_CATEGORIES = 'dr_mahmoud_cms_categories_v2';
const STORAGE_KEY_FAQS = 'dr_mahmoud_cms_faqs_v2';
const STORAGE_KEY_SETTINGS = 'dr_mahmoud_cms_settings_v2';
const STORAGE_KEY_LANG = 'dr_mahmoud_site_lang';
const STORAGE_KEY_ADMIN_PIN = 'dr_mahmoud_admin_pin_v2';
const STORAGE_KEY_ADMIN_SESSION = 'dr_mahmoud_admin_session_v2';
const STORAGE_KEY_MASTER_KEY = 'dr_mahmoud_master_key_v2';
const DEFAULT_ADMIN_PIN = '2026';
const DEFAULT_MASTER_KEY = 'NABIH-8877-SECURE';

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LANG);
      return saved === 'en' ? 'en' : 'ar';
    } catch {
      return 'ar';
    }
  });

  const [activeTab, setActiveTabState] = useState<PageTab>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab') as PageTab;
      if (tabParam && ['home', 'about', 'qualifications', 'licenses', 'experience', 'knowledge', 'faq', 'contact'].includes(tabParam)) {
        return tabParam;
      }
      if (params.get('article') || window.location.hash.startsWith('#article-')) {
        return 'knowledge';
      }
    }
    return 'home';
  });

  const [selectedArticleSlug, setSelectedArticleSlugState] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const articleParam = params.get('article');
      if (articleParam) return articleParam;
      if (window.location.hash.startsWith('#article-')) {
        return window.location.hash.replace('#article-', '');
      }
    }
    return null;
  });

  const setSelectedArticleSlug = (slug: string | null) => {
    setSelectedArticleSlugState(slug);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (slug) {
        url.searchParams.set('tab', 'knowledge');
        url.searchParams.set('article', slug);
        window.history.replaceState({}, '', url.toString());
      } else {
        url.searchParams.delete('article');
        window.history.replaceState({}, '', url.toString());
      }
    }
  };

  const setActiveTab = (tab: PageTab) => {
    setActiveTabState(tab);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', tab);
      if (tab !== 'knowledge') {
        url.searchParams.delete('article');
        setSelectedArticleSlugState(null);
      }
      window.history.replaceState({}, '', url.toString());
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab') as PageTab;
      const articleParam = params.get('article');
      if (tabParam && ['home', 'about', 'qualifications', 'licenses', 'experience', 'knowledge', 'faq', 'contact'].includes(tabParam)) {
        setActiveTabState(tabParam);
      }
      setSelectedArticleSlugState(articleParam || null);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
  const [isCMSStudioOpenState, setIsCMSStudioOpenState] = useState<boolean>(false);
  const [isPhotoModalOpenState, setIsPhotoModalOpenState] = useState<boolean>(false);

  // Consultation Booking Modal State
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [bookingServiceType, setBookingServiceType] = useState<string>('');

  const openBookingModal = (service?: string) => {
    if (service) {
      setBookingServiceType(service);
    }
    setIsBookingModalOpen(true);
  };

  // Admin Authentication & Protection State
  const [adminPin, setAdminPin] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ADMIN_PIN);
      return saved || DEFAULT_ADMIN_PIN;
    } catch {
      return DEFAULT_ADMIN_PIN;
    }
  });

  const [masterRecoveryKey, setMasterRecoveryKey] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MASTER_KEY);
      return saved || DEFAULT_MASTER_KEY;
    } catch {
      return DEFAULT_MASTER_KEY;
    }
  });

  // Rate limiting states for protection against brute force
  const [loginSecurity, setLoginSecurity] = useState<{
    failedAttempts: number;
    lockedUntil: number;
  }>({ failedAttempts: 0, lockedUntil: 0 });

  const [recoverySecurity, setRecoverySecurity] = useState<{
    failedAttempts: number;
    lockedUntil: number;
  }>({ failedAttempts: 0, lockedUntil: 0 });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      const session = sessionStorage.getItem(STORAGE_KEY_ADMIN_SESSION);
      return session === 'authenticated';
    } catch {
      return false;
    }
  });

  const [isAdminAuthModalOpen, setIsAdminAuthModalOpen] = useState<boolean>(false);
  const [pendingAdminAction, setPendingAdminAction] = useState<'cms' | 'photo' | null>(null);

  const loginAdmin = (pin: string): { success: boolean; error?: string } => {
    const now = Date.now();
    if (loginSecurity.lockedUntil > now) {
      const remainingSec = Math.ceil((loginSecurity.lockedUntil - now) / 1000);
      return {
        success: false,
        error: language === 'en'
          ? `Too many failed attempts. Login locked for ${remainingSec}s.`
          : `تم تجاوز الحد الأقصى للمحاولات الخاطئة. تسجيل الدخول مقفل أمنياً لمدة ${remainingSec} ثانية.`
      };
    }

    if (pin.trim() === adminPin.trim()) {
      setLoginSecurity({ failedAttempts: 0, lockedUntil: 0 });
      setIsAdminAuthenticated(true);
      try {
        sessionStorage.setItem(STORAGE_KEY_ADMIN_SESSION, 'authenticated');
      } catch (e) {
        console.warn('Session storage write error:', e);
      }
      setIsAdminAuthModalOpen(false);

      // Execute pending protected action
      if (pendingAdminAction === 'photo') {
        setIsPhotoModalOpenState(true);
      } else {
        setIsCMSStudioOpenState(true);
      }
      setPendingAdminAction(null);
      return { success: true };
    }

    const failed = loginSecurity.failedAttempts + 1;
    const willLock = failed >= 5;
    setLoginSecurity({
      failedAttempts: failed,
      lockedUntil: willLock ? now + 3 * 60 * 1000 : 0
    });

    return {
      success: false,
      error: willLock
        ? (language === 'en' ? 'Too many incorrect attempts! Portal locked for 3 minutes.' : 'تم إدخال رمز خاطئ 5 مرات! تم قفل النظام أمنياً لمدة 3 دقائق.')
        : (language === 'en' ? `Incorrect PIN code. ${5 - failed} attempts remaining.` : `رمز المرور غير صحيح. متبقي لديك ${5 - failed} محاولات.`)
    };
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    try {
      sessionStorage.removeItem(STORAGE_KEY_ADMIN_SESSION);
    } catch (e) {
      console.warn('Session storage remove error:', e);
    }
    setIsCMSStudioOpenState(false);
    setIsPhotoModalOpenState(false);
    setIsAdminAuthModalOpen(false);
  };

  const changeAdminPin = (oldPin: string, newPin: string): { success: boolean; error?: string } => {
    if (oldPin.trim() !== adminPin.trim()) {
      return { 
        success: false, 
        error: language === 'en' ? 'Current PIN is incorrect.' : 'رمز المرور الحالي غير صحيح.' 
      };
    }
    if (newPin.trim().length < 4) {
      return { 
        success: false, 
        error: language === 'en' ? 'New PIN must be at least 4 digits.' : 'يجب أن يتكون الرمز الجديد من 4 أرقام أو أحرف على الأقل.' 
      };
    }
    setAdminPin(newPin.trim());
    try {
      localStorage.setItem(STORAGE_KEY_ADMIN_PIN, newPin.trim());
    } catch (e) {
      console.warn('Local storage write error:', e);
    }
    return { success: true };
  };

  const updateMasterRecoveryKey = (newKey: string) => {
    if (newKey.trim().length >= 8) {
      setMasterRecoveryKey(newKey.trim());
      try {
        localStorage.setItem(STORAGE_KEY_MASTER_KEY, newKey.trim());
      } catch (e) {
        console.warn('Local storage write error:', e);
      }
    }
  };

  const verifyMasterKeyAndResetPin = (masterKeyInput: string, newPin: string): { success: boolean; error?: string } => {
    const now = Date.now();
    if (recoverySecurity.lockedUntil > now) {
      const remainingSec = Math.ceil((recoverySecurity.lockedUntil - now) / 1000);
      return {
        success: false,
        error: language === 'en'
          ? `Recovery system locked. Try again in ${remainingSec}s.`
          : `نظام الاسترجاع مقفل مؤقتاً لأسباب أمنية. يرجى الانتظار ${remainingSec} ثانية.`
      };
    }

    const cleanKey = masterKeyInput.trim();
    if (!cleanKey || cleanKey !== masterRecoveryKey) {
      const failed = recoverySecurity.failedAttempts + 1;
      const willLock = failed >= 5;
      setRecoverySecurity({
        failedAttempts: failed,
        lockedUntil: willLock ? now + 5 * 60 * 1000 : 0
      });

      return {
        success: false,
        error: willLock
          ? (language === 'en' ? 'Too many invalid attempts! System locked for 5 minutes.' : 'تم إدخال مفتاح خاطئ 5 مرات! تم قفل الاسترجاع أمنياً لمدة 5 دقائق.')
          : (language === 'en' ? `Invalid Emergency Master Recovery Key. ${5 - failed} attempts remaining.` : `مفتاح الطوارئ السري غير صحيح. متبقي لديك ${5 - failed} محاولات.`)
      };
    }

    if (newPin.trim().length < 4) {
      return {
        success: false,
        error: language === 'en' ? 'New PIN must be at least 4 characters.' : 'يجب ألا يقل رمز المرور الجديد عن 4 خانات.'
      };
    }

    setAdminPin(newPin.trim());
    try {
      localStorage.setItem(STORAGE_KEY_ADMIN_PIN, newPin.trim());
    } catch (e) {
      console.warn('Local storage write error:', e);
    }
    setRecoverySecurity({ failedAttempts: 0, lockedUntil: 0 });
    return { success: true };
  };

  const openCMSStudioSecurely = () => {
    if (isAdminAuthenticated) {
      setIsCMSStudioOpenState(true);
    } else {
      setPendingAdminAction('cms');
      setIsAdminAuthModalOpen(true);
    }
  };

  const openPhotoModalSecurely = () => {
    if (isAdminAuthenticated) {
      setIsPhotoModalOpenState(true);
    } else {
      setPendingAdminAction('photo');
      setIsAdminAuthModalOpen(true);
    }
  };

  // Intercepted setters to enforce security
  const setIsCMSStudioOpen = (open: boolean) => {
    if (open) {
      openCMSStudioSecurely();
    } else {
      setIsCMSStudioOpenState(false);
    }
  };

  const setIsPhotoModalOpen = (open: boolean) => {
    if (open) {
      openPhotoModalSecurely();
    } else {
      setIsPhotoModalOpenState(false);
    }
  };

  // Load CMS Data from localStorage with fallback
  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CATEGORIES);
      return saved ? JSON.parse(saved) : initialCategories;
    } catch {
      return initialCategories;
    }
  });

  const [articles, setArticles] = useState<Article[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ARTICLES);
      if (!saved) return initialArticles;
      const parsed: Article[] = JSON.parse(saved);
      // Merge initialArticles so that images and updated clinical illustrations are preserved
      const merged = initialArticles.map(initial => {
        const found = parsed.find(p => p.id === initial.id);
        if (found) {
          return {
            ...initial,
            ...found,
            featuredImage: initial.featuredImage || found.featuredImage,
            contentAr: initial.featuredImage ? initial.contentAr : (found.contentAr || initial.contentAr),
            contentEn: initial.featuredImage ? initial.contentEn : (found.contentEn || initial.contentEn),
          };
        }
        return initial;
      });
      // Append any custom articles created by the user in the CMS
      const customArticles = parsed.filter(p => !initialArticles.some(init => init.id === p.id));
      return [...merged, ...customArticles];
    } catch {
      return initialArticles;
    }
  });

  const [faqs, setFaqs] = useState<FAQItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_FAQS);
      if (!saved) return initialFAQ;
      const parsed: FAQItem[] = JSON.parse(saved);
      const merged = initialFAQ.map(init => {
        const found = parsed.find(p => p.id === init.id);
        if (!found) return init;
        if (init.id === 'faq-9') {
          return { ...found, questionAr: init.questionAr, questionEn: init.questionEn, answerAr: init.answerAr, answerEn: init.answerEn };
        }
        return { ...init, ...found };
      });
      const customFaqs = parsed.filter(p => !initialFAQ.some(init => init.id === p.id));
      return [...merged, ...customFaqs];
    } catch {
      return initialFAQ;
    }
  });

  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.doctorPhotoUrl && parsed.doctorPhotoUrl.includes('unsplash.com')) {
          parsed.doctorPhotoUrl = initialSiteSettings.doctorPhotoUrl;
        }
        return { ...initialSiteSettings, ...parsed };
      }
      return initialSiteSettings;
    } catch {
      return initialSiteSettings;
    }
  });

  // Query server for persisted settings & uploaded photo on mount (survives cookie clearing!)
  useEffect(() => {
    // 1. Fetch server settings first - directly from server disk
    fetch('/api/site-settings', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        if (data && data.success && data.settings) {
          const s = data.settings;
          const photo = s.doctorPhotoBase64 || s.doctorPhotoUrl;
          if (photo) {
            setSiteSettings(prev => ({
              ...prev,
              doctorPhotoUrl: photo,
              ...(s.clinicName ? { clinicName: s.clinicName } : {})
            }));
            try {
              localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify({
                ...initialSiteSettings,
                ...s,
                doctorPhotoUrl: photo
              }));
            } catch (e) {}
            savePhotoToIndexedDB(photo).catch(() => {});
          }
        }
      })
      .catch(err => {
        console.warn('Server settings fetch notice:', err);
      });

    // 2. Also check IndexedDB if client state was empty
    getPhotoFromIndexedDB().then((idbPhoto) => {
      if (idbPhoto && idbPhoto.startsWith('data:image/')) {
        setSiteSettings(prev => {
          if (!prev.doctorPhotoUrl || prev.doctorPhotoUrl === drMahmoudDefaultPhoto) {
            return { ...prev, doctorPhotoUrl: idbPhoto };
          }
          return prev;
        });
      }
    }).catch(() => {});
  }, []);

  // Sync document lang and dir attribute
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    try {
      localStorage.setItem(STORAGE_KEY_LANG, language);
    } catch (e) {
      console.error(e);
    }
  }, [language]);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ARTICLES, JSON.stringify(articles));
    } catch (e) {
      console.error(e);
    }
  }, [articles]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_FAQS, JSON.stringify(faqs));
    } catch (e) {
      console.error(e);
    }
  }, [faqs]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(siteSettings));
    } catch (e) {
      console.error(e);
    }
  }, [siteSettings]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState(prev => prev === 'ar' ? 'en' : 'ar');
  };

  const updateSiteSettings = (settings: Partial<SiteSettings>) => {
    setSiteSettings(prev => ({ ...prev, ...settings }));
  };

  const addArticle = (article: Omit<Article, 'id'>) => {
    const newArticle: Article = {
      ...article,
      id: `art-${Date.now()}`
    };
    setArticles(prev => [newArticle, ...prev]);
  };

  const updateArticle = (id: string, updated: Partial<Article>) => {
    setArticles(prev => prev.map(a => a.id === id ? { ...a, ...updated } : a));
  };

  const deleteArticle = (id: string) => {
    setArticles(prev => prev.filter(a => a.id !== id));
  };

  const addFAQ = (faq: Omit<FAQItem, 'id'>) => {
    const newFAQ: FAQItem = {
      ...faq,
      id: `faq-${Date.now()}`
    };
    setFaqs(prev => [...prev, newFAQ]);
  };

  const updateFAQ = (id: string, updated: Partial<FAQItem>) => {
    setFaqs(prev => prev.map(f => f.id === id ? { ...f, ...updated } : f));
  };

  const deleteFAQ = (id: string) => {
    setFaqs(prev => prev.filter(f => f.id !== id));
  };

  const resetCMSData = () => {
    setCategories(initialCategories);
    setArticles(initialArticles);
    setFaqs(initialFAQ);
    setSiteSettings(initialSiteSettings);
    clearPhotoFromIndexedDB().catch(() => {});
    try {
      localStorage.removeItem(STORAGE_KEY_ARTICLES);
      localStorage.removeItem(STORAGE_KEY_CATEGORIES);
      localStorage.removeItem(STORAGE_KEY_FAQS);
      localStorage.removeItem(STORAGE_KEY_SETTINGS);
    } catch (e) {
      console.error(e);
    }
  };

  const exportCMSData = () => {
    return JSON.stringify({
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      siteSettings,
      categories,
      articles,
      faqs
    }, null, 2);
  };

  const uploadDoctorPhoto = async (file: File): Promise<string> => {
    try {
      // 1. Optimize & compress the image (~100-150KB high-res JPEG) so it fits in all storage types
      const optimizedDataUrl = await optimizePhoto(file, 900, 1200, 0.88);
      if (!optimizedDataUrl) {
        throw new Error('Failed to read or optimize image');
      }

      // 2. Persist to IndexedDB (survives session ends, incognito, cache clearing)
      await savePhotoToIndexedDB(optimizedDataUrl);

      // 3. Update client state & localStorage
      updateSiteSettings({ doctorPhotoUrl: optimizedDataUrl });

      // 4. Persist to server disk in public/dr-mahmoud.jpg, dist/dr-mahmoud.jpg, and server settings
      try {
        const res = await fetch('/api/upload-doctor-photo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ base64: optimizedDataUrl })
        });
        const serverData = await res.json();
        if (serverData && serverData.success) {
          console.log('Doctor photo successfully persisted to server disk:', serverData.doctorPhotoUrl);
        }
      } catch (err) {
        console.warn('Server disk write attempt notice (persisted in IndexedDB & local state):', err);
      }

      return optimizedDataUrl;
    } catch (err: any) {
      throw new Error(err?.message || 'Failed to process image file');
    }
  };

  // Automatically ensure client's custom photo is persisted as the server's default photo
  useEffect(() => {
    if (siteSettings.doctorPhotoUrl && siteSettings.doctorPhotoUrl.startsWith('data:image/')) {
      fetch('/api/upload-doctor-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ base64: siteSettings.doctorPhotoUrl })
      })
      .then(res => res.json())
      .then(data => {
        if (data && data.success) {
          console.log('Successfully synchronized client custom doctor photo to server disk default');
        }
      })
      .catch(err => {
        console.warn('Auto-sync doctor photo error:', err);
      });
    }
  }, [siteSettings.doctorPhotoUrl]);

  const makeCurrentPhotoGlobalDefault = async (): Promise<{ success: boolean; message?: string }> => {
    const photoToSave = siteSettings.doctorPhotoUrl || '/dr-mahmoud.jpg';
    if (photoToSave.startsWith('data:image/')) {
      try {
        const res = await fetch('/api/upload-doctor-photo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ base64: photoToSave })
        });
        const data = await res.json();
        if (data.success) {
          return { success: true };
        }
        return { success: false, message: data.error };
      } catch (err: any) {
        return { success: false, message: err.message };
      }
    } else {
      return { success: true };
    }
  };

  return (
    <CMSContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        activeTab,
        setActiveTab,
        selectedArticleSlug,
        setSelectedArticleSlug,
        categories,
        articles,
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
        isCMSStudioOpen: isCMSStudioOpenState,
        setIsCMSStudioOpen,
        isPhotoModalOpen: isPhotoModalOpenState,
        setIsPhotoModalOpen,
        uploadDoctorPhoto,
        makeCurrentPhotoGlobalDefault,
        isBookingModalOpen,
        setIsBookingModalOpen,
        bookingServiceType,
        openBookingModal,
        isAdminAuthenticated,
        isAdminAuthModalOpen,
        setIsAdminAuthModalOpen,
        loginAdmin,
        logoutAdmin,
        changeAdminPin,
        masterRecoveryKey,
        updateMasterRecoveryKey,
        verifyMasterKeyAndResetPin,
        openCMSStudioSecurely,
        openPhotoModalSecurely
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
