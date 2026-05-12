<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  rating:   number          // e.g. 4.7, 3.5, 2.3
  max?:     number          // default 5
  size?:    'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?:   string          // tailwind color class
  showValue?: boolean       // show "4.7" next to stars
  showCount?: number        // show "(2,400 reviews)"
}>(), {
  max:        5,
  size:       'md',
  color:      '#f59e0b',    // amber-400
  showValue:  false,
})

const sizeMap = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 26,
}

const px = computed(() => sizeMap[props.size])

// Build array of star states: 'full' | 'half' | 'empty'
const stars = computed(() => {
  return Array.from({ length: props.max }, (_, i) => {
    const diff = props.rating - i
    if (diff >= 1)   return 'full'
    if (diff >= 0.4) return 'half'   // 0.4 threshold feels more natural than 0.5
    return 'empty'
  })
})
</script>

<template>
  <div class="inline-flex items-center gap-1">
    <!-- Stars -->
    <div
      class="flex items-center"
      :style="{ gap: '2px' }"
    >
      <svg
        v-for="(star, i) in stars"
        :key="i"
        :width="px"
        :height="px"
        :viewBox="`0 0 ${px} ${px}`"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <!-- Half clip: only left 50% shows -->
          <clipPath :id="`half-${i}-${$.uid}`">
            <rect
              :x="0"
              :y="0"
              :width="px / 2"
              :height="px"
            />
          </clipPath>
          <!-- Full clip: full star shows -->
          <clipPath :id="`full-${i}-${$.uid}`">
            <rect
              :x="0"
              :y="0"
              :width="px"
              :height="px"
            />
          </clipPath>
        </defs>

        <!-- Empty star (always rendered as base) -->
        <path
          :d="starPath(px)"
          :fill="color"
          fill-opacity="0.2"
          :stroke="color"
          stroke-opacity="0.4"
          stroke-width="0.5"
        />

        <!-- Filled portion (full or half) -->
        <path
          v-if="star !== 'empty'"
          :d="starPath(px)"
          :fill="color"
          :clip-path="`url(#${star === 'half' ? `half-${i}-${$.uid}` : `full-${i}-${$.uid}`})`"
        />
      </svg>
    </div>

    <!-- Optional value -->
    <span
      v-if="showValue"
      class="font-bold text-(--ui-text-highlighted) leading-none"
      :style="{ fontSize: px * 0.85 + 'px' }"
    >
      {{ rating.toFixed(1) }}
    </span>

    <!-- Optional count -->
    <span
      v-if="showCount !== undefined"
      class="text-(--ui-text-dimmed) leading-none"
      :style="{ fontSize: px * 0.75 + 'px' }"
    >
      ({{ showCount.toLocaleString() }})
    </span>
  </div>
</template>

<script lang="ts">
// Star polygon path generator — works for any size
function starPath(size: number): string {
  const cx = size / 2
  const cy = size / 2
  const outerR = size * 0.46
  const innerR = size * 0.19
  const points = 5
  const coords: string[] = []

  for (let i = 0; i < points * 2; i++) {
    const angle = (i * Math.PI) / points - Math.PI / 2
    const r = i % 2 === 0 ? outerR : innerR
    coords.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`)
  }

  return `M ${coords.join(' L ')} Z`
}
</script>
