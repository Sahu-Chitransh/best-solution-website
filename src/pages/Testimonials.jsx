import React, { useEffect, useRef } from 'react';
import testimonialsData from '../content/testimonials.json';

// Scroll reveal hook
const useScrollReveal = () => {
  const ref = useRef(null);
  
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
        }
      },
      { threshold: 0.1 }
    );
    
    observer.observe(el);
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  return ref;
};

const Reveal = ({ children, className = '', delay = 0 }) => {
  const ref = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out opacity-0 translate-y-8 ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Testimonials = () => {
  const testimonials = testimonialsData.testimonials || [];

  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* HERO SECTION */}
        <div className="text-center flex flex-col items-center mb-16">
          <Reveal>
            <div className="inline-flex items-center justify-center">
              <span className="text-[#D32F2F] bg-[#FFEBEE] rounded-full uppercase tracking-widest text-xs font-semibold px-3 py-1 mb-6">
                WORD ON THE GROUND
              </span>
            </div>
          </Reveal>
          
          <Reveal delay={100}>
            <h1 className="font-black text-5xl sm:text-6xl md:text-7xl tracking-tighter text-black mb-2">
              Students. Parents.
            </h1>
          </Reveal>
          
          <Reveal delay={200}>
            <h1 className="font-black text-5xl sm:text-6xl md:text-7xl tracking-tighter text-[#D32F2F] mb-6">
              Real ranks.
            </h1>
          </Reveal>
          
          <Reveal delay={300}>
            <p className="text-slate-600 max-w-3xl mx-auto text-lg sm:text-xl">
              Every testimonial below is from a verifiable student of Best Solution. Names, photos and ranks are used with consent.
            </p>
          </Reveal>
        </div>

        {/* TESTIMONIAL CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={100 * (i % 4)}>
              <div className="rounded-2xl border border-black/8 bg-white p-7 hover:border-[#D32F2F] transition-colors h-full flex flex-col">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {t.image ? (
                      <div className="w-14 h-14 rounded-full overflow-hidden shrink-0">
                        <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-[#FFEBEE] flex items-center justify-center text-[#D32F2F] font-bold text-lg shrink-0">
                        {t.initials}
                      </div>
                    )}
                    <div>
                      <div className="font-bold text-[#0A0A0A]">{t.name}</div>
                      <div className="text-xs font-bold uppercase tracking-wider text-[#D32F2F] mt-0.5">
                        {t.tag}
                      </div>
                    </div>
                  </div>
                  <div className="text-4xl text-[#FFEBEE] font-serif leading-none">
                    "
                  </div>
                </div>
                
                <div className="flex gap-0.5 mt-3 text-amber-400 text-sm">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
                
                <p className="text-slate-600 text-sm leading-relaxed mt-3 flex-grow">
                  "{t.quote}"
                </p>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Testimonials;
