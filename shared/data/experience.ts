import type { ExperienceItem } from '../types/portfolio'

/** Source of truth: Ahmed-Taher-Software-Engineer-CV.pdf */
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
      'Owned LMS dashboard migration (Vue 2 / JavaScript → Vue 3 + TypeScript) and Nuxt 3 SSR public site: Home, Courses, Bundles, Auth.',
      'Raised Lighthouse Performance 65→95 and SEO 70→99; polished loading, empty, and error states with product stakeholders.',
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
      'Led 5+ developers modernizing a production booking app (Vue 2 / Vuex → Vue 3 / Pinia / Tailwind), including 3,000+ line components.',
      'Shipped real-time hotel details and images with SSE; set coding standards with PMs and backend for readable, stable releases.',
    ],
    tech: ['Vue 3', 'Pinia', 'Tailwind', 'SSE', 'TypeScript'],
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
      'Shipped ClubLab Golf and GolfKraft with React / Next.js; promoted to Senior after production delivery.',
      'Built drag-and-drop form configurator and ERP page builder (~80% of ERP UI); owned features from requirements to production with design and product.',
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
      'Built Figma-accurate Vue 3 / Nuxt 3 booking flows with REST / GraphQL and E2E tests to keep production UX stable.',
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
      'Sole frontend owner: shipped website and dashboards from infancy to production (Vue 3, TypeScript, Tailwind, PrimeVue, PWA), about two weeks early.',
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
      'Built Google Calendar Follow-Up sync (OAuth) and Vehicle Inventory filters; refactored legacy modules into reusable adapters.',
    ],
    tech: ['Vue.js', 'TypeScript', 'Google OAuth', 'REST'],
  },
]

export const fullTimeExperience = experience.filter((e) => e.type === 'full-time')
export const partTimeExperience = experience.filter((e) => e.type === 'part-time')
