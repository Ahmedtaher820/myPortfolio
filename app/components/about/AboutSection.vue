<script setup lang="ts">
import { site } from '../../../shared/data/site'

const root = ref<HTMLElement | null>(null)

onMounted(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced || !root.value) return
  const { $gsap } = useNuxtApp()
  const gsap = $gsap as typeof import('gsap').default
  if (!gsap) return

  const ctx = gsap.context(() => {
    gsap.from('.about-reveal', {
      opacity: 0,
      y: 36,
      duration: 0.85,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: root.value,
        start: 'top 75%',
      },
    })
  }, root.value)

  onBeforeUnmount(() => ctx.revert())
})
</script>

<template>
  <section id="about" ref="root" class="section-pad border-t border-white/5">
    <!-- Cohesive two-column: heading + content sit together (no empty 5-col image gap). -->
    <div class="grid lg:grid-cols-[minmax(10rem,18rem)_minmax(0,1fr)] gap-6 lg:gap-10 xl:gap-14 items-start max-w-6xl">
      <div class="about-reveal">
        <UiSectionHeading title="About" tag="h2" compact />
        <img
          src="/images/misc/web-img.svg"
          alt=""
          class="hidden lg:block w-full max-w-[14rem] mt-4 opacity-80"
          width="224"
          height="224"
          loading="lazy"
        >
      </div>

      <div class="about-reveal space-y-6 pt-1 lg:pt-3">
        <p class="text-lg leading-relaxed text-white/85 max-w-2xl">
          {{ site.about.summary }}
        </p>
        <ul class="space-y-2 text-fog max-w-2xl">
          <li v-for="item in site.about.focus" :key="item" class="flex gap-3">
            <span class="text-accent mt-1 shrink-0">▸</span>
            <span>{{ item }}</span>
          </li>
        </ul>
        <p class="text-sm text-fog border-t border-white/10 pt-6 max-w-2xl">
          {{ site.about.education }}
        </p>
      </div>
    </div>
  </section>
</template>
