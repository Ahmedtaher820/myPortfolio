export const site = {
  name: 'Ahmed Taher',
  fullName: 'Ahmed Taher Hamouda',
  title: 'Senior Frontend Developer',
  shortTitle: 'Senior Frontend Developer',
  location: 'Dubai, UAE',
  phone: '+971 55 447 9557',
  email: 'ahmedtaher4550@gmail.com',
  cvPath: '/cv/Ahmed_Taher_Senior_Frontend_CV.pdf',
  socials: [
    {
      id: 'github',
      label: 'GitHub',
      href: 'https://github.com/Ahmedtaher820',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/ahmed-taher-141682221/',
    },
  ],
  about: {
    /** Hero + SEO short blurb — Dubai-based; no project names; balanced React/Next/Vue/Nuxt; TypeScript emphasized. */
    summary:
      'Dubai-based Senior Frontend Developer with 4+ years building and modernizing production web apps across LMS, ERP, booking, and fintech. Strong across Vue 3 / Nuxt and React / Next.js with TypeScript. Available on-site and remotely — known for legacy migrations, measurable performance and SEO gains, and reusable UI systems.',
    /** Longer About body — CV-backed only. */
    body: [
      'Based in Dubai, UAE, I work on-site and remotely across LMS, ERP, booking, and fintech products. Strongest in Vue 3 / Nuxt (SSR) and productive with React / Next.js, with TypeScript as the default for readable, maintainable code.',
      'I ship with product teams: legacy migrations, reusable UI systems, and measurable performance and SEO gains. Recent delivery includes raising Lighthouse performance 65→95 and SEO 70→99 on an LMS public site, leading 5+ frontend developers on a live booking rewrite, and sole frontend ownership of a fintech website and dashboards delivered two weeks ahead of schedule with PWA support.',
      'At Nathan Digital in Dubai I built a drag-and-drop form configurator and ERP page builder (~80% of ERP UI), led frontend work across 4+ ERP systems with teams in Dubai and Kenya, and shipped commercial React / Next.js products after promotion to Senior. I care about coding standards, SSR/SEO, and systems that stay fast as they grow.',
    ],
    focus: [
      'TypeScript-first frontend across Vue 3/Nuxt and React/Next.js',
      'On-site in Dubai and remote collaboration',
      'Legacy migrations and reusable UI systems',
      'Performance, SSR/SEO, and maintainable architecture',
    ],
    education:
      "Bachelor's Degree, Computers and Informatics — Suez Canal University, Egypt | 2019 – 2022",
  },
} as const
