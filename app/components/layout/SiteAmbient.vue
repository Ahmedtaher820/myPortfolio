<script setup lang="ts">
/** Fixed site-wide cyan ↔ black blended ambient — continuous across all sections. */
</script>

<template>
  <div class="site-ambient" aria-hidden="true">
    <div class="site-ambient__base" />
    <div class="site-ambient__blob site-ambient__blob--a" />
    <div class="site-ambient__blob site-ambient__blob--b" />
    <div class="site-ambient__blob site-ambient__blob--c" />
    <div class="site-ambient__blob site-ambient__blob--d" />
    <div class="site-ambient__noise" />
  </div>
</template>

<style scoped>
.site-ambient {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.site-ambient__base {
  position: absolute;
  inset: 0;
  background: #1d1d1d;
}

.site-ambient__blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  will-change: transform, opacity;
}

.site-ambient__blob--a {
  width: min(78vw, 720px);
  height: min(78vw, 720px);
  top: -12%;
  left: -16%;
  background: radial-gradient(circle, rgba(8, 253, 216, 0.26) 0%, rgba(8, 253, 216, 0) 68%);
  animation: site-blob-a 20s ease-in-out infinite alternate;
}

.site-ambient__blob--b {
  width: min(62vw, 580px);
  height: min(62vw, 580px);
  top: 28%;
  right: -20%;
  background: radial-gradient(circle, rgba(8, 253, 216, 0.16) 0%, rgba(0, 0, 0, 0) 70%);
  animation: site-blob-b 24s ease-in-out infinite alternate;
}

.site-ambient__blob--c {
  width: min(70vw, 640px);
  height: min(70vw, 640px);
  bottom: -8%;
  left: 12%;
  background: radial-gradient(
    circle,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(8, 253, 216, 0.1) 42%,
    rgba(29, 29, 29, 0) 72%
  );
  animation: site-blob-c 28s ease-in-out infinite alternate;
}

.site-ambient__blob--d {
  width: min(48vw, 420px);
  height: min(48vw, 420px);
  top: 58%;
  left: 42%;
  background: radial-gradient(circle, rgba(8, 253, 216, 0.12) 0%, transparent 65%);
  animation: site-blob-d 22s ease-in-out infinite alternate;
}

.site-ambient__noise {
  position: absolute;
  inset: 0;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 180px 180px;
  mix-blend-mode: soft-light;
}

@keyframes site-blob-a {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 0.85;
  }
  100% {
    transform: translate(14%, 22%) scale(1.18);
    opacity: 1;
  }
}

@keyframes site-blob-b {
  0% {
    transform: translate(0, 0) scale(1.05);
    opacity: 0.7;
  }
  100% {
    transform: translate(-18%, -12%) scale(1.22);
    opacity: 1;
  }
}

@keyframes site-blob-c {
  0% {
    transform: translate(0, 0) scale(0.95);
    opacity: 0.75;
  }
  100% {
    transform: translate(-10%, -16%) scale(1.2);
    opacity: 0.95;
  }
}

@keyframes site-blob-d {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 0.55;
  }
  100% {
    transform: translate(10%, -20%) scale(1.25);
    opacity: 0.9;
  }
}

@media (prefers-reduced-motion: reduce) {
  .site-ambient__blob--a,
  .site-ambient__blob--b,
  .site-ambient__blob--c,
  .site-ambient__blob--d {
    animation: none;
  }
}
</style>
