<!-- src/components/dqe/DqeProblem.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver, useColorMode } from '@vueuse/core'

const emit = defineEmits<{ cta: [] }>()

const colorMode = useColorMode()
// ── Animated cost counter ─────────────────────────────────────────────────
const sectionRef  = ref<HTMLElement | null>(null)
const counters    = ref([0, 0, 0])
let   hasAnimated = false

const targets = [849.9, 1.47, 3.1]
// 849.9 = $849.9B returns problem
// 1.47  = $1.47 per failed delivery
// 3.1   = $3.1T annual US data quality loss

function easeOut(t: number) { return 1 - Math.pow(1 - t, 3) }

function animateCounters() {
  if (hasAnimated) return
  hasAnimated = true

  targets.forEach((target, idx) => {
    const duration = 1800
    const start    = performance.now()
    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1)
      counters.value[idx] = Math.round(target * easeOut(progress))
      if (progress < 1) requestAnimationFrame(tick)
      else counters.value[idx] = target
    }
    requestAnimationFrame(tick)
  })
}

useIntersectionObserver(sectionRef, ([entry]) => {
  if (entry.isIntersecting) animateCounters()
}, { threshold: 0.3 })

// ── Problem cards ─────────────────────────────────────────────────────────
const problems = [
  {
    icon:  'i-lucide-package-x',
    color: 'text-rose-400',
    bg:    'bg-rose-500/10',
    ring:  'ring-rose-500/20',
    tag:   'Retail & Logistics',
    title: 'Failed deliveries drain revenue',
    desc:  "A single wrong address costs $17–$22 in reverse logistics. At scale, that's millions in avoidable losses every quarter.",
    stat:  '$17–22',
    statLabel: 'per failed delivery',
    example: {
      label: 'Address entered at checkout',
      bad:   '123 main st new york ny',
      good:  '123 MAIN ST, NEW YORK, NY 10001-1234',
      badTag:  'Undeliverable',
      goodTag: 'USPS Verified',
    },
  },
  {
    icon:  'i-lucide-mail-x',
    color: 'text-amber-400',
    bg:    'bg-amber-500/10',
    ring:  'ring-amber-500/20',
    tag:   'Marketing & Sales',
    title: 'Invalid emails kill deliverability',
    desc:  'Every hard bounce damages your sender reputation. Once you\'re blacklisted, even valid subscribers stop getting your emails.',
    stat:  '21%',
    statLabel: 'avg. email list is invalid',
    example: {
      label:   'Email from CRM import',
      bad:     'john.doe@gmial.com',
      good:    'john.doe@gmail.com',
      badTag:  'Hard bounce',
      goodTag: 'Deliverable',
    },
  },
  {
    icon:  'i-lucide-git-fork',
    color: 'text-violet-400',
    bg:    'bg-violet-500/10',
    ring:  'ring-violet-500/20',
    tag:   'CRM & Revenue Ops',
    title: 'Duplicate records break your pipeline',
    desc:  'Fragmented records mean reps chase the same lead twice, execs see inflated pipeline numbers, and AI personalization completely fails.',
    stat:  '1 in 4',
    statLabel: 'CRM records is a duplicate',
    example: {
      label:   'Same contact in your CRM',
      bad:     'Jon Smith · jon@acme.com · (212) 555-0101\nJ. Smith  · j.smith@acme.co · missing',
      good:    'Jonathan Smith · jon.smith@acme.com · (212) 555-0101',
      badTag:  '2 broken records',
      goodTag: '1 verified record',
    },
  },
]
</script>

