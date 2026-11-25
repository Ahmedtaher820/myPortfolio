<script setup lang="ts">
import { skillGroups } from '../../../shared/data/skills'

const root = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!root.value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const { $gsap } = useNuxtApp()
  const gsap = $gsap as typeof import('gsap').default
  const ctx = gsap.context(() => {
    gsap.from('.skill-group', {
      opacity: 0,
      y: 24,
      duration: 0.65,
      stagger: 0.08,
      ease: 'power2.out',
      scrollTrigger: { trigger: root.value, start: 'top 78%' },
    })
  }, root.value)
  onBeforeUnmount(() => ctx.revert())
})
</script>

<template>
  <section id="skills" ref="root" class="section-pad border-t border-white/5">
    <UiSectionHeading title="Technical Expertise" tag="h2" />
    <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
      <div
        v-for="group in skillGroups"
        :key="group.title"
        class="skill-group"
      >
        <h3 class="text-accent text-sm uppercase tracking-[0.16em] mb-4">{{ group.title }}</h3>
        <ul class="flex flex-wrap gap-2 list-none m-0 p-0">
          <li
            v-for="item in group.items"
            :key="item"
            class="text-sm px-3 py-1.5 border border-white/15 text-white/85 hover:border-accent hover:text-accent transition-colors"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
