<script setup lang="ts">
import { motion } from 'motion-v'
import { moreProjects, primaryProjects } from '../../../shared/data/projects'
import type { ProjectItem } from '../../../shared/types/portfolio'

const root = ref<HTMLElement | null>(null)
const active = ref<ProjectItem | null>(null)
const hoveredId = ref<string | null>(null)
const reduced = ref(false)

onMounted(() => {
  reduced.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
})

function openProject(project: ProjectItem) {
  active.value = project
}

function displayNumber(n: string) {
  const digits = n.replace(/\D/g, '')
  return digits.slice(-2).padStart(2, '0')
}

function metaLine(project: ProjectItem) {
  return project.year || project.company
}

function onImgError(e: Event) {
  const img = e.target as HTMLImageElement
  img.style.opacity = '0'
}
</script>

<template>
  <section
    id="work"
    ref="root"
    class="projects-section relative border-t border-white/5 overflow-hidden"
  >
    <div class="section-pad relative">
      <UiSectionHeading title="Projects" tag="h2" />
      <p class="text-fog max-w-2xl mb-12 -mt-6">
        Production work in brief order. Sumaya369 and Mashawirk are called out for migration/perf and personal-product ownership.
      </p>

      <ul class="list-none m-0 p-0 space-y-5 md:space-y-6 max-w-5xl">
        <motion.li
          v-for="(project, index) in primaryProjects"
          :key="project.id"
          class="relative"
          :initial="reduced ? false : { opacity: 0, y: 36 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :viewport="{ once: true, amount: 0.2 }"
          :transition="{ duration: 0.55, delay: Math.min(index * 0.05, 0.35), ease: 'easeOut' }"
          @pointerenter="hoveredId = project.id"
          @pointerleave="hoveredId = null"
        >
          <article
            class="project-card group relative border border-white/12 bg-ink/55 backdrop-blur-[2px] px-5 py-6 md:px-8 md:py-8 overflow-visible cursor-pointer transition-[border-color,background-color] duration-300 hover:border-accent/45 hover:bg-ink/70"
            data-cursor
            @click="openProject(project)"
          >
            <div class="flex items-start justify-between gap-4 mb-4 md:mb-5">
              <span class="font-display text-sm tracking-[0.22em] text-white/35">
                {{ displayNumber(project.number) }}
              </span>
              <span class="text-sm text-fog tabular-nums">{{ metaLine(project) }}</span>
            </div>

            <div class="relative pr-0 md:pr-[38%] min-h-[7.5rem] md:min-h-[8.5rem]">
              <h3 class="font-display text-3xl sm:text-4xl md:text-[2.75rem] leading-[1.05] text-white m-0 mb-4 tracking-tight">
                {{ project.name }}
              </h3>

              <div class="flex flex-wrap gap-2 mb-6 max-w-xl">
                <span
                  v-for="t in project.tech.slice(0, 6)"
                  :key="t"
                  class="text-[11px] uppercase tracking-wider text-white/70 border border-white/18 px-2.5 py-1 rounded-full"
                >{{ t }}</span>
              </div>

              <div class="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  class="inline-flex items-center justify-center w-10 h-10 border border-white/20 text-white/80 hover:border-accent hover:text-accent transition-colors"
                  :aria-label="`Details for ${project.name}`"
                  @click.stop="openProject(project)"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </button>
                <a
                  v-if="project.liveUrl"
                  :href="project.liveUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center justify-center w-10 h-10 border border-white/20 text-white/80 hover:border-accent hover:text-accent transition-colors"
                  :aria-label="`Live preview of ${project.name}`"
                  @click.stop
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="8.25" stroke="currentColor" stroke-width="1.6" />
                    <path d="M3.5 12h17M12 3.5c2.4 2.6 3.6 5.4 3.6 8.5S14.4 17.9 12 20.5C9.6 17.9 8.4 15.1 8.4 12S9.6 6.1 12 3.5Z" stroke="currentColor" stroke-width="1.4" />
                  </svg>
                </a>
                <span class="text-xs text-fog ml-1 hidden sm:inline">{{ project.company }} · {{ project.industry }}</span>
              </div>

              <!-- Floating tilted preview (hover / in-view) — not a film strip -->
              <motion.div
                class="project-preview pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 hidden md:block w-[min(42%,280px)] aspect-[16/10] z-10"
                :initial="false"
                :animate="
                  reduced
                    ? { opacity: 0.85, rotate: -8, y: '-50%', scale: 1 }
                    : hoveredId === project.id
                      ? { opacity: 1, rotate: -10, y: '-52%', scale: 1.04, x: 8 }
                      : { opacity: 0.55, rotate: -6, y: '-50%', scale: 0.96, x: 0 }
                "
                :while-in-view="reduced ? undefined : { opacity: hoveredId === project.id ? 1 : 0.55 }"
                :viewport="{ amount: 0.45 }"
                :transition="{ type: 'spring', stiffness: 220, damping: 22 }"
              >
                <div
                  class="absolute inset-0 rounded-sm border border-white/15 shadow-[0_24px_60px_rgba(0,0,0,0.55)] overflow-hidden bg-ink-soft"
                  :style="{
                    backgroundImage: `url('${project.cover}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'top center',
                  }"
                >
                  <img
                    :src="project.cover"
                    :alt="`${project.name} preview`"
                    class="absolute inset-0 w-full h-full object-cover object-top"
                    width="560"
                    height="350"
                    loading="lazy"
                    decoding="async"
                    @error="onImgError"
                  >
                  <div class="absolute inset-0 ring-1 ring-inset ring-accent/20" />
                </div>
                <div
                  class="absolute inset-0 translate-x-2 translate-y-2 -z-10 rounded-sm border border-white/8 bg-ink/80 opacity-70"
                  aria-hidden="true"
                />
              </motion.div>
            </div>
          </article>
        </motion.li>
      </ul>

      <div v-if="moreProjects.length" class="mt-16 md:mt-20">
        <h3 class="text-white/70 text-sm uppercase tracking-[0.18em] mb-6">More work</h3>
        <ul class="list-none m-0 p-0 space-y-4 max-w-5xl">
          <motion.li
            v-for="(project, i) in moreProjects"
            :key="project.id"
            :initial="reduced ? false : { opacity: 0, y: 20 }"
            :while-in-view="{ opacity: 1, y: 0 }"
            :viewport="{ once: true }"
            :transition="{ duration: 0.45, delay: i * 0.05 }"
          >
            <article
              class="border border-white/10 bg-ink/50 px-5 py-5 md:px-6 flex flex-col sm:flex-row sm:items-center gap-4 cursor-pointer hover:border-accent/40 transition-colors"
              @click="openProject(project)"
            >
              <div
                class="w-full sm:w-36 h-24 shrink-0 overflow-hidden bg-ink-soft relative"
                :style="{
                  backgroundImage: `url('${project.cover}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'top center',
                }"
              >
                <img
                  :src="project.cover"
                  :alt="project.name"
                  class="absolute inset-0 w-full h-full object-cover"
                  width="288"
                  height="180"
                  loading="lazy"
                  @error="onImgError"
                >
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-baseline justify-between gap-3 mb-1">
                  <span class="text-xs text-white/35 tracking-[0.2em]">{{ displayNumber(project.number) }}</span>
                  <span class="text-xs text-fog">{{ metaLine(project) }}</span>
                </div>
                <h4 class="text-white text-xl m-0 mb-2">{{ project.name }}</h4>
                <p class="text-xs text-fog m-0 mb-2">{{ project.company }} · {{ project.industry }}</p>
                <div class="flex flex-wrap gap-1.5">
                  <span
                    v-for="t in project.tech.slice(0, 4)"
                    :key="t"
                    class="text-[10px] uppercase tracking-wider text-white/60 border border-white/15 px-2 py-0.5 rounded-full"
                  >{{ t }}</span>
                </div>
              </div>
            </article>
          </motion.li>
        </ul>
      </div>
    </div>

    <ProjectsProjectModal :project="active" @close="active = null" />
  </section>
</template>
