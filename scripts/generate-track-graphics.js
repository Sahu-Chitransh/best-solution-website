import sharp from 'sharp';
import path from 'node:path';

const OUT_DIR = path.resolve('public/images/programs');

// Create engineering books graphic (blue background #1E40AF / #2563EB)
const engSvg = `
<svg width="290" height="105" viewBox="0 0 290 105" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="engBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1E3A8A" />
      <stop offset="50%" stop-color="#2563EB" />
      <stop offset="100%" stop-color="#1D4ED8" />
    </linearGradient>
    <linearGradient id="bookMath" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#1E3A8A" />
      <stop offset="10%" stop-color="#3B82F6" />
      <stop offset="90%" stop-color="#2563EB" />
      <stop offset="100%" stop-color="#1D4ED8" />
    </linearGradient>
    <linearGradient id="bookPhys" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#064E3B" />
      <stop offset="10%" stop-color="#10B981" />
      <stop offset="90%" stop-color="#059669" />
      <stop offset="100%" stop-color="#047857" />
    </linearGradient>
    <linearGradient id="bookChem" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#78350F" />
      <stop offset="10%" stop-color="#F59E0B" />
      <stop offset="90%" stop-color="#D97706" />
      <stop offset="100%" stop-color="#B45309" />
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="2" dy="3" stdDeviation="3" flood-opacity="0.35" />
    </filter>
  </defs>
  
  <rect width="290" height="105" fill="url(#engBg)" />
  
  <!-- Drafting Compass / Gear Icon left -->
  <g filter="url(#shadow)" transform="translate(45, 12)">
    <!-- Outer Gear -->
    <circle cx="40" cy="40" r="32" fill="#60A5FA" opacity="0.25" />
    <path d="M 40 16 L 40 22 M 40 58 L 40 64 M 16 40 L 22 40 M 58 40 L 64 40 M 23 23 L 27 27 M 53 53 L 57 57 M 23 57 L 27 53 M 53 27 L 57 23" stroke="#93C5FD" stroke-width="6" stroke-linecap="round" />
    <!-- Drafting Compass -->
    <path d="M 40 18 L 22 68 M 40 18 L 58 68 M 30 46 L 50 46" stroke="#FFFFFF" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="40" cy="18" r="5" fill="#E2E8F0" stroke="#1E3A8A" stroke-width="2" />
    <circle cx="22" cy="68" r="2.5" fill="#FFFFFF" />
    <circle cx="58" cy="68" r="2.5" fill="#FFFFFF" />
  </g>
  
  <!-- Stack of 3 Textbooks right -->
  <g filter="url(#shadow)" transform="translate(142, 16)">
    <!-- Book 1: MATHEMATICS (top) -->
    <rect x="0" y="0" width="136" height="22" rx="3" fill="url(#bookMath)" stroke="#60A5FA" stroke-width="0.5" />
    <rect x="126" y="2" width="8" height="18" rx="1" fill="#F8FAFC" />
    <text x="58" y="15" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="10.5" text-anchor="middle" letter-spacing="1">MATHEMATICS</text>
    
    <!-- Book 2: PHYSICS (middle) -->
    <rect x="-4" y="24" width="140" height="22" rx="3" fill="url(#bookPhys)" stroke="#34D399" stroke-width="0.5" />
    <rect x="126" y="26" width="8" height="18" rx="1" fill="#F8FAFC" />
    <text x="58" y="39" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="11" text-anchor="middle" letter-spacing="1">PHYSICS</text>
    
    <!-- Book 3: CHEMISTRY (bottom) -->
    <rect x="-8" y="48" width="144" height="22" rx="3" fill="url(#bookChem)" stroke="#FBBF24" stroke-width="0.5" />
    <rect x="126" y="50" width="8" height="18" rx="1" fill="#F8FAFC" />
    <text x="58" y="63" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="10.5" text-anchor="middle" letter-spacing="1">CHEMISTRY</text>
  </g>
</svg>
`;

