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
</script>

<template>
  <div>
    <HeroIntroCovers @done="introDone = true" />
    <LayoutAppHeader />
    <main>
      <HeroHeroSection />
      <AboutAboutSection />
      <HighlightsHighlightsSection />
      <SkillsSkillsSection />
      <ExperienceExperienceSection />
      <ProjectsProjectsSection />
      <ContactContactSection />
    </main>
    <LayoutAppFooter />
    <LayoutCustomCursor />
  </div>
</template>
