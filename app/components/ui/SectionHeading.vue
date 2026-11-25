<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    tag?: string
    compact?: boolean
  }>(),
  { compact: false },
)
</script>

<template>
  <div
    class="relative"
    :class="compact ? 'mb-6 md:mb-8' : 'mb-10 md:mb-14'"
  >
    <span
      v-if="tag"
      class="html-tag absolute -top-5 left-0"
      aria-hidden="true"
    >&lt;{{ tag }}&gt;</span>
    <h2 class="font-display text-4xl md:text-5xl lg:text-6xl font-normal text-accent leading-none">
      {{ title }}
    </h2>
    <span
      v-if="tag"
      class="html-tag absolute -bottom-5 left-0"
      aria-hidden="true"
    >&lt;/{{ tag }}&gt;</span>
  </div>
</template>
