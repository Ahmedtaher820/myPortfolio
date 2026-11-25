<script setup lang="ts">
import { site } from '../../../shared/data/site'

const root = ref<HTMLElement | null>(null)

onMounted(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced || !root.value) return
  const { $gsap } = useNuxtApp()
  const gsap = $gsap as typeof import('gsap').default

  const ctx = gsap.context(() => {
    gsap.from('.about-reveal', {
      opacity: 0,
      y: 40,
      duration: 0.9,
      stagger: 0.12,
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
    <UiSectionHeading title="About" tag="h2" />
    <div class="grid lg:grid-cols-12 gap-10 items-start">
      <div class="lg:col-span-5 about-reveal hidden md:block">
        <img
          src="/images/misc/web-img.svg"
          alt=""
          class="w-full max-w-md opacity-90"
          loading="lazy"
        >
      </div>
      <div class="lg:col-span-7 about-reveal space-y-6">
        <p class="text-lg leading-relaxed text-white/85">
          {{ site.about.summary }}
        </p>
        <ul class="space-y-2 text-fog">
          <li v-for="item in site.about.focus" :key="item" class="flex gap-3">
            <span class="text-accent mt-1">▸</span>
            <span>{{ item }}</span>
          </li>
        </ul>
        <p class="text-sm text-fog border-t border-white/10 pt-6">
          {{ site.about.education }}
        </p>
      </div>
    </div>
  </section>
</template>
