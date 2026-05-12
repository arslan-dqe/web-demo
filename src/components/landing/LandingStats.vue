<script setup lang="ts">
import StatCounter from './StatCounter.vue'

interface StatItem {
  raw: number
  prefix?: string
  suffix?: string
  label: string
  trend: string
  icon: string
  iconBg: string
  iconColor: string
  gradient: string
  glow: string
  bar: string
  barWidth: string
}

withDefaults(defineProps<{
  badge?:    string
  headline?: string
  footnote?: string
  stats?:    StatItem[]
}>(), {
  badge:    'Real results from real teams',
  headline: "The numbers don't lie.",
  footnote: 'Based on aggregated data from 2,400+ active Deduply customers · Updated monthly',
  stats: () => [
    {
      raw: 2300000, prefix: '', suffix: '+',
      label: 'Duplicates removed',
      trend: '+18% MoM',
      icon: 'i-lucide-trash-2',
      iconBg: 'bg-primary/15', iconColor: 'text-primary',
      gradient: 'from-primary to-violet-300',
      glow: 'bg-primary',
      bar: 'bg-gradient-to-r from-primary to-violet-400',
      barWidth: '92%',
    },
    {
      raw: 94, prefix: '', suffix: '%',
      label: 'Match accuracy',
      trend: '+3% vs last yr',
      icon: 'i-lucide-crosshair',
      iconBg: 'bg-secondary/15', iconColor: 'text-secondary',
      gradient: 'from-secondary to-cyan-300',
      glow: 'bg-secondary',
      bar: 'bg-gradient-to-r from-secondary to-cyan-400',
      barWidth: '94%',
    },
    {
      raw: 11, prefix: '', suffix: ' hrs',
      label: 'Saved per rep / month',
      trend: '+2 hrs vs v1',
      icon: 'i-lucide-clock-4',
      iconBg: 'bg-success/15', iconColor: 'text-success',
      gradient: 'from-emerald-400 to-teal-300',
      glow: 'bg-success',
      bar: 'bg-gradient-to-r from-success to-teal-400',
      barWidth: '68%',
    },
    {
      raw: 420, prefix: '$', suffix: 'K',
      label: 'Avg. revenue recovered / year',
      trend: 'Per customer',
      icon: 'i-lucide-circle-dollar-sign',
      iconBg: 'bg-warning/15', iconColor: 'text-warning',
      gradient: 'from-amber-400 to-yellow-300',
      glow: 'bg-warning',
      bar: 'bg-gradient-to-r from-warning to-yellow-400',
      barWidth: '78%',
    },
  ],
})
</script>

<template>
  <section class="py-24 px-4 relative overflow-hidden">
    <!-- Dark background -->
    <div class="absolute inset-0 bg-gradient-to-br from-zinc-950 via-violet-950/60 to-zinc-950" />

    <!-- Grid overlay -->
    <div
      class="absolute inset-0 opacity-[0.04]"
      style="background-image: linear-gradient(rgba(139,92,246,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.8) 1px, transparent 1px); background-size: 50px 50px"
    />

    <!-- Glow orbs -->
    <div class="absolute top-0 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
    <div class="absolute bottom-0 right-1/4 w-72 h-72 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />

    <div class="relative z-10 max-w-6xl mx-auto">
      <!-- Header -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 16 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 500 } }"
        class="text-center mb-14"
      >
        <slot name="header">
          <div class="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white/60 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
            <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {{ badge }}
          </div>
          <h2 class="text-3xl md:text-4xl font-extrabold text-white">
            {{ headline }}
          </h2>
        </slot>
      </div>

      <!-- Stats grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div
          v-for="(stat, i) in stats"
          :key="stat.label"
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :visible="{ opacity: 1, y: 0, transition: { delay: i * 120, duration: 600 } }"
          class="group relative flex flex-col justify-between p-6 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm hover:bg-white/[0.08] hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden cursor-default"
        >
          <!-- Corner glow -->
          <div
            class="absolute -top-6 -right-6 w-20 h-20 rounded-full opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500"
            :class="stat.glow"
          />

          <!-- Icon + trend -->
          <div class="flex items-start justify-between mb-6">
            <div
              class="w-10 h-10 rounded-xl flex items-center justify-center"
              :class="stat.iconBg"
            >
              <UIcon
                :name="stat.icon"
                class="w-5 h-5"
                :class="stat.iconColor"
              />
            </div>
            <div class="flex items-center gap-1 text-xs font-semibold text-success bg-success/15 px-2 py-1 rounded-full">
              <UIcon
                name="i-lucide-trending-up"
                class="w-3 h-3"
              />
              {{ stat.trend }}
            </div>
          </div>

          <!-- Number + label + bar -->
          <div>
            <span
              class="text-4xl md:text-5xl font-black tabular-nums bg-gradient-to-br bg-clip-text text-transparent leading-none"
              :class="stat.gradient"
            >
              <StatCounter
                :target="stat.raw"
                :prefix="stat.prefix"
                :suffix="stat.suffix"
                :duration="1800"
                :delay="i * 120"
              />
            </span>
            <div class="text-sm text-white/50 font-medium mt-1 mb-4">
              {{ stat.label }}
            </div>
            <div class="h-1 w-full rounded-full bg-white/10 overflow-hidden">
              <div
                v-motion
                :initial="{ scaleX: 0 }"
                :visible="{ scaleX: 1, transition: { delay: 400 + i * 120, duration: 900, ease: 'easeOut' } }"
                class="h-full rounded-full origin-left"
                :class="stat.bar"
                :style="{ width: stat.barWidth }"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Footnote -->
      <div
        v-motion
        :initial="{ opacity: 0 }"
        :visible="{ opacity: 1, transition: { delay: 600, duration: 600 } }"
        class="text-center mt-10 text-xs text-white/30"
      >
        <slot name="footnote">
          {{ footnote }}
        </slot>
      </div>
    </div>
  </section>
</template>
