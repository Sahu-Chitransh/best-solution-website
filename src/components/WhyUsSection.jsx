import { Lightbulb, FileCheck, UserCheck, CheckCircle2 } from 'lucide-react';
import whyUsData from '../content/whyUs.json';
import { useScrollReveal } from '../hooks/useScrollReveal';

const ICON_MAP = {
  Lightbulb,
  FileCheck,
  UserCheck,
};

export default function WhyUsSection() {
  const ref = useScrollReveal();

  return (
    <section className="relative py-20 lg:py-24 bg-[#FAFAFA] border-y border-black/5 overflow-hidden" ref={ref}>
      {/* Soft ambient background shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gradient-to-b from-[#FFCDD2]/30 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-gradient-to-t from-[#FFEBEE]/40 to-transparent blur-2xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Philosophy & 3 Pillars (Span 6) */}
          <div className="lg:col-span-6" data-animate>
            {/* Eyebrow */}
            <div className="flex items-center gap-2.5 mb-3.5">
              <span className="text-xs font-bold tracking-widest text-[#D32F2F] uppercase">
                {whyUsData.eyebrow}
              </span>
              <span className="w-8 h-0.5 bg-[#D32F2F] rounded-full" />
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight text-[#0F172A] leading-[1.18]">
              {whyUsData.title}{' '}
              <span className="text-[#D32F2F] block sm:inline">
                {whyUsData.titleHighlight}
              </span>
            </h2>

            {/* Bio paragraph */}
            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg">
              {whyUsData.description}
            </p>

            {/* 3 Numbered Feature Rows */}
            <div className="mt-8 divide-y divide-slate-200/70 border-t border-slate-200/70 max-w-lg">
              {whyUsData.pillars.map((pillar, idx) => {
                const IconComponent = ICON_MAP[pillar.icon] || Lightbulb;
                return (
                  <div
                    key={pillar.number}
                    className={`py-4 flex items-start gap-4 bs-animate-hidden bs-stagger-${idx + 1}`}
                    data-animate
                  >
                    {/* Pink circular icon badge */}
                    <div className="w-11 h-11 rounded-full bg-[#FFEBEE] border border-[#FFCDD2]/60 flex items-center justify-center text-[#D32F2F] flex-shrink-0 mt-0.5 shadow-xs">
                      <IconComponent size={19} className="stroke-[2.2]" />
                    </div>

                    {/* Step Number */}
                    <span className="text-xs font-bold text-slate-400 tracking-wider mt-1 select-none flex-shrink-0">
                      {pillar.number}
                    </span>

                    {/* Content */}
                    <div>
                      <h3 className="text-base font-bold text-[#0F172A] tracking-tight">
                        {pillar.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-slate-500 mt-0.5 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Cursive Red Script Slogan */}
            <div className="mt-8 pt-2 relative inline-block">
              <span className="font-['Caveat',cursive] text-2xl sm:text-3xl font-bold text-[#D32F2F] select-none block leading-tight">
                {whyUsData.slogan}
              </span>
              <svg
                className="w-44 h-3.5 text-[#D32F2F] mt-0.5"
                viewBox="0 0 170 14"
                fill="none"
              >
                <path
                  d="M2 7 C50 14 120 14 168 3"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Right Column: 16+ Trust Card (Span 6) */}
          <div className="lg:col-span-6" data-animate>
            <div className="relative rounded-[2.5rem] bg-gradient-to-br from-[#FFF5F6] via-white to-[#FFF0F2] border border-[#FFE4E6] p-6 sm:p-8 lg:p-9 shadow-xl shadow-red-500/5 overflow-hidden">
              {/* Origami Paper Plane Doodle (Top Right) */}
              <svg
                className="absolute top-3 right-28 sm:right-36 w-12 h-12 text-[#D32F2F]/40 select-none pointer-events-none"
                viewBox="0 0 48 48"
                fill="none"
              >
                <path
                  d="M6 22 L42 6 L26 42 L20 26 Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M42 6 L20 26"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 22 C14 26 26 20 42 6"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                  opacity="0.6"
                />
              </svg>

              {/* Open Book Doodle (Bottom Right) */}
              <svg
                className="absolute bottom-3 right-4 w-12 h-12 text-[#D32F2F]/30 select-none pointer-events-none"
                viewBox="0 0 48 48"
                fill="none"
              >
                <path
                  d="M6 34 C12 30 20 30 24 33 C28 30 36 30 42 34 L42 12 C36 8 28 8 24 11 C20 8 12 8 6 12 Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M24 11 L24 33"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>

              {/* Cheerful doodles around student head */}
              <div className="absolute top-6 right-8 sm:right-12 select-none pointer-events-none text-[#D32F2F]/40">
                <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none">
                  <path d="M8 12 C10 8 14 8 16 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M24 6 C26 2 30 2 32 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M28 16 C32 14 36 18 34 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>

              {/* Card Internal Grid: Text/Pills + Student Photo */}
              <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6">
                {/* Left side of card */}
                <div className="flex-1 max-w-xs sm:max-w-[270px]">
                  {/* 16+ */}
                  <div className="text-6xl sm:text-7xl font-black tracking-tighter leading-none bg-gradient-to-r from-[#D32F2F] to-[#B71C1C] bg-clip-text text-transparent">
                    {whyUsData.card.stat}
                  </div>

                  {/* Label */}
                  <h4 className="mt-2 text-lg sm:text-xl font-bold text-[#0F172A] tracking-tight leading-snug">
                    {whyUsData.card.statLabel}
                  </h4>

                  {/* Description */}
                  <p className="mt-2.5 text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                    {whyUsData.card.description}
                  </p>

                  {/* 4 Badges (2x2 grid) */}
                  <div className="mt-5 grid grid-cols-2 gap-2">
                    {whyUsData.card.badges.map((badge) => (
                      <div
                        key={badge}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/95 border border-red-100 shadow-xs text-[11px] sm:text-xs font-semibold text-[#0F172A]"
                      >
                        <CheckCircle2 size={13} className="text-[#D32F2F] fill-[#FFCDD2] flex-shrink-0" />
                        <span className="truncate">{badge}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right side of card: Student Photo (Enlarged & Crisp) */}
                <div className="w-56 sm:w-64 md:w-72 lg:w-76 xl:w-80 flex-shrink-0 flex justify-center -mb-6 sm:-mb-8 lg:-mb-9">
                  <img
                    src={whyUsData.card.image}
                    alt="Best Solution Student"
                    className="w-full max-w-[340px] h-auto object-contain drop-shadow-xl select-none"
                    loading="lazy"
                    decoding="async"
                    width="720"
                    height="1062"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
