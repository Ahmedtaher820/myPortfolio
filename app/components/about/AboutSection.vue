<script setup lang="ts">
import { site } from '../../../shared/data/site'

const root = ref<HTMLElement | null>(null)

onMounted(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const mobile = window.matchMedia('(max-width: 1023px)').matches
  if (reduced || mobile || !root.value) return
  const { $gsap } = useNuxtApp()
  const gsap = $gsap as typeof import('gsap').default
  if (!gsap) return

  const ctx = gsap.context(() => {
    gsap.from('.about-reveal', {
      opacity: 0,
      y: 28,
      duration: 0.7,
      stagger: 0.08,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: root.value,
        start: 'top 78%',
      },
    })
  }, root.value)

  onBeforeUnmount(() => ctx.revert())
})
</script>

<template>
  <section id="about" ref="root" class="section-pad border-t border-white/5">
    <div class="max-w-6xl">
      <div class="about-reveal mb-8 md:mb-10">
        <UiSectionHeading title="About" tag="h2" />
      </div>

      <div class="about-reveal grid lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-10 lg:gap-14 items-start">
        <div class="space-y-5 max-w-2xl">
          <p
            v-for="(para, i) in site.about.body"
            :key="i"
            class="text-base md:text-lg leading-relaxed text-white/85 m-0"
          >
            {{ para }}
          </p>
        </div>

        <div class="space-y-8 lg:pt-1">
          <ul class="space-y-3 text-fog list-none m-0 p-0">
            <li
              v-for="item in site.about.focus"
              :key="item"
              class="flex gap-3 border-l-2 border-accent/40 pl-4 py-0.5"
            >
              <span class="text-white/90 leading-relaxed">{{ item }}</span>
            </li>
          </ul>
          <p class="text-sm text-fog border-t border-white/10 pt-6 m-0">
            {{ site.about.education }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
