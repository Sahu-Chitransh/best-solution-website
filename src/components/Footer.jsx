import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';

// Instagram icon removed from lucide-react in v1.x — using inline SVG
function InstagramIcon({ size = 16 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
import { FOOTER_EXPLORE, CONTACT_INFO, LOGO_IMAGE } from '../data/site';

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white">
      {/* Red gradient top line */}
      <div className="h-px bg-gradient-to-r from-[#D32F2F] via-[#D32F2F]/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <img src={LOGO_IMAGE} alt="Best Solution" className="h-12 w-auto rounded mb-6" />
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Best Solution Coaching Classes — training champions for IIT-JEE, NEET, Olympiads, NTSE & CCG since 2010, right in the heart of Vijay Nagar, Indore.
            </p>
            <a
              href="https://instagram.com/bestsolutionindore"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm text-[#D32F2F] hover:text-white transition-colors"
            >
              <InstagramIcon size={16} />
              @bestsolutionindore
              <ArrowUpRight size={12} />
            </a>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
              Explore
            </h4>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              {FOOTER_EXPLORE.map((col, ci) => (
                <div key={ci} className="space-y-2">
                  {col.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="block text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
              Reach Us
            </h4>
            <div className="space-y-4">
              <div className="flex gap-3 text-sm text-slate-400">
                <MapPin size={16} className="text-[#D32F2F] flex-shrink-0 mt-0.5" />
                <span>{CONTACT_INFO.address}</span>
              </div>
              <div className="flex gap-3 text-sm text-slate-400">
                <Phone size={16} className="text-[#D32F2F] flex-shrink-0 mt-0.5" />
                <span className="tracking-wide">
                  {CONTACT_INFO.phones.join(' · ')}
                </span>
              </div>
              <div className="flex gap-3 text-sm text-slate-400">
                <Mail size={16} className="text-[#D32F2F] flex-shrink-0 mt-0.5" />
                <span>{CONTACT_INFO.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-slate-500">
            © 2026 Best Solution Coaching Classes. All rights reserved.
          </p>
          <p className="text-xs text-slate-500 font-mono">
            Built in Indore · Made with rigour.
          </p>
        </div>
      </div>
    </footer>
  );
}
