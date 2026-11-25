import type { SkillGroup } from '../types/portfolio'

/** Aligned to Ahmed-Taher-Software-Engineer-CV.pdf (+ Vuetify, Bootstrap per brief) */
export const skillGroups: SkillGroup[] = [
  {
    title: 'Frameworks',
    items: ['React', 'Next.js', 'Vue 3', 'Nuxt 3'],
  },
  {
    title: 'Languages',
    items: ['TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'SCSS'],
  },
  {
    title: 'State',
    items: ['Redux Toolkit', 'Pinia', 'Vuex'],
  },
  {
    title: 'UI',
    items: [
      'Tailwind CSS',
      'PrimeVue',
      'Vuetify',
      'Bootstrap',
      'shadcn/ui',
      'shadcn-vue',
      'Design systems',
    ],
  },
  {
    title: 'APIs',
    items: ['REST', 'GraphQL', 'WebSocket', 'SSE', 'OAuth'],
  },
  {
    title: 'Tools',
    items: ['Git', 'CI/CD', 'Vite', 'Webpack', 'Vercel', 'Vitest', 'Playwright'],
  },
  {
    title: 'Other',
    items: ['SSR', 'PWA', 'SEO', 'A11y', 'Performance', 'Code reviews'],
  },
]
