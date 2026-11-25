<script setup lang="ts">
import { site } from '../../../shared/data/site'
</script>

<template>
  <footer class="border-t border-white/10 px-5 md:px-10 lg:px-16 py-10 flex flex-col md:flex-row gap-6 md:items-center md:justify-between text-sm text-fog">
    <p>
      <span class="text-white font-medium">{{ site.name }}</span>
      — {{ site.title }}
    </p>
    <ul class="flex gap-6 list-none m-0 p-0">
      <li v-for="s in site.socials" :key="s.id">
        <a :href="s.href" target="_blank" rel="noopener noreferrer" class="hover:text-accent transition-colors">
          {{ s.label }}
        </a>
      </li>
      <li>
        <a :href="`mailto:${site.email}`" class="hover:text-accent transition-colors">Email</a>
      </li>
    </ul>
  </footer>
</template>
