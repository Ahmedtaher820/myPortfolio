<script setup lang="ts">
import { motion, AnimatePresence } from 'motion-v'
import { site } from '../../../shared/data/site'

const open = ref(false)
const scrolled = ref(false)
const burger = ref<HTMLButtonElement | null>(null)
const panelRef = ref<HTMLElement | null>(null)

const links = [
  { href: '#about', label: 'About' },
  { href: '#highlights', label: 'Highlights' },
  { href: '#experience', label: 'Experience' },
  { href: '#work', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

onMounted(() => {
  const onScroll = () => {
    scrolled.value = window.scrollY > 80
  }
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && open.value) close()
  }
  window.addEventListener('keydown', onKey)

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('keydown', onKey)
    document.body.style.overflow = ''
  })
})

watch(open, async (isOpen) => {
  if (!import.meta.client) return
  document.body.style.overflow = isOpen ? 'hidden' : ''

  if (!burger.value) return
  const { $gsap } = useNuxtApp()
  const gsap = $gsap as typeof import('gsap').default
  if (!gsap) return
  const lines = burger.value.querySelectorAll('span')
  if (lines.length < 3) return
  const tl = gsap.timeline({ defaults: { duration: 0.22, ease: 'power2.inOut' } })
  if (isOpen) {
    tl.to(lines[1], { scaleX: 0, opacity: 0 })
      .to(lines[0], { y: 7 }, 0)
      .to(lines[2], { y: -7 }, 0)
      .to(lines[0], { rotation: 45 })
      .to(lines[2], { rotation: -45 }, '<')
  } else {
    gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.2 })
    gsap.to(lines[1], { scaleX: 1, opacity: 1, duration: 0.2 })
    gsap.to(lines[2], { rotation: 0, y: 0, duration: 0.2 })
  }
})

function close() {
  open.value = false
}

function goTo(href: string, event?: Event) {
  event?.preventDefault()
  close()
  if (!import.meta.client) return
  const el = document.querySelector(href)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    history.replaceState(null, '', href)
  }
}
</script>

<template>
  <header
    class="sticky top-0 z-[220] flex items-center justify-between gap-4 px-5 md:px-10 lg:px-16 h-16 md:h-[72px] bg-ink/90 backdrop-blur-md border-b border-white/5 transition-shadow"
    :class="{ 'shadow-lg shadow-black/40': scrolled }"
  >
    <a href="#top" class="font-display text-lg md:text-xl text-white no-underline tracking-tight relative z-[230]" @click="goTo('#top', $event)">
      &lt;/Ahmed&gt;
    </a>

    <nav class="hidden lg:flex items-center gap-8" aria-label="Primary">
      <a
        v-for="link in links"
        :key="link.href"
        :href="link.href"
        class="nav-link text-fog hover:text-white text-sm transition-colors relative after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:h-0.5 after:w-0 after:bg-white after:transition-all hover:after:w-full"
        @click="goTo(link.href, $event)"
      >
        {{ link.label }}
      </a>
    </nav>

    <div class="hidden md:flex items-center gap-4 text-xs text-fog">
      <a :href="`tel:${site.phone.replace(/\s/g, '')}`" class="hover:text-accent transition-colors">{{ site.phone }}</a>
      <a :href="`mailto:${site.email}`" class="hover:text-accent transition-colors">{{ site.email }}</a>
    </div>

    <button
      ref="burger"
      type="button"
      class="lg:hidden relative z-[230] w-10 h-5 flex flex-col justify-between"
      :aria-expanded="open"
      aria-controls="mobile-nav"
      :aria-label="open ? 'Close menu' : 'Open menu'"
      @click="open = !open"
    >
      <span class="block w-full h-0.5 bg-white origin-center" />
      <span class="block w-full h-0.5 bg-white origin-center" />
      <span class="block w-full h-0.5 bg-white origin-center" />
    </button>

    <Teleport to="body">
      <AnimatePresence>
        <motion.div
          v-if="open"
          key="mobile-nav-backdrop"
          class="fixed inset-0 z-[200] bg-black/60 backdrop-blur-md lg:hidden"
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :exit="{ opacity: 0 }"
          :transition="{ duration: 0.28 }"
          @click="close"
        />
      </AnimatePresence>

      <AnimatePresence>
        <motion.nav
          v-if="open"
          id="mobile-nav"
          ref="panelRef"
          key="mobile-nav-panel"
          class="fixed inset-y-0 right-0 z-[210] w-[min(100vw,22rem)] bg-ink/95 backdrop-blur-xl border-l border-accent/25 shadow-[-24px_0_60px_rgba(0,0,0,0.65)] flex flex-col px-8 pt-24 pb-10 lg:hidden"
          aria-label="Mobile"
          :initial="{ x: '100%', opacity: 0.75 }"
          :animate="{ x: 0, opacity: 1 }"
          :exit="{ x: '100%', opacity: 0.75 }"
          :transition="{ type: 'spring', stiffness: 340, damping: 34 }"
        >
          <div class="absolute inset-0 pointer-events-none opacity-50" aria-hidden="true">
            <div class="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-accent/25 blur-3xl" />
            <div class="absolute bottom-10 left-0 w-40 h-40 rounded-full bg-accent/10 blur-3xl" />
          </div>

          <a
            v-for="(link, i) in links"
            :key="link.href"
            :href="link.href"
            class="relative text-3xl md:text-4xl text-white py-4 border-b border-white/10 hover:text-accent transition-colors"
            @click="goTo(link.href, $event)"
          >
            <motion.span
              class="block"
              :initial="{ opacity: 0, x: 28 }"
              :animate="{ opacity: 1, x: 0 }"
              :transition="{ delay: 0.1 + i * 0.05, duration: 0.35 }"
            >
              {{ link.label }}
            </motion.span>
          </a>

          <div class="relative mt-auto pt-8 space-y-2 text-sm text-fog">
            <a :href="`mailto:${site.email}`" class="block hover:text-accent transition-colors">{{ site.email }}</a>
            <a :href="`tel:${site.phone.replace(/\s/g, '')}`" class="block hover:text-accent transition-colors">{{ site.phone }}</a>
          </div>
        </motion.nav>
      </AnimatePresence>
    </Teleport>
  </header>
</template>
