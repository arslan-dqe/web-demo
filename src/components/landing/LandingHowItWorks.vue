<script setup lang="ts">
interface Step {
  num: string
  icon: string
  title: string
  desc: string
  windowLabel: string
  points: string[]
}

withDefaults(defineProps<{
  badge?:    string
  headline?: string
  subline?:  string
  steps?:    Step[]
}>(), {
  badge:    'How it works',
  headline: 'From dirty data to clean CRM\nin three steps.',
  subline:  'No data scientists. No spreadsheets. No manual mapping. Just connect and let Deduply do the heavy lifting.',
  steps: () => [
    {
      num: '01',
      icon: 'i-lucide-database',
      title: 'Connect your CRM in 30 seconds.',
      desc: 'OAuth one-click connection. We pull your contacts, leads, and accounts instantly — no data leaves your region, ever.',
      windowLabel: 'deduply.io — Integrations',
      points: [
        'Salesforce, HubSpot, Pipedrive & more',
        'Read-only access by default',
        'GDPR & SOC 2 compliant sync',
      ],
    },
    {
      num: '02',
      icon: 'i-lucide-scan-search',
      title: 'AI scans every record for duplicates.',
      desc: 'Our model compares names, emails, phones, and companies across every record — even with typos, nicknames, and abbreviations.',
      windowLabel: 'deduply.io — Scan in progress',
      points: [
        'Fuzzy name & email matching',
        'Company alias detection',
        'Cross-object deduplication',
      ],
    },
    {
      num: '03',
      icon: 'i-lucide-git-merge',
      title: 'Review, approve, and merge.',
      desc: 'Approve AI suggestions in bulk or one by one. Set confidence thresholds to auto-merge the obvious ones without touching a thing.',
      windowLabel: 'deduply.io — Merge review',
      points: [
        'Bulk approve high-confidence matches',
        'Full merge history & rollback',
        'Slack alerts for new duplicate clusters',
      ],
    },
  ],
})
</script>

