export const NAME = 'Ahsan Zahid';
export const FIRST = 'Ahsan';
export const LAST = 'Zahid';
export const ROLE = 'Full-Stack Developer';
export const EMAIL = 'ahsanzahid1685@gmail.com';
export const LINKEDIN = 'https://www.linkedin.com/in/muhammad-ahsan-zahid-48b34640a';
export const LOCATION = { label: 'Pakistan', code: 'PKT', lat: 30.3753, lon: 69.3451, tz: 'Asia/Karachi' };

export const mailto = (subject, body) => {
  const q = [subject && `subject=${encodeURIComponent(subject)}`, body && `body=${encodeURIComponent(body)}`].filter(Boolean).join('&');
  return `mailto:${EMAIL}${q ? `?${q}` : ''}`;
};

// `menu` names the dropdown a nav item opens on desktop
export const NAV = [
  { id: 'services', label: 'services', menu: 'services' },
  { id: 'method', label: 'method' },
  { id: 'work', label: 'work', menu: 'work' },
  { id: 'more', label: 'more', menu: 'more' },
  { id: 'contact', label: 'contact' },
];

export const HERO = {
  lines: ['Your web partner.', 'Evolved.'],
  sub: 'A five-phase method that turns ideas into fast, reliable web products. A full-stack developer, and your end-to-end web partner.',
  stats: ['Full-stack', '4 client builds', 'Remote · worldwide'],
};

// Client locations the hero globe draws arcs to
export const ARCS = [
  { lat: 42.3459, lon: -71.5523 }, // 2 Designing Women, Marlborough MA
  { lat: 39.8283, lon: -98.5795 }, // Maklin Christman, nationwide US
  { lat: 29.3956, lon: 71.6836 }, // Dental Studio, Bahawalpur
];

export const STACK = [
  { name: 'React', icon: 'react' },
  { name: 'Next.js', icon: 'next' },
  { name: 'Node.js', icon: 'node' },
  { name: 'Express', icon: 'express' },
  { name: 'MongoDB', icon: 'mongo' },
  { name: 'PostgreSQL', icon: 'postgres' },
  { name: 'Tailwind', icon: 'tailwind' },
  { name: 'Three.js', icon: 'three' },
  { name: 'GSAP', icon: 'gsap' },
  { name: 'WordPress', icon: 'wordpress' },
  { name: 'Vercel', icon: 'vercel' },
  { name: 'Git', icon: 'git' },
];

// `core` marks the services most clients come for
export const SERVICES = [
  {
    group: 'Frontend & Product',
    items: [
      { title: 'Web Development', text: 'Fast, responsive sites built to be read, trusted and found.', core: true },
      { title: 'Web Applications', text: 'Full products with auth, dashboards and real workflows.', core: true },
      { title: 'Landing Pages', text: 'Launch pages that load in a blink and convert.' },
    ],
  },
  {
    group: 'Backend & Data',
    items: [
      { title: 'REST APIs', text: 'Clean endpoints with validation and honest error states.', core: true },
      { title: 'Authentication', text: 'Login flows, protected routes, sessions and roles.' },
      { title: 'Databases', text: 'MongoDB & SQL schemas that hold up as you grow.' },
    ],
  },
  {
    group: 'Business Systems',
    items: [
      { title: 'Admin Panels', text: 'Back offices to manage listings, content and users.', core: true },
      { title: 'Dashboards', text: 'Data you can read at a glance and act on.' },
      { title: 'CMS & WordPress', text: 'Sites your team can edit without calling a developer.' },
    ],
  },
  {
    group: 'Ship & Grow',
    items: [
      { title: 'Deployment', text: 'Vercel, environments and production builds done right.' },
      { title: 'Performance', text: 'Core Web Vitals, image and bundle tuning.' },
      { title: 'SEO-ready Builds', text: 'Semantic, crawlable markup from day one.' },
    ],
  },
];

export const METHOD_INTRO =
  'Technology moves faster every month. Most websites fall behind the week they launch. I build the ones that keep up, with a five-phase method that ships fast and stays solid. No bloat. No lock-in. No excuses.';

