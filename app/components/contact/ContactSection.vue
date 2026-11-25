<script setup lang="ts">
import { site } from '../../../shared/data/site'

const root = ref<HTMLElement | null>(null)
const form = reactive({
  fullName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  company: '', // honeypot
})

const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const errorMsg = ref('')
const fieldErrors = ref<Record<string, string>>({})

onMounted(() => {
  if (!root.value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const { $gsap } = useNuxtApp()
  const gsap = $gsap as typeof import('gsap').default
  const ctx = gsap.context(() => {
    gsap.from('.contact-reveal', {
      opacity: 0,
      y: 30,
      duration: 0.75,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: { trigger: root.value, start: 'top 78%' },
    })
  }, root.value)
  onBeforeUnmount(() => ctx.revert())
})

async function onSubmit() {
  if (status.value === 'loading') return
  status.value = 'loading'
  errorMsg.value = ''
  fieldErrors.value = {}

  try {
    const res = await $fetch<{ ok: boolean; message?: string; errors?: Record<string, string> }>(
      '/api/contact',
      {
        method: 'POST',
        body: { ...form },
      },
    )
    if (res.ok) {
      status.value = 'success'
      form.fullName = ''
      form.email = ''
      form.phone = ''
      form.subject = ''
      form.message = ''
    } else {
      status.value = 'error'
      errorMsg.value = res.message || 'Unable to send message.'
      fieldErrors.value = res.errors || {}
    }
  } catch (e: unknown) {
    status.value = 'error'
    const err = e as { data?: { message?: string; errors?: Record<string, string> }; statusMessage?: string }
    errorMsg.value = err?.data?.message || err?.statusMessage || 'Unable to send message. Please try again.'
    fieldErrors.value = err?.data?.errors || {}
  }
}
</script>

<template>
  <section id="contact" ref="root" class="section-pad border-t border-white/5">
    <div class="grid lg:grid-cols-2 gap-12">
      <div class="contact-reveal">
        <UiSectionHeading title="Contact Me" tag="h2" />
        <p class="text-fog leading-relaxed max-w-md -mt-4 mb-6">
          Open to senior frontend roles and ambitious product work. Prefer email for opportunities and collaboration.
        </p>
        <ul class="space-y-2 text-sm text-white/80 list-none m-0 p-0">
          <li>
            <a :href="`mailto:${site.email}`" class="text-accent hover:underline">{{ site.email }}</a>
          </li>
          <li>
            <a :href="`tel:${site.phone.replace(/\s/g, '')}`" class="hover:text-accent transition-colors">{{ site.phone }}</a>
          </li>
          <li>{{ site.location }}</li>
        </ul>
      </div>

      <form class="contact-reveal relative space-y-5" novalidate @submit.prevent="onSubmit">
        <span class="html-tag absolute -top-6 left-0" aria-hidden="true">&lt;form&gt;</span>

        <!-- Honeypot -->
        <input
          v-model="form.company"
          type="text"
          name="company"
          tabindex="-1"
          autocomplete="off"
          class="absolute opacity-0 pointer-events-none h-0 w-0"
          aria-hidden="true"
        >

        <div>
          <label class="block text-xs uppercase tracking-wider text-fog mb-2" for="fullName">Full Name</label>
          <input
            id="fullName"
            v-model="form.fullName"
            type="text"
            required
            class="w-full bg-ink-soft border-0 border-b-2 border-white/20 focus:border-accent outline-none px-3 py-3 text-white"
          >
          <p v-if="fieldErrors.fullName" class="text-xs text-red-400 mt-1">{{ fieldErrors.fullName }}</p>
        </div>

        <div>
          <label class="block text-xs uppercase tracking-wider text-fog mb-2" for="email">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            class="w-full bg-ink-soft border-0 border-b-2 border-white/20 focus:border-accent outline-none px-3 py-3 text-white"
          >
          <p v-if="fieldErrors.email" class="text-xs text-red-400 mt-1">{{ fieldErrors.email }}</p>
        </div>

        <div>
          <label class="block text-xs uppercase tracking-wider text-fog mb-2" for="phone">Phone</label>
          <input
            id="phone"
            v-model="form.phone"
            type="tel"
            class="w-full bg-ink-soft border-0 border-b-2 border-white/20 focus:border-accent outline-none px-3 py-3 text-white"
          >
          <p v-if="fieldErrors.phone" class="text-xs text-red-400 mt-1">{{ fieldErrors.phone }}</p>
        </div>

        <div>
          <label class="block text-xs uppercase tracking-wider text-fog mb-2" for="subject">Subject</label>
          <input
            id="subject"
            v-model="form.subject"
            type="text"
            required
            class="w-full bg-ink-soft border-0 border-b-2 border-white/20 focus:border-accent outline-none px-3 py-3 text-white"
          >
          <p v-if="fieldErrors.subject" class="text-xs text-red-400 mt-1">{{ fieldErrors.subject }}</p>
        </div>

        <div>
          <label class="block text-xs uppercase tracking-wider text-fog mb-2" for="message">Message</label>
          <textarea
            id="message"
            v-model="form.message"
            required
            rows="5"
            class="w-full bg-ink-soft border-0 border-b-2 border-white/20 focus:border-accent outline-none px-3 py-3 text-white resize-y"
          />
          <p v-if="fieldErrors.message" class="text-xs text-red-400 mt-1">{{ fieldErrors.message }}</p>
        </div>

        <button
          type="submit"
          class="btn-outline disabled:opacity-50 disabled:pointer-events-none"
          :disabled="status === 'loading'"
        >
          {{ status === 'loading' ? 'Sending…' : 'Send Message' }}
        </button>

        <p v-if="status === 'success'" class="text-sm text-accent" role="status">
          Message sent. Thank you — I’ll get back to you soon.
        </p>
        <p v-else-if="status === 'error'" class="text-sm text-red-400" role="alert">
          {{ errorMsg }}
        </p>

        <span class="html-tag absolute -bottom-6 left-0" aria-hidden="true">&lt;/form&gt;</span>
      </form>
    </div>
  </section>
</template>
