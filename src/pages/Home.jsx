import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles, ArrowRight, Trophy, Users, Target,
  ClipboardCheck, Award, Presentation, BookOpen,
  House, Bus, Coffee, Utensils, X, ChevronLeft, ChevronRight, Download,
} from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import EnquiryForm from '../components/EnquiryForm';
import { useScrollReveal } from '../hooks/useScrollReveal';
import {
  HERO_SLIDES, STATS, MARQUEE_ITEMS, WHY_US,
  COURSES, FACILITIES, TESTIMONIALS,
  JEE_RESULTS, NEET_RESULTS, PAMPHLET_IMAGE,
} from '../data/site';

/* ── Icon map ── */
const ICONS = {
  Trophy, Users, Target, ClipboardCheck, Award, Sparkles,
  Presentation, BookOpen, House, Bus, Coffee, Utensils,
};

/* ── Hero Slider ── */
function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % HERO_SLIDES.length);
    setAnimKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  const goTo = (i) => {
    setCurrent(i);
    setAnimKey((k) => k + 1);
  };

  const s = HERO_SLIDES[current];

  return (
    <section className="relative overflow-hidden bg-white bs-grid-bg">
      {/* Decorative blurs */}
      <div className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-[#FFEBEE] blur-3xl opacity-70 pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-[380px] h-[380px] rounded-full bg-[#FFC107]/20 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-24 md:pb-28 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Text side */}
        <div className="lg:col-span-7 relative z-10">
          <div key={animKey} className="bs-hero-animate">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D32F2F]/20 bg-[#FFEBEE] text-[#B71C1C] px-3 py-1 text-xs font-semibold uppercase tracking-widest">
              <Sparkles size={14} aria-hidden="true" />
              {s.eyebrow}
            </div>

            {/* Title */}
            <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tighter">
              {s.title[0]}
              <br />
              <span className="text-[#D32F2F]">{s.title[1]}</span>
            </h1>

            {/* Body */}
            <p className="mt-6 text-lg text-slate-600 max-w-xl leading-relaxed">
              {s.body}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to={s.primaryCta.href}
                className="inline-flex items-center gap-2 rounded-full bg-[#D32F2F] px-6 py-3.5 text-sm font-bold text-white hover:bg-[#B71C1C] hover:-translate-y-0.5 transition-[transform,background-color] duration-200 shadow-sm"
              >
                {s.primaryCta.label} <ArrowRight size={16} />
              </Link>
              <Link
                to={s.secondaryCta.href}
                className="inline-flex items-center gap-2 rounded-full border border-[#0A0A0A] text-[#0A0A0A] px-6 py-3.5 text-sm font-bold hover:bg-[#0A0A0A] hover:text-white transition-colors"
              >
                {s.secondaryCta.label}
              </Link>
            </div>
          </div>

          {/* Dots */}
          <div className="mt-10 flex items-center gap-4">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? 'w-10 bg-[#D32F2F]'
                    : 'w-6 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
            <span className="ml-2 text-xs font-semibold text-slate-500 uppercase tracking-widest">
              {String(current + 1).padStart(2, '0')} / {String(HERO_SLIDES.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Image side */}
        <div className="lg:col-span-5 relative">
          <div key={`img-${animKey}`} className="relative bs-hero-image-animate">
            <div className="absolute -inset-4 rounded-3xl bg-[#0A0A0A] -rotate-2" />
            <img
              alt=""
              className="relative rounded-3xl w-full aspect-[4/5] object-cover object-top border-4 border-white shadow-xl"
              src={s.image}
            />
            <div className="absolute -bottom-6 -left-6 bg-white border border-black/10 rounded-2xl shadow-lg px-5 py-4">
              <div className="text-2xl font-black text-[#D32F2F] leading-none">
                {s.stat.value}
              </div>
              <div className="text-[11px] uppercase tracking-widest text-slate-500 mt-1">
                {s.stat.label}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Marquee ── */
function Marquee() {
  const items = MARQUEE_ITEMS;
  return (
    <div className="border-y border-black/10 bg-[#0A0A0A] text-white overflow-hidden">
      <div className="bs-marquee-track py-4 whitespace-nowrap">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center gap-14 pr-14 text-sm font-semibold uppercase tracking-widest">
            {items.map((item, i) => (
              <span key={`${copy}-${i}`} className="flex items-center gap-14">
                <span>{item}</span>
                <span className="text-[#D32F2F]">•</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Stats ── */
function StatsSection() {
  const ref = useScrollReveal();
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24" ref={ref}>
      <SectionHeader
        eyebrow="Numbers that don't lie"
        title="Track record forged in Indore, felt across India."
        description="Every number here is a real student — with a real rank and a real family who believed in the process."
      />
      <div className="mt-14 grid grid-cols-2 md:grid-cols-4 divide-x divide-black/10 border-y border-black/10">
        {STATS.map((s, i) => (
          <div key={i} className={`p-6 md:p-8 bs-animate-hidden bs-stagger-${i + 1}`} data-animate>
            <div className="text-4xl md:text-5xl font-black text-[#D32F2F] tracking-tight">
              {s.value}
            </div>
            <div className="mt-2 text-xs sm:text-sm uppercase tracking-widest text-slate-500">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Why Best Solution ── */
function WhySection() {
  const ref = useScrollReveal();
  return (
    <section className="bg-[#F9FAFB] border-y border-black/5" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <SectionHeader
            eyebrow="Why Best Solution"
            title="Rigour is a system. Not a mood."
            description="Every student gets a personal mentor, weekly test cycles, and a curriculum designed around Advanced-level problem-solving from Day 1."
          />
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-full bg-[#0A0A0A] text-white px-5 py-3 text-sm font-bold hover:bg-[#D32F2F] transition-colors"
            >
              Our Story <ArrowRight size={16} />
            </Link>
            <Link
              to="/faculty"
              className="inline-flex items-center gap-2 rounded-full border border-[#0A0A0A] text-[#0A0A0A] px-5 py-3 text-sm font-bold hover:bg-[#0A0A0A] hover:text-white transition-colors"
            >
              Meet Faculty
            </Link>
          </div>
        </div>
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {WHY_US.map((c, i) => {
            const Icon = ICONS[c.icon];
            return (
              <div
                key={i}
                className={`rounded-2xl bg-white border border-black/10 p-5 hover:border-[#D32F2F] transition-colors bs-animate-hidden bs-stagger-${i + 1}`}
                data-animate
              >
                {Icon && <Icon size={22} strokeWidth={2.4} className="text-[#D32F2F]" />}
                <div className="mt-4 font-bold text-[#0A0A0A]">{c.t}</div>
                <div className="mt-1 text-sm text-slate-600 leading-relaxed">{c.d}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Programs ── */
const COL_SPAN = { 4: 'md:col-span-4', 8: 'md:col-span-8' };

function ProgramsSection() {
  const ref = useScrollReveal();
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24" ref={ref}>
      <SectionHeader
        eyebrow="Programs"
        title="Pick your track. We'll build the ladder."
      />
      <div className="mt-14 grid grid-cols-1 md:grid-cols-12 gap-5">
        {COURSES.map((c, i) => (
          <div
            key={i}
            className={`${COL_SPAN[c.span]} group relative rounded-3xl border border-black/10 bg-white overflow-hidden p-7 md:p-9 hover:-translate-y-1 hover:border-[#D32F2F] transition-[transform,border-color] duration-300 bs-animate-hidden bs-stagger-${i + 1}`}
            data-animate
          >
            {/* Decorative circle */}
            <div
              className="absolute -top-16 -right-16 w-56 h-56 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"
              style={{ background: c.color }}
            />
            <div className="relative">
              <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                {c.grade}
              </div>
              <h3 className={`mt-3 font-black tracking-tight text-[#0A0A0A] ${
                c.span === 8 ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'
              }`}>
                {c.title}
              </h3>
              <p className="mt-3 text-slate-600">{c.tagline}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {c.subjects.map((sub) => (
                  <span
                    key={sub}
                    className="text-xs font-semibold uppercase tracking-widest bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full"
                  >
                    {sub}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm font-bold text-[#D32F2F]">{c.price}</div>
                <Link
                  to="/courses"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0A0A0A] group-hover:text-[#D32F2F] transition-colors"
                >
                  Details <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Facilities ── */
function FacilitiesSection() {
  const ref = useScrollReveal();
  return (
    <section className="relative py-24 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
        <div data-animate className="bs-animate-hidden">
          <div className="rounded-3xl overflow-hidden border border-black/10">
            <img
              alt="Best Solution classroom"
              className="w-full h-full object-cover"
              src="/images/classroom.png"
            />
          </div>
        </div>
        <div data-animate className="bs-animate-hidden bs-stagger-2">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#D32F2F] bg-[#FFEBEE] px-3 py-1 rounded-full">
            On the ground in Indore
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-black tracking-tighter">
            A classroom built for{' '}
            <span className="text-[#D32F2F]">deep work.</span>
          </h2>
          <p className="mt-5 text-slate-600 leading-relaxed">
            Fixed seating, dedicated study bays, quiet zones and a full computer lab. Distraction is designed out — focus is designed in.
          </p>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {FACILITIES.map((f, i) => {
              const Icon = ICONS[f.icon];
              return (
                <div key={i} className="flex items-center gap-2 text-sm text-slate-700">
                  {Icon && <Icon size={16} className="text-[#D32F2F]" />}
                  {f.t}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Testimonials ── */
function TestimonialsSection() {
  const ref = useScrollReveal();
  return (
    <section className="bg-[#0A0A0A] text-white py-24" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Real students · Real ranks"
          title="Voices from our teaching floor."
          dark
        />
        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className={`rounded-3xl bg-white/5 border border-white/10 p-7 hover:border-[#D32F2F] transition-colors bs-animate-hidden bs-stagger-${i + 1}`}
              data-animate
            >
              <div className="flex items-center gap-4">
                <img
                  alt={t.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#D32F2F]"
                  src={t.image}
                />
                <div>
                  <div className="font-bold">{t.name}</div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-[#FFC107]">
                    {t.tag}
                  </div>
                </div>
              </div>
              <p className="mt-6 text-slate-200 leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/testimonials"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 hover:bg-white hover:text-[#0A0A0A] px-6 py-3 text-sm font-bold transition-colors"
          >
            See all testimonials <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Results Gallery ── */
function ResultsGallery() {
  const ref = useScrollReveal();
  const [activeTab, setActiveTab] = useState('jee');
  const [lightbox, setLightbox] = useState({ open: false, idx: 0 });

  const images = activeTab === 'jee' ? JEE_RESULTS : NEET_RESULTS;

  const openLightbox = (idx) => setLightbox({ open: true, idx });
  const closeLightbox = () => setLightbox({ open: false, idx: 0 });
  const prevImage = () => setLightbox((s) => ({ ...s, idx: (s.idx - 1 + images.length) % images.length }));
  const nextImage = () => setLightbox((s) => ({ ...s, idx: (s.idx + 1) % images.length }));

  // Keyboard navigation
  useEffect(() => {
    if (!lightbox.open) return;
    const handler = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  return (
    <section className="bg-[#FAFAFA] border-y border-black/5 py-24" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Our Results"
          title="Results that speak louder than promises."
          description="Year after year, Best Solution students crack the toughest exams in India. Browse our JEE and NEET results below."
        />

        {/* Tabs */}
        <div className="mt-10 flex items-center gap-1 border-b border-black/10 pb-0">
          <button
            onClick={() => setActiveTab('jee')}
            className={`bs-tab px-5 py-3 text-sm font-bold uppercase tracking-widest transition-colors ${
              activeTab === 'jee'
                ? 'text-[#D32F2F] bs-tab-active'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            JEE Results
          </button>
          <button
            onClick={() => setActiveTab('neet')}
            className={`bs-tab px-5 py-3 text-sm font-bold uppercase tracking-widest transition-colors ${
              activeTab === 'neet'
                ? 'text-[#D32F2F] bs-tab-active'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            NEET Results
          </button>
        </div>

        {/* Grid */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((src, i) => (
            <div
              key={`${activeTab}-${i}`}
              className={`bs-gallery-img rounded-2xl overflow-hidden border border-slate-200/80 bg-white shadow-sm hover:shadow-md flex items-center justify-center p-1.5 aspect-[3/4] bs-animate-hidden bs-stagger-${Math.min(i % 6 + 1, 6)}`}
              data-animate
              onClick={() => openLightbox(i)}
            >
              <img
                alt={`${activeTab.toUpperCase()} result ${i + 1}`}
                className="w-full h-full object-contain rounded-xl bg-white"
                src={src}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox.open && (
        <div
          className="bs-lightbox fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>

          {/* Prev */}
          <button
            className="absolute left-4 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            aria-label="Previous image"
          >
            <ChevronLeft size={28} />
          </button>

          {/* Image */}
          <img
            key={lightbox.idx}
            src={images[lightbox.idx]}
            alt={`${activeTab.toUpperCase()} result ${lightbox.idx + 1}`}
            className="bs-lightbox-img max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next */}
          <button
            className="absolute right-4 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            aria-label="Next image"
          >
            <ChevronRight size={28} />
          </button>

          {/* Counter */}
          <div className="absolute bottom-6 text-white/60 text-sm font-semibold tracking-widest">
            {lightbox.idx + 1} / {images.length}
          </div>
        </div>
      )}
    </section>
  );
}

/* ── Pamphlet Banner ── */
function PamphletBanner() {
  const ref = useScrollReveal();
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0A0A0A] via-[#1A1A1A] to-[#0A0A0A] py-24" ref={ref}>
      {/* Decorative blurs */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#D32F2F]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[#FFC107]/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div data-animate className="bs-animate-hidden">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#D32F2F]/30 bg-[#D32F2F]/10 text-[#FF6659] px-3 py-1 text-xs font-semibold uppercase tracking-widest">
            <Sparkles size={14} />
            New · July 2026
          </span>
          <h2 className="mt-6 text-4xl sm:text-5xl font-black tracking-tighter text-white">
            Our Latest{' '}
            <span className="text-[#D32F2F]">Brochure</span>
          </h2>
          <p className="mt-5 text-slate-400 leading-relaxed max-w-lg">
            Everything you need to know — courses, fees, timetable, scholarships, and admission process — in one beautifully designed pamphlet.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={PAMPHLET_IMAGE}
              download
              className="inline-flex items-center gap-2 rounded-full bg-[#D32F2F] px-6 py-3.5 text-sm font-bold text-white hover:bg-[#B71C1C] hover:-translate-y-0.5 transition-[transform,background-color] duration-200 shadow-sm"
            >
              <Download size={16} />
              Download Brochure
            </a>
            <Link
              to="/admissions"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 text-white px-6 py-3.5 text-sm font-bold hover:bg-white hover:text-[#0A0A0A] transition-colors"
            >
              Apply Now <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Pamphlet Image */}
        <div data-animate className="bs-animate-hidden bs-stagger-2 flex justify-center">
          <div className="bs-pamphlet-glow rounded-2xl overflow-hidden border border-white/10 max-w-sm">
            <img
              alt="Best Solution July 2026 Brochure"
              className="w-full object-cover"
              src={PAMPHLET_IMAGE}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── CTA / Enquiry ── */
function CtaSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-12 items-start">
      <div>
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#D32F2F] bg-[#FFEBEE] px-3 py-1 rounded-full">
          Admissions open · 2026-27
        </span>
        <h2 className="mt-4 text-5xl font-black tracking-tighter">
          Ready to start?
          <br />
          <span className="text-[#D32F2F]">Book a free demo.</span>
        </h2>
        <p className="mt-5 text-slate-600 max-w-md leading-relaxed">
          Come sit in on a live class. Meet a faculty member. Take a 20-min diagnostic. If it&apos;s not for you — walk away, no questions asked.
        </p>
      </div>
      <EnquiryForm />
    </section>
  );
}

/* ── Home Page ── */
export default function Home() {
  return (
    <div>
      <HeroSlider />
      <Marquee />
      <StatsSection />
      <ResultsGallery />
      <WhySection />
      <ProgramsSection />
      <FacilitiesSection />
      <TestimonialsSection />
      <PamphletBanner />
      <CtaSection />
    </div>
  );
}
