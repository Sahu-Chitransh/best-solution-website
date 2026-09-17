import React, { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, HelpCircle, ChevronRight } from 'lucide-react';
import coursesData from '../content/courses.json';
import GoalCard from '../components/GoalCard';
import ProgramCard from '../components/ProgramCard';

/* ── Scroll reveal hook ── */
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

export default function Courses() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawGoalParam = (searchParams.get('goal') || '').toLowerCase();
  
  // Normalize alias (e.g. '6-10th' or 'junior' maps to 'foundation', 'medical' maps to 'doctor', 'jee' maps to 'engineer')
  const normalizeGoal = (param) => {
    if (!param) return null;
    if (param === 'doctor' || param === 'medical' || param === 'neet') return 'doctor';
    if (param === 'engineer' || param === 'engineering' || param === 'jee' || param === 'iit-jee') return 'engineer';
    if (param === 'foundation' || param === '6-10th' || param === '6-10' || param === 'junior' || param === 'olympiad') return 'foundation';
    return null;
  };

  const initialGoal = normalizeGoal(rawGoalParam);
  const [selectedGoal, setSelectedGoal] = useState(initialGoal);
  const coursesRef = useRef(null);
  const wrapRef = useScrollReveal();

  const goals = coursesData?.goals || [];

  // Update selection if URL search param changes
  useEffect(() => {
    const nextGoal = normalizeGoal(rawGoalParam);
    setSelectedGoal((prev) => (nextGoal !== prev ? nextGoal : prev));
  }, [rawGoalParam]);

  const handleGoalSelect = (goalId) => {
    setSelectedGoal(goalId);
    setSearchParams({ goal: goalId });
    setTimeout(() => {
      if (coursesRef.current) {
        coursesRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const activeGoalData = goals.find((g) => g.id === selectedGoal);

  return (
    <div ref={wrapRef} className="bg-white min-h-screen">
      {/* ============ HERO & GOAL SELECTOR ============ */}
      <section className="pt-16 md:pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-lg sm:text-2xl font-black tracking-widest text-slate-500 uppercase">
            {coursesData.heading || 'YOUR DREAM.'}
          </p>
          <h1 className="mt-1 text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#0A1B39] uppercase">
            {coursesData.subheading || 'OUR GUIDANCE.'}
          </h1>
          <div className="mt-3.5 flex items-center justify-center gap-3">
            <span className="w-8 sm:w-16 h-px bg-slate-200"></span>
            <p className="text-sm sm:text-base font-semibold text-slate-500">
              {coursesData.tagline || 'Choose your path to success'}
            </p>
            <span className="w-8 sm:w-16 h-px bg-slate-200"></span>
          </div>
        </div>

        {/* 3 Goal Cards Row */}
        <div className="mt-12 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {goals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              isSelected={selectedGoal === goal.id}
              onClick={() => handleGoalSelect(goal.id)}
            />
          ))}
        </div>
      </section>

      {/* ============ PROGRAMS SECTION ============ */}
      <section ref={coursesRef} className="pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-20">
        {activeGoalData ? (
          /* When a goal is selected */
          <div className="space-y-10">
            {/* Active Track Header (Matching Mockup Style) */}
            <div className="relative text-center py-6 px-4">
              {/* Watermark illustration in background */}
              {selectedGoal === 'doctor' && (
                <div className="absolute right-0 sm:right-6 -top-4 w-32 sm:w-44 h-auto opacity-70 pointer-events-none select-none hidden sm:block">
                  <img
                    src="/images/programs/medical-watermark.webp"
                    alt=""
                    className="w-full h-auto object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              )}

              {/* Eyebrow with flanking lines and accent underline */}
              <div className="inline-flex flex-col items-center">
                <div className="flex items-center gap-3">
                  <span className="w-8 sm:w-12 h-px bg-slate-200"></span>
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-slate-500">
                    OUR COURSES
                  </span>
                  <span className="w-8 sm:w-12 h-px bg-slate-200"></span>
                </div>
                <span
                  className="w-8 h-1 rounded-full mt-1.5"
                  style={{
                    backgroundColor:
                      selectedGoal === 'doctor'
                        ? '#E53935'
                        : selectedGoal === 'engineer'
                        ? '#2F80ED'
                        : '#27AE60',
                  }}
                />
              </div>

              {/* Main Heading */}
              <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
                <span
                  style={{
                    color:
                      selectedGoal === 'doctor'
                        ? '#E53935'
                        : selectedGoal === 'engineer'
                        ? '#2F80ED'
                        : '#27AE60',
                  }}
                >
                  {selectedGoal === 'doctor'
                    ? 'Medical'
                    : selectedGoal === 'engineer'
                    ? 'Engineering'
                    : 'Foundation'}
                </span>{' '}
                <span className="text-[#0A1B39]">Programs</span>
              </h2>

              {/* Subtitle / Description */}
              <p className="mt-3 text-slate-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-normal">
                {activeGoalData.description}
              </p>
            </div>

            {/* Program Detail Cards */}
            <div className="grid grid-cols-1 gap-8 sm:gap-10">
              {activeGoalData.programs.map((program, idx) => (
                <ProgramCard
                  key={program.slug || idx}
                  program={program}
                  trackId={selectedGoal}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Prompt state when NO goal is pre-selected */
          <div className="rounded-3xl border-2 border-dashed border-slate-200 p-12 text-center bg-slate-50/50">
            <div className="w-16 h-16 rounded-full bg-[#00A3FF]/10 text-[#00A3FF] flex items-center justify-center mx-auto mb-4">
              <HelpCircle size={32} />
            </div>
            <h3 className="text-2xl font-black text-[#0A0A0A] tracking-tight">
              Click on a goal above to get started
            </h3>
            <p className="mt-2 text-slate-500 text-sm sm:text-base max-w-md mx-auto">
              Select <strong>Medical</strong> for NEET/CUET, <strong>Engineering</strong> for IIT-JEE, or <strong>Foundation</strong> for Class 6–10 Olympiads.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {goals.map((g) => (
                <button
                  key={g.id}
                  onClick={() => handleGoalSelect(g.id)}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 hover:border-[#00A3FF] hover:text-[#00A3FF] transition-colors shadow-sm"
                >
                  Explore {g.title} <ChevronRight size={14} />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ============ BOTTOM COUNSELLING CTA ============ */}
        <div className="mt-20 rounded-3xl bg-[#0A0A0A] text-white p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#FFC107] bg-white/10 px-3 py-1 rounded-full mb-4">
              Free Academic Guidance
            </span>
            <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Still undecided about the right path?
            </h3>
            <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
              Visit our center in Vijay Nagar, Indore or speak with our senior academic counsellor to discover the ideal batch and roadmap for your aspirations.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/admissions"
                className="inline-flex items-center gap-2 rounded-full bg-[#D32F2F] text-white px-8 py-3.5 text-sm font-bold hover:bg-[#B71C1C] hover:-translate-y-0.5 transition-all shadow-lg shadow-[#D32F2F]/30"
              >
                Book Free Counselling Demo <ArrowRight size={16} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 text-white px-8 py-3.5 text-sm font-bold hover:bg-white hover:text-[#0A0A0A] transition-colors"
              >
                Contact Campus
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
