import type { ExperienceItem } from '../types/portfolio'

/** Source of truth: Ahmed_Taher_Senior_Frontend_CV.pdf */
export const experience: ExperienceItem[] = [
  {
    id: 'elyak',
    company: 'Elyak',
    title: 'Senior Frontend Developer',
    period: '05/2025 – Present',
    location: 'Saudi Arabia',
    arrangement: 'Remote',
    type: 'full-time',
    product: 'Sumaya369 LMS',
    bullets: [
      'Migrated the LMS dashboard from Vue 2 / JavaScript to Vue 3 + TypeScript; rebuilt the public site on Nuxt with SSR.',
      'Raised Lighthouse performance 65→95 and SEO 70→99 via virtual scrolling, lazy loading, SSR, and accessibility fixes.',
      'Shipped production Home, Courses, Bundles, and Auth flows with a maintainable component architecture.',
    ],
    tech: ['Vue 3', 'Nuxt 3', 'TypeScript', 'Pinia', 'Tailwind', 'SSR'],
  },
  {
    id: 'moteelz',
    company: 'Moteelz',
    title: 'Lead Frontend Developer',
    period: '07/2024 – 03/2025',
    location: 'Saudi Arabia',
    arrangement: 'Remote',
    type: 'full-time',
    product: 'Hotel booking platform',
    bullets: [
      'Led 5+ frontend developers on a Vue 2 / Vuex rewrite to Vue 3, Pinia, and Tailwind, including 3,000+ line legacy components.',
      'Shipped real-time hotel details/images with SSE and standardized UI with shadcn-vue for faster, consistent delivery.',
      'Set coding standards and worked closely with PMs and backend engineers throughout the rewrite.',
    ],
    tech: ['Vue 3', 'Pinia', 'Tailwind', 'SSE', 'shadcn-vue', 'TypeScript'],
  },
  {
    id: 'nathan',
    company: 'Nathan Digital',
    title: 'Senior Frontend Developer',
    period: '07/2023 – 06/2024',
    location: 'Dubai, UAE',
    arrangement: 'On-site',
    type: 'full-time',
    product: 'Joined as Frontend Developer, promoted to Senior',
    bullets: [
      'Built a drag-and-drop form configurator (PrimeVue inputs) used in production by ClubLab Golf; promoted to Senior after delivery.',
      'Built a drag-and-drop ERP page builder (tables, charts, forms, navigation) that produced ~80% of ERP UI.',
      'Led frontend work across 4+ ERP systems with teams in Dubai and Kenya; shipped ClubLab Golf and GolfKraft with Next.js.',
    ],
    tech: ['React', 'Next.js', 'TypeScript', 'PrimeVue'],
  },
  {
    id: 'mahjoz',
    company: 'Mahjoz',
    title: 'Frontend Developer',
    period: '03/2022 – 06/2023',
    location: 'Saudi Arabia',
    arrangement: 'Remote',
    type: 'full-time',
    product: 'Booking platform',
    bullets: [
      'Implemented responsive Vue 3 / Nuxt 3 interfaces from Figma with production-ready API integration.',
      'Integrated GraphQL APIs and added end-to-end tests to reduce regressions before release.',
    ],
    tech: ['Vue 3', 'Nuxt 3', 'TypeScript', 'REST', 'GraphQL'],
  },
  {
    id: 'bemaal',
    company: 'Bemaal',
    title: 'Senior Frontend Developer',
    period: '08/2024 – 02/2025',
    location: 'Saudi Arabia',
    arrangement: 'Remote',
    type: 'part-time',
    product: 'Fintech platform',
    bullets: [
      'Sole frontend developer: built website and dashboards from scratch with Vue 3, TypeScript, Tailwind, PrimeVue, and a custom design system.',
      'Added PWA features and delivered two weeks ahead of schedule.',
    ],
    tech: ['Vue 3', 'TypeScript', 'Tailwind', 'PrimeVue', 'PWA'],
  },
  {
    id: 'easypear',
    company: 'EasyPear',
    title: 'Senior Frontend Developer',
    period: '04/2025 – 12/2025',
    location: 'Canada',
    arrangement: 'Remote',
    type: 'part-time',
    product: 'CRM / ERP platform',
    bullets: [
      'Built a Follow-Up calendar synced with Google Calendar (OAuth), with reliable cross-client date/time handling.',
      'Shipped Vehicle Inventory with advanced filters and listings; refactored legacy modules into reusable adapters.',
    ],
    tech: ['Vue.js', 'TypeScript', 'Google OAuth', 'REST'],
  },
]

export const fullTimeExperience = experience.filter((e) => e.type === 'full-time')
export const partTimeExperience = experience.filter((e) => e.type === 'part-time')
