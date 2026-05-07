<script setup lang="ts">
interface FeatureItem {
  icon: string
  title: string
  desc: string
  color: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error'
}

withDefaults(defineProps<{
  badge?:    string
  headline?: string
  subline?:  string
  features?: FeatureItem[]
}>(), {
  badge:    'Features',
  headline: 'Everything your RevOps team\nactually needs.',
  subline:  'Built for the teams who own data quality — not just the ones who complain about it.',
  features: () => [
    {
      icon: 'i-lucide-brain-circuit',
      title: 'Fuzzy AI Matching',
      desc: 'Catches "Jon Smith" and "Jonathan Smith" as the same person — rules-based tools miss these every time.',
      color: 'primary',
    },
    {
      icon: 'i-lucide-git-merge',
      title: 'Smart Field Merging',
      desc: 'Automatically picks the best value per field — most complete phone, newest email, highest-confidence company.',
      color: 'secondary',
    },
    {
      icon: 'i-lucide-shield-check',
      title: 'Safe by Default',
      desc: 'Every merge is logged with a full audit trail. Roll back any merge in one click, anytime.',
      color: 'success',
    },
    {
      icon: 'i-lucide-plug',
      title: 'CRM Integrations',
      desc: 'Syncs directly with Salesforce, HubSpot, Pipedrive, and more. No CSV exports, no manual steps.',
      color: 'info',
    },
    {
      icon: 'i-lucide-sliders-horizontal',
      title: 'Custom Rules Engine',
      desc: 'Set thresholds and priority fields per team. Your RevOps rules, enforced automatically.',
      color: 'warning',
    },
    {
      icon: 'i-lucide-activity',
      title: 'Real-Time Monitoring',
      desc: 'Catches dupes the moment a new lead lands — not weeks later when the damage is done.',
      color: 'error',
    },
  ],
})

const colorMap: Record<string, string> = {
  primary:   'bg-primary/10 text-primary group-hover:bg-primary/20',
  secondary: 'bg-secondary/10 text-secondary group-hover:bg-secondary/20',
  success:   'bg-success/10 text-success group-hover:bg-success/20',
  info:      'bg-info/10 text-info group-hover:bg-info/20',
  warning:   'bg-warning/10 text-warning group-hover:bg-warning/20',
  error:     'bg-error/10 text-error group-hover:bg-error/20',
}

const glowMap: Record<string, string> = {
  primary:   'group-hover:from-primary/5 group-hover:to-secondary/5',
  secondary: 'group-hover:from-secondary/5 group-hover:to-cyan-500/5',
  success:   'group-hover:from-success/5 group-hover:to-teal-500/5',
  info:      'group-hover:from-info/5 group-hover:to-sky-500/5',
  warning:   'group-hover:from-warning/5 group-hover:to-amber-500/5',
  error:     'group-hover:from-error/5 group-hover:to-rose-500/5',
}

const borderMap: Record<string, string> = {
  primary:   'hover:border-primary/30',
  secondary: 'hover:border-secondary/30',
  success:   'hover:border-success/30',
  info:      'hover:border-info/30',
  warning:   'hover:border-warning/30',
  error:     'hover:border-error/30',
}
</script>

