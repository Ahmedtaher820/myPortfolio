<script setup lang="ts">
import { site } from '../../../shared/data/site'

const root = ref<HTMLElement | null>(null)
const socialRail = ref<HTMLElement | null>(null)
const indicator = ref<HTMLElement | null>(null)

/** Match legacy-static: outline letters; filled underlays bounce (non-dot data-char). */
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

const titleChars = 'SENIOR FRONTEND DEVELOPER'.split('')

onMounted(async () => {
  await nextTick()
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced || !root.value) return

  const { $gsap } = useNuxtApp()
  const gsap = $gsap as typeof import('gsap').default
  if (!gsap) return

  const prefersCoarse = window.matchMedia('(max-width: 1023px)').matches

  const ctx = gsap.context(() => {
    const name = root.value!.querySelector<HTMLElement>('.outlined-name')
    if (!name) return

    const spans = name.querySelectorAll<HTMLElement>('span')
    // Only letter spans with a real fill — exclude "." underlays and the space
    const bounce = name.querySelectorAll<HTMLElement>('span[data-char]:not([data-char="."])')

    const fontPx = parseFloat(getComputedStyle(name).fontSize) || 48
    // Legacy: ~55px type, ::before -63px (~1.15em), bounce y:60 (~1.09em).
    // Scale with font so fill parks fully above overflow clip (fixes lg white-letter overlap).
    const bouncePx = Math.round(fontPx * 1.12)
    name.style.setProperty('--name-bounce', `${bouncePx}px`)

    const tl = gsap.timeline({ delay: 0.15 })

    tl.from('.hero-panel', {
      opacity: 0,
      y: 24,
      duration: prefersCoarse ? 0.7 : 1.1,
      ease: 'power2.out',
    }, 0)

    if (!prefersCoarse) {
      tl.from('.hero-portrait', {
        opacity: 0,
        x: 40,
        duration: 1.2,
        ease: 'power2.out',
      }, 0.2)
    }

    tl.set(spans, { yPercent: 100 }, 0)
    tl.to(spans, {
      yPercent: 0,
      duration: prefersCoarse ? 0.75 : 1,
      stagger: prefersCoarse ? 0.03 : 0.05,
      ease: 'expo.inOut',
    }, 0.3)

    // Desktop: legacy-style bounce. Mobile: skip continuous bounce (perf + cleaner).
    if (!prefersCoarse) {
      tl.to(bounce, {
        y: bouncePx,
        duration: 1,
        yoyo: true,
        repeat: -1,
        stagger: 0.05,
        ease: 'expo.inOut',
      })
    }
  }, root.value)

  onBeforeUnmount(() => ctx.revert())
})

function onSocialEnter(e: Event) {
  const target = e.currentTarget as HTMLElement
  if (!indicator.value || !socialRail.value) return
  const { $gsap } = useNuxtApp()
  const gsap = $gsap as typeof import('gsap').default
  if (!gsap) return
  const railLeft = socialRail.value.getBoundingClientRect().left
  const x = target.getBoundingClientRect().left - railLeft
  gsap.to(indicator.value, {
    x,
    duration: 0.85,
    ease: 'elastic.out(1, 0.6)',
  })
}

function goSection(id: string) {
  if (!import.meta.client) return
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  history.replaceState(null, '', `#${id}`)
}
</script>

<template>
  <section
    id="top"
    ref="root"
    class="hero-section relative min-h-[100svh] overflow-hidden px-5 md:px-10 lg:px-16"
  >
    <div
      class="hero-layout relative z-[2] w-full max-w-6xl mx-auto min-h-[100svh] flex flex-col justify-center py-16 md:py-20 lg:py-24 lg:pr-[min(38vw,380px)]"
    >
      <div class="hero-panel flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
        <p class="html-tag mb-4" aria-hidden="true">&lt;h1&gt;</p>
        <h1
          class="outlined-name name font-display text-[clamp(2rem,6vw,5.25rem)] leading-none tracking-[-0.06em] mb-6"
        >
          <span
            v-for="(item, i) in letters"
            :key="i"
            v-bind="item.under ? { 'data-char': item.under } : {}"
            class="relative inline-block"
          >{{ item.char === ' ' ? '\u00A0' : item.char }}</span>
        </h1>
        <p class="html-tag mb-2" aria-hidden="true">&lt;/h1&gt;</p>

        <h2 class="relative w-fit mb-8 mx-auto lg:mx-0">
          <span class="html-tag absolute -left-10 top-1/2 -translate-y-1/2 hidden md:inline" aria-hidden="true">&lt;h3&gt;</span>
          <span class="flex flex-wrap justify-center lg:justify-start gap-0.5 text-base md:text-xl tracking-[-0.08em] text-white/90">
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

        <div class="relative w-fit mb-10 mx-auto lg:mx-0">
          <span class="html-tag absolute -top-5 left-0" aria-hidden="true">&lt;div class="btn-group"&gt;</span>
          <div class="flex flex-wrap justify-center lg:justify-start gap-4">
            <a href="#work" class="btn-outline" @click.prevent="goSection('work')">View Projects</a>
            <a :href="site.cvPath" target="_blank" rel="noopener" class="btn-outline">Download CV</a>
            <a href="#contact" class="btn-outline" @click.prevent="goSection('contact')">Contact Me</a>
          </div>
          <span class="html-tag absolute -bottom-5 right-0" aria-hidden="true">&lt;/div&gt;</span>
        </div>

        <div ref="socialRail" class="relative pt-4 mx-auto lg:mx-0">
          <span class="html-tag absolute -top-1 left-0" aria-hidden="true">&lt;ul&gt;</span>
          <div class="relative flex items-center justify-center lg:justify-start gap-8">
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
    </div>

    <!-- Portrait: lg+ only (mobile looked cramped/halo); feet flush to hero bottom -->
    <div
      class="hero-portrait pointer-events-none select-none absolute z-[1] bottom-0 right-[max(1rem,calc((100vw-72rem)/2))] hidden lg:flex items-end justify-end"
    >
      <div class="relative flex items-end justify-center">
        <div
          class="absolute inset-x-[12%] bottom-0 h-[10%] rounded-[100%] bg-accent/20 blur-2xl"
          aria-hidden="true"
        />
        <picture>
          <source srcset="/images/hero/ahmed-portrait.webp" type="image/webp">
          <img
            src="/images/hero/ahmed-portrait.png"
            alt="Ahmed Taher"
            width="400"
            height="920"
            class="relative z-[1] block w-auto h-[min(88svh,760px)] max-w-[min(36vw,380px)] object-contain object-bottom drop-shadow-[0_24px_48px_rgba(0,0,0,0.5)]"
            decoding="async"
            fetchpriority="high"
          >
        </picture>
      </div>
    </div>
  </section>
</template>
