<script setup lang="ts">
import { motion, useScroll, useTransform } from 'motion-v'
import { moreProjects, primaryProjects } from '../../../shared/data/projects'
import type { ProjectItem } from '../../../shared/types/portfolio'

const root = ref<HTMLElement | null>(null)
const filmRef = ref<HTMLElement | null>(null)
const active = ref<ProjectItem | null>(null)
const reduced = ref(false)
const itemWidth = ref(420)
const gap = 40

const { scrollYProgress } = useScroll({
  target: filmRef,
  offset: ['start start', 'end end'],
})

const totalDistance = computed(
  () => Math.max(primaryProjects.length - 1, 0) * (itemWidth.value + gap),
)

const filmTransform = useTransform(
  scrollYProgress,
  (progress) => `translateX(${-progress * totalDistance.value}px)`,
)

onMounted(() => {
  reduced.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const update = () => {
    if (window.innerWidth < 640) itemWidth.value = Math.min(window.innerWidth * 0.82, 340)
    else if (window.innerWidth < 1024) itemWidth.value = 380
    else itemWidth.value = 440
  }
  update()
  window.addEventListener('resize', update, { passive: true })
  onBeforeUnmount(() => window.removeEventListener('resize', update))
})

function openProject(project: ProjectItem) {
  active.value = project
}

function onImgError(e: Event) {
  const img = e.target as HTMLImageElement
  img.style.opacity = '0'
}
</script>

<template>
  <section id="work" ref="root" class="border-t border-white/5 overflow-hidden">
    <div class="section-pad pb-8">
      <UiSectionHeading title="Projects" tag="h2" />
      <p class="text-fog max-w-2xl mb-2 -mt-6">
        Production work in brief order — scroll the film reel. Sumaya369 and Mashawirk are called out for migration/perf and personal-product ownership.
      </p>
    </div>

    <div
      ref="filmRef"
      class="relative"
      :style="reduced ? undefined : { height: `${Math.max(primaryProjects.length, 2) * 70}vh` }"
    >
      <div
        class="flex flex-col justify-center overflow-hidden"
        :class="reduced ? 'relative h-auto py-6' : 'sticky top-0 h-[100svh]'"
      >
        <div class="px-5 md:px-10 lg:px-16 mb-4 flex items-end justify-between gap-4">
          <p class="text-xs uppercase tracking-[0.2em] text-accent/80 m-0">Film reel</p>
          <p class="text-xs text-fog m-0 hidden sm:block">Scroll to advance · click a still for details</p>
        </div>

        <div class="relative w-full overflow-visible">
          <motion.div
            v-if="!reduced"
            class="flex will-change-transform pl-5 md:pl-[max(1.25rem,calc(50vw-11rem))]"
            :style="{ transform: filmTransform, gap: `${gap}px` }"
          >
            <article
              v-for="project in primaryProjects"
              :key="project.id"
              class="project-slide shrink-0 group cursor-pointer"
              :style="{ width: `${itemWidth}px` }"
              data-cursor
              @click="openProject(project)"
            >
              <div class="flex items-end justify-between mb-3">
                <p class="font-display text-accent text-sm tracking-[0.2em] m-0">{{ project.number }}</p>
                <span
                  v-if="project.featured"
                  class="text-[10px] uppercase tracking-widest text-ink bg-accent px-2 py-1"
                >Featured</span>
              </div>

              <div
                class="relative overflow-hidden border border-white/10 aspect-[16/10] mb-4 bg-ink-soft"
                :style="{
                  backgroundImage: `url('${project.cover}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'top center',
                }"
              >
                <img
                  :src="project.cover"
                  :alt="project.name"
                  class="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  width="880"
                  height="550"
                  loading="eager"
                  decoding="async"
                  @error="onImgError"
                >
                <div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent opacity-85 pointer-events-none" />
                <div class="absolute bottom-4 left-4 right-4 z-[1]">
                  <h3 class="text-2xl text-white m-0 mb-1">{{ project.name }}</h3>
                  <p class="text-sm text-white/70 m-0">{{ project.company }} · {{ project.industry }}</p>
                </div>
              </div>

              <p class="text-sm text-fog line-clamp-2 mb-3">{{ project.description }}</p>
              <div class="flex flex-wrap items-center gap-3">
                <button type="button" class="btn-outline text-xs py-2 px-4" @click.stop="openProject(project)">
                  Details
                </button>
                <a
                  v-if="project.liveUrl"
                  :href="project.liveUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-sm text-accent hover:underline"
                  @click.stop
                >
                  Live Preview
                </a>
              </div>
            </article>
          </motion.div>

          <div
            v-else
            class="flex gap-6 overflow-x-auto px-5 md:px-10 lg:px-16 pb-4 snap-x snap-mandatory"
          >
            <article
              v-for="project in primaryProjects"
              :key="project.id"
              class="project-slide snap-center shrink-0 w-[78vw] sm:w-[380px] md:w-[420px] group cursor-pointer"
              @click="openProject(project)"
            >
              <div class="flex items-end justify-between mb-3">
                <p class="font-display text-accent text-sm tracking-[0.2em] m-0">{{ project.number }}</p>
                <span
                  v-if="project.featured"
                  class="text-[10px] uppercase tracking-widest text-ink bg-accent px-2 py-1"
                >Featured</span>
              </div>
              <div
                class="relative overflow-hidden border border-white/10 aspect-[16/10] mb-4 bg-ink-soft"
                :style="{
                  backgroundImage: `url('${project.cover}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'top center',
                }"
              >
                <img
                  :src="project.cover"
                  :alt="project.name"
                  class="absolute inset-0 w-full h-full object-cover object-top"
                  width="880"
                  height="550"
                  loading="lazy"
                  @error="onImgError"
                >
                <div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent opacity-85" />
                <div class="absolute bottom-4 left-4 right-4 z-[1]">
                  <h3 class="text-2xl text-white m-0 mb-1">{{ project.name }}</h3>
                  <p class="text-sm text-white/70 m-0">{{ project.company }} · {{ project.industry }}</p>
                </div>
              </div>
              <p class="text-sm text-fog line-clamp-2 mb-3">{{ project.description }}</p>
            </article>
          </div>
        </div>
      </div>
    </div>

    <div v-if="moreProjects.length" class="section-pad pt-8">
      <h3 class="text-white/70 text-sm uppercase tracking-[0.18em] mb-6">More work</h3>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.article
          v-for="(project, i) in moreProjects"
          :key="project.id"
          class="border border-white/10 p-4 hover:border-accent/40 transition-colors cursor-pointer"
          :initial="{ opacity: 0, y: 20 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :viewport="{ once: true }"
          :transition="{ duration: 0.45, delay: i * 0.06 }"
          @click="openProject(project)"
        >
          <div
            class="w-full h-36 mb-3 bg-ink-soft overflow-hidden relative"
            :style="{
              backgroundImage: `url('${project.cover}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'top center',
            }"
          >
            <img
              :src="project.cover"
              :alt="project.name"
              class="w-full h-full object-cover"
              width="480"
              height="270"
              loading="lazy"
              @error="onImgError"
            >
          </div>
          <h4 class="text-white text-lg m-0 mb-1">{{ project.name }}</h4>
          <p class="text-xs text-fog m-0">{{ project.company }}</p>
        </motion.article>
      </div>
    </div>

    <ProjectsProjectModal :project="active" @close="active = null" />
  </section>
</template>
