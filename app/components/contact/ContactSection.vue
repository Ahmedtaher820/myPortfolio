<script setup lang="ts">
import { site } from '../../../shared/data/site'
import { contactSchema } from '../../../shared/validation/contact'

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
const errorHint = ref('')
const fieldErrors = ref<Record<string, string>>({})

onMounted(() => {
  if (!root.value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const { $gsap } = useNuxtApp()
  const gsap = $gsap as typeof import('gsap').default
  if (!gsap) return
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

function validateClient(): boolean {
  const parsed = contactSchema.safeParse({ ...form })
  if (parsed.success) {
    fieldErrors.value = {}
    return true
  }
  const errors: Record<string, string> = {}
  for (const issue of parsed.error.issues) {
    const key = String(issue.path[0] || 'form')
    if (!errors[key]) errors[key] = issue.message
  }
  fieldErrors.value = errors
  return false
}

async function onSubmit() {
  if (status.value === 'loading') return
  status.value = 'loading'
  errorMsg.value = ''
  errorHint.value = ''
  fieldErrors.value = {}

  if (!validateClient()) {
    status.value = 'error'
    errorMsg.value = 'Please fix the highlighted fields and try again.'
    return
  }

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
      fieldErrors.value = {}
    } else {
      status.value = 'error'
      errorMsg.value = res.message || 'Unable to send message.'
      fieldErrors.value = res.errors || {}
    }
  } catch (e: unknown) {
    status.value = 'error'
    const err = e as {
      data?: { message?: string; errors?: Record<string, string> }
      statusMessage?: string
      statusCode?: number
    }
    const code = err?.statusCode
    const serverMsg = err?.data?.message || err?.statusMessage || ''
    fieldErrors.value = err?.data?.errors || {}

    if (code === 503 || /not configured|RESEND/i.test(serverMsg)) {
      errorMsg.value = 'Email delivery is not configured on this environment yet.'
      errorHint.value = `You can still reach me directly at ${site.email}.`
    } else if (code === 429) {
      errorMsg.value = serverMsg || 'Too many requests. Please wait a moment and try again.'
    } else if (code === 400) {
      errorMsg.value = serverMsg || 'Please fix the highlighted fields and try again.'
    } else if (code === 502) {
      errorMsg.value = 'The email provider could not deliver your message. Please try again in a few minutes.'
      errorHint.value = `Or email me at ${site.email}.`
    } else {
      errorMsg.value = serverMsg || 'Unable to send message. Please try again.'
      errorHint.value = `If this keeps happening, email ${site.email}.`
    }
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
          <label class="block text-xs uppercase tracking-wider text-fog mb-2" for="fullName">
            Full Name <span class="text-accent">*</span>
          </label>
          <input
            id="fullName"
            v-model="form.fullName"
            type="text"
            name="fullName"
            autocomplete="name"
            required
            aria-required="true"
            :aria-invalid="!!fieldErrors.fullName"
            class="w-full bg-ink-soft/80 border-0 border-b-2 border-white/20 focus:border-accent outline-none px-3 py-3 text-white"
            :class="{ 'border-red-400/70': fieldErrors.fullName }"
          >
          <p v-if="fieldErrors.fullName" class="text-xs text-red-400 mt-1">{{ fieldErrors.fullName }}</p>
        </div>

        <div>
          <label class="block text-xs uppercase tracking-wider text-fog mb-2" for="email">
            Email <span class="text-accent">*</span>
          </label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            name="email"
            autocomplete="email"
            required
            aria-required="true"
            :aria-invalid="!!fieldErrors.email"
            class="w-full bg-ink-soft/80 border-0 border-b-2 border-white/20 focus:border-accent outline-none px-3 py-3 text-white"
            :class="{ 'border-red-400/70': fieldErrors.email }"
          >
          <p v-if="fieldErrors.email" class="text-xs text-red-400 mt-1">{{ fieldErrors.email }}</p>
        </div>

        <div>
          <label class="block text-xs uppercase tracking-wider text-fog mb-2" for="phone">
            Phone <span class="text-accent">*</span>
          </label>
          <input
            id="phone"
            v-model="form.phone"
            type="tel"
            name="phone"
            autocomplete="tel"
            required
            aria-required="true"
            :aria-invalid="!!fieldErrors.phone"
            class="w-full bg-ink-soft/80 border-0 border-b-2 border-white/20 focus:border-accent outline-none px-3 py-3 text-white"
            :class="{ 'border-red-400/70': fieldErrors.phone }"
          >
          <p v-if="fieldErrors.phone" class="text-xs text-red-400 mt-1">{{ fieldErrors.phone }}</p>
        </div>

        <div>
          <label class="block text-xs uppercase tracking-wider text-fog mb-2" for="subject">
            Subject <span class="text-accent">*</span>
          </label>
          <input
            id="subject"
            v-model="form.subject"
            type="text"
            name="subject"
            required
            aria-required="true"
            :aria-invalid="!!fieldErrors.subject"
            class="w-full bg-ink-soft/80 border-0 border-b-2 border-white/20 focus:border-accent outline-none px-3 py-3 text-white"
            :class="{ 'border-red-400/70': fieldErrors.subject }"
          >
          <p v-if="fieldErrors.subject" class="text-xs text-red-400 mt-1">{{ fieldErrors.subject }}</p>
        </div>

        <div>
          <label class="block text-xs uppercase tracking-wider text-fog mb-2" for="message">
            Message / Description <span class="text-accent">*</span>
          </label>
          <textarea
            id="message"
            v-model="form.message"
            name="message"
            required
            aria-required="true"
            :aria-invalid="!!fieldErrors.message"
            rows="5"
            class="w-full bg-ink-soft/80 border-0 border-b-2 border-white/20 focus:border-accent outline-none px-3 py-3 text-white resize-y"
            :class="{ 'border-red-400/70': fieldErrors.message }"
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

        <div
          v-if="status === 'success'"
          class="rounded border border-accent/40 bg-accent/10 px-4 py-3"
          role="status"
        >
          <p class="text-sm text-accent m-0 font-medium">Message sent successfully.</p>
          <p class="text-sm text-white/75 m-0 mt-1">Thanks — I’ll reply as soon as I can.</p>
        </div>
        <div
          v-else-if="status === 'error'"
          class="rounded border border-red-400/40 bg-red-500/10 px-4 py-3"
          role="alert"
        >
          <p class="text-sm text-red-300 m-0 font-medium">{{ errorMsg }}</p>
          <p v-if="errorHint" class="text-sm text-white/70 m-0 mt-1">{{ errorHint }}</p>
        </div>

        <span class="html-tag absolute -bottom-6 left-0" aria-hidden="true">&lt;/form&gt;</span>
      </form>
    </div>
  </section>
</template>
