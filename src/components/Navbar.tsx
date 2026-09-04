import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { Logo } from './Logo';
import { PageTab } from '../types';
import { 
  Globe, 
  Sliders, 
  Menu, 
  X, 
  PhoneCall, 
  BookOpen, 
  Award, 
  FileCheck, 
  Briefcase, 
  HelpCircle, 
  User, 
  Home,
  Lock,
  ShieldCheck,
  LogOut,
  MessageCircle,
  Calendar
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    language, 
    toggleLanguage, 
    activeTab, 
    setActiveTab, 
    setSelectedArticleSlug,
    setIsCMSStudioOpen,
    isAdminAuthenticated,
    logoutAdmin,
    siteSettings,
    openBookingModal
  } = useCMS();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isEn = language === 'en';

  const rawPhone = siteSettings.whatsappPhone || siteSettings.contactPhone || '+966 54 083 2104';
  const cleanPhone = rawPhone.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    isEn ? 'Hello Dr. Mahmoud, I would like to inquire about booking a consultation.' : 'السلام عليكم ورحمة الله و بركاته دكتور محمود، أود الاستفسار عن حجز استشارة.'
  )}`;

  const navItems: { tab: PageTab; labelAr: string; labelEn: string; icon: any }[] = [
    { tab: 'home', labelAr: 'الرئيسية', labelEn: 'Home', icon: Home },
    { tab: 'about', labelAr: 'عن الدكتور', labelEn: 'About', icon: User },
    { tab: 'qualifications', labelAr: 'المؤهلات والشهادات', labelEn: 'Qualifications', icon: Award },
    { tab: 'licenses', labelAr: 'التراخيص', labelEn: 'Licenses', icon: FileCheck },
    { tab: 'experience', labelAr: 'الخبرات المهنية', labelEn: 'Experience', icon: Briefcase },
    { tab: 'knowledge', labelAr: 'مركز المعرفة', labelEn: 'Knowledge Center', icon: BookOpen },
    { tab: 'faq', labelAr: 'الأسئلة الشائعة', labelEn: 'FAQ', icon: HelpCircle },
    { tab: 'contact', labelAr: 'التواصل', labelEn: 'Contact', icon: PhoneCall },
  ];

  const handleNavClick = (tab: PageTab) => {
    setActiveTab(tab);
    setSelectedArticleSlug(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="text-left focus:outline-none focus:ring-2 focus:ring-slate-900/10 rounded-lg p-1 -m-1 transition-opacity hover:opacity-95 cursor-pointer"
            dir="ltr"
            id="nav-brand-logo-btn"
          >
            <Logo />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-6 rtl:space-x-reverse text-xs font-semibold uppercase tracking-widest text-slate-500">
            {navItems.map((item) => {
              const isActive = activeTab === item.tab;
              return (
                <button
                  key={item.tab}
                  onClick={() => handleNavClick(item.tab)}
                  className={`py-1.5 transition-all duration-150 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'text-slate-900 border-b-2 border-slate-900 font-bold'
                      : 'text-slate-500 hover:text-slate-900 hover:border-b-2 hover:border-slate-300'
                  }`}
                  id={`nav-link-${item.tab}`}
                >
                  {isEn ? item.labelEn : item.labelAr}
                </button>
              );
            })}
          </nav>

          {/* Action Tools: Language Switcher + CMS Studio + Sleek CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {/* CMS Launcher / Admin Gate */}
            {isAdminAuthenticated ? (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsCMSStudioOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 transition-colors cursor-pointer shadow-2xs"
                  title={isEn ? "CMS Studio (Unlocked)" : "لوحة التحكم (مفتوحة للإدارة)"}
                  id="cms-launcher-btn"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{isEn ? 'CMS Studio' : 'إدارة المحتوى'}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </button>
                <button
                  type="button"
                  onClick={logoutAdmin}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title={isEn ? "Lock Admin Session" : "قفل جلسة الإدارة وتأمين اللوحة"}
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsCMSStudioOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 transition-colors cursor-pointer shadow-2xs"
                title={isEn ? "Medical Admin Portal (Protected by PIN)" : "بوابة الإدارة الطبية (محمية برمز مرور)"}
                id="cms-launcher-btn"
              >
                <Lock className="w-3.5 h-3.5 text-slate-500" />
                <span>{isEn ? 'Admin' : 'لوحة الإدارة'}</span>
              </button>
            )}

            {/* Direct WhatsApp Quick Link */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors shadow-2xs"
              title={isEn ? "WhatsApp Direct (+966 54 083 2104)" : "واتساب مباشر (0540832104)"}
              id="nav-whatsapp-direct-btn"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
              <span>{isEn ? 'WhatsApp' : 'واتساب'}</span>
            </a>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-slate-900 hover:bg-slate-50 border border-slate-200 transition-all cursor-pointer shadow-2xs"
              title={isEn ? "التحويل إلى اللغة العربية" : "Switch to English"}
              id="nav-language-switcher-btn"
            >
              <Globe className="w-3.5 h-3.5 text-slate-600" />
              <span>{isEn ? 'العربية' : 'English'}</span>
            </button>

            {/* Book Consultation Modal CTA */}
            <button
              onClick={() => openBookingModal()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 transition-all cursor-pointer active:scale-98"
              id="nav-cta-booking-btn"
            >
              <Calendar className="w-3.5 h-3.5 text-blue-200" />
              <span>{isEn ? 'Book Consultation' : 'حجز استشارة'}</span>
            </button>
          </div>

          {/* Mobile Menu Button & Mobile Language Toggle */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 border border-slate-200 rounded-lg bg-white"
              aria-label="Toggle language"
            >
              {isEn ? 'عربي' : 'EN'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-900"
              aria-label="Open menu"
              id="mobile-menu-toggle-btn"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.tab;
              return (
                <button
                  key={item.tab}
                  onClick={() => handleNavClick(item.tab)}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold text-start transition-colors ${
                    isActive 
                      ? 'bg-slate-100 text-slate-900 font-bold border-r-4 rtl:border-r-0 rtl:border-l-4 border-slate-900' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                  id={`mobile-nav-link-${item.tab}`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span>{isEn ? item.labelEn : item.labelAr}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {isAdminAuthenticated ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsCMSStudioOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-900 border border-emerald-200"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>{isEn ? 'CMS Studio (Unlocked)' : 'لوحة الإدارة (مفتوحة)'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    logoutAdmin();
                    setMobileMenuOpen(false);
                  }}
                  className="px-3 py-2.5 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold flex items-center justify-center gap-1.5"
                  title={isEn ? "Lock Admin" : "قفل الإدارة"}
                >
                  <LogOut className="w-4 h-4 text-rose-600" />
                  <span>{isEn ? "Lock" : "قفل"}</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsCMSStudioOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-white text-slate-700 border border-slate-200"
              >
                <Lock className="w-4 h-4 text-slate-500" />
                <span>{isEn ? 'Medical Admin Portal (Protected)' : 'بوابة الإدارة الطبية (محمية برمز PIN)'}</span>
              </button>
            )}
            {/* Mobile Book Consultation & WhatsApp */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openBookingModal();
                }}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-blue-600 text-white shadow-sm"
              >
                <Calendar className="w-4 h-4 text-blue-200" />
                <span>{isEn ? 'Book Consultation' : 'حجز استشارة'}</span>
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-emerald-600 text-white shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>{isEn ? 'WhatsApp' : 'واتساب'}</span>
              </a>
            </div>

            <button
              onClick={() => handleNavClick('contact')}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-900 text-white shadow-lg"
            >
              <PhoneCall className="w-4 h-4 text-blue-400" />
              <span>{isEn ? 'Contact Dr. Mahmoud' : 'التواصل المهني المباشر'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
