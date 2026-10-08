import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle2, User, Phone, MapPin, School, Calendar, Upload, AlertCircle } from 'lucide-react';
import starTestData from '../content/starTest.json';

export default function StarTestForm() {
  const [searchParams] = useSearchParams();
  const sourceParam = searchParams.get('src');

  const defaultSource = sourceParam === 'pamphlet' 
    ? 'Pamphlet / Poster (पर्चे / पोस्टर से)'
    : starTestData.sources[0];

  const [form, setForm] = useState({
    fullName: '',
    grade: '10th',
    schoolName: '',
    parentName: '',
    mobile: '',
    whatsapp: '',
    sameAsMobile: true,
    city: 'Indore',
    district: 'Indore',
    state: 'Madhya Pradesh',
    dob: '',
    targetStream: 'IIT-JEE',
    source: defaultSource,
    declaration: false,
  });

  const [photoName, setPhotoName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (sourceParam === 'pamphlet') {
      setForm((prev) => ({ ...prev, source: 'Pamphlet / Poster (पर्चे / पोस्टर से)' }));
    }
  }, [sourceParam]);

  const handleChange = (field) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((prev) => {
      const next = { ...prev, [field]: val };
      if (field === 'mobile' && prev.sameAsMobile) {
        next.whatsapp = val;
      }
      if (field === 'sameAsMobile' && val) {
        next.whatsapp = prev.mobile;
      }
      return next;
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoName(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.fullName.trim()) return setError('कृपया विद्यार्थी का पूरा नाम दर्ज करें');
    if (!form.mobile.trim() || form.mobile.replace(/\D/g, '').length < 10) {
      return setError('कृपया मान्य 10 अंकों का मोबाइल नंबर दर्ज करें');
    }
    if (!form.schoolName.trim()) return setError('कृपया स्कूल का नाम दर्ज करें');
    if (!form.parentName.trim()) return setError('कृपया माता/पिता/अभिभावक का नाम दर्ज करें');
    if (!form.declaration) return setError('कृपया घोषणा पत्र (Declaration) स्वीकार करें');

    setSubmitting(true);

    const submissionData = {
      'form-name': 'star-scholarship-registration',
      fullName: form.fullName.trim(),
      grade: form.grade,
      schoolName: form.schoolName.trim(),
      parentName: form.parentName.trim(),
      mobile: form.mobile.trim(),
      whatsapp: (form.sameAsMobile ? form.mobile : form.whatsapp).trim(),
      city: form.city.trim(),
      district: form.district.trim(),
      state: form.state,
      dob: form.dob || 'Not provided',
      targetStream: form.targetStream,
      source: form.source,
      photoName: photoName || 'No photo',
      submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    };

    try {
      // 1. Dual-submit to Netlify Forms for guaranteed backend lead backup
      try {
        await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(submissionData).toString(),
        });
      } catch (netErr) {
        console.warn('Netlify form submission note:', netErr);
      }

      // 2. Dual-submit to Google Sheets Webhook if URL is configured
      if (starTestData.googleSheetWebhookUrl) {
        try {
          await fetch(starTestData.googleSheetWebhookUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(submissionData),
          });
        } catch (sheetErr) {
          console.warn('Google Sheet sync note:', sheetErr);
        }
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
      setError('पंजीकरण सबमिट करने में समस्या आई। कृपया पुनः प्रयास करें या 9425959956 पर कॉल करें।');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-3xl border border-red-100 bg-white p-8 sm:p-12 text-center shadow-xl shadow-red-500/5 max-w-2xl mx-auto">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-5 text-3xl font-black">
          ✓
        </div>
        <span className="inline-block px-3 py-1 rounded-full bg-red-50 text-[#D32F2F] text-xs font-bold uppercase tracking-widest mb-3">
          STAR Scholarship Test 2027
        </span>
        <h3 className="text-2xl sm:text-3xl font-black text-[#0A0A0A] tracking-tight">
          पंजीकरण सफलतापूर्वक दर्ज हुआ!
        </h3>
        <p className="mt-1 text-sm font-semibold text-slate-500">
          Registration Successful!
        </p>

        <div className="mt-6 p-5 rounded-2xl bg-slate-50 border border-slate-200/80 text-left space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">विद्यार्थी का नाम:</span>
            <span className="font-bold text-[#0A0A0A]">{form.fullName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">कक्षा (Class):</span>
            <span className="font-bold text-[#D32F2F]">{form.grade}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">मोबाइल नंबर:</span>
            <span className="font-bold text-[#0A0A0A]">{form.mobile}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">स्कूल:</span>
            <span className="font-bold text-[#0A0A0A]">{form.schoolName}</span>
          </div>
        </div>

        <p className="mt-6 text-sm text-slate-600 leading-relaxed">
          धन्यवाद <strong className="text-black">{form.fullName}</strong>! आपका पंजीकरण स्वीकार कर लिया गया है।
          Best Solution की काउंसलिंग टीम एडमिट कार्ड और टेस्ट स्लॉट की जानकारी के लिए जल्द ही आपसे फ़ोन व WhatsApp पर संपर्क करेगी।
        </p>

        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={starTestData.venue.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#D32F2F] text-white font-bold text-sm hover:bg-[#B71C1C] transition-colors shadow-sm"
          >
            <MapPin size={16} />
            सेंटर का मैप देखें (Directions)
          </a>
          <button
            onClick={() => {
              setSubmitted(false);
              setForm({
                fullName: '',
                grade: '10th',
                schoolName: '',
                parentName: '',
                mobile: '',
                whatsapp: '',
                sameAsMobile: true,
                city: 'Indore',
                district: 'Indore',
                state: 'Madhya Pradesh',
                dob: '',
                targetStream: 'IIT-JEE',
                source: defaultSource,
                declaration: false,
              });
              setPhotoName('');
            }}
            className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-[#D32F2F] transition-colors py-2"
          >
            एक और रजिस्ट्रेशन करें (New Registration)
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      name="star-scholarship-registration"
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl border border-red-100 p-6 sm:p-10 shadow-2xl shadow-red-950/5 relative"
    >
      <input type="hidden" name="form-name" value="star-scholarship-registration" />

      {/* Header */}
      <div className="border-b border-slate-100 pb-5 mb-6">
        <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#D32F2F] uppercase mb-1">
          <CheckCircle2 size={15} />
          ONLINE STUDENT REGISTRATION
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-[#0A0A0A] tracking-tight">
          विद्यार्थी पंजीकरण फॉर्म (2026–27)
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          कृपया सभी अनिवार्य (*) जानकारी सही-सही भरें ताकि टेस्ट और स्कॉलरशिप की जानकारी आप तक पहुँच सके।
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-[#D32F2F] text-xs sm:text-sm flex items-center gap-2.5 font-medium">
          <AlertCircle size={18} className="flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* 1. Full Name */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            1. विद्यार्थी का पूरा नाम <span className="text-[#D32F2F]">*</span>
          </label>
          <div className="relative">
            <User size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              required
              value={form.fullName}
              onChange={handleChange('fullName')}
              placeholder="Full Name (e.g. Rahul Sharma)"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#D32F2F] focus:ring-2 focus:ring-[#D32F2F]/10 outline-none transition-all"
            />
          </div>
        </div>

        {/* 2. Current Grade */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            2. वर्तमान कक्षा (Current Class) <span className="text-[#D32F2F]">*</span>
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {starTestData.classes.map((cls) => (
              <button
                type="button"
                key={cls}
                onClick={() => setForm((p) => ({ ...p, grade: cls }))}
                className={`py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                  form.grade === cls
                    ? 'bg-[#D32F2F] border-[#D32F2F] text-white shadow-md'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {cls} वीं
              </button>
            ))}
          </div>
        </div>

        {/* 3. School Name */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            3. स्कूल का नाम (School Name) <span className="text-[#D32F2F]">*</span>
          </label>
          <div className="relative">
            <School size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              required
              value={form.schoolName}
              onChange={handleChange('schoolName')}
              placeholder="e.g. DPS Indore / St. Paul / Govt. School"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#D32F2F] focus:ring-2 focus:ring-[#D32F2F]/10 outline-none transition-all"
            />
          </div>
        </div>

        {/* 4. Parent Name */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            4. माता / पिता / अभिभावक का नाम <span className="text-[#D32F2F]">*</span>
          </label>
          <input
            type="text"
            required
            value={form.parentName}
            onChange={handleChange('parentName')}
            placeholder="Father's / Mother's Name"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#D32F2F] focus:ring-2 focus:ring-[#D32F2F]/10 outline-none transition-all"
          />
        </div>

        {/* 5. Student Mobile */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            5. विद्यार्थी का मोबाइल नंबर <span className="text-[#D32F2F]">*</span>
          </label>
          <div className="relative">
            <Phone size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="tel"
              required
              maxLength={10}
              value={form.mobile}
              onChange={handleChange('mobile')}
              placeholder="10-digit Mobile No."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#D32F2F] focus:ring-2 focus:ring-[#D32F2F]/10 outline-none transition-all font-mono"
            />
          </div>
        </div>

        {/* 6. WhatsApp Number */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              6. WhatsApp नंबर
            </label>
            <label className="inline-flex items-center gap-1.5 text-[11px] text-slate-500 cursor-pointer">
              <input
                type="checkbox"
                checked={form.sameAsMobile}
                onChange={handleChange('sameAsMobile')}
                className="rounded border-slate-300 text-[#D32F2F] focus:ring-[#D32F2F]"
              />
              मोबाइल जैसा ही
            </label>
          </div>
          <input
            type="tel"
            maxLength={10}
            disabled={form.sameAsMobile}
            value={form.sameAsMobile ? form.mobile : form.whatsapp}
            onChange={handleChange('whatsapp')}
            placeholder="WhatsApp Mobile No."
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#D32F2F] focus:ring-2 focus:ring-[#D32F2F]/10 outline-none transition-all font-mono disabled:bg-slate-50 disabled:text-slate-500"
          />
        </div>

        {/* 7. City */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            7. शहर (City) <span className="text-[#D32F2F]">*</span>
          </label>
          <input
            type="text"
            required
            value={form.city}
            onChange={handleChange('city')}
            placeholder="City"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#D32F2F] focus:ring-2 focus:ring-[#D32F2F]/10 outline-none transition-all"
          />
        </div>

        {/* 8. District */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            8. जिला (District) <span className="text-[#D32F2F]">*</span>
          </label>
          <input
            type="text"
            required
            value={form.district}
            onChange={handleChange('district')}
            placeholder="District"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#D32F2F] focus:ring-2 focus:ring-[#D32F2F]/10 outline-none transition-all"
          />
        </div>

        {/* 9. State */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            9. राज्य (State) <span className="text-[#D32F2F]">*</span>
          </label>
          <select
            value={form.state}
            onChange={handleChange('state')}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#D32F2F] focus:ring-2 focus:ring-[#D32F2F]/10 outline-none transition-all bg-white"
          >
            <option value="Madhya Pradesh">Madhya Pradesh (मध्य प्रदेश)</option>
            <option value="Other">Other (अन्य राज्य)</option>
          </select>
        </div>

        {/* 10. Date of Birth */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            10. विद्यार्थी की जन्मतिथि (DOB)
          </label>
          <div className="relative">
            <Calendar size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="date"
              value={form.dob}
              onChange={handleChange('dob')}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#D32F2F] focus:ring-2 focus:ring-[#D32F2F]/10 outline-none transition-all text-slate-700"
            />
          </div>
        </div>

        {/* 11. Target Stream */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            11. आगे किस क्षेत्र में रुचि है? (Target Stream) <span className="text-[#D32F2F]">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {starTestData.streams.map((stream) => (
              <button
                type="button"
                key={stream}
                onClick={() => setForm((p) => ({ ...p, targetStream: stream }))}
                className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                  form.targetStream === stream
                    ? 'bg-[#0A0A0A] border-[#0A0A0A] text-white shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {stream}
              </button>
            ))}
          </div>
        </div>

        {/* 12. Source */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            12. आप STAR TEST के बारे में कैसे जानते हैं? (How did you know?)
          </label>
          <select
            value={form.source}
            onChange={handleChange('source')}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#D32F2F] focus:ring-2 focus:ring-[#D32F2F]/10 outline-none transition-all bg-white"
          >
            {starTestData.sources.map((src) => (
              <option key={src} value={src}>
                {src}
              </option>
            ))}
          </select>
        </div>

        {/* 13. Optional Photo */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            13. विद्यार्थी का फोटो (Optional Photo)
          </label>
          <label className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-dashed border-slate-300 hover:border-[#D32F2F] bg-slate-50/50 cursor-pointer transition-colors">
            <Upload size={16} className="text-slate-400 flex-shrink-0" />
            <span className="text-xs text-slate-500 truncate">
              {photoName ? `चयनित फ़ाइल: ${photoName}` : 'Upload JPG/PNG (Optional)'}
            </span>
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Declaration Checkbox */}
      <div className="mt-6 pt-5 border-t border-slate-100">
        <label className="flex items-start gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            required
            checked={form.declaration}
            onChange={handleChange('declaration')}
            className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#D32F2F] focus:ring-[#D32F2F]"
          />
          <span className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
            मैं दी गई जानकारी सही होने की पुष्टि करता/करती हूँ और <strong>STAR Scholarship Test 2027</strong> में भाग लेने के लिए सहमत हूँ।
          </span>
        </label>
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-4 rounded-full bg-gradient-to-r from-[#D32F2F] via-[#B71C1C] to-[#8B0000] text-white font-black text-sm sm:text-base tracking-wide shadow-lg shadow-red-500/25 hover:opacity-95 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {submitting ? (
            <span>पंजीकरण दर्ज किया जा रहा है...</span>
          ) : (
            <>
              <span>रजिस्ट्रेशन सबमिट करें (SUBMIT REGISTRATION)</span>
              <span>→</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
