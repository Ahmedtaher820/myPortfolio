<script setup lang="ts">
import { site } from '../../../shared/data/site'

const root = ref<HTMLElement | null>(null)
const socialRail = ref<HTMLElement | null>(null)
const indicator = ref<HTMLElement | null>(null)

const letters = [
  { char: 'A', under: '.' },
  { char: 'H', under: 'H' },
  { char: 'M', under: '.' },
  { char: 'E', under: 'E' },
  { char: 'D', under: '.' },
  { char: ' ', under: '' },
  { char: 'T', under: 'T' },
  { char: 'A', under: '.' },
  { char: 'H', under: 'H' },
  { char: 'E', under: '.' },
  { char: 'R', under: 'R' },
]

const titleChars = 'SENIOR FRONT-END DEVELOPER'.split('')

onMounted(async () => {
  await nextTick()
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced || !root.value) return

  const { $gsap } = useNuxtApp()
  const gsap = $gsap as typeof import('gsap').default

  const ctx = gsap.context(() => {
    const spans = root.value!.querySelectorAll('.outlined-name span')
    const bounce = root.value!.querySelectorAll('.outlined-name span[data-bounce="1"]')

    gsap.from('.hero-panel', {
      opacity: 0,
      y: 24,
      duration: 1.1,
      ease: 'power2.out',
      delay: 0.15,
    })

    gsap.from(spans, {
      yPercent: 120,
      duration: 1,
      stagger: 0.04,
      ease: 'expo.inOut',
      delay: 0.2,
    })

    gsap.to(bounce, {
      y: 18,
      duration: 1,
      yoyo: true,
      repeat: -1,
      stagger: 0.05,
      ease: 'expo.inOut',
      delay: 1.2,
    })
  }, root.value)

  onBeforeUnmount(() => ctx.revert())
})

function onSocialEnter(e: Event) {
  const target = e.currentTarget as HTMLElement
  if (!indicator.value || !socialRail.value) return
  const { $gsap } = useNuxtApp()
  const gsap = $gsap as typeof import('gsap').default
  const railLeft = socialRail.value.getBoundingClientRect().left
  const x = target.getBoundingClientRect().left - railLeft
  gsap.to(indicator.value, {
    x,
    duration: 0.85,
    ease: 'elastic.out(1, 0.6)',
  })
}
</script>

<template>
  <section
    id="top"
    ref="root"
    class="section-pad min-h-[88vh] flex flex-col justify-center relative overflow-hidden"
  >
    <div class="hero-panel max-w-5xl">
      <p class="html-tag mb-4" aria-hidden="true">&lt;h1&gt;</p>
      <h1 class="outlined-name font-display text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] leading-none tracking-[-0.06em] mb-6 flex flex-wrap gap-x-1">
        <span
          v-for="(item, i) in letters"
          :key="i"
          :data-char="item.under || item.char"
          :data-bounce="item.under && item.under !== '.' ? '1' : '0'"
          class="overflow-hidden"
        >{{ item.char === ' ' ? '\u00A0' : item.char }}</span>
      </h1>
      <p class="html-tag mb-2" aria-hidden="true">&lt;/h1&gt;</p>

      <h2 class="relative w-fit mb-8">
        <span class="html-tag absolute -left-10 top-1/2 -translate-y-1/2 hidden md:inline" aria-hidden="true">&lt;h3&gt;</span>
        <span class="flex flex-wrap gap-0.5 text-base md:text-xl tracking-[-0.08em] text-white/90">
          <span
            v-for="(c, i) in titleChars"
            :key="i"
            class="inline-block hover:text-accent transition-colors"
          >{{ c === ' ' ? '\u00A0' : c }}</span>
        </span>
        <span class="html-tag absolute -right-12 top-1/2 -translate-y-1/2 hidden md:inline" aria-hidden="true">&lt;/h3&gt;</span>
      </h2>

      <p class="max-w-xl text-fog text-base md:text-lg mb-8 leading-relaxed">
        {{ site.about.summary }}
      </p>

      <div class="relative w-fit mb-10">
        <span class="html-tag absolute -top-5 left-0" aria-hidden="true">&lt;div class="btn-group"&gt;</span>
        <div class="flex flex-wrap gap-4">
          <a href="#work" class="btn-outline">View Projects</a>
          <a :href="site.cvPath" target="_blank" rel="noopener" class="btn-outline">Download CV</a>
          <a href="#contact" class="btn-outline">Contact Me</a>
        </div>
        <span class="html-tag absolute -bottom-5 right-0" aria-hidden="true">&lt;/div&gt;</span>
      </div>

      <div ref="socialRail" class="relative pt-4">
        <span class="html-tag absolute -top-1 left-0" aria-hidden="true">&lt;ul&gt;</span>
        <div class="relative flex items-center gap-8">
          <span
            ref="indicator"
            class="absolute -top-2 left-0 w-2 h-2 rounded-full bg-accent"
            aria-hidden="true"
          />
          <a
            v-for="s in site.socials"
            :key="s.id"
            :href="s.href"
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm text-white/80 hover:text-accent transition-colors"
            @pointerenter="onSocialEnter"
          >
            {{ s.label }}
          </a>
        </div>
        <span class="html-tag absolute -bottom-1 right-0" aria-hidden="true">&lt;/ul&gt;</span>
      </div>
    </div>

    <div
      class="pointer-events-none absolute right-[-10%] top-1/2 -translate-y-1/2 w-[42vw] max-w-xl opacity-20 hidden lg:block"
      aria-hidden="true"
    >
      <div class="aspect-square rounded-full bg-gradient-to-br from-accent/40 via-transparent to-accent-mint/30 blur-2xl" />
    </div>
  </section>
</template>
