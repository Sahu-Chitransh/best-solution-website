import React, { useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, User, BookOpen, Share2, ArrowRight, CheckCircle2 } from 'lucide-react';
import blogData from '../content/blog.json';
import SectionHeader from '../components/SectionHeader';

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
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => {
      observer.unobserve(el);
    };
  }, []);
  return ref;
}

export default function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const heroRef = useScrollReveal();
  const contentRef = useScrollReveal();
  const relatedRef = useScrollReveal();

  const post = blogData.posts.find((p) => String(p.id) === String(id));

  // If post is not found, redirect to blog listing or show fallback
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen bg-white pt-32 pb-20 px-6 text-center max-w-xl mx-auto">
        <h2 className="text-3xl font-black text-[#0A0A0A] mb-4">Article Not Found</h2>
        <p className="text-slate-600 mb-8">
          The blog post you are looking for might have been moved or updated.
        </p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 rounded-full bg-[#D32F2F] text-white px-6 py-3 font-bold text-sm hover:bg-[#B71C1C] transition-colors"
        >
          <ArrowLeft size={16} />
          Back to all articles
        </Link>
      </div>
    );
  }

  // Related posts (excluding current)
  const relatedPosts = blogData.posts
    .filter((p) => p.id !== post.id)
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.snippet,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans pt-24 pb-24">
      {/* ── Breadcrumb & Back button ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <button
          onClick={() => navigate('/blog')}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-[#D32F2F] transition-colors group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </button>
      </div>

      {/* ── Article Header ── */}
      <header ref={heroRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 opacity-0 translate-y-8 transition-all duration-700 ease-out">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#D32F2F] bg-[#FFEBEE] px-3.5 py-1 rounded-full">
            {post.category}
          </span>
          <span className="text-slate-300">·</span>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
            <Clock size={13} />
            {post.readTime} READ
          </span>
          <span className="text-slate-300">·</span>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
            <Calendar size={13} />
            {post.date}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0A0A0A] tracking-tight leading-[1.15] mb-6">
          {post.title}
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-8">
          {post.snippet}
        </p>

        {/* Author info card */}
        <div className="flex items-center justify-between flex-wrap gap-4 py-5 border-y border-slate-100">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-[#FFEBEE] text-[#D32F2F] flex items-center justify-center font-bold text-base shadow-sm">
              {post.author ? post.author.split(' ').map(n => n[0]).join('').slice(0, 2) : 'BS'}
            </div>
            <div>
              <div className="font-bold text-[#0A0A0A] text-sm sm:text-base">
                {post.author || 'Best Solution Faculty'}
              </div>
              <div className="text-xs text-slate-500">
                {post.authorRole || 'Senior Coaching Mentor'}
              </div>
            </div>
          </div>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-4 py-2 rounded-full transition-colors"
          >
            <Share2 size={13} />
            Share
          </button>
        </div>
      </header>

      {/* ── Article Banner Card ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className={`w-full h-40 sm:h-56 ${post.bgColor} rounded-3xl flex items-center justify-center p-8 relative overflow-hidden border border-black/5 shadow-inner`}>
          <div className="text-center">
            <span className="text-xs font-mono uppercase tracking-widest font-bold text-black/40 block mb-1">
              Best Solution Teaching Notes
            </span>
            <span className="text-2xl sm:text-3xl font-black text-black/70 tracking-tight">
              {post.category} Focus Playbook
            </span>
          </div>
        </div>
      </div>

      {/* ── Key Takeaways Box ── */}
      {post.keyTakeaways && post.keyTakeaways.length > 0 && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="bg-[#FFEBEE]/40 border border-[#D32F2F]/20 rounded-2xl p-6 sm:p-8">
            <h3 className="text-xs uppercase font-mono tracking-widest font-bold text-[#D32F2F] mb-4 flex items-center gap-2">
              <BookOpen size={16} />
              EXECUTIVE SUMMARY & CORE TAKEAWAYS
            </h3>
            <ul className="space-y-3">
              {(post.keyTakeaways || []).map((takeaway, idx) => {
                const tText = typeof takeaway === 'string' ? takeaway : takeaway.takeaway || Object.values(takeaway)[0] || '';
                return (
                  <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-slate-800">
                    <CheckCircle2 size={18} className="text-[#D32F2F] mt-0.5 shrink-0" />
                    <span>{tText}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}

      {/* ── Main Article Body ── */}
      <main ref={contentRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 opacity-0 translate-y-8 transition-all duration-700 delay-150 ease-out">
        <div className="space-y-10 text-slate-700 leading-relaxed text-base sm:text-lg">
          {post.content && post.content.map((section, sIdx) => (
            <section key={sIdx} className="space-y-4">
              {section.heading && (
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0A0A0A] tracking-tight pt-4">
                  {section.heading}
                </h2>
              )}
              {(section.paragraphs || []).map((pText, pIdx) => {
                const paragraphString = typeof pText === 'string' ? pText : pText.paragraph || Object.values(pText)[0] || '';
                return (
                  <p key={pIdx} className="text-slate-700 leading-relaxed">
                    {paragraphString}
                  </p>
                );
              })}
            </section>
          ))}
        </div>

        {/* ── Consultation CTA Banner ── */}
        <div className="mt-16 bg-[#0A0A0A] rounded-3xl p-8 sm:p-12 text-white text-center relative overflow-hidden">
          <span className="text-[#FFC107] text-xs font-mono font-bold uppercase tracking-widest mb-3 inline-block">
            TAKE THE NEXT STEP
          </span>
          <h3 className="text-2xl sm:text-4xl font-black tracking-tight mb-4">
            Need customized coaching for {post.category}?
          </h3>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
            Speak directly with our senior mentors in Vijay Nagar, Indore. Book a free 1-on-1 diagnostic session.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/admissions"
              className="rounded-full bg-[#D32F2F] text-white px-8 py-3.5 text-sm font-bold hover:bg-[#B71C1C] transition-colors"
            >
              Apply for Demo Class
            </Link>
            <Link
              to="/contact"
              className="rounded-full border border-white/20 bg-white/5 text-white px-8 py-3.5 text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              Contact Counsellor
            </Link>
          </div>
        </div>
      </main>

      {/* ── Related Articles Section ── */}
      {relatedPosts.length > 0 && (
        <section ref={relatedRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 pt-16 border-t border-slate-100 opacity-0 translate-y-8 transition-all duration-700 delay-300 ease-out">
          <div className="mb-10">
            <span className="text-xs uppercase font-mono tracking-widest text-[#D32F2F] font-bold">
              CONTINUE READING
            </span>
            <h2 className="text-3xl font-black text-[#0A0A0A] tracking-tight mt-1">
              Related Articles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((rPost) => (
              <Link
                key={rPost.id}
                to={`/blog/${rPost.id}`}
                className="rounded-2xl border border-black/8 bg-white overflow-hidden hover:shadow-md transition-shadow group flex flex-col h-full"
              >
                <div className={`h-36 w-full ${rPost.bgColor}`}></div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-xs mb-3">
                    <span className="uppercase font-semibold text-[#D32F2F]">
                      {rPost.category}
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="text-slate-500 font-medium">{rPost.readTime} READ</span>
                  </div>
                  <h3 className="font-bold text-[#0A0A0A] text-base group-hover:text-[#D32F2F] transition-colors line-clamp-2 mb-2">
                    {rPost.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 flex-grow mb-4">
                    {rPost.snippet}
                  </p>
                  <div className="flex items-center text-xs font-semibold text-[#D32F2F] mt-auto">
                    Read Article &rarr;
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
