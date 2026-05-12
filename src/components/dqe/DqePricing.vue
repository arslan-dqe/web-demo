<script setup lang="ts">
import { ref, computed } from 'vue'

// ── Credit pack model for Verify ──────────────────────────────────────────
const creditPacks = [
  { credits: 1000,   price: 19,   perK: 19.00, popular: false },
  { credits: 5000,   price: 79,   perK: 15.80, popular: false },
  { credits: 25000,  price: 299,  perK: 11.96, popular: true  },
  { credits: 100000, price: 899,  perK: 8.99,  popular: false },
  { credits: 500000, price: 3499, perK: 6.99,  popular: false },
]

const selectedPack = ref(creditPacks[2])
const annual       = ref(false)

// Advanced annual saving
const advancedMonthly = 399
const advancedAnnual  = 319

const plans = [
  {
    id:          'validate',
    name:        'Validate',
    icon:        'i-lucide-sprout',
    tag:         'Free forever',
    tagColor:    'bg-success/10 text-success border-success/20',
    price:       '$0',
    priceSub:    '',
    desc:        'Try DQE instantly. 100 real-time validations across Address, Email, and Phone — no card, no commitment.',
    cta:         'Validate 100 Records Free',
    ctaIcon:     'i-lucide-arrow-right',
    ctaVariant:  'soft' as const,
    popular:     false,
    highlight:   false,
    validations: '100 validations',
    valNote:     'one-time · all 3 types',
    features: [
      { label: 'Address + Email + Phone',      included: true  },
      { label: '100 total validations',         included: true  },
      { label: 'REST API access',               included: true  },
      { label: 'CSV upload',                    included: true  },
      { label: 'JSON + CSV results download',   included: true  },
      { label: 'No credit card required',       included: true  },
      { label: 'Volume credit packs',           included: false },
      { label: 'Webhook support',               included: false },
      { label: 'CRM integrations',              included: false },
    ],
  },
  {
    id:          'verify',
    name:        'Verify',
    icon:        'i-lucide-shield-check',
    tag:         'Credit packs',
    tagColor:    'bg-primary/10 text-primary border-primary/20',
    price:       'Pay as you go',
    priceSub:    'buy credits, use anytime',
    desc:        'Volume credit packs for teams who need reliable Address, Email, and Phone validation at scale. Credits never expire.',
    cta:         'Buy credit pack',
    ctaIcon:     'i-lucide-arrow-right',
    ctaVariant:  'solid' as const,
    popular:     true,
    highlight:   true,
    validations: 'From $19',
    valNote:     'per 1,000 credits',
    features: [
      { label: 'Everything in Validate',        included: true  },
      { label: 'Credits never expire',          included: true  },
      { label: 'Full REST API + CSV batch',     included: true  },
      { label: 'USPS CASS certified batch',     included: true  },
      { label: 'Webhook support',               included: true  },
      { label: 'Enriched data download',        included: true  },
      { label: 'Email + chat support',          included: true  },
      { label: 'CRM integrations',              included: false },
      { label: 'Deduplication (Unify)',         included: false },
    ],
  },
  {
    id:          'advanced',
    name:        'Advanced',
    icon:        'i-lucide-rocket',
    tag:         'Phase 2',
    tagColor:    'bg-violet-500/10 text-violet-500 border-violet-500/20',
    price:       `$${annual.value ? advancedAnnual : advancedMonthly}`,
    priceSub:    '/mo',
    desc:        'For RevOps teams ready to connect DQE directly to their CRM and deduplicate their existing database.',
    cta:         'Start free trial',
    ctaIcon:     'i-lucide-arrow-right',
    ctaVariant:  'outline' as const,
    popular:     false,
    highlight:   false,
    validations: '100,000 credits',
    valNote:     'per month included',
    features: [
      { label: 'Everything in Verify',          included: true  },
      { label: '100,000 credits / month',       included: true  },
      { label: 'Salesforce connector',          included: true, phase2: false },
      { label: 'HubSpot + Shopify connector',   included: true, phase2: false },
      { label: 'Dynamics 365 connector',        included: true, phase2: false },
      { label: 'Deduplication (Unify)',         included: true, phase2: false },
      { label: 'Custom matching rules',         included: true, phase2: false },
      { label: 'Audit trail + rollback',        included: true  },
      { label: 'Priority support + CSM',        included: true  },
    ],
  },
  {
    id:          'enterprise',
    name:        'Enterprise',
    icon:        'i-lucide-building-2',
    tag:         'Sales-assisted',
    tagColor:    'bg-(--ui-bg-accented) text-(--ui-text-muted) border-(--ui-border)',
    price:       'Custom',
    priceSub:    '',
    desc:        'Dedicated infrastructure, SSO, SLA guarantees, and a US-based account team for $500K+ volume deals.',
    cta:         'Talk to Rafael',
    ctaIcon:     'i-lucide-calendar',
    ctaVariant:  'outline' as const,
    popular:     false,
    highlight:   false,
    validations: 'Unlimited',
    valNote:     'custom volume pricing',
    features: [
      { label: 'Everything in Advanced',        included: true  },
      { label: 'Unlimited validations',         included: true  },
      { label: 'Custom AI model fine-tuning',   included: true  },
      { label: 'SOC 2 Type II + BAA',           included: true  },
      { label: 'SSO / SAML',                    included: true  },
      { label: 'US data residency guaranteed',  included: true  },
      { label: 'Dedicated US account team',     included: true  },
      { label: 'SLA guarantee',                 included: true  },
      { label: 'On-premise option',             included: true  },
    ],
  },
]

