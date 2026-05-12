<!-- src/components/dqe/DqeHero.vue -->
<script setup lang="ts">
import { ref, computed, defineEmits } from 'vue'

const emit = defineEmits<{
  primaryCta: []
}>()

// ── Tab system ────────────────────────────────────────────────────────────
type Tab = 'address' | 'email' | 'phone'
const activeTab = ref<Tab>('address')

const tabs: { id: Tab; label: string; icon: string; placeholder: string }[] = [
  { id: 'address', label: 'Address',  icon: 'i-lucide-map-pin',    placeholder: '1600 Pennsylvania Ave NW, Washington DC' },
  { id: 'email',   label: 'Email',    icon: 'i-lucide-mail',        placeholder: 'contact@company.com' },
  { id: 'phone',   label: 'Phone',    icon: 'i-lucide-phone',       placeholder: '+1 (212) 555-0101' },
]

// ── Input state ───────────────────────────────────────────────────────────
const inputs = ref<Record<Tab, string>>({
  address: '',
  email:   '',
  phone:   '',
})

const validating   = ref(false)
const showResult   = ref(false)
const currentInput = computed({
  get: () => inputs.value[activeTab.value],
  set: (v) => { inputs.value[activeTab.value] = v; showResult.value = false },
})

// ── Fake results per tab ──────────────────────────────────────────────────
interface ValidationResult {
  status: string
  label: string
  fields: { key: string; val: string }[]
  [key: string]: unknown
}

const results: Record<Tab, ValidationResult> = {
  address: {
    status: 'valid',
    label:  'USPS Deliverable',
    standardized: '1600 PENNSYLVANIA AVE NW, WASHINGTON, DC 20500-0001',
    dpv:    'Confirmed',
    county: 'District of Columbia',
    zip4:   '0001',
    rdi:    'Commercial',
    fields: [
      { key: 'Street',  val: '1600 PENNSYLVANIA AVE NW' },
      { key: 'City',    val: 'WASHINGTON'               },
      { key: 'State',   val: 'DC'                       },
      { key: 'ZIP+4',   val: '20500-0001'               },
      { key: 'County',  val: 'District of Columbia'     },
      { key: 'DPV',     val: 'Confirmed ✓'              },
      { key: 'Type',    val: 'Commercial'               },
    ],
  },
  email: {
    status: 'valid',
    label:  'Deliverable',
    address: 'contact@company.com',
    fields: [
      { key: 'Format',     val: 'Valid ✓'         },
      { key: 'Domain',     val: 'company.com'     },
      { key: 'MX Records', val: 'Found ✓'         },
      { key: 'Disposable', val: 'No'              },
      { key: 'Role-based', val: 'Yes (contact@)'  },
      { key: 'Risk score', val: 'Low'             },
      { key: 'SMTP check', val: 'Passed ✓'        },
    ],
  },
  phone: {
    status: 'valid',
    label:  'Valid · Active',
    fields: [
      { key: 'Number',   val: '+1 (212) 555-0101' },
      { key: 'Type',     val: 'Landline'           },
      { key: 'Carrier',  val: 'Verizon'            },
      { key: 'Location', val: 'New York, NY'       },
      { key: 'Status',   val: 'Active ✓'           },
      { key: 'TCPA',     val: 'Safe to call'       },
    ],
  },
}

const activeResult = computed(() => results[activeTab.value])

async function validate() {
  if (!currentInput.value.trim()) return
  validating.value  = true
  showResult.value  = false
  await new Promise(r => setTimeout(r, 900))
  validating.value  = false
  showResult.value  = true
}

function switchTab(tab: Tab) {
  activeTab.value  = tab
  showResult.value = false
}

// ── Social proof ──────────────────────────────────────────────────────────
const stats = [
  { value: '43%',   label: 'fewer undelivered parcels'  },
  { value: '<150ms', label: 'API response time'          },
  { value: '5 min', label: 'setup time'                 },
  { value: '3-in-1', label: 'Address · Email · Phone'   },
]

