import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const useScrollReveal = () => {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);
  return ref;
};

const Reveal = ({ children, className = '', delay = 0 }) => {
  const ref = useScrollReveal();
  return (
    <div ref={ref} className={`transition-all duration-1000 ease-out opacity-0 translate-y-8 ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

const jeeResults = [
  '/images/results/01.png',
  '/images/results/02.png',
  '/images/results/03.png',
  '/images/results/04.png',
  '/images/results/05.png',
  '/images/results/06.png',
  '/images/results/07.png',
  '/images/results/08.png',
  '/images/results/09.png',
  '/images/results/10.png',
  '/images/results/11.png',
  '/images/results/12.png',
  '/images/results/13.png',
  '/images/results/14.png'
];

const neetResults = [
  '/images/results/NEET_01.png',
  '/images/results/NEET_02.png',
  '/images/results/NEET_03.png',
  '/images/results/NEET_04.png',
  '/images/results/NEET_05.png',
  '/images/results/NEET_06.png',
  '/images/results/NEET_07.png',
  '/images/results/NEET_08.png'
];

const Results = () => {
  const [activeTab, setActiveTab] = useState('JEE');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const activeResults = activeTab === 'JEE' ? jeeResults : neetResults;

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const showNext = useCallback(() => {
    setLightboxIndex((prevIndex) => (prevIndex + 1) % activeResults.length);
  }, [activeResults.length]);

  const showPrev = useCallback(() => {
    setLightboxIndex((prevIndex) => (prevIndex - 1 + activeResults.length) % activeResults.length);
  }, [activeResults.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, showNext, showPrev]);

  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [lightboxOpen]);

  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* HERO SECTION */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <Reveal>
            <span className="inline-block text-[#D32F2F] bg-[#FFEBEE] rounded-full uppercase tracking-widest text-xs font-semibold px-3 py-1 mb-6">
              HALL OF FAME
            </span>
            <h1 className="font-black text-5xl sm:text-6xl md:text-7xl tracking-tighter mb-6">
              <span className="text-[#0A0A0A] block">Results That</span>
              <span className="text-[#D32F2F] block">Speak Volumes.</span>
            </h1>
            <p className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto">
              Every result below is from a verified student of Best Solution. Names, photos, and ranks are used with consent.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-slate-200">
              <div>
                <div className="text-4xl font-bold text-[#0A0A0A] mb-1">3800+</div>
                <div className="text-sm font-medium text-slate-500">Students Trained</div>
              </div>
              <div className="hidden md:block w-px h-12 bg-slate-200 mx-auto"></div>
              <div>
                <div className="text-4xl font-bold text-[#0A0A0A] mb-1">99.48</div>
                <div className="text-sm font-medium text-slate-500">Top %ile JEE 2023</div>
              </div>
              <div className="hidden md:block w-px h-12 bg-slate-200 mx-auto"></div>
              <div>
                <div className="text-4xl font-bold text-[#0A0A0A] mb-1">AIR 1833</div>
                <div className="text-sm font-medium text-slate-500">JEE Advanced 2025</div>
              </div>
              <div className="hidden md:block w-px h-12 bg-slate-200 mx-auto"></div>
              <div>
                <div className="text-4xl font-bold text-[#0A0A0A] mb-1">77%</div>
                <div className="text-sm font-medium text-slate-500">Selection Ratio 2024</div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* TABBED GRID SECTION */}
        <Reveal delay={300} className="mb-12">
          <div className="flex justify-center space-x-4 mb-10">
            <button
              onClick={() => setActiveTab('JEE')}
              className={`px-6 py-2.5 text-sm font-bold rounded-full transition-all ${
                activeTab === 'JEE' ? 'bg-[#D32F2F] text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              JEE Toppers
            </button>
            <button
              onClick={() => setActiveTab('NEET')}
              className={`px-6 py-2.5 text-sm font-bold rounded-full transition-all ${
                activeTab === 'NEET' ? 'bg-[#2E7D32] text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              NEET Toppers
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeResults.map((src, index) => (
              <Reveal key={src} delay={index * 50}>
                <div
                  onClick={() => openLightbox(index)}
                  className="rounded-2xl overflow-hidden border border-black/8 bg-white cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                >
                  <img src={src} alt={`Topper ${index + 1}`} className="w-full h-auto object-cover" />
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>

        {/* BOTTOM CTA SECTION */}
        <Reveal delay={200}>
          <div className="bg-[#0A0A0A] rounded-3xl p-10 md:p-16 text-center mt-20">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Join Our Next Batch of Toppers
            </h2>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Take the first step towards your dream college. Book a free demo class today.
            </p>
            <Link
              to="/admissions"
              className="inline-block bg-[#D32F2F] hover:bg-[#B71C1C] text-white rounded-full px-8 py-4 text-sm font-bold transition-colors"
            >
              Enroll Now
            </Link>
          </div>
        </Reveal>

      </div>

      {/* LIGHTBOX / MODAL */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300">
          <div className="absolute inset-0" onClick={closeLightbox}></div>
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-50 text-white/80 hover:text-white transition-colors p-2 bg-black/50 rounded-full"
          >
            <X className="w-8 h-8" />
          </button>
          
          <button
            onClick={(e) => { e.stopPropagation(); showPrev(); }}
            className="absolute left-4 md:left-10 z-50 text-white/80 hover:text-white transition-colors p-3 bg-black/50 hover:bg-black/80 rounded-full"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <img
            src={activeResults[lightboxIndex]}
            alt={`Fullscreen Result ${lightboxIndex + 1}`}
            className="relative z-40 max-h-[85vh] max-w-[90vw] object-contain rounded-xl shadow-2xl select-none"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => { e.stopPropagation(); showNext(); }}
            className="absolute right-4 md:right-10 z-50 text-white/80 hover:text-white transition-colors p-3 bg-black/50 hover:bg-black/80 rounded-full"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Results;
