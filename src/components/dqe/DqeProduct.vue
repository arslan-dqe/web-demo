<!-- src/components/dqe/DqeProduct.vue -->
<script setup lang="ts">
import { ref, computed } from 'vue'

const emit = defineEmits<{ cta: [] }>()

type ProductTab = 'address' | 'email' | 'phone'
const active = ref<ProductTab>('address')

const tabs = [
  { id: 'address' as ProductTab, label: 'Address Validation', icon: 'i-lucide-map-pin',   color: 'blue'   },
  { id: 'email'   as ProductTab, label: 'Email Validation',   icon: 'i-lucide-mail',       color: 'teal'   },
  { id: 'phone'   as ProductTab, label: 'Phone Validation',   icon: 'i-lucide-phone',      color: 'violet' },
]

const activeTabColor: Record<ProductTab, string> = {
  address: 'border-blue-500   bg-blue-500/5   text-blue-600   dark:text-blue-400',
  email:   'border-teal-500   bg-teal-500/5   text-teal-600   dark:text-teal-400',
  phone:   'border-violet-500 bg-violet-500/5 text-violet-600 dark:text-violet-400',
}

const products = {
  address: {
    color:    'blue',
    badge:    'USPS CASS Certified',
    badgeIcon:'i-lucide-award',
    headline: 'The most accurate US address validation.',
    desc:     'Powered by USPS CASS certification via our Melissa OEM partnership for batch, and DQE\'s own real-time engine for API. Get ZIP+4, delivery point validation, and geocodes in a single call.',
    features: [
      { icon: 'i-lucide-check-circle-2', label: 'USPS CASS-certified batch processing'    },
      { icon: 'i-lucide-check-circle-2', label: 'Real-time API · <150ms response'        },
      { icon: 'i-lucide-check-circle-2', label: 'ZIP+4, DPV, RDI, county append'          },
      { icon: 'i-lucide-check-circle-2', label: 'Standardize messy input automatically'   },
      { icon: 'i-lucide-check-circle-2', label: 'CSV batch upload + API access'           },
      { icon: 'i-lucide-check-circle-2', label: 'International addresses'       },
    ],
    certBadges: [
      { label: 'USPS CASS',   icon: 'i-lucide-award'        },
      { label: 'NCOA Link',   icon: 'i-lucide-refresh-cw'   },
      { label: 'DPV Certified', icon: 'i-lucide-shield-check' },
    ],
    mockup: {
      input:  '350 fifth ave new york ny',
      output: {
        'Standardized':   '350 5TH AVE, NEW YORK, NY 10118-0110',
        'DPV Status':     'Confirmed ✓',
        'ZIP+4':          '10118-0110',
        'County':         'New York County',
        'Deliverability': 'Deliverable',
        'Record Type':    'High-Rise',
        'Geocode':        '40.7484° N, 73.9967° W',
        'RDI':            'Commercial',
      },
      status: { label: 'Deliverable', color: 'text-success bg-success/10 border-success/20' },
    },
  },
  email: {
    color:    'teal',
    badge:    'Real-Time SMTP Verification',
    badgeIcon:'i-lucide-zap',
    headline: 'Stop wasting budget on emails that bounce.',
    desc:     'DQE\'s email validation goes beyond format checks. We verify MX records, run SMTP handshakes, detect disposable domains, and score risk so you only send to real inboxes.',
    features: [
      { icon: 'i-lucide-check-circle-2', label: 'Syntax + format validation'              },
      { icon: 'i-lucide-check-circle-2', label: 'MX record + SMTP handshake check'        },
      { icon: 'i-lucide-check-circle-2', label: 'Disposable / temporary email detection'  },
      { icon: 'i-lucide-check-circle-2', label: 'Role-based address detection (admin@)'   },
      { icon: 'i-lucide-check-circle-2', label: 'Deliverability risk scoring (Low/Med/High)' },
      { icon: 'i-lucide-check-circle-2', label: 'Bulk list cleaning via CSV upload'       },
    ],
    certBadges: [
      { label: 'SMTP Verified', icon: 'i-lucide-server'       },
      { label: 'Anti-Spam',     icon: 'i-lucide-shield-check' },
      { label: 'GDPR Safe',     icon: 'i-lucide-lock'         },
    ],
    mockup: {
      input:  'john.doe@gmial.com',
      output: {
        'Original':      'john.doe@gmial.com',
        'Suggestion':    'john.doe@gmail.com ✓',
        'Format':        'Valid',
        'MX Records':    'Found ✓',
        'SMTP Check':    'Passed ✓',
        'Disposable':    'No',
        'Role-based':    'No',
        'Risk Score':    'Low',
      },
      status: { label: 'Deliverable', color: 'text-success bg-success/10 border-success/20' },
    },
  },
  phone: {
    color:    'violet',
    badge:    'TCPA Compliance Ready',
    badgeIcon:'i-lucide-shield-check',
    headline: 'Know who you\'re calling before you dial.',
    desc:     'Validate and enrich every phone number in real time. Identify line type, carrier, and active status — so your sales team only calls real, reachable numbers and stays TCPA compliant.',
    features: [
      { icon: 'i-lucide-check-circle-2', label: 'E.164 format normalization'               },
      { icon: 'i-lucide-check-circle-2', label: 'Line type: mobile, landline, VoIP, toll-free' },
      { icon: 'i-lucide-check-circle-2', label: 'Carrier identification (Verizon, AT&T…)'  },
      { icon: 'i-lucide-check-circle-2', label: 'Active / disconnected / ported status'    },
      { icon: 'i-lucide-check-circle-2', label: 'TCPA compliance flag'                     },
      { icon: 'i-lucide-check-circle-2', label: 'Geographic location append'               },
    ],
    certBadges: [
      { label: 'TCPA Ready',  icon: 'i-lucide-scale'        },
      { label: 'Real-Time',   icon: 'i-lucide-zap'          },
      { label: 'All Carriers',icon: 'i-lucide-signal'       },
    ],
    mockup: {
      input:  '+1 212-555-0101',
      output: {
        'Formatted':  '+1 (212) 555-0101',
        'Line Type':  'Landline',
        'Carrier':    'Verizon Communications',
        'Status':     'Active ✓',
        'Location':   'New York, NY',
        'TCPA Safe':  'Yes ✓',
        'Ported':     'No',
        'Country':    'United States',
      },
      status: { label: 'Valid · Active', color: 'text-success bg-success/10 border-success/20' },
    },
  },
}

