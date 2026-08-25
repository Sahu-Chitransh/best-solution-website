import React from 'react';

/**
 * Doctor Avatar Illustration (matching reference design)
 */
export function DoctorIllustration({ className = "w-28 h-28" }) {
  return (
    <div className={`relative flex items-center justify-center rounded-2xl overflow-hidden bg-gradient-to-b from-sky-50 to-blue-100/70 p-2 ${className}`}>
      <svg viewBox="0 0 120 120" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Background glow circle */}
        <circle cx="60" cy="60" r="52" fill="#E1F5FE" />

        {/* Doctor Coat / Shoulders */}
        <path d="M26 120 C26 95 38 82 60 82 C82 82 94 95 94 120 Z" fill="#FFFFFF" />
        <path d="M42 84 L54 120 L30 120 Z" fill="#E0F2FE" />
        <path d="M78 84 L66 120 L90 120 Z" fill="#E0F2FE" />
        {/* Inner Shirt */}
        <path d="M50 82 L60 102 L70 82 Z" fill="#00A3FF" />

        {/* Neck */}
        <rect x="52" y="70" width="16" height="16" rx="4" fill="#F7C5A8" />

        {/* Hair - Back */}
        <path d="M30 60 C30 38 42 26 60 26 C78 26 90 38 90 60 C90 76 86 86 86 86 C86 86 78 78 78 68 C78 68 76 68 76 68 C76 76 60 76 44 68 C44 78 34 86 34 86 C34 86 30 76 30 60 Z" fill="#1E293B" />

        {/* Face */}
        <ellipse cx="60" cy="56" rx="20" ry="22" fill="#FCD5B5" />

        {/* Hair - Front Bangs */}
        <path d="M40 50 C40 38 48 34 60 34 C72 34 80 38 80 50 C76 44 68 42 60 42 C52 42 44 44 40 50 Z" fill="#1E293B" />

        {/* Eyes */}
        <ellipse cx="52" cy="54" rx="2.5" ry="3" fill="#0F172A" />
        <ellipse cx="68" cy="54" rx="2.5" ry="3" fill="#0F172A" />
        <circle cx="53" cy="53" r="0.8" fill="#FFFFFF" />
        <circle cx="69" cy="53" r="0.8" fill="#FFFFFF" />

        {/* Smile */}
        <path d="M54 64 Q60 70 66 64" stroke="#9A3412" strokeWidth="2.5" strokeLinecap="round" fill="#DC2626" />

        {/* Blush */}
        <ellipse cx="46" cy="60" rx="3" ry="1.8" fill="#FDA4AF" opacity="0.7" />
        <ellipse cx="74" cy="60" rx="3" ry="1.8" fill="#FDA4AF" opacity="0.7" />

        {/* Medical Headband */}
        <rect x="38" y="40" width="44" height="7" rx="3.5" fill="#00A3FF" />
        {/* Headlamp Mirror */}
        <circle cx="60" cy="43.5" r="7" fill="#FDE047" stroke="#0284C7" strokeWidth="2" />
        <circle cx="60" cy="43.5" r="3" fill="#FFFFFF" />
      </svg>
    </div>
  );
}

/**
 * Engineer Avatar Illustration (matching reference design)
 */
