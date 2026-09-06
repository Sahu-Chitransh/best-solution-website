import { useState } from 'react';

/**
 * OptimizedImage — serves WebP with original fallback, prevents CLS, shows skeleton on load.
 *
 * Props:
 *   src        — original image path (e.g. "/images/hero/01.png")
 *   alt        — alt text (required for accessibility)
 *   width      — intrinsic width (number or string)
 *   height     — intrinsic height (number or string)
 *   className  — classes for the <img> element
 *   loading    — "lazy" (default) or "eager"
 *   priority   — if true, sets fetchpriority="high" and loading="eager"
 *   sizes      — responsive sizes attribute
 *   ...rest    — any other props forwarded to <img>
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  priority = false,
  sizes,
  ...rest
}) {
  const [loaded, setLoaded] = useState(false);

  if (!src) return null;

  // Derive WebP path: /images/foo.png → /images/foo.webp
  const ext = src.substring(src.lastIndexOf('.'));
  const webpSrc = ext && /\.(png|jpe?g)$/i.test(ext)
    ? src.substring(0, src.lastIndexOf('.')) + '.webp'
    : null;

  const imgLoading = priority ? 'eager' : loading;
  const fetchPriority = priority ? 'high' : undefined;

  return (
    <picture>
      {webpSrc && <source srcSet={webpSrc} type="image/webp" sizes={sizes} />}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={imgLoading}
        decoding="async"
        fetchPriority={fetchPriority}
        sizes={sizes}
        className={`${className} ${loaded ? '' : 'bg-slate-100 animate-pulse'}`}
        onLoad={() => setLoaded(true)}
        {...rest}
      />
    </picture>
  );
}
