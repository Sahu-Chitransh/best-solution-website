import React from 'react';
import { Link } from 'react-router-dom';

const THEME_STYLES = {
  doctor: {
    border: 'border-[#FCE8E8] hover:border-[#FCA5A5]',
    bg: 'bg-white hover:bg-[#FFFBFB]',
    shadow: 'hover:shadow-rose-100/70',
    ring: 'ring-[#E54B4B]/20 border-[#E54B4B]',
    btnBg: 'bg-[#E54B4B] hover:bg-[#D32F2F]',
    btnShadow: 'shadow-[#E54B4B]/25',
  },
  engineer: {
    border: 'border-[#EBF2FD] hover:border-[#93C5FD]',
    bg: 'bg-white hover:bg-[#F8FAFF]',
    shadow: 'hover:shadow-blue-100/70',
    ring: 'ring-[#2F80ED]/20 border-[#2F80ED]',
    btnBg: 'bg-[#2F80ED] hover:bg-[#1D4ED8]',
    btnShadow: 'shadow-[#2F80ED]/25',
  },
  foundation: {
    border: 'border-[#EAF7EF] hover:border-[#86EFAC]',
    bg: 'bg-white hover:bg-[#F7FCF9]',
    shadow: 'hover:shadow-green-100/70',
    ring: 'ring-[#27AE60]/20 border-[#27AE60]',
    btnBg: 'bg-[#27AE60] hover:bg-[#15803D]',
    btnShadow: 'shadow-[#27AE60]/25',
  },
};

export default function GoalCard({
  goal,
  isSelected = false,
  onClick,
  to,
  className = '',
  'data-animate': dataAnimate,
}) {
  const theme = THEME_STYLES[goal.id] || THEME_STYLES.doctor;

  const cardContent = (
    <>
      {/* 3D Icon Graphic */}
      <div className="w-full flex justify-center items-center pt-2 pb-1">
        <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-105 select-none">
          <img
            src={goal.image}
            alt={goal.title}
            className="w-full h-full object-contain pointer-events-none"
            loading="lazy"
            decoding="async"
            width="144"
            height="144"
          />
        </div>
      </div>

      {/* Title & Subtitle */}
      <div className="my-3 text-center">
        <h3 className="text-xl sm:text-2xl font-black text-[#0A1B39] tracking-tight transition-colors">
          {goal.title}
        </h3>
        <p className="text-xs sm:text-[13px] font-bold text-slate-400 uppercase tracking-wider mt-1">
          {goal.subtitle}
        </p>
      </div>

      {/* Colored Pill Button */}
      <div className="mt-2 pb-1">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md transition-all duration-300 group-hover:scale-105 ${theme.btnBg} ${theme.btnShadow}`}
        >
          Explore &rarr;
        </span>
      </div>
    </>
  );

  const baseClasses = `group relative flex flex-col items-center justify-between rounded-[28px] p-6 sm:p-8 text-center transition-all duration-300 border-2 shadow-sm hover:shadow-xl hover:-translate-y-1.5 select-none cursor-pointer ${theme.bg} ${
    isSelected
      ? `ring-4 ${theme.ring} shadow-lg -translate-y-1.5`
      : `${theme.border} ${theme.shadow}`
  } ${className}`;

  if (to) {
    return (
      <Link
        to={to}
        className={baseClasses}
        data-animate={dataAnimate}
        aria-label={`Explore ${goal.title}`}
      >
        {cardContent}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={baseClasses}
      data-animate={dataAnimate}
      aria-pressed={isSelected}
      aria-label={`Select ${goal.title}`}
    >
      {cardContent}
    </button>
  );
}
