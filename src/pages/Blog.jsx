import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, Clock, ExternalLink, Flame, Newspaper, BookOpen, ChevronRight, ArrowRight, TrendingUp, AlertCircle, Zap, X, ChevronLeft, Scissors, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import blogData from '../content/blog.json';

/* ── Scroll reveal hook ── */
function useScrollReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);
  return ref;
}

/* ── Data ── */
const blogPosts = blogData.posts;
const newsItems = blogData.news || [];
const newspaperCuttings = blogData.newspaperCuttings || [];

const blogCategories = ['ALL', 'IIT-JEE', 'NEET', 'CCG', 'OLYMPIAD', 'BOARDS', 'WELLNESS'];
const newsCategories = ['ALL', 'JEE', 'NEET', 'BOARDS', 'CUET'];

const tagColors = {
  'BREAKING':       { bg: 'bg-red-600',     text: 'text-white', icon: Zap },
  'COUNSELLING':    { bg: 'bg-blue-600',     text: 'text-white', icon: TrendingUp },
  'RESULTS':        { bg: 'bg-emerald-600',  text: 'text-white', icon: TrendingUp },
  'ADMISSION':      { bg: 'bg-purple-600',   text: 'text-white', icon: ArrowRight },
  'SUPREME COURT':  { bg: 'bg-amber-600',    text: 'text-white', icon: AlertCircle },
  'UPDATE':         { bg: 'bg-cyan-600',      text: 'text-white', icon: Newspaper },
  'UPCOMING':       { bg: 'bg-indigo-600',    text: 'text-white', icon: ChevronRight },
  'CUTOFF':         { bg: 'bg-orange-600',    text: 'text-white', icon: TrendingUp },
};

/* ── Newspaper Cutting Lightbox ── */
function CuttingLightbox({ cutting, cuttings, onClose, onNav }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNav(1);
      if (e.key === 'ArrowLeft') onNav(-1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, onNav]);

  if (!cutting) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bs-lightbox" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div className="relative z-10 max-w-4xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
        {/* Close */}
        <button onClick={onClose} className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors">
          <X size={28} />
        </button>
        {/* Nav Left */}
        <button onClick={() => onNav(-1)} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 text-white/50 hover:text-white transition-colors hidden md:block">
          <ChevronLeft size={36} />
        </button>
        {/* Nav Right */}
        <button onClick={() => onNav(1)} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 text-white/50 hover:text-white transition-colors hidden md:block">
          <ChevronRight size={36} />
        </button>
        {/* Image */}
        <img
          src={cutting.image}
          alt={cutting.caption}
          className="w-full rounded-2xl shadow-2xl bs-lightbox-img border-4 border-white/10"
        />
        {/* Caption */}
        <div className="text-center mt-4">
          <p className="text-white font-semibold text-lg">{cutting.caption}</p>
          <p className="text-white/50 text-sm mt-1">{cutting.source}</p>
        </div>
      </div>
    </div>
  );
}

