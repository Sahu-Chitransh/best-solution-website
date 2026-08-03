import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';

/* ───── scroll-reveal hook ───── */
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
      { threshold: 0.12 },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);
  return ref;
}

/* ───── course data ───── */
const PROGRAMS = [
  {
    grade: 'Class 11 – 12 + Droppers · 1 – 2 Year Program',
    title: 'IIT-JEE (Main + Advanced)',
    tagline: 'Rank-focused. Concept-first.',
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    features: [
      'Weekly full-length mock tests aligned with JEE pattern',
      'Small batches of 25 — 30 students',
      'Doubt-clearing sessions daily 6—8 PM',
      'Personal mentor for every enrolled student',
    ],
    fee: 'From ₹75,000 / year',
    color: '#D32F2F',           // red gradient
    colorDark: '#B71C1C',
    enrollLabel: 'Enroll in IIT-JEE',
    enrollHref: '/admissions',
  },
  {
    grade: 'Class 11 – 12 + Droppers · 1 – 2 Year Program',
    title: 'NEET (Medical)',
    tagline: 'White-coat begins here.',
    subjects: ['Biology', 'Physics', 'Chemistry'],
    features: [
      'NCERT-mastery framework by senior faculty',
      'Diagram lab & NEET biology practicals',
      'Weekly NEET-pattern MCQ marathon',
      'Rank-improvement guarantee for droppers',
    ],
    fee: 'From ₹68,000 / year',
    color: '#2E7D32',           // green
    colorDark: '#1B5E20',
    enrollLabel: 'Enroll in NEET',
    enrollHref: '/admissions',
  },
  {
    grade: 'Class 6 – 10 · Annual Program',
    title: 'Olympiads & NTSE / KVPY',
    tagline: 'Sharpen the champion mind, early.',
    subjects: ['Maths', 'Science', 'Reasoning'],
    features: [
      'PRMO, RMO, NSO, IMO, IJSO foundation',
      'Stage-wise mentored preparation',
      'Puzzle-based reasoning sprints',
    ],
    fee: 'From ₹22,000 / year',
    color: '#1a1a1a',           // dark
    colorDark: '#0A0A0A',
    enrollLabel: 'Enroll in Olympiads',
    enrollHref: '/admissions',
  },
  {
    grade: 'Class 9 – 12 · Flexible Modules',
    title: 'CCG – Career & Competitive Guidance',
    tagline: 'Find your track. Own the race.',
    subjects: ['Aptitude', 'Career Mapping', 'Board + Exam Blend'],
    features: [
      'Integrated Board + JEE/NEET foundation',
      '1-on-1 counselling with mentors',
      'Aptitude & career psychometrics',
      'Perfect for students undecided about stream',
    ],
    fee: 'From ₹18,000 / year',
    color: '#1a1a1a',           // dark
    colorDark: '#0A0A0A',
    enrollLabel: 'Enroll in CCG',
    enrollHref: '/admissions',
  },
];

/* ───── component ───── */
export default function Courses() {
  const wrapRef = useScrollReveal();

  return (
    <div ref={wrapRef}>
      {/* ============ HERO ============ */}
      <section className="pt-20 md:pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bs-animate-hidden">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#D32F2F] bg-[#FFEBEE] px-3 py-1 rounded-full mb-6">
            Programs · 2026-27 Session
          </span>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter text-[#0A0A0A] leading-[0.95]">
            Structured programs.
            <br />
            <span className="text-[#D32F2F]">Uncompromising rigour.</span>
          </h1>

          <p className="mt-8 max-w-3xl text-base md:text-lg text-slate-600 leading-relaxed">
            Every program is designed around three pillars — concept mastery,
            weekly tests, and mentor-led course correction. Pick the one that
            fits your goal.
          </p>
        </div>
      </section>

      {/* ============ COURSE CARDS ============ */}
      <section className="pb-20 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        {PROGRAMS.map((p, i) => (
          <div
            key={p.title}
            className={`bs-animate-hidden bs-stagger-${Math.min(i + 1, 4)} rounded-3xl overflow-hidden border border-black/8 grid grid-cols-1 md:grid-cols-12`}
          >
            {/* ── Left colored panel ── */}
            <div
              className="md:col-span-5 p-8 sm:p-10 flex flex-col justify-between text-white"
              style={{
                background: `linear-gradient(135deg, ${p.color} 0%, ${p.colorDark} 100%)`,
              }}
            >
              <div>
                <span className="block text-[11px] font-semibold uppercase tracking-widest text-white/80 mb-4">
                  {p.grade}
                </span>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-[1.1]">
                  {p.title}
                </h2>
                <p className="mt-3 text-sm text-white/80">{p.tagline}</p>
              </div>

              <div className="mt-8">
                <span className="block text-[11px] font-semibold uppercase tracking-widest text-white/60 mb-1">
                  Program Fee
                </span>
                <span className="text-2xl sm:text-3xl font-black tracking-tight font-mono">
                  {p.fee}
                </span>
              </div>
            </div>

            {/* ── Right white panel ── */}
            <div className="md:col-span-7 bg-white p-8 sm:p-10 flex flex-col justify-between">
              {/* Subject tags */}
              <div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {p.subjects.map((s) => (
                    <span
                      key={s}
                      className="inline-block text-[11px] font-semibold uppercase tracking-widest text-[#0A0A0A] border border-black/15 rounded-full px-3.5 py-1"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* Features grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                  {p.features.map((f) => (
                    <div key={f} className="flex items-start gap-2.5">
                      <Check
                        size={18}
                        className="text-green-600 mt-0.5 flex-shrink-0"
                        strokeWidth={2.5}
                      />
                      <span className="text-sm text-slate-700">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 mt-8">
                <Link
                  to={p.enrollHref}
                  className="inline-flex items-center gap-2 rounded-full bg-[#D32F2F] text-white px-6 py-3 text-sm font-bold hover:bg-[#B71C1C] transition-colors"
                >
                  {p.enrollLabel}
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/fees"
                  className="inline-flex items-center rounded-full border border-black/15 bg-white text-[#0A0A0A] px-6 py-3 text-sm font-semibold hover:bg-slate-50 transition-colors"
                >
                  See fee structure
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
