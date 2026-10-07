import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Sparkles, Calendar, MapPin, ArrowRight } from 'lucide-react';
import starTestData from '../content/starTest.json';

const STORAGE_KEY = 'star_test_popup_dismissed_until';
const DISMISS_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export default function StarTestPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Don't show the modal on the /star-test page itself
  const isStarTestPage = location.pathname === '/star-test' || location.pathname === '/scholarship';

  useEffect(() => {
    if (isStarTestPage) return;

    const dismissedUntil = localStorage.getItem(STORAGE_KEY);
    const now = Date.now();

    if (!dismissedUntil || now > parseInt(dismissedUntil, 10)) {
      // Trigger after 3.5 seconds delay
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [isStarTestPage]);

  const handleDismiss = () => {
    setIsOpen(false);
    // Dismiss for 24 hours
    localStorage.setItem(STORAGE_KEY, (Date.now() + DISMISS_DURATION).toString());
  };

  const handleReopen = () => {
    setIsOpen(true);
  };

  return (
    <>
      {/* Floating Badge (Repositioned to top-right corner below the top bar) */}
      {!isStarTestPage && (
        <div className="fixed top-[82px] sm:top-[88px] right-3 sm:right-6 z-40 select-none">
          <button
            onClick={handleReopen}
            className="group flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-[#8B0000] via-[#D32F2F] to-[#B71C1C] text-white shadow-lg shadow-red-900/25 border border-amber-300/50 hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-sm"
            title="Open STAR Scholarship Test details"
          >
            <span className="text-sm sm:text-base animate-pulse">⭐</span>
            <div className="text-left leading-tight">
              <div className="text-[11px] sm:text-xs font-black text-[#FFD700] uppercase tracking-wider flex items-center gap-1">
                <span>STAR Test 2027</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
              <div className="text-[9px] sm:text-[10px] text-white/90 font-medium">
                Upto 90% Scholarship
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Main Popup Modal */}
      {isOpen && !isStarTestPage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-lg rounded-3xl overflow-hidden bg-gradient-to-br from-[#8B0000] via-[#A81010] to-[#5C0000] text-white shadow-2xl border-2 border-amber-400/30 animate-in zoom-in-95 duration-200"
            role="dialog"
            aria-modal="true"
          >
            {/* Close Button */}
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
              aria-label="Close popup"
            >
              <X size={18} />
            </button>

            {/* Top Poster Art */}
            <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-black/20">
              <img
                src={starTestData.images.posterCard}
                alt="STAR Scholarship Test"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#8B0000] via-transparent to-black/30" />
            </div>

            {/* Popup Content */}
            <div className="p-6 sm:p-7 pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-[#FFD700] text-[11px] font-black uppercase tracking-wider mb-2">
                <Sparkles size={12} />
                <span>ADMISSIONS 2026-27 & 2027-28</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
                BEST SOLUTION STAR SCHOLARSHIP TEST
              </h2>
              <p className="text-xs sm:text-sm text-amber-100 font-['Caveat',cursive] text-lg font-bold mt-1">
                &ldquo;{starTestData.hindiTitle}&rdquo;
              </p>

              {/* Highlights 3-column pill */}
              <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                <div className="p-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                  <div className="text-[10px] text-amber-200 font-bold uppercase">Scholarship</div>
                  <div className="text-sm sm:text-base font-black text-[#FFD700]">UPTO 90%</div>
                </div>

                <div className="p-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                  <div className="text-[10px] text-amber-200 font-bold uppercase">Reward Pool</div>
                  <div className="text-sm sm:text-base font-black text-white">5.0 CR</div>
                </div>

                <div className="p-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                  <div className="text-[10px] text-amber-200 font-bold uppercase">Eligible</div>
                  <div className="text-sm sm:text-base font-black text-[#FFD700]">Class 6–11</div>
                </div>
              </div>

              {/* Dates & Location */}
              <div className="mt-4 p-3 rounded-2xl bg-black/25 text-xs text-white/90 space-y-1.5">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-amber-400 flex-shrink-0" />
                  <span><strong>परीक्षा तिथियाँ:</strong> 04 Oct · 25 Oct · 22 Nov 2026</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-amber-400 flex-shrink-0" />
                    <span>18/19 Vijay Nagar, Indore</span>
                  </div>
                  <a
                    href={starTestData.venue.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-300 hover:underline font-semibold"
                  >
                    View Map →
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 flex flex-col sm:flex-row gap-2.5">
                <Link
                  to="/star-test#register"
                  onClick={handleDismiss}
                  className="flex-1 py-3 px-5 rounded-full bg-[#FFD700] hover:bg-[#FFC700] text-[#8B0000] font-black text-center text-sm shadow-lg shadow-amber-500/20 hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2"
                >
                  <span>निःशुल्क रजिस्टर करें (Register Free)</span>
                  <ArrowRight size={16} />
                </Link>

                <button
                  onClick={handleDismiss}
                  className="py-3 px-4 rounded-full bg-white/10 hover:bg-white/15 text-white/80 font-bold text-center text-xs transition-colors"
                >
                  बाद में देखें (Dismiss)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
