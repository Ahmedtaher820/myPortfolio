<script setup lang="ts">
import { site } from '../../shared/data/site'

const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl || 'https://my-portfolio-pied-delta.vercel.app'

useSeoMeta({
  title: `${site.name} — ${site.title}`,
  description: site.about.summary,
  ogTitle: `${site.name} — ${site.title}`,
  ogDescription: site.about.summary,
  ogType: 'website',
  ogUrl: siteUrl,
  twitterCard: 'summary_large_image',
  twitterTitle: `${site.name} — ${site.title}`,
  twitterDescription: site.about.summary,
})

useHead({
  link: [{ rel: 'canonical', href: `${siteUrl}/` }],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: site.fullName,
        jobTitle: site.title,
        email: site.email,
        telephone: site.phone,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Dubai',
          addressCountry: 'AE',
        },
        url: siteUrl,
        sameAs: site.socials.map((s) => s.href),
      }),
    },
  ],
})

const introDone = ref(false)

/** Smooth in-page hash navigation (works even if default hash jump is blocked). */
function scrollToHash(hash: string) {
  if (!import.meta.client || !hash.startsWith('#')) return
  const el = document.querySelector(hash)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    history.replaceState(null, '', hash)
  }
}

onMounted(() => {
  if (window.location.hash) {
    nextTick(() => scrollToHash(window.location.hash))
  }
})
</script>

<template>
  <div>
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[300] focus:bg-accent focus:text-ink focus:px-3 focus:py-2"
    >
      Skip to content
    </a>

    <HeroIntroCovers @done="introDone = true" />
    <LayoutAppHeader />
    <main id="main">
      <HeroSection />
      <AboutSection />
      <HighlightsSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
    </main>
    <LayoutAppFooter />
    <LayoutCustomCursor />
  </div>
</template>
