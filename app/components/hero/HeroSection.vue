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

const titleChars = 'SENIOR FRONT-END DEVELOPER'.split('')

onMounted(async () => {
  await nextTick()
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced || !root.value) return

  const { $gsap } = useNuxtApp()
  const gsap = $gsap as typeof import('gsap').default
  if (!gsap) return

  const ctx = gsap.context(() => {
    const spans = root.value!.querySelectorAll<HTMLElement>('.outlined-name span[data-char]')
    const bounce = root.value!.querySelectorAll<HTMLElement>(
      '.outlined-name span[data-char]:not([data-char="."])',
    )

    gsap.set(spans, { yPercent: 120 })

    gsap.from('.hero-panel', {
      opacity: 0,
      y: 24,
      duration: 1.1,
      ease: 'power2.out',
      delay: 0.15,
    })

    gsap.from('.hero-portrait', {
      opacity: 0,
      x: 40,
      duration: 1.2,
      ease: 'power2.out',
      delay: 0.35,
    })

    gsap.to(spans, {
      yPercent: 0,
      duration: 1,
      stagger: 0.05,
      ease: 'expo.inOut',
      delay: 0.25,
    })

    gsap.to(bounce, {
      y: 60,
      duration: 1,
      yoyo: true,
      repeat: -1,
      stagger: 0.05,
      ease: 'expo.inOut',
      delay: 1.35,
    })
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
    class="section-pad min-h-[100svh] flex flex-col justify-center relative overflow-hidden"
  >
    <div
      class="hero-layout w-full max-w-6xl mx-auto grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.85fr)] gap-8 lg:gap-6 items-center"
    >
      <div class="hero-panel flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
        <p class="html-tag mb-4" aria-hidden="true">&lt;h1&gt;</p>
        <h1
          class="outlined-name name font-display text-4xl sm:text-5xl md:text-7xl lg:text-[5.25rem] leading-none tracking-[-0.06em] mb-6 inline-flex flex-wrap justify-center lg:justify-start gap-x-1 overflow-hidden"
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

      <div class="hero-portrait relative order-1 lg:order-2 flex justify-center lg:justify-end pointer-events-none select-none">
        <div
          class="relative w-[min(40vw,176px)] sm:w-[200px] md:w-[240px] lg:w-[min(28vw,300px)] xl:w-[320px] max-h-[42svh] lg:max-h-[min(68svh,620px)]"
        >
          <div
            class="absolute inset-x-[12%] bottom-[2%] h-[12%] rounded-[100%] bg-accent/25 blur-2xl"
            aria-hidden="true"
          />
          <img
            src="/images/hero/ahmed-portrait.png"
            alt="Ahmed Taher"
            width="535"
            height="1226"
            class="relative z-[1] w-full h-full max-h-[42svh] lg:max-h-[min(68svh,620px)] object-contain object-bottom drop-shadow-[0_24px_48px_rgba(0,0,0,0.5)]"
            decoding="async"
            fetchpriority="high"
          >
        </div>
      </div>
    </div>
  </section>
</template>
