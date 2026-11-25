<script setup lang="ts">
import {
  fullTimeExperience,
  partTimeExperience,
} from '../../../shared/data/experience'
import type { ExperienceItem } from '../../../shared/types/portfolio'

const root = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!root.value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const { $gsap } = useNuxtApp()
  const gsap = $gsap as typeof import('gsap').default
  const ctx = gsap.context(() => {
    gsap.from('.exp-card', {
      opacity: 0,
      x: -30,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: { trigger: root.value, start: 'top 75%' },
    })
  }, root.value)
  onBeforeUnmount(() => ctx.revert())
})

function badge(item: ExperienceItem) {
  return item.type === 'full-time' ? 'Full-time' : 'Part-time / Contract'
}
</script>

<template>
  <section id="experience" ref="root" class="section-pad border-t border-white/5">
    <UiSectionHeading title="Experience" tag="h2" />

    <h3 class="text-white/70 text-sm uppercase tracking-[0.18em] mb-6">Full-time</h3>
    <ol class="relative border-l border-accent/40 ml-3 md:ml-4 space-y-8 mb-16 list-none">
      <li
        v-for="job in fullTimeExperience"
        :key="job.id"
        class="exp-card relative pl-8 md:pl-10"
      >
        <span class="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-accent" />
        <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
          <h4 class="text-xl text-white m-0">{{ job.company }}</h4>
          <span class="text-accent text-sm">{{ job.title }}</span>
          <span class="text-xs px-2 py-0.5 border border-white/20 text-fog">{{ badge(job) }}</span>
        </div>
        <p class="text-sm text-fog mb-1">{{ job.period }} · {{ job.location }} ({{ job.arrangement }})</p>
        <p v-if="job.product" class="text-sm text-white/60 mb-3">{{ job.product }}</p>
        <ul class="space-y-2 text-white/80 text-sm leading-relaxed mb-3">
          <li v-for="(b, i) in job.bullets" :key="i">{{ b }}</li>
        </ul>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="t in job.tech"
            :key="t"
            class="text-xs text-accent/90 border border-accent/30 px-2 py-0.5"
          >{{ t }}</span>
        </div>
      </li>
    </ol>

    <h3 class="text-white/70 text-sm uppercase tracking-[0.18em] mb-6">Part-time / Contract</h3>
    <ol class="relative border-l border-white/25 ml-3 md:ml-4 space-y-8 list-none">
      <li
        v-for="job in partTimeExperience"
        :key="job.id"
        class="exp-card relative pl-8 md:pl-10"
      >
        <span class="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-white/70" />
        <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
          <h4 class="text-xl text-white m-0">{{ job.company }}</h4>
          <span class="text-accent text-sm">{{ job.title }}</span>
          <span class="text-xs px-2 py-0.5 border border-white/20 text-fog">{{ badge(job) }}</span>
        </div>
        <p class="text-sm text-fog mb-1">{{ job.period }} · {{ job.location }} ({{ job.arrangement }})</p>
        <p v-if="job.product" class="text-sm text-white/60 mb-3">{{ job.product }}</p>
        <ul class="space-y-2 text-white/80 text-sm leading-relaxed mb-3">
          <li v-for="(b, i) in job.bullets" :key="i">{{ b }}</li>
        </ul>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="t in job.tech"
            :key="t"
            class="text-xs text-accent/90 border border-accent/30 px-2 py-0.5"
          >{{ t }}</span>
        </div>
      </li>
    </ol>
  </section>
</template>
