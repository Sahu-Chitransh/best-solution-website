import React, { useEffect, useRef } from 'react';
import { ClipboardList, Users, FileText, CalendarCheck } from 'lucide-react';
import EnquiryForm from '../components/EnquiryForm';
import admissionsData from '../content/admissions.json';

function useScrollReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return ref;
}

const iconMap = { ClipboardList, Users, FileText, CalendarCheck };

export default function Admissions() {
  const revealRef1 = useScrollReveal();
  const revealRef2 = useScrollReveal();
  const revealRef3 = useScrollReveal();

  const steps = admissionsData.steps.map(step => ({
    ...step,
    icon: iconMap[step.icon] || ClipboardList
  }));

  const documents = admissionsData.documents;

  return (
    <div className="bg-white min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Hero Section */}
        <div ref={revealRef1} className="text-center space-y-6 opacity-0 translate-y-8 transition-all duration-700 ease-out flex flex-col items-center">
          <div className="text-[#D32F2F] bg-[#FFEBEE] rounded-full uppercase tracking-widest text-xs font-semibold px-3 py-1 inline-block">
            ADMISSIONS OPEN · BATCH {admissionsData.sessionYear}
          </div>
          <h1 className="text-[#0A0A0A] font-black text-5xl sm:text-6xl md:text-7xl tracking-tighter">
            Four honest steps.<br />
            <span className="text-[#D32F2F]">Zero paperwork drama.</span>
          </h1>
          <p className="text-slate-600 max-w-3xl mx-auto text-lg">
            Our admissions process is designed to respect a family's time. No aggressive sales, no hidden test fees.
          </p>
        </div>

        {/* 4-Step Process */}
        <div ref={revealRef2} className="opacity-0 translate-y-8 transition-all duration-700 ease-out delay-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="rounded-2xl border border-black/8 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-3">
                    {step.label}
                  </div>
                  <Icon className="text-[#D32F2F] w-7 h-7 mb-3" />
                  <h3 className="font-bold text-[#0A0A0A] text-lg">{step.title}</h3>
                  <p className="text-sm text-slate-600 mt-1">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Two-Column Section */}
        <div ref={revealRef3} className="grid grid-cols-1 lg:grid-cols-12 gap-8 opacity-0 translate-y-8 transition-all duration-700 ease-out delay-200">
          {/* Left Column */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-[#0A0A0A]">Documents you'll need</h2>
              <ul className="space-y-4">
                {(documents || []).map((doc, idx) => {
                  const docText = typeof doc === 'string' ? doc : doc.document || Object.values(doc)[0] || '';
                  return (
                    <li key={idx} className="flex items-center gap-4">
                      <span className="text-[#D32F2F] font-mono font-bold text-lg">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="text-slate-700 font-medium">{docText}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="bg-[#0A0A0A] rounded-2xl p-6 text-white mt-auto">
              <div className="text-xs uppercase tracking-widest text-amber-400 font-mono font-bold mb-4">
                KEY DATES
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <span className="text-slate-400 text-sm">Registration opens</span>
                  <span className="text-white font-bold font-mono text-sm">{admissionsData.keyDates.registrationOpens}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <span className="text-slate-400 text-sm">Scholarship Test</span>
                  <span className="text-white font-bold font-mono text-sm">{admissionsData.keyDates.scholarshipTest}</span>
                </div>
                <div className="flex justify-between items-center pb-1">
                  <span className="text-slate-400 text-sm">Batch commences</span>
                  <span className="text-white font-bold font-mono text-sm">{admissionsData.keyDates.batchCommences}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7">
            <EnquiryForm 
              title="Start your application" 
              subtitle="Takes 60 seconds. Our counsellor will call to schedule the diagnostic." 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
