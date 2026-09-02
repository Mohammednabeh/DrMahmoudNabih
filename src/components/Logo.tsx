import React from 'react';
import { useCMS } from '../context/CMSContext';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'compact';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  variant = 'light',
  showSubtitle = true 
}) => {
  const { language } = useCMS();
  const isEn = language === 'en';

  return (
    <div 
      className={`flex items-center gap-3 select-none ${className}`}
      dir="ltr"
      style={{ direction: 'ltr' }}
    >
      {/* SVG Emblem representing the exact uploaded logo symbol */}
      <svg 
        viewBox="0 0 120 120" 
        className="h-10 w-10 sm:h-12 sm:w-12 shrink-0 drop-shadow-sm" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Mahmoud Nabih Logo Mark"
      >
        {/* Head */}
        <ellipse cx="60" cy="24" rx="9" ry="11" fill="#15808d" />
        
        {/* Vitality Body Arms & Torso */}
        <path 
          d="M 34 26 C 37 38 43 49 53 58 C 50 78 55 98 68 114 C 67 98 62 82 63 66 C 72 58 79 46 86 24 C 80 40 73 52 64 58 C 61 58 59 58 56 58 C 47 52 40 40 34 26 Z" 
          fill="#15808d" 
        />
        
        {/* Orange Energy Center (Sun/Heart Core) */}
        <circle cx="60" cy="48" r="7.5" fill="#d97036" />
      </svg>

      {/* Vertical divider line from uploaded logo */}
      <div className="w-[2.5px] h-9 sm:h-11 bg-[#d97036] rounded-full shrink-0" />

      {/* Brand Text - Strict LTR English Name Alignment */}
      <div className="flex flex-col justify-center leading-tight text-left" dir="ltr" style={{ textAlign: 'left' }}>
        <div className="flex items-baseline gap-1.5 font-bold tracking-tight" dir="ltr">
          <span className="text-[#15808d] font-serif text-lg sm:text-xl font-medium">
            Mahmoud
          </span>
          <span className="text-[#d97036] tracking-wider text-lg sm:text-xl uppercase font-black">
            NABIH
          </span>
        </div>
        {showSubtitle && (
          <span className="text-[#c6652e] text-[10px] sm:text-[11px] font-semibold tracking-normal whitespace-nowrap text-left" dir="ltr">
            {isEn ? 'Physiotherapist & Cupping Specialist' : 'أخصائي علاج طبيعي وخبير الحجامة'}
          </span>
        )}
      </div>
    </div>
  );
};
