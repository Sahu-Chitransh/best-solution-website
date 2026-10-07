import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Trophy,
  Award,
  Calendar,
  Sparkles,
  Phone,
  Gift,
  HelpCircle,
  Download,
  Share2,
} from 'lucide-react';
import starTestData from '../content/starTest.json';
import StarTestForm from '../components/StarTestForm';
import StarTestMap from '../components/StarTestMap';

export default function StarTest() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to form if #register hash is present
    if (location.hash === '#register') {
      const el = document.getElementById('register');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: starTestData.title,
          text: `${starTestData.hindiTitle} - 90% तक Scholarship व ₹5 Cr Pool. अभी Register करें!`,
          url: window.location.href,
        });
      } catch (err) {
        console.warn('Share cancelled', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen text-[#0A0A0A]">
      {/* Top Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#8B0000] via-[#B71C1C] to-[#5C0000] text-white py-16 sm:py-24">
        {/* Glow & Sparkles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#FFD700]/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#FF4500]/20 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#FFD700] text-xs font-bold uppercase tracking-widest mb-6">
                <Sparkles size={14} />
                <span>BEST SOLUTION PRESENTS · {starTestData.academicSession}</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
                STAR SCHOLARSHIP <br />
                <span className="text-[#FFD700] drop-shadow-md">TEST & REWARD</span>
              </h1>

              {/* Hindi Slogan */}
              <p className="mt-4 text-lg sm:text-2xl font-bold text-amber-100 font-['Caveat',cursive] tracking-wide">
                &ldquo;{starTestData.hindiTitle}&rdquo;
              </p>

              {/* Tagline */}
              <div className="mt-3 inline-block bg-white/10 backdrop-blur-sm border border-amber-400/30 px-4 py-2 rounded-xl text-xs sm:text-sm font-black text-white uppercase tracking-wider">
                {starTestData.tagline}
              </div>

              {/* Key Bullet Highlights */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15">
                  <div className="text-xs text-amber-200 uppercase font-bold tracking-wider">Scholarship</div>
                  <div className="text-xl sm:text-2xl font-black text-[#FFD700] mt-0.5">UPTO 90%</div>
                  <div className="text-[11px] text-white/80 mt-0.5">In Tuition Fee</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15">
                  <div className="text-xs text-amber-200 uppercase font-bold tracking-wider">Scholarship Pool</div>
                  <div className="text-xl sm:text-2xl font-black text-white mt-0.5">5.0 CR</div>
                  <div className="text-[11px] text-white/80 mt-0.5">In Classroom Program</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15">
                  <div className="text-xs text-amber-200 uppercase font-bold tracking-wider">Cash Rewards</div>
                  <div className="text-xl sm:text-2xl font-black text-[#FFD700] mt-0.5">2 LAKH</div>
                  <div className="text-[11px] text-white/80 mt-0.5">Total Excellence Award</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15">
                  <div className="text-xs text-amber-200 uppercase font-bold tracking-wider">Classes</div>
                  <div className="text-xl sm:text-2xl font-black text-white mt-0.5">VI to XI</div>
                  <div className="text-[11px] text-white/80 mt-0.5">Class 6th – 11th</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <a
                  href="#register"
                  className="px-8 py-4 rounded-full bg-[#FFD700] hover:bg-[#FFC700] text-[#8B0000] font-black text-sm sm:text-base tracking-wide shadow-xl shadow-amber-500/25 hover:scale-105 active:scale-95 transition-all"
                >
                  अभी रजिस्टर करें (REGISTER NOW) →
                </a>

                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/25 transition-all"
                >
                  <Share2 size={16} />
                  <span>शेयर करें (Share)</span>
                </button>
              </div>
            </div>

            {/* Right Poster Visual */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-400/40 max-w-sm group">
                <img
                  src={starTestData.images.posterFull}
                  alt="STAR Scholarship Test Poster"
                  className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-500"
                  fetchPriority="high"
                />
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-between text-white text-xs font-bold">
                  <span>📅 04 Oct · 25 Oct · 22 Nov</span>
                  <a
                    href={starTestData.images.posterFull}
                    download="Best-Solution-STAR-Scholarship-Test-Poster.jpg"
                    className="inline-flex items-center gap-1 text-amber-300 hover:text-white transition-colors"
                  >
                    <Download size={14} /> पोस्टर डाउनलोड
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Test Dates Ribbon */}
      <section className="bg-amber-500 py-6 text-[#5C0000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Calendar size={28} className="text-[#8B0000] flex-shrink-0" />
              <div>
                <h3 className="text-base sm:text-lg font-black tracking-tight leading-tight">
                  TEST DATES · परीक्षा की तिथियाँ
                </h3>
                <p className="text-xs sm:text-sm font-semibold opacity-90">
                  अपनी सुविधानुसार किसी भी एक तारीख को टेस्ट दे सकते हैं
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              {starTestData.dates.map((d) => (
                <div
                  key={d.label}
                  className="px-4 py-2 rounded-xl bg-white/90 border border-[#8B0000]/15 shadow-sm text-center"
                >
                  <div className="text-[10px] font-black uppercase tracking-widest text-[#8B0000]">
                    {d.label}
                  </div>
                  <div className="text-sm sm:text-base font-black text-[#0A0A0A]">
                    {d.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Container: Form + Benefits */}
      <section className="py-16 sm:py-24" id="register">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left 7 Columns: Form */}
            <div className="lg:col-span-7">
              <StarTestForm />
            </div>

            {/* Right 5 Columns: Rewards & Campaign Info */}
            <div className="lg:col-span-5 space-y-6">
              {/* Rewards Card */}
              <div className="rounded-3xl bg-white border border-red-100 p-6 sm:p-8 shadow-xl shadow-red-500/5">
                <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#D32F2F] uppercase mb-1">
                  <Trophy size={16} />
                  SCHOLARSHIP & REWARDS
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#0A0A0A] tracking-tight">
                  प्रतिभागिता आपकी, निश्चित उपहार हमारा!
                </h3>

                <div className="mt-6 space-y-4">
                  <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-red-50/70 border border-red-100">
                    <div className="w-10 h-10 rounded-full bg-[#D32F2F] text-white flex items-center justify-center font-bold flex-shrink-0">
                      90%
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0A0A0A] text-sm">90% तक की स्कॉलरशिप</h4>
                      <p className="text-xs text-slate-600 mt-0.5">
                        ट्यूशन फीस में 90% तक की भारी छूट आपकी मेरिट के आधार पर।
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80">
                    <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center flex-shrink-0">
                      <Award size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0A0A0A] text-sm">₹2 Lakh Cash Prize</h4>
                      <p className="text-xs text-slate-600 mt-0.5">
                        शीर्ष 40 विद्यार्थियों को Excellence Award के रूप में ₹5,000 प्रत्येक कैश रिवॉर्ड।
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                    <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                      <Gift size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0A0A0A] text-sm">प्रत्येक प्रतिभागी को निश्चित उपहार</h4>
                      <p className="text-xs text-slate-600 mt-0.5">
                        हर छात्र जो टेस्ट में उपस्थित होगा, उसे Best Solution की ओर से सुनिश्चित उपहार दिया जाएगा।
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* QR Code Campaign Card (For Pamphlets) */}
              <div className="rounded-3xl bg-gradient-to-br from-[#8B0000] to-[#5C0000] text-white p-6 sm:p-8 shadow-xl shadow-red-950/20">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block">
                      OFFLINE PAMPHLET QR
                    </span>
                    <h4 className="text-lg font-black text-white mt-1">
                      पर्चे / पोस्टर का QR कोड
                    </h4>
                  </div>
                  <a
                    href={starTestData.images.qrCode}
                    download="Best-Solution-STAR-Test-QR.png"
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                    title="Download 300 DPI QR Code"
                  >
                    <Download size={18} />
                  </a>
                </div>

                <div className="mt-5 flex items-center gap-5">
                  <div className="w-28 h-28 rounded-2xl bg-white p-2 shadow-md flex-shrink-0 flex items-center justify-center">
                    <img
                      src={starTestData.images.qrCode}
                      alt="STAR Scholarship Test QR Code"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-xs text-white/90 space-y-1">
                    <p className="leading-relaxed">
                      यह हाई-रिज़ॉल्यूशन QR कोड शहर भर के पर्चों (Pamphlets) पर प्रिंट करने के लिए तैयार है।
                    </p>
                    <a
                      href={starTestData.images.qrCode}
                      download="Best-Solution-STAR-Test-QR.png"
                      className="inline-flex items-center gap-1 text-amber-300 hover:underline font-bold pt-1"
                    >
                      <Download size={13} /> 300 DPI QR डाउनलोड करें
                    </a>
                  </div>
                </div>
              </div>

              {/* Direct Helpline */}
              <div className="rounded-3xl bg-white border border-slate-200/80 p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#D32F2F] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Phone size={20} />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
                    कॉल व सहायता हेल्पलाइन
                  </div>
                  <div className="font-black text-[#0A0A0A] text-base sm:text-lg flex flex-wrap gap-2 mt-0.5">
                    {starTestData.contacts.map((c, idx) => (
                      <a
                        key={idx}
                        href={c.link}
                        className="hover:text-[#D32F2F] transition-colors"
                      >
                        {c.phone}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Examination Center Map Section */}
          <div className="mt-16">
            <StarTestMap />
          </div>

          {/* FAQ Section */}
          <div className="mt-16 bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12">
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#D32F2F] uppercase mb-1">
              <HelpCircle size={16} />
              FREQUENTLY ASKED QUESTIONS
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#0A0A0A] tracking-tight">
              अक्सर पूछे जाने वाले प्रश्न (FAQ)
            </h3>

            <div className="mt-8 grid md:grid-cols-2 gap-6 text-sm text-slate-600">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                <h4 className="font-bold text-[#0A0A0A] text-base mb-2">
                  1. टेस्ट में कौन-कौन से छात्र भाग ले सकते हैं?
                </h4>
                <p>
                  वर्तमान में कक्षा 6वीं, 7वीं, 8वीं, 9वीं, 10वीं और 11वीं में पढ़ रहे सभी विद्यार्थी इस परीक्षा में भाग ले सकते हैं।
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                <h4 className="font-bold text-[#0A0A0A] text-base mb-2">
                  2. क्या इस टेस्ट के लिए कोई रजिस्ट्रेशन शुल्क (Fee) है?
                </h4>
                <p>
                  नहीं! STAR Scholarship Test 2027 में रजिस्ट्रेशन पूर्णतः निःशुल्क (FREE) है।
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                <h4 className="font-bold text-[#0A0A0A] text-base mb-2">
                  3. टेस्ट का सिलेबस क्या रहेगा?
                </h4>
                <p>
                  टेस्ट में विद्यार्थी की वर्तमान कक्षा के साइंस, गणित (Maths) और मेंटल एबिलिटी (Mental Aptitude) पर आधारित बहुविकल्पीय (MCQ) प्रश्न पूछे जाएंगे।
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                <h4 className="font-bold text-[#0A0A0A] text-base mb-2">
                  4. टेस्ट का रिजल्ट कब और कैसे मिलेगा?
                </h4>
                <p>
                  टेस्ट के 7 दिनों के भीतर रिजल्ट घोषित किया जाएगा और विद्यार्थी के रजिस्टर्ड मोबाइल नंबर व WhatsApp पर सूचित किया जाएगा।
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
