import type { HighlightItem } from '../types/portfolio'

/** CV-backed proof points only — no invented stats */
export const highlights: HighlightItem[] = [
  {
    id: 'sumaya-lighthouse',
    value: '65→95 · 70→99',
    label: 'Sumaya369 LMS',
    detail:
      'Lighthouse Performance and SEO on the Elyak Sumaya369 public site and dashboard migration (Vue 3, Nuxt SSR, virtual scrolling, lazy loading).',
  },
  {
    id: 'from-scratch',
    value: 'From scratch',
    label: 'Bemaal & Mashawirk',
    detail:
      'Sole front-end on Bemaal (website + dashboards, custom design system, PWA). Built and shipped Mashawirk as a live Nuxt 4 consumer product.',
  },
  {
    id: 'moteelz-lead',
    value: '5+',
    label: 'Frontend developers led',
    detail:
      'Led the Moteelz rewrite from Vue 2 / Vuex (3,000+ line components) to Vue 3, Pinia, and Tailwind with coding standards.',
  },
  {
    id: 'erp-builder',
    value: '~80%',
    label: 'ERP UI from page builder',
    detail:
      'Nathan Digital drag-and-drop ERP page builder (tables, charts, forms, navigation) produced about 80% of ERP UI in production.',
  },
  {
    id: 'senior-promo',
    value: 'Promoted',
    label: 'Senior at Nathan Digital',
    detail:
      'Joined as Front End Developer; promoted to Senior after delivering the PrimeVue form configurator used in production by ClubLab Golf.',
  },
  {
    id: 'erp-systems',
    value: '4+',
    label: 'ERP systems FE lead',
    detail:
      'Led front-end work across multiple ERP systems and guided teams in Dubai and Kenya, including ClubLab Golf and GolfKraft.',
  },
  {
    id: 'bemaal-schedule',
    value: '2 weeks early',
    label: 'Bemaal delivery',
    detail:
      'Shipped the Bemaal fintech website and dashboards with PWA features about two weeks ahead of schedule.',
  },
  {
    id: 'ssr-migration',
    value: 'Vue 2 → 3',
    label: 'Legacy modernization',
    detail:
      'Migrated Sumaya369 dashboard to Vue 3 + TypeScript and Nuxt SSR for the public site; modernized Moteelz booking platform stacks.',
  },
]
