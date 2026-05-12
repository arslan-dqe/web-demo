<!-- src/components/dqe/DqeTestimonials.vue -->
<script setup lang="ts">
const testimonials = [
  {
    avatar:   'DR',
    name:     'Dana Reyes',
    role:     'VP Digital Marketing',
    company:  'Urban Supply Co.',
    industry: 'Retail & E-commerce',
    icon:     'i-lucide-shopping-cart',
    color:    'blue',
    stars:    5,
    stat:     '31% fewer failed deliveries',
    quote:    'We validated 180K customer addresses over a weekend. The checkout widget alone paid for the entire year in the first month. I wish we\'d done this two years ago.',
  },
  {
    avatar:   'CM',
    name:     'Carlos Mendez',
    role:     'Head of Last-Mile Operations',
    company:  'FreightFlow Inc.',
    industry: 'Logistics',
    icon:     'i-lucide-truck',
    color:    'teal',
    stars:    5,
    stat:     '28% drop in address errors',
    quote:    'We injected DQE into our TMS pre-dispatch validation in an afternoon. Bad addresses dropped 28% that week. Our drivers stopped wasting time on undeliverable stops.',
  },
  {
    avatar:   'SL',
    name:     'Sophie Laurent',
    role:     'Director of CRM',
    company:  'Grand Meridian Hotels',
    industry: 'Hospitality',
    icon:     'i-lucide-hotel',
    color:    'violet',
    stars:    5,
    stat:     '18% lift in email open rates',
    quote:    'Our guest database had a 34% duplicate rate across OTA and direct bookings. DQE cleaned it in 3 hours. Loyalty campaigns are actually reaching the right people now.',
  },
  {
    avatar:   'AT',
    name:     'Alex Torres',
    role:     'Senior Platform Engineer',
    company:  'Stackline',
    industry: 'Developer',
    icon:     'i-lucide-code-2',
    color:    'amber',
    stars:    5,
    stat:     'Production in 4 hours',
    quote:    'Zero to production in 4 hours. The REST API is clean, the docs are actually good, and the response times are fast enough for real-time checkout validation. No complaints.',
  },
  {
    avatar:   'MK',
    name:     'Mia Kaufman',
    role:     'Data Quality Manager',
    company:  'RetailEdge Inc.',
    industry: 'Retail & E-commerce',
    icon:     'i-lucide-shopping-cart',
    color:    'blue',
    stars:    5,
    stat:     'Replaced 3 vendors with 1',
    quote:    'We were paying Smarty for addresses, ZeroBounce for emails, and another tool for phones. DQE replaced all three. The bill went down, the data quality went up.',
  },
  {
    avatar:   'JR',
    name:     'James Rourke',
    role:     'Supply Chain Analytics Lead',
    company:  'Apex Distribution',
    industry: 'Logistics',
    icon:     'i-lucide-truck',
    color:    'teal',
    stars:    5,
    stat:     '$340K saved in reverse logistics',
    quote:    'The ROI was embarrassingly fast. Within 60 days we had hard numbers showing $340K saved in avoided re-deliveries. Our CFO approved the enterprise plan on the spot.',
  },
]

const colorMap: Record<string, string> = {
  blue:   'bg-blue-500/15   text-blue-500',
  teal:   'bg-teal-500/15   text-teal-500',
  violet: 'bg-violet-500/15 text-violet-500',
  amber:  'bg-amber-500/15  text-amber-500',
}

const industryBgMap: Record<string, string> = {
  blue:   'bg-blue-500/8   text-blue-500   border-blue-500/15',
  teal:   'bg-teal-500/8   text-teal-500   border-teal-500/15',
  violet: 'bg-violet-500/8 text-violet-500 border-violet-500/15',
  amber:  'bg-amber-500/8  text-amber-500  border-amber-500/15',
}

const trustItems = [
  { icon: 'i-lucide-star',         label: '4.9 / 5 on G2',             color: 'text-warning' },
  { icon: 'i-lucide-award',        label: 'USPS CASS Certified',        color: 'text-primary' },
  { icon: 'i-lucide-shield-check', label: 'SOC 2 Type II',              color: 'text-success' },
  { icon: 'i-lucide-lock',         label: 'GDPR & CCPA Compliant',      color: 'text-info'    },
  { icon: 'i-lucide-activity',     label: '99.99% API Uptime',          color: 'text-teal-500'},
]
</script>

