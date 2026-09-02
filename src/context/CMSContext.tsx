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
  initialSiteSettings 
} from '../data/initialData';

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
  loginAdmin: (pin: string) => boolean;
  logoutAdmin: () => void;
  changeAdminPin: (oldPin: string, newPin: string) => { success: boolean; error?: string };
  openCMSStudioSecurely: () => void;
  openPhotoModalSecurely: () => void;
}

const STORAGE_KEY_ARTICLES = 'dr_mahmoud_cms_articles_v2';
const STORAGE_KEY_CATEGORIES = 'dr_mahmoud_cms_categories_v2';
const STORAGE_KEY_FAQS = 'dr_mahmoud_cms_faqs_v2';
const STORAGE_KEY_SETTINGS = 'dr_mahmoud_cms_settings_v2';
const STORAGE_KEY_LANG = 'dr_mahmoud_site_lang';
const STORAGE_KEY_ADMIN_PIN = 'dr_mahmoud_admin_pin_v2';
const STORAGE_KEY_ADMIN_SESSION = 'dr_mahmoud_admin_session_v2';
const DEFAULT_ADMIN_PIN = '2026';

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

  const [activeTab, setActiveTab] = useState<PageTab>('home');
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | null>(null);
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

  const loginAdmin = (pin: string): boolean => {
    if (pin.trim() === adminPin.trim()) {
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
      return true;
    }
    return false;
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
      return saved ? JSON.parse(saved) : initialArticles;
    } catch {
      return initialArticles;
    }
  });

  const [faqs, setFaqs] = useState<FAQItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_FAQS);
      return saved ? JSON.parse(saved) : initialFAQ;
    } catch {
      return initialFAQ;
    }
  });

  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SETTINGS);
      return saved ? { ...initialSiteSettings, ...JSON.parse(saved) } : initialSiteSettings;
    } catch {
      return initialSiteSettings;
    }
  });

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

  const uploadDoctorPhoto = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const dataUrl = e.target?.result as string;
        if (!dataUrl) {
          reject(new Error('Failed to read image file'));
          return;
        }

        // 1. Immediately update client state and localStorage
        updateSiteSettings({ doctorPhotoUrl: dataUrl });

        // 2. Persist to server disk in public/dr-mahmoud.jpg & dist/dr-mahmoud.jpg
        try {
          await fetch('/api/upload-doctor-photo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ base64: dataUrl })
          });
        } catch (err) {
          console.warn('Dev server file write notice (persisted in local state):', err);
        }

        resolve(dataUrl);
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
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