<template>
  <section
    id="how"
    class="py-28 px-4 relative overflow-hidden bg-(--ui-bg-muted)"
  >
    <!-- Background orbs -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div class="absolute bottom-20 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
    </div>

    <div class="relative z-10 max-w-6xl mx-auto">
      <!-- Header -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="text-center mb-24"
      >
        <slot name="header">
          <UBadge
            color="primary"
            variant="soft"
            :label="badge"
            size="md"
            class="mb-4"
          />
          <h2 class="text-4xl md:text-5xl font-extrabold text-(--ui-text-highlighted) mb-4 whitespace-pre-line">
            {{ headline }}
          </h2>
          <p class="text-(--ui-text-muted) text-lg max-w-xl mx-auto">
            {{ subline }}
          </p>
        </slot>
      </div>

      <!-- Steps -->
      <div class="flex flex-col gap-16 md:gap-0">
        <div
          v-for="(step, i) in steps"
          :key="step.num"
          v-motion
          :initial="{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }"
          :visible="{ opacity: 1, x: 0, transition: { delay: i * 150, duration: 700 } }"
          class="relative grid md:grid-cols-2 gap-8 md:gap-16 items-center"
          :class="i % 2 !== 0 ? 'md:[direction:rtl]' : ''"
        >
          <!-- Text side -->
          <div class="md:[direction:ltr]">
            <!-- Decorative number -->
            <div
              class="absolute -top-8 font-black text-[8rem] md:text-[10rem] leading-none select-none pointer-events-none text-(--ui-text-highlighted)/[0.04]"
              :class="i % 2 === 0 ? '-left-4 md:-left-8' : '-right-4 md:-right-8'"
            >
              {{ step.num }}
            </div>

            <div class="relative">
              <div class="inline-flex items-center gap-2 mb-5">
                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-md shadow-primary/30 text-white text-xs font-black">
                  {{ i + 1 }}
                </div>
                <span class="text-xs font-bold text-primary tracking-widest uppercase">Step {{ step.num }}</span>
              </div>

              <h3 class="text-2xl md:text-3xl font-extrabold text-(--ui-text-highlighted) mb-4 leading-tight">
                {{ step.title }}
              </h3>
              <p class="text-(--ui-text-muted) leading-relaxed mb-6 text-base">
                {{ step.desc }}
              </p>

              <ul class="space-y-2">
                <li
                  v-for="point in step.points"
                  :key="point"
                  class="flex items-center gap-2.5 text-sm text-(--ui-text)"
                >
                  <div class="w-4 h-4 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                    <UIcon
                      name="i-lucide-check"
                      class="w-2.5 h-2.5 text-primary"
                    />
                  </div>
                  {{ point }}
                </li>
              </ul>
            </div>
          </div>

          <!-- Visual card side -->
          <div class="md:[direction:ltr]">
            <div class="relative rounded-2xl border border-(--ui-border) bg-(--ui-bg) overflow-hidden shadow-2xl shadow-black/5 hover:-translate-y-1 transition-transform duration-500">
              <!-- Window chrome -->
              <div class="flex items-center gap-1.5 px-4 py-3 bg-(--ui-bg-elevated) border-b border-(--ui-border)">
                <span class="w-2.5 h-2.5 rounded-full bg-rose-400/70" />
                <span class="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
                <span class="flex-1 text-center text-[11px] text-(--ui-text-dimmed)">{{ step.windowLabel }}</span>
              </div>

              <div class="p-5">
                <!-- Slot per step index for full custom override -->
                <slot :name="`step-visual-${i}`">
                  <!-- Step 0: Connect -->
                  <div
                    v-if="i === 0"
                    class="space-y-3"
                  >
                    <p class="text-xs text-(--ui-text-muted) font-medium mb-4">
                      Choose your CRM integration
                    </p>
                    <div
                      v-for="crm in ['Salesforce', 'HubSpot', 'Pipedrive']"
                      :key="crm"
                      class="flex items-center gap-3 p-3 rounded-xl border border-(--ui-border) bg-(--ui-bg-elevated) hover:border-primary/30 transition-colors cursor-pointer"
                    >
                      <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <UIcon
                          name="i-lucide-plug"
                          class="w-4 h-4 text-primary"
                        />
                      </div>
                      <span class="text-sm font-semibold text-(--ui-text-highlighted) flex-1">{{ crm }}</span>
                      <UBadge
                        size="xs"
                        color="success"
                        variant="soft"
                        label="Connected"
                      />
                    </div>
                    <div class="flex items-center gap-3 p-3 rounded-xl border border-dashed border-(--ui-border) opacity-50">
                      <div class="w-8 h-8 rounded-lg bg-(--ui-bg-accented) flex items-center justify-center">
                        <UIcon
                          name="i-lucide-plus"
                          class="w-4 h-4 text-(--ui-text-muted)"
                        />
                      </div>
                      <span class="text-sm text-(--ui-text-muted)">Add another integration…</span>
                    </div>
                  </div>

                  <!-- Step 1: AI Scan -->
                  <div
                    v-else-if="i === 1"
                    class="space-y-3"
                  >
                    <div class="flex items-center justify-between mb-2">
                      <p class="text-xs text-(--ui-text-muted) font-medium">
                        Scanning 48,291 records…
                      </p>
                      <UBadge
                        size="xs"
                        color="primary"
                        variant="soft"
                        label="Live"
                        class="animate-pulse"
                      />
                    </div>
                    <div
                      v-for="scan in [
                        { label: 'Name matching', pct: 100, color: 'bg-primary' },
                        { label: 'Email deduplication', pct: 87, color: 'bg-secondary' },
                        { label: 'Phone normalization', pct: 64, color: 'bg-success' },
                        { label: 'Company clustering', pct: 31, color: 'bg-warning' },
                      ]"
                      :key="scan.label"
                      class="space-y-1"
                    >
                      <div class="flex justify-between text-xs">
                        <span class="text-(--ui-text-muted)">{{ scan.label }}</span>
                        <span class="text-(--ui-text-highlighted) font-semibold">{{ scan.pct }}%</span>
                      </div>
                      <div class="h-1.5 w-full rounded-full bg-(--ui-bg-accented) overflow-hidden">
                        <div
                          class="h-full rounded-full"
                          :class="scan.color"
                          :style="{ width: scan.pct + '%' }"
                        />
                      </div>
                    </div>
                    <div class="mt-3 flex items-center gap-2 text-xs text-success bg-success/10 px-3 py-2 rounded-lg">
                      <UIcon
                        name="i-lucide-sparkles"
                        class="w-3.5 h-3.5"
                      />
                      2,847 duplicate clusters found so far
                    </div>
                  </div>

                  <!-- Step 2: Review & Merge -->
                  <div
                    v-else
                    class="space-y-3"
                  >
                    <div class="flex items-center justify-between mb-1">
                      <p class="text-xs text-(--ui-text-muted) font-medium">
                        Review suggestions
                      </p>
                      <span class="text-xs font-bold text-primary">12 remaining</span>
                    </div>
                    <div
                      v-for="pair in [
                        { a: 'Jonathan Smith', b: 'Jon Smith', score: 97 },
                        { a: 'Sarah Johnson', b: 'Sara L. Johnson', score: 91 },
                      ]"
                      :key="pair.a"
                      class="p-3 rounded-xl border border-(--ui-border) bg-(--ui-bg-elevated) space-y-2"
                    >
                      <div class="flex items-center gap-2">
                        <span class="flex-1 text-xs font-semibold text-(--ui-text-highlighted) truncate">{{ pair.a }}</span>
                        <div class="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                          <UIcon
                            name="i-lucide-git-merge"
                            class="w-3 h-3 text-primary"
                          />
                        </div>
                        <span class="flex-1 text-xs font-semibold text-(--ui-text-highlighted) truncate text-right">{{ pair.b }}</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <div class="flex-1 h-1 rounded-full bg-(--ui-bg-accented) overflow-hidden">
                          <div
                            class="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                            :style="{ width: pair.score + '%' }"
                          />
                        </div>
                        <span class="text-[10px] font-bold text-primary">{{ pair.score }}% match</span>
                      </div>
                      <div class="flex gap-2 pt-1">
                        <UButton
                          size="xs"
                          variant="soft"
                          color="success"
                          label="Merge"
                          leading-icon="i-lucide-check"
                          class="flex-1"
                        />
                        <UButton
                          size="xs"
                          variant="ghost"
                          color="error"
                          label="Skip"
                          leading-icon="i-lucide-x"
                          class="flex-1"
                        />
                      </div>
                    </div>
                  </div>
                </slot>
              </div>
            </div>
          </div>

          <!-- Step connector -->
          <div
            v-if="i < steps.length - 1"
            class="hidden md:flex absolute -bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-1 z-10"
          >
            <div class="w-px h-6 bg-gradient-to-b from-primary/40 to-primary/10" />
            <div class="w-6 h-6 rounded-full border-2 border-primary/30 bg-(--ui-bg-muted) flex items-center justify-center">
              <UIcon
                name="i-lucide-chevron-down"
                class="w-3 h-3 text-primary/60"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
