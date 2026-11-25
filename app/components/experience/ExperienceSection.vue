<script setup lang="ts">
import { motion } from 'motion-v'
import {
  fullTimeExperience,
  partTimeExperience,
} from '../../../shared/data/experience'
import type { ExperienceItem } from '../../../shared/types/portfolio'

const root = ref<HTMLElement | null>(null)

function badge(item: ExperienceItem) {
  return item.type === 'full-time' ? 'Full-time' : 'Part-time / Contract'
}
</script>

<template>
  <section id="experience" ref="root" class="section-pad border-t border-white/5">
    <UiSectionHeading title="Experience" tag="h2" />

    <motion.h3
      class="text-white/70 text-sm uppercase tracking-[0.18em] mb-6"
      :initial="{ opacity: 0, x: -12 }"
      :while-in-view="{ opacity: 1, x: 0 }"
      :viewport="{ once: true }"
      :transition="{ duration: 0.45 }"
    >
      Full-time
    </motion.h3>

    <ol class="relative border-l border-accent/40 ml-3 md:ml-4 space-y-10 mb-16 list-none">
      <motion.li
        v-for="(job, index) in fullTimeExperience"
        :key="job.id"
        class="exp-card relative pl-8 md:pl-10"
        :initial="{ opacity: 0, x: -28 }"
        :while-in-view="{ opacity: 1, x: 0 }"
        :viewport="{ once: true, amount: 0.25 }"
        :transition="{ duration: 0.55, delay: Math.min(index * 0.08, 0.4), ease: 'easeOut' }"
      >
        <motion.span
          class="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-accent block"
          :initial="{ scale: 0 }"
          :while-in-view="{ scale: 1 }"
          :viewport="{ once: true }"
          :transition="{ type: 'spring', stiffness: 420, damping: 18, delay: 0.1 }"
          aria-hidden="true"
        />
        <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
          <h4 class="text-xl text-white m-0">{{ job.company }}</h4>
          <span class="text-accent text-sm">{{ job.title }}</span>
          <span class="text-xs px-2 py-0.5 border border-white/20 text-fog">{{ badge(job) }}</span>
        </div>
        <p class="text-sm text-fog mb-1">{{ job.period }} · {{ job.location }} ({{ job.arrangement }})</p>
        <p v-if="job.product" class="text-sm text-white/60 mb-3">{{ job.product }}</p>
        <ul class="space-y-2 text-white/80 text-sm leading-relaxed mb-3">
          <motion.li
            v-for="(b, i) in job.bullets"
            :key="i"
            :initial="{ opacity: 0, y: 10 }"
            :while-in-view="{ opacity: 1, y: 0 }"
            :viewport="{ once: true }"
            :transition="{ duration: 0.4, delay: 0.12 + i * 0.06 }"
          >
            {{ b }}
          </motion.li>
        </ul>
        <div class="flex flex-wrap gap-2">
          <motion.span
            v-for="(t, ti) in job.tech"
            :key="t"
            class="text-xs text-accent/90 border border-accent/30 px-2 py-0.5 inline-block"
            :initial="{ opacity: 0, y: 8 }"
            :while-in-view="{ opacity: 1, y: 0 }"
            :viewport="{ once: true }"
            :transition="{ duration: 0.35, delay: 0.2 + ti * 0.04 }"
          >{{ t }}</motion.span>
        </div>
      </motion.li>
    </ol>

    <motion.h3
      class="text-white/70 text-sm uppercase tracking-[0.18em] mb-6"
      :initial="{ opacity: 0, x: -12 }"
      :while-in-view="{ opacity: 1, x: 0 }"
      :viewport="{ once: true }"
      :transition="{ duration: 0.45 }"
    >
      Part-time / Contract
    </motion.h3>

    <ol class="relative border-l border-white/25 ml-3 md:ml-4 space-y-10 list-none">
      <motion.li
        v-for="(job, index) in partTimeExperience"
        :key="job.id"
        class="exp-card relative pl-8 md:pl-10"
        :initial="{ opacity: 0, x: -28 }"
        :while-in-view="{ opacity: 1, x: 0 }"
        :viewport="{ once: true, amount: 0.25 }"
        :transition="{ duration: 0.55, delay: Math.min(index * 0.08, 0.35), ease: 'easeOut' }"
      >
        <span class="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-white/70" aria-hidden="true" />
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
      </motion.li>
    </ol>
  </section>
</template>