<template>
  <section
    ref="sectionRef"
    class="py-28 px-4 relative overflow-hidden"
  >
    <!-- Dark background -->
    <div
      class="absolute inset-0 transition-colors duration-500"
      :class="colorMode === 'dark'
        ? 'bg-gradient-to-br from-slate-950 via-blue-950/40 to-slate-950'
        : 'bg-gradient-to-br from-slate-900 via-blue-900/90 to-slate-900'"
    />

    <!-- Grid overlay -->
    <div
      class="absolute inset-0 transition-opacity duration-500"
      :class="colorMode === 'dark' ? 'opacity-[0.035]' : 'opacity-[0.06]'"
      style="background-image: linear-gradient(rgba(99,179,237,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(99,179,237,0.8) 1px, transparent 1px); background-size: 48px 48px"
    />

    <!-- Orbs -->
    <div class="absolute top-0 left-1/3 w-96 h-96 bg-rose-500/8 rounded-full blur-3xl pointer-events-none" />
    <div class="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/8 rounded-full blur-3xl pointer-events-none" />

    <div class="relative z-10 max-w-6xl mx-auto">
      <!-- ── Header ───────────────────────────────────────────────────── -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="text-center mb-16"
      >
        <div class="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
          <UIcon
            name="i-lucide-triangle-alert"
            class="w-3.5 h-3.5"
          />
          The hidden cost of bad data
        </div>

        <h2 class="text-3xl md:text-5xl font-extrabold text-white mb-3 leading-tight">
          Your data is quietly
          <span class="bg-gradient-to-r from-rose-400 to-amber-400 bg-clip-text text-transparent"> costing you millions.</span>
        </h2>
        <h3 class="text-base font-medium text-white/40 mb-4">
          Why does bad contact data cost US companies billions of dollars?
        </h3>
        <p class="text-white/50 text-lg max-w-2xl mx-auto">
          US companies lose an estimated
          <strong class="text-white">$3.1 trillion per year</strong>
          to poor data quality. Bad addresses, bounced emails, and invalid phone numbers
          hit deliveries, marketing, and revenue ops simultaneously.
        </p>
      </div>

      <!-- ── Animated cost counters ────────────────────────────────────── -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }"
        class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16"
      >
        <!-- Counter 1 -->
        <div class="relative p-6 rounded-2xl bg-white/[0.04] border border-white/10 text-center group hover:bg-white/[0.07] transition-all duration-300 overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div class="relative z-10">
            <div class="text-4xl md:text-5xl font-black text-white mb-1 tabular-nums">
              $849.9B
            </div>
            <div class="text-sm text-white/40 mb-3">
              US e-commerce returns in 2026 — 19.3% of all online sales
            </div>
            <div class="flex items-center justify-center gap-1.5 text-xs text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full w-fit mx-auto">
              <UIcon
                name="i-lucide-trending-down"
                class="w-3 h-3"
              />
              Driven by bad address data at checkout
            </div>
          </div>
        </div>

        <!-- Counter 2 -->
        <div class="relative p-6 rounded-2xl bg-white/[0.04] border border-white/10 text-center group hover:bg-white/[0.07] transition-all duration-300 overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div class="relative z-10">
            <div class="text-4xl md:text-5xl font-black text-white mb-1 tabular-nums">
              $1.47
            </div>
            <div class="text-sm text-white/40 mb-3">
              average base cost per failed delivery attempt
            </div>
            <div class="flex items-center justify-center gap-1.5 text-xs text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full w-fit mx-auto">
              <UIcon
                name="i-lucide-trending-down"
                class="w-3 h-3"
              />
              Multiplies across thousands of daily routes
            </div>
          </div>
        </div>

        <!-- Counter 3 -->
        <div class="relative p-6 rounded-2xl bg-white/[0.04] border border-white/10 text-center group hover:bg-white/[0.07] transition-all duration-300 overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div class="relative z-10">
            <div class="text-4xl md:text-5xl font-black text-white mb-1 tabular-nums">
              $3.1T
            </div>
            <div class="text-sm text-white/40 mb-3">
              lost annually in the US due to poor data quality
            </div>
            <div class="flex items-center justify-center gap-1.5 text-xs text-violet-400 bg-violet-500/10 px-3 py-1 rounded-full w-fit mx-auto">
              <UIcon
                name="i-lucide-trending-down"
                class="w-3 h-3"
              />
              AI initiatives fail when fed dirty data
            </div>
          </div>
        </div>
      </div>

      <!-- ── Problem cards ──────────────────────────────────────────────── -->
      <div class="grid md:grid-cols-3 gap-5">
        <div
          v-for="(prob, i) in problems"
          :key="prob.title"
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :visible="{ opacity: 1, y: 0, transition: { delay: i * 120, duration: 600 } }"
          class="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden group hover:bg-white/[0.06] hover:border-white/20 transition-all duration-400"
        >
          <!-- Card header -->
          <div class="p-5 border-b border-white/10">
            <div class="flex items-start justify-between mb-4">
              <div
                class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                :class="prob.bg"
              >
                <UIcon
                  :name="prob.icon"
                  class="w-5 h-5"
                  :class="prob.color"
                />
              </div>
              <div class="text-xs font-semibold text-white/30 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                {{ prob.tag }}
              </div>
            </div>

            <h3 class="text-base font-extrabold text-white mb-2">
              {{ prob.title }}
            </h3>
            <p class="text-sm text-white/50 leading-relaxed">
              {{ prob.desc }}
            </p>
          </div>

          <!-- Big stat -->
          <div class="px-5 py-4 border-b border-white/10 flex items-center gap-3">
            <div
              class="text-2xl font-black"
              :class="prob.color"
            >
              {{ prob.stat }}
            </div>
            <div class="text-xs text-white/40 leading-snug">
              {{ prob.statLabel }}
            </div>
          </div>

          <!-- Before / After example -->
          <div class="p-5 flex-1 space-y-2">
            <p class="text-[10px] text-white/30 font-bold uppercase tracking-widest mb-3">
              {{ prob.example.label }}
            </p>

            <!-- Bad -->
            <div class="rounded-xl bg-rose-500/8 border border-rose-500/15 p-3">
              <div class="flex items-center justify-between mb-1.5">
                <span class="text-[10px] font-bold text-rose-400 uppercase tracking-wider">Before</span>
                <span class="text-[10px] font-semibold text-rose-400 bg-rose-500/15 px-2 py-0.5 rounded-full">
                  {{ prob.example.badTag }}
                </span>
              </div>
              <p class="text-xs text-white/50 font-mono whitespace-pre-line leading-relaxed">
                {{ prob.example.bad }}
              </p>
            </div>

            <!-- Good -->
            <div class="rounded-xl bg-emerald-500/8 border border-emerald-500/15 p-3">
              <div class="flex items-center justify-between mb-1.5">
                <span class="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">After DQE</span>
                <span class="text-[10px] font-semibold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full">
                  {{ prob.example.goodTag }}
                </span>
              </div>
              <p class="text-xs text-white/70 font-mono whitespace-pre-line leading-relaxed">
                {{ prob.example.good }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- ── Bottom CTA ─────────────────────────────────────────────────── -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 16 }"
        :visible="{ opacity: 1, y: 0, transition: { delay: 400, duration: 500 } }"
        class="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <p class="text-white/40 text-sm">
          Sound familiar?
        </p>
        <UButton
          label="Fix your data — start free"
          trailing-icon="i-lucide-arrow-right"
          class="shadow-lg shadow-blue-500/25"
          @click="emit('cta')"
        />
        <a
          href="/roi-calculator"
          class="text-sm text-white/50 hover:text-white transition-colors flex items-center gap-1.5"
        >
          <UIcon
            name="i-lucide-calculator"
            class="w-3.5 h-3.5"
          />
          Calculate your ROI →
        </a>
      </div>
    </div>
  </section>
</template>
