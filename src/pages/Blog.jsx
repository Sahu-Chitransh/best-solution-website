import React, { useState, useEffect, useRef } from 'react';
import { Search, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

function useScrollReveal() {
  const ref = useRef(null);
  useEffect(() => {
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
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);
  return ref;
}

const blogPosts = [
  {
    id: 1,
    category: 'IIT-JEE',
    readTime: '6 MIN',
    title: 'Top 10 Tips to Ace IIT-JEE 2026 — From Our Coaches',
    snippet: "A tactical playbook combining our teaching floor's most repeated advice — from timetable to test-day rituals.",
    date: '12 Jan 2026',
    bgColor: 'bg-slate-200'
  },
  {
    id: 2,
    category: 'NEET',
    readTime: '8 MIN',
    title: 'How to Crack NEET in Your First Attempt',
    snippet: "A framework used by 4 of our AIR<3000 NEET rankers, broken down into weekly cycles.",
    date: '05 Jan 2026',
    bgColor: 'bg-blue-100'
  },
  {
    id: 3,
    category: 'CCG',
    readTime: '5 MIN',
    title: 'What Is the CCG Program? A Complete Guide',
    snippet: "If your child is undecided between commerce, science or humanities, this new integrated program is built for them.",
    date: '28 Dec 2025',
    bgColor: 'bg-amber-100'
  },
  {
    id: 4,
    category: 'BOARDS',
    readTime: '7 MIN',
    title: 'Board Exam Strategy 2026 — The 90+% Roadmap',
    snippet: "Practical, weekly milestones for Class 12 board students, tuned for CBSE and MP Board.",
    date: '20 Dec 2025',
    bgColor: 'bg-rose-100'
  },
  {
    id: 5,
    category: 'OLYMPIAD',
    readTime: '5 MIN',
    title: 'Why Early Olympiad Coaching Actually Matters',
    snippet: "Olympiads aren't about extra syllabus — they build a reasoning core that IIT/NEET exploit later.",
    date: '10 Dec 2025',
    bgColor: 'bg-emerald-100'
  },
  {
    id: 6,
    category: 'WELLNESS',
    readTime: '4 MIN',
    title: '5 Habits to Beat Exam Stress (That Actually Work)',
    snippet: "Written with our in-house counsellor for parents and students juggling boards + entrance exams.",
    date: '01 Dec 2025',
    bgColor: 'bg-violet-100'
  }
];

const categories = ['ALL', 'IIT-JEE', 'NEET', 'CCG', 'OLYMPIAD', 'BOARDS', 'WELLNESS'];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  
  const heroRef = useScrollReveal();
  const filterRef = useScrollReveal();
  const gridRef = useScrollReveal();

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans pb-24">
      {/* Hero Section */}
      <div className="pt-24 pb-16 px-6 lg:px-8 max-w-7xl mx-auto">
        <div ref={heroRef} className="opacity-0 translate-y-8 transition-all duration-1000 ease-out">
          <span className="inline-block text-[#D32F2F] bg-[#FFEBEE] rounded-full uppercase tracking-widest text-xs font-semibold px-3 py-1 mb-6">
            THE BEST SOLUTION BLOG
          </span>
          <h1 className="font-black text-5xl sm:text-6xl md:text-7xl tracking-tighter text-black mb-2">
            Notes from the <br className="hidden sm:block" />
            <span className="text-[#D32F2F]">teaching floor.</span>
          </h1>
          <p className="text-slate-600 max-w-3xl mt-6 text-lg sm:text-xl leading-relaxed">
            Playbooks, frameworks and honest advice written by our faculty and past toppers. No fluff, no clickbait.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="px-6 lg:px-8 max-w-7xl mx-auto">
        <div ref={filterRef} className="flex items-center justify-between flex-wrap gap-4 mb-8 opacity-0 translate-y-8 transition-all duration-1000 delay-150 ease-out">
          <div className="flex flex-row flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                  activeCategory === cat
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
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-full border border-black/10 pl-10 pr-4 py-2 text-sm w-full sm:w-72 placeholder:text-slate-400 focus:outline-none focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] transition-all"
            />
          </div>
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="px-6 lg:px-8 max-w-7xl mx-auto">
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-0 translate-y-8 transition-all duration-1000 delay-300 ease-out">
          {blogPosts.map((post) => (
            <article key={post.id} className="rounded-2xl border border-black/8 bg-white overflow-hidden hover:shadow-md transition-shadow group flex flex-col h-full">
              <div className={`h-48 w-full ${post.bgColor}`}></div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-xs mb-3">
                  <span className="uppercase font-semibold text-[#D32F2F]">
                    {post.category}
                  </span>
                  <span className="text-slate-400">·</span>
                  <div className="flex items-center gap-1 text-slate-500">
                    <Clock size={12} />
                    <span>{post.readTime} READ</span>
                  </div>
                </div>
                
                <h3 className="font-bold text-[#0A0A0A] text-lg mt-3 group-hover:text-[#D32F2F] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-sm text-slate-600 mt-2 leading-relaxed line-clamp-2 flex-grow">
                  {post.snippet}
                </p>
                
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-black/5">
                  <time className="text-xs text-slate-500">
                    {post.date}
                  </time>
                  <Link to={`/blog/${post.id}`} className="text-sm font-semibold text-[#0A0A0A] hover:text-[#D32F2F] transition-colors">
                    Read &rarr;
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
