import type { SkillGroup } from '../types/portfolio'

export const skillGroups: SkillGroup[] = [
  {
    title: 'Frameworks',
    items: ['React', 'Next.js', 'Vue 3', 'Nuxt 3', 'Nuxt 4'],
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
    items: ['Tailwind', 'PrimeVue', 'shadcn/ui', 'shadcn-vue'],
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
    items: ['SSR', 'PWA', 'SEO', 'A11y', 'Performance'],
  },
]
