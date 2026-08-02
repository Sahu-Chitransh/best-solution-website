// Hero slider data
export const HERO_SLIDES = [
  {
    eyebrow: 'JEE Advanced 2025 · AIR 1833',
    title: ['Highest Selection', 'Ratio in Indore.'],
    body: '22 of 36 students in our Pinnacle Program crossed 95%ile in JEE Main 2025. Our teaching floor is built on rigour, not luck.',
    primaryCta: { label: 'See JEE Program', href: '/courses' },
    secondaryCta: { label: 'Book a demo', href: '/admissions' },
    image: '/images/jee/JEE_01.png',
    stat: { value: 'AIR 1833', label: 'Samarth Khandelwal · JEE Adv. 2025' },
  },
  {
    eyebrow: 'JEE Main 2023 · 99.48%ile',
    title: ['Where Toppers', 'Are Made.'],
    body: 'Srujan Gawande scored 99.48%ile in JEE Main 2023 — trained entirely at Best Solution, Vijay Nagar.',
    primaryCta: { label: 'Our Results', href: '/about' },
    secondaryCta: { label: 'Meet Faculty', href: '/faculty' },
    image: '/images/jee/JEE_02.png',
    stat: { value: '99.48%', label: 'Srujan Gawande · JEE Main 2023' },
  },
  {
    eyebrow: 'NEET 2024 · 645/720',
    title: ['Medical Dreams', 'Start Here.'],
    body: 'Anita Kulkarni cracked NEET in her first attempt with 645/720. Biology diagrams and NCERT drills — every single day.',
    primaryCta: { label: 'See NEET Program', href: '/courses' },
    secondaryCta: { label: 'Book a demo', href: '/admissions' },
    image: '/images/neet/NEET_01.png',
    stat: { value: '645/720', label: 'Anita Kulkarni · NEET 2024' },
  },
];

// Stats data
export const STATS = [
  { value: '3800+', label: 'Students Trained' },
  { value: '99.48', label: 'Top %ile JEE 2023' },
  { value: 'AIR 1833', label: 'JEE Advanced 2025' },
  { value: '77%', label: 'Selection Ratio 2024' },
];

// Marquee items
export const MARQUEE_ITEMS = [
  '⭐ JEE Main 2023 · 99.48%ile',
  'JEE Adv. 2025 · AIR 1833',
  '77% Selection Ratio',
  '3800+ Students Trained',
  'NEET 2024 · 645/720',
  'KVPY SA Qualified · 2023',
];

// Why Us cards
export const WHY_US = [
  { icon: 'Trophy', t: 'Toppers Every Year', d: 'Consistent JEE/NEET rankers since 2010.' },
  { icon: 'Users', t: 'Small Batches', d: '25–30 students — no one gets lost.' },
  { icon: 'Target', t: 'Personal Mentor', d: '1-on-1 goal-setting every fortnight.' },
  { icon: 'ClipboardCheck', t: 'Sunday Tests', d: 'Weekly full-length mocks + analysis.' },
  { icon: 'Award', t: 'Scholarships', d: 'Up to 50% based on entrance test.' },
  { icon: 'Sparkles', t: 'Doubt Support', d: 'Doubt hours daily 6–8 PM, no queue.' },
];

// Courses
export const COURSES = [
  {
    slug: 'iit-jee',
    grade: 'Class 11 – 12 + Droppers',
    title: 'IIT-JEE (Main + Advanced)',
    tagline: 'Rank-focused. Concept-first.',
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    price: 'From ₹75,000 / year',
    color: '#D32F2F',
    span: 8,
  },
  {
    slug: 'neet',
    grade: 'Class 11 – 12 + Droppers',
    title: 'NEET (Medical)',
    tagline: 'White-coat begins here.',
    subjects: ['Biology', 'Physics', 'Chemistry'],
    price: 'From ₹68,000 / year',
    color: '#2E7D32',
    span: 4,
  },
  {
    slug: 'olympiad',
    grade: 'Class 6 – 10',
    title: 'Olympiads & NTSE / KVPY',
    tagline: 'Sharpen the champion mind, early.',
    subjects: ['Maths', 'Science', 'Reasoning'],
    price: 'From ₹22,000 / year',
    color: '#0A0A0A',
    span: 4,
  },
  {
    slug: 'ccg',
    grade: 'Class 9 – 12',
    title: 'CCG – Career & Competitive Guidance',
    tagline: 'Find your track. Own the race.',
    subjects: ['Aptitude', 'Career Mapping', 'Board + Exam Blend'],
    price: 'From ₹18,000 / year',
    color: '#FFC107',
    span: 8,
  },
];