const statusColorMap: Record<string, string> = {
  valid:   'text-success bg-success/10 border-success/20',
  invalid: 'text-error   bg-error/10   border-error/20',
  risky:   'text-warning bg-warning/10 border-warning/20',
}
</script>

<template>
  <section class="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16 overflow-hidden">
    <!-- ── Background ─────────────────────────────────────────────────── -->
    <div class="absolute inset-0 pointer-events-none">
      <!-- Gradient base -->
      <div class="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-transparent to-transparent dark:from-blue-950/20 dark:via-transparent" />
      <!-- Orbs -->
      <div
        class="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-3xl animate-pulse"
        style="animation-duration:6s"
      />
      <div
        class="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-teal-500/10 blur-3xl animate-pulse"
        style="animation-duration:8s;animation-delay:2s"
      />
      <!-- Dot grid -->
      <div
        class="absolute inset-0 opacity-[0.35] dark:opacity-[0.15]"
        style="background-image: radial-gradient(circle, #94a3b8 1px, transparent 1px); background-size: 28px 28px"
      />
    </div>

    <!-- ── Content ────────────────────────────────────────────────────── -->
    <div class="relative z-10 w-full max-w-6xl mx-auto">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <!-- Left: Copy ──────────────────────────────────────────────── -->
        <div>
          <!-- Badge -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 16 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 100, duration: 500 } }"
            class="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-6"
          >
            <UIcon
              name="i-lucide-award"
              class="w-3.5 h-3.5"
            />
            USPS CASS Certified · SOC 2 Type II
            <span class="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse ml-1" />
          </div>

          <!-- Headline -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 24 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 200, duration: 600 } }"
          >
            <h1 class="text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold leading-[1.1] text-(--ui-text-highlighted) mb-6 tracking-tight">
              Validate Addresses,
              <br>
              Emails & Phones
              <br>
              <span class="relative">
                <span class="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                  in one platform.
                </span>
                <svg
                  class="absolute -bottom-1.5 left-0 w-full"
                  height="4"
                  viewBox="0 0 300 4"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 2 Q75 0 150 2 Q225 4 300 2"
                    stroke="url(#dqe-grad)"
                    stroke-width="2.5"
                    fill="none"
                    stroke-linecap="round"
                  />
                  <defs>
                    <linearGradient
                      id="dqe-grad"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop
                        offset="0%"
                        stop-color="#2563eb"
                      />
                      <stop
                        offset="100%"
                        stop-color="#14b8a6"
                      />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>

            <p class="text-base md:text-lg text-(--ui-text-muted) leading-relaxed mb-8 max-w-lg">
              Replace 3 vendors with one self-serve API. Set up in 5 minutes, pay by credit card. No SFTP. No sales cycle. No excuses for bad data.
            </p>
          </div>

          <!-- CTAs -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 16 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 350, duration: 500 } }"
            class="flex flex-wrap items-center gap-3 mb-10"
          >
            <!-- Primary — brief: "Validate 100 Records Free — Results in Minutes" -->
            <UButton
              size="lg"
              label="Validate 100 Records Free"
              trailing-icon="i-lucide-arrow-right"
              class="shadow-lg shadow-blue-500/25 font-semibold"
              @click="emit('primaryCta')"
            >
              <template #trailing>
                <div class="flex items-center gap-1.5">
                  <span class="text-xs opacity-75">— Results in Minutes</span>
                  <UIcon
                    name="i-lucide-arrow-right"
                    class="w-4 h-4"
                  />
                </div>
              </template>
            </UButton>

            <!-- Secondary group — developer path + comparison path -->
            <div class="flex items-center gap-2">
              <UButton
                size="lg"
                variant="ghost"
                label="API docs"
                leading-icon="i-lucide-code-2"
                to="/developers"
              />
              <USeparator
                orientation="vertical"
                class="h-5"
              />
              <UButton
                size="lg"
                variant="ghost"
                label="DQE vs. Smarty"
                leading-icon="i-lucide-swords"
                class="text-primary! font-semibold!"
                to="/vs-smarty"
              />
            </div>
          </div>

          <!-- Stats row -->
          <div
            v-motion
            :initial="{ opacity: 0 }"
            :enter="{ opacity: 1, transition: { delay: 500, duration: 600 } }"
            class="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            <div
              v-for="stat in stats"
              :key="stat.label"
              class="flex flex-col"
            >
              <span class="text-xl font-extrabold text-(--ui-text-highlighted) tabular-nums">{{ stat.value }}</span>
              <span class="text-xs text-(--ui-text-muted) mt-0.5">{{ stat.label }}</span>
            </div>
          </div>

          <!-- Competitor nudge -->
          <div
            v-motion
            :initial="{ opacity: 0 }"
            :enter="{ opacity: 1, transition: { delay: 650, duration: 500 } }"
            class="mt-8 flex flex-wrap items-center gap-4"
          >
            <!-- Developer signal -->
            <a
              href="/developers"
              class="flex items-center gap-1.5 text-xs text-(--ui-text-dimmed) hover:text-primary transition-colors group"
            >
              <UIcon
                name="i-lucide-terminal"
                class="w-3.5 h-3.5 group-hover:text-primary"
              />
              <span>10B+ queries/yr · <strong class="text-(--ui-text)">REST API</strong></span>
              <UIcon
                name="i-lucide-arrow-right"
                class="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
              />
            </a>

            <span class="text-(--ui-text-dimmed) text-xs">·</span>

            <!-- vs Smarty signal -->
            <a
              href="/vs-smarty"
              class="flex items-center gap-1.5 text-xs text-(--ui-text-dimmed) hover:text-primary transition-colors group"
            >
              <UIcon
                name="i-lucide-swords"
                class="w-3.5 h-3.5 group-hover:text-primary"
              />
              <span>Switching from Smarty? <strong class="text-primary">See comparison →</strong></span>
            </a>
          </div>
        </div>

        <!-- Right: Live validator widget ──────────────────────────── -->
        <div
          v-motion
          :initial="{ opacity: 0, x: 40, scale: 0.97 }"
          :enter="{ opacity: 1, x: 0, scale: 1, transition: { delay: 300, duration: 700 } }"
        >
          <div class="rounded-2xl border border-(--ui-border) bg-(--ui-bg) shadow-2xl shadow-black/8 overflow-hidden">
            <!-- Window chrome -->
            <div class="flex items-center gap-1.5 px-4 py-3 bg-(--ui-bg-elevated) border-b border-(--ui-border)">
              <span class="w-2.5 h-2.5 rounded-full bg-rose-400/70" />
              <span class="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
              <span class="flex-1 text-center text-[11px] text-(--ui-text-dimmed) font-medium">
                app.dqe.io — Live Validation
              </span>
              <div class="flex items-center gap-1 text-[10px] text-success bg-success/10 px-2 py-0.5 rounded-full">
                <span class="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                API live
              </div>
            </div>

            <!-- Tabs -->
            <div class="flex border-b border-(--ui-border) bg-(--ui-bg-elevated)">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                class="flex-1 flex items-center justify-center gap-2 py-3 text-xs font-semibold transition-all duration-200 border-b-2 relative"
                :class="activeTab === tab.id
                  ? 'border-primary text-primary bg-(--ui-bg)'
                  : 'border-transparent text-(--ui-text-muted) hover:text-(--ui-text) hover:bg-(--ui-bg)'"
                @click="switchTab(tab.id)"
              >
                <UIcon
                  :name="tab.icon"
                  class="w-3.5 h-3.5"
                />
                {{ tab.label }}
              </button>
            </div>

            <!-- Input area -->
            <div class="p-4 space-y-3">
              <div class="flex gap-2">
                <UInput
                  v-model="currentInput"
                  :placeholder="tabs.find(t => t.id === activeTab)!.placeholder"
                  size="md"
                  class="flex-1"
                  :leading-icon="tabs.find(t => t.id === activeTab)!.icon"
                  @keyup.enter="validate"
                />
                <UButton
                  :loading="validating"
                  label="Validate"
                  :disabled="!currentInput.trim()"
                  @click="validate"
                />
              </div>

              <!-- Quick example chips -->
              <div class="flex flex-wrap gap-1.5">
                <span class="text-[10px] text-(--ui-text-dimmed) mr-1 self-center">Try:</span>
                <button
                  v-for="ex in (activeTab === 'address'
                    ? ['1600 Pennsylvania Ave NW, DC', '350 5th Ave, New York NY']
                    : activeTab === 'email'
                      ? ['test@gmail.com', 'admin@shopify.com']
                      : ['+1 (212) 555-0101', '+1 (800) 275-8777'])"
                  :key="ex"
                  class="text-[10px] font-medium px-2 py-1 rounded-full bg-(--ui-bg-elevated) border border-(--ui-border) text-(--ui-text-muted) hover:border-primary/40 hover:text-primary transition-colors truncate max-w-[160px]"
                  @click="currentInput = ex; showResult = false"
                >
                  {{ ex }}
                </button>
              </div>
            </div>

            <!-- Result panel -->
            <Transition name="result-slide">
              <div
                v-if="showResult"
                class="border-t border-(--ui-border)"
              >
                <!-- Status bar -->
                <div class="flex items-center gap-3 px-4 py-3 bg-(--ui-bg-elevated)">
                  <div
                    class="flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold"
                    :class="statusColorMap[activeResult.status]"
                  >
                    <UIcon
                      name="i-lucide-check-circle-2"
                      class="w-3.5 h-3.5"
                    />
                    {{ activeResult.label }}
                  </div>
                  <div class="flex-1" />
                  <div class="text-[10px] text-(--ui-text-dimmed) flex items-center gap-1">
                    <UIcon
                      name="i-lucide-zap"
                      class="w-3 h-3 text-warning"
                    />
                    &lt;150ms response
                  </div>
                </div>

                <!-- Fields grid -->
                <div class="p-4 grid grid-cols-2 gap-x-6 gap-y-2">
                  <div
                    v-for="field in activeResult.fields"
                    :key="field.key"
                    class="flex items-start justify-between gap-2 py-1.5 border-b border-(--ui-border) last:border-0 col-span-1"
                  >
                    <span class="text-[11px] text-(--ui-text-dimmed) font-medium flex-shrink-0">{{ field.key }}</span>
                    <span class="text-[11px] text-(--ui-text-highlighted) font-semibold text-right truncate">{{ field.val }}</span>
                  </div>
                </div>

                <!-- Actions -->
                <div class="px-4 pb-4 flex gap-2">
                  <UButton
                    size="xs"
                    variant="soft"
                    label="Copy JSON"
                    leading-icon="i-lucide-copy"
                    class="flex-1"
                  />
                  <UButton
                    size="xs"
                    variant="soft"
                    label="View API call"
                    leading-icon="i-lucide-code-2"
                    class="flex-1"
                  />
                </div>
              </div>
            </Transition>

            <!-- Idle state — shown before first validation -->
            <div
              v-if="!showResult && !validating"
              class="px-4 pb-4"
            >
              <div class="rounded-xl border border-dashed border-(--ui-border) p-4 text-center">
                <UIcon
                  name="i-lucide-search"
                  class="w-6 h-6 text-(--ui-text-dimmed) mx-auto mb-2"
                />
                <p class="text-xs text-(--ui-text-dimmed)">
                  Enter a value above and click <strong class="text-(--ui-text)">Validate</strong> to see instant results
                </p>
              </div>
            </div>
          </div>

          <!-- Below widget trust signals -->
          <div class="mt-4 flex items-center justify-center gap-5 flex-wrap">
            <div
              v-for="trust in [
                { icon: 'i-lucide-credit-card', label: 'No credit card to start' },
                { icon: 'i-lucide-shield-check', label: 'SOC 2 Type II' },
                { icon: 'i-lucide-clock', label: '5-min setup' },
              ]"
              :key="trust.label"
              class="flex items-center gap-1.5 text-xs text-(--ui-text-dimmed)"
            >
              <UIcon
                :name="trust.icon"
                class="w-3.5 h-3.5 text-primary"
              />
              {{ trust.label }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.result-slide-enter-active,
.result-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease, max-height 0.4s ease;
}
.result-slide-enter-from,
.result-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
