<script setup lang="ts">
import type { ProjectItem } from '../../../shared/types/portfolio'

const props = defineProps<{
  project: ProjectItem | null
}>()

const emit = defineEmits<{ close: [] }>()
const activeImage = ref(0)

watch(
  () => props.project,
  () => {
    activeImage.value = 0
    if (props.project) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  },
)

onBeforeUnmount(() => {
  document.body.style.overflow = ''
})

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
}

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <Teleport to="body">
    <div
      v-if="project"
      class="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      :aria-label="project.name"
      @click.self="emit('close')"
    >
      <div class="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-ink border border-white/10">
        <button
          type="button"
          class="absolute top-4 right-4 z-10 text-white text-2xl leading-none hover:text-accent"
          aria-label="Close project details"
          @click="emit('close')"
        >
          ×
        </button>

        <div class="grid md:grid-cols-2 gap-0">
          <div class="bg-ink-soft">
            <img
              :src="project.images[activeImage] || project.cover"
              :alt="`${project.name} screenshot`"
              class="w-full h-56 md:h-full object-cover object-top min-h-[240px]"
              loading="lazy"
              decoding="async"
            >
            <div v-if="project.images.length > 1" class="flex gap-2 p-3 overflow-x-auto">
              <button
                v-for="(img, i) in project.images"
                :key="img"
                type="button"
                class="shrink-0 w-16 h-12 border overflow-hidden"
                :class="i === activeImage ? 'border-accent' : 'border-white/20'"
                @click="activeImage = i"
              >
                <img :src="img" alt="" class="w-full h-full object-cover" loading="lazy" decoding="async">
              </button>
            </div>
          </div>

          <div class="p-6 md:p-8 space-y-4">
            <p class="text-accent font-display tracking-widest text-sm">{{ project.number }}</p>
            <h3 class="text-3xl text-white m-0">{{ project.name }}</h3>
            <p class="text-fog text-sm">{{ project.company }} · {{ project.industry }}</p>
            <p class="text-white/85 leading-relaxed">{{ project.description }}</p>
            <div>
              <h4 class="text-accent text-sm uppercase tracking-wider mb-2">Role</h4>
              <p class="text-sm text-white/80">{{ project.role }}</p>
            </div>
            <div>
              <h4 class="text-accent text-sm uppercase tracking-wider mb-2">Contributions</h4>
              <ul class="space-y-2 text-sm text-white/80">
                <li v-for="(c, i) in project.contributions" :key="i">{{ c }}</li>
              </ul>
            </div>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="t in project.tech"
                :key="t"
                class="text-xs border border-accent/40 text-accent px-2 py-1"
              >{{ t }}</span>
            </div>
            <a
              v-if="project.liveUrl"
              :href="project.liveUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-outline mt-2"
            >
              Live Preview
            </a>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
