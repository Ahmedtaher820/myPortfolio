import type { ExperienceItem } from '../types/portfolio'

/** Source of truth: Ahmed_Taher_Hamouda_Senior_Frontend_CV.pdf */
export const experience: ExperienceItem[] = [
  {
    id: 'elyak',
    company: 'Elyak',
    title: 'Senior Front End Developer',
    period: '05/2025 – Present',
    location: 'Saudi Arabia',
    arrangement: 'Remote',
    type: 'full-time',
    product: 'Sumaya369 LMS',
    bullets: [
      'Migrated the dashboard from Vue 2 / JavaScript to Vue 3 + TypeScript; built the public website on Nuxt (SSR).',
      'Raised performance from 65 to 95 and SEO from 70 to 99 using virtual scrolling, lazy loading and SSR; improved accessibility.',
      'Built the Home, Courses, Bundles and Auth pages with SOLID, Singleton and Adapter patterns.',
    ],
    tech: ['Vue 3', 'Nuxt', 'TypeScript', 'Pinia', 'Tailwind', 'SCSS', 'SSR'],
  },
  {
    id: 'moteelz',
    company: 'Moteelz',
    title: 'Lead Front End Developer',
    period: '07/2024 – 03/2025',
    location: 'Saudi Arabia',
    arrangement: 'Remote',
    type: 'full-time',
    product: 'Hotel booking platform',
    bullets: [
      'Led 5+ developers in rewriting a legacy codebase (Vue 2, Vuex, 3,000+ line components) to Vue 3, Pinia and Tailwind CSS.',
      'Built real-time hotel details and images with SSE; used shadcn/ui for a consistent UI.',
      'Set coding standards and worked closely with project managers and backend developers.',
    ],
    tech: ['Vue 3', 'Pinia', 'Tailwind', 'SSE', 'shadcn/ui', 'TypeScript'],
  },
  {
    id: 'nathan',
    company: 'Nathan Digital',
    title: 'Senior Front End Developer',
    period: '07/2023 – 06/2024',
    location: 'Dubai, UAE',
    arrangement: 'On-site',
    type: 'full-time',
    product: 'Joined as Front End Developer, promoted to Senior',
    bullets: [
      'Built a drag-and-drop form configurator (all PrimeVue inputs), used in production by ClubLab Golf; promoted to Senior after delivery.',
      'Built a drag-and-drop ERP page builder (tables, charts, forms, navigation) that produced about 80% of the ERP UI.',
      'Led front-end work on 4+ ERP systems, guided teams in Dubai and Kenya, and built ClubLab Golf and GolfKraft with Next.js.',
    ],
    tech: ['Nuxt 3', 'PrimeVue', 'TypeScript', 'Next.js', 'Pinia', 'SCSS'],
  },
  {
    id: 'mahjoz',
    company: 'Mahjoz',
    title: 'Front End Developer',
    period: '03/2022 – 06/2023',
    location: 'Saudi Arabia',
    arrangement: 'Remote',
    type: 'full-time',
    product: 'Booking platform',
    bullets: [
      'Converted Figma designs into responsive Vue 3 and Nuxt 3 interfaces.',
      'Integrated GraphQL APIs and wrote end-to-end tests.',
    ],
    tech: ['Vue 3', 'Nuxt 3', 'TypeScript', 'GraphQL', 'SCSS'],
  },
  {
    id: 'bemaal',
    company: 'Bemaal',
    title: 'Senior Front End Developer',
    period: '08/2024 – 02/2025',
    location: 'Saudi Arabia',
    arrangement: 'Remote',
    type: 'part-time',
    product: 'Fintech platform',
    bullets: [
      'Sole front-end developer: built the website and dashboards from scratch with Vue 3, TypeScript, Tailwind CSS and PrimeVue, plus a custom design system.',
      'Added PWA features and delivered two weeks ahead of schedule.',
    ],
    tech: ['Vue 3', 'TypeScript', 'Tailwind', 'PrimeVue', 'PWA'],
  },
  {
    id: 'easypear',
    company: 'EasyPear',
    title: 'Senior Front End Developer',
    period: '04/2025 – 12/2025',
    location: 'Canada',
    arrangement: 'Remote',
    type: 'part-time',
    product: 'CRM / ERP platform',
    bullets: [
      'Built a Follow-Up calendar synced with Google Calendar (Google OAuth), handling date and time across clients.',
      'Built the Vehicle Inventory page with advanced filters and card listings.',
      'Refactored legacy code to functional programming with Adapter and Singleton patterns.',
    ],
    tech: ['Vue.js', 'TypeScript', 'Google OAuth', 'Google Calendar API', 'REST'],
  },
]

export const fullTimeExperience = experience.filter((e) => e.type === 'full-time')
export const partTimeExperience = experience.filter((e) => e.type === 'part-time')
