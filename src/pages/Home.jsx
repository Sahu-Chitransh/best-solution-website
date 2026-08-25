import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles, ArrowRight, Sprout, Compass,
  BookOpen, Stethoscope, Rocket,
  X, ChevronLeft, ChevronRight, Download,
} from 'lucide-react';
import InstagramIcon from '../components/InstagramIcon';
import SectionHeader from '../components/SectionHeader';
import EnquiryForm from '../components/EnquiryForm';
import { useScrollReveal } from '../hooks/useScrollReveal';
import heroData from '../content/hero.json';
import statsData from '../content/stats.json';
import marqueeData from '../content/marquee.json';
import brochureData from '../content/brochure.json';
import testimonialsData from '../content/testimonials.json';
import resultsData from '../content/results.json';
import instagramData from '../content/instagram.json';

/* ── Gradient presets for hero slides (placeholder until real banners) ── */
const HERO_GRADIENTS = [
  'from-[#0A0A0A] via-[#1A1A2E] to-[#16213E]',
  'from-[#1A1A2E] via-[#0F3460] to-[#0A0A0A]',
  'from-[#16213E] via-[#0A0A0A] to-[#1A1A2E]',
];

/* ── Full-Width Hero Banner Carousel ── */
function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const slides = heroData?.slides || [];
  const slideCount = slides.length || 1;

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slideCount);
    setAnimKey((k) => k + 1);
  }, [slideCount]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + slideCount) % slideCount);
    setAnimKey((k) => k + 1);
  }, [slideCount]);

  useEffect(() => {
    if (slideCount <= 1) return;
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next, slideCount]);

  const goTo = (i) => {
    setCurrent(i);
    setAnimKey((k) => k + 1);
  };

  const s = slides[current] || slides[0] || {};
  const titleLines = (s.title || []).map((t) =>
    typeof t === 'string' ? t : t.line || Object.values(t)[0] || ''
  );

  return (
    <section className="relative w-full overflow-hidden bg-[#0A0A0A]">
      {/* Background gradient (placeholder for future banner images) */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${HERO_GRADIENTS[current % HERO_GRADIENTS.length]} transition-all duration-700`}
      />

      {/* Decorative pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

      {/* Content */}
      <div className="relative min-h-[480px] sm:min-h-[520px] md:min-h-[560px] flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-32">
          <div key={animKey} className="bs-hero-animate max-w-3xl">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D32F2F]/40 bg-[#D32F2F]/15 text-[#FF8A80] px-4 py-1.5 text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
              <Sparkles size={14} aria-hidden="true" />
              {s.eyebrow}
            </div>

            {/* Title */}
            <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tighter text-white">
              {titleLines[0]}
              <br />
              <span className="text-[#D32F2F]">{titleLines[1]}</span>
            </h1>

            {/* Body */}
            <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
              {s.body}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {s.primaryCta?.href && (
                <Link
                  to={s.primaryCta.href}
                  className="inline-flex items-center gap-2 rounded-full bg-[#D32F2F] px-7 py-3.5 text-sm font-bold text-white hover:bg-[#B71C1C] hover:-translate-y-0.5 transition-all duration-200 shadow-lg shadow-[#D32F2F]/30"
                >
                  {s.primaryCta.label || 'Learn More'} <ArrowRight size={16} />
                </Link>
              )}
              {s.secondaryCta?.href && (
                <Link
                  to={s.secondaryCta.href}
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 text-white px-7 py-3.5 text-sm font-bold hover:bg-white hover:text-[#0A0A0A] transition-all duration-200 backdrop-blur-sm"
                >
                  {s.secondaryCta.label || 'Details'}
                </Link>
              )}
            </div>

            {/* Stat badge */}
            {s.stat && (
              <div className="mt-8 inline-flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl px-5 py-3">
                <div className="text-2xl sm:text-3xl font-black text-[#D32F2F] leading-none">
                  {s.stat.value}
                </div>
                <div className="text-xs uppercase tracking-widest text-slate-300 max-w-[180px]">
                  {s.stat.label}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prev}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all backdrop-blur-sm border border-white/10"
          aria-label="Previous slide"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={next}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all backdrop-blur-sm border border-white/10"
          aria-label="Next slide"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5">
        {heroData.slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? 'w-8 h-2.5 bg-[#D32F2F]'
                : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </section>
  );
}

/* ── Marquee ── */
function Marquee() {
  const items = (marqueeData.items || []).map((item) =>
    typeof item === 'string' ? item : item.item || Object.values(item)[0] || ''
  );
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

/* ── Select Your Goal ── */
const GOAL_CATEGORIES = [
  {
    icon: Sprout,
    title: 'Nurture',
    subtitle: 'Class 6–8',
    description: 'Building strong roots and curiosity from an early age',
    color: '#2E7D32',
    bgClass: 'bg-green-50 border-green-200 hover:border-green-400',
    iconClass: 'text-green-600',
  },
  {
    icon: Compass,
    title: 'Pioneer',
    subtitle: 'Class 9–10',
    description: 'Sharpening competitive instincts ahead of the curve',
    color: '#AD1457',
    bgClass: 'bg-pink-50 border-pink-200 hover:border-pink-400',
    iconClass: 'text-pink-600',
  },
  {
    icon: Rocket,
    title: 'Booster',
    subtitle: 'Class 11–12',
    description: 'School-oriented prep with board exam mastery',
    color: '#F9A825',
    bgClass: 'bg-amber-50 border-amber-200 hover:border-amber-400',
    iconClass: 'text-amber-600',
  },
  {
    icon: Stethoscope,
    title: 'Medical Explorer',
    subtitle: 'NEET · CUET',
    description: 'Your journey to the white coat starts here',
    color: '#D32F2F',
    bgClass: 'bg-red-50 border-red-200 hover:border-red-400',
    iconClass: 'text-red-600',
  },
  {
    icon: BookOpen,
    title: 'Engineering Explorer',
    subtitle: 'IIT-JEE · BIT-SAT',
    description: 'Solving problems others are afraid to face',
    color: '#E65100',
    bgClass: 'bg-orange-50 border-orange-200 hover:border-orange-400',
    iconClass: 'text-orange-600',
  },
];

function GoalSelector() {
  const ref = useScrollReveal();
  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center" data-animate>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#0A0A0A]">
            Select your goal
          </h2>
          <p className="mt-3 text-xl sm:text-2xl font-bold text-[#D32F2F]">
            to explore our courses
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {GOAL_CATEGORIES.map((goal, i) => {
            const Icon = goal.icon;
            return (
              <Link
                key={i}
                to="/courses"
                className={`group relative rounded-2xl sm:rounded-3xl border-2 ${goal.bgClass} p-5 sm:p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg bs-animate-hidden bs-stagger-${i + 1}`}
                data-animate
              >
                {/* Icon */}
                <div className="mx-auto w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${goal.color}12` }}
                >
                  <Icon size={26} className={goal.iconClass} strokeWidth={2} />
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-black text-[#0A0A0A] tracking-tight leading-tight">
                  {goal.title}
                </h3>
                <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-slate-500 mt-1">
                  {goal.subtitle}
                </div>

                {/* Description */}
                <p className="mt-2 text-xs text-slate-500 leading-relaxed hidden sm:block">
                  {goal.description}
                </p>

                {/* Arrow */}
                <div className="mt-3 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: goal.color }}
                >
                  Explore <ArrowRight size={14} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
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
        {(statsData?.stats || []).map((s, i) => (
          <div key={i} className={`p-6 md:p-8 bs-animate-hidden bs-stagger-${(i % 6) + 1}`} data-animate>
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

/* ── Results Gallery ── */
function ResultsGallery() {
  const ref = useScrollReveal();
  const [activeTab, setActiveTab] = useState('jee');
  const [lightbox, setLightbox] = useState({ open: false, idx: 0 });

  const rawImages = activeTab === 'jee' ? resultsData.jee : resultsData.neet;
  const images = (rawImages || []).map((img) =>
    typeof img === 'string' ? img : img.image || Object.values(img)[0] || ''
  );

  const openLightbox = (idx) => setLightbox({ open: true, idx });
  const closeLightbox = () => setLightbox({ open: false, idx: 0 });
  const prevImage = () => setLightbox((s) => ({ ...s, idx: (s.idx - 1 + images.length) % images.length }));
  const nextImage = () => setLightbox((s) => ({ ...s, idx: (s.idx + 1) % images.length }));

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setLightbox({ open: false, idx: 0 });
  };

  // Lock body scroll when lightbox is open
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

  // Keyboard navigation
  useEffect(() => {
    if (!lightbox.open || images.length === 0) return;

    const handler = (e) => {
      if (e.key === 'Escape') setLightbox({ open: false, idx: 0 });
      if (e.key === 'ArrowLeft') setLightbox((s) => ({ ...s, idx: (s.idx - 1 + images.length) % images.length }));
      if (e.key === 'ArrowRight') setLightbox((s) => ({ ...s, idx: (s.idx + 1) % images.length }));
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox.open, images.length]);

  const currentLightboxImg = images[lightbox.idx] || images[0] || '';

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
            onClick={() => handleTabChange('jee')}
            className={`bs-tab px-5 py-3 text-sm font-bold uppercase tracking-widest transition-colors ${
              activeTab === 'jee'
                ? 'text-[#D32F2F] bs-tab-active'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            JEE Results ({resultsData.jee?.length || 0})
          </button>
          <button
            onClick={() => handleTabChange('neet')}
            className={`bs-tab px-5 py-3 text-sm font-bold uppercase tracking-widest transition-colors ${
              activeTab === 'neet'
                ? 'text-[#D32F2F] bs-tab-active'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            NEET Results ({resultsData.neet?.length || 0})
          </button>
        </div>

        {/* Grid */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((src, i) => (
            <div
              key={`${activeTab}-${i}`}
              className="bs-gallery-img rounded-2xl overflow-hidden border border-slate-200/80 bg-white shadow-sm hover:shadow-md flex items-center justify-center p-1.5 aspect-[3/4] transition-all duration-300"
              onClick={() => openLightbox(i)}
            >
              <img
                alt={`${activeTab.toUpperCase()} result ${i + 1}`}
                className="w-full h-full object-contain rounded-xl bg-white select-none"
                src={src}
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Link to full results page */}
        <div className="mt-12 text-center">
          <Link
            to="/results"
            className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white text-[#0A0A0A] hover:border-[#D32F2F] hover:text-[#D32F2F] px-7 py-3.5 text-sm font-bold shadow-sm transition-all duration-200"
          >
            View full Hall of Fame & Toppers <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox.open && (
        <div
          className="bs-lightbox fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>
          <button
            className="absolute left-4 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            aria-label="Previous image"
          >
            <ChevronLeft size={28} />
          </button>
          <img
            key={`${activeTab}-${lightbox.idx}`}
            src={currentLightboxImg}
            alt={`${activeTab.toUpperCase()} result ${lightbox.idx + 1}`}
            className="bs-lightbox-img max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute right-4 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            aria-label="Next image"
          >
            <ChevronRight size={28} />
          </button>
          <div className="absolute bottom-6 text-white/60 text-sm font-semibold tracking-widest">
            {lightbox.idx + 1} / {images.length}
          </div>
        </div>
      )}
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
          {(testimonialsData?.testimonials || []).map((t, i) => (
            <div
              key={i}
              className={`rounded-3xl bg-white/5 border border-white/10 p-7 hover:border-[#D32F2F] transition-colors bs-animate-hidden bs-stagger-${(i % 6) + 1}`}
              data-animate
            >
              <div className="flex items-center gap-4">
                {t.image ? (
                  <img
                    alt={t.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-[#D32F2F]"
                    src={t.image}
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-[#D32F2F] flex items-center justify-center text-white font-bold text-lg border-2 border-[#D32F2F]">
                    {t.initials}
                  </div>
                )}
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

/* ── Instagram Section ── */
function InstagramSection() {
  const ref = useScrollReveal();
  const getPostImage = (post) => post.image || post.fetchedImage || '';
  const getPostCaption = (post) => post.caption || post.fetchedCaption || '';
  const featuredPosts = (instagramData?.posts || [])
    .filter(p => p.featured)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  return (
    <section className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <SectionHeader
            eyebrow="Life at Best Solution"
            title={instagramData?.sectionTitle || "Follow Our Journey"}
            description="A glimpse into daily life, achievements, and celebrations at our coaching center."
          />
          {instagramData?.profileUrl && (
            <a
              href={instagramData.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] px-5 py-2.5 text-sm font-bold text-white hover:opacity-90 transition-opacity whitespace-nowrap self-start"
            >
              <InstagramIcon size={16} />
              {instagramData?.handle || 'Instagram'}
            </a>
          )}
        </div>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 gap-4">
          {featuredPosts.map((post, i) => (
            <a
              key={i}
              href={post.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative rounded-2xl overflow-hidden border border-black/10 aspect-square bg-slate-100 bs-animate-hidden bs-stagger-${Math.min(i + 1, 6)}`}
              data-animate
            >
              {getPostImage(post) ? (
                <>
                  <img
                    src={getPostImage(post)}
                    alt={getPostCaption(post)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <p className="text-white text-sm font-medium line-clamp-2">{getPostCaption(post)}</p>
                    <div className="flex items-center gap-1.5 mt-2 text-white/80 text-xs">
                      <InstagramIcon size={14} />
                      <span>View on Instagram</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-100 via-pink-50 to-orange-50 flex flex-col items-center justify-center gap-2">
                  <InstagramIcon size={28} className="text-pink-400" />
                  <span className="text-xs text-gray-500 font-medium">View on Instagram</span>
                </div>
              )}
            </a>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 rounded-full border border-black/15 hover:bg-[#0A0A0A] hover:text-white px-6 py-3 text-sm font-bold transition-colors"
          >
            View all posts <ArrowRight size={16} />
          </Link>
        </div>
      </div>
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
            {brochureData.sessionLabel}
          </span>
          <h2 className="mt-6 text-4xl sm:text-5xl font-black tracking-tighter text-white">
            Our Latest{' '}
            <span className="text-[#D32F2F]">Brochure</span>
          </h2>
          <p className="mt-5 text-slate-400 leading-relaxed max-w-lg">
            {brochureData.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={brochureData.image}
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
              src={brochureData.image}
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
      <GoalSelector />
      <StatsSection />
      <ResultsGallery />
      <TestimonialsSection />
      <InstagramSection />
      <PamphletBanner />
      <CtaSection />
    </div>
  );
}
