import React, { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Check, ArrowRight, Sparkles, BookOpen, Clock, Users, HelpCircle, ChevronRight } from 'lucide-react';
import coursesData from '../content/courses.json';
import { DoctorIllustration, EngineerIllustration, RocketIllustration } from '../components/GoalIllustrations';

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

const GOAL_ILLUSTRATIONS = {
  doctor: DoctorIllustration,
  engineer: EngineerIllustration,
  foundation: RocketIllustration,
};

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
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#0A0A0A]">
            {coursesData.heading || 'Select your goal'}
          </h1>
          <p className="mt-2 text-2xl sm:text-3xl md:text-4xl font-black text-[#00A3FF] tracking-tight">
            {coursesData.subheading || 'to explore our courses'}
          </p>
          <p className="mt-4 text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
            Choose your academic ambition below to view personalized coaching programs, test schedules, and batch details.
          </p>
        </div>

        {/* 3 Goal Cards Row (Matching Screenshot Style) */}
        <div className="mt-12 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {goals.map((goal) => {
            const isSelected = selectedGoal === goal.id;
            const IllustrationComp = GOAL_ILLUSTRATIONS[goal.id] || RocketIllustration;

            return (
              <button
                key={goal.id}
                onClick={() => handleGoalSelect(goal.id)}
                type="button"
                aria-pressed={isSelected}
                className={`group relative flex flex-col items-center justify-between rounded-3xl bg-white p-6 sm:p-7 transition-all duration-300 text-center cursor-pointer border ${
                  isSelected
                    ? 'border-[#00A3FF] ring-4 ring-[#00A3FF]/15 shadow-xl -translate-y-1.5'
                    : 'border-slate-200/90 hover:border-slate-300 hover:shadow-lg hover:-translate-y-1 shadow-sm'
                }`}
              >
                {/* Illustration Card Container */}
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

                {/* Active Indicator Check / Badge */}
                {isSelected && (
                  <span className="absolute -top-3 bg-[#00A3FF] text-white text-[11px] font-bold uppercase tracking-widest px-3.5 py-0.5 rounded-full shadow-md">
                    Selected
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* ============ PROGRAMS SECTION ============ */}
      <section ref={coursesRef} className="pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-20">
        {activeGoalData ? (
          /* When a goal is selected */
          <div className="space-y-12">
            {/* Active Track Banner Header */}
            <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-[#0A0A0A] to-slate-900 text-white p-8 sm:p-10 relative overflow-hidden shadow-xl border border-white/10">
              <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#00A3FF]/10 blur-3xl pointer-events-none" />
              
              <div className="relative z-10 max-w-3xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#00A3FF]">
                  <Sparkles size={14} />
                  {activeGoalData.badge}
                </span>
                <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
                  {activeGoalData.title} Programs
                </h2>
                <p className="mt-3 text-slate-300 text-base sm:text-lg leading-relaxed">
                  {activeGoalData.description}
                </p>
              </div>
            </div>

            {/* Program Detail Cards */}
            <div className="grid grid-cols-1 gap-8">
              {activeGoalData.programs.map((program, idx) => (
                <div
                  key={program.slug || idx}
                  className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:border-slate-300 grid grid-cols-1 lg:grid-cols-12"
                >
                  {/* Left Highlight Sidebar */}
                  <div
                    className="lg:col-span-4 p-8 sm:p-10 flex flex-col justify-between text-white relative overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${program.color || '#D32F2F'} 0%, ${program.colorDark || '#0A0A0A'} 100%)`,
                    }}
                  >
                    <div>
                      <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-white/90 bg-white/15 backdrop-blur-sm px-3 py-1 rounded-full mb-4">
                        {program.grade}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug">
                        {program.title}
                      </h3>
                      <p className="mt-4 text-sm text-white/85 leading-relaxed">
                        {program.tagline}
                      </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/15 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/80">
                      <Clock size={15} /> Admissions Open 2026-27
                    </div>
                  </div>

                  {/* Right Features & CTAs Content */}
                  <div className="lg:col-span-8 p-8 sm:p-10 flex flex-col justify-between bg-white">
                    <div>
                      {/* Targeted Exams Badges */}
                      <div className="mb-6">
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-2.5">
                          Target Exams & Syllabus
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {(program.exams || []).map((exam, eIdx) => (
                            <span
                              key={eIdx}
                              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-800 bg-slate-100 border border-slate-200/80 rounded-full px-3.5 py-1.5"
                            >
                              <BookOpen size={13} className="text-[#D32F2F]" />
                              {exam}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Key Features Bullet List */}
                      <div className="mt-6">
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-3">
                          Program Highlights & System
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          {(program.features || []).map((feature, fIdx) => (
                            <div key={fIdx} className="flex items-start gap-2.5 text-sm text-slate-700">
                              <div className="w-5 h-5 rounded-full bg-green-50 border border-green-200 flex items-center justify-center text-green-600 flex-shrink-0 mt-0.5">
                                <Check size={12} strokeWidth={3} />
                              </div>
                              <span className="leading-snug">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Footer */}
                    <div className="mt-10 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                        <Users size={16} className="text-[#D32F2F]" />
                        <span>Batches of 25–30 Students · Personal Mentorship</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <Link
                          to="/admissions"
                          className="inline-flex items-center gap-2 rounded-full bg-[#D32F2F] text-white px-7 py-3 text-sm font-bold hover:bg-[#B71C1C] hover:-translate-y-0.5 transition-all duration-200 shadow-md shadow-[#D32F2F]/20"
                        >
                          Enquire for this Batch <ArrowRight size={15} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
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
              Select <strong>Doctor</strong> for medical, <strong>Engineer</strong> for IIT-JEE, or <strong>6-10th</strong> for foundational school Olympiads.
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