// Reactive Advanced price
const advancedPlan = computed(() => ({
  ...plans[2],
  price:    `$${annual.value ? advancedAnnual : advancedMonthly}`,
  saving:   annual.value ? `Save $${(advancedMonthly - advancedAnnual) * 12}/yr` : null,
}))

const displayPlans = computed(() => [
  plans[0],
  plans[1],
  advancedPlan.value,
  plans[3],
])

// ── Validation calculator ─────────────────────────────────────────────────
const recordCount = ref(25000)

const calcResults = computed(() => {
  const addr  = Math.round(recordCount.value * 0.95)
  const email = Math.round(recordCount.value * 0.88)
  const phone = Math.round(recordCount.value * 0.72)
  const total = addr + email + phone

  // Find best credit pack
  const pack = creditPacks.find(p => p.credits >= total) ?? creditPacks[creditPacks.length - 1]
  const costPerK = pack.perK.toFixed(2)

  // ROI estimate — address only: $1.47 per failed delivery saved
  const failedDeliveries = Math.round(recordCount.value * 0.07)
  const roiSaved = (failedDeliveries * 1.47).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

  return { addr, email, phone, total, pack, costPerK, failedDeliveries, roiSaved }
})

const emit = defineEmits<{ cta: [plan: string] }>()
</script>

