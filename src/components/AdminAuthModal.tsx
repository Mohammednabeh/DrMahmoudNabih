import React, { useState, useRef, useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  Eye, 
  EyeOff, 
  X, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  HelpCircle,
  Key,
  RotateCcw,
  Delete,
  MessageCircle
} from 'lucide-react';

export const AdminAuthModal: React.FC = () => {
  const { 
    language, 
    isAdminAuthModalOpen, 
    setIsAdminAuthModalOpen, 
    loginAdmin,
    verifyMasterKeyAndResetPin
  } = useCMS();

  const isEn = language === 'en';
  const ArrowIcon = isEn ? ArrowRight : ArrowLeft;

  // View modes: 'login' | 'recover' | 'success'
  const [authMode, setAuthMode] = useState<'login' | 'recover' | 'success'>('login');

  // Login states
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Recovery states (Confidential Master Key)
  const [masterKeyInput, setMasterKeyInput] = useState('');
  const [showMasterKey, setShowMasterKey] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [showNewPin, setShowNewPin] = useState(false);

  useEffect(() => {
    if (isAdminAuthModalOpen) {
      setAuthMode('login');
      setPin('');
      setErrorMsg(null);
      setIsSuccess(false);
      setMasterKeyInput('');
      setNewPin('');
      setConfirmPin('');
      setShowPin(false);
      setShowMasterKey(false);
      setShowNewPin(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isAdminAuthModalOpen]);

  if (!isAdminAuthModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin.trim()) {
      setErrorMsg(isEn ? 'Please enter the admin PIN.' : 'يرجى إدخال رمز مرور الإدارة.');
      return;
    }

    const res = loginAdmin(pin.trim());
    if (res.success) {
      setIsSuccess(true);
      setErrorMsg(null);
    } else {
      setErrorMsg(res.error || (isEn ? 'Incorrect PIN code.' : 'رمز المرور غير صحيح.'));
      setPin('');
      inputRef.current?.focus();
    }
  };

  const handleRecoverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!masterKeyInput.trim()) {
      setErrorMsg(isEn ? 'Please enter your Emergency Master Recovery Key.' : 'يرجى إدخال مفتاح الطوارئ السري الخاص بك.');
      return;
    }

    if (!newPin.trim()) {
      setErrorMsg(isEn ? 'Please enter a new PIN.' : 'يرجى إدخال رمز المرور الجديد.');
      return;
    }

    if (newPin.trim().length < 4) {
      setErrorMsg(isEn ? 'New PIN must be at least 4 characters.' : 'يجب ألا يقل رمز المرور عن 4 خانات.');
      return;
    }

    if (newPin.trim() !== confirmPin.trim()) {
      setErrorMsg(isEn ? 'New PIN and confirmation do not match.' : 'رمز المرور الجديد وتأكيده غير متطابقين.');
      return;
    }

    const result = verifyMasterKeyAndResetPin(masterKeyInput.trim(), newPin.trim());
    if (result.success) {
      setAuthMode('success');
      setErrorMsg(null);
    } else {
      setErrorMsg(result.error || (isEn ? 'Invalid Master Recovery Key.' : 'مفتاح الطوارئ السري غير صحيح.'));
    }
  };

  const handleQuickDigit = (digit: string) => {
    if (pin.length < 12) {
      setPin(prev => prev + digit);
      setErrorMsg(null);
    }
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
    setErrorMsg(null);
  };

  const handleClear = () => {
    setPin('');
    setErrorMsg(null);
    inputRef.current?.focus();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
      dir={isEn ? 'ltr' : 'rtl'}
      onClick={() => setIsAdminAuthModalOpen(false)}
    >
      <div 
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="px-6 pt-6 pb-4 flex items-start justify-between border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">
                  {authMode === 'recover'
                    ? (isEn ? 'Reset Admin Password' : 'استرجاع رمز مرور الإدارة')
                    : authMode === 'success'
                    ? (isEn ? 'Password Reset Successful' : 'تم تغيير الرمز بنجاح')
                    : (isEn ? 'Medical Admin Portal' : 'بوابة الإدارة الطبية')}
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-900 text-white">
                  {authMode === 'recover' ? (isEn ? 'Recovery' : 'استرجاع') : (isEn ? 'Protected' : 'محمي')}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {isEn ? "Dr. Mahmoud Ali Nabih Abdelghaney" : "د. محمود علي نبيه عبد الغني"}
              </p>
            </div>
          </div>
          <button
            id="close-admin-auth-modal-btn"
            onClick={() => setIsAdminAuthModalOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* FEEDBACK NOTIFICATION */}
        {errorMsg && (
          <div className="mx-6 mt-4 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2.5 animate-in shake duration-200">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span className="font-semibold leading-relaxed">{errorMsg}</span>
          </div>
        )}

        {isSuccess && (
          <div className="mx-6 mt-4 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-semibold">
              {isEn ? 'Identity verified! Accessing dashboard...' : 'تم التحقق بنجاح! جاري فتح لوحة التحكم...'}
            </span>
          </div>
        )}

        {/* MODE 1: LOGIN MODE */}
        {authMode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="p-6 space-y-5">
            <div className="text-center space-y-1">
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {isEn 
                  ? "This dashboard is strictly reserved for authorized management of medical articles, FAQs, verified photography, and doctor credentials."
                  : "لوحة التحكم مخصصة حصرياً للإدارة الطبية لإدارة المقالات المنشورة، الأسئلة الشائعة، الصورة المعتمدة، وبيانات التواصل."}
              </p>
            </div>

            {/* PIN Input field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-blue-600" />
                  <span>{isEn ? 'Enter Admin PIN / Password' : 'أدخل رمز مرور الإدارة'}</span>
                </span>
              </label>

              <div className="relative">
                <input
                  ref={inputRef}
                  type={showPin ? 'text' : 'password'}
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value);
                    setErrorMsg(null);
                  }}
                  maxLength={12}
                  placeholder="••••"
                  className="w-full text-center text-lg tracking-widest font-mono font-bold px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-blue-600 focus:outline-none transition-colors bg-slate-50 focus:bg-white text-slate-900"
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute end-3 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                  title={showPin ? "Hide PIN" : "Show PIN"}
                >
                  {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Numeric Keypad (No leaked codes!) */}
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-2">
              <div className="grid grid-cols-3 gap-1.5">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(d => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => handleQuickDigit(d)}
                    className="py-2.5 rounded-xl bg-white hover:bg-blue-50 hover:text-blue-700 text-slate-800 font-mono font-bold text-base border border-slate-200 shadow-2xs transition-colors cursor-pointer"
                  >
                    {d}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={handleClear}
                  className="py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-600 font-semibold text-xs border border-slate-200 shadow-2xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  title={isEn ? "Clear all" : "مسح الكل"}
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                  <span>{isEn ? 'Clear' : 'مسح'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDigit('0')}
                  className="py-2.5 rounded-xl bg-white hover:bg-blue-50 hover:text-blue-700 text-slate-800 font-mono font-bold text-base border border-slate-200 shadow-2xs transition-colors cursor-pointer"
                >
                  0
                </button>
                <button
                  type="button"
                  onClick={handleBackspace}
                  className="py-2.5 rounded-xl bg-white hover:bg-rose-50 hover:text-rose-700 text-slate-600 font-semibold text-xs border border-slate-200 shadow-2xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  title={isEn ? "Delete last digit" : "حذف آخر خانة"}
                >
                  <Delete className="w-3.5 h-3.5 text-slate-500" />
                  <span>{isEn ? 'Del' : 'تراجع'}</span>
                </button>
              </div>
            </div>

            {/* Submit & Recovery Links */}
            <div className="pt-2 flex flex-col gap-2.5">
              <button
                type="submit"
                id="admin-auth-submit-btn"
                className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>{isEn ? "Authenticate & Open Dashboard" : "تسجيل الدخول وفتح لوحة التحكم"}</span>
                <ArrowIcon className="w-4 h-4" />
              </button>

              {/* Forgot PIN Recovery Trigger */}
              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  id="admin-forgot-pin-btn"
                  onClick={() => {
                    setAuthMode('recover');
                    setErrorMsg(null);
                  }}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 underline flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{isEn ? "Forgot password? Master Key Recovery" : "نسيت كلمة المرور؟ الاسترجاع بمفتاح الطوارئ"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsAdminAuthModalOpen(false)}
                  className="text-xs text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                >
                  {isEn ? "Cancel" : "إلغاء"}
                </button>
              </div>
            </div>
          </form>
        )}

        {/* MODE 2: RECOVERY MODE (CONFIDENTIAL MASTER KEY ONLY) */}
        {authMode === 'recover' && (
          <form onSubmit={handleRecoverySubmit} className="p-6 space-y-4">
            {/* Security Notice Box */}
            <div className="p-3.5 rounded-2xl bg-slate-900 text-white space-y-1.5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-bold text-blue-400">
                  <Key className="w-4 h-4 text-blue-400" />
                  <span>{isEn ? "Master Recovery Key Verification" : "الاسترجاع بمفتاح الطوارئ السري"}</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                  {isEn ? "Protected" : "محمي أمنياً"}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {isEn
                  ? "Enter the confidential Master Recovery Key configured in your CMS Studio settings to reset your admin PIN."
                  : "لإعادة تعيين رمز المرور، يرجى إدخال مفتاح الطوارئ السري (Master Recovery Key) المحفوظ في إعدادات لوحة التحكم الخاصة بك."}
              </p>
            </div>

            {/* Master Key Input */}
            <div className="space-y-1.5 p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200">
              <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                <span>{isEn ? "Emergency Master Recovery Key" : "مفتاح الطوارئ السري الخاص بالإدارة"}</span>
                <span className="text-[10px] text-blue-700 font-semibold">{isEn ? "Confidential" : "سري وخاص"}</span>
              </label>
              <div className="relative">
                <input
                  type={showMasterKey ? 'text' : 'password'}
                  value={masterKeyInput}
                  onChange={(e) => {
                    setMasterKeyInput(e.target.value);
                    setErrorMsg(null);
                  }}
                  placeholder="••••••••••••••••"
                  className="w-full font-mono text-xs px-3.5 py-2.5 rounded-xl border border-blue-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 font-bold"
                />
                <button
                  type="button"
                  onClick={() => setShowMasterKey(!showMasterKey)}
                  className="absolute end-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  {showMasterKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* New PIN Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  {isEn ? "New PIN (min 4 digits)" : "رمز المرور الجديد"}
                </label>
                <div className="relative">
                  <input
                    type={showNewPin ? 'text' : 'password'}
                    value={newPin}
                    onChange={(e) => {
                      setNewPin(e.target.value);
                      setErrorMsg(null);
                    }}
                    placeholder="••••"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPin(!showNewPin)}
                    className="absolute end-2 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
                  >
                    {showNewPin ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  {isEn ? "Confirm New PIN" : "تأكيد الرمز الجديد"}
                </label>
                <input
                  type={showNewPin ? 'text' : 'password'}
                  value={confirmPin}
                  onChange={(e) => {
                    setConfirmPin(e.target.value);
                    setErrorMsg(null);
                  }}
                  placeholder="••••"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-2">
              <button
                type="submit"
                id="admin-reset-pin-confirm-btn"
                className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isEn ? "Verify Key & Set New Password" : "التحقق من المفتاح واعتماد الرمز الجديد"}</span>
              </button>

              {/* Direct Doctor Support (NO passwords or codes in text!) */}
              <a
                href={`https://wa.me/966540832104?text=${encodeURIComponent(
                  isEn 
                    ? 'Hello Dr. Mahmoud, I need assistance accessing the website administration portal.' 
                    : 'السلام عليكم د. محمود، أحتاج مساعدة بخصوص تسجيل الدخول إلى لوحة إدارة الموقع.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>{isEn ? "Lost both? Contact Dr. Mahmoud for assistance" : "فقدت كلاً من الرمز ومفتاح الطوارئ؟ تواصل مع د. محمود"}</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setErrorMsg(null);
                }}
                className="w-full py-2.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 text-xs font-semibold transition-colors cursor-pointer"
              >
                {isEn ? "Back to Login" : "العودة لتسجيل الدخول"}
              </button>
            </div>
          </form>
        )}

        {/* MODE 3: SUCCESS MODE */}
        {authMode === 'success' && (
          <div className="p-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h4 className="text-base font-bold text-slate-900">
                {isEn ? "PIN Successfully Updated!" : "تم تحديث رمز المرور بنجاح!"}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {isEn 
                  ? "Your admin portal password has been reset securely. You can now access your management dashboard immediately."
                  : "تم التحقق الأمني واعتماد كلمة المرور الجديدة. يمكنك الدخول الآن مباشرة للوحة الإدارة."}
              </p>
            </div>

            <button
              type="button"
              id="admin-enter-after-reset-btn"
              onClick={() => {
                loginAdmin(newPin);
              }}
              className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isEn ? "Open Admin Dashboard Now" : "الدخول المباشر إلى لوحة الإدارة"}</span>
              <ArrowIcon className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Security Notice */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 text-[11px] text-slate-400 text-center font-medium leading-relaxed">
          {isEn 
            ? "Protected by Anti-Brute-Force Lockout & Encrypted Admin Access."
            : "محمي بنظام حماية ضد محاولات التخمين وقفل مؤقت عند تكرار المحاولات الخاطئة."}
        </div>
      </div>
    </div>
  );
};
