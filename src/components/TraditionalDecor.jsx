import React from 'react';

// Ornate Corner Filigree in Antique Gold
export const OrnateCorner = ({ className = "w-16 h-16 text-gold", position = "top-left" }) => {
  const rotation = {
    "top-left": "",
    "top-right": "rotate-90",
    "bottom-right": "rotate-180",
    "bottom-left": "-rotate-90",
  }[position] || "";

  return (
    <div className={`pointer-events-none select-none ${rotation} ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" className="w-full h-full stroke-current">
        <path d="M5 95 L5 20 Q5 5 20 5 L95 5" strokeWidth="2.5" />
        <path d="M12 95 L12 24 Q12 12 24 12 L95 12" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="28" cy="28" r="8" strokeWidth="1.5" />
        <circle cx="28" cy="28" r="4" fill="currentColor" />
        <path d="M28 20 C24 14 14 24 20 28 C14 32 24 42 28 36 C32 42 42 32 36 28 C42 24 32 14 28 20 Z" fill="currentColor" opacity="0.4" />
        <path d="M20 5 C28 15 36 20 55 12" strokeWidth="1.5" />
        <path d="M5 20 C15 28 20 36 12 55" strokeWidth="1.5" />
      </svg>
    </div>
  );
};

// Auspicious Ganesha Emblem for the card header
export const GaneshaEmblem = ({ className = "w-16 h-16 text-burgundy" }) => (
  <div className={`inline-flex items-center justify-center ${className}`}>
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
      {/* Halo */}
      <circle cx="60" cy="60" r="54" stroke="#D6B77A" strokeWidth="2" strokeDasharray="4 3" />
      <circle cx="60" cy="60" r="48" stroke="#B87950" strokeWidth="1" opacity="0.6" />
      
      {/* Crown / Mukut */}
      <path d="M50 32 L60 18 L70 32 Z" fill="#D6B77A" stroke="#781F35" strokeWidth="1.5" />
      <circle cx="60" cy="22" r="3" fill="#781F35" />
      <path d="M46 32 C54 36 66 36 74 32 L72 38 C64 42 56 42 48 38 Z" fill="#D6B77A" />

      {/* Ears */}
      <path d="M46 42 C32 40 28 54 32 68 C35 76 44 76 46 72" stroke="#781F35" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M74 42 C88 40 92 54 88 68 C85 76 76 76 74 72" stroke="#781F35" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* Forehead & Tilak */}
      <path d="M46 42 Q60 48 74 42 Q60 52 46 42 Z" fill="#781F35" />
      <ellipse cx="60" cy="46" rx="2.5" ry="5" fill="#D6B77A" />
      <circle cx="60" cy="42" r="2" fill="#781F35" />

      {/* Trunk with Modak curve */}
      <path d="M56 46 Q54 62 58 72 Q62 82 54 86 Q46 88 48 80 Q50 74 54 70" stroke="#781F35" strokeWidth="3" strokeLinecap="round" fill="none" />
      
      {/* Tusk */}
      <path d="M64 64 L70 66" stroke="#D6B77A" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M54 64 L50 65" stroke="#D6B77A" strokeWidth="2.5" strokeLinecap="round" />

      {/* Lotus base petals */}
      <path d="M38 96 C48 90 60 92 60 98 C60 92 72 90 82 96 C72 102 48 102 38 96 Z" fill="#D6B77A" opacity="0.8" />
    </svg>
  </div>
);

// Traditional Brass Diya Lamp with animated flickering flame
export const DiyaLamp = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }[size] || "w-12 h-12";

  return (
    <div className={`relative inline-block ${sizeClasses} ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
        {/* Glow halo */}
        <circle cx="50" cy="38" r="22" fill="#FFB703" opacity="0.25" className="blur-sm diya-flame" />

        {/* Flickering Flame */}
        <g className="diya-flame">
          {/* Outer yellow flame */}
          <path d="M50 20 C56 28 58 36 50 44 C42 36 44 28 50 20 Z" fill="#FFB703" />
          {/* Inner core orange/white flame */}
          <path d="M50 26 C53 31 54 36 50 40 C46 36 47 31 50 26 Z" fill="#FFF8EF" />
        </g>

        {/* Brass Diya Bowl */}
        <ellipse cx="50" cy="52" rx="36" ry="12" fill="#D6B77A" stroke="#B87950" strokeWidth="2" />
        <ellipse cx="50" cy="50" rx="32" ry="8" fill="#B87950" />
        <path d="M14 52 C14 70 30 78 50 78 C70 78 86 70 86 52 Z" fill="#D6B77A" stroke="#B87950" strokeWidth="2" />
        
        {/* Ornate Engravings on Bowl */}
        <path d="M26 62 Q50 72 74 62" stroke="#781F35" strokeWidth="2" strokeLinecap="round" />
        <circle cx="50" cy="67" r="3" fill="#781F35" />
        <circle cx="36" cy="64" r="2.5" fill="#781F35" />
        <circle cx="64" cy="64" r="2.5" fill="#781F35" />

        {/* Diya Pedestal Stand */}
        <path d="M42 78 L38 90 L62 90 L58 78 Z" fill="#B87950" />
        <ellipse cx="50" cy="90" rx="20" ry="5" fill="#D6B77A" stroke="#B87950" strokeWidth="1.5" />
      </svg>
    </div>
  );
};

// Traditional Indian Floral Mandala Divider
export const MandalaDivider = ({ className = "my-8" }) => (
  <div className={`flex items-center justify-center gap-3 ${className}`}>
    <div className="h-[1px] flex-1 max-w-[120px] bg-gradient-to-r from-transparent via-[#D6B77A] to-[#B87950]" />
    <div className="flex items-center gap-1.5 text-gold">
      <span className="w-1.5 h-1.5 rounded-full bg-copper" />
      <svg className="w-6 h-6 text-burgundy" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L14.2 8.2L20.5 6L16.8 11.2L22 14.5L15.8 15.5L17 21.8L12 17.8L7 21.8L8.2 15.5L2 14.5L7.2 11.2L3.5 6L9.8 8.2L12 2Z" fill="#D6B77A" stroke="#781F35" strokeWidth="0.8" />
      </svg>
      <span className="w-2.5 h-2.5 rotate-45 border border-gold bg-champagne-light" />
      <svg className="w-6 h-6 text-burgundy" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L14.2 8.2L20.5 6L16.8 11.2L22 14.5L15.8 15.5L17 21.8L12 17.8L7 21.8L8.2 15.5L2 14.5L7.2 11.2L3.5 6L9.8 8.2L12 2Z" fill="#D6B77A" stroke="#781F35" strokeWidth="0.8" />
      </svg>
      <span className="w-1.5 h-1.5 rounded-full bg-copper" />
    </div>
    <div className="h-[1px] flex-1 max-w-[120px] bg-gradient-to-l from-transparent via-[#D6B77A] to-[#B87950]" />
  </div>
);

// Hanging Jasmine and Marigold Toran / Garland for Entrance & Headers
export const ToranGarland = ({ className = "" }) => (
  <div className={`w-full overflow-hidden select-none pointer-events-none ${className}`}>
    <div className="flex justify-between items-start w-full px-2">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="flex flex-col items-center">
          {/* Mango leaf */}
          <div className="w-4 h-7 bg-[#3D5A2B] rounded-b-full shadow-sm origin-top transform rotate-3" />
          {/* Jasmine bud & Marigold ball */}
          <div className="w-3.5 h-3.5 -mt-1 rounded-full bg-[#FFF8EF] border border-[#D6B77A] shadow-xs" />
          <div className="w-4 h-4 -mt-0.5 rounded-full bg-[#E57A00] shadow-sm flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FFA000]" />
          </div>
          {/* Occasional hanging jasmine string */}
          {i % 2 === 1 && (
            <div className="flex flex-col items-center gap-0.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-white shadow-xs" />
              <span className="w-2 h-2 rounded-full bg-white shadow-xs" />
              <span className="w-2 h-2 rounded-full bg-white shadow-xs" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#D6B77A]" />
            </div>
          )}
        </div>
      ))}
    </div>
    {/* Swag line */}
    <div className="w-full h-1 bg-gradient-to-r from-copper via-gold to-copper -mt-9 opacity-70" />
  </div>
);

// Lotus flower symbol
export const LotusEmblem = ({ className = "w-8 h-8 text-rose-antique" }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    <path d="M50 20 C40 45 40 65 50 80 C60 65 60 45 50 20 Z" fill="currentColor" opacity="0.9" />
    <path d="M50 80 C30 75 15 55 25 38 C32 48 38 65 50 80 Z" fill="currentColor" opacity="0.75" />
    <path d="M50 80 C70 75 85 55 75 38 C68 48 62 65 50 80 Z" fill="currentColor" opacity="0.75" />
    <path d="M50 80 C20 80 5 65 12 50 C20 60 32 72 50 80 Z" fill="currentColor" opacity="0.5" />
    <path d="M50 80 C80 80 95 65 88 50 C80 60 68 72 50 80 Z" fill="currentColor" opacity="0.5" />
  </svg>
);
