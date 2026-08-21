// Navigation
export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Courses', href: '/courses', children: [
    { label: 'Nurture Section', subtitle: 'Class 6–8', href: '/courses', color: '#2E7D32' },
    { label: 'Pioneer Section', subtitle: 'Class 9–10', href: '/courses', color: '#AD1457' },
    { label: 'Booster Section', subtitle: 'Class 11–12', href: '/courses', color: '#F9A825' },
    { label: 'Medical Explorer', subtitle: '11th, 12th & Dropper', href: '/courses', color: '#D32F2F' },
    { label: 'Engineering Explorer', subtitle: '11th, 12th & Dropper', href: '/courses', color: '#E65100' },
  ]},
  { label: 'Faculty', href: '/faculty' },
  { label: 'Admissions', href: '/admissions' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Results', href: '/results' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

// Footer
export const FOOTER_EXPLORE = [
  [
    { label: 'Home', href: '/' },
    { label: 'Courses', href: '/courses' },
    { label: 'Admissions', href: '/admissions' },
    { label: 'Blog', href: '/blog' },
    { label: 'Gallery', href: '/gallery' },
  ],
  [
    { label: 'About', href: '/about' },
    { label: 'Faculty', href: '/faculty' },
    { label: 'Testimonials', href: '/testimonials' },
    { label: 'Results', href: '/results' },
    { label: 'Contact', href: '/contact' },
  ],
];