export const PHASES = [
  {
    name: 'Discover',
    line: 'Most projects fail before the first line of code.',
    points: ["we don't start at the code. we start at the real problem", 'how your business actually works, not the brief version', 'clarity before code'],
  },
  {
    name: 'Diagnose',
    line: 'Guesswork is the most expensive feature.',
    points: ['every slow page, broken flow and silent leak, mapped', 'speed, SEO and conversion, measured not guessed', 'numbers first. opinions later.'],
  },
  {
    name: 'Design',
    line: "I don't sell features. I build outcomes.",
    points: ['every screen tied to a goal you care about', "if it doesn't move the needle, it doesn't make the build", 'a plan you can read, not a pitch deck'],
  },
  {
    name: 'Deliver',
    line: 'Shipped beats perfect. It still has to be solid.',
    points: ['weekly builds you can click, not status reports', 'tested, responsive and deployed to production', 'a handover your team can actually run'],
  },
  {
    name: 'Evolve',
    line: 'What launches and stops is already behind.',
    points: ['monitoring, fixes and improvements after go-live', 'your business changes every quarter, the product keeps up', 'partnership, not a one-off project'],
  },
];

// Frictions float around the audit section; `fix` is what clicking one maps it to
export const FRICTIONS = [
  { text: 'my site keeps slowing down', fix: 'Measure Core Web Vitals, then fix images, bundles and blocking code.' },
  { text: 'my site crashes every week', fix: 'Find the root cause, fix it properly, add monitoring.' },
  { text: "I can't update my own website", fix: 'A CMS or admin panel your team can use without me.' },
  { text: 'my site looks broken on mobile', fix: 'A responsive rebuild, tested on real devices.' },
  { text: 'I run everything on spreadsheets', fix: 'A dashboard and database built around how you work.' },
  { text: 'my forms never reach my inbox', fix: 'Reliable forms with validation, delivery and logging.' },
  { text: 'nobody finds me on Google', fix: 'Semantic, fast, crawlable pages with SEO built in.' },
  { text: 'my booking system is a mess', fix: 'One booking flow, synced to the people who need it.' },
  { text: 'my last developer disappeared', fix: 'An audit, a clean handover and a codebase you own.' },
];

export const TYPED = ['I run my whole business on spreadsheets', 'my site takes forever to load', 'I need an admin panel for my listings'];

export const BANNER =
  "Your website doesn't have to be the flashiest. Your stack doesn't have to be the trendiest. Nor the most expensive. It needs to be right. ";

// Client sites shown in the work carousel. `status: 'soon'` marks a site that is built but not yet public.
export const PROJECTS = [
  {
    id: 'maklin',
    name: 'Maklin Christman',
    tagline: 'Real estate platform',
    description:
      'A real estate platform that matches buyers, sellers and investors with top local agents across the United States, with listings, search filters and an inquiry flow.',
    href: 'https://maklinchristman.com/',
    image: '/projects/maklin-christman.jpg',
    tags: ['Next.js', 'React', 'Property Search'],
  },
  {
    id: 'maklin-admin',
    name: 'Maklin Admin',
    tagline: 'Admin panel',
    description:
      'The secure back office for Maklin Christman: a session-based secret unlocks tools to manage the property listings shown on the public site.',
    href: 'https://admin.maklinchristman.com/',
    image: '/projects/maklin-admin.jpg',
    tags: ['Next.js', 'Admin Panel', 'Secure Access'],
  },
  {
    id: '2dw',
    name: '2 Designing Women',
    tagline: 'Brand website',
    description:
      'A new website for a Marlborough, MA interior design and remodeling showroom in business since 1977. Built and launching soon.',
    href: 'https://2designingwomen.com/',
    image: '/projects/2-designing-women.jpg',
    tags: ['Next.js', 'React', 'Showroom'],
    status: 'soon',
  },
  {
    id: 'dental',
    name: 'Dental Studio',
    tagline: 'Clinic website',
    description:
      'A clinic website for The Dental Studio in Bahawalpur, with services, doctors, news, contact details and appointment booking.',
    href: 'https://dentalstudio.hubtech.pk/#/',
    image: '/projects/dental-studio.jpg',
    tags: ['WordPress', 'Elementor', 'Appointments'],
  },
];

export const ABOUT =
  "I'm Ahsan Zahid, a full-stack developer based in Pakistan, working with clients worldwide. I build websites, platforms and admin panels, and care about the parts most people never see: clean data, honest error states and code that stays easy to change.";
