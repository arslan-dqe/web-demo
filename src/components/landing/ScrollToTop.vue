<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

const visible = ref(false)
const progress = ref(0)
const radius = 18
const circumference = 2 * Math.PI * radius

function onScroll() {
  const scrollTop    = window.scrollY
  const docHeight    = document.documentElement.scrollHeight - window.innerHeight
  progress.value     = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
  visible.value      = scrollTop > 400
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(()  => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const strokeDashoffset = computed(() =>
  circumference - (progress.value / 100) * circumference
)
</script>

<template>
  <Transition name="scroll-top">
    <button
      v-if="visible"
      class="fixed bottom-6 right-6 z-50 w-11 h-11 flex items-center justify-center group"
      aria-label="Scroll to top"
      @click="scrollToTop"
    >
      <!-- Progress ring -->
      <svg
        class="absolute inset-0 w-full h-full -rotate-90"
        viewBox="0 0 44 44"
      >
        <!-- Track -->
        <circle
          cx="22"
          cy="22"
          :r="radius"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          class="text-(--ui-border)"
        />
        <!-- Progress -->
        <circle
          cx="22"
          cy="22"
          :r="radius"
          fill="none"
          stroke="url(#scroll-grad)"
          stroke-width="2"
          stroke-linecap="round"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="strokeDashoffset"
          class="transition-all duration-150"
        />
        <defs>
          <linearGradient
            id="scroll-grad"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop
              offset="0%"
              stop-color="#8b5cf6"
            />
            <stop
              offset="100%"
              stop-color="#06b6d4"
            />
          </linearGradient>
        </defs>
      </svg>

      <!-- Button face -->
      <div
        class="relative w-8 h-8 rounded-full bg-(--ui-bg) border border-(--ui-border) flex items-center justify-center shadow-lg group-hover:bg-primary group-hover:border-primary transition-all duration-300"
      >
        <UIcon
          name="i-lucide-arrow-up"
          class="w-3.5 h-3.5 text-(--ui-text-muted) group-hover:text-white transition-colors duration-300 group-hover:-translate-y-0.5 transform"
        />
      </div>
    </button>
  </Transition>
</template>

<style scoped>
.scroll-top-enter-active,
.scroll-top-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.scroll-top-enter-from,
.scroll-top-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.85);
}
</style>
