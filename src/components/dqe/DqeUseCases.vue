<!-- src/components/dqe/DqeUseCases.vue -->
<script setup lang="ts">
import { ref, computed } from 'vue'

type Industry = 'retail' | 'logistics' | 'hospitality' | 'developers'
const active = ref<Industry>('retail')

const industries = [
  { id: 'retail'      as Industry, label: 'Retail & E-commerce', icon: 'i-lucide-shopping-cart' },
  { id: 'logistics'   as Industry, label: 'Logistics',            icon: 'i-lucide-truck'          },
  { id: 'hospitality' as Industry, label: 'Hospitality',          icon: 'i-lucide-hotel'          },
  { id: 'developers'  as Industry, label: 'Developers',           icon: 'i-lucide-code-2'         },
]

const cases = {
  retail: {
    color:     'blue',
    gradient:  'from-blue-600 to-cyan-500',
    icon:      'i-lucide-shopping-cart',
    persona:   'VP Digital Marketing · Data Quality Manager',
    headline:  'Stop losing revenue at checkout.',
    desc:      'Every wrong address entered at checkout is a failed delivery, a return, and a frustrated customer. DQE validates addresses in real time as shoppers type — before the order is placed.',
    stats: [
      { value: '19.3%',  label: 'US e-commerce return rate in 2026'          },
      { value: '$849.9B', label: 'total US returns problem this year'         },
      { value: '43%',    label: 'fewer undelivered parcels — DQE customers'  },
    ],
    outcomes: [
      'Validate addresses at checkout in real time',
      'Reduce failed deliveries and reverse logistics cost',
      'Clean existing customer address database',
      'Enrich records with ZIP+4 and county data',
    ],
    integrations: ['Shopify', 'Salesforce', 'Klaviyo', 'BigCommerce'],
    mockup: {
      title: 'Checkout address validation',
      input: '1 Infinite Loop, Cupertino, CA',
      badge: 'Auto-corrected',
      badgeColor: 'text-success bg-success/10',
      result: '1 INFINITE LOOP, CUPERTINO, CA 95014-2083',
      saving: 'Prevented 1 failed delivery · Saved ~$19',
    },
    quote: {
      text:    'DQE cut our failed delivery rate by 31% in the first month. The checkout validation alone paid for the entire year.',
      name:    'Dana R.',
      role:    'VP Digital, Urban Outfitters',
      avatar:  'DR',
    },
  },

  logistics: {
    color:     'teal',
    gradient:  'from-teal-600 to-emerald-500',
    icon:      'i-lucide-truck',
    persona:   'Head of Last-Mile Logistics · Supply Chain Lead',
    headline:  'Maximise last-mile delivery success.',
    desc:      'Bad addresses don\'t just cost money — they destroy customer trust and NPS. DQE validates every address before it enters your dispatch system, ensuring your drivers always have a deliverable destination.',
    stats: [
      { value: '1 in 8',  label: 'shipments affected by address errors'    },
      { value: '99.9%',   label: 'USPS delivery point validation accuracy' },
      { value: '2.1×',    label: 'fewer re-delivery attempts'              },
    ],
    outcomes: [
      'Validate before injecting into dispatch systems',
      'Flag undeliverable addresses before driver assignment',
      'Batch-clean historical shipment databases',
      'API integration with TMS and WMS platforms',
    ],
    integrations: ['FedEx', 'UPS', 'ShipBob', 'Salesforce'],
    mockup: {
      title:      'Pre-dispatch address check',
      input:      '742 Evergreen Terrace, Springfield',
      badge:      'Warning — incomplete',
      badgeColor: 'text-warning bg-warning/10',
      result:     'Missing state + ZIP. Suggest: Springfield, IL 62701',
      saving:     'Flagged before dispatch · Driver time saved',
    },
    quote: {
      text:    'We integrated DQE into our TMS in an afternoon. Bad addresses dropped by 28% that week. Our ops team was speechless.',
      name:    'Carlos M.',
      role:    'Head of Last-Mile, FreightFlow',
      avatar:  'CM',
    },
  },

  hospitality: {
    color:     'violet',
    gradient:  'from-violet-600 to-purple-500',
    icon:      'i-lucide-hotel',
    persona:   'Director of Guest Experience · VP Revenue',
    headline:  'One guest. One record. Every time.',
    desc:      'OTA bookings, loyalty programs, and direct reservations create fragmented guest profiles. DQE validates and deduplicates guest data so your team delivers personalised experiences — not duplicate mailers.',
    stats: [
      { value: '25%',    label: 'reduction in account abandonment'           },
      { value: '30%',    label: 'more actionable marketing data'             },
      { value: '80%',    label: 'time savings on manual data cleanup'        },
    ],
    outcomes: [
      'Validate guest addresses at point of capture',
      'Deduplicate profiles across OTA and direct channels',
      'Verify contact emails before loyalty campaigns',
      'Enrich profiles with standardised address data',
    ],
    integrations: ['Opera PMS', 'Salesforce', 'HubSpot', 'Mailchimp'],
    mockup: {
      title:      'Guest profile deduplication',
      input:      'John Smith · john@gmail.com\nJ. Smith  · jsmith@gmail.com',
      badge:      '2 records → 1 profile',
      badgeColor: 'text-violet-500 bg-violet-500/10',
      result:     'John Smith · john@gmail.com · 3 stays · Gold member',
      saving:     'Merged 2 profiles · Loyalty points unified',
    },
    quote: {
      text:    'Our email open rates jumped 18% after cleaning guest emails with DQE. We were sending to dead addresses for years.',
      name:    'Sophie L.',
      role:    'Director CRM, Grand Meridian Hotels',
      avatar:  'SL',
    },
  },

  developers: {
    color:     'amber',
    gradient:  'from-amber-500 to-orange-500',
    icon:      'i-lucide-code-2',
    persona:   'Developer · Technical Lead · Platform Engineer',
    headline:  'Ship validation in minutes, not sprints.',
    desc:      'A clean REST API with sub-100ms responses, SDKs for major languages, webhook support, and LLM integration guides. DQE is built by developers for developers — no procurement, no SFTP, no excuses.',
    stats: [
      { value: '<150ms', label: 'p99 API response time'                      },
      { value: '10B+',   label: 'queries per year capacity'                  },
      { value: '5 min',  label: 'time to first successful API call'          },
    ],
    outcomes: [
      'REST API with JSON responses and clear error codes',
      'SDKs: Node.js, Python, PHP, Ruby, Go',
      'Webhook support for async batch processing',
      'LLM / AI agent integration guides (OpenAI, LangChain)',
    ],
    integrations: ['Node.js', 'Python', 'OpenAI', 'LangChain'],
    mockup: {
      title:      'API response — 74ms',
      input:      'POST /v1/validate',
      badge:      '200 OK · 74ms',
      badgeColor: 'text-success bg-success/10',
      result:     '{ "address": { "status": "valid" }, "email": { "status": "deliverable" }, "phone": { "status": "active" } }',
      saving:     '3 validations · 1 API call · $0.003',
    },
    quote: {
      text:    'Went from zero to production in 4 hours. The docs are actually good. The API just works.',
      name:    'Alex T.',
      role:    'Senior Engineer, Stackline',
      avatar:  'AT',
    },
  },
}

