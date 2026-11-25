<script setup lang="ts">
import gsap from 'gsap'

const emit = defineEmits<{ done: [] }>()
const root = ref<HTMLElement | null>(null)
const done = ref(false)
let safetyTimer: ReturnType<typeof setTimeout> | null = null
let ctx: gsap.Context | null = null

function finish() {
  if (done.value) return
  done.value = true
  emit('done')
  if (safetyTimer) {
    clearTimeout(safetyTimer)
    safetyTimer = null
  }
  ctx?.revert()
  ctx = null
}

onMounted(async () => {
  // Always dismiss overlay eventually — never leave the home page blank forever.
  safetyTimer = setTimeout(finish, 9000)

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReduced) {
    finish()
    return
  }

  await nextTick()
  if (!root.value) {
    finish()
    return
  }

  try {
    ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: finish,
      })

      tl.from('.cover-head', { opacity: 0, xPercent: -100, duration: 1, delay: 0.35, ease: 'power1.out' })
        .from('.dot', { opacity: 0, yPercent: 100, duration: 1, ease: 'power1.out' }, '-=0.4')
        .to('.dot', { x: 200, duration: 0.5, ease: 'power1.out' })
        .to('.dot', { x: 25, duration: 0.5, ease: 'power1.out' })
        .to('.dot', { x: 150, duration: 0.5, ease: 'power1.out' })
        .to('.dot', { x: -10, duration: 0.1, ease: 'power1.out' })
        .to('.cover-head', { x: -300, opacity: 0, duration: 0.5, ease: 'power1.out' })
        .to('.dot', { opacity: 0, duration: 0.5, ease: 'power1.out' })
        .to('.cover', { xPercent: -100, duration: 1, ease: 'power1.out' }, 4.2)
        .to('.cover-2', { xPercent: -100, duration: 1, ease: 'power1.out' }, 4.6)
        .to('.cover-3', { xPercent: -100, duration: 1, ease: 'power1.out' }, 4.8)
        .to('.cover-4', { xPercent: -100, duration: 1, ease: 'power1.out' }, 4.8)
        .from('.last-cover', { yPercent: -100, opacity: 0, duration: 0.8, ease: 'power1.out' })
        .to('.last-cover', { opacity: 0, duration: 0.4, delay: 0.25 })
    }, root.value)
  } catch {
    finish()
  }
})

onBeforeUnmount(() => {
  if (safetyTimer) clearTimeout(safetyTimer)
  ctx?.revert()
})
</script>

<template>
  <div
    v-show="!done"
    ref="root"
    class="fixed inset-0 z-[200]"
    aria-hidden="true"
  >
    <div class="cover-4 absolute inset-0 bg-accent-mint" />
    <div class="cover-3 absolute inset-0 bg-accent-mint" />
    <div class="cover-2 absolute inset-0 bg-ink" />
    <div class="cover absolute inset-0 bg-ink flex items-center justify-center">
      <div class="heading flex items-center gap-3">
        <h1 class="cover-head m-0 text-white text-5xl md:text-7xl font-bold tracking-tight">TAHER</h1>
        <span class="dot inline-block w-5 h-5 rounded-full bg-white" />
      </div>
    </div>
    <div class="last-cover absolute top-[8%] left-1/2 -translate-x-1/2 font-display text-2xl md:text-4xl text-white font-bold whitespace-nowrap">
      The PortFolio
    </div>
    <button
      type="button"
      class="absolute bottom-8 right-8 z-[201] pointer-events-auto text-xs uppercase tracking-widest text-ink/80 bg-white/80 hover:bg-white px-3 py-2"
      @click="finish"
    >
      Skip
    </button>
  </div>
</template>
