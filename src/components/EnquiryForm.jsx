import { useState } from 'react';
import settingsData from '../content/settings.json';

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-widest text-slate-600 mb-1.5">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  'w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-[#0A0A0A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/20 focus:border-[#D32F2F] transition-colors';

export default function EnquiryForm({ title = 'Book a free demo class', subtitle = 'Fill this quick form. Our counsellor will call you within 2 hours.' }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', phone: '', email: '', grade: '', course: '', message: '',
  });

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-3xl border border-black/10 bg-white shadow-sm p-8 sm:p-10 text-center flex flex-col items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-4 text-2xl font-bold">
          ✓
        </div>
        <h3 className="text-2xl font-black text-[#0A0A0A] tracking-tight">
          Enquiry Received!
        </h3>
        <p className="mt-2 text-sm text-slate-600 max-w-md">
          Thank you <span className="font-semibold text-black">{form.name}</span>. Our counsellor will call you at <span className="font-mono font-semibold text-black">{form.phone}</span> within 2 hours to answer all your questions.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm({ name: '', phone: '', email: '', grade: '', course: '', message: '' });
          }}
          className="mt-6 text-xs font-bold uppercase tracking-wider text-[#D32F2F] hover:underline"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      className="rounded-3xl border border-black/10 bg-white shadow-sm p-6 sm:p-8"
      onSubmit={handleSubmit}
      name="enquiry"
    >
      <div className="mb-6">
        <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0A0A0A]">
          {title}
        </h3>
        <p className="mt-2 text-sm text-slate-600">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Full Name">
          <input
            type="text"
            placeholder="Aditya Bhardwaj"
            className={inputClass}
            value={form.name}
            onChange={update('name')}
          />
        </Field>
        <Field label="Mobile">
          <input
            type="tel"
            placeholder="94259 59956"
            className={`${inputClass} font-mono`}
            value={form.phone}
            onChange={update('phone')}
          />
        </Field>
        <Field label="Email (optional)">
          <input
            type="email"
            placeholder="you@example.com"
            className={inputClass}
            value={form.email}
            onChange={update('email')}
          />
        </Field>
        <Field label="Class / Grade">
          <select
            className={inputClass}
            value={form.grade}
            onChange={update('grade')}
          >
            <option value="">Select…</option>
            {settingsData.gradeOptions.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-4">
        <Field label="Interested in">
          <select
            className={inputClass}
            value={form.course}
            onChange={update('course')}
          >
            <option value="">Select course…</option>
            {settingsData.courseOptions.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-4">
        <Field label="Message (optional)">
          <textarea
            rows={3}
            placeholder="Anything you'd like our counsellor to know..."
            className={`${inputClass} resize-none`}
            value={form.message}
            onChange={update('message')}
          />
        </Field>
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-xl bg-[#D32F2F] text-white py-3.5 text-sm font-bold hover:bg-[#B71C1C] transition-colors"
      >
        Submit Enquiry
      </button>
      <p className="mt-3 text-center text-xs text-slate-500">
        By submitting, you agree to receive a call/WhatsApp from our counsellor.
      </p>
    </form>
  );
}
