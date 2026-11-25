<script setup lang="ts">
import { highlights } from '../../../shared/data/highlights'

const root = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!root.value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const { $gsap } = useNuxtApp()
  const gsap = $gsap as typeof import('gsap').default
  const ctx = gsap.context(() => {
    gsap.from('.hl-item', {
      opacity: 0,
      y: 28,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: { trigger: root.value, start: 'top 80%' },
    })
  }, root.value)
  onBeforeUnmount(() => ctx.revert())
})
</script>

<template>
  <section id="highlights" ref="root" class="section-pad border-t border-white/5 bg-ink-soft/40">
    <UiSectionHeading title="Engineering Highlights" tag="h2" />
    <p class="text-fog max-w-2xl mb-10 -mt-6">
      Proof points from shipped work — values taken from the CV, not marketing fluff.
    </p>
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <article
        v-for="h in highlights"
        :key="h.label"
        class="hl-item border border-accent/25 bg-ink/60 px-5 py-6"
      >
        <p class="font-display text-3xl md:text-4xl text-accent mb-3">{{ h.value }}</p>
        <p class="text-sm text-fog leading-snug">{{ h.label }}</p>
      </article>
    </div>
  </section>
</template>
