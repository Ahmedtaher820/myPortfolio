<script setup lang="ts">
defineProps<{
  title: string
  tag?: string
}>()
</script>

<template>
  <div class="relative mb-10 md:mb-14">
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
