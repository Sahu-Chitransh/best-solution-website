import React, { useEffect, useRef } from 'react';
import facultyDataJson from '../content/faculty.json';

function useScrollReveal() {
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
      observer.unobserve(el);
    };
  }, []);
  return ref;
}

// Faculty data is now imported from ../content/faculty.json

function FacultyCard({ faculty, index }) {
  const cardRef = useScrollReveal();
  
  return (
    <div 
      ref={cardRef}
      className={`opacity-0 translate-y-8 transition-all duration-1000 ease-out flex flex-col rounded-2xl overflow-hidden bg-white ${
        faculty.highlight ? 'border border-[#D32F2F]' : 'border border-black/8'
      } hover:shadow-xl transition-shadow duration-300`}
      style={{ transitionDelay: `${(index % 4) * 150}ms` }}
    >
      {/* Image Placeholder */}
      <div className={`h-56 ${faculty.bgColor} flex items-center justify-center`}>
        <span className="text-4xl font-black text-black/20 tracking-tighter">
          {faculty.initials}
        </span>
      </div>
      
      {/* Body */}
      <div className="p-5 flex flex-col flex-grow">
        <span className="uppercase text-xs font-semibold tracking-widest text-[#D32F2F] mb-2">
          {faculty.category}
        </span>
        <h3 className="text-lg font-bold text-[#0A0A0A] mb-3">
          {faculty.name}
        </h3>
        <div className="mt-auto space-y-2">
          <p className="text-sm text-slate-500 flex items-center gap-1.5">
            <span role="img" aria-label="graduation cap" className="text-base">🎓</span>
            {faculty.qualification}
          </p>
          <p className="text-sm text-slate-500 font-mono">
            {faculty.experience}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Faculty() {
  const heroRef = useScrollReveal();
  
  return (
    <div className="min-h-screen bg-white font-sans text-[#0A0A0A] pt-24 pb-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-16">
        <div 
          ref={heroRef}
          className="opacity-0 translate-y-8 transition-all duration-1000 ease-out flex flex-col items-center text-center"
        >
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-[#FFEBEE] text-[#D32F2F] text-xs font-bold uppercase tracking-widest">
            OUR FACULTY
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-4 leading-tight">
            <span className="block text-black">IITians, PhDs & mentors</span>
            <span className="block text-[#D32F2F]">who've been where you're going.</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mt-6 leading-relaxed">
            Every teacher on our floor has either cleared JEE Advanced, published research, or spent 8+ years in the trenches of competitive coaching. No freshers. No shortcuts.
          </p>
        </div>
      </section>

      {/* Faculty Grid */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(facultyDataJson.members || []).map((faculty, index) => (
            <FacultyCard key={index} faculty={faculty} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
