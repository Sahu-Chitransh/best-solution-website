export default function Placeholder({ title }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
      <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#D32F2F] bg-[#FFEBEE] px-3 py-1 rounded-full mb-4">
        Coming Soon
      </span>
      <h1 className="text-5xl font-black tracking-tighter text-[#0A0A0A]">{title}</h1>
      <p className="mt-4 text-slate-600">
        This page is under construction. Check back soon!
      </p>
    </div>
  );
}
