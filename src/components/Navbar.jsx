import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../data/site';
import settingsData from '../content/settings.json';

export default function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img src={settingsData.logo} alt="Best Solution" className="h-10 w-auto rounded" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-[#D32F2F] border-b-2 border-[#D32F2F]'
                    : 'text-[#0A0A0A] hover:text-[#D32F2F]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <a
            href={settingsData.phoneLink}
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-[#0A0A0A]"
          >
            <Phone size={16} />
            <span className="tracking-wide">{settingsData.phone}</span>
          </a>
          <Link
            to="/admissions"
            className="hidden sm:inline-flex items-center rounded-full bg-[#D32F2F] text-white px-5 py-2 text-sm font-bold hover:bg-[#B71C1C] transition-colors"
          >
            Enroll Now
          </Link>
          <button
            className="lg:hidden p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-black/5 bg-white">
          <div className="px-4 py-4 space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className={`block px-3 py-2 text-sm font-medium rounded-lg ${
                    isActive
                      ? 'text-[#D32F2F] bg-[#FFEBEE]'
                      : 'text-[#0A0A0A] hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-3 border-t border-black/5 flex flex-col gap-2">
              <a
                href={settingsData.phoneLink}
                className="flex items-center gap-2 px-3 py-2 text-sm font-semibold"
              >
                <Phone size={16} /> {settingsData.phone}
              </a>
              <Link
                to="/admissions"
                onClick={() => setOpen(false)}
                className="text-center rounded-full bg-[#D32F2F] text-white px-5 py-2.5 text-sm font-bold"
              >
                Enroll Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
