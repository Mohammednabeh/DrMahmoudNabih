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
  ArrowLeft 
} from 'lucide-react';

export const AdminAuthModal: React.FC = () => {
  const { 
    language, 
    isAdminAuthModalOpen, 
    setIsAdminAuthModalOpen, 
    loginAdmin 
  } = useCMS();

  const isEn = language === 'en';
  const ArrowIcon = isEn ? ArrowRight : ArrowLeft;

  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isAdminAuthModalOpen) {
      setPin('');
      setErrorMsg(null);
      setIsSuccess(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isAdminAuthModalOpen]);

  if (!isAdminAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin.trim()) {
      setErrorMsg(isEn ? 'Please enter the admin PIN.' : 'يرجى إدخال رمز مرور الإدارة.');
      return;
    }

    const success = loginAdmin(pin.trim());
    if (success) {
      setIsSuccess(true);
      setErrorMsg(null);
    } else {
      setErrorMsg(isEn ? 'Incorrect PIN code. Try default: 2026' : 'رمز المرور غير صحيح. جرب الرمز الافتراضي: 2026');
      setPin('');
      inputRef.current?.focus();
    }
  };

  const handleQuickDigit = (digit: string) => {
    if (pin.length < 8) {
      setPin(prev => prev + digit);
      setErrorMsg(null);
    }
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
    setErrorMsg(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        id="admin-auth-modal-card"
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
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
                  {isEn ? 'Medical Admin Portal' : 'بوابة الإدارة الطبية المعتمدة'}
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-900 text-white">
                  {isEn ? 'Restricted' : 'مغلق'}
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
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="text-center space-y-1">
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {isEn 
                ? "This control dashboard is protected and strictly reserved for administrative management of published clinical knowledge, FAQs, authentic photography, and doctor credentials."
                : "لوحة التحكم مخصصة حصرياً للإدارة الطبية للدكتور لإدارة المقالات المنشورة، الأسئلة الشائعة، الصورة المعتمدة، وبيانات التواصل."}
            </p>
          </div>

          {/* Feedback message */}
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2.5 animate-in shake duration-200">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span className="font-semibold">{errorMsg}</span>
            </div>
          )}

          {isSuccess && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-semibold">
                {isEn ? 'Identity verified! Accessing dashboard...' : 'تم التحقق بنجاح! جاري فتح لوحة التحكم...'}
              </span>
            </div>
          )}

          {/* PIN Input field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-blue-600" />
                <span>{isEn ? 'Enter Admin PIN / Password' : 'أدخل رمز مرور الإدارة (PIN)'}</span>
              </span>
              <span className="text-[11px] text-slate-400 font-normal">
                {isEn ? 'Default: 2026' : 'الافتراضي: 2026'}
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
                placeholder={isEn ? "Enter PIN (e.g. 2026)" : "أدخل رمز المرور (مثال: 2026)"}
                className="w-full text-center text-lg tracking-widest font-mono font-bold px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-blue-600 focus:outline-none transition-colors bg-slate-50 focus:bg-white text-slate-900"
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute end-3 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-700 transition-colors"
                title={showPin ? "Hide PIN" : "Show PIN"}
              >
                {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Quick Onscreen Numeric Keypad */}
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-2">
            <div className="grid grid-cols-3 gap-1.5">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(d => (
                <button
                  key={d}
                  type="button"
                  onClick={() => handleQuickDigit(d)}
                  className="py-2.5 rounded-xl bg-white hover:bg-blue-50 hover:text-blue-700 text-slate-800 font-mono font-bold text-base border border-slate-200 shadow-2xs transition-colors"
                >
                  {d}
                </button>
              ))}
              <button
                type="button"
                onClick={handleBackspace}
                className="py-2.5 rounded-xl bg-white hover:bg-rose-50 hover:text-rose-700 text-slate-600 font-semibold text-xs border border-slate-200 shadow-2xs transition-colors flex items-center justify-center"
              >
                {isEn ? 'Del' : 'مسح'}
              </button>
              <button
                type="button"
                onClick={() => handleQuickDigit('0')}
                className="py-2.5 rounded-xl bg-white hover:bg-blue-50 hover:text-blue-700 text-slate-800 font-mono font-bold text-base border border-slate-200 shadow-2xs transition-colors"
              >
                0
              </button>
              <button
                type="button"
                onClick={() => setPin('2026')}
                className="py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-mono font-bold text-xs border border-blue-200 shadow-2xs transition-colors flex items-center justify-center"
                title={isEn ? "Quick fill default PIN" : "إدخال الرمز الافتراضي"}
              >
                2026
              </button>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2 flex flex-col gap-2">
            <button
              type="submit"
              id="admin-auth-submit-btn"
              className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>{isEn ? "Authenticate & Open Dashboard" : "تسجيل الدخول وفتح لوحة التحكم"}</span>
              <ArrowIcon className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setIsAdminAuthModalOpen(false)}
              className="w-full py-2.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 text-xs font-semibold transition-colors"
            >
              {isEn ? "Cancel & Return to Website" : "إلغاء والعودة للموقع"}
            </button>
          </div>

          {/* Notice for Framer */}
          <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400 text-center font-medium leading-relaxed">
            {isEn 
              ? "Upon production deployment to Framer, dashboard management is fully secured via your Framer account authentication."
              : "عند النشر النهائي على Framer، ستكون لوحة التحكم محمية بحسابك الرسمي على منصة Framer ولن تظهر للزوار نهائياً."}
          </div>
        </form>
      </div>
    </div>
  );
};
