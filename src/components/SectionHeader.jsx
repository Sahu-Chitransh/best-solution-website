export default function SectionHeader({ eyebrow, title, description, dark }) {
  return (
    <div className="max-w-3xl text-left">
      {eyebrow && (
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#D32F2F] bg-[#FFEBEE] px-3 py-1 rounded-full mb-4">
          {eyebrow}
        </span>
      )}
      <h2 className={`text-4xl sm:text-5xl font-black tracking-tighter ${
        dark ? 'text-white' : 'text-[#0A0A0A]'
      }`}>
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base md:text-lg text-slate-600 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
