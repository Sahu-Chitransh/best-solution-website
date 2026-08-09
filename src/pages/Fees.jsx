import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Info } from 'lucide-react';
import feesData from '../content/fees.json';
import contactData from '../content/contact.json';

function useScrollReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = el.querySelectorAll('.scroll-reveal');
    elements.forEach((elem) => observer.observe(elem));

    return () => observer.disconnect();
  }, []);

  return ref;
}

export default function Fees() {
  const revealRef = useScrollReveal();

  const feeData = feesData.rows;

  return (
    <main ref={revealRef} className="w-full min-h-screen bg-white pt-24 pb-20 px-6 sm:px-12 lg:px-24 font-sans">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* HERO SECTION */}
        <div className="space-y-6 scroll-reveal opacity-0 translate-y-8 transition-all duration-700 ease-out">
          <div className="inline-block">
            <span className="text-[#D32F2F] bg-[#FFEBEE] rounded-full uppercase tracking-widest text-xs font-semibold px-3 py-1">
              FEE STRUCTURE · {feesData.sessionYear}
            </span>
          </div>
          <h1 className="font-black text-5xl sm:text-6xl md:text-7xl tracking-tighter text-black">
            Fair pricing.<br className="hidden sm:block" />
            <span className="text-[#D32F2F]">Zero surprises.</span>
          </h1>
          <p className="text-slate-600 max-w-3xl text-lg sm:text-xl">
            Every program below is inclusive of tests, printed material and doubt-support. Scholarships are awarded based on an internal entrance test or previous board score.
          </p>
        </div>

        {/* FEE TABLE */}
        <div className="scroll-reveal opacity-0 translate-y-8 transition-all duration-700 delay-100 ease-out overflow-x-auto">
          <div className="rounded-2xl border border-black/8 overflow-hidden min-w-[800px]">
            <table className="w-full text-left">
              <thead className="bg-slate-100">
                <tr>
                  <th className="uppercase text-xs font-semibold tracking-widest text-slate-500 font-mono py-4 px-6 border-b border-black/8">PROGRAM</th>
                  <th className="uppercase text-xs font-semibold tracking-widest text-slate-500 font-mono py-4 px-6 border-b border-black/8">REGISTRATION</th>
                  <th className="uppercase text-xs font-semibold tracking-widest text-slate-500 font-mono py-4 px-6 border-b border-black/8">TUITION</th>
                  <th className="uppercase text-xs font-semibold tracking-widest text-slate-500 font-mono py-4 px-6 border-b border-black/8">INSTALLMENTS</th>
                  <th className="uppercase text-xs font-semibold tracking-widest text-slate-500 font-mono py-4 px-6 border-b border-black/8">SCHOLARSHIP</th>
                </tr>
              </thead>
              <tbody>
                {feeData.map((row, index) => (
                  <tr key={index} className="border-b border-black/4 last:border-0 hover:bg-slate-50 transition-colors">
                    <td className="py-5 px-6 font-semibold text-[#0A0A0A]">{row.program}</td>
                    <td className="py-5 px-6 text-slate-700">{row.registration}</td>
                    <td className="py-5 px-6 font-bold text-[#D32F2F] font-mono">{row.tuition}</td>
                    <td className="py-5 px-6 text-slate-600">{row.installments}</td>
                    <td className="py-5 px-6">
                      {row.scholarship !== '—' ? (
                        <span className="bg-green-50 text-green-700 text-xs font-semibold px-3 py-1 rounded-full uppercase">
                          {row.scholarship}
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* NOTE BANNER */}
        <div className="scroll-reveal opacity-0 translate-y-8 transition-all duration-700 delay-200 ease-out">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-4">
            <Info className="text-amber-600 shrink-0 w-6 h-6 mt-0.5" />
            <p className="text-amber-900 text-base leading-relaxed">
              <span className="font-bold">Note:</span> {feesData.note} <span className="font-bold">{contactData.phones?.[0] || '94259 59956'}</span>.
            </p>
          </div>
        </div>

        {/* CTA BUTTONS */}
        <div className="scroll-reveal opacity-0 translate-y-8 transition-all duration-700 delay-300 ease-out flex flex-col sm:flex-row gap-4 pt-4">
          <Link to="/admissions" className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white rounded-full px-7 py-3.5 font-bold text-center transition-colors">
            Apply for admission
          </Link>
          <Link to="/contact" className="border border-black/15 hover:border-black/30 hover:bg-slate-50 bg-white text-[#0A0A0A] rounded-full px-7 py-3.5 font-semibold text-center transition-colors">
            Talk to a counsellor
          </Link>
        </div>

      </div>
    </main>
  );
}
