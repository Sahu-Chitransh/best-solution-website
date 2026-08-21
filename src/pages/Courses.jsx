import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import coursesData from '../content/courses.json';

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

/* ───── component ───── */
export default function Courses() {
  const wrapRef = useScrollReveal();
  const programs = coursesData.programs || [];

  return (
    <div ref={wrapRef}>
      {/* ============ HERO ============ */}
      <section className="pt-20 md:pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bs-animate-hidden">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#D32F2F] bg-[#FFEBEE] px-3 py-1 rounded-full mb-6">
            Academic Pathways · 2026-27
          </span>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter text-[#0A0A0A] leading-[0.95]">
            Our Programs
          </h1>

          <p className="mt-6 max-w-3xl text-base md:text-lg text-slate-600 leading-relaxed">
            From building early foundations to cracking the toughest competitive
            exams — pick the pathway that matches your academic stage.
          </p>
        </div>
      </section>

      {/* ============ TIMELINE ============ */}
      <section className="pb-20 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-5 sm:left-7 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#2E7D32] via-[#D32F2F] to-[#E65100]" />

          {/* Program cards */}
          <div className="space-y-6 sm:space-y-8">
            {programs.map((p, i) => {
              const exams = (p.exams || []).map((e) =>
                typeof e === 'string' ? e : e.exam || Object.values(e)[0] || ''
              );

              return (
                <Link
                  key={p.slug}
                  to="/admissions"
                  className={`group relative flex items-start gap-4 sm:gap-6 bs-animate-hidden bs-stagger-${Math.min(i + 1, 6)}`}
                  data-animate
                >
                  {/* Timeline node */}
                  <div className="relative z-10 flex-shrink-0 mt-1">
                    <div
                      className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border-4 border-white shadow-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: p.color }}
                    >
                      <span className="text-white font-black text-xs sm:text-sm">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>

                  {/* Card */}
                  <div className="flex-1 rounded-2xl sm:rounded-3xl border border-black/8 bg-white p-5 sm:p-7 transition-all duration-300 group-hover:shadow-xl group-hover:border-transparent group-hover:-translate-y-0.5"
                    style={{ '--card-color': p.color }}
                  >
                    {/* Colored top accent bar */}
                    <div
                      className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl sm:rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ backgroundColor: p.color }}
                    />

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div>
                        {/* Grade badge */}
                        <span
                          className="inline-block text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3"
                          style={{
                            backgroundColor: `${p.color}15`,
                            color: p.color,
                          }}
                        >
                          {p.grade}
                        </span>

                        {/* Title */}
                        <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#0A0A0A] group-hover:text-[#D32F2F] transition-colors">
                          {p.title}
                        </h2>

                        {/* Exam tags */}
                        <div className="mt-3 flex flex-wrap gap-2">
                          {exams.map((exam, eIdx) => (
                            <span
                              key={eIdx}
                              className="inline-block text-[11px] font-semibold uppercase tracking-widest border rounded-full px-3 py-1"
                              style={{
                                borderColor: `${p.color}30`,
                                color: p.colorDark,
                              }}
                            >
                              {exam}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Arrow */}
                      <div
                        className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1"
                        style={{ backgroundColor: `${p.color}15` }}
                      >
                        <ArrowRight size={18} style={{ color: p.color }} />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center bs-animate-hidden" data-animate>
          <Link
            to="/admissions"
            className="inline-flex items-center gap-2 rounded-full bg-[#D32F2F] text-white px-8 py-4 text-sm font-bold hover:bg-[#B71C1C] hover:-translate-y-0.5 transition-all duration-200 shadow-lg shadow-[#D32F2F]/20"
          >
            Enquire Now <ArrowRight size={16} />
          </Link>
          <p className="mt-4 text-sm text-slate-500">
            Not sure which program fits? We&apos;ll help you decide.
          </p>
        </div>
      </section>
    </div>
  );
}
