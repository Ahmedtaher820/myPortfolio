// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: true,
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.ts',
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Ahmed Taher — Senior Frontend Engineer',
      meta: [
        {
          name: 'description',
          content:
            'Senior Frontend Engineer specializing in Vue 3, Nuxt, React, Next.js, and TypeScript. Building LMS, ERP, fintech, and booking platforms.',
        },
        { name: 'theme-color', content: '#1d1d1d' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Ahmed Taher — Senior Frontend Engineer' },
        {
          property: 'og:description',
          content:
            'Senior Frontend Engineer specializing in Vue 3, Nuxt, React, Next.js, and TypeScript.',
        },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { rel: 'canonical', href: 'https://my-portfolio-pied-delta.vercel.app/' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=La+Belle+Aurore&family=Mochiy+Pop+One&display=swap',
        },
      ],
    },
  },
  runtimeConfig: {
    resendApiKey: '',
    contactToEmail: 'ahmedtaher4550@gmail.com',
    contactFromEmail: 'Portfolio Contact <onboarding@resend.dev>',
    public: {
      siteUrl: 'https://my-portfolio-pied-delta.vercel.app',
    },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
    },
  },
})
