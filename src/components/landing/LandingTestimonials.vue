<script setup lang="ts">
interface Testimonial {
  name: string
  role: string
  company: string
  avatar: string
  color: 'primary' | 'secondary' | 'success'
  quote: string
  stars: number
}

interface TrustItem {
  icon: string
  label: string
}

withDefaults(defineProps<{
  badge?:        string
  headline?:     string
  testimonials?: Testimonial[]
  trustItems?:   TrustItem[]
}>(), {
  badge:    'Customer stories',
  headline: 'Teams who stopped tolerating\nbad data.',
  testimonials: () => [
    {
      name: 'Alicia Torres', role: 'VP of Revenue Operations', company: 'Meridian SaaS',
      avatar: 'AT', color: 'primary', stars: 5,
      quote: 'We had 34% duplicate rate in Salesforce before Deduply. Cleaned 180K records in a weekend. Our reps stopped complaining about bad data overnight.',
    },
    {
      name: 'James Whitfield', role: 'Head of Growth', company: 'Stackline Inc.',
      avatar: 'JW', color: 'secondary', stars: 5,
      quote: "Other tools missed 'Jon Smith' vs 'Jonathan Smith' at the same company. Deduply caught it. That alone was worth the price.",
    },
    {
      name: 'Priya Nair', role: 'Sales Ops Manager', company: 'Cloudify',
      avatar: 'PN', color: 'success', stars: 5,
      quote: 'Setup took 20 minutes. Within an hour it found 12,000 dupes our team had been ignoring for two years. The ROI was instant.',
    },
  ],
  trustItems: () => [
    { icon: 'i-lucide-shield-check', label: 'SOC 2 Type II'             },
    { icon: 'i-lucide-lock',         label: 'GDPR Compliant'            },
    { icon: 'i-lucide-globe',        label: 'Data stays in your region' },
    { icon: 'i-lucide-clock',        label: '99.9% Uptime SLA'         },
  ],
})

const avatarColorMap: Record<string, string> = {
  primary:   'bg-primary/15 text-primary',
  secondary: 'bg-secondary/15 text-secondary',
  success:   'bg-success/15 text-success',
}
</script>

<template>
  <section
    id="testimonials"
    class="py-24 px-4 bg-(--ui-bg-muted) overflow-hidden"
  >
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="text-center mb-16"
      >
        <slot name="header">
          <UBadge
            color="secondary"
            variant="soft"
            :label="badge"
            size="md"
            class="mb-4"
          />
          <h2 class="text-4xl md:text-5xl font-extrabold text-(--ui-text-highlighted) mb-4 whitespace-pre-line">
            {{ headline }}
          </h2>
        </slot>
      </div>

      <!-- Cards -->
      <div class="grid md:grid-cols-3 gap-6">
        <div
          v-for="(t, i) in testimonials"
          :key="t.name"
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :visible="{ opacity: 1, y: 0, transition: { delay: i * 120, duration: 600 } }"
          class="group flex flex-col p-7 rounded-2xl border border-(--ui-border) bg-(--ui-bg) hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1.5 transition-all duration-300"
        >
          <!-- Stars -->
          <div class="flex gap-1 mb-5">
            <StarRating
              :rating="t.stars"
              size="sm"
            />
            <!--            <UIcon-->
            <!--              v-for="s in t.stars"-->
            <!--              :key="s"-->
            <!--              name="i-lucide-star"-->
            <!--              class="w-4 h-4 text-warning fill-warning"-->
            <!--            />-->
          </div>

          <!-- Quote -->
          <p class="text-sm text-(--ui-text) leading-relaxed flex-1 mb-6 italic">
            "{{ t.quote }}"
          </p>

          <!-- Author -->
          <div class="flex items-center gap-3 pt-5 border-t border-(--ui-border)">
            <div
              class="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
              :class="avatarColorMap[t.color]"
            >
              {{ t.avatar }}
            </div>
            <div>
              <div class="text-sm font-bold text-(--ui-text-highlighted)">
                {{ t.name }}
              </div>
              <div class="text-xs text-(--ui-text-muted)">
                {{ t.role }} · {{ t.company }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Trust bar -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible="{ opacity: 1, y: 0, transition: { delay: 300, duration: 600 } }"
        class="mt-12 flex flex-wrap items-center justify-center gap-8 p-6 rounded-2xl border border-(--ui-border) bg-(--ui-bg)"
      >
        <slot name="trust">
          <div
            v-for="item in trustItems"
            :key="item.label"
            class="flex items-center gap-2 text-sm text-(--ui-text-muted)"
          >
            <UIcon
              :name="item.icon"
              class="w-4 h-4 text-success"
            />
            <span class="font-medium">{{ item.label }}</span>
          </div>
        </slot>
      </div>
    </div>
  </section>
</template>