type CaseData = typeof cases.retail
const activeCase = computed(() => cases[active.value] as CaseData)

const colorMap: Record<string, string> = {
  blue:   'text-blue-500',
  teal:   'text-teal-500',
  violet: 'text-violet-500',
  amber:  'text-amber-500',
}
const colorBgMap: Record<string, string> = {
  blue:   'bg-blue-500/10',
  teal:   'bg-teal-500/10',
  violet: 'bg-violet-500/10',
  amber:  'bg-amber-500/10',
}
const colorBorderMap: Record<string, string> = {
  blue:   'border-blue-500/25',
  teal:   'border-teal-500/25',
  violet: 'border-violet-500/25',
  amber:  'border-amber-500/25',
}
const colorActiveTab: Record<string, string> = {
  blue:   'border-blue-500   bg-blue-500/8   text-blue-600   dark:text-blue-400',
  teal:   'border-teal-500   bg-teal-500/8   text-teal-600   dark:text-teal-400',
  violet: 'border-violet-500 bg-violet-500/8 text-violet-600 dark:text-violet-400',
  amber:  'border-amber-500  bg-amber-500/8  text-amber-600  dark:text-amber-400',
}
</script>

<template>
  <section
    id="use-cases"
    class="py-28 px-4 relative overflow-hidden bg-(--ui-bg)"
  >
    <!-- Soft background -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-0 right-0 w-[600px] h-[400px] bg-blue-500/5 rounded-full blur-3xl" />
      <div class="absolute bottom-0 left-0 w-[500px] h-[350px] bg-teal-500/5 rounded-full blur-3xl" />
    </div>

    <div class="relative z-10 max-w-6xl mx-auto">
      <!-- ── Header ───────────────────────────────────────────────────── -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="text-center mb-12"
      >
        <UBadge
          color="primary"
          variant="soft"
          label="Use cases"
          size="md"
          class="mb-4"
        />
        <h2 class="text-4xl md:text-5xl font-extrabold text-(--ui-text-highlighted) mb-3 leading-tight">
          Built for your industry.
        </h2>
        <h3 class="text-base font-medium text-(--ui-text-muted) mb-4">
          Which industries use DQE for contact data quality?
        </h3>
        <p class="text-(--ui-text-muted) text-lg max-w-xl mx-auto">
          DQE solves different problems for different teams.
          Pick your industry to see exactly how it works for you.
        </p>
      </div>

      <!-- ── Industry tabs ─────────────────────────────────────────────── -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 16 }"
        :visible="{ opacity: 1, y: 0, transition: { delay: 100, duration: 500 } }"
        class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12"
      >
        <button
          v-for="ind in industries"
          :key="ind.id"
          class="flex flex-col items-center gap-2 p-4 rounded-xl border-2 font-semibold text-sm transition-all duration-300"
          :class="active === ind.id
            ? `${colorActiveTab[cases[ind.id].color]} shadow-md`
            : 'border-(--ui-border) text-(--ui-text-muted) hover:border-(--ui-border-accented) bg-(--ui-bg)'"
          @click="active = ind.id"
        >
          <div
            class="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
            :class="active === ind.id
              ? colorBgMap[cases[ind.id].color]
              : 'bg-(--ui-bg-elevated)'"
          >
            <UIcon
              :name="ind.icon"
              class="w-5 h-5 transition-colors duration-300"
              :class="active === ind.id ? colorMap[cases[ind.id].color] : 'text-(--ui-text-muted)'"
            />
          </div>
          <span class="text-center leading-tight text-xs md:text-sm">{{ ind.label }}</span>
        </button>
      </div>

      <!-- ── Active case content ────────────────────────────────────────── -->
      <Transition
        name="case-slide"
        mode="out-in"
      >
        <div
          :key="active"
          class="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start"
        >
          <!-- Left: Info ─────────────────────────────────────────────── -->
          <div
            v-motion
            :initial="{ opacity: 0, x: -20 }"
            :enter="{ opacity: 1, x: 0, transition: { duration: 500 } }"
          >
            <!-- Persona pill -->
            <div
              class="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full border mb-5"
              :class="[colorBgMap[activeCase.color], colorMap[activeCase.color], colorBorderMap[activeCase.color]]"
            >
              <UIcon
                name="i-lucide-user"
                class="w-3.5 h-3.5"
              />
              {{ activeCase.persona }}
            </div>

            <h3 class="text-2xl md:text-3xl font-extrabold text-(--ui-text-highlighted) mb-4 leading-tight">
              {{ activeCase.headline }}
            </h3>
            <p class="text-(--ui-text-muted) leading-relaxed mb-8">
              {{ activeCase.desc }}
            </p>

            <!-- Stats row -->
            <div class="grid grid-cols-3 gap-4 mb-8 p-4 rounded-xl bg-(--ui-bg-elevated) border border-(--ui-border)">
              <div
                v-for="stat in activeCase.stats"
                :key="stat.label"
                class="text-center"
              >
                <div
                  class="text-xl font-extrabold mb-1"
                  :class="colorMap[activeCase.color]"
                >
                  {{ stat.value }}
                </div>
                <div class="text-[10px] text-(--ui-text-dimmed) leading-snug">
                  {{ stat.label }}
                </div>
              </div>
            </div>

            <!-- Outcomes -->
            <ul class="space-y-2.5 mb-8">
              <li
                v-for="(out, i) in activeCase.outcomes"
                :key="out"
                v-motion
                :initial="{ opacity: 0, x: -12 }"
                :enter="{ opacity: 1, x: 0, transition: { delay: i * 60, duration: 400 } }"
                class="flex items-center gap-3 text-sm text-(--ui-text)"
              >
                <div
                  class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  :class="colorBgMap[activeCase.color]"
                >
                  <UIcon
                    name="i-lucide-check"
                    class="w-3 h-3"
                    :class="colorMap[activeCase.color]"
                  />
                </div>
                {{ out }}
              </li>
            </ul>

            <!-- Integrations -->
            <div class="flex flex-wrap gap-2 mb-8">
              <span class="text-xs text-(--ui-text-dimmed) self-center mr-1">Works with:</span>
              <div
                v-for="intg in activeCase.integrations"
                :key="intg"
                class="text-xs font-semibold px-2.5 py-1 rounded-full border bg-(--ui-bg-elevated) text-(--ui-text-muted) border-(--ui-border)"
              >
                {{ intg }}
              </div>
            </div>

            <!-- CTAs -->
            <div class="flex flex-wrap gap-3">
              <UButton
                label="Start free"
                trailing-icon="i-lucide-arrow-right"
                class="shadow-md"
              />
              <UButton
                variant="ghost"
                :label="`${industries.find(i => i.id === active)?.label} guide`"
                leading-icon="i-lucide-book-open"
              />
            </div>
          </div>

          <!-- Right: Mockup + Quote ───────────────────────────────────── -->
          <div
            v-motion
            :initial="{ opacity: 0, x: 20 }"
            :enter="{ opacity: 1, x: 0, transition: { duration: 500 } }"
            class="space-y-4"
          >
            <!-- Mockup card -->
            <div class="rounded-2xl border border-(--ui-border) bg-(--ui-bg) shadow-xl shadow-black/5 overflow-hidden">
              <!-- Window bar -->
              <div class="flex items-center gap-1.5 px-4 py-3 bg-(--ui-bg-elevated) border-b border-(--ui-border)">
                <span class="w-2.5 h-2.5 rounded-full bg-rose-400/70" />
                <span class="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
                <span class="flex-1 text-center text-[11px] text-(--ui-text-dimmed)">
                  {{ activeCase.mockup.title }}
                </span>
              </div>

              <div class="p-5 space-y-4">
                <!-- Input -->
                <div>
                  <p class="text-[10px] text-(--ui-text-dimmed) font-bold uppercase tracking-widest mb-2">
                    Input
                  </p>
                  <div class="font-mono text-xs text-(--ui-text-muted) bg-(--ui-bg-elevated) border border-(--ui-border) rounded-lg px-3 py-2.5 whitespace-pre-line leading-relaxed">
                    {{ activeCase.mockup.input }}
                  </div>
                </div>

                <!-- Arrow -->
                <div class="flex items-center justify-center">
                  <div
                    class="flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold"
                    :class="[activeCase.mockup.badgeColor, colorBorderMap[activeCase.color]]"
                  >
                    <UIcon
                      name="i-lucide-sparkles"
                      class="w-3 h-3"
                    />
                    {{ activeCase.mockup.badge }}
                  </div>
                </div>

                <!-- Output -->
                <div>
                  <p class="text-[10px] text-(--ui-text-dimmed) font-bold uppercase tracking-widest mb-2">
                    Output
                  </p>
                  <div
                    class="font-mono text-xs font-semibold bg-(--ui-bg-elevated) border rounded-lg px-3 py-2.5 leading-relaxed"
                    :class="[colorBorderMap[activeCase.color], colorMap[activeCase.color]]"
                  >
                    {{ activeCase.mockup.result }}
                  </div>
                </div>

                <!-- Saving pill -->
                <div class="flex items-center gap-2 text-xs text-success bg-success/8 border border-success/15 px-3 py-2 rounded-lg">
                  <UIcon
                    name="i-lucide-piggy-bank"
                    class="w-3.5 h-3.5 flex-shrink-0"
                  />
                  {{ activeCase.mockup.saving }}
                </div>
              </div>
            </div>

            <!-- Quote card -->
            <div class="p-5 rounded-2xl border border-(--ui-border) bg-(--ui-bg-elevated)">
              <div class="flex gap-1 mb-3">
                <UIcon
                  v-for="i in 5"
                  :key="i"
                  name="i-lucide-star"
                  class="w-3.5 h-3.5 text-warning fill-warning"
                />
              </div>
              <p class="text-sm text-(--ui-text) italic leading-relaxed mb-4">
                "{{ activeCase.quote.text }}"
              </p>
              <div class="flex items-center gap-3 pt-3 border-t border-(--ui-border)">
                <div
                  class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  :class="[colorBgMap[activeCase.color], colorMap[activeCase.color]]"
                >
                  {{ activeCase.quote.avatar }}
                </div>
                <div>
                  <div class="text-sm font-bold text-(--ui-text-highlighted)">
                    {{ activeCase.quote.name }}
                  </div>
                  <div class="text-xs text-(--ui-text-muted)">
                    {{ activeCase.quote.role }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </section>
</template>

<style scoped>
.case-slide-enter-active,
.case-slide-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.case-slide-enter-from { opacity: 0; transform: translateY(10px);  }
.case-slide-leave-to   { opacity: 0; transform: translateY(-10px); }
</style>