const activeProduct = computed(() => products[active.value])

const colorTextMap: Record<string, string> = {
  blue:   'text-blue-500',
  teal:   'text-teal-500',
  violet: 'text-violet-500',
}
const colorBgMap: Record<string, string> = {
  blue:   'bg-blue-500/10',
  teal:   'bg-teal-500/10',
  violet: 'bg-violet-500/10',
}
const colorBorderMap: Record<string, string> = {
  blue:   'border-blue-500/30',
  teal:   'border-teal-500/30',
  violet: 'border-violet-500/30',
}
</script>

<template>
  <section
    id="product"
    class="py-28 px-4 relative overflow-hidden bg-(--ui-bg)"
  >
    <!-- Subtle background -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-500/5 rounded-full blur-3xl" />
    </div>

    <div class="relative z-10 max-w-6xl mx-auto">
      <!-- ── Header ───────────────────────────────────────────────────── -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="text-center mb-14"
      >
        <UBadge
          color="primary"
          variant="soft"
          label="The Platform"
          size="md"
          class="mb-4"
        />
        <h2 class="text-4xl md:text-5xl font-extrabold text-(--ui-text-highlighted) mb-3 leading-tight">
          Three validations.
          <span class="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent"> One platform.</span>
        </h2>
        <h3 class="text-base font-medium text-(--ui-text-muted) mb-4">
          Can I validate US addresses, emails, and phones in a single API call?
        </h3>
        <p class="text-(--ui-text-muted) text-lg max-w-2xl mx-auto">
          Stop duct-taping three separate tools together.
          DQE gives you address, email, and phone validation in a single API call.
        </p>
      </div>

      <!-- ── Tab selector ──────────────────────────────────────────────── -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 16 }"
        :visible="{ opacity: 1, y: 0, transition: { delay: 100, duration: 500 } }"
        class="flex flex-col sm:flex-row gap-3 mb-10 max-w-2xl mx-auto"
      >
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="flex-1 flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl border-2 font-semibold text-sm transition-all duration-300"
          :class="active === tab.id
            ? `${activeTabColor[tab.id]} shadow-md`
            : 'border-(--ui-border) text-(--ui-text-muted) hover:border-(--ui-border-accented) hover:text-(--ui-text) bg-(--ui-bg)'"
          @click="active = tab.id"
        >
          <UIcon
            :name="tab.icon"
            class="w-4 h-4"
          />
          {{ tab.label }}
        </button>
      </div>

      <!-- ── Main panel ────────────────────────────────────────────────── -->
      <Transition
        name="product-tab"
        mode="out-in"
      >
        <div
          :key="active"
          class="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start"
        >
          <!-- Left: Features ────────────────────────────────────────── -->
          <div
            v-motion
            :initial="{ opacity: 0, x: -24 }"
            :enter="{ opacity: 1, x: 0, transition: { duration: 500 } }"
          >
            <!-- Badge -->
            <div
              class="inline-flex items-center gap-2 border text-xs font-bold px-3 py-1.5 rounded-full mb-5"
              :class="[colorBgMap[activeProduct.color], colorTextMap[activeProduct.color], colorBorderMap[activeProduct.color]]"
            >
              <UIcon
                :name="activeProduct.badgeIcon"
                class="w-3.5 h-3.5"
              />
              {{ activeProduct.badge }}
            </div>

            <h3 class="text-2xl md:text-3xl font-extrabold text-(--ui-text-highlighted) mb-4 leading-tight">
              {{ activeProduct.headline }}
            </h3>

            <p class="text-(--ui-text-muted) leading-relaxed mb-8">
              {{ activeProduct.desc }}
            </p>

            <!-- Feature list -->
            <ul class="space-y-3 mb-8">
              <li
                v-for="(feat, i) in activeProduct.features"
                :key="feat.label"
                v-motion
                :initial="{ opacity: 0, x: -16 }"
                :enter="{ opacity: 1, x: 0, transition: { delay: i * 60, duration: 400 } }"
                class="flex items-center gap-3 text-sm text-(--ui-text)"
              >
                <div
                  class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  :class="colorBgMap[activeProduct.color]"
                >
                  <UIcon
                    name="i-lucide-check"
                    class="w-3 h-3"
                    :class="colorTextMap[activeProduct.color]"
                  />
                </div>
                {{ feat.label }}
              </li>
            </ul>

            <!-- Cert badges -->
            <div class="flex flex-wrap gap-2 mb-8">
              <div
                v-for="cert in activeProduct.certBadges"
                :key="cert.label"
                class="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border bg-(--ui-bg-elevated)"
                :class="[colorBorderMap[activeProduct.color], colorTextMap[activeProduct.color]]"
              >
                <UIcon
                  :name="cert.icon"
                  class="w-3 h-3"
                />
                {{ cert.label }}
              </div>
            </div>

            <!-- CTAs -->
            <div class="flex flex-wrap items-center gap-3">
              <UButton
                label="Try it free"
                trailing-icon="i-lucide-arrow-right"
                class="shadow-md"
                @click="emit('cta')"
              />
              <UButton
                variant="ghost"
                label="View API docs"
                leading-icon="i-lucide-code-2"
              />
            </div>
          </div>

          <!-- Right: Mockup ──────────────────────────────────────────── -->
          <div
            v-motion
            :initial="{ opacity: 0, x: 24 }"
            :enter="{ opacity: 1, x: 0, transition: { duration: 500 } }"
          >
            <div class="rounded-2xl border border-(--ui-border) bg-(--ui-bg) shadow-2xl shadow-black/5 overflow-hidden">
              <!-- Window bar -->
              <div class="flex items-center gap-1.5 px-4 py-3 bg-(--ui-bg-elevated) border-b border-(--ui-border)">
                <span class="w-2.5 h-2.5 rounded-full bg-rose-400/70" />
                <span class="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
                <span class="flex-1 text-center text-[11px] text-(--ui-text-dimmed)">
                  app.dqe.io — {{ tabs.find(t => t.id === active)?.label }}
                </span>
              </div>

              <!-- Input row -->
              <div class="p-4 border-b border-(--ui-border) bg-(--ui-bg-elevated)">
                <div class="text-[10px] text-(--ui-text-dimmed) font-bold uppercase tracking-widest mb-2">
                  Input
                </div>
                <div
                  class="flex items-center gap-2 px-3 py-2.5 rounded-lg border font-mono text-sm text-(--ui-text)"
                  :class="[colorBorderMap[activeProduct.color], colorBgMap[activeProduct.color]]"
                >
                  <UIcon
                    :name="tabs.find(t => t.id === active)!.icon"
                    class="w-4 h-4 flex-shrink-0"
                    :class="colorTextMap[activeProduct.color]"
                  />
                  {{ activeProduct.mockup.input }}
                </div>
              </div>

              <!-- Status -->
              <div class="px-4 py-3 border-b border-(--ui-border) flex items-center gap-3 bg-(--ui-bg)">
                <div
                  class="flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full border"
                  :class="activeProduct.mockup.status.color"
                >
                  <UIcon
                    name="i-lucide-check-circle-2"
                    class="w-3.5 h-3.5"
                  />
                  {{ activeProduct.mockup.status.label }}
                </div>
                <div class="flex-1" />
                <div class="text-[10px] text-(--ui-text-dimmed) flex items-center gap-1">
                  <UIcon
                    name="i-lucide-zap"
                    class="w-3 h-3 text-warning"
                  />
                  &lt;150ms
                </div>
              </div>

              <!-- Output fields -->
              <div class="p-4">
                <div class="text-[10px] text-(--ui-text-dimmed) font-bold uppercase tracking-widest mb-3">
                  Output
                </div>
                <div class="space-y-0 rounded-xl border border-(--ui-border) overflow-hidden">
                  <div
                    v-for="([key, val], i) in Object.entries(activeProduct.mockup.output)"
                    :key="key"
                    class="flex items-center justify-between px-3 py-2.5 text-xs border-b border-(--ui-border) last:border-0 transition-colors duration-200"
                    :class="i % 2 === 0 ? 'bg-(--ui-bg)' : 'bg-(--ui-bg-elevated)'"
                  >
                    <span class="text-(--ui-text-muted) font-medium flex-shrink-0 w-28">{{ key }}</span>
                    <span
                      class="font-semibold text-right truncate ml-2"
                      :class="String(val).includes('✓')
                        ? 'text-success'
                        : 'text-(--ui-text-highlighted)'"
                    >{{ val }}</span>
                  </div>
                </div>
              </div>

              <!-- Footer actions -->
              <div class="px-4 pb-4 grid grid-cols-3 gap-2">
                <UButton
                  size="xs"
                  variant="soft"
                  label="Copy JSON"
                  leading-icon="i-lucide-copy"
                />
                <UButton
                  size="xs"
                  variant="soft"
                  label="API call"
                  leading-icon="i-lucide-code-2"
                />
                <UButton
                  size="xs"
                  variant="soft"
                  label="Download"
                  leading-icon="i-lucide-download"
                />
              </div>
            </div>

            <!-- Comparison nudge -->
            <div class="mt-4 p-4 rounded-xl border border-(--ui-border) bg-(--ui-bg-elevated) flex items-center gap-3">
              <div
                class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                :class="colorBgMap[activeProduct.color]"
              >
                <UIcon
                  name="i-lucide-swords"
                  class="w-4 h-4"
                  :class="colorTextMap[activeProduct.color]"
                />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-xs text-(--ui-text-muted)">
                  <span class="font-semibold text-(--ui-text)">Smarty</span> only does addresses.
                  DQE does all three in one call.
                </p>
              </div>
              <a
                href="/vs-smarty"
                class="text-xs text-primary font-semibold hover:underline whitespace-nowrap"
              >
                Compare →
              </a>
            </div>
          </div>
        </div>
      </Transition>

      <!-- ── Bottom — all-in-one proof ─────────────────────────────────── -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 24 }"
        :visible="{ opacity: 1, y: 0, transition: { delay: 200, duration: 600 } }"
        class="mt-20 rounded-2xl border border-(--ui-border) bg-(--ui-bg-elevated) p-6 md:p-8"
      >
        <div class="flex flex-col md:flex-row items-center gap-8">
          <!-- Left label -->
          <div class="flex-shrink-0 text-center md:text-left">
            <p class="text-xs text-(--ui-text-dimmed) font-bold uppercase tracking-widest mb-1">
              Single API call
            </p>
            <p class="text-2xl font-extrabold text-(--ui-text-highlighted)">
              3-in-1 response
            </p>
          </div>

          <USeparator
            orientation="vertical"
            class="hidden md:block h-16"
          />
          <USeparator class="md:hidden w-full" />

          <!-- Code snippet -->
          <div class="flex-1 w-full overflow-x-auto">
            <pre class="text-[11px] leading-relaxed text-(--ui-text-muted) font-mono"><code><span class="text-blue-400">POST</span> <span class="text-teal-400">https://api.dqe.io/v1/validate</span>

