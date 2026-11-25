import type { HighlightItem } from '../types/portfolio'

/** CV-backed proof points only — Ahmed_Taher_Senior_Frontend_CV.pdf */
export const highlights: HighlightItem[] = [
  {
    id: 'sumaya-lighthouse',
    value: '65→95 · 70→99',
    label: 'LMS Lighthouse gains',
    detail:
      'Raised Lighthouse performance and SEO on the Elyak Sumaya369 public site via virtual scrolling, lazy loading, SSR, and accessibility fixes.',
  },
  {
    id: 'from-scratch',
    value: 'From scratch',
    label: 'Fintech ownership',
    detail:
      'Sole frontend on Bemaal — website and dashboards from scratch with Vue 3, TypeScript, Tailwind, PrimeVue, a custom design system, and PWA.',
  },
  {
    id: 'moteelz-lead',
    value: '5+',
    label: 'Frontend developers led',
    detail:
      'Led the Moteelz rewrite from Vue 2 / Vuex (3,000+ line components) to Vue 3, Pinia, and Tailwind with shadcn-vue and coding standards.',
  },
  {
    id: 'erp-builder',
    value: '~80%',
    label: 'ERP UI from page builder',
    detail:
      'Nathan Digital drag-and-drop form configurator and ERP page builder produced about 80% of ERP UI in production.',
  },
  {
    id: 'senior-promo',
    value: 'Promoted',
    label: 'Senior at Nathan Digital',
    detail:
      'Joined as Frontend Developer in Dubai; promoted to Senior after the ClubLab Golf form configurator; shipped ClubLab Golf and GolfKraft with Next.js across 4+ ERP systems.',
  },
  {
    id: 'bemaal-schedule',
    value: '2 weeks early',
    label: 'Bemaal delivery',
    detail:
      'Shipped the Bemaal fintech website and dashboards with PWA support two weeks ahead of schedule.',
  },
  {
    id: 'ssr-migration',
    value: 'Vue 2 → 3',
    label: 'Legacy modernization',
    detail:
      'Migrated Sumaya369 dashboard to Vue 3 + TypeScript and rebuilt the public site on Nuxt with SSR; modernized the Moteelz booking stack.',
  },
]