// Facilities
export const FACILITIES = [
  { icon: 'Presentation', t: 'Smart Classrooms' },
  { icon: 'BookOpen', t: 'Library' },
  { icon: 'House', t: 'Hostel' },
  { icon: 'Bus', t: 'Transportation' },
  { icon: 'Coffee', t: 'Quiet Study Area' },
  { icon: 'Utensils', t: 'Canteen' },
];

// Testimonials
export const TESTIMONIALS = [
  {
    name: 'Srujan Gawande',
    tag: 'JEE Main 2023 – 99.48%ile',
    quote: 'Best Solution built me from scratch. The Sunday tests and mentor calls literally shaped my JEE journey.',
    image: '/images/srujan.png',
  },
  {
    name: 'Samarth Khandelwal',
    tag: 'JEE Advanced 2025 – AIR 1833',
    quote: 'Pinnacle program is intense but honest. 22 of 36 students crossed 95%ile — I was one of them.',
    image: '/images/samarth.png',
  },
  {
    name: 'Anita Kulkarni',
    tag: 'NEET 2024 – 645/720',
    quote: "Biology diagrams and NCERT drills every single day. That's why I could crack NEET in first attempt.",
    image: '/images/anita.jpg',
  },
];

// Navigation
export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Courses', href: '/courses' },
  { label: 'Faculty', href: '/faculty' },
  { label: 'Timetable', href: '/timetable' },
  { label: 'Fees', href: '/fees' },
  { label: 'Admissions', href: '/admissions' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

// Footer
export const FOOTER_EXPLORE = [
  [
    { label: 'Home', href: '/' },
    { label: 'Courses', href: '/courses' },
    { label: 'Timetable', href: '/timetable' },
    { label: 'Admissions', href: '/admissions' },
    { label: 'Blog', href: '/blog' },
  ],
  [
    { label: 'About', href: '/about' },
    { label: 'Faculty', href: '/faculty' },
    { label: 'Fees', href: '/fees' },
    { label: 'Testimonials', href: '/testimonials' },
    { label: 'Contact', href: '/contact' },
  ],
];

export const CONTACT_INFO = {
  address: '18/19 Sayaji Square, Near Hotel Park, Vijay Nagar, Indore (M.P.)',
  phones: ['94259 59956', '0731-4088896'],
  email: 'info@bestsolutionindore.com',
  instagram: '@bestsolutionindore',
};

// Form options
export const GRADE_OPTIONS = [
  'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12', 'Dropper',
];

export const COURSE_OPTIONS = [
  'IIT-JEE (Main + Advanced)',
  'NEET (Medical)',
  'Olympiads & NTSE / KVPY',
  'CCG – Career Guidance',
  'Foundation (Class 6–8)',
  'Board Exam Prep',
];

// JEE Results images
export const JEE_RESULTS = [
  '/images/jee/01.png',
  '/images/jee/02.png',
  '/images/jee/03.png',
  '/images/jee/04.png',
  '/images/jee/05.png',
  '/images/jee/06.png',
  '/images/jee/07.png',
  '/images/jee/08.png',
  '/images/jee/09.png',
  '/images/jee/10.png',
  '/images/jee/11.png',
  '/images/jee/12.png',
  '/images/jee/13.png',
  '/images/jee/14.png',
  '/images/jee/JEE_01.png',
  '/images/jee/JEE_02.png',
  '/images/jee/JEE_03.png',
];

// NEET Results images
export const NEET_RESULTS = [
  '/images/neet/NEET_01.png',
  '/images/neet/NEET_02.png',
  '/images/neet/NEET_03.png',
  '/images/neet/NEET_04.png',
  '/images/neet/NEET_05.png',
  '/images/neet/NEET_06.png',
  '/images/neet/NEET_07.png',
  '/images/neet/NEET_08.png',
];

// Pamphlet
export const PAMPHLET_IMAGE = '/images/common/pamphlet_july_2026.jpeg';

// Logo
export const LOGO_IMAGE = '/images/jee/Best_Solution_LOGO.png';
