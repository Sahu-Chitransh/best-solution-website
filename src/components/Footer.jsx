import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';
import contactData from '../content/contact.json';
import settingsData from '../content/settings.json';

// Instagram icon removed from lucide-react in v1.x — using inline SVG
import InstagramIcon from './InstagramIcon';
import { FOOTER_EXPLORE } from '../data/site';

const phoneStr = (p) => typeof p === 'string' ? p : (p && (p.phone || Object.values(p)[0])) || '';

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white">
      {/* Red gradient top line */}
      <div className="h-px bg-gradient-to-r from-[#D32F2F] via-[#D32F2F]/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <img src={settingsData.logo} alt="Best Solution" className="h-12 w-auto rounded mb-6" />
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Best Solution Coaching Classes — training champions for IIT-JEE, NEET, Olympiads, NTSE & CCG since 2010, right in the heart of Vijay Nagar, Indore.
            </p>
            <a
              href={contactData.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm text-[#D32F2F] hover:text-white transition-colors"
            >
              <InstagramIcon size={16} />
              {contactData.instagram.handle}
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
                <span>{contactData.address}</span>
              </div>
              <div className="flex gap-3 text-sm text-slate-400">
                <Phone size={16} className="text-[#D32F2F] flex-shrink-0 mt-0.5" />
                <span className="tracking-wide">
                  {contactData.phones ? contactData.phones.map(phoneStr).join(' · ') : ''}
                </span>
              </div>
              <div className="flex gap-3 text-sm text-slate-400">
                <Mail size={16} className="text-[#D32F2F] flex-shrink-0 mt-0.5" />
                <span>{contactData.email}</span>
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
