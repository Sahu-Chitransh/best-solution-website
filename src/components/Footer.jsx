import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  GraduationCap,
  Link2,
  Sparkles,
  ShieldCheck,
  Star,
  BookOpen,
} from 'lucide-react';
import InstagramIcon from './InstagramIcon';
import contactData from '../content/contact.json';

const QUICK_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Courses', href: '/courses' },
  { label: 'Admissions', href: '/admissions' },
  { label: 'Results', href: '/results' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const COURSE_LINKS = [
  { label: 'IIT-JEE', href: '/courses?goal=engineer' },
  { label: 'NEET', href: '/courses?goal=doctor' },
  { label: 'Olympiads', href: '/courses?goal=foundation' },
  { label: 'NTSE', href: '/courses?goal=foundation' },
  { label: 'Foundation (8th–10th)', href: '/courses?goal=foundation' },
  { label: 'Class 11 & 12', href: '/courses' },
];

const USEFUL_LINKS = [
  { label: 'Terms & Conditions', href: '/contact' },
  { label: 'Privacy Policy', href: '/contact' },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#0A0A0A] text-white overflow-hidden">
      {/* Top Wave Accent with Red Swoosh */}
      <div className="w-full overflow-hidden leading-none select-none pointer-events-none -mb-px">
        <svg
          viewBox="0 0 1440 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-7 sm:h-11 md:h-14 block"
          preserveAspectRatio="none"
        >
          {/* Main dark footer filler */}
          <path
            d="M0,22 C420,56 980,58 1440,18 L1440,64 L0,64 Z"
            fill="#0A0A0A"
          />
          {/* Subtle red ambient glow */}
          <path
            d="M0,21 C420,54 980,56 1440,16"
            stroke="#D32F2F"
            strokeWidth="5"
            strokeOpacity="0.35"
            strokeLinecap="round"
          />
          {/* Vibrant red swoosh line */}
          <path
            d="M0,21 C420,54 980,56 1440,16"
            stroke="#E53935"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Main 5-Column Navigation Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-8 lg:gap-0 items-start">
          
          {/* Column 1: Brand & Cursive Slogan (Span 3) */}
          <div className="lg:col-span-3 lg:pr-6 lg:border-r lg:border-white/10 flex flex-col justify-between h-full">
            <div>
              {/* Logo + Header */}
              <div className="flex items-center gap-3 mb-3">
                <img
                  src="/images/jee/Best_Solution_LOGO.png"
                  alt="Best Solution Coaching Classes"
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-contain bg-white p-0.5 shadow-md flex-shrink-0"
                  loading="lazy"
                  decoding="async"
                  width="64"
                  height="64"
                />
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white tracking-wide uppercase leading-tight">
                    BEST SOLUTION
                  </h3>
                  <p className="text-[11px] sm:text-xs font-semibold tracking-wider text-slate-300 uppercase">
                    COACHING CLASSES
                  </p>
                  <div className="w-10 h-0.5 bg-[#E53935] rounded-full mt-1" />
                </div>
              </div>

              {/* Bio Paragraph */}
              <p className="text-xs text-slate-300 leading-relaxed max-w-xs mt-3">
                Best Solution Coaching Classes — training champions for IIT-JEE, NEET, Olympiads, NTSE & CCG since 2010, right in the heart of Vijay Nagar, Indore.
              </p>
            </div>

            {/* Cursive Red Script Slogan */}
            <div className="mt-6 pt-2">
              <div className="font-['Caveat',cursive] text-2xl sm:text-[26px] font-bold text-[#E53935] leading-tight select-none">
                Better Learning
                <span className="block text-xl sm:text-[22px] ml-4">
                  → Brighter Future
                </span>
              </div>
              {/* Curved red swoosh under script */}
              <svg
                className="w-44 h-3.5 text-[#E53935] mt-0.5"
                viewBox="0 0 170 14"
                fill="none"
              >
                <path
                  d="M2 7 C50 14 120 14 168 3"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Column 2: Quick Links (Span 2) */}
          <div className="lg:col-span-2 lg:px-6 lg:border-r lg:border-white/10">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-full bg-[#E53935] flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                <Sparkles size={13} />
              </div>
              <h4 className="text-sm font-bold text-white tracking-wide">
                Quick Links
              </h4>
            </div>
            <div className="w-7 h-0.5 bg-[#E53935] rounded-full mb-3" />

            <ul className="space-y-1.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="group inline-flex items-center gap-1.5 text-xs sm:text-[13px] text-slate-300 hover:text-white transition-colors"
                  >
                    <span className="text-[#E53935] font-black text-sm leading-none group-hover:translate-x-0.5 transition-transform select-none">
                      ›
                    </span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Courses (Span 2) */}
          <div className="lg:col-span-2 lg:px-6 lg:border-r lg:border-white/10">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-full bg-[#E53935] flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                <GraduationCap size={13} />
              </div>
              <h4 className="text-sm font-bold text-white tracking-wide">
                Courses
              </h4>
            </div>
            <div className="w-7 h-0.5 bg-[#E53935] rounded-full mb-3" />

            <ul className="space-y-1.5">
              {COURSE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="group inline-flex items-center gap-1.5 text-xs sm:text-[13px] text-slate-300 hover:text-white transition-colors"
                  >
                    <span className="text-[#E53935] font-black text-sm leading-none group-hover:translate-x-0.5 transition-transform select-none">
                      ›
                    </span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Useful Links (Span 2) */}
          <div className="lg:col-span-2 lg:px-6 lg:border-r lg:border-white/10">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-full bg-[#E53935] flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                <Link2 size={13} />
              </div>
              <h4 className="text-sm font-bold text-white tracking-wide">
                Useful Links
              </h4>
            </div>
            <div className="w-7 h-0.5 bg-[#E53935] rounded-full mb-3" />

            <ul className="space-y-1.5">
              {USEFUL_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="group inline-flex items-center gap-1.5 text-xs sm:text-[13px] text-slate-300 hover:text-white transition-colors"
                  >
                    <span className="text-[#E53935] font-black text-sm leading-none group-hover:translate-x-0.5 transition-transform select-none">
                      ›
                    </span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Contact Us & Community (Span 3) */}
          <div className="lg:col-span-3 lg:pl-6">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-full bg-[#E53935] flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                <Phone size={13} />
              </div>
              <h4 className="text-sm font-bold text-white tracking-wide">
                Contact Us
              </h4>
            </div>
            <div className="w-7 h-0.5 bg-[#E53935] rounded-full mb-3" />

            {/* Contact Rows */}
            <div className="space-y-2.5 mb-5">
              {/* Address */}
              <div className="flex items-start gap-2.5 text-xs text-slate-300 leading-snug">
                <div className="w-5 h-5 rounded-full bg-[#E53935] flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                  <MapPin size={11} />
                </div>
                <span>{contactData.address}</span>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <div className="w-5 h-5 rounded-full bg-[#E53935] flex items-center justify-center text-white flex-shrink-0">
                  <Phone size={11} />
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <a
                    href="tel:9425959956"
                    className="hover:text-white transition-colors tracking-wide"
                  >
                    94259 59956
                  </a>
                  <span className="text-slate-500">·</span>
                  <a
                    href="tel:07314088896"
                    className="hover:text-white transition-colors tracking-wide"
                  >
                    0731-4088896
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <div className="w-5 h-5 rounded-full bg-[#E53935] flex items-center justify-center text-white flex-shrink-0">
                  <Mail size={11} />
                </div>
                <a
                  href={`mailto:${contactData.email}`}
                  className="hover:text-white transition-colors underline decoration-slate-600 underline-offset-2"
                >
                  {contactData.email}
                </a>
              </div>
            </div>

            {/* Follow Us & Social Media */}
            <div>
              <h5 className="text-xs font-bold text-white tracking-wide mb-2.5">
                Follow Us
              </h5>
              <div className="flex flex-wrap items-center gap-2">
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-sm"
                  aria-label="Facebook"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href={contactData.instagram?.url || 'https://instagram.com/bestsolutionindore'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#833AB4] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-sm"
                  aria-label="Instagram"
                >
                  <InstagramIcon size={14} />
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-[#FF0000] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-sm"
                  aria-label="YouTube"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>

                {/* Telegram */}
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-[#24A1DE] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-sm"
                  aria-label="Telegram"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.458c.538-.196 1.006.128.832.915z" />
                  </svg>
                </a>

                {/* Join Our Community Button */}
                <a
                  href={contactData.instagram?.url || 'https://instagram.com/bestsolutionindore'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E53935] hover:bg-[#C62828] text-white text-[11px] font-bold tracking-wide transition-all shadow-md hover:scale-105 active:scale-95"
                >
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                  </svg>
                  <span>Join Our Community</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Trust Ribbon Strip */}
      <div className="border-y border-white/10 bg-black/30 py-4 my-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-5">
          {/* Trust Highlights */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 md:gap-8 text-xs sm:text-sm font-semibold text-slate-200">
            {/* Trusted Since 2010 */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#E53935] flex items-center justify-center text-white shadow-sm flex-shrink-0">
                <ShieldCheck size={14} />
              </div>
              <span>Trusted Since 2010</span>
            </div>

            <div className="hidden sm:block w-px h-4 bg-white/20" />

            {/* Expert Faculty */}
            <div className="flex items-center gap-2">
              <GraduationCap size={18} className="text-[#E53935] flex-shrink-0" />
              <span>Expert Faculty</span>
            </div>

            <div className="hidden sm:block w-px h-4 bg-white/20" />

            {/* Proven Results */}
            <div className="flex items-center gap-2">
              <Star size={16} className="text-[#E53935] fill-[#E53935] flex-shrink-0" />
              <span>Proven Results</span>
            </div>

            <div className="hidden sm:block w-px h-4 bg-white/20" />

            {/* Your Success Our Mission */}
            <div className="flex items-center gap-2">
              <BookOpen size={16} className="text-[#E53935] flex-shrink-0" />
              <span>Your Success Our Mission</span>
            </div>
          </div>

          {/* Cursive Accent Slogan */}
          <div className="flex items-center gap-3">
            <svg
              className="w-20 sm:w-28 h-5 text-[#E53935] hidden sm:block"
              viewBox="0 0 120 20"
              fill="none"
            >
              <path
                d="M4 16 C40 2 80 18 116 4"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M20 18 C55 8 85 20 110 10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.6"
              />
            </svg>
            <span className="font-['Caveat',cursive] text-lg sm:text-xl font-bold text-white tracking-wide select-none">
              Dream <span className="text-[#E53935]">|</span> Prepare{' '}
              <span className="text-[#E53935]">|</span> Achieve
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Credits */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        <p className="text-center sm:text-left">
          © 2026{' '}
          <Link
            to="/"
            className="text-slate-200 hover:text-white transition-colors underline decoration-slate-600 underline-offset-2"
          >
            Best Solution Coaching Classes
          </Link>
          . All rights reserved.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-slate-400">
          <span className="hidden sm:inline text-white/20">|</span>
          <span>
            Designed & Developed by{' '}
            <span className="text-[#E53935] font-semibold">
              Best Solution Team
            </span>
          </span>
          <span className="text-white/20">|</span>
          <span className="inline-flex items-center gap-1">
            Made with <span className="text-[#E53935]">❤️</span> in India
          </span>
        </div>
      </div>
    </footer>
  );
}
