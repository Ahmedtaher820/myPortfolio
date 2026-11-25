<script setup lang="ts">
import { motion } from 'motion-v'
import { highlights } from '../../../shared/data/highlights'

const root = ref<HTMLElement | null>(null)
const reduced = ref(false)

/** Duplicate for seamless marquee */
const marqueeItems = computed(() => [...highlights, ...highlights])

onMounted(() => {
  reduced.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
})
</script>

<template>
  <section id="highlights" ref="root" class="section-pad border-t border-white/5 bg-ink-soft/40 overflow-hidden">
    <UiSectionHeading title="Engineering Highlights" tag="h2" />
    <p class="text-fog max-w-2xl mb-10 -mt-6">
      Proof points from shipped work — values taken from the CV, not marketing fluff.
    </p>

    <div class="relative -mx-5 md:-mx-10 lg:-mx-16">
      <div
        class="pointer-events-none absolute inset-y-0 left-0 w-12 md:w-24 z-10 bg-gradient-to-r from-ink-soft/90 to-transparent"
        aria-hidden="true"
      />
      <div
        class="pointer-events-none absolute inset-y-0 right-0 w-12 md:w-24 z-10 bg-gradient-to-l from-ink-soft/90 to-transparent"
        aria-hidden="true"
      />

      <motion.div
        v-if="!reduced"
        class="flex gap-5 w-max will-change-transform px-5 md:px-10 lg:px-16 py-2"
        :animate="{ x: ['0%', '-50%'] }"
        :transition="{
          duration: 48,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop',
        }"
      >
        <article
          v-for="(h, i) in marqueeItems"
          :key="`${h.id}-${i}`"
          class="hl-item shrink-0 w-[min(88vw,22rem)] border border-accent/30 bg-ink/70 px-5 py-6 backdrop-blur-sm"
        >
          <p class="font-display text-2xl md:text-3xl text-accent mb-2 leading-tight">{{ h.value }}</p>
          <p class="text-sm text-white font-medium mb-2">{{ h.label }}</p>
          <p class="text-sm text-fog leading-snug">{{ h.detail }}</p>
        </article>
      </motion.div>

      <div
        v-else
        class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 px-5 md:px-10 lg:px-16"
      >
        <motion.article
          v-for="(h, i) in highlights"
          :key="h.id"
          class="hl-item border border-accent/30 bg-ink/70 px-5 py-6"
          :initial="{ opacity: 0, y: 24 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :viewport="{ once: true, amount: 0.3 }"
          :transition="{ duration: 0.5, delay: i * 0.06 }"
        >
          <p class="font-display text-2xl md:text-3xl text-accent mb-2 leading-tight">{{ h.value }}</p>
          <p class="text-sm text-white font-medium mb-2">{{ h.label }}</p>
          <p class="text-sm text-fog leading-snug">{{ h.detail }}</p>
        </motion.article>
      </div>
    </div>
  </section>
</template>
