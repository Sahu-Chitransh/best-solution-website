import React from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap, Calendar, FileText, Check, Users, ArrowRight,
} from 'lucide-react';

const TRACK_THEMES = {
  doctor: {
    accent: '#E53935',
    bannerGradient: 'from-[#E53935] to-[#C62828]',
    examPill: 'bg-[#FFF5F5] border-[#FED7D7] text-slate-800',
    iconColor: 'text-[#E53935]',
    btnBg: 'bg-[#E53935] hover:bg-[#D32F2F] shadow-[#E53935]/25',
    defaultGraphic: '/images/programs/medical-books.webp',
  },
  engineer: {
    accent: '#2F80ED',
    bannerGradient: 'from-[#2563EB] to-[#1D4ED8]',
    examPill: 'bg-[#F0F7FF] border-[#BFDBFE] text-slate-800',
    iconColor: 'text-[#2F80ED]',
    btnBg: 'bg-[#2F80ED] hover:bg-[#1D4ED8] shadow-[#2F80ED]/25',
    defaultGraphic: '/images/programs/engineering-books.webp',
  },
  foundation: {
    accent: '#27AE60',
    bannerGradient: 'from-[#16A34A] to-[#15803D]',
    examPill: 'bg-[#F0FDF4] border-[#BBF7D0] text-slate-800',
    iconColor: 'text-[#27AE60]',
    btnBg: 'bg-[#27AE60] hover:bg-[#15803D] shadow-[#27AE60]/25',
    defaultGraphic: '/images/programs/foundation-books.webp',
  },
};

const strVal = (item, key) => (typeof item === 'string' ? item : (item && (item[key] || Object.values(item)[0])) || '');

export default function ProgramCard({ program, trackId = 'doctor' }) {
  const theme = TRACK_THEMES[trackId] || TRACK_THEMES.doctor;
  const graphicSrc = program.image || theme.defaultGraphic;

  return (
    <div className="rounded-[28px] sm:rounded-3xl border border-slate-200/90 bg-white shadow-sm hover:shadow-xl transition-all duration-300 p-3 sm:p-3.5 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
      {/* ── Left Vibrant Card Banner ── */}
      <div
        className={`lg:col-span-4 rounded-2xl p-6 sm:p-7 text-white flex flex-col justify-between relative overflow-hidden shadow-md bg-gradient-to-b ${theme.bannerGradient}`}
      >
        <div>
          {/* Top Grade / Duration Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white mb-4 shadow-xs">
            <GraduationCap size={15} />
            <span>{program.grade}</span>
          </div>

          {/* Title */}
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug text-white">
            {program.title}
          </h3>

          {/* Tagline */}
          <p className="mt-2.5 text-xs sm:text-sm text-white/90 leading-relaxed font-medium">
            {program.tagline}
          </p>
        </div>

        {/* Themed Books / Tools Graphic */}
        <div className="my-5 w-full rounded-xl overflow-hidden shadow-inner flex justify-center bg-black/10 p-1">
          <img
            src={graphicSrc}
            alt={`${program.title} Curriculum Materials`}
            className="w-full h-auto object-cover rounded-lg select-none pointer-events-none"
            loading="lazy"
            decoding="async"
            width="290"
            height="105"
          />
        </div>

        {/* Admissions Open Button Link */}
        <Link
          to="/admissions"
          className="w-full flex items-center justify-between bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white transition-all shadow-xs group/btn"
          aria-label={`Apply for ${program.title}`}
        >
          <span className="flex items-center gap-2">
            <Calendar size={14} /> ADMISSIONS OPEN 2026–27
          </span>
          <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* ── Right Content Details ── */}
      <div className="lg:col-span-8 p-3 sm:p-5 lg:p-6 flex flex-col justify-between">
        <div>
          {/* Target Exams & Syllabus */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1 h-3.5 rounded-full" style={{ backgroundColor: theme.accent }} />
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-600">
                TARGET EXAMS &amp; SYLLABUS
              </h4>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {(program.exams || []).map((exam, eIdx) => (
                <span
                  key={eIdx}
                  className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider rounded-full px-4 py-2 border shadow-xs ${theme.examPill}`}
                >
                  <FileText size={13} className={theme.iconColor} />
                  <span>{strVal(exam, 'exam')}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Program Highlights & System */}
          <div className="mt-7 sm:mt-8">
            <div className="flex items-center gap-2 mb-3.5">
              <span className="w-1 h-3.5 rounded-full" style={{ backgroundColor: theme.accent }} />
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-600">
                PROGRAM HIGHLIGHTS &amp; SYSTEM
              </h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {(program.features || []).map((feature, fIdx) => (
                <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span className="leading-snug font-medium">{strVal(feature, 'feature')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="mt-8 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <Users size={16} className={theme.iconColor} />
            <span>Batches of 25–30 Students · Personal Mentorship</span>
          </div>

          <Link
            to="/admissions"
            className={`inline-flex items-center gap-2 rounded-full px-6 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all ${theme.btnBg}`}
          >
            Enquire for this Batch <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
