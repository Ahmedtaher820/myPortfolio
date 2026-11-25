<script setup lang="ts">
import { site } from '../../../shared/data/site'

const open = ref(false)
const scrolled = ref(false)
const burger = ref<HTMLButtonElement | null>(null)

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
  onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
})

watch(open, async (isOpen) => {
  if (!import.meta.client || !burger.value) return
  const { $gsap } = useNuxtApp()
  const gsap = $gsap as typeof import('gsap').default
  const lines = burger.value.querySelectorAll('span')
  if (lines.length < 3) return
  const tl = gsap.timeline({ defaults: { duration: 0.2, ease: 'power1.inOut' } })
  if (isOpen) {
    tl.to(lines[1], { scaleX: 0 })
      .to(lines[0], { y: 7 }, 0)
      .to(lines[2], { y: -7 }, 0)
      .to(burger.value, { rotation: 360 }, 0)
      .to(lines[0], { rotation: 45 })
      .to(lines[2], { rotation: -45 }, '<')
  } else {
    gsap.set(burger.value, { rotation: 0 })
    gsap.set(lines[0], { rotation: 0, y: 0 })
    gsap.set(lines[1], { scaleX: 1 })
    gsap.set(lines[2], { rotation: 0, y: 0 })
  }
})

function close() {
  open.value = false
}
</script>

<template>
  <header
    class="sticky top-0 z-50 flex items-center justify-between gap-4 px-5 md:px-10 lg:px-16 h-16 md:h-[72px] bg-ink/95 backdrop-blur border-b border-white/5 transition-shadow"
    :class="{ 'shadow-lg shadow-black/40': scrolled }"
  >
    <a href="#top" class="font-display text-lg md:text-xl text-white no-underline tracking-tight" @click="close">
      &lt;/Ahmed&gt;
    </a>

    <nav class="hidden lg:flex items-center gap-8" aria-label="Primary">
      <a
        v-for="link in links"
        :key="link.href"
        :href="link.href"
        class="nav-link text-fog hover:text-white text-sm transition-colors relative after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:h-0.5 after:w-0 after:bg-white after:transition-all hover:after:w-full"
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
      class="lg:hidden w-10 h-5 flex flex-col justify-between"
      :aria-expanded="open"
      aria-controls="mobile-nav"
      aria-label="Toggle menu"
      @click="open = !open"
    >
      <span class="block w-full h-0.5 bg-white origin-center" />
      <span class="block w-full h-0.5 bg-white origin-center" />
      <span class="block w-full h-0.5 bg-white origin-center" />
    </button>

    <div
      id="mobile-nav"
      class="fixed inset-x-0 top-16 bottom-0 bg-ink z-40 flex flex-col gap-2 px-8 py-10 transition-opacity lg:hidden"
      :class="open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'"
    >
      <a
        v-for="(link, i) in links"
        :key="link.href"
        :href="link.href"
        class="text-4xl text-white py-3 border-b border-white/10"
        :style="{ transitionDelay: `${(i + 1) * 0.08}s` }"
        @click="close"
      >
        {{ link.label }}
      </a>
    </div>
  </header>
</template>
