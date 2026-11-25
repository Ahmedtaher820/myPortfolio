import type { Context } from 'gsap'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let registered = false

function ensureGsapPlugins() {
  if (import.meta.client && !registered) {
    gsap.registerPlugin(ScrollTrigger)
    registered = true
  }
}

/**
 * Creates a GSAP context scoped to an element and reverts on unmount.
 */
export function useGsapContext(
  scope: Ref<HTMLElement | null> | (() => HTMLElement | null),
  setup: (context: Context) => void,
) {
  const reduced = usePrefersReducedMotion()
  let ctx: Context | null = null

  onMounted(() => {
    ensureGsapPlugins()
    const el = typeof scope === 'function' ? scope() : scope.value
    if (!el) return

    ctx = gsap.context(() => {
      if (reduced.value) return
      setup(ctx!)
    }, el)
  })

  onBeforeUnmount(() => {
    ctx?.revert()
    ctx = null
  })

  watch(reduced, (isReduced) => {
    if (isReduced) {
      ctx?.revert()
      ctx = null
    }
  })

  return { gsap, ScrollTrigger }
}
