<script setup lang="ts">
import { moreProjects, primaryProjects } from '../../../shared/data/projects'
import type { ProjectItem } from '../../../shared/types/portfolio'

const root = ref<HTMLElement | null>(null)
const track = ref<HTMLElement | null>(null)
const active = ref<ProjectItem | null>(null)
const activeIndex = ref(0)

onMounted(() => {
  if (!root.value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const { $gsap } = useNuxtApp()
  const gsap = $gsap as typeof import('gsap').default
  const ctx = gsap.context(() => {
    gsap.from('.project-slide', {
      opacity: 0,
      y: 50,
      scale: 0.96,
      duration: 0.8,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: { trigger: root.value, start: 'top 70%' },
    })
  }, root.value)
  onBeforeUnmount(() => ctx.revert())
})

function openProject(project: ProjectItem, index: number) {
  active.value = project
  activeIndex.value = index
  if (!import.meta.client) return
  const { $gsap } = useNuxtApp()
  const gsap = $gsap as typeof import('gsap').default
  gsap.fromTo(
    '.project-slide.is-active',
    { scale: 0.92, opacity: 0.75 },
    { scale: 1, opacity: 1, duration: 0.45, ease: 'power4.out' },
  )
}

function onWheel(e: WheelEvent) {
  if (!track.value || window.innerWidth < 768) return
  if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
    e.preventDefault()
    track.value.scrollLeft += e.deltaY
  }
}
</script>

<template>
  <section id="work" ref="root" class="section-pad border-t border-white/5 overflow-hidden">
    <UiSectionHeading title="Projects" tag="h2" />
    <p class="text-fog max-w-2xl mb-8 -mt-6">
      Production work in brief order. Sumaya369 and Mashawirk are called out for migration/perf and personal-product ownership.
    </p>

    <div
      ref="track"
      class="flex gap-6 md:gap-10 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-thin"
      @wheel="onWheel"
    >
      <article
        v-for="(project, index) in primaryProjects"
        :key="project.id"
        class="project-slide snap-center shrink-0 w-[78vw] sm:w-[420px] md:w-[480px] group cursor-pointer"
        :class="{ 'is-active': active?.id === project.id }"
        data-cursor
        @click="openProject(project, index)"
      >
        <div class="flex items-end justify-between mb-3">
          <p class="font-display text-accent text-sm tracking-[0.2em] m-0">{{ project.number }}</p>
          <span
            v-if="project.featured"
            class="text-[10px] uppercase tracking-widest text-ink bg-accent px-2 py-1"
          >Featured</span>
        </div>
        <div class="relative overflow-hidden border border-white/10 aspect-[16/10] mb-4">
          <img
            :src="project.cover"
            :alt="project.name"
            class="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-80" />
          <div class="absolute bottom-4 left-4 right-4">
            <h3 class="text-2xl text-white m-0 mb-1">{{ project.name }}</h3>
            <p class="text-sm text-white/70 m-0">{{ project.company }} · {{ project.industry }}</p>
          </div>
        </div>
        <p class="text-sm text-fog line-clamp-2 mb-3">{{ project.description }}</p>
        <div class="flex flex-wrap items-center gap-3">
          <button type="button" class="btn-outline text-xs py-2 px-4" @click.stop="openProject(project, index)">
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
    </div>

    <div v-if="moreProjects.length" class="mt-16">
      <h3 class="text-white/70 text-sm uppercase tracking-[0.18em] mb-6">More work</h3>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="project in moreProjects"
          :key="project.id"
          class="border border-white/10 p-4 hover:border-accent/40 transition-colors cursor-pointer"
          @click="openProject(project, 0)"
        >
          <img :src="project.cover" :alt="project.name" class="w-full h-36 object-cover mb-3" loading="lazy">
          <h4 class="text-white text-lg m-0 mb-1">{{ project.name }}</h4>
          <p class="text-xs text-fog m-0">{{ project.company }}</p>
        </article>
      </div>
    </div>

    <ProjectsProjectModal :project="active" @close="active = null" />
  </section>
</template>
