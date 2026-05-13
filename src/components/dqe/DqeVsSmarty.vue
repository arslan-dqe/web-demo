<!-- src/components/dqe/DqeVsSmarty.vue -->
<script setup lang="ts">
const emit = defineEmits<{ cta: [] }>()

const categories = [
  {
    label: 'Core Validation',
    rows: [
      {
        feature:  'Address Validation',
        dqe:      { value: true,  note: 'USPS CASS Certified'     },
        smarty:   { value: true,  note: 'USPS CASS Certified'     },
        winner:   null,
      },
      {
        feature:  'Email Validation',
        dqe:      { value: true,  note: 'SMTP + MX + Risk score'  },
        smarty:   { value: false, note: 'Not available'           },
        winner:   'dqe',
      },
      {
        feature:  'Phone Validation',
        dqe:      { value: true,  note: 'Carrier + TCPA + Status' },
        smarty:   { value: false, note: 'Not available'           },
        winner:   'dqe',
      },
      {
        feature:  'Single API call (all 3)',
        dqe:      { value: true,  note: 'One request, one bill'   },
        smarty:   { value: false, note: 'Address only'            },
        winner:   'dqe',
      },
    ],
  },
  {
    label: 'Developer Experience',
    rows: [
      {
        feature:  'REST API access',
        dqe:      { value: true,  note: '<150ms response time' },   // ← fixed
        smarty:   { value: true,  note: 'Similar latency'      },
        winner:   null,
      },
      {
        feature:  'Self-serve signup',
        dqe:      { value: true,  note: '5-minute setup'          },
        smarty:   { value: true,  note: '5-minute setup'          },
        winner:   null,
      },
      {
        feature:  'CSV batch upload',
        dqe:      { value: true,  note: 'Unlimited file size'     },
        smarty:   { value: true,  note: 'Up to 1M rows'          },
        winner:   null,
      },
      {
        feature:  'LLM / AI integration guides',
        dqe:      { value: true,  note: 'OpenAI, LangChain docs'  },
        smarty:   { value: false, note: 'Not documented'          },
        winner:   'dqe',
      },
    ],
  },
  {
    label: 'Pricing & Trial',
    rows: [
      {
        feature:  'Free trial',
        dqe:      { value: true,  note: '100 free validations'    },
        smarty:   { value: true,  note: '250 free lookups'        },
        winner:   null,
      },
      {
        feature:  'Credit card billing',
        dqe:      { value: true,  note: 'Stripe, instant access'  },
        smarty:   { value: true,  note: 'Stripe'                  },
        winner:   null,
      },
      {
        feature:  'No SFTP / no sales cycle',
        dqe:      { value: true,  note: '100% self-serve'         },
        smarty:   { value: true,  note: '100% self-serve'         },
        winner:   null,
      },
      {
        feature:  'Volume discounts',
        dqe:      { value: true,  note: 'From 10K validations/mo' },
        smarty:   { value: true,  note: 'Enterprise pricing'      },
        winner:   null,
      },
    ],
  },
  {
    label: 'Advanced Features',
    rows: [
      {
        feature:  'CRM integrations',
        dqe:      { value: true,  note: 'Salesforce, HubSpot' },
        smarty:   { value: false, note: 'Not available'                  },
        winner:   'dqe',
      },
      {
        feature:  'Deduplication (Unify)',
        dqe:      { value: true,  note: 'AI-powered'   },
        smarty:   { value: false, note: 'Not available' },
        winner:   null,
      },
      {
        feature:  'International addresses',
        dqe:      { value: null,  note: 'Phase 2 roadmap'         },
        smarty:   { value: true,  note: '240+ countries'          },
        winner:   'smarty',
      },
      {
        feature:  'USPS NCOA (movers update)',
        dqe:      { value: true,  note: 'Via Melissa OEM'         },
        smarty:   { value: false, note: 'Not available'           },
        winner:   'dqe',
      },
    ],
  },
]