<template>
  <section id="testimonials" class="py-28 px-4 relative overflow-hidden bg-(--ui-bg-muted)">

    <!-- Background -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-0 right-0 w-[500px] h-[400px] bg-blue-500/5 rounded-full blur-3xl" />
      <div class="absolute bottom-0 left-0 w-[400px] h-[300px] bg-teal-500/5 rounded-full blur-3xl" />
    </div>

    <div class="relative z-10 max-w-6xl mx-auto">

      <!-- ── Header ───────────────────────────────────────────────────── -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="text-center mb-14"
      >
        <UBadge color="primary" variant="soft" label="Customer stories" size="md" class="mb-4" />
        <h2 class="text-4xl md:text-5xl font-extrabold text-(--ui-text-highlighted) mb-3 leading-tight">
          Trusted by teams who
          <span class="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
            can't afford bad data.
          </span>
        </h2>
        <h3 class="text-base font-medium text-(--ui-text-muted) mb-4">What results do DQE customers see after fixing their data quality?</h3>
        <p class="text-(--ui-text-muted) text-lg max-w-xl mx-auto">
          From checkout to last-mile delivery — real results from real teams
          across retail, logistics, hospitality, and engineering.
        </p>
      </div>

      <!-- ── Testimonial grid ──────────────────────────────────────────── -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
        <div
          v-for="(t, i) in testimonials"
          :key="t.name"
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :visible="{ opacity: 1, y: 0, transition: { delay: i * 80, duration: 600 } }"
          class="group flex flex-col p-6 rounded-2xl border border-(--ui-border) bg-(--ui-bg) hover:border-primary/25 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300"
        >

          <!-- Industry + Stars row -->
          <div class="flex items-center justify-between mb-4">
            <div
              class="flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border"
              :class="industryBgMap[t.color]"
            >
              <UIcon :name="t.icon" class="w-3 h-3" />
              {{ t.industry }}
            </div>
            <div class="flex gap-0.5">
              <UIcon
                v-for="s in t.stars"
                :key="s"
                name="i-lucide-star"
                class="w-3.5 h-3.5 text-warning fill-warning"
              />
            </div>
          </div>

          <!-- Stat highlight -->
          <div
            class="inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-lg mb-4 w-fit"
            :class="industryBgMap[t.color]"
          >
            <UIcon name="i-lucide-trending-up" class="w-3.5 h-3.5" />
            {{ t.stat }}
          </div>

          <!-- Quote -->
          <p class="text-sm text-(--ui-text) leading-relaxed flex-1 mb-5 italic">
            "{{ t.quote }}"
          </p>

          <!-- Author -->
          <div class="flex items-center gap-3 pt-4 border-t border-(--ui-border)">
            <div
              class="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
              :class="colorMap[t.color]"
            >{{ t.avatar }}</div>
            <div class="min-w-0">
              <div class="text-sm font-bold text-(--ui-text-highlighted) truncate">{{ t.name }}</div>
              <div class="text-xs text-(--ui-text-muted) truncate">{{ t.role }} · {{ t.company }}</div>
            </div>
          </div>

        </div>
      </div>

      <!-- ── G2 + trust bar ────────────────────────────────────────────── -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible="{ opacity: 1, y: 0, transition: { delay: 300, duration: 600 } }"
        class="rounded-2xl border border-(--ui-border) bg-(--ui-bg) p-6"
      >
        <div class="flex flex-col md:flex-row items-center gap-6">

          <!-- G2 score -->
          <div class="flex items-center gap-4 flex-shrink-0">
            <div class="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
              <span class="text-lg font-black text-orange-500">G2</span>
            </div>
            <div>
              <div class="flex items-center gap-1.5 mb-1">
                <UIcon
                  v-for="s in 5"
                  :key="s"
                  name="i-lucide-star"
                  class="w-4 h-4 text-warning fill-warning"
                />
                <span class="font-extrabold text-(--ui-text-highlighted) ml-1">4.9</span>
              </div>
              <p class="text-xs text-(--ui-text-muted)">Based on 340+ verified reviews</p>
            </div>
          </div>

          <USeparator orientation="vertical" class="hidden md:block h-12" />
          <USeparator class="md:hidden w-full" />

          <!-- Trust items -->
          <div class="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-3 flex-1">
            <div
              v-for="item in trustItems"
              :key="item.label"
              class="flex items-center gap-2 text-sm text-(--ui-text-muted)"
            >
              <UIcon :name="item.icon" class="w-4 h-4 flex-shrink-0" :class="item.color" />
              <span class="font-medium">{{ item.label }}</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  </section>
</template>
