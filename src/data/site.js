// Navigation
export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Courses', href: '/courses', children: [
    { label: 'Doctor (Medical)', subtitle: 'NEET & Medical Batches', href: '/courses?goal=doctor', color: '#00A3FF' },
    { label: 'Engineer (IIT-JEE)', subtitle: 'JEE Main & Advanced', href: '/courses?goal=engineer', color: '#FF9800' },
    { label: '6-10th (Foundation)', subtitle: 'Junior & Olympiads', href: '/courses?goal=foundation', color: '#2E7D32' },
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
