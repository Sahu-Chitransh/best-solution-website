import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, MessageSquare, Send, ArrowRight } from 'lucide-react';
import InstagramIcon from '../components/InstagramIcon';
import contactData from '../content/contact.json';

const phoneStr = (p) => typeof p === 'string' ? p : (p && (p.phone || Object.values(p)[0])) || '';

// Scroll reveal hook
const useScrollReveal = () => {
  const ref = useRef(null);
  
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
        }
      },
      { threshold: 0.1 }
    );
    
    observer.observe(el);
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  return ref;
};

const Contact = () => {
  const heroRef = useScrollReveal();
  const leftColRef = useScrollReveal();
  const rightColRef = useScrollReveal();
  const mapRef = useScrollReveal();

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile) return;
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ 'form-name': 'contact', ...formData }).toString(),
      });
    } catch (err) {
      console.error('Contact form submission error:', err);
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans">
      
      {/* 1. HERO */}
      <div 
        ref={heroRef}
        className="mb-16 opacity-0 translate-y-8 transition-all duration-1000 ease-out"
      >
        <span className="inline-block text-[#D32F2F] bg-[#FFEBEE] rounded-full uppercase tracking-widest text-xs font-semibold px-3 py-1 mb-6">
          COME, SEE US
        </span>
        <h1 className="text-black font-black text-5xl sm:text-6xl md:text-7xl tracking-tighter leading-tight">
          Vijay Nagar, Indore.<br />
          <span className="text-[#D32F2F]">Walk-ins welcome.</span>
        </h1>
      </div>

      {/* 2. TWO-COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        
        {/* LEFT COLUMN */}
        <div 
          ref={leftColRef}
          className="lg:col-span-4 space-y-4 opacity-0 translate-y-8 transition-all duration-1000 delay-200 ease-out"
        >
          {/* Card 1 */}
          <div className="rounded-2xl border border-black/8 bg-white p-6">
            <div className="w-10 h-10 rounded-full bg-[#FFEBEE] flex items-center justify-center mb-3">
              <MapPin className="text-[#D32F2F]" size={18} />
            </div>
            <div className="text-xs font-mono uppercase tracking-widest text-slate-500 font-semibold mt-3">
              VISIT THE CAMPUS
            </div>
            <div className="font-bold text-[#0A0A0A] text-base mt-1">
              {contactData.address}
            </div>
            <a 
              href="https://maps.google.com/?q=Sayaji+Square+Indore" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#D32F2F] font-semibold text-sm mt-2 hover:underline inline-flex items-center gap-1"
            >
              Get directions <ArrowRight size={14} />
            </a>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl border border-black/8 bg-white p-6">
            <div className="w-10 h-10 rounded-full bg-[#FFEBEE] flex items-center justify-center mb-3">
              <Phone className="text-[#D32F2F]" size={18} />
            </div>
            <div className="text-xs font-mono uppercase tracking-widest text-slate-500 font-semibold mt-3">
              CALL US
            </div>
            <div className="font-bold text-[#0A0A0A] text-base mt-1">
              {contactData.phones ? contactData.phones.map(phoneStr).join(' · ') : ''}
            </div>
            <a 
              href={`tel:+91${phoneStr(contactData.phones?.[0]).replace(/\s/g, '')}`} 
              className="text-[#D32F2F] font-semibold text-sm mt-2 hover:underline inline-flex items-center gap-1"
            >
              Tap to call <ArrowRight size={14} />
            </a>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl border border-black/8 bg-white p-6">
            <div className="w-10 h-10 rounded-full bg-[#FFEBEE] flex items-center justify-center mb-3">
              <Mail className="text-[#D32F2F]" size={18} />
            </div>
            <div className="text-xs font-mono uppercase tracking-widest text-slate-500 font-semibold mt-3">
              EMAIL
            </div>
            <div className="font-bold text-[#0A0A0A] text-base mt-1">
              {contactData.email}
            </div>
            <a 
              href={`mailto:${contactData.email}`} 
              className="text-[#D32F2F] font-semibold text-sm mt-2 hover:underline inline-flex items-center gap-1"
            >
              Send email <ArrowRight size={14} />
            </a>
          </div>

          {/* Card 4 */}
          <div className="rounded-2xl border border-black/8 bg-white p-6">
            <div className="w-10 h-10 rounded-full bg-[#FFEBEE] flex items-center justify-center mb-3">
              <InstagramIcon className="text-[#D32F2F] w-[18px] h-[18px]" />
            </div>
            <div className="text-xs font-mono uppercase tracking-widest text-slate-500 font-semibold mt-3">
              INSTAGRAM
            </div>
            <div className="font-bold text-[#0A0A0A] text-base mt-1">
              {contactData.instagram.handle}
            </div>
            <a 
              href={contactData.instagram.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#D32F2F] font-semibold text-sm mt-2 hover:underline inline-flex items-center gap-1"
            >
              Open profile <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div 
          ref={rightColRef}
          className="lg:col-span-8 opacity-0 translate-y-8 transition-all duration-1000 delay-300 ease-out"
        >
          <div className="rounded-3xl border border-black/8 bg-white p-8 sm:p-10 h-full">
            <div className="text-[#D32F2F] text-xs font-mono font-semibold uppercase tracking-widest flex items-center gap-2 mb-3">
              <MessageSquare size={16} />
              SEND A MESSAGE
            </div>
            <h2 className="text-3xl font-black text-[#0A0A0A] tracking-tight">
              Any question. Any hour.
            </h2>
            <p className="text-slate-500 text-sm mt-2 mb-8">
              We respond to every message within a business day.
            </p>

            {submitted ? (
              <div className="bg-[#FFEBEE]/50 border border-[#D32F2F]/20 rounded-2xl p-8 text-center flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#D32F2F] text-white flex items-center justify-center text-xl font-bold mb-4">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-[#0A0A0A]">Message Received!</h3>
                <p className="text-sm text-slate-600 mt-2 max-w-sm">
                  Thanks for reaching out, <span className="font-semibold text-black">{formData.name}</span>. We'll get back to you shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', mobile: '', email: '', message: '' });
                  }}
                  className="mt-6 text-xs font-bold uppercase tracking-wider text-[#D32F2F] hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
            <form onSubmit={handleSubmit} className="space-y-4" name="contact" method="POST" data-netlify="true">
              <input type="hidden" name="form-name" value="contact" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-500 mb-1.5 block">
                    NAME
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#0A0A0A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/20 focus:border-[#D32F2F] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-500 mb-1.5 block">
                    MOBILE
                  </label>
                  <input 
                    type="tel" 
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="10-digit"
                    required
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#0A0A0A] font-mono placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/20 focus:border-[#D32F2F] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-500 mb-1.5 block">
                  EMAIL (OPTIONAL)
                </label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#0A0A0A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/20 focus:border-[#D32F2F] transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-500 mb-1.5 block">
                  MESSAGE
                </label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="What would you like to know?"
                  rows={4}
                  required
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#0A0A0A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/20 focus:border-[#D32F2F] transition-colors resize-y"
                />
              </div>

              <button 
                type="submit"
                className="bg-[#D32F2F] text-white rounded-full px-8 py-3.5 font-semibold text-sm flex items-center gap-2 hover:bg-[#B71C1C] transition-colors mt-6"
              >
                Send message <Send size={16} />
              </button>
            </form>
            )}
          </div>
        </div>
      </div>

      {/* 3. MAP SECTION */}
      <div 
        ref={mapRef}
        className="mt-16 mb-16 rounded-3xl overflow-hidden border border-black/8 h-[400px] relative opacity-0 translate-y-8 transition-all duration-1000 delay-400 ease-out"
      >
        <iframe 
          src={contactData.mapEmbed}
          className="w-full h-full border-0"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Location Map"
        ></iframe>
        
        <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur rounded-xl border border-black/5 p-4 shadow-lg max-w-xs">
          <h3 className="font-bold text-[#0A0A0A]">Sayaji Square</h3>
          <p className="text-sm text-slate-500 mt-1">
            {contactData.mapAddress}
          </p>
        </div>
      </div>

    </div>
  );
};

export default Contact;