<template>
  <section id="pricing" class="py-28 px-4 relative overflow-hidden bg-(--ui-bg)">

    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-500/5 rounded-full blur-3xl" />
    </div>

    <div class="relative z-10 max-w-6xl mx-auto">

      <!-- ── Header ───────────────────────────────────────────────────── -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="text-center mb-12"
      >
        <UBadge color="primary" variant="soft" label="Pricing" size="md" class="mb-4" />
        <h2 class="text-4xl md:text-5xl font-extrabold text-(--ui-text-highlighted) mb-3 leading-tight">
          Start free. Buy credits.<br/>Scale when ready.
        </h2>
        <h3 class="text-base font-medium text-(--ui-text-muted) mb-4">How much does address, email, and phone validation cost?</h3>
        <p class="text-(--ui-text-muted) text-lg max-w-lg mx-auto mb-8">
          No monthly commitment for validation.
          Buy credits when you need them — they never expire.
        </p>

        <!-- Annual toggle (Advanced only) -->
        <div class="inline-flex items-center gap-2 text-sm text-(--ui-text-muted)">
          <span>Advanced plan:</span>
          <div class="inline-flex items-center p-0.5 rounded-lg bg-(--ui-bg-elevated) border border-(--ui-border)">
            <button
              class="px-3 py-1.5 rounded-md text-xs font-semibold transition-all"
              :class="!annual ? 'bg-(--ui-bg) shadow-sm text-(--ui-text-highlighted)' : 'text-(--ui-text-muted)'"
              @click="annual = false"
            >Monthly</button>
            <button
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all"
              :class="annual ? 'bg-(--ui-bg) shadow-sm text-(--ui-text-highlighted)' : 'text-(--ui-text-muted)'"
              @click="annual = true"
            >
              Annual
              <span class="text-[10px] font-bold text-success bg-success/15 px-1.5 py-0.5 rounded-full">-20%</span>
            </button>
          </div>
        </div>
      </div>

      <!-- ── Plans ─────────────────────────────────────────────────────── -->
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div
          v-for="(plan, i) in displayPlans"
          :key="plan.id"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible="{ opacity: 1, y: 0, transition: { delay: i * 80, duration: 500 } }"
          class="relative flex flex-col rounded-2xl border transition-all duration-300"
          :class="plan.highlight
            ? 'border-primary/50 bg-gradient-to-b from-primary/5 to-secondary/5 shadow-2xl shadow-primary/15 scale-[1.03] z-10'
            : 'border-(--ui-border) bg-(--ui-bg) hover:border-primary/20 hover:shadow-lg'"
        >
          <!-- Popular badge -->
          <div v-if="plan.popular" class="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <UBadge color="primary" label="Most popular" size="sm" class="shadow-lg shadow-primary/25 px-4" />
          </div>

          <div class="p-5 flex-1 flex flex-col">

            <!-- Header -->
            <div class="mb-5">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-2">
                  <div
                    class="w-7 h-7 rounded-lg flex items-center justify-center"
                    :class="plan.highlight ? 'bg-primary/15' : 'bg-(--ui-bg-elevated)'"
                  >
                    <UIcon
                      :name="plan.icon"
                      class="w-3.5 h-3.5"
                      :class="plan.highlight ? 'text-primary' : 'text-(--ui-text-muted)'"
                    />
                  </div>
                  <span class="font-extrabold text-(--ui-text-highlighted)">{{ plan.name }}</span>
                </div>
                <!-- Phase / tier tag -->
                <span
                  class="text-[10px] font-bold px-2 py-0.5 rounded-full border"
                  :class="plan.tagColor"
                >{{ plan.tag }}</span>
              </div>

              <p class="text-xs text-(--ui-text-muted) leading-relaxed mb-4">{{ plan.desc }}</p>

              <!-- Price -->
              <div class="mb-3">
                <div class="flex items-end gap-1">
                  <span class="text-2xl font-extrabold text-(--ui-text-highlighted) leading-none">
                    {{ plan.price }}
                  </span>
                  <span v-if="plan.priceSub" class="text-xs text-(--ui-text-muted) mb-0.5">
                    {{ plan.priceSub }}
                  </span>
                </div>
                <Transition name="fade">
                  <p
                    v-if="(plan as any).saving"
                    class="text-[11px] text-success font-semibold mt-0.5"
                  >{{ (plan as any).saving }}</p>
                </Transition>
              </div>

              <!-- Credit pack picker — Verify only -->
              <div v-if="plan.id === 'verify'" class="space-y-1.5 mb-3">
                <p class="text-[10px] font-bold text-(--ui-text-dimmed) uppercase tracking-wider">
                  Choose a credit pack
                </p>
                <div
                  v-for="pack in creditPacks"
                  :key="pack.credits"
                  class="flex items-center justify-between px-3 py-2 rounded-lg border cursor-pointer transition-all"
                  :class="selectedPack.credits === pack.credits
                    ? 'border-primary bg-primary/5'
                    : 'border-(--ui-border) hover:border-primary/30'"
                  @click="selectedPack = pack"
                >
                  <div class="flex items-center gap-2">
                    <div
                      class="w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                      :class="selectedPack.credits === pack.credits
                        ? 'border-primary bg-primary'
                        : 'border-(--ui-border)'"
                    >
                      <div v-if="selectedPack.credits === pack.credits" class="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                    <span class="text-xs font-semibold text-(--ui-text-highlighted)">
                      {{ pack.credits.toLocaleString() }} credits
                    </span>
                    <UBadge
                      v-if="pack.popular"
                      size="xs"
                      color="primary"
                      variant="soft"
                      label="Best value"
                    />
                  </div>
                  <div class="text-right">
                    <div class="text-xs font-extrabold text-(--ui-text-highlighted)">${{ pack.price }}</div>
                    <div class="text-[10px] text-(--ui-text-dimmed)">${{ pack.perK.toFixed(2) }}/K</div>
                  </div>
                </div>
              </div>

              <!-- Validation count badge (non-Verify) -->
              <div
                v-else
                class="flex items-center gap-2 p-2.5 rounded-xl bg-(--ui-bg-elevated) border border-(--ui-border)"
              >
                <UIcon name="i-lucide-check-circle-2" class="w-4 h-4 text-primary flex-shrink-0" />
                <div>
                  <span class="text-sm font-extrabold text-(--ui-text-highlighted)">{{ plan.validations }}</span>
                  <span class="text-xs text-(--ui-text-muted) ml-1">{{ plan.valNote }}</span>
                </div>
              </div>
            </div>

            <USeparator class="mb-4" />

            <!-- Features -->
            <ul class="space-y-2 flex-1 mb-5">
              <li
                v-for="feat in plan.features"
                :key="feat.label"
                class="flex items-center gap-2 text-xs"
                :class="feat.included ? 'text-(--ui-text)' : 'text-(--ui-text-dimmed)'"
              >
                <div
                  class="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                  :class="feat.included
                    ? plan.highlight ? 'bg-primary/15' : 'bg-success/10'
                    : 'bg-(--ui-bg-accented)'"
                >
                  <UIcon
                    :name="feat.included ? 'i-lucide-check' : 'i-lucide-minus'"
                    class="w-2.5 h-2.5"
                    :class="feat.included
                      ? plan.highlight ? 'text-primary' : 'text-success'
                      : 'text-(--ui-text-dimmed)'"
                  />
                </div>
                <span>{{ feat.label }}</span>
                <UBadge
                  v-if="feat.included && (feat as any).phase2"
                  size="xs"
                  color="neutral"
                  variant="soft"
                  label="Phase 2"
                  class="ml-auto flex-shrink-0"
                />
              </li>
            </ul>

            <!-- CTA -->
            <UButton
              block
              :variant="plan.ctaVariant"
              :label="plan.id === 'verify'
                ? `Buy ${selectedPack.credits.toLocaleString()} credits — $${selectedPack.price}`
                : plan.cta"
              :trailing-icon="plan.ctaIcon"
              :class="plan.highlight ? 'shadow-lg shadow-primary/25' : ''"
              @click="emit('cta', plan.id)"
            />

            <!-- Enterprise contact note -->
            <p
              v-if="plan.id === 'enterprise'"
              class="text-[10px] text-center text-(--ui-text-dimmed) mt-2"
            >
              Routes to Rafael Herrera · Director of Alliance Sales, NA
            </p>

          </div>
        </div>
      </div>

      <!-- ── Credit pack explainer ──────────────────────────────────────── -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 16 }"
        :visible="{ opacity: 1, y: 0, transition: { delay: 100, duration: 500 } }"
        class="grid sm:grid-cols-3 gap-3 mb-10"
      >
        <div
          v-for="point in [
            { icon: 'i-lucide-infinity',      title: 'Credits never expire',         desc: 'Buy once, use whenever. No monthly pressure to burn through credits.' },
            { icon: 'i-lucide-layers',         title: 'One credit = one validation',  desc: 'Address, Email, or Phone — each validation deducts one credit regardless of type.' },
            { icon: 'i-lucide-trending-down',  title: 'Price drops with volume',      desc: 'From $19/K down to $6.99/K at 500K credits. Upgrade to Advanced for monthly volume.' },
          ]"
          :key="point.title"
          class="flex gap-3 p-4 rounded-xl border border-(--ui-border) bg-(--ui-bg-elevated)"
        >
          <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <UIcon :name="point.icon" class="w-4 h-4 text-primary" />
          </div>
          <div>
            <p class="text-sm font-bold text-(--ui-text-highlighted) mb-1">{{ point.title }}</p>
            <p class="text-xs text-(--ui-text-muted) leading-relaxed">{{ point.desc }}</p>
          </div>
        </div>
      </div>

      <!-- ── ROI Calculator ─────────────────────────────────────────────── -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 24 }"
        :visible="{ opacity: 1, y: 0, transition: { delay: 200, duration: 600 } }"
        class="rounded-2xl border border-(--ui-border) bg-(--ui-bg-elevated) overflow-hidden mb-8"
      >
        <div class="px-6 py-4 border-b border-(--ui-border) flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <UIcon name="i-lucide-calculator" class="w-4 h-4 text-primary" />
          </div>
          <div>
            <p class="text-sm font-bold text-(--ui-text-highlighted)">ROI calculator</p>
            <p class="text-xs text-(--ui-text-muted)">
              Estimate your credit volume and savings from fewer failed deliveries
            </p>
          </div>
        </div>

        <div class="p-6 grid md:grid-cols-2 gap-8 items-center">

          <!-- Slider side -->
          <div>
            <div class="flex items-center justify-between mb-3">
              <label class="text-sm font-semibold text-(--ui-text-highlighted)">Records per month</label>
              <span class="text-sm font-extrabold text-primary">
                {{ recordCount.toLocaleString() }}
              </span>
            </div>
            <input
              v-model="recordCount"
              type="range"
              min="100"
              max="500000"
              step="100"
              class="w-full h-2 rounded-full appearance-none bg-(--ui-bg-accented) cursor-pointer accent-primary mb-4"
            />

            <!-- Breakdown -->
            <div class="space-y-2 p-4 rounded-xl bg-(--ui-bg) border border-(--ui-border)">
              <div
                v-for="(val, label) in {
                  'Address validations': calcResults.addr,
                  'Email validations':   calcResults.email,
                  'Phone validations':   calcResults.phone,
                }"
                :key="label"
                class="flex justify-between text-xs"
              >
                <span class="text-(--ui-text-muted)">{{ label }}</span>
                <span class="font-semibold text-(--ui-text-highlighted)">
                  ~{{ val.toLocaleString() }}
                </span>
              </div>
              <USeparator class="my-1" />
              <div class="flex justify-between text-sm font-bold">
                <span class="text-(--ui-text-highlighted)">Total credits needed</span>
                <span class="text-primary">~{{ calcResults.total.toLocaleString() }}</span>
              </div>
            </div>
          </div>

          <!-- Recommendation side -->
          <div class="space-y-3">

            <!-- Recommended pack -->
            <div class="p-4 rounded-xl bg-(--ui-bg) border border-primary/20 text-center">
              <p class="text-[10px] font-bold text-(--ui-text-dimmed) uppercase tracking-widest mb-2">
                Recommended pack
              </p>
              <div class="text-2xl font-extrabold text-(--ui-text-highlighted) mb-0.5">
                {{ calcResults.pack.credits.toLocaleString() }} credits
              </div>
              <div class="text-3xl font-black text-primary mb-1">
                ${{ calcResults.pack.price }}
              </div>
              <div class="text-xs text-(--ui-text-muted) mb-4">
                ${{ calcResults.costPerK }} per 1,000 validations
              </div>
              <UButton
                block
                size="sm"
                :label="`Buy ${calcResults.pack.credits.toLocaleString()} credits — $${calcResults.pack.price}`"
                trailing-icon="i-lucide-arrow-right"
                class="shadow-md shadow-primary/20"
                @click="emit('cta', 'verify')"
              />
            </div>

            <!-- ROI callout -->
            <div class="p-4 rounded-xl bg-success/5 border border-success/20 flex gap-3">
              <UIcon name="i-lucide-piggy-bank" class="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <div>
                <p class="text-sm font-bold text-success mb-1">
                  Estimated savings: {{ calcResults.roiSaved }}
                </p>
                <p class="text-xs text-(--ui-text-muted) leading-relaxed">
                  Based on {{ calcResults.failedDeliveries.toLocaleString() }} prevented failed deliveries
                  × $1.47 avg. logistics cost each.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- ── FAQ ───────────────────────────────────────────────────────── -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 16 }"
        :visible="{ opacity: 1, y: 0, transition: { delay: 300, duration: 500 } }"
        class="grid sm:grid-cols-3 gap-4 mb-8"
      >
        <div
          v-for="faq in [
            {
              q: 'Can I mix Address, Email and Phone?',
              a: 'Yes. One credit = one validation regardless of type. Mix and match freely within any pack.',
            },
            {
              q: 'Do credits expire?',
              a: 'Never. Verify credits roll over indefinitely. Buy a large pack now and use it at your own pace.',
            },
            {
              q: 'When does the sales team get involved?',
              a: 'Self-serve for all Validate and Verify usage. Rafael\'s team is notified automatically when accounts hit volume thresholds for Advanced qualification.',
            },
          ]"
          :key="faq.q"
          class="p-4 rounded-xl border border-(--ui-border) bg-(--ui-bg-elevated)"
        >
          <p class="text-sm font-bold text-(--ui-text-highlighted) mb-2">{{ faq.q }}</p>
          <p class="text-xs text-(--ui-text-muted) leading-relaxed">{{ faq.a }}</p>
        </div>
      </div>

      <!-- Footer note -->
      <div
        v-motion
        :initial="{ opacity: 0 }"
        :visible="{ opacity: 1, transition: { delay: 400, duration: 500 } }"
        class="text-center text-sm text-(--ui-text-muted) mb-4"
      >
        <a href="/faq" class="text-primary font-semibold hover:underline">
          See all FAQs →
        </a>
      </div>
      <div
        v-motion
        :initial="{ opacity: 0 }"
        :visible="{ opacity: 1, transition: { delay: 450, duration: 500 } }"
        class="text-center text-sm text-(--ui-text-muted)"
      >
        $500K+ volume or need on-premise deployment?
        <a href="/contact" class="text-primary font-semibold hover:underline ml-1">
          Talk to Rafael's team →
        </a>
      </div>

    </div>
  </section>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to       { opacity: 0; }
</style>