/* ═══════ MAIN COMPONENT ═══════ */
export default function Blog() {
  const [activeTab, setActiveTab] = useState('NEWS');
  const [activeBlogCat, setActiveBlogCat] = useState('ALL');
  const [activeNewsCat, setActiveNewsCat] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const heroRef       = useScrollReveal();
  const tickerRef     = useScrollReveal();
  const filterRef     = useScrollReveal();
  const cuttingsRef   = useScrollReveal();
  const linksRef      = useScrollReveal();

  /* Hot news for the ticker */
  const hotNews = newsItems.filter(n => n.isHot);

  /* Filtered news */
  const filteredNews = newsItems
    .filter(n => activeNewsCat === 'ALL' || n.category === activeNewsCat)
    .filter(n => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return n.title.toLowerCase().includes(q) || n.snippet.toLowerCase().includes(q);
    });

  /* Filtered blog posts */
  const filteredPosts = blogPosts
    .filter(p => activeBlogCat === 'ALL' || p.category === activeBlogCat)
    .filter(p => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.snippet.toLowerCase().includes(q);
    });

  /* Lightbox nav */
  const handleLightboxNav = useCallback((dir) => {
    setLightboxIdx(prev => {
      if (prev === null) return null;
      const next = prev + dir;
      if (next < 0) return newspaperCuttings.length - 1;
      if (next >= newspaperCuttings.length) return 0;
      return next;
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans pb-24">

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <CuttingLightbox
          cutting={newspaperCuttings[lightboxIdx]}
          cuttings={newspaperCuttings}
          onClose={() => setLightboxIdx(null)}
          onNav={handleLightboxNav}
        />
      )}

      {/* ── Hero ── */}
      <div className="pt-24 pb-12 px-6 lg:px-8 max-w-7xl mx-auto">
        <div ref={heroRef} className="opacity-0 translate-y-8 transition-all duration-1000 ease-out">
          <span className="inline-block text-[#D32F2F] bg-[#FFEBEE] rounded-full uppercase tracking-widest text-xs font-semibold px-3 py-1 mb-6">
            THE BEST SOLUTION BLOG & NEWS
          </span>
          <h1 className="font-black text-5xl sm:text-6xl md:text-7xl tracking-tighter text-black mb-2">
            Notes from the <br className="hidden sm:block" />
            <span className="text-[#D32F2F]">teaching floor.</span>
          </h1>
          <p className="text-slate-600 max-w-3xl mt-6 text-lg sm:text-xl leading-relaxed">
            Latest JEE, NEET & board exam updates alongside playbooks from our faculty and past toppers. No fluff — just what matters.
          </p>
        </div>
      </div>

      {/* ── Breaking News Ticker ── */}
      {hotNews.length > 0 && (
        <div ref={tickerRef} className="opacity-0 translate-y-8 transition-all duration-1000 delay-100 ease-out mb-10">
          <div className="bg-gradient-to-r from-[#0A0A0A] via-[#1a1a2e] to-[#0A0A0A] py-3 overflow-hidden relative">
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10" />
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center gap-2 bg-[#D32F2F] px-4 py-1 rounded-r-full mr-4 z-20">
                <Flame size={14} className="text-white animate-pulse" />
                <span className="text-white text-xs font-bold uppercase tracking-wider">LIVE UPDATES</span>
              </div>
              <div className="bs-marquee-track">
                {[...hotNews, ...hotNews].map((item, i) => (
                  <a key={`${item.id}-${i}`} href={item.sourceUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white/90 hover:text-[#FF5252] transition-colors text-sm whitespace-nowrap mr-12 group">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FF5252] animate-pulse flex-shrink-0" />
                    <span className="font-medium">{item.title}</span>
                    <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════
          📰 NEWSPAPER CUTTINGS GALLERY
         ═══════════════════════════════════════════════ */}
      {newspaperCuttings.length > 0 && (
        <div className="px-6 lg:px-8 max-w-7xl mx-auto mb-14">
          <div ref={cuttingsRef} className="opacity-0 translate-y-8 transition-all duration-1000 delay-200 ease-out">
            {/* Section header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 border border-amber-200/60">
                <Scissors size={18} className="text-amber-700" />
              </div>
              <div>
                <h2 className="font-bold text-xl text-[#0A0A0A]">Newspaper Cuttings</h2>
                <p className="text-sm text-slate-500">Latest JEE, NEET & Board exam news from top newspapers</p>
              </div>
            </div>

            {/* Cuttings horizontal scroll */}
            <div className="relative">
              <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin" style={{ scrollbarWidth: 'thin' }}>
                {newspaperCuttings.map((cutting, idx) => (
                  <div
                    key={cutting.id}
                    onClick={() => setLightboxIdx(idx)}
                    className="group flex-shrink-0 w-72 sm:w-80 snap-start cursor-pointer"
                  >
                    {/* Image container — newspaper style */}
                    <div className="relative rounded-xl overflow-hidden border-2 border-amber-200/50 shadow-lg group-hover:shadow-2xl group-hover:shadow-amber-900/10 transition-all duration-300 bg-amber-50">
                      {/* Tape effect at top */}
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 w-16 h-5 bg-amber-100/80 rounded-sm rotate-[-2deg] border border-amber-200/40" />
                      {/* Image */}
                      <div className="relative overflow-hidden">
                        <img
                          src={cutting.image}
                          alt={cutting.caption}
                          className="w-full h-52 object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Paper texture overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/5 via-transparent to-amber-900/10 pointer-events-none" />
                        {/* Zoom icon */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                          <div className="bg-white/90 rounded-full p-3 shadow-lg">
                            <ImageIcon size={20} className="text-slate-700" />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Caption */}
                    <p className="mt-3 text-sm font-semibold text-slate-800 line-clamp-2 group-hover:text-[#D32F2F] transition-colors">
                      {cutting.caption}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">{cutting.source}</p>
                  </div>
                ))}
              </div>
              {/* Fade edges */}
              <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#FAFAFA] to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      )}

      {/* ── Tab Switcher ── */}
      <div className="px-6 lg:px-8 max-w-7xl mx-auto mb-6">
        <div className="flex items-center gap-1 bg-white border border-black/8 rounded-2xl p-1.5 w-fit">
          <button
            onClick={() => { setActiveTab('NEWS'); setSearchQuery(''); }}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
              activeTab === 'NEWS' ? 'bg-[#0A0A0A] text-white shadow-lg' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Newspaper size={16} /> News & Updates
          </button>
          <button
            onClick={() => { setActiveTab('BLOG'); setSearchQuery(''); }}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
              activeTab === 'BLOG' ? 'bg-[#0A0A0A] text-white shadow-lg' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen size={16} /> Blog Articles
          </button>
        </div>
      </div>

      {/* ── Filter Bar ── */}
      <div className="px-6 lg:px-8 max-w-7xl mx-auto">
        <div ref={filterRef} className="flex items-center justify-between flex-wrap gap-4 mb-8 opacity-0 translate-y-8 transition-all duration-1000 delay-150 ease-out">
          <div className="flex flex-row flex-wrap gap-2">
            {(activeTab === 'NEWS' ? newsCategories : blogCategories).map((cat) => (
              <button
                key={cat}
                onClick={() => activeTab === 'NEWS' ? setActiveNewsCat(cat) : setActiveBlogCat(cat)}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                  (activeTab === 'NEWS' ? activeNewsCat : activeBlogCat) === cat
                    ? 'bg-[#0A0A0A] text-white'
                    : 'bg-white border border-black/10 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder={activeTab === 'NEWS' ? 'Search news...' : 'Search articles...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-full border border-black/10 pl-10 pr-4 py-2 text-sm w-full sm:w-72 placeholder:text-slate-400 focus:outline-none focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] transition-all"
            />
          </div>
        </div>
      </div>


      {/* ═══════════════════════════════════════════════
          📰 NEWS TAB
         ═══════════════════════════════════════════════ */}
      {activeTab === 'NEWS' && (
        <div className="px-6 lg:px-8 max-w-7xl mx-auto">

          {/* Featured headline */}
          {filteredNews.length > 0 && filteredNews[0].isHot && (
            <a href={filteredNews[0].sourceUrl} target="_blank" rel="noopener noreferrer" className="block mb-12 group">
              <div className="relative rounded-3xl overflow-hidden bg-white border border-black/5 shadow-2xl shadow-black/5">
                {/* Graph Paper Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                
                {/* Animated Background Orbs */}
                <div className="absolute top-10 right-20 w-64 h-64 bg-red-100 rounded-full blur-[100px] opacity-60 animate-pulse" />
                <div className="absolute bottom-10 left-1/3 w-72 h-72 bg-amber-100 rounded-full blur-[120px] opacity-60 animate-bounce" style={{ animationDuration: '4s' }} />

                <div className="flex flex-col md:flex-row items-center p-8 md:p-12 gap-10 md:gap-16 relative z-10">
                  {/* Image (Left) styled as tilted black frame */}
                  {filteredNews[0].image && (
                    <div className="w-full md:w-5/12 flex justify-center md:justify-start">
                      <div className="relative bg-[#0A0A0A] p-2.5 rounded-[2rem] -rotate-3 group-hover:rotate-0 transition-transform duration-500 shadow-2xl max-w-md w-full">
                        <div className="relative bg-[#1a1a2e] rounded-3xl overflow-hidden border border-white/10 aspect-[4/5] flex items-center justify-center">
                          <img src={filteredNews[0].image} alt="" className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-1000" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                          
                          {/* Overlapping white badge */}
                          <div className="absolute bottom-5 left-5 right-5 bg-white rounded-2xl p-4 shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 border border-slate-100">
                            <p className="text-[#D32F2F] font-black text-xl md:text-2xl leading-none mb-1">LATEST NEWS</p>
                            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider line-clamp-1">{filteredNews[0].source}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Content (Right) */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-5">
                      {(() => {
                        const t = tagColors[filteredNews[0].tag] || tagColors['UPDATE'];
                        const TagIcon = t.icon;
                        return (
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${t.bg} ${t.text}`}>
                            <TagIcon size={12} />
                            {filteredNews[0].tag}
                          </span>
                        );
                      })()}
                      <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">{filteredNews[0].category}</span>
                      <span className="text-slate-300 text-xs">·</span>
                      <span className="text-slate-500 text-xs font-semibold">{filteredNews[0].date}</span>
                    </div>
                    <h2 className="text-slate-900 font-black text-3xl md:text-5xl leading-tight mb-5 group-hover:text-[#D32F2F] transition-colors">
                      {filteredNews[0].title}
                    </h2>
                    <p className="text-slate-600 text-base md:text-lg max-w-2xl leading-relaxed mb-8">
                      {filteredNews[0].snippet}
                    </p>
                    <div className="inline-flex items-center gap-2 bg-[#D32F2F] text-white rounded-full px-6 py-3 text-sm font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-500/30">
                      <span>Read Full Story</span>
                      <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </a>
          )}

          {/* News Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredNews.slice(filteredNews[0]?.isHot ? 1 : 0).map((item) => {
              const t = tagColors[item.tag] || tagColors['UPDATE'];
              const TagIcon = t.icon;
              return (
                <a key={item.id} href={item.sourceUrl} target="_blank" rel="noopener noreferrer"
                  className="group relative rounded-2xl border border-black/8 bg-white overflow-hidden hover:shadow-xl hover:shadow-black/5 transition-all duration-300 flex flex-col h-full">

                  {/* Newspaper image */}
                  {item.image && (
                    <div className="relative h-40 overflow-hidden bg-amber-50">
                      <img src={item.image} alt="" className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                      {/* Category badge on image */}
                      <div className={`absolute top-3 left-3 h-1.5 w-12 rounded-full ${
                        item.category === 'JEE' ? 'bg-gradient-to-r from-orange-500 to-red-500' :
                        item.category === 'NEET' ? 'bg-gradient-to-r from-blue-500 to-indigo-500' :
                        item.category === 'BOARDS' ? 'bg-gradient-to-r from-emerald-500 to-teal-500' :
                        'bg-gradient-to-r from-purple-500 to-pink-500'
                      }`} />
                    </div>
                  )}

                  {/* No image fallback — top bar */}
                  {!item.image && (
                    <div className={`h-1.5 w-full ${
                      item.category === 'JEE' ? 'bg-gradient-to-r from-orange-500 to-red-500' :
                      item.category === 'NEET' ? 'bg-gradient-to-r from-blue-500 to-indigo-500' :
                      item.category === 'BOARDS' ? 'bg-gradient-to-r from-emerald-500 to-teal-500' :
                      'bg-gradient-to-r from-purple-500 to-pink-500'
                    }`} />
                  )}

                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${t.bg} ${t.text}`}>
                        <TagIcon size={10} /> {item.tag}
                      </span>
                      <span className="text-slate-400 text-[11px] font-semibold uppercase">{item.category}</span>
                      {item.isHot && (
                        <span className="ml-auto flex items-center gap-1 text-[10px] text-red-500 font-bold uppercase">
                          <Flame size={10} className="animate-pulse" /> HOT
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-[#0A0A0A] text-[15px] leading-snug mb-2 group-hover:text-[#D32F2F] transition-colors line-clamp-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 flex-grow mb-4">
                      {item.snippet}
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-black/5">
                      <time className="text-xs text-slate-400">{item.date}</time>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#D32F2F] group-hover:gap-2.5 transition-all">
                        <span>{item.source}</span>
                        <ExternalLink size={12} />
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>

          {filteredNews.length === 0 && (
            <div className="text-center py-20 text-slate-400">
              <Newspaper size={48} className="mx-auto mb-4 opacity-40" />
              <p className="text-lg font-medium">No news found for this filter.</p>
            </div>
          )}

          {/* NEET Cutoff Table */}
          {(activeNewsCat === 'ALL' || activeNewsCat === 'NEET') && !searchQuery && (
            <div className="mt-12 rounded-2xl border border-black/8 bg-white overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                <div className="flex items-center gap-2">
                  <TrendingUp size={18} className="text-white" />
                  <h3 className="text-white font-bold text-lg">NEET UG 2026 — Qualifying Cutoff Marks</h3>
                </div>
                <p className="text-blue-100 text-sm mt-1">Official NTA qualifying thresholds (not admission cutoffs)</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="text-left px-6 py-3 font-semibold text-slate-700">Category</th>
                      <th className="text-left px-6 py-3 font-semibold text-slate-700">Qualifying Percentile</th>
                      <th className="text-left px-6 py-3 font-semibold text-slate-700">Marks Range</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5">
                    {[
                      ['General / EWS', '50th Percentile', '715 – 213', 'text-emerald-600'],
                      ['OBC', '40th Percentile', '212 – 177', 'text-blue-600'],
                      ['SC', '40th Percentile', '212 – 177', 'text-blue-600'],
                      ['ST', '40th Percentile', '212 – 177', 'text-blue-600'],
                    ].map(([cat, pctl, marks, clr]) => (
                      <tr key={cat} className="hover:bg-blue-50/40 transition-colors">
                        <td className="px-6 py-3 font-medium text-slate-800">{cat}</td>
                        <td className="px-6 py-3 text-slate-600">{pctl}</td>
                        <td className="px-6 py-3"><span className={`font-bold ${clr}`}>{marks}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-3 bg-amber-50 text-amber-800 text-xs flex items-start gap-2">
                <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                <span>Admission to Government Medical Colleges typically requires 600+ marks. These are qualifying thresholds only.</span>
              </div>
            </div>
          )}

          {/* JEE Advanced Cutoff Table */}
          {(activeNewsCat === 'ALL' || activeNewsCat === 'JEE') && !searchQuery && (
            <div className="mt-8 rounded-2xl border border-black/8 bg-white overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-red-600 px-6 py-4">
                <div className="flex items-center gap-2">
                  <TrendingUp size={18} className="text-white" />
                  <h3 className="text-white font-bold text-lg">JEE Advanced 2026 — Qualifying Cutoff Marks</h3>
                </div>
                <p className="text-orange-100 text-sm mt-1">Minimum aggregate marks for rank list inclusion</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="text-left px-6 py-3 font-semibold text-slate-700">Category</th>
                      <th className="text-left px-6 py-3 font-semibold text-slate-700">Min. Aggregate Marks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5">
                    {[
                      ['Common Rank List (CRL)', '92'],
                      ['OBC-NCL', '82'],
                      ['GEN-EWS', '82'],
                      ['SC / ST / PwD', '46'],
                    ].map(([cat, marks]) => (
                      <tr key={cat} className="hover:bg-orange-50/40 transition-colors">
                        <td className="px-6 py-3 font-medium text-slate-800">{cat}</td>
                        <td className="px-6 py-3"><span className="font-bold text-orange-600">{marks}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-3 bg-amber-50 text-amber-800 text-xs flex items-start gap-2">
                <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                <span>AIR 1: Shubham Kumar scored 330/360. Top female: Arohi Deshpande at CRL 77 with 280/360. Total qualified: 56,880 out of 1,79,694 candidates.</span>
              </div>
            </div>
          )}
        </div>
      )}


      {/* ═══════════════════════════════════════════════
          📖 BLOG ARTICLES TAB
         ═══════════════════════════════════════════════ */}
      {activeTab === 'BLOG' && (
        <div className="px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <article key={post.id} className="rounded-2xl border border-black/8 bg-white overflow-hidden hover:shadow-xl hover:shadow-black/5 transition-all duration-300 group flex flex-col h-full">
                {/* Image */}
                <div className={`h-52 w-full relative overflow-hidden ${post.bgColor}`}>
                  {post.image && (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  )}
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  {/* Category pill on image */}
                  <span className="absolute top-3 left-3 inline-block uppercase font-bold text-[10px] tracking-wider bg-white/90 text-[#D32F2F] rounded-full px-3 py-1 shadow-sm backdrop-blur-sm">
                    {post.category}
                  </span>
                  {/* Read time pill */}
                  <span className="absolute top-3 right-3 inline-flex items-center gap-1 text-[10px] font-semibold text-white/90 bg-black/40 rounded-full px-2.5 py-1 backdrop-blur-sm">
                    <Clock size={10} />
                    {post.readTime}
                  </span>
                </div>
                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-bold text-[#0A0A0A] text-lg group-hover:text-[#D32F2F] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-3 leading-relaxed line-clamp-3 flex-grow">
                    {post.snippet}
                  </p>
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-black/5">
                    <time className="text-xs text-slate-500">{post.date}</time>
                    <Link to={`/blog/${post.id}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0A0A0A] hover:text-[#D32F2F] transition-colors group-hover:gap-2.5">
                      Read <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20 text-slate-400">
              <BookOpen size={48} className="mx-auto mb-4 opacity-40" />
              <p className="text-lg font-medium">No articles found for this filter.</p>
            </div>
          )}
        </div>
      )}


      {/* ── Quick Links ── */}
      <div className="px-6 lg:px-8 max-w-7xl mx-auto mt-16">
        <div ref={linksRef} className="rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-black/5 p-8 opacity-0 translate-y-8 transition-all duration-1000 ease-out">
          <h3 className="font-bold text-lg text-slate-800 mb-4">Official Exam Portals</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: 'JEE Main — NTA',   url: 'https://jeemain.nta.nic.in', color: 'from-orange-500 to-red-500' },
              { name: 'JEE Advanced',       url: 'https://jeeadv.ac.in',      color: 'from-red-500 to-rose-600' },
              { name: 'NEET UG — NTA',     url: 'https://neet.nta.nic.in',   color: 'from-blue-500 to-indigo-600' },
              { name: 'CBSE Results',       url: 'https://cbse.gov.in',       color: 'from-emerald-500 to-teal-600' },
              { name: 'CUET — NTA',         url: 'https://cuet.nta.nic.in',   color: 'from-purple-500 to-violet-600' },
              { name: 'MCC Counselling',    url: 'https://mcc.nic.in',        color: 'from-cyan-500 to-blue-600' },
              { name: 'JoSAA Counselling',  url: 'https://josaa.nic.in',      color: 'from-amber-500 to-orange-600' },
              { name: 'CSAB',               url: 'https://csab.nic.in',       color: 'from-pink-500 to-rose-600' },
            ].map((link) => (
              <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-xl bg-white border border-black/5 px-4 py-3 hover:shadow-md transition-all">
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${link.color} flex-shrink-0`} />
                <span className="text-sm font-medium text-slate-700 group-hover:text-[#D32F2F] transition-colors">{link.name}</span>
                <ExternalLink size={12} className="ml-auto text-slate-300 group-hover:text-[#D32F2F] transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
