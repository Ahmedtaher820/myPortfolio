export const site = {
  name: 'Ahmed Taher',
  fullName: 'Ahmed Taher Hamouda',
  title: 'Frontend Engineer',
  shortTitle: 'Frontend Engineer',
  location: 'Dubai, UAE',
  phone: '+971 55 447 9557',
  email: 'ahmedtaher4550@gmail.com',
  cvPath: '/cv/Ahmed-Taher-Software-Engineer-CV.pdf',
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
    /** Hero + SEO short blurb — Dubai-based; no project names; React/Next ≈ Vue/Nuxt; TypeScript emphasized. */
    summary:
      'Dubai-based Frontend Engineer with 4.5+ years shipping production TypeScript apps across React, Next.js, Vue 3, and Nuxt. Available on-site and remotely — owning features from scope to release with clear UX, maintainable code, and performance-conscious delivery.',
    /** Longer About body — CV-backed only. */
    body: [
      'Based in Dubai, UAE, I work on-site and remotely across fintech, booking, LMS, and ERP products. Hands-on with React and Next.js in production, plus deep Vue 3 and Nuxt experience, with TypeScript as the default for readable, maintainable code.',
      'I own features end to end with product and design: multi-step auth, booking, and inventory flows; crisp loading and error states; and migrations from legacy Vue 2 stacks to Vue 3 + TypeScript. Recent delivery includes raising Lighthouse Performance 65→95 and SEO 70→99 on an LMS public site, leading 5+ developers on a live booking rewrite, and sole frontend ownership of a fintech website and dashboards shipped about two weeks early with PWA support.',
      'At Nathan Digital in Dubai I shipped commercial React / Next.js products and was promoted to Senior after production delivery; I also built a drag-and-drop form configurator and ERP page builder (~80% of ERP UI). I care about coding standards, SSR/SEO, and systems that stay fast as they grow.',
    ],
    focus: [
      'TypeScript-first frontend across React/Next.js and Vue 3/Nuxt',
      'On-site in Dubai and remote collaboration',
      'Feature ownership from scope to release',
      'Performance, SSR/SEO, and maintainable UI systems',
    ],
    education:
      "Bachelor's Degree, Computers and Informatics — Suez Canal University, Egypt | 2019 – 2022",
  },
} as const
