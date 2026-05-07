<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const props = defineProps<{
  target: number
  prefix?: string
  suffix?: string
  duration?: number
  delay?: number
}>()

const el = ref<HTMLElement | null>(null)
const display = ref('0')
let started = false

function animateCount() {
  if (started) return
  started = true
  setTimeout(() => {
    const start = performance.now()
    const to = props.target
    function tick(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / (props.duration ?? 1800), 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      display.value = Math.round(to * eased).toLocaleString()
      if (progress < 1) requestAnimationFrame(tick)
      else display.value = to.toLocaleString()
    }
    requestAnimationFrame(tick)
  }, props.delay ?? 0)
}

useIntersectionObserver(el, ([entry]) => {
  if (entry.isIntersecting) animateCount()
})
</script>

<template>
  <span ref="el">{{ prefix }}{{ display }}{{ suffix }}</span>
</template>
