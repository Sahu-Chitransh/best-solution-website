import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
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

// Course data is now imported from ../content/courses.json
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
        {coursesData.programs.map((p, i) => (
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
                  {(p.subjects || []).map((s, sIdx) => {
                    const sText = typeof s === 'string' ? s : s.subject || Object.values(s)[0] || '';
                    return (
                      <span
                        key={sIdx}
                        className="inline-block text-[11px] font-semibold uppercase tracking-widest text-[#0A0A0A] border border-black/15 rounded-full px-3.5 py-1"
                      >
                        {sText}
                      </span>
                    );
                  })}
                </div>

                {/* Features grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                  {(p.features || []).map((f, fIdx) => {
                    const fText = typeof f === 'string' ? f : f.feature || Object.values(f)[0] || '';
                    return (
                      <div key={fIdx} className="flex items-start gap-2.5">
                        <Check
                          size={18}
                          className="text-green-600 mt-0.5 flex-shrink-0"
                          strokeWidth={2.5}
                        />
                        <span className="text-sm text-slate-700">{fText}</span>
                      </div>
                    );
                  })}
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