// Count wins
const dqeWins    = categories.flatMap(c => c.rows).filter(r => r.winner === 'dqe').length
const smartyWins = categories.flatMap(c => c.rows).filter(r => r.winner === 'smarty').length

const switchers = [
  {
    name:    'Marcus T.',
    role:    'Head of Data Engineering',
    company: 'ShipRight Logistics',
    avatar:  'MT',
    quote:   'We were paying Smarty for addresses AND two other vendors for email/phone. DQE replaced all three in one afternoon. Our API bill dropped 40%.',
  },
  {
    name:    'Priya K.',
    role:    'VP Revenue Operations',
    company: 'RetailEdge Inc.',
    avatar:  'PK',
    quote:   'The self-serve setup was the same speed as Smarty but we got email validation out of the box. For us that was the deal.',
  },
]
</script>

<template>
  <section
    id="vs-smarty"
    class="py-28 px-4 relative overflow-hidden bg-(--ui-bg-muted)"
  >
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
        <div class="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
          <UIcon
            name="i-lucide-swords"
            class="w-3.5 h-3.5"
          />
          DQE vs Smarty
        </div>
        <h2 class="text-4xl md:text-5xl font-extrabold text-(--ui-text-highlighted) mb-3 leading-tight">
          Smarty does one thing.<br>
          <span class="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
            DQE does everything.
          </span>
        </h2>
        <h3 class="text-base font-medium text-(--ui-text-muted) mb-4">
          How does DQE compare to Smarty for US address validation?
        </h3>
        <p class="text-(--ui-text-muted) text-lg max-w-xl mx-auto">
          Same self-serve speed. Same credit card billing. But DQE adds
          email and phone validation so you can drop 2–3 vendors — including
          Smarty's ~$50/mo address-only plan — with one switch.
        </p>

        <!-- Win counters -->
        <div class="flex items-center justify-center gap-4 mt-8">
          <div class="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <UIcon
              name="i-lucide-shield-check"
              class="w-4 h-4 text-primary"
            />
            <span class="text-sm font-bold text-primary">DQE wins {{ dqeWins }} categories</span>
          </div>
          <div class="flex items-center gap-2 px-4 py-2 rounded-full bg-(--ui-bg-elevated) border border-(--ui-border)">
            <span class="text-sm font-medium text-(--ui-text-muted)">Smarty wins {{ smartyWins }}</span>
          </div>
        </div>
      </div>

      <!-- ── Comparison table ──────────────────────────────────────────── -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible="{ opacity: 1, y: 0, transition: { delay: 100, duration: 600 } }"
        class="rounded-2xl border border-(--ui-border) bg-(--ui-bg) overflow-hidden shadow-xl shadow-black/5 mb-10"
      >
        <!-- Table header -->
        <div class="grid grid-cols-[1fr_200px_200px] border-b border-(--ui-border) bg-(--ui-bg-elevated)">
          <div class="px-6 py-4 text-sm font-bold text-(--ui-text-dimmed) uppercase tracking-wider">
            Feature
          </div>
          <!-- DQE column header -->
          <div class="px-6 py-4 border-l border-(--ui-border) bg-primary/5 text-center">
            <div class="flex items-center justify-center gap-2">
              <div class="w-6 h-6 rounded-md bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center">
                <UIcon
                  name="i-lucide-shield-check"
                  class="w-3.5 h-3.5 text-white"
                />
              </div>
              <span class="font-bold text-primary text-sm">DQE</span>
            </div>
            <div class="text-[10px] text-primary/60 mt-0.5 font-medium">
              All-in-One
            </div>
          </div>
          <!-- Smarty column header -->
          <div class="px-6 py-4 border-l border-(--ui-border) text-center">
            <span class="font-bold text-(--ui-text-muted) text-sm">Smarty</span>
            <div class="text-[10px] text-(--ui-text-dimmed) mt-0.5">
              Address only
            </div>
          </div>
        </div>

        <!-- Category groups -->
        <div
          v-for="(cat, ci) in categories"
          :key="cat.label"
          :class="ci < categories.length - 1 ? 'border-b border-(--ui-border)' : ''"
        >
          <!-- Category label -->
          <div class="grid grid-cols-[1fr_200px_200px] bg-(--ui-bg-elevated)">
            <div class="px-6 py-2.5 col-span-3">
              <span class="text-xs font-bold text-(--ui-text-dimmed) uppercase tracking-widest">
                {{ cat.label }}
              </span>
            </div>
          </div>

          <!-- Rows -->
          <div
            v-for="row in cat.rows"
            :key="row.feature"
            class="grid grid-cols-[1fr_200px_200px] border-t border-(--ui-border) group hover:bg-(--ui-bg-elevated) transition-colors duration-150"
          >
            <!-- Feature name -->
            <div class="px-6 py-4 flex items-center gap-3">
              <span class="text-sm font-medium text-(--ui-text)">{{ row.feature }}</span>
              <UBadge
                v-if="row.winner === 'dqe'"
                size="xs"
                color="primary"
                variant="soft"
                label="DQE wins"
                class="flex-shrink-0"
              />
              <UBadge
                v-else-if="row.winner === 'smarty'"
                size="xs"
                color="neutral"
                variant="soft"
                label="Smarty wins"
                class="flex-shrink-0"
              />
            </div>

            <!-- DQE cell -->
            <div class="px-6 py-4 border-l border-(--ui-border) bg-primary/[0.02] flex flex-col items-center justify-center text-center gap-1">
              <template v-if="row.dqe.value === true">
                <div class="w-6 h-6 rounded-full bg-success/15 flex items-center justify-center">
                  <UIcon
                    name="i-lucide-check"
                    class="w-3.5 h-3.5 text-success"
                  />
                </div>
                <span class="text-[11px] text-(--ui-text-muted) leading-tight">{{ row.dqe.note }}</span>
              </template>
              <template v-else-if="row.dqe.value === false">
                <div class="w-6 h-6 rounded-full bg-error/10 flex items-center justify-center">
                  <UIcon
                    name="i-lucide-x"
                    class="w-3.5 h-3.5 text-error"
                  />
                </div>
              </template>
              <template v-else>
                <div class="w-6 h-6 rounded-full bg-warning/10 flex items-center justify-center">
                  <UIcon
                    name="i-lucide-clock"
                    class="w-3.5 h-3.5 text-warning"
                  />
                </div>
                <span class="text-[11px] text-warning leading-tight">{{ row.dqe.note }}</span>
              </template>
            </div>

            <!-- Smarty cell -->
            <div class="px-6 py-4 border-l border-(--ui-border) flex flex-col items-center justify-center text-center gap-1">
              <template v-if="row.smarty.value === true">
                <div class="w-6 h-6 rounded-full bg-success/15 flex items-center justify-center">
                  <UIcon
                    name="i-lucide-check"
                    class="w-3.5 h-3.5 text-success"
                  />
                </div>
                <span class="text-[11px] text-(--ui-text-muted) leading-tight">{{ row.smarty.note }}</span>
              </template>
              <template v-else>
                <div class="w-6 h-6 rounded-full bg-(--ui-bg-accented) flex items-center justify-center">
                  <UIcon
                    name="i-lucide-x"
                    class="w-3.5 h-3.5 text-(--ui-text-dimmed)"
                  />
                </div>
                <span class="text-[11px] text-(--ui-text-dimmed) leading-tight">{{ row.smarty.note }}</span>
              </template>
            </div>
          </div>
        </div>

        <!-- Table footer CTA -->
        <div class="grid grid-cols-[1fr_200px_200px] border-t-2 border-(--ui-border) bg-(--ui-bg-elevated)">
          <div class="px-6 py-5">
            <p class="text-sm font-semibold text-(--ui-text-highlighted)">
              Ready to switch?
            </p>
            <p class="text-xs text-(--ui-text-muted)">
              Import your Smarty API key — we'll handle the migration.
            </p>
          </div>
          <div class="px-4 py-5 border-l border-(--ui-border) bg-primary/5 flex items-center justify-center">
            <UButton
              size="sm"
              label="Start free"
              trailing-icon="i-lucide-arrow-right"
              class="w-full shadow-md shadow-primary/20"
              @click="emit('cta')"
            />
          </div>
          <div class="px-4 py-5 border-l border-(--ui-border) flex items-center justify-center">
            <UButton
              size="sm"
              variant="ghost"
              label="smarty.com"
              trailing-icon="i-lucide-external-link"
              class="w-full text-(--ui-text-dimmed)"
            />
          </div>
        </div>
      </div>

      <!-- ── Switcher testimonials ──────────────────────────────────────── -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 24 }"
        :visible="{ opacity: 1, y: 0, transition: { delay: 200, duration: 600 } }"
        class="grid md:grid-cols-2 gap-5 mb-12"
      >
        <div
          v-for="s in switchers"
          :key="s.name"
          class="p-6 rounded-2xl border border-(--ui-border) bg-(--ui-bg) hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
        >
          <!-- Stars -->
          <div class="flex gap-1 mb-4">
            <UIcon
              v-for="i in 5"
              :key="i"
              name="i-lucide-star"
              class="w-3.5 h-3.5 text-warning fill-warning"
            />
          </div>

          <p class="text-sm text-(--ui-text) leading-relaxed italic mb-5">
            "{{ s.quote }}"
          </p>

          <div class="flex items-center gap-3 pt-4 border-t border-(--ui-border)">
            <div class="w-9 h-9 rounded-full bg-primary/15 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">
              {{ s.avatar }}
            </div>
            <div>
              <div class="text-sm font-bold text-(--ui-text-highlighted)">
                {{ s.name }}
              </div>
              <div class="text-xs text-(--ui-text-muted)">
                {{ s.role }} · {{ s.company }}
              </div>
            </div>
            <div class="ml-auto flex items-center gap-1.5 text-xs text-success bg-success/10 px-2.5 py-1 rounded-full font-semibold flex-shrink-0">
              <UIcon
                name="i-lucide-arrow-right-left"
                class="w-3 h-3"
              />
              Switched from Smarty
            </div>
          </div>
        </div>
      </div>

      <!-- ── Migration promise ──────────────────────────────────────────── -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 16 }"
        :visible="{ opacity: 1, y: 0, transition: { delay: 300, duration: 500 } }"
        class="rounded-2xl border border-primary/20 bg-primary/5 p-6 flex flex-col md:flex-row items-center gap-6"
      >
        <div class="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
          <UIcon
            name="i-lucide-arrow-right-left"
            class="w-6 h-6 text-primary"
          />
        </div>
        <div class="flex-1 text-center md:text-left">
          <h4 class="font-extrabold text-(--ui-text-highlighted) mb-1">
            Switching from Smarty takes under 10 minutes.
          </h4>
          <p class="text-sm text-(--ui-text-muted)">
            Our API is structurally compatible with Smarty's address endpoint.
            Swap the base URL, add your DQE key, and you're live.
            No data re-mapping required.
          </p>
        </div>
        <div class="flex flex-col sm:flex-row gap-2 flex-shrink-0">
          <UButton
            label="Migration guide"
            variant="soft"
            leading-icon="i-lucide-book-open"
          />
          <UButton
            label="Start free"
            trailing-icon="i-lucide-arrow-right"
            class="shadow-md shadow-primary/20"
            @click="emit('cta')"
          />
        </div>
      </div>
    </div>
  </section>
</template>
