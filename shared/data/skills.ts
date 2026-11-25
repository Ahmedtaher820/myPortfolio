import type { SkillGroup } from '../types/portfolio'

/** Aligned to Ahmed_Taher_Senior_Frontend_CV.pdf (+ Bootstrap per preferences) */
export const skillGroups: SkillGroup[] = [
  {
    title: 'Frameworks',
    items: ['Vue 3', 'Nuxt 3', 'React', 'Next.js'],
  },
  {
    title: 'Languages',
    items: ['TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'SCSS'],
  },
  {
    title: 'State',
    items: ['Pinia', 'Vuex', 'Redux Toolkit'],
  },
  {
    title: 'UI',
    items: [
      'Tailwind CSS',
      'PrimeVue',
      'Vuetify',
      'Quasar',
      'Bootstrap',
      'shadcn-vue',
      'shadcn/ui',
      'Design systems',
    ],
  },
  {
    title: 'APIs',
    items: ['REST', 'GraphQL', 'WebSocket', 'SSE'],
  },
  {
    title: 'Tools',
    items: ['Git', 'CI/CD', 'Vite', 'Webpack', 'PWA'],
  },
  {
    title: 'Quality',
    items: [
      'Unit & E2E testing',
      'A11y',
      'Frontend architecture',
      'Code reviews',
      'SSR',
      'SEO',
      'Performance',
    ],
  },
]