// Create foundation books graphic (green theme #15803D / #166534)
const fndSvg = `
<svg width="290" height="105" viewBox="0 0 290 105" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="fndBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#14532D" />
      <stop offset="50%" stop-color="#16A34A" />
      <stop offset="100%" stop-color="#15803D" />
    </linearGradient>
    <linearGradient id="bookSci" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#064E3B" />
      <stop offset="10%" stop-color="#10B981" />
      <stop offset="90%" stop-color="#059669" />
      <stop offset="100%" stop-color="#047857" />
    </linearGradient>
    <linearGradient id="bookMath2" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#1E3A8A" />
      <stop offset="10%" stop-color="#3B82F6" />
      <stop offset="90%" stop-color="#2563EB" />
      <stop offset="100%" stop-color="#1D4ED8" />
    </linearGradient>
    <linearGradient id="bookApt" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#831843" />
      <stop offset="10%" stop-color="#EC4899" />
      <stop offset="90%" stop-color="#DB2777" />
      <stop offset="100%" stop-color="#BE185D" />
    </linearGradient>
    <filter id="shadow2" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="2" dy="3" stdDeviation="3" flood-opacity="0.35" />
    </filter>
  </defs>
  
  <rect width="290" height="105" fill="url(#fndBg)" />
  
  <!-- Graduation Cap & Telescope / Magnifier left -->
  <g filter="url(#shadow2)" transform="translate(45, 12)">
    <circle cx="40" cy="40" r="32" fill="#86EFAC" opacity="0.25" />
    <!-- Graduation Cap -->
    <polygon points="40,24 64,36 40,48 16,36" fill="#F8FAFC" />
    <path d="M 26 42 L 26 54 Q 40 62 54 54 L 54 42" fill="#E2E8F0" />
    <path d="M 58 39 L 62 56" stroke="#FDE047" stroke-width="2.5" stroke-linecap="round" />
    <circle cx="62" cy="57" r="2.5" fill="#FDE047" />
    <!-- Small star sparkle -->
    <path d="M 20 62 Q 22 66 26 68 Q 22 70 20 74 Q 18 70 14 68 Q 18 66 20 62 Z" fill="#FDE047" />
  </g>
  
  <!-- Stack of 3 Textbooks right -->
  <g filter="url(#shadow2)" transform="translate(142, 16)">
    <!-- Book 1: SCIENCE (top) -->
    <rect x="0" y="0" width="136" height="22" rx="3" fill="url(#bookSci)" stroke="#6EE7B7" stroke-width="0.5" />
    <rect x="126" y="2" width="8" height="18" rx="1" fill="#F8FAFC" />
    <text x="58" y="15" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="11" text-anchor="middle" letter-spacing="1">SCIENCE</text>
    
    <!-- Book 2: MATHEMATICS (middle) -->
    <rect x="-4" y="24" width="140" height="22" rx="3" fill="url(#bookMath2)" stroke="#93C5FD" stroke-width="0.5" />
    <rect x="126" y="26" width="8" height="18" rx="1" fill="#F8FAFC" />
    <text x="58" y="39" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="10.5" text-anchor="middle" letter-spacing="1">MATHEMATICS</text>
    
    <!-- Book 3: APTITUDE (bottom) -->
    <rect x="-8" y="48" width="144" height="22" rx="3" fill="url(#bookApt)" stroke="#F472B6" stroke-width="0.5" />
    <rect x="126" y="50" width="8" height="18" rx="1" fill="#F8FAFC" />
    <text x="58" y="63" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="10.5" text-anchor="middle" letter-spacing="1">APTITUDE / NTSE</text>
  </g>
</svg>
`;

await sharp(Buffer.from(engSvg)).webp({ quality: 95 }).toFile(path.join(OUT_DIR, 'engineering-books.webp'));
await sharp(Buffer.from(fndSvg)).webp({ quality: 95 }).toFile(path.join(OUT_DIR, 'foundation-books.webp'));

console.log('Successfully generated engineering-books.webp and foundation-books.webp');
