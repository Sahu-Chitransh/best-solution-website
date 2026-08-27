import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, ChevronDown } from 'lucide-react';
import { NAV_LINKS } from '../data/site';
import settingsData from '../content/settings.json';

/* ── Dropdown wrapper for desktop nav items with children ── */
function NavDropdown({ link, isActive }) {
  const [open, setOpen] = useState(false);
  const timeout = useRef(null);
  const ref = useRef(null);

  const enter = () => {
    clearTimeout(timeout.current);
    setOpen(true);
  };
  const leave = () => {
    timeout.current = setTimeout(() => setOpen(false), 150);
  };

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    return () => clearTimeout(timeout.current);
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={enter}
      onMouseLeave={leave}
      onFocus={enter}
      onBlur={leave}
      aria-haspopup="true"
      aria-expanded={open}
    >
      <Link
        to={link.href}
        className={`inline-flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors ${
          isActive
            ? 'text-[#D32F2F] border-b-2 border-[#D32F2F]'
            : 'text-[#0A0A0A] hover:text-[#D32F2F]'
        }`}
      >
        {link.label}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </Link>

      {/* Dropdown panel */}
      <div
        className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-200 ${
          open
            ? 'opacity-100 visible translate-y-0'
            : 'opacity-0 invisible -translate-y-1'
        }`}
      >
        <div className="w-64 rounded-2xl bg-white border border-black/8 shadow-xl shadow-black/8 overflow-hidden">
          {link.children.map((child, i) => (
            <Link
              key={i}
              to={child.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors group"
            >
              {/* Color dot */}
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0 group-hover:scale-125 transition-transform"
                style={{ backgroundColor: child.color }}
              />
              <div>
                <div className="text-sm font-semibold text-[#0A0A0A] group-hover:text-[#D32F2F] transition-colors">
                  {child.label}
                </div>
                {child.subtitle && (
                  <div className="text-[11px] text-slate-500">
                    {child.subtitle}
                  </div>
                )}
              </div>
            </Link>
          ))}

          {/* View all link */}
          <div className="border-t border-black/5 px-4 py-2.5">
            <Link
              to={link.href}
              onClick={() => setOpen(false)}
              className="text-xs font-bold text-[#D32F2F] uppercase tracking-widest hover:underline"
            >
              View all programs →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Mobile accordion for nav items with children ── */
function MobileDropdown({ link, isActive, onNavigate }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <div className="flex items-center">
        <Link
          to={link.href}
          onClick={onNavigate}
          className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg ${
            isActive
              ? 'text-[#D32F2F] bg-[#FFEBEE]'
              : 'text-[#0A0A0A] hover:bg-slate-50'
          }`}
        >
          {link.label}
        </Link>
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-2 text-slate-500 hover:text-[#D32F2F] transition-colors"
          aria-label={`Expand ${link.label}`}
        >
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {expanded && (
        <div className="ml-4 mt-1 mb-2 space-y-0.5 border-l-2 border-slate-200 pl-3">
          {link.children.map((child, i) => (
            <Link
              key={i}
              to={child.href}
              onClick={onNavigate}
              className="flex items-center gap-2.5 px-2 py-1.5 text-sm text-slate-700 hover:text-[#D32F2F] transition-colors rounded"
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: child.color }}
              />
              <span>{child.label}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-18">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img src={settingsData.logo} alt="Best Solution" className="h-14 w-auto rounded" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;

            if (link.children) {
              return (
                <NavDropdown key={link.href} link={link} isActive={isActive} />
              );
            }

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

              if (link.children) {
                return (
                  <MobileDropdown
                    key={link.href}
                    link={link}
                    isActive={isActive}
                    onNavigate={() => setOpen(false)}
                  />
                );
              }

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
