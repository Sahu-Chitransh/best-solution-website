import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Trophy, Sparkles, Medal, Award, CheckCircle2,
  ArrowRight, X, ChevronLeft, ChevronRight, ZoomIn, ShieldCheck,
} from 'lucide-react';
import resultsData from '../content/results.json';

/* ── Scroll Reveal Hook ── */
function useScrollReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll('.bs-animate-hidden');
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('bs-animate-visible');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.1 }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);
  return ref;
}

export default function Results() {
  const wrapRef = useScrollReveal();
  const [filter, setFilter] = useState('all'); // 'all' | 'jee' | 'neet'
  const [lightbox, setLightbox] = useState({ open: false, index: 0, items: [] });
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  // Extract raw lists safely
  const rawJee = (resultsData?.jee || []).map((img) =>
    typeof img === 'string' ? img : img.image || Object.values(img)[0] || ''
  );
  const rawNeet = (resultsData?.neet || []).map((img) =>
    typeof img === 'string' ? img : img.image || Object.values(img)[0] || ''
  );

  const jeeItems = rawJee.map((src, idx) => ({
    src,
    type: 'jee',
    label: `JEE Advanced / Main Ranker ${idx + 1}`,
    badge: 'IIT-JEE',
    badgeColor: '#D32F2F',
  }));

  const neetItems = rawNeet.map((src, idx) => ({
    src,
    type: 'neet',
    label: `NEET-UG Medical Achiever ${idx + 1}`,
    badge: 'NEET-UG',
    badgeColor: '#00A3FF',
  }));

  const allItems = [...jeeItems, ...neetItems];

  const displayItems =
    filter === 'jee' ? jeeItems : filter === 'neet' ? neetItems : allItems;

  const openLightbox = (itemsList, index) => {
    setLightbox({ open: true, index, items: itemsList });
  };

  const closeLightbox = () => {
    setLightbox((prev) => ({ ...prev, open: false }));
  };

  const showNext = useCallback(() => {
    setLightbox((prev) => ({
      ...prev,
      index: (prev.index + 1) % (prev.items.length || 1),
    }));
  }, []);

  const showPrev = useCallback(() => {
    setLightbox((prev) => ({
      ...prev,
      index: (prev.index - 1 + (prev.items.length || 1)) % (prev.items.length || 1),
    }));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!lightbox.open) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox.open, showNext, showPrev]);

  // Lock body scroll
  useEffect(() => {
    if (lightbox.open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightbox.open]);

  // Touch handlers for Lightbox
  const onTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };
  const onTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };
  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) showNext();
    else if (diff < -50) showPrev();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const currentItem = lightbox.items[lightbox.index] || {};
  const statsList = resultsData?.stats || [];
  const spotlights = resultsData?.spotlights || [];

  return (
    <div ref={wrapRef} className="bg-white min-h-screen">
      {/* ============ 1. HERO SECTION ============ */}
      <section className="pt-16 sm:pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D32F2F]/30 bg-[#FFEBEE] text-[#D32F2F] px-4 py-1.5 text-xs font-bold uppercase tracking-widest shadow-sm">
            <Trophy size={14} className="text-[#D32F2F]" />
            HALL OF FAME · VERIFIED RESULTS
          </div>

          {/* Heading */}
          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#0A0A0A] leading-[1.05]">
            Results That <span className="text-[#D32F2F]">Speak Volumes.</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {resultsData?.subheading ||
              'Every result below is from a verified student of Best Solution, Vijay Nagar, Indore. Real ranks forged through rigorous mentorship.'}
          </p>

          {/* Authenticity guarantee badge */}
          <div className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-100/80 px-4 py-1.5 rounded-full border border-slate-200">
            <ShieldCheck size={15} className="text-[#2E7D32]" />
            100% Genuine Student Ranks & Scores
          </div>
        </div>

        {/* ============ 2. STATS BAR ============ */}
        <div className="mt-14 max-w-5xl mx-auto rounded-3xl bg-slate-50 border border-slate-200/90 p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
            {statsList.map((stat, idx) => (
              <div
                key={idx}
                className={`pt-4 sm:pt-0 ${idx > 0 ? 'sm:pl-6 lg:pl-8' : ''} text-center sm:text-left`}
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#D32F2F] tracking-tight">
                  {stat.value}
                </div>
                <div className="mt-1.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 3. TOP ACHIEVERS SPOTLIGHT TIER ============ */}
      {spotlights.length > 0 && (
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#D32F2F]">
              <Sparkles size={14} /> Star Performers
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0A0A0A] tracking-tight mt-1">
              Top Rankers Spotlight
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {spotlights.map((spot, idx) => (
              <div
                key={idx}
                onClick={() =>
                  openLightbox(
                    spotlights.map((s) => ({
                      src: s.image,
                      label: `${s.name} - ${s.rank} (${s.exam})`,
                      badge: s.exam,
                      badgeColor: s.accent || '#D32F2F',
                    })),
                    idx
                  )
                }
                className="group relative rounded-3xl bg-gradient-to-b from-white to-slate-50 border-2 border-slate-200/90 hover:border-[#D32F2F] p-6 sm:p-7 transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full text-white shadow-sm"
                    style={{ backgroundColor: spot.accent || '#D32F2F' }}
                  >
                    <Medal size={13} /> {spot.badge || 'Star Performer'}
                  </span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    {spot.exam}
                  </span>
                </div>

                {/* Main Card Image Thumbnail */}
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 mb-5 flex items-center justify-center p-2">
                  <img
                    src={spot.image}
                    alt={spot.name}
                    className="w-full h-full object-contain rounded-xl transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                    <span className="bg-white/90 text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1">
                      <ZoomIn size={14} /> View Card
                    </span>
                  </div>
                </div>

                {/* Student Details */}
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#0A0A0A] tracking-tight group-hover:text-[#D32F2F] transition-colors">
                    {spot.rank}
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mt-1">
                    {spot.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    {spot.batch}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ============ 4. MAIN RESULTS GALLERY WITH FILTER CHIPS ============ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-100">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0A0A0A] tracking-tight">
              Complete Hall of Fame
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Click any poster card below to view rank card in high definition.
            </p>
          </div>

          {/* Filter Chips */}
          <div className="inline-flex items-center p-1.5 rounded-full bg-slate-100 border border-slate-200 shadow-inner">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold rounded-full transition-all duration-200 ${
                filter === 'all'
                  ? 'bg-white text-[#D32F2F] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Results ({allItems.length})
            </button>
            <button
              onClick={() => setFilter('jee')}
              className={`px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold rounded-full transition-all duration-200 ${
                filter === 'jee'
                  ? 'bg-[#D32F2F] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              IIT-JEE ({jeeItems.length})
            </button>
            <button
              onClick={() => setFilter('neet')}
              className={`px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold rounded-full transition-all duration-200 ${
                filter === 'neet'
                  ? 'bg-[#00A3FF] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              NEET Medical ({neetItems.length})
            </button>
          </div>
        </div>

        {/* Posters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayItems.map((item, idx) => (
            <div
              key={`${item.type}-${idx}`}
              onClick={() => openLightbox(displayItems, idx)}
              className="group relative rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-2 sm:p-2.5 shadow-sm hover:shadow-xl hover:border-[#D32F2F] transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col items-center justify-center aspect-[3/4]"
            >
              {/* Category Badge */}
              <div className="absolute top-3 right-3 z-10">
                <span
                  className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full text-white shadow-sm backdrop-blur-sm"
                  style={{ backgroundColor: item.badgeColor }}
                >
                  {item.badge}
                </span>
              </div>

              {/* Poster Image */}
              <img
                src={item.src}
                alt={item.label}
                className="w-full h-full object-contain rounded-xl sm:rounded-2xl bg-white select-none transition-transform duration-300 group-hover:scale-102"
                loading="lazy"
              />

              {/* Zoom Hover Overlay */}
              <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <div className="bg-white/95 text-slate-900 px-3.5 py-1.5 rounded-full font-bold text-xs shadow-lg flex items-center gap-1.5">
                  <ZoomIn size={14} /> Full View
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ 5. HIGH-CONVERSION BOTTOM CTA ============ */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24">
        <div className="relative rounded-3xl bg-gradient-to-r from-slate-950 via-[#0A0A0A] to-slate-900 text-white p-8 sm:p-14 lg:p-16 overflow-hidden shadow-2xl border border-white/10 text-center">
          {/* Ambient light glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#D32F2F]/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#00A3FF]/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#FFC107] backdrop-blur-sm mb-6">
              <Sparkles size={14} /> ADMISSIONS OPEN 2026–27
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              Ready to See Your Name on the Hall of Fame?
            </h2>

            <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Join Indore&apos;s most focused coaching batches for IIT-JEE, NEET, and Foundation. Learn from experienced faculties with structured daily doubt clearing.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/admissions"
                className="inline-flex items-center gap-2 rounded-full bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-8 py-4 text-sm font-bold transition-all duration-200 shadow-lg shadow-[#D32F2F]/30 hover:-translate-y-0.5"
              >
                Apply for Admission <ArrowRight size={16} />
              </Link>
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 text-white hover:bg-white hover:text-slate-950 px-8 py-4 text-sm font-bold transition-all duration-200 backdrop-blur-sm hover:-translate-y-0.5"
              >
                Explore Courses
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 6. INTERACTIVE FULLSCREEN LIGHTBOX ============ */}
      {lightbox.open && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 select-none transition-opacity duration-300"
          onClick={closeLightbox}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            aria-label="Close fullscreen modal"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all backdrop-blur-md border border-white/15"
          >
            <X size={24} />
          </button>

          {/* Previous Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            aria-label="Previous result"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 text-white/80 hover:text-white p-3 sm:p-4 rounded-full bg-black/40 hover:bg-black/70 transition-all backdrop-blur-md border border-white/20 shadow-xl"
          >
            <ChevronLeft size={28} />
          </button>

          {/* Fullscreen Image Card */}
          <div
            className="relative z-40 max-h-[85vh] max-w-[92vw] sm:max-w-[80vw] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              key={currentItem.src}
              src={currentItem.src}
              alt={currentItem.label || 'Result Poster'}
              className="max-h-[80vh] w-auto object-contain rounded-2xl shadow-2xl border border-white/10 bg-white"
            />
            {/* Caption & Counter */}
            <div className="mt-4 flex items-center gap-3 bg-black/60 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/15 text-xs text-white/80 font-medium">
              <span>{currentItem.label}</span>
              <span>·</span>
              <span className="text-[#FFC107] font-bold">
                {lightbox.index + 1} / {lightbox.items.length}
              </span>
            </div>
          </div>

          {/* Next Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label="Next result"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 text-white/80 hover:text-white p-3 sm:p-4 rounded-full bg-black/40 hover:bg-black/70 transition-all backdrop-blur-md border border-white/20 shadow-xl"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}
    </div>
  );
}
