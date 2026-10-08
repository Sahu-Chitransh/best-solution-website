import { MapPin, Navigation, Phone, ArrowUpRight } from 'lucide-react';
import starTestData from '../content/starTest.json';

export default function StarTestMap() {
  const { venue, contacts } = starTestData;

  return (
    <div className="bg-white rounded-3xl border border-red-100 overflow-hidden shadow-xl shadow-red-500/5">
      <div className="p-6 bg-gradient-to-br from-red-50/70 via-white to-amber-50/50 border-b border-red-100">
        <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#D32F2F] uppercase mb-1">
          <MapPin size={15} />
          TEST EXAMINATION CENTER
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-[#0A0A0A] tracking-tight">
          {venue.title}
        </h3>
        <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
          {venue.address}
        </p>

        <div className="mt-4">
          <a
            href={venue.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#D32F2F] hover:bg-[#B71C1C] text-white font-bold text-xs sm:text-sm shadow-md shadow-red-500/20 hover:scale-102 active:scale-98 transition-all"
          >
            <Navigation size={15} />
            <span>मैप पर रास्ता देखें (Get Directions)</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>

      {/* Embedded Map */}
      <div className="relative h-[340px] sm:h-[400px] w-full bg-slate-100">
        <iframe
          src={venue.mapEmbed}
          className="w-full h-full border-0"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Best Solution STAR Test Center Map"
        />

        {/* Contact Strip pinned at bottom */}
        <div className="absolute bottom-3 left-3 right-3 sm:left-4 sm:right-auto z-10 bg-white/95 backdrop-blur-md rounded-2xl border border-black/10 p-3 sm:p-4 shadow-lg flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#D32F2F] text-white flex items-center justify-center flex-shrink-0">
            <Phone size={16} />
          </div>
          <div className="text-xs">
            <div className="text-slate-500 font-semibold uppercase tracking-wider">हेल्पलाइन नंबर:</div>
            <div className="font-bold text-[#0A0A0A] text-sm flex gap-2">
              {contacts.map((c, i) => (
                <a key={i} href={c.link} className="hover:text-[#D32F2F] transition-colors">
                  {c.phone}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
