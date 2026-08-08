import { ExternalLink, Camera } from 'lucide-react';
import InstagramIcon from '../components/InstagramIcon';
import SectionHeader from '../components/SectionHeader';
import { useScrollReveal } from '../hooks/useScrollReveal';
import instagramData from '../content/instagram.json';

const Gallery = () => {
  const { ref: headerRef } = useScrollReveal();
  const { ref: statsRef } = useScrollReveal();
  const { ref: gridRef } = useScrollReveal();

  const truncateCaption = (caption, maxLength = 80) => {
    if (!caption) return '';
    if (caption.length <= maxLength) return caption;
    return caption.substring(0, maxLength).trim() + '...';
  };

  const { sectionTitle, handle, profileUrl, posts } = instagramData;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      {/* Hero Section */}
      <section ref={headerRef} className="container mx-auto px-4 mb-12">
        <div className="max-w-4xl mx-auto text-center data-animate bs-animate-hidden">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 rounded-full mb-6 text-white shadow-lg shadow-red-500/20">
            <InstagramIcon size={32} />
          </div>
          <SectionHeader
            eyebrow="Life at Best Solution"
            title={sectionTitle}
            description="Catch a glimpse of our vibrant student life, faculty sessions, and top achievers."
          />
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-[#D32F2F] font-bold hover:text-red-700 transition-colors bg-red-50 px-6 py-2 rounded-full border border-red-100 hover:border-red-200"
          >
            {handle}
            <ExternalLink size={18} />
          </a>
        </div>
      </section>

      {/* Stats Bar */}
      <section ref={statsRef} className="container mx-auto px-4 mb-12">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-black/10 p-6 flex flex-col sm:flex-row items-center justify-between data-animate bs-animate-hidden">
          <div className="flex items-center gap-4 mb-4 sm:mb-0">
            <div className="bg-gray-100 p-3 rounded-xl text-gray-700">
              <Camera size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0A0A0A]">{posts?.length || 0}</p>
              <p className="text-gray-500 text-sm font-medium">Recent Posts</p>
            </div>
          </div>
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#D32F2F] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#b72424] transition-colors shadow-lg shadow-[#D32F2F]/20"
          >
            <InstagramIcon size={20} />
            Follow on Instagram
          </a>
        </div>
      </section>

      {/* Masonry Grid */}
      <section ref={gridRef} className="container mx-auto px-4">
        {(!posts || posts.length === 0) ? (
          <div className="max-w-2xl mx-auto text-center py-20 bg-white rounded-2xl border border-black/10 data-animate bs-animate-hidden">
            <InstagramIcon className="mx-auto text-gray-300 mb-4" size={48} />
            <h3 className="text-xl font-bold text-gray-700 mb-2">No posts yet</h3>
            <p className="text-gray-500">Check back soon for updates from our Instagram feed.</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 max-w-7xl mx-auto">
            {posts.map((post, index) => (
              <a
                key={index}
                href={post.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`block break-inside-avoid relative rounded-2xl border border-black/10 overflow-hidden group hover:shadow-md transition-shadow data-animate bs-animate-hidden bs-stagger-${(index % 5) + 1}`}
              >
                <img
                  src={post.image}
                  alt={post.caption ? truncateCaption(post.caption, 40) : 'Instagram Post'}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <p className="text-white text-sm font-medium mb-4 line-clamp-3">
                    {truncateCaption(post.caption)}
                  </p>
                  <div className="flex items-center gap-2 text-[#FFC107] font-bold text-sm">
                    <InstagramIcon size={16} />
                    <span>View on Instagram</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Gallery;
