<script setup lang="ts">
const emit = defineEmits<{ done: [] }>()
const root = ref<HTMLElement | null>(null)
const done = ref(false)
const reduced = usePrefersReducedMotion()

onMounted(async () => {
  if (reduced.value) {
    done.value = true
    emit('done')
    return
  }

  await nextTick()
  const { $gsap } = useNuxtApp()
  const gsap = $gsap as typeof import('gsap').default
  if (!root.value) return

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        done.value = true
        emit('done')
      },
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

  onBeforeUnmount(() => ctx.revert())
})
</script>

<template>
  <div
    v-show="!done"
    ref="root"
    class="fixed inset-0 z-[200] pointer-events-none"
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
  </div>
</template>
