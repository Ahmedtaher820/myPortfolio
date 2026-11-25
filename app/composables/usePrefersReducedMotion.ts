export function usePrefersReducedMotion() {
  const reduced = ref(false)

  onMounted(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => {
      reduced.value = mq.matches
    }
    update()
    mq.addEventListener('change', update)
    onBeforeUnmount(() => mq.removeEventListener('change', update))
  })

  return reduced
}
