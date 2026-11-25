// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: true,
  modules: ['@nuxtjs/tailwindcss', 'motion-v/nuxt'],
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
            'Senior Frontend Engineer with TypeScript across Vue 3, Nuxt, React, and Next.js. Building LMS, ERP, fintech, and booking platforms.',
        },
        { name: 'theme-color', content: '#1d1d1d' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Ahmed Taher — Senior Frontend Engineer' },
        {
          property: 'og:description',
          content:
            'TypeScript-first Senior Frontend Engineer — Vue 3, Nuxt, React, and Next.js for production LMS, ERP, fintech, and booking apps.',
        },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { rel: 'canonical', href: 'https://my-portfolio-pied-delta.vercel.app/' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          // Subset weights; display=swap for CWV
          href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=La+Belle+Aurore&family=Mochiy+Pop+One&display=swap',
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
    // Vercel serverless SSR (Nuxt API routes / Resend). Override locally with NITRO_PRESET if needed.
    preset: process.env.NITRO_PRESET || 'vercel',
    // Avoid prerendering `/` into a static HTML shell that can drift from `/_nuxt` hashes on Vercel.
    // SSR serves HTML + matching build assets from the same deployment.
    prerender: {
      crawlLinks: false,
      routes: [],
    },
  },
})
