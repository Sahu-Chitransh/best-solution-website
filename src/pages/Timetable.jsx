import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function useScrollReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = ref.current?.querySelectorAll('.reveal-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return ref;
}

const tableData = [
  { batch: "JEE Advanced — Grade 12", days: "Mon — Sat", time: "6:00 AM - 9:30 AM", room: "Hall A" },
  { batch: "JEE Main — Grade 11", days: "Mon — Sat", time: "10:00 AM - 1:30 PM", room: "Hall B" },
  { batch: "NEET Toppers — Grade 12", days: "Mon — Sat", time: "2:00 PM - 5:30 PM", room: "Hall C" },
  { batch: "NEET Aspirants — Grade 11", days: "Mon — Sat", time: "4:00 PM - 7:30 PM", room: "Hall D" },
  { batch: "Olympiad — Grade 9 & 10", days: "Tue, Thu, Sat", time: "5:00 PM - 7:00 PM", room: "Hall E" },
  { batch: "Foundation — Grade 6 — 8", days: "Mon, Wed, Fri", time: "5:30 PM - 7:00 PM", room: "Hall E" },
  { batch: "CCG Modules", days: "Sat — Sun", time: "10:00 AM - 1:00 PM", room: "Seminar Rm" },
  { batch: "Weekend Doubt Marathon", days: "Sunday", time: "9:00 AM - 12:00 PM", room: "All Halls" }
];

export default function Timetable() {
  const revealRef = useScrollReveal();

  return (
    <div className="bg-white min-h-screen pt-24 pb-20" ref={revealRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HERO SECTION */}
        <div className="text-center max-w-4xl mx-auto mb-16 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out">
          <span className="inline-block text-[#D32F2F] bg-[#FFEBEE] rounded-full uppercase tracking-widest text-xs font-semibold px-3 py-1 mb-6">
            CLASS SCHEDULE
          </span>
          <h1 className="text-[#0A0A0A] font-black text-5xl sm:text-6xl md:text-7xl tracking-tighter mb-4">
            Timetable that <span className="text-[#D32F2F]">actually respects school hours.</span>
          </h1>
          <p className="text-slate-600 max-w-3xl mx-auto text-base md:text-lg mt-6">
            Morning, evening and weekend batches are structured so that regular school students, droppers and hostellers can all find a slot without burning out.
          </p>
        </div>

        {/* TIMETABLE TABLE */}
        <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-200 ease-out">
          <div className="rounded-2xl border border-black/[0.08] overflow-hidden bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left whitespace-nowrap border-collapse">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-6 py-4 uppercase text-xs font-semibold tracking-widest text-slate-500 font-mono border-b border-black/[0.05]">BATCH</th>
                    <th className="px-6 py-4 uppercase text-xs font-semibold tracking-widest text-slate-500 font-mono border-b border-black/[0.05]">DAYS</th>
                    <th className="px-6 py-4 uppercase text-xs font-semibold tracking-widest text-slate-500 font-mono border-b border-black/[0.05]">TIME</th>
                    <th className="px-6 py-4 uppercase text-xs font-semibold tracking-widest text-slate-500 font-mono border-b border-black/[0.05]">ROOM</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, index) => (
                    <tr 
                      key={index} 
                      className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors last:border-b-0"
                    >
                      <td className="px-6 py-4 font-semibold text-[#0A0A0A]">{row.batch}</td>
                      <td className="px-6 py-4 text-slate-600">{row.days}</td>
                      <td className="px-6 py-4 font-mono font-bold text-[#D32F2F]">{row.time}</td>
                      <td className="px-6 py-4 text-slate-600">{row.room}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
