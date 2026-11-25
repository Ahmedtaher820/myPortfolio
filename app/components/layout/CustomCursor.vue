<script setup lang="ts">
const cursor = ref<HTMLDivElement | null>(null)
const reduced = usePrefersReducedMotion()
const enabled = ref(false)

onMounted(() => {
  const fine = window.matchMedia('(pointer: fine)').matches
  enabled.value = fine && !reduced.value
  if (!enabled.value) return

  const el = cursor.value
  if (!el) return

  const move = (e: MouseEvent) => {
    el.style.left = `${e.clientX}px`
    el.style.top = `${e.clientY}px`
  }

  const enter = () => el.classList.add('scale-150')
  const leave = () => el.classList.remove('scale-150')

  window.addEventListener('mousemove', move)
  document.querySelectorAll('a, button, [data-cursor]').forEach((node) => {
    node.addEventListener('mouseenter', enter)
    node.addEventListener('mouseleave', leave)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('mousemove', move)
  })
})
</script>

<template>
  <div
    v-if="enabled"
    ref="cursor"
    class="pointer-events-none fixed z-[999] w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/50 transition-transform duration-300 hidden md:block"
    aria-hidden="true"
  />
</template>