<template>
  <section id="features" class="py-28 px-4 relative overflow-hidden">

    <!-- Background -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
    </div>

    <div class="relative z-10 max-w-6xl mx-auto">

      <!-- Header -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="text-center mb-16"
      >
        <slot name="header">
          <UBadge color="primary" variant="soft" :label="badge" size="md" class="mb-4" />
          <h2 class="text-4xl md:text-5xl font-extrabold text-(--ui-text-highlighted) mb-4 whitespace-pre-line">
            {{ headline }}
          </h2>
          <p class="text-(--ui-text-muted) text-lg max-w-xl mx-auto">{{ subline }}</p>
        </slot>
      </div>

      <!-- Bento Grid -->
      <slot name="grid">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-4">

          <!-- ① Large card — first feature (spans 7) -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0, transition: { delay: 0, duration: 600 } }"
            class="md:col-span-7 group relative rounded-3xl border border-(--ui-border) bg-(--ui-bg) overflow-hidden transition-all duration-500 p-7 flex flex-col justify-between min-h-[320px]"
            :class="borderMap[features[0].color]"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br from-transparent to-transparent transition-all duration-500"
              :class="glowMap[features[0].color]"
            />
            <div class="relative z-10">
              <div
                class="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                :class="colorMap[features[0].color]"
              >
                <UIcon :name="features[0].icon" class="w-5 h-5" />
              </div>
              <h3 class="text-xl font-extrabold text-(--ui-text-highlighted) mb-2">{{ features[0].title }}</h3>
              <p class="text-sm text-(--ui-text-muted) leading-relaxed max-w-xs">{{ features[0].desc }}</p>
            </div>

            <!-- Mini visual: match confidence bars -->
            <div class="relative z-10 mt-6 space-y-2">
              <div
                v-for="pair in [
                  { a: 'Jonathan Smith',         b: 'Jon Smith',              score: 97, bar: 'bg-primary'   },
                  { a: 'sarah.j@globaltech.io',  b: 'sjohnson@global-tech',   score: 89, bar: 'bg-secondary' },
                  { a: 'Vertex Solutions',        b: 'Vertex',                score: 82, bar: 'bg-success'   },
                ]"
                :key="pair.a"
                class="flex items-center gap-3 p-3 rounded-xl bg-(--ui-bg-elevated) border border-(--ui-border)"
              >
                <span class="text-xs font-medium text-(--ui-text) truncate flex-1">{{ pair.a }}</span>
                <div class="flex flex-col items-center gap-0.5 flex-shrink-0">
                  <div class="w-16 h-1 rounded-full bg-(--ui-bg-accented) overflow-hidden">
                    <div class="h-full rounded-full" :class="pair.bar" :style="{ width: pair.score + '%' }" />
                  </div>
                  <span class="text-[10px] font-bold text-primary">{{ pair.score }}%</span>
                </div>
                <span class="text-xs font-medium text-(--ui-text) truncate flex-1 text-right">{{ pair.b }}</span>
              </div>
            </div>
          </div>

          <!-- ② Medium card — second feature (spans 5) -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0, transition: { delay: 80, duration: 600 } }"
            class="md:col-span-5 group relative rounded-3xl border border-(--ui-border) bg-(--ui-bg) overflow-hidden transition-all duration-500 p-7 min-h-[320px] flex flex-col justify-between"
            :class="borderMap[features[1].color]"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br from-transparent to-transparent transition-all duration-500"
              :class="glowMap[features[1].color]"
            />
            <div class="relative z-10">
              <div
                class="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                :class="colorMap[features[1].color]"
              >
                <UIcon :name="features[1].icon" class="w-5 h-5" />
              </div>
              <h3 class="text-xl font-extrabold text-(--ui-text-highlighted) mb-2">{{ features[1].title }}</h3>
              <p class="text-sm text-(--ui-text-muted) leading-relaxed">{{ features[1].desc }}</p>
            </div>

            <!-- Field winner table -->
            <div class="relative z-10 mt-6 rounded-xl border border-(--ui-border) overflow-hidden">
              <div class="grid grid-cols-3 text-[10px] font-bold text-(--ui-text-dimmed) uppercase tracking-wider px-3 py-2 bg-(--ui-bg-elevated) border-b border-(--ui-border)">
                <span>Field</span><span class="text-center">Record A</span><span class="text-right">Winner ✓</span>
              </div>
              <div
                v-for="row in [
                  { field: 'Email',   a: 'jon@acme.com', winner: 'jon.smith@acmecorp.com' },
                  { field: 'Phone',   a: '',             winner: '(212) 555-0101'          },
                  { field: 'Company', a: 'Acme Inc.',    winner: 'Acme Corp'               },
                ]"
                :key="row.field"
                class="grid grid-cols-3 items-center px-3 py-2 border-b border-(--ui-border) last:border-0 text-[11px]"
              >
                <span class="text-(--ui-text-muted) font-medium">{{ row.field }}</span>
                <span class="text-center text-(--ui-text-dimmed) truncate">{{ row.a || '—' }}</span>
                <span class="text-right text-secondary font-semibold truncate">{{ row.winner }}</span>
              </div>
            </div>
          </div>

          <!-- ③④⑤ Bottom row — remaining features (spans 4 each) -->
          <div
            v-for="(feat, i) in features.slice(2)"
            :key="feat.title"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0, transition: { delay: (i + 2) * 80, duration: 600 } }"
            class="md:col-span-4 group relative rounded-3xl border border-(--ui-border) bg-(--ui-bg) overflow-hidden transition-all duration-500 p-7 min-h-[220px] flex flex-col justify-between"
            :class="[
              borderMap[feat.color],
              // last card gets dark treatment
              i === features.slice(2).length - 1
                ? '!bg-gradient-to-br !from-zinc-950 !via-violet-950/70 !to-zinc-950 !border-white/10'
                : ''
            ]"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br from-transparent to-transparent transition-all duration-500"
              :class="glowMap[feat.color]"
            />

            <!-- Dark card orbs -->
            <template v-if="i === features.slice(2).length - 1">
              <div class="absolute -top-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
              <div class="absolute -bottom-6 -left-6 w-24 h-24 bg-secondary/15 rounded-full blur-2xl pointer-events-none" />
            </template>

            <div class="relative z-10">
              <div class="flex items-center gap-3 mb-4">
                <div
                  class="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  :class="colorMap[feat.color]"
                >
                  <UIcon :name="feat.icon" class="w-5 h-5" />
                </div>
                <!-- Live badge on last card -->
                <div
                  v-if="i === features.slice(2).length - 1"
                  class="flex items-center gap-1.5 text-xs font-bold text-white/60 bg-white/5 px-2.5 py-1 rounded-full border border-white/10"
                >
                  <span class="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                  Live
                </div>
              </div>
              <h3
                class="text-lg font-extrabold mb-2"
                :class="i === features.slice(2).length - 1 ? 'text-white' : 'text-(--ui-text-highlighted)'"
              >{{ feat.title }}</h3>
              <p
                class="text-sm leading-relaxed"
                :class="i === features.slice(2).length - 1 ? 'text-white/50' : 'text-(--ui-text-muted)'"
              >{{ feat.desc }}</p>
            </div>

            <!-- Mini stat for last card -->
            <div v-if="i === features.slice(2).length - 1" class="relative z-10 mt-4 grid grid-cols-2 gap-2">
              <div class="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                <div class="text-2xl font-black text-white">14</div>
                <div class="text-[10px] text-white/40 mt-0.5">Dupes today</div>
              </div>
              <div class="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                <div class="text-2xl font-black text-primary">0</div>
                <div class="text-[10px] text-white/40 mt-0.5">Missed</div>
              </div>
            </div>
          </div>

        </div>
      </slot>

      <!-- Bottom CTA -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 16 }"
        :visible="{ opacity: 1, y: 0, transition: { delay: 400, duration: 500 } }"
        class="mt-10 text-center"
      >
        <slot name="cta">
          <UButton size="lg" variant="soft" label="See all features" trailing-icon="i-lucide-arrow-right" />
        </slot>
      </div>

    </div>
  </section>
</template>
