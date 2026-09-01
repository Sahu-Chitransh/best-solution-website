import { useState } from 'react';
import { Phone, MessageCircle, X } from 'lucide-react';
import contactData from '../content/contact.json';
import settings from '../content/settings.json';

const phoneStr = (p) => typeof p === 'string' ? p : (p && (p.phone || Object.values(p)[0])) || '';

export default function FloatingSocials() {
  const [open, setOpen] = useState(false);

  const primaryPhone = phoneStr(contactData.phones?.[0]) || '9425959956';

  const socials = [
    {
      label: 'WhatsApp',
      href: `https://wa.me/91${primaryPhone.replace(/\D/g, '')}`,
      target: '_blank',
      bg: '#25D366',
      icon: (
        <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
    },
    {
      label: 'Call Us',
      href: settings.phoneLink,
      target: undefined,
      bg: '#D32F2F',
      icon: <Phone className="w-5 h-5 text-white" strokeWidth={2} />,
    },
    {
      label: 'Instagram',
      href: contactData.instagram.url,
      target: '_blank',
      bg: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
      icon: (
        <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="fixed bottom-6 right-4 z-50 flex items-center gap-3">
      {/* Social icons row — pops out horizontally to the left */}
      {socials.map((s, i) => (
        <a
          key={s.label}
          href={s.href}
          target={s.target}
          rel={s.target ? 'noopener noreferrer' : undefined}
          aria-label={s.label}
          className="bs-social-icon group relative flex items-center justify-center w-11 h-11 rounded-full shadow-lg"
          style={{
            background: s.bg,
            transitionDelay: open ? `${(socials.length - 1 - i) * 80}ms` : `${i * 50}ms`,
            opacity: open ? 1 : 0,
            transform: open ? 'scale(1) translateX(0)' : 'scale(0.3) translateX(20px)',
            pointerEvents: open ? 'auto' : 'none',
          }}
        >
          {s.icon}
          {/* Tooltip above */}
          <span className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-900 text-white text-[11px] font-medium px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-md">
            {s.label}
            <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
          </span>
        </a>
      ))}

      {/* Main toggle button with sparkle */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close social links' : 'Open social links'}
        className="bs-sparkle-btn relative flex items-center justify-center w-14 h-14 rounded-full shadow-xl transition-all duration-400 hover:shadow-2xl"
        style={{
          background: open
            ? '#374151'
            : 'linear-gradient(135deg, #D32F2F 0%, #FF5252 100%)',
        }}
      >
        {/* Sparkle particles */}
        {!open && (
          <>
            <span className="bs-sparkle bs-sparkle-1" />
            <span className="bs-sparkle bs-sparkle-2" />
            <span className="bs-sparkle bs-sparkle-3" />
            <span className="bs-sparkle bs-sparkle-4" />
            <span className="bs-sparkle bs-sparkle-5" />
            <span className="bs-sparkle bs-sparkle-6" />
          </>
        )}

        {/* Icon transition */}
        <span
          className="absolute transition-all duration-300"
          style={{
            opacity: open ? 0 : 1,
            transform: open ? 'rotate(90deg) scale(0.5)' : 'rotate(0) scale(1)',
          }}
        >
          <MessageCircle className="w-7 h-7 text-white" strokeWidth={2} />
        </span>
        <span
          className="absolute transition-all duration-300"
          style={{
            opacity: open ? 1 : 0,
            transform: open ? 'rotate(0) scale(1)' : 'rotate(-90deg) scale(0.5)',
          }}
        >
          <X className="w-7 h-7 text-white" strokeWidth={2} />
        </span>
      </button>
    </div>
  );
}
