import React, { useState, useRef, useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { Camera, Upload, CheckCircle2, AlertCircle, X, RefreshCw, Image as ImageIcon, Sparkles } from 'lucide-react';

export const DoctorPhotoModal: React.FC = () => {
  const { 
    language, 
    isPhotoModalOpen, 
    setIsPhotoModalOpen, 
    siteSettings, 
    uploadDoctorPhoto, 
    updateSiteSettings,
    makeCurrentPhotoGlobalDefault 
  } = useCMS();
  const isEn = language === 'en';
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSettingDefault, setIsSettingDefault] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const currentPhoto = siteSettings.doctorPhotoUrl || '/dr-mahmoud.jpg';

  // Automatically ensure the current photo is set as server default on modal open
  useEffect(() => {
    if (isPhotoModalOpen && currentPhoto.startsWith('data:image/')) {
      makeCurrentPhotoGlobalDefault().catch(() => {});
    }
  }, [isPhotoModalOpen, currentPhoto]);

  // Support clipboard paste (Ctrl+V) directly
  useEffect(() => {
    if (!isPhotoModalOpen) return;
    const handlePaste = (e: ClipboardEvent) => {
      if (e.clipboardData && e.clipboardData.files && e.clipboardData.files.length > 0) {
        const file = e.clipboardData.files[0];
        if (file.type.startsWith('image/')) {
          handleFile(file);
        }
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [isPhotoModalOpen]);

  if (!isPhotoModalOpen) return null;

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMessage(isEn ? 'Please select a valid image file (PNG, JPG, or WEBP)' : 'يرجى اختيار ملف صورة صالح (PNG أو JPG أو WEBP)');
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await uploadDoctorPhoto(file);
      setSuccessMessage(
        isEn 
          ? 'Photo successfully loaded and saved as the permanent default photo of Dr. Mahmoud!' 
          : 'تم تطبيق الصورة بنجاح وتثبيتها كصورة افتراضية رسمية لدكتور محمود في كامل الموقع!'
      );
      setTimeout(() => {
        setSuccessMessage(null);
      }, 6000);
    } catch (err: any) {
      setErrorMessage(err.message || (isEn ? 'Failed to process image' : 'تعذر معالجة الصورة'));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleMakeGlobalDefault = async () => {
    setIsSettingDefault(true);
    setErrorMessage(null);
    try {
      const res = await makeCurrentPhotoGlobalDefault();
      if (res.success) {
        setSuccessMessage(
          isEn 
            ? 'Success! This photo is now locked as the permanent global default for all website visitors!' 
            : 'تم بنجاح! تم اعتماد وتثبيت هذه الصورة كصورة افتراضية رسمية دائمة لدكتور محمود تظهر لجميع الزوار على كافة الأجهزة!'
        );
        setTimeout(() => setSuccessMessage(null), 6000);
      } else {
        setErrorMessage(res.message || (isEn ? 'Failed to lock default' : 'تعذر حفظ الصورة كافتراضية'));
      }
    } catch (e: any) {
      setErrorMessage(e.message || (isEn ? 'An error occurred' : 'حدث خطأ'));
    } finally {
      setIsSettingDefault(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleResetToDefault = () => {
    updateSiteSettings({ doctorPhotoUrl: '/dr-mahmoud.jpg' });
    setSuccessMessage(isEn ? 'Reset to default path (/dr-mahmoud.jpg)' : 'تمت استعادة المسار الافتراضي (/dr-mahmoud.jpg)');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        id="doctor-photo-modal-card"
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-xs">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {isEn ? "Dr. Mahmoud Ali Nabih - Authentic Photo" : "الصورة الرسمية المعتمدة لدكتور محمود علي نبيه"}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {isEn ? "Use real unedited photograph without AI alterations" : "تطبيق الصورة الأصلية الحقيقية بدون تعديل ملامح أو ذكاء اصطناعي"}
              </p>
            </div>
          </div>
          <button
            id="close-doctor-photo-modal-btn"
            onClick={() => setIsPhotoModalOpen(false)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Status Messages */}
          {successMessage && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-start gap-3 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="font-medium">{successMessage}</div>
            </div>
          )}

          {errorMessage && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-3 animate-in fade-in">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="font-medium">{errorMessage}</div>
            </div>
          )}

          {/* Current Photo vs Upload Comparison Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            {/* Active Preview */}
            <div className="sm:col-span-5 flex flex-col items-center">
              <div className="w-44 aspect-3/4 rounded-2xl overflow-hidden bg-slate-100 border-2 border-slate-200 shadow-md relative group">
                <img
                  src={currentPhoto}
                  alt={isEn ? "Dr. Mahmoud Ali Nabih" : "د. محمود علي نبيه"}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-x-0 bottom-0 bg-slate-900/70 p-2 text-center text-white text-[11px] font-bold">
                  {isEn ? "Active on Website" : "المعروضة حالياً بالموقع"}
                </div>
              </div>
              <p className="text-[11px] text-slate-400 mt-2 text-center font-mono">
                {currentPhoto.startsWith('data:') ? 'Base64 Live Image' : currentPhoto}
              </p>
            </div>

            {/* Upload Action Zone */}
            <div className="sm:col-span-7 space-y-3">
              <div
                id="doctor-photo-dropzone"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-3xl p-6 text-center cursor-pointer transition-all ${
                  isDragging
                    ? 'border-blue-500 bg-blue-50/50 scale-[1.01]'
                    : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50/60'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFile(e.target.files[0]);
                    }
                  }}
                />

                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3 shadow-xs">
                  {isProcessing ? (
                    <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
                  ) : (
                    <Upload className="w-6 h-6 text-blue-600" />
                  )}
                </div>

                <h4 className="font-bold text-slate-900 text-sm">
                  {isEn ? "Select Dr. Mahmoud's Original Photo" : "اختر أو اسحب صورة د. محمود الأصلية"}
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  {isEn 
                    ? "Drag & drop 'Untitled design...png' or click to browse" 
                    : "اسحب ملف الصورة الأصلية (Untitled design) أو اضغط هنا للاختيار"}
                </p>
                <div className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
                  <ImageIcon className="w-3.5 h-3.5 text-slate-500" />
                  <span>PNG, JPG, WEBP</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 pt-1 flex-wrap">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  <span>{isEn ? "Browse from Computer" : "تحديد ملف صورة من الجهاز"}</span>
                </button>

                <button
                  type="button"
                  id="make-photo-global-default-btn"
                  onClick={handleMakeGlobalDefault}
                  disabled={isSettingDefault}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  title={isEn ? "Set as default for all visitors" : "تثبيت كصورة افتراضية لكافة الزوار"}
                >
                  {isSettingDefault ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4" />
                  )}
                  <span>{isEn ? "Lock as Default for All" : "تثبيت كافتراضي دائم للموقع"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetToDefault}
                  className="px-3 py-2 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 text-xs font-medium transition-colors cursor-pointer"
                >
                  {isEn ? "Reset Path" : "إعادة التعيين"}
                </button>
              </div>
            </div>
          </div>

          {/* User Assurance Callout */}
          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 text-xs text-slate-600 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-blue-900">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>{isEn ? "Preservation of Natural Features" : "حفظ الملامح والهوية الحقيقية"}</span>
            </div>
            <p className="leading-relaxed">
              {isEn 
                ? "The photo selected here is applied directly without any AI regeneration, morphing, or modification of facial characteristics, maintaining full clinical credibility and authentic professional identity."
                : "الصورة التي تختارها هنا تُطبّق بشكل مباشر كملف صورة حقيقي دون أي معالجة توليدية أو تغيير في الملامح بالذكاء الاصطناعي، حفاظاً على المصداقية الطبية الكاملة والهوية الشخصية الموثقة لدكتور محمود."}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end">
          <button
            id="close-doctor-photo-done-btn"
            onClick={() => setIsPhotoModalOpen(false)}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-xs"
          >
            {isEn ? "Done & Save" : "تم والحفظ"}
          </button>
        </div>
      </div>
    </div>
  );
};
