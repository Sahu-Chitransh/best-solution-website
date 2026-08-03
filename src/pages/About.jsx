import { useRef, useEffect } from 'react';
import { Ban, Flame, Users, Award } from 'lucide-react';

/* ───── scroll-reveal hook (inline) ───── */
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
      { threshold: 0.15 },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);
  return ref;
}

/* ───── data ───── */
const VALUES = [
  {
    Icon: Ban,
    title: 'Our Mission',
    body: 'Give every serious student — regardless of school background — a shot at a top JEE/NEET rank through clarity, mentorship, and disciplined weekly cycles.',
  },
  {
    Icon: Flame,
    title: 'Our Belief',
    body: "Coaching isn't magic. It's the compounding of small, honest habits — daily problem sets, weekly tests, and a mentor who won't let you drift.",
  },
  {
    Icon: Users,
    title: 'The Founders',
    body: 'Started in 2010 by a team of IITian educators who left corporate coaching chains to build something small, personal and unapologetically results-driven.',
  },
  {
    Icon: Award,
    title: 'Results First',
    body: '3800+ students trained. 77% selection ratio in our Pinnacle batch. AIR 1833 in JEE Advanced 2025. Numbers we can defend, not hide behind.',
  },
];

const TIMELINE = [
  {
    year: '2010',
    title: 'The first classroom',
    body: '22 students, one rented hall in Vijay Nagar, one whiteboard.',
  },
  {
    year: '2014',
    title: 'First AIR under 5000',
    body: 'JEE Advanced result put us on the Indore coaching map.',
  },
  {
    year: '2018',
    title: 'NEET & Olympiad wings',
    body: 'Dedicated Biology + reasoning teams built from scratch.',
  },
  {
    year: '2023',
    title: '99.48%ile',
    body: 'Srujan Gawande cracks JEE Main 2023 — our best percentile till then.',
  },
  {
    year: '2025',
    title: 'Pinnacle Program',
    body: '22 of 36 students cross 95%ile in JEE Main. AIR 1833 in Advanced.',
  },
  {
    year: '2026',
    title: 'CCG launches',
    body: 'New Career & Competitive Guidance track for undecided students.',
  },
];

/* ───── component ───── */
export default function About() {
  const wrapRef = useScrollReveal();

  return (
    <div ref={wrapRef}>
      {/* ============ HERO ============ */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bs-animate-hidden">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#D32F2F] bg-[#FFEBEE] px-3 py-1 rounded-full mb-6">
            About Us · Since 2010
          </span>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter text-[#0A0A0A] leading-[0.95]">
            We don't sell classes.
            <br />
            <span className="text-[#D32F2F]">We build ranks.</span>
          </h1>

          <p className="mt-8 max-w-3xl text-base md:text-lg text-slate-600 leading-relaxed">
            Best Solution Coaching Classes is an Indore-born institute training
            Class 6 — 12 students for IIT-JEE, NEET, Olympiads, NTSE, KVPY and
            our new CCG program. We opened doors in 2010 with a single classroom
            of 22 students — today we run one of Indore's highest selection-ratio
            programs.
          </p>
        </div>

        {/* Two images row */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 bs-animate-hidden bs-stagger-2">
          <div className="rounded-2xl overflow-hidden aspect-[4/3]">
            <img
              src="/images/classroom.png"
              alt="Best Solution classroom"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-2xl overflow-hidden aspect-[4/3]">
            <img
              src="/images/logo.png"
              alt="Best Solution logo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ============ MISSION / VALUES 2×2 ============ */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {VALUES.map((v, i) => (
            <div
              key={v.title}
              className={`bs-animate-hidden bs-stagger-${i + 1} rounded-2xl border border-black/8 bg-white p-8 sm:p-10`}
            >
              <v.Icon size={32} className="text-[#D32F2F] mb-4" strokeWidth={1.5} />
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-[#0A0A0A]">
                {v.title}
              </h3>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ TIMELINE ============ */}
      <section className="bg-[#0A0A0A] py-20 md:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bs-animate-hidden">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#D32F2F] bg-[#D32F2F]/15 px-3 py-1 rounded-full mb-12 md:mb-16">
              A Brief Timeline
            </span>
          </div>

          <div className="relative pl-8 md:pl-10">
            {/* Vertical line */}
            <div className="absolute left-[7px] md:left-[9px] top-2 bottom-2 w-[2px] bg-[#D32F2F]/40" />

            <div className="space-y-12 md:space-y-16">
              {TIMELINE.map((item, i) => (
                <div
                  key={item.year}
                  className={`relative bs-animate-hidden bs-stagger-${Math.min(i + 1, 6)}`}
                >
                  {/* Dot */}
                  <div className="absolute -left-8 md:-left-10 top-1.5 w-4 h-4 rounded-full bg-[#D32F2F] border-2 border-[#D32F2F]" />

                  {/* Year */}
                  <span className="block text-sm font-bold uppercase tracking-widest text-[#FFC107] font-mono mb-1">
                    {item.year}
                  </span>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-black tracking-tight text-white">
                    {item.title}
                  </h3>

                  {/* Body */}
                  <p className="mt-1 text-sm sm:text-base text-slate-400 leading-relaxed">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