export function EngineerIllustration({ className = "w-28 h-28" }) {
  return (
    <div className={`relative flex items-center justify-center rounded-2xl overflow-hidden bg-gradient-to-b from-amber-50 to-orange-100/70 p-2 ${className}`}>
      <svg viewBox="0 0 120 120" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Background circle */}
        <circle cx="60" cy="60" r="52" fill="#FEF3C7" />

        {/* Work Shirt / Shoulders */}
        <path d="M26 120 C26 95 38 84 60 84 C82 84 94 95 94 120 Z" fill="#38BDF8" />
        {/* Overalls / Collar Straps */}
        <path d="M38 90 L46 120 L32 120 Z" fill="#0284C7" />
        <path d="M82 90 L74 120 L88 120 Z" fill="#0284C7" />
        {/* Center Collar */}
        <path d="M52 84 L60 98 L68 84 Z" fill="#FFFFFF" />

        {/* Neck */}
        <rect x="52" y="70" width="16" height="18" rx="4" fill="#D97706" opacity="0.4" />
        <rect x="52" y="68" width="16" height="16" rx="4" fill="#F7C5A8" />

        {/* Ears */}
        <circle cx="38" cy="58" r="6" fill="#FCD5B5" />
        <circle cx="82" cy="58" r="6" fill="#FCD5B5" />

        {/* Face */}
        <ellipse cx="60" cy="58" rx="20" ry="21" fill="#FCD5B5" />

        {/* Eyes */}
        <ellipse cx="52" cy="56" rx="2.5" ry="3" fill="#0F172A" />
        <ellipse cx="68" cy="56" rx="2.5" ry="3" fill="#0F172A" />
        <circle cx="53" cy="55" r="0.8" fill="#FFFFFF" />
        <circle cx="69" cy="55" r="0.8" fill="#FFFFFF" />

        {/* Eyebrows */}
        <path d="M48 50 Q52 48 56 50" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
        <path d="M64 50 Q68 48 72 50" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />

        {/* Smile */}
        <path d="M53 66 Q60 73 67 66" stroke="#9A3412" strokeWidth="2.5" strokeLinecap="round" fill="#DC2626" />

        {/* Engineer Hardhat */}
        {/* Dome */}
        <path d="M36 48 C36 28 46 22 60 22 C74 22 84 28 84 48 Z" fill="#FACC15" />
        {/* Hardhat ridge line */}
        <path d="M57 22 L57 48 L63 48 L63 22 Z" fill="#EAB308" />
        {/* Hardhat Brim */}
        <path d="M30 46 C30 44 38 42 60 42 C82 42 90 44 90 46 C90 49 82 51 60 51 C38 51 30 49 30 46 Z" fill="#EAB308" />
        <path d="M33 46 C33 45 42 44 60 44 C78 44 87 45 87 46 C87 47.5 78 49 60 49 C42 49 33 47.5 33 46 Z" fill="#CA8A04" />
      </svg>
    </div>
  );
}

/**
 * 6-10th Rocket Launch Illustration (matching reference design)
 */
export function RocketIllustration({ className = "w-28 h-28" }) {
  return (
    <div className={`relative flex items-center justify-center rounded-2xl overflow-hidden bg-gradient-to-b from-emerald-50 to-teal-100/70 p-2 ${className}`}>
      <svg viewBox="0 0 120 120" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Background circle */}
        <circle cx="60" cy="60" r="52" fill="#E6F4EA" />

        {/* Smoke Plume Clouds at bottom */}
        <circle cx="36" cy="100" r="16" fill="#C7D2FE" opacity="0.7" />
        <circle cx="84" cy="100" r="16" fill="#C7D2FE" opacity="0.7" />
        <circle cx="60" cy="106" r="18" fill="#E0E7FF" />
        <circle cx="44" cy="102" r="14" fill="#EDE9FE" />
        <circle cx="76" cy="102" r="14" fill="#EDE9FE" />

        {/* Rocket Exhaust Fire */}
        <path d="M52 82 Q60 102 68 82 Z" fill="#0284C7" />
        <path d="M55 82 Q60 94 65 82 Z" fill="#38BDF8" />
        <path d="M57 82 Q60 88 63 82 Z" fill="#FFFFFF" />

        {/* Rocket Left Fin */}
        <path d="M46 64 C42 64 36 72 36 84 C44 84 50 78 50 72 Z" fill="#16A34A" />

        {/* Rocket Right Fin */}
        <path d="M74 64 C78 64 84 72 84 84 C76 84 70 78 70 72 Z" fill="#16A34A" />

        {/* Rocket Body */}
        <path d="M46 44 C46 26 60 16 60 16 C60 16 74 26 74 44 L74 78 C74 81 70 82 60 82 C50 82 46 81 46 78 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />

        {/* Rocket Nose Cone */}
        <path d="M46 36 C48 24 60 16 60 16 C60 16 72 24 74 36 Z" fill="#16A34A" />

        {/* Center Ventral Fin */}
        <path d="M58 58 L60 82 L62 58 Z" fill="#15803D" />

        {/* Viewport Window */}
        <circle cx="60" cy="46" r="8.5" fill="#0284C7" stroke="#E2E8F0" strokeWidth="2" />
        <circle cx="60" cy="46" r="6" fill="#38BDF8" />
        <circle cx="58" cy="44" r="2" fill="#FFFFFF" />
      </svg>
    </div>
  );
}
