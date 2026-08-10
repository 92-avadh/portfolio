// Projects — drive both the homepage Work grid and the /work/[slug] case studies.
// `slug` is the URL key. Cover images use elegant gradient placeholders until
// real screenshots are dropped into /public/projects/<slug>/.

export const projects = [
  {
    slug: 'hanumante-exports',
    num: '01',
    title: 'Hanumante Exports',
    category: 'Export Import Platform',
    year: '2025',
    role: 'Full-Stack Developer',
    timeline: '6 weeks',
    excerpt:
      'A global trading and supply chain platform optimizing export-import workflows and logistics tracking.',
    challenge:
      'Importers and exporters needed a seamless, real-time portal to coordinate logistics, track shipping manifests, and manage documentation compliance.',
    solution:
      'Developed a responsive web platform integrating interactive shipment tracking, automated manifest generators, and a client portal.',
    results: [
      { value: 200, suffix: '+', label: 'Shipments processed' },
      { value: 4.7, suffix: '★', label: 'Client satisfaction rating', decimals: 1 },
      { value: 40, suffix: '%', label: 'Reduction in admin overhead' },
    ],
    tags: ['Next.js', 'Node.js', 'Express.js', 'Astro JS', 'React', 'MongoDB', 'Maps API'],
    image: '/hanumanteexports.png',
    externalUrl: 'https://hanumanteexports.com',
    liveUrl: null,
    repoUrl: 'https://github.com/92-avadh',
    accent: '#e63329',
    gallery: 3,
  },
  {
    slug: 'tesca-visa-consultancy',
    num: '02',
    title: 'Tesca Visa Consultancy',
    category: 'Consultancy Platform',
    year: '2024',
    role: 'Full-Stack Developer',
    timeline: '5 weeks',
    excerpt:
      'An interactive visa application and tracking portal providing real-time status updates and document checklist management.',
    challenge:
      'Applicants struggle with opaque visa steps and lack a clear, centralized platform to track applications and upload required documents.',
    solution:
      'Built a high-fidelity client portal for tracking visa status, uploading documents securely, and booking consultant slots.',
    results: [
      { value: 3, suffix: '×', label: 'Faster application processing' },
      { value: 12, suffix: '', label: 'Supported countries' },
      { value: 99, suffix: '%', label: 'Client satisfaction' },
    ],
    tags: ['Next.js', 'MERN Stack', 'RESTful APIs', 'Tailwind', 'Upload APIs', 'Astro JS'],
    image: '/tescavisa.png',
    externalUrl: 'https://tescavisa.com',
    liveUrl: null,
    repoUrl: 'https://github.com/92-avadh',
    accent: '#16a34a',
    gallery: 3,
  },
  {
    slug: 'tesca-spoken-english',
    num: '03',
    title: 'Tesca Spoken English',
    category: 'Educational Platform',
    year: '2024',
    role: 'Full-Stack Developer',
    timeline: '6 weeks',
    excerpt:
      'A comprehensive English learning and institute management platform built on the MERN stack.',
    challenge:
      'Students and staff required a central web hub for course schedules, interactive learning modules, spoken English enrollment, and progress tracking.',
    solution:
      'Built a full MERN stack web application featuring responsive course listings, student registration workflows, interactive practice portals, and dynamic content management.',
    results: [
      { value: 1000, suffix: '+', label: 'Students trained' },
      { value: 98, suffix: '%', label: 'Course satisfaction' },
      { value: 100, suffix: '%', label: 'MERN stack architecture' },
    ],
    tags: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'MERN Stack'],
    image: '/tesca_co.png',
    externalUrl: 'https://tesca.co',
    liveUrl: 'https://tesca.co',
    repoUrl: 'https://github.com/92-avadh',
    accent: '#2563eb',
    gallery: 3,
  },
  {
    slug: 'management-dashboard',
    num: '04',
    title: 'Management Dashboard',
    category: 'Dashboard / ERP',
    year: '2024',
    role: 'Engineer',
    timeline: '4 weeks',
    excerpt:
      'A comprehensive administrative panel for managing users, operations, and business performance metrics.',
    challenge:
      'Operators lacked an unified view of business performance, requiring multiple disconnected logins to manage systems and users.',
    solution:
      'Engineered a centralized dashboard aggregating system logs, active user management, and key performance metric charts.',
    results: [
      { value: 24, suffix: '/7', label: 'System monitoring' },
      { value: 60, suffix: 'ms', label: 'Avg. API latency' },
      { value: 100, suffix: '%', label: 'Control & reporting' },
    ],
    tags: ['React', 'REST APIs', 'SQL / NoSQL', 'Data Analytics', 'Charts'],
    image: '/managementdashboard.png',
    noLink: true,
    liveUrl: null,
    repoUrl: 'https://github.com/cricetclub267-spec/box-booking-management',
    accent: '#f59e0b',
    gallery: 3,
  },
]

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug)
}

export function getAdjacentProjects(slug) {
  const idx = projects.findIndex((p) => p.slug === slug)
  return {
    prev: idx > 0 ? projects[idx - 1] : projects[projects.length - 1],
    next: idx < projects.length - 1 ? projects[idx + 1] : projects[0],
  }
}
