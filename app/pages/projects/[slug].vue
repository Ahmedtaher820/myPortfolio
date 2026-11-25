<script setup lang="ts">
import { projects } from '../../../shared/data/projects'
import { site } from '../../../shared/data/site'

const route = useRoute()
const slug = String(route.params.slug || '')
const project = projects.find((p) => p.slug === slug)

if (!project) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })
}

const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl || 'https://my-portfolio-pied-delta.vercel.app'

useSeoMeta({
  title: `${project.name} — ${site.name}`,
  description: project.description,
  ogTitle: project.name,
  ogDescription: project.description,
})

useHead({
  link: [{ rel: 'canonical', href: `${siteUrl}/projects/${project.slug}` }],
})
</script>

<template>
  <div class="min-h-screen text-white">
    <LayoutAppHeader />
    <article class="section-pad max-w-5xl mx-auto">
      <NuxtLink to="/#work" class="text-accent text-sm hover:underline">← Back to projects</NuxtLink>
      <p class="font-display text-accent tracking-[0.2em] mt-8 mb-2">{{ project.number }}</p>
      <h1 class="text-4xl md:text-5xl mb-3">{{ project.name }}</h1>
      <p class="text-fog mb-8">{{ project.company }} · {{ project.industry }}</p>
      <img
        :src="project.cover"
        :alt="project.name"
        class="w-full max-h-[480px] object-cover object-top border border-white/10 mb-8"
      >
      <p class="text-lg text-white/85 leading-relaxed mb-6">{{ project.description }}</p>
      <h2 class="text-accent text-sm uppercase tracking-wider mb-2">Role</h2>
      <p class="mb-6">{{ project.role }}</p>
      <h2 class="text-accent text-sm uppercase tracking-wider mb-2">Contributions</h2>
      <ul class="space-y-2 mb-8">
        <li v-for="(c, i) in project.contributions" :key="i">{{ c }}</li>
      </ul>
      <div class="flex flex-wrap gap-2 mb-8">
        <span
          v-for="t in project.tech"
          :key="t"
          class="text-xs border border-accent/40 text-accent px-2 py-1"
        >{{ t }}</span>
      </div>
      <a
        v-if="project.liveUrl"
        :href="project.liveUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="btn-outline"
      >
        Live Preview
      </a>
    </article>
    <LayoutAppFooter />
  </div>
</template>
