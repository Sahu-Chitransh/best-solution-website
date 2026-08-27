import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles, ArrowRight,
  X, ChevronLeft, ChevronRight, Download,
} from 'lucide-react';
import { DoctorIllustration, EngineerIllustration, RocketIllustration } from '../components/GoalIllustrations';
import coursesData from '../content/courses.json';
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

/* ── Full-Width Hero Banner Carousel ── */
function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const slides = heroData?.slides || [];
  const slideCount = slides.length || 1;
  const autoplayInterval = heroData?.autoplayInterval || 5000;

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slideCount);
  }, [slideCount]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + slideCount) % slideCount);
  }, [slideCount]);

  useEffect(() => {
    if (slideCount <= 1 || isPaused) return;
    const id = setInterval(next, autoplayInterval);
    return () => clearInterval(id);
  }, [next, slideCount, isPaused, autoplayInterval]);

  const goTo = (i) => {
    setCurrent(i);
  };

  // Touch swipe handlers
  const onTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      next(); // swipe left
    } else if (diff < -50) {
      prev(); // swipe right
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-white select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      aria-roledescription="carousel"
      aria-label="Campus Brochure Highlights"
    >
      {/* Slides Container */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[16/8] lg:aspect-[21/9] max-h-[640px] flex items-center justify-center bg-white">
        {slides.map((slide, idx) => {
          const isActive = idx === current;
          return (
            <div
              key={slide.id || idx}
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
              aria-hidden={!isActive}
            >
              <img
                src={slide.image}
                alt={slide.alt || `Best Solution Banner ${idx + 1}`}
                className="w-full h-full object-cover sm:object-contain object-center"
                loading={idx === 0 ? 'eager' : 'lazy'}
              />
            </div>
          );
        })}
      </div>

      {/* Navigation arrows */}
      {slideCount > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/90 hover:bg-white text-slate-800 hover:text-[#D32F2F] transition-all backdrop-blur-md border border-slate-200 shadow-md"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={next}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/90 hover:bg-white text-slate-800 hover:text-[#D32F2F] transition-all backdrop-blur-md border border-slate-200 shadow-md"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Slide Indicator Dots */}
      {slideCount > 1 && (
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 sm:gap-2.5 bg-black/25 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/20 shadow-sm">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-7 sm:w-8 h-2 sm:h-2.5 bg-[#D32F2F] shadow-sm'
                  : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/70 hover:bg-white'
              }`}
            />
          ))}
        </div>
      )}
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
const GOAL_ILLUSTRATIONS = {
  doctor: DoctorIllustration,
  engineer: EngineerIllustration,
  foundation: RocketIllustration,
};

function GoalSelector() {
  const ref = useScrollReveal();
  const goals = coursesData?.goals || [];

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center" data-animate>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#0A0A0A]">
            {coursesData.heading || 'Select your goal'}
          </h2>
          <p className="mt-3 text-xl sm:text-2xl font-bold text-[#D32F2F]">
            {coursesData.subheading || 'to explore our courses'}
          </p>
        </div>

        <div className="mt-14 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {goals.map((goal, i) => {
            const IllustrationComp = GOAL_ILLUSTRATIONS[goal.id] || RocketIllustration;
            return (
              <Link
                key={goal.id}
                to={`/courses?goal=${goal.id}`}
                className={`group relative flex flex-col items-center justify-between rounded-3xl bg-white p-6 sm:p-7 transition-all duration-300 text-center border border-slate-200/90 hover:border-slate-300 hover:shadow-lg hover:-translate-y-1 shadow-sm bs-animate-hidden bs-stagger-${i + 1}`}
                data-animate
              >
                {/* Illustration */}
                <div className="w-full flex justify-center mb-5">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 transform transition-transform duration-300 group-hover:scale-105">
                    <IllustrationComp className="w-full h-full" />
                  </div>
                </div>

                {/* Title */}
                <div className="mt-auto">
                  <h3 className="text-xl sm:text-2xl font-black text-[#0A0A0A] tracking-tight group-hover:text-[#00A3FF] transition-colors">
                    {goal.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
                    {goal.subtitle}
                  </p>
                </div>

                {/* Hover Arrow */}
                <div className="mt-3 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-[#00A3FF] opacity-0 group-hover:opacity-100 transition-opacity">
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

/* ── Results Moving Marquee ── */
function ResultsGallery() {
  const ref = useScrollReveal();
  const [activeTab, setActiveTab] = useState('jee');

  const rawImages = activeTab === 'jee' ? resultsData.jee : resultsData.neet;
  const images = (rawImages || []).map((img) =>
    typeof img === 'string' ? img : img.image || Object.values(img)[0] || ''
  );

  // Duplicate images to create a seamless infinite marquee loop
  const marqueeImages = [...images, ...images];

  return (
    <section className="bg-[#FAFAFA] border-y border-black/5 py-24 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Our Results"
          title="Results that speak louder than promises."
          description="Year after year, Best Solution students crack the toughest exams in India. Browse our top JEE and NEET achievers below."
        />

        {/* Tabs */}
        <div className="mt-10 flex items-center justify-center sm:justify-start gap-2 border-b border-black/10 pb-0">
          <button
            onClick={() => setActiveTab('jee')}
            className={`bs-tab px-6 py-3 text-sm font-bold uppercase tracking-widest transition-colors ${
              activeTab === 'jee'
                ? 'text-[#D32F2F] bs-tab-active'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            JEE Achievers ({resultsData.jee?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('neet')}
            className={`bs-tab px-6 py-3 text-sm font-bold uppercase tracking-widest transition-colors ${
              activeTab === 'neet'
                ? 'text-[#D32F2F] bs-tab-active'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            NEET Achievers ({resultsData.neet?.length || 0})
          </button>
        </div>
      </div>

      {/* Horizontal Moving Marquee Ribbon */}
      <div className="relative mt-10 w-full overflow-hidden">
        {/* Soft edge gradient fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-36 bg-gradient-to-r from-[#FAFAFA] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-36 bg-gradient-to-l from-[#FAFAFA] to-transparent z-10" />

        <div
          key={activeTab}
          className="bs-marquee-track flex gap-5 py-4 select-none hover:[animation-play-state:paused]"
          style={{ animationDuration: activeTab === 'jee' ? '40s' : '28s' }}
        >
          {marqueeImages.map((src, idx) => (
            <Link
              key={`${activeTab}-${idx}`}
              to="/results"
              className="flex-shrink-0 w-48 sm:w-56 md:w-64 aspect-[3/4] rounded-2xl overflow-hidden border border-slate-200/90 bg-white p-2 shadow-sm hover:shadow-xl hover:border-[#D32F2F] hover:-translate-y-1.5 transition-all duration-300 group flex items-center justify-center"
              aria-label={`View ${activeTab.toUpperCase()} result card`}
            >
              <img
                src={src}
                alt={`${activeTab.toUpperCase()} Achiever`}
                className="w-full h-full object-contain rounded-xl bg-white select-none transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Link to full results page */}
      <div className="mt-12 text-center px-4">
        <Link
          to="/results"
          className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white text-[#0A0A0A] hover:border-[#D32F2F] hover:text-[#D32F2F] px-8 py-3.5 text-sm font-bold shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
        >
          View Full Hall of Fame & All Results <ArrowRight size={16} />
        </Link>
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