<span class="text-(--ui-text-dimmed)">{</span>
  <span class="text-blue-300">"address"</span><span class="text-(--ui-text-dimmed)">:</span> <span class="text-emerald-300">"350 5th Ave, New York NY"</span><span class="text-(--ui-text-dimmed)">,</span>
  <span class="text-blue-300">"email"</span><span class="text-(--ui-text-dimmed)">:</span>   <span class="text-emerald-300">"john@company.com"</span><span class="text-(--ui-text-dimmed)">,</span>
  <span class="text-blue-300">"phone"</span><span class="text-(--ui-text-dimmed)">:</span>   <span class="text-emerald-300">"+1 212 555 0101"</span>
<span class="text-(--ui-text-dimmed)">}</span>

<span class="text-white/20">// ← Returns address + email + phone results</span>
<span class="text-white/20">//   in one round trip. &lt;80ms.</span></code></pre>
          </div>

          <USeparator
            orientation="vertical"
            class="hidden md:block h-16"
          />

          <!-- Right stat -->
          <div class="flex-shrink-0 text-center">
            <p class="text-3xl font-extrabold text-(--ui-text-highlighted)">
              3×
            </p>
            <p class="text-xs text-(--ui-text-muted) mt-1">
              fewer API vendors<br>to manage
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.product-tab-enter-active,
.product-tab-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.product-tab-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.product-tab-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
