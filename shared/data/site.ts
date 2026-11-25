export const site = {
  name: 'Ahmed Taher',
  fullName: 'Ahmed Taher Hamouda',
  title: 'Senior Frontend Engineer',
  shortTitle: 'Senior Front End Developer',
  location: 'Dubai, UAE',
  phone: '+971 55 447 9557',
  email: 'ahmedtaher4550@gmail.com',
  cvPath: '/cv/Ahmed_Taher_Hamouda_Senior_Frontend_CV.pdf',
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
    /** Hero + SEO short blurb — React/Next equal to Vue/Nuxt; TypeScript emphasized. */
    summary:
      'Senior Front End Developer with 4+ years of experience building production apps in TypeScript across Vue 3, Nuxt, React, and Next.js. I modernize legacy frontends, improve performance and SEO, and ship LMS, ERP, fintech, and booking platforms.',
    /** Longer About body — CV-backed only. */
    body: [
      'I work across Vue 3, Nuxt, React, and Next.js with TypeScript as the default for maintainable production code. My focus is shipping scalable frontend architecture for real products—not demos—including LMS, ERP/CRM, fintech, and booking systems.',
      'Recent work includes migrating Sumaya369 from Vue 2 to Vue 3 + TypeScript with a Nuxt SSR public site (Lighthouse Performance 65→95, SEO 70→99), leading the Moteelz rewrite with a team of 5+ frontend developers, and sole front-end ownership of Bemaal’s website and dashboards (PWA, delivered about two weeks early).',
      'At Nathan Digital I was promoted to Senior after shipping the PrimeVue form configurator used in production by ClubLab Golf, and built an ERP page builder that produced about 80% of ERP UI. I care about coding standards, SSR/SEO, and systems that stay fast as they grow.',
    ],
    focus: [
      'TypeScript-first frontend architecture across Vue/Nuxt and React/Next',
      'Team leadership and coding standards',
      'Performance, SSR, and SEO',
      'Booking, auth, dashboards, ERP/CRM, and reusable systems',
    ],
    education:
      "Bachelor's Degree, Computers and Informatics — Suez Canal University, Egypt | 2019 – 2022",
  },
} as const
