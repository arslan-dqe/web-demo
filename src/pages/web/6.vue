<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useHead, useSeoMeta } from '@unhead/vue'
import { useIntersectionObserver } from '@vueuse/core'

definePage({ meta: { layout: 'landing' } })

useSeoMeta({
  title:       'DQE — Validate Address, Email & Phone in One API Call',
  description: 'USPS CASS-certified address + email + phone validation. Self-serve, <150ms, 100 free records.',
  ogTitle:     'DQE — All-in-One Data Validation API',
  ogType:      'website',
  robots:      'index, follow',
})

useHead({
  htmlAttrs: { lang: 'en' },
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&family=JetBrains+Mono:wght@400;600&display=swap' },
  ],
})

const scrollY = ref(0)
const onScroll = () => { scrollY.value = window.scrollY }
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

type VTab = 'address' | 'email' | 'phone'
const vTab      = ref<VTab>('address')
const vInput    = ref('')
const vLoading  = ref(false)
const vResult   = ref<null | Record<string, string>>(null)

const placeholders: Record<VTab, string> = {
  address: '350 5th Ave, New York NY',
  email:   'contact@company.com',
  phone:   '+1 (212) 555-0101',
}

const results: Record<VTab, Record<string, string>> = {
  address: {
    Status:        '✓ Deliverable',
    Standardized:  '350 5TH AVE, NEW YORK, NY 10118-0110',
    'DPV':         'Confirmed',
    'ZIP+4':       '10118-0110',
    County:        'New York County',
    'Record type': 'Commercial',
    'Response':    '112ms',
  },
  email: {
    Status:        '✓ Deliverable',
    'MX records':  'Found',
    'SMTP check':  'Passed',
    Disposable:    'No',
    'Role-based':  'No',
    'Risk score':  'Low',
    'Response':    '98ms',
  },
  phone: {
    Status:        '✓ Active',
    Type:          'Landline',
    Carrier:       'Verizon Communications',
    Location:      'New York, NY',
    'TCPA safe':   'Yes',
    Ported:        'No',
    'Response':    '87ms',
  },
}

async function runValidation() {
  if (!vInput.value.trim()) return
  vLoading.value = true
  vResult.value  = null
  await new Promise(r => setTimeout(r, 900))
  vLoading.value = false
  vResult.value  = results[vTab.value]
}

function switchVTab(t: VTab) {
  vTab.value    = t
  vInput.value  = ''
  vResult.value = null
}

const counterRef   = ref<HTMLElement | null>(null)
const counterValue = ref(0)
let   counterDone  = false

useIntersectionObserver(counterRef, ([e]) => {
  if (!e.isIntersecting || counterDone) return
  counterDone = true
  const target = 849.9, dur = 2000, start = performance.now()
  const tick = (now: number) => {
    const p = Math.min((now - start) / dur, 1)
    counterValue.value = Math.round((1 - Math.pow(1 - p, 3)) * target * 10) / 10
    if (p < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
})

const captureEmail = ref('')
const captureDone  = ref(false)

const freeProviders = ['gmail','yahoo','hotmail','outlook','icloud','protonmail','aol']
const isPersonal    = computed(() => {
  const d = captureEmail.value.split('@')[1]?.split('.')[0]?.toLowerCase() ?? ''
  return freeProviders.includes(d)
})
const canSubmit = computed(() =>
  captureEmail.value.includes('@') && captureEmail.value.includes('.') && !isPersonal.value
)

function submitCapture() {
  if (!canSubmit.value) return
  captureDone.value = true
}

// ── Free-records modal ─────────────────────────────────────────────────────
const showFreeModal     = ref(false)
const freeFormSubmitted = ref(false)
const freeForm = ref({
  firstName: '',
  lastName:  '',
  company:   '',
  email:     '',
  terms:     false,
})
const freeFormTouched = ref({
  firstName: false,
  lastName:  false,
  company:   false,
  email:     false,
})

const freeEmailValid = computed(() =>
  freeForm.value.email.includes('@') && freeForm.value.email.includes('.')
)
const freeFormValid = computed(() =>
  freeForm.value.firstName.trim() !== '' &&
  freeForm.value.lastName.trim()  !== '' &&
  freeForm.value.company.trim()   !== '' &&
  freeEmailValid.value &&
  freeForm.value.terms
)

function openFreeModal() {
  showFreeModal.value     = true
  freeFormSubmitted.value = false
  freeForm.value = { firstName: '', lastName: '', company: '', email: '', terms: false }
  freeFormTouched.value = { firstName: false, lastName: false, company: false, email: false }
}

function submitFreeForm() {
  if (!freeFormValid.value) return
  freeFormSubmitted.value = true
}

const features = [
  {
    icon: 'i-lucide-map-pin',
    color: 'bg-blue-500/10 text-blue-500',
    title: 'Address Validation',
    desc: 'USPS CASS-certified via Melissa OEM. ZIP+4, DPV confirmation, county and RDI append. Real-time engine for API, certified batch for CSV.',
    bullets: ['USPS CASS certified batch', 'DPV + ZIP+4 + RDI', 'Real-time <150ms API', 'County + geocode append'],
  },
  {
    icon: 'i-lucide-mail',
    color: 'bg-teal-500/10 text-teal-500',
    title: 'Email Validation',
    desc: 'Beyond format checks — MX records, live SMTP handshake, disposable domain detection, and risk scoring so you only send to real inboxes.',
    bullets: ['SMTP + MX verification', 'Disposable email detection', 'Role-based flag (admin@)', 'Risk score: Low / Med / High'],
  },
  {
    icon: 'i-lucide-phone',
    color: 'bg-violet-500/10 text-violet-500',
    title: 'Phone Validation',
    desc: 'Carrier lookup, line type (mobile/landline/VoIP), active/inactive status, and TCPA compliance flag — all in a single call.',
    bullets: ['Carrier identification', 'Line type detection', 'Active / ported status', 'TCPA compliance flag'],
  },
]

const compRows = [
  { label: 'Address validation',       dqe: true,  smarty: true,  melissa: true  },
  { label: 'Email validation',         dqe: true,  smarty: false, melissa: true  },
  { label: 'Phone validation',         dqe: true,  smarty: false, melissa: true  },
  { label: 'Single API call (all 3)',  dqe: true,  smarty: false, melissa: false },
  { label: 'Self-serve signup',        dqe: true,  smarty: true,  melissa: false },
  { label: 'Credit card billing',      dqe: true,  smarty: true,  melissa: false },
  { label: 'Free trial (no card)',     dqe: true,  smarty: true,  melissa: false },
  { label: '<150ms API response',      dqe: true,  smarty: true,  melissa: false },
  { label: 'LLM integration guides',  dqe: true,  smarty: false, melissa: false },
  { label: 'No procurement cycle',    dqe: true,  smarty: true,  melissa: false },
]

const steps = [
  {
    n: '01', icon: 'i-lucide-user-plus',
    title: 'Sign up — 60 seconds',
    desc: 'Business email or Google SSO. No credit card. Account live immediately.',
    code: 'export DQE_KEY="dqe_live_k3x9p2..."',
  },
  {
    n: '02', icon: 'i-lucide-key',
    title: 'Add your API key',
    desc: 'One environment variable. Works with Node, Python, PHP, Go, Ruby, or plain cURL.',
    code: 'const dqe = new DQE(process.env.DQE_KEY)',
  },
  {
    n: '03', icon: 'i-lucide-zap',
    title: 'Validate in milliseconds',
    desc: 'Address + email + phone in a single POST. Results back in under 150ms.',
    code: 'await dqe.validate({ address, email, phone })',
  },
]

const plans = [
  {
    name: 'Validate',
    price: '$0',
    period: 'forever',
    desc: 'Try DQE with no commitment.',
    highlight: false,
    cta: 'Start free',
    features: ['100 validations total', 'All 3 channels', 'REST API + CSV', 'Community support'],
  },
  {
    name: 'Verify',
    price: '$99',
    period: '/ month',
    desc: 'For teams who need volume.',
    highlight: true,
    tag: 'Most popular',
    cta: 'Start free trial',
    features: ['25,000 validations / mo', 'All 3 channels', 'Webhooks + batch', 'Credits never expire', 'Email support'],
  },
  {
    name: 'Advanced',
    price: 'Custom',
    period: 'contact us',
    desc: 'For high-volume deployments.',
    highlight: false,
    cta: 'Talk to sales',
    features: ['Unlimited validations', 'CRM integrations', 'Dedicated CSM', 'SLA guarantee', 'SOC 2 BAA'],
  },
]

const credentials = [
  'USPS CASS Certified', 'SOC 2 Type II', '<150ms p95',
  '240+ countries', 'GDPR', '99.99% uptime', 'TCPA Ready',
  '10B+ queries / yr', 'No SFTP', '5-min setup', 'CCPA',
]
</script>

<template>
  <div class="bg-white text-slate-900 font-sans antialiased overflow-x-hidden">
    <!-- ══════════════════════════════════════════════════════════════════
         NAV
    ════════════════════════════════════════════════════════════════════ -->
    <header
      class="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      :class="scrollY > 40
        ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm'
        : 'bg-transparent'"
    >
      <div class="max-w-6xl mx-auto px-6 h-16 flex items-center gap-8">
        <a
          href="/"
          class="flex items-center gap-2.5 flex-shrink-0"
        >
          <div class="w-8 h-8 bg-blue-600 flex items-center justify-center">
            <UIcon
              name="i-lucide-shield-check"
              class="w-4 h-4 text-white"
            />
          </div>
          <span class="font-bold text-slate-900 tracking-tight">DQE</span>
        </a>

        <nav class="hidden md:flex items-center gap-1 flex-1">
          <a
            v-for="l in ['Product','Pricing','Docs','Compare']"
            :key="l"
            :href="`#${l.toLowerCase()}`"
            class="px-3 py-1.5 text-sm text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors font-medium"
          >{{ l }}</a>
        </nav>

        <div class="flex items-center gap-2 ml-auto">
          <UButton
            size="sm"
            variant="ghost"
            color="neutral"
            label="Sign in"
          />
          <UButton
            size="sm"
            label="100 free records →"
            class="shadow-sm shadow-blue-500/20"
            @click="openFreeModal"
          />
        </div>
      </div>
    </header>


    <!-- ══════════════════════════════════════════════════════════════════
         HERO  (dark section)
    ════════════════════════════════════════════════════════════════════ -->
    <!-- ══════════════════════════════════════════════════════════════════
      HERO — light default · dark mode aware
 ════════════════════════════════════════════════════════════════════ -->
    <section class="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16 overflow-hidden bg-white dark:bg-[#04080F] transition-colors duration-300">
      <div class="absolute inset-0 pointer-events-none">
        <!-- Light mode: subtle warm grid -->
        <div
          class="absolute inset-0 opacity-[0.5] dark:opacity-0 transition-opacity duration-300"
          style="background-image: linear-gradient(to right, rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.04) 1px, transparent 1px); background-size: 32px 32px"
        />

        <!-- Dark mode: dot grid -->
        <div
          class="absolute inset-0 opacity-0 dark:opacity-[0.15] transition-opacity duration-300"
          style="background-image: radial-gradient(circle, #334155 1px, transparent 1px); background-size: 32px 32px"
        />

        <!-- Light mode glow pools -->
        <div class="absolute top-0 right-0 w-[600px] h-[500px] bg-blue-500/5 dark:bg-blue-600/15 rounded-full blur-[100px] transition-colors duration-500" />
        <div class="absolute bottom-0 left-0 w-[500px] h-[400px] bg-teal-500/5 dark:bg-teal-500/10 rounded-full blur-[80px] transition-colors duration-500" />

        <!-- Light mode: top accent line -->
        <div class="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent dark:via-blue-500/30" />
      </div>

      <div class="relative z-10 max-w-6xl mx-auto w-full">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <div
              v-motion
              :initial="{ opacity: 0, y: 12 }"
              :enter="{ opacity: 1, y: 0, transition: { delay: 100, duration: 500 } }"
              class="inline-flex items-center gap-2.5 mb-8
                 border border-slate-200 bg-slate-50 text-slate-500
                 dark:border-white/10 dark:bg-white/5 dark:text-white/50
                 text-xs font-medium px-4 py-2 rounded-full transition-colors duration-300"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
              USPS CASS Certified · SOC 2 ·
              <span class="font-mono text-blue-600 dark:text-blue-400">&lt;150ms</span>
            </div>

            <h1
              v-motion
              :initial="{ opacity: 0, y: 24 }"
              :enter="{ opacity: 1, y: 0, transition: { delay: 180, duration: 600 } }"
              class="text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-[1.08] tracking-tight mb-6
                 text-slate-900 dark:text-white transition-colors duration-300"
            >
              Validate every<br>
              address, email<br>
              <span class="text-blue-600 dark:text-blue-400 transition-colors duration-300">
                and phone.
              </span>
            </h1>

            <p
              v-motion
              :initial="{ opacity: 0, y: 16 }"
              :enter="{ opacity: 1, y: 0, transition: { delay: 280, duration: 500 } }"
              class="text-lg leading-relaxed mb-10 max-w-md
                 text-slate-500 dark:text-white/50 transition-colors duration-300"
            >
              One API call. Three validations. Replace Smarty, ZeroBounce,
              and your phone tool with a single self-serve platform.
              Results in milliseconds, not days.
            </p>

            <div
              v-motion
              :initial="{ opacity: 0, y: 12 }"
              :enter="{ opacity: 1, y: 0, transition: { delay: 380, duration: 500 } }"
              class="flex flex-wrap gap-3 mb-12"
            >
              <UButton
                size="lg"
                label="Get 100 free records"
                trailing-icon="i-lucide-arrow-right"
                class="shadow-lg shadow-blue-500/20 dark:shadow-blue-500/30 font-semibold"
                @click="openFreeModal"
              />
              <UButton
                size="lg"
                variant="ghost"
                color="neutral"
                label="View API docs"
                leading-icon="i-lucide-code-2"
                class="border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900 hover:bg-slate-50
                   dark:border-white/10 dark:text-white/60 dark:hover:text-white dark:hover:bg-white/8
                   transition-colors duration-200"
              />
            </div>

            <div
              v-motion
              :initial="{ opacity: 0 }"
              :enter="{ opacity: 1, transition: { delay: 500, duration: 600 } }"
              class="flex flex-wrap items-center gap-6"
            >
              <div
                v-for="t in [
                  { icon: 'i-lucide-credit-card', text: 'No card required' },
                  { icon: 'i-lucide-clock', text: '5-min setup' },
                  { icon: 'i-lucide-shield-check', text: 'SOC 2 Type II' },
                ]"
                :key="t.text"
                class="flex items-center gap-1.5 text-xs
                   text-slate-400 dark:text-white/30 transition-colors duration-300"
              >
                <UIcon
                  :name="t.icon"
                  class="w-3.5 h-3.5 text-blue-500/50 dark:text-blue-400/50"
                />
                {{ t.text }}
              </div>
            </div>
          </div>

          <div
            v-motion
            :initial="{ opacity: 0, x: 32, scale: 0.97 }"
            :enter="{ opacity: 1, x: 0, scale: 1, transition: { delay: 300, duration: 700 } }"
          >
            <div
              class="overflow-hidden transition-all duration-300
                 border border-slate-200 bg-white shadow-2xl shadow-slate-200/80
                 dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none dark:backdrop-blur-sm"
            >
              <div
                class="flex items-center gap-2 px-4 py-3 border-b transition-colors duration-300
                   border-slate-100 bg-slate-50
                   dark:border-white/8 dark:bg-white/[0.03]"
              >
                <div class="flex gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-white/10" />
                  <span class="w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-white/10" />
                  <span class="w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-white/10" />
                </div>
                <span
                  class="flex-1 text-center font-mono text-[11px] transition-colors duration-300
                     text-slate-400 dark:text-white/20"
                >
                  api.dqe.io / v1 / validate
                </span>
                <div
                  class="flex items-center gap-1.5 font-mono text-[10px] transition-colors duration-300
                     text-emerald-600 dark:text-emerald-400/70"
                >
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                  live
                </div>
              </div>

              <div
                class="flex border-b transition-colors duration-300
                   border-slate-100 dark:border-white/8"
              >
                <button
                  v-for="t in (['address','email','phone'] as VTab[])"
                  :key="t"
                  class="flex-1 flex items-center justify-center gap-2 py-3 text-xs font-semibold transition-all duration-200 border-b-2"
                  :class="vTab === t
                    ? 'border-blue-500 text-blue-600 bg-blue-50/50 dark:text-blue-400 dark:bg-white/[0.04]'
                    : 'border-transparent text-slate-400 hover:text-slate-700 dark:text-white/30 dark:hover:text-white/60'"
                  @click="switchVTab(t)"
                >
                  <UIcon
                    :name="t === 'address' ? 'i-lucide-map-pin' : t === 'email' ? 'i-lucide-mail' : 'i-lucide-phone'"
                    class="w-3.5 h-3.5"
                  />
                  {{ t }}
                </button>
              </div>

              <div
                class="p-4 space-y-3 border-b transition-colors duration-300
                   border-slate-100 dark:border-white/8"
              >
                <div class="flex gap-2">
                  <input
                    v-model="vInput"
                    :placeholder="placeholders[vTab]"
                    class="flex-1 font-mono text-sm px-3 py-2.5 outline-none transition-all duration-200
                       bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-300
                       focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-500/10
                       dark:bg-white/[0.06] dark:border-white/10 dark:text-white dark:placeholder-white/20
                       dark:focus:border-blue-500/50 dark:focus:bg-white/[0.08] dark:focus:ring-0"
                    @keyup.enter="runValidation"
                  >
                  <button
                    class="px-4 py-2.5 text-sm font-semibold transition-colors duration-200 disabled:opacity-40
                       bg-blue-600 hover:bg-blue-700 text-white
                       dark:bg-blue-600 dark:hover:bg-blue-500"
                    :disabled="!vInput.trim() || vLoading"
                    @click="runValidation"
                  >
                    <span v-if="!vLoading">Run</span>
                    <UIcon
                      v-else
                      name="i-lucide-loader-2"
                      class="w-4 h-4 animate-spin"
                    />
                  </button>
                </div>

                <div class="flex flex-wrap gap-1.5">
                  <span
                    class="text-[10px] self-center font-mono transition-colors duration-300
                       text-slate-300 dark:text-white/20"
                  >try:</span>
                  <button
                    v-for="ex in (vTab === 'address'
                      ? ['350 5th Ave, New York NY', '1 Infinite Loop, Cupertino CA']
                      : vTab === 'email'
                        ? ['test@company.com', 'admin@shopify.com']
                        : ['+1 (212) 555-0101', '+1 (800) 275-8777'])"
                    :key="ex"
                    class="font-mono text-[10px] px-2 py-1 border transition-colors duration-200 truncate max-w-[180px]
                       border-slate-200 text-slate-400 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50
                       dark:border-white/10 dark:text-white/30 dark:hover:border-blue-500/40 dark:hover:text-blue-400 dark:hover:bg-transparent"
                    @click="vInput = ex; vResult = null"
                  >
                    {{ ex }}
                  </button>
                </div>
              </div>

              <div class="min-h-[200px]">
                <Transition name="result-fade">
                  <div
                    v-if="vResult"
                    key="result"
                    class="p-4"
                  >
                    <div class="flex items-center gap-2 mb-4">
                      <span
                        class="font-mono text-[10px] px-2 py-1 border transition-colors duration-300
                           text-emerald-700 bg-emerald-50 border-emerald-200
                           dark:text-emerald-400 dark:bg-emerald-400/10 dark:border-emerald-400/20"
                      >200 OK</span>
                      <span
                        class="font-mono text-[10px] transition-colors duration-300
                           text-slate-300 dark:text-white/20"
                      >application/json</span>
                    </div>
                    <div class="space-y-0">
                      <div
                        v-for="([key, val], idx) in Object.entries(vResult)"
                        :key="key"
                        class="flex items-center justify-between py-2 border-b transition-colors duration-200
                           border-slate-50 last:border-0
                           dark:border-white/5"
                        :class="idx % 2 === 0
                          ? 'bg-transparent'
                          : 'bg-slate-50/50 dark:bg-white/[0.02]'"
                      >
                        <span
                          class="font-mono text-[11px] transition-colors duration-300
                             text-slate-400 dark:text-white/30"
                        >{{ key }}</span>
                        <span
                          class="font-mono text-[11px] font-semibold transition-colors duration-300"
                          :class="String(val).startsWith('✓')
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-slate-700 dark:text-white/70'"
                        >{{ val }}</span>
                      </div>
                    </div>
                  </div>

                  <div
                    v-else-if="vLoading"
                    key="loading"
                    class="p-4 flex flex-col gap-2.5"
                  >
                    <div
                      v-for="i in 6"
                      :key="i"
                      class="h-5 animate-pulse transition-colors duration-300
                         bg-slate-100 dark:bg-white/5"
                      :style="{ width: `${55 + (i * 7) % 35}%`, animationDelay: `${i * 80}ms` }"
                    />
                  </div>

                  <div
                    v-else
                    key="idle"
                    class="p-4 flex flex-col items-center justify-center h-[200px] gap-3"
                  >
                    <div
                      class="w-12 h-12 flex items-center justify-center border transition-colors duration-300
                         border-slate-100 bg-slate-50
                         dark:border-white/8 dark:bg-white/[0.03]"
                    >
                      <UIcon
                        name="i-lucide-terminal"
                        class="w-5 h-5 transition-colors duration-300
                           text-slate-300 dark:text-white/15"
                      />
                    </div>
                    <p
                      class="font-mono text-xs text-center transition-colors duration-300
                         text-slate-300 dark:text-white/15"
                    >
                      Enter a value above and click Run
                    </p>
                  </div>
                </Transition>
              </div>
            </div>

            <div class="flex items-center justify-between mt-3 px-1">
              <div
                class="flex items-center gap-1.5 font-mono text-[10px] transition-colors duration-300
                   text-slate-400 dark:text-slate-600"
              >
                <UIcon
                  name="i-lucide-zap"
                  class="w-3 h-3 text-blue-500/50"
                />
                1 credit · all 3 channels
              </div>
              <div class="flex items-center gap-3">
                <span
                  v-for="badge in ['USPS CASS', 'SOC 2', 'GDPR']"
                  :key="badge"
                  class="font-mono text-[9px] uppercase tracking-wider transition-colors duration-300
                     text-slate-300 dark:text-slate-700"
                >{{ badge }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════════════
         CREDENTIALS MARQUEE
    ════════════════════════════════════════════════════════════════════ -->
    <div class="bg-slate-900 border-y border-slate-800 py-3 overflow-hidden">
      <div class="marquee-track flex gap-0 whitespace-nowrap">
        <span
          v-for="(item, i) in [...credentials, ...credentials, ...credentials]"
          :key="i"
          class="inline-flex items-center gap-3 font-mono text-xs text-slate-400 px-6"
        >
          <span class="w-1 h-1 rounded-full bg-blue-500 flex-shrink-0" />
          {{ item }}
        </span>
      </div>
    </div>


    <!-- ══════════════════════════════════════════════════════════════════
         STATS  (light)
    ════════════════════════════════════════════════════════════════════ -->
    <section class="relative bg-[#04080F] overflow-hidden border-y border-slate-800">
      <div class="absolute inset-0 pointer-events-none">
        <div
          class="absolute inset-0 opacity-[0.12]"
          style="background-image: radial-gradient(circle, #334155 1px, transparent 1px); background-size: 28px 28px"
        />
        <div class="absolute top-0 left-1/3 w-[500px] h-[300px] bg-rose-600/10 rounded-full blur-[80px]" />
        <div class="absolute bottom-0 right-1/4 w-[400px] h-[250px] bg-blue-600/10 rounded-full blur-[60px]" />
      </div>

      <div class="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
          class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
        >
          <div>
            <div class="inline-flex items-center gap-2 border border-rose-500/20 bg-rose-500/8 text-rose-400 font-mono text-xs px-3 py-1.5 mb-5">
              <UIcon
                name="i-lucide-triangle-alert"
                class="w-3.5 h-3.5"
              />
              The cost of bad data
            </div>
            <h2 class="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
              Bad data is a<br>P&amp;L problem.
            </h2>
          </div>
          <p class="text-slate-500 text-sm max-w-sm leading-relaxed md:text-right">
            Every wrong address, bounced email, and disconnected
            phone has a measurable dollar cost. The numbers are in.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-px bg-slate-800">
          <div
            v-motion
            :initial="{ opacity: 0, x: -24 }"
            :visible="{ opacity: 1, x: 0, transition: { duration: 700 } }"
            class="lg:col-span-5 bg-[#04080F] p-10 flex flex-col justify-between min-h-[300px] group hover:bg-white/[0.02] transition-colors"
          >
            <div>
              <div class="flex items-center gap-2 mb-6">
                <div class="w-8 h-8 bg-rose-500/15 border border-rose-500/20 flex items-center justify-center">
                  <UIcon
                    name="i-lucide-package-x"
                    class="w-4 h-4 text-rose-400"
                  />
                </div>
                <span class="font-mono text-xs text-slate-500 uppercase tracking-widest">
                  E-commerce returns · US · 2026
                </span>
              </div>

              <div
                ref="counterRef"
                class="mb-4"
              >
                <div class="font-mono text-[4rem] md:text-[5rem] font-bold leading-none tracking-tight text-white group-hover:text-rose-50 transition-colors">
                  ${{ counterValue.toFixed(1) }}<span class="text-rose-400">B</span>
                </div>
              </div>

              <p class="text-slate-400 text-base leading-relaxed max-w-xs">
                Lost annually to e-commerce returns driven by
                address errors at checkout — <strong class="text-white">19.3% of all US online sales.</strong>
              </p>
            </div>

            <div class="flex items-center justify-between pt-6 border-t border-slate-800">
              <span class="font-mono text-[10px] text-slate-600 uppercase tracking-widest">Source: NRF 2026</span>
              <div class="flex items-center gap-1.5 text-xs text-rose-400/70 font-mono">
                <UIcon
                  name="i-lucide-trending-down"
                  class="w-3.5 h-3.5"
                />
                Year-over-year ↑
              </div>
            </div>
          </div>

          <div class="lg:col-span-7 grid grid-rows-3 gap-px bg-slate-800">
            <div
              v-motion
              :initial="{ opacity: 0, x: 24 }"
              :visible="{ opacity: 1, x: 0, transition: { delay: 120, duration: 600 } }"
              class="bg-[#04080F] px-8 py-7 flex items-center gap-8 group hover:bg-white/[0.02] transition-colors"
            >
              <div class="flex-shrink-0">
                <div class="font-mono text-[2.2rem] font-bold text-white leading-none tracking-tight group-hover:text-amber-50 transition-colors">
                  $1<span class="text-amber-400">.47</span>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-slate-300 text-sm font-medium mb-1">
                  Average base cost per failed delivery attempt
                </p>
                <p class="text-slate-600 text-xs leading-relaxed">
                  Multiplies into driver overtime, SLA penalties, and re-routing
                  across thousands of daily routes.
                </p>
              </div>
              <div class="flex-shrink-0 hidden sm:flex flex-col items-end gap-1">
                <div
                  v-for="(h, idx) in [40, 55, 48, 70, 65, 82, 75]"
                  :key="idx"
                  class="w-1 bg-amber-500/30 rounded-sm"
                  :style="{ height: `${h * 0.3}px` }"
                />
                <span class="font-mono text-[9px] text-slate-700 mt-1 uppercase tracking-wider">
                  Cost / attempt
                </span>
              </div>
            </div>

            <div
              v-motion
              :initial="{ opacity: 0, x: 24 }"
              :visible="{ opacity: 1, x: 0, transition: { delay: 200, duration: 600 } }"
              class="bg-[#04080F] px-8 py-7 flex items-center gap-8 group hover:bg-white/[0.02] transition-colors"
            >
              <div class="flex-shrink-0">
                <div class="font-mono text-[2.2rem] font-bold text-white leading-none tracking-tight group-hover:text-violet-50 transition-colors">
                  19<span class="text-violet-400">.3%</span>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-slate-300 text-sm font-medium mb-1">
                  Of US online orders are returned — many preventable
                </p>
                <p class="text-slate-600 text-xs leading-relaxed">
                  A significant portion trace directly to inaccurate address data
                  captured at checkout before validation runs.
                </p>
              </div>
              <div class="flex-shrink-0 hidden sm:flex flex-col items-center gap-1.5">
                <svg
                  width="52"
                  height="52"
                  viewBox="0 0 52 52"
                >
                  <circle
                    cx="26"
                    cy="26"
                    r="20"
                    fill="none"
                    stroke="rgba(139,92,246,0.12)"
                    stroke-width="5"
                  />
                  <circle
                    cx="26"
                    cy="26"
                    r="20"
                    fill="none"
                    stroke="#7c3aed"
                    stroke-width="5"
                    stroke-linecap="round"
                    stroke-dasharray="125.6"
                    stroke-dashoffset="101"
                    transform="rotate(-90 26 26)"
                    opacity="0.6"
                  />
                </svg>
                <span class="font-mono text-[9px] text-slate-700 uppercase tracking-wider">Return rate</span>
              </div>
            </div>

            <div
              v-motion
              :initial="{ opacity: 0, x: 24 }"
              :visible="{ opacity: 1, x: 0, transition: { delay: 280, duration: 600 } }"
              class="bg-[#04080F] px-8 py-7 flex items-center gap-8 group hover:bg-white/[0.02] transition-colors"
            >
              <div class="flex-shrink-0">
                <div class="font-mono text-[2.2rem] font-bold text-white leading-none tracking-tight group-hover:text-blue-50 transition-colors">
                  $3<span class="text-blue-400">.1T</span>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-slate-300 text-sm font-medium mb-1">
                  Lost annually in the US due to poor data quality
                </p>
                <p class="text-slate-600 text-xs leading-relaxed">
                  AI initiatives, marketing campaigns, and sales pipelines all
                  fail when fed dirty contact records.
                </p>
              </div>
              <div class="flex-shrink-0 hidden sm:flex flex-col gap-1">
                <div
                  v-for="(item, idx) in [
                    { label: 'AI fails', color: 'bg-blue-500/25' },
                    { label: 'Mktg waste', color: 'bg-blue-500/40' },
                    { label: 'Lost sales', color: 'bg-blue-500/60' },
                  ]"
                  :key="idx"
                  class="flex items-center gap-1.5"
                >
                  <div
                    class="h-1.5 rounded-sm"
                    :class="[item.color, `w-${8 + idx * 4}`]"
                  />
                  <span class="font-mono text-[9px] text-slate-700 whitespace-nowrap">{{ item.label }}</span>
                </div>
                <span class="font-mono text-[9px] text-slate-700 mt-1 uppercase tracking-wider">IBM / Gartner</span>
              </div>
            </div>
          </div>
        </div>

        <div
          v-motion
          :initial="{ opacity: 0, y: 12 }"
          :visible="{ opacity: 1, y: 0, transition: { delay: 400, duration: 500 } }"
          class="mt-px bg-slate-800/50 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p class="font-mono text-xs text-slate-600">
            Based on NRF, Last Mile Consortium, IBM, and Gartner research · 2026
          </p>
          <a
            href="#capture"
            class="flex items-center gap-2 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
          >
            <UIcon
              name="i-lucide-shield-check"
              class="w-3.5 h-3.5"
            />
            DQE customers see 43% fewer undelivered parcels →
          </a>
        </div>
      </div>
    </section>


    <!-- ══════════════════════════════════════════════════════════════════
         FEATURES  (white, bento)
    ════════════════════════════════════════════════════════════════════ -->
    <section
      id="product"
      class="py-24 px-6 bg-slate-50 border-b border-slate-200"
    >
      <div class="max-w-6xl mx-auto">
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
          class="mb-16"
        >
          <UBadge
            color="primary"
            variant="soft"
            label="The platform"
            class="mb-4"
          />
          <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 class="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight max-w-lg">
              Three validations.<br>One platform. One price.
            </h2>
            <p class="text-slate-500 max-w-xs text-sm leading-relaxed">
              Stop paying for Smarty + an email tool + a phone tool.
              DQE does all three in a single API call.
            </p>
          </div>
        </div>

        <div class="grid md:grid-cols-3 gap-5">
          <div
            v-for="(feat, i) in features"
            :key="feat.title"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0, transition: { delay: i * 100, duration: 600 } }"
            class="group bg-white border border-slate-200 p-7 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/80 hover:-translate-y-1 transition-all duration-300"
          >
            <div
              class="w-10 h-10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
              :class="feat.color"
            >
              <UIcon
                :name="feat.icon"
                class="w-5 h-5"
              />
            </div>
            <h3 class="text-lg font-bold text-slate-900 mb-2">
              {{ feat.title }}
            </h3>
            <p class="text-sm text-slate-500 leading-relaxed mb-5">
              {{ feat.desc }}
            </p>
            <ul class="space-y-2">
              <li
                v-for="b in feat.bullets"
                :key="b"
                class="flex items-center gap-2 text-sm text-slate-600"
              >
                <div class="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                {{ b }}
              </li>
            </ul>
          </div>
        </div>

        <div
          v-motion
          :initial="{ opacity: 0, y: 16 }"
          :visible="{ opacity: 1, y: 0, transition: { delay: 300, duration: 500 } }"
          class="mt-8 bg-slate-900 p-6 flex flex-col md:flex-row items-center gap-6"
        >
          <div class="flex-shrink-0 text-center md:text-left">
            <p class="font-mono text-xs text-slate-400 uppercase tracking-widest mb-1">
              Single API call
            </p>
            <p class="text-2xl font-bold text-white">
              3 results. 1 request.
            </p>
          </div>
          <div class="w-px h-12 bg-slate-700 hidden md:block" />
          <div class="flex-1 overflow-x-auto w-full">
            <pre class="font-mono text-xs text-slate-300 leading-relaxed"><code><span class="text-blue-400">POST</span> <span class="text-slate-400">https://api.dqe.io/v1/validate</span>
<span class="text-slate-600">{</span> <span class="text-teal-400">"address"</span><span class="text-slate-600">:</span> <span class="text-amber-300">"350 5th Ave, New York NY"</span><span class="text-slate-600">,</span>
  <span class="text-teal-400">"email"</span><span class="text-slate-600">:</span>   <span class="text-amber-300">"john@company.com"</span><span class="text-slate-600">,</span>
  <span class="text-teal-400">"phone"</span><span class="text-slate-600">:</span>   <span class="text-amber-300">"+1 212 555 0101"</span> <span class="text-slate-600">}</span>
<span class="text-slate-600">→</span> <span class="text-emerald-400">{ address: valid, email: deliverable, phone: active }</span>  <span class="text-slate-500">// 112ms</span></code></pre>
          </div>
          <div class="flex-shrink-0 text-center border border-slate-700 px-5 py-3">
            <p class="text-2xl font-mono font-bold text-white">
              3×
            </p>
            <p class="text-xs text-slate-500 mt-0.5">
              fewer vendors
            </p>
          </div>
        </div>
      </div>
    </section>


    <!-- ══════════════════════════════════════════════════════════════════
         vs SMARTY  (dark)
    ════════════════════════════════════════════════════════════════════ -->
    <section
      id="compare"
      class="py-24 px-6 bg-slate-900 border-b border-slate-800"
    >
      <div class="max-w-5xl mx-auto">
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
          class="mb-12"
        >
          <div class="inline-flex items-center gap-2 border border-slate-700 text-slate-400 font-mono text-xs px-3 py-1.5 rounded mb-5">
            <UIcon
              name="i-lucide-swords"
              class="w-3.5 h-3.5 text-blue-400"
            />
            DQE vs. Smarty vs. Melissa
          </div>
          <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 class="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Smarty is fast.<br>
              <span class="text-slate-500">But it only does addresses.</span>
            </h2>
            <p class="text-slate-400 text-sm max-w-xs leading-relaxed">
              DQE matches Smarty's self-serve speed — then adds email and phone
              so you replace 2–3 vendors with one key.
            </p>
          </div>
        </div>

        <div
          v-motion
          :initial="{ opacity: 0, y: 24 }"
          :visible="{ opacity: 1, y: 0, transition: { delay: 100, duration: 600 } }"
          class="border border-slate-700 overflow-x-auto mb-8"
        >
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-slate-700">
                <th class="text-left px-5 py-4 font-mono text-[11px] text-slate-500 uppercase tracking-wider w-[45%]">
                  Feature
                </th>
                <th class="px-5 py-4 text-center bg-blue-600/10 border-x border-blue-500/20">
                  <span class="font-bold text-blue-400 font-mono text-sm">DQE</span>
                </th>
                <th class="px-5 py-4 text-center">
                  <span class="font-mono text-xs text-slate-500">Smarty</span>
                </th>
                <th class="px-5 py-4 text-center">
                  <span class="font-mono text-xs text-slate-500">Melissa</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in compRows"
                :key="row.label"
                class="border-b border-slate-800 last:border-0 transition-colors hover:bg-white/[0.02]"
              >
                <td class="px-5 py-3.5 text-slate-300 text-sm">
                  {{ row.label }}
                </td>
                <td class="px-5 py-3.5 text-center bg-blue-600/5 border-x border-blue-500/10">
                  <span
                    class="font-mono font-bold text-base"
                    :class="row.dqe ? 'text-emerald-400' : 'text-slate-700'"
                  >{{ row.dqe ? '✓' : '·' }}</span>
                </td>
                <td class="px-5 py-3.5 text-center">
                  <span
                    class="font-mono font-bold text-base"
                    :class="row.smarty ? 'text-slate-400' : 'text-slate-700'"
                  >{{ row.smarty ? '✓' : '✕' }}</span>
                </td>
                <td class="px-5 py-3.5 text-center">
                  <span
                    class="font-mono font-bold text-base"
                    :class="row.melissa ? 'text-slate-400' : 'text-slate-700'"
                  >{{ row.melissa ? '✓' : '✕' }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          v-motion
          :initial="{ opacity: 0 }"
          :visible="{ opacity: 1, transition: { delay: 200, duration: 500 } }"
          class="flex flex-col sm:flex-row items-center gap-4 p-5 border border-slate-700 bg-white/[0.02]"
        >
          <div class="flex-1">
            <p class="text-sm font-semibold text-white mb-0.5">
              Switching from Smarty takes under 10 minutes.
            </p>
            <p class="text-xs text-slate-500 font-mono">
              DQE's address endpoint is structurally compatible. Swap the base URL, add your key.
            </p>
          </div>
          <UButton
            label="View migration guide"
            variant="outline"
            color="neutral"
            trailing-icon="i-lucide-arrow-right"
            class="border-slate-600 text-slate-300 hover:border-blue-500 hover:text-blue-400 flex-shrink-0"
          />
        </div>
      </div>
    </section>


    <!-- ══════════════════════════════════════════════════════════════════
         HOW IT WORKS  (light)
    ════════════════════════════════════════════════════════════════════ -->
    <section class="py-24 px-6 bg-white border-b border-slate-100">
      <div class="max-w-5xl mx-auto">
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
          class="text-center mb-16"
        >
          <UBadge
            color="primary"
            variant="soft"
            label="How it works"
            class="mb-4"
          />
          <h2 class="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Three steps. Under five minutes.
          </h2>
        </div>

        <div class="grid md:grid-cols-3 gap-px bg-slate-200">
          <div
            v-for="(step, i) in steps"
            :key="step.n"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0, transition: { delay: i * 120, duration: 600 } }"
            class="group bg-white p-8 relative overflow-hidden hover:bg-slate-50 transition-colors"
          >
            <div class="absolute -top-4 -right-2 font-mono font-bold text-[6rem] text-slate-50 leading-none select-none group-hover:text-slate-100 transition-colors">
              {{ step.n }}
            </div>

            <div class="relative z-10">
              <div class="w-10 h-10 bg-blue-600 flex items-center justify-center mb-5 group-hover:bg-blue-700 transition-colors">
                <UIcon
                  :name="step.icon"
                  class="w-5 h-5 text-white"
                />
              </div>

              <p class="font-mono text-xs text-blue-500 uppercase tracking-widest mb-3">
                Step {{ step.n }}
              </p>
              <h3 class="text-lg font-bold text-slate-900 mb-2">
                {{ step.title }}
              </h3>
              <p class="text-sm text-slate-500 leading-relaxed mb-5">
                {{ step.desc }}
              </p>

              <div class="bg-slate-900 px-4 py-3 border-l-2 border-blue-500">
                <code class="font-mono text-xs text-teal-400 whitespace-pre">{{ step.code }}</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ══════════════════════════════════════════════════════════════════
         PRICING  (light)
    ════════════════════════════════════════════════════════════════════ -->
    <section
      id="pricing"
      class="py-24 px-6 bg-slate-50 border-b border-slate-200"
    >
      <div class="max-w-5xl mx-auto">
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
          class="text-center mb-14"
        >
          <UBadge
            color="success"
            variant="soft"
            label="Pricing"
            class="mb-4"
          />
          <h2 class="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-3">
            Start free. Scale when ready.
          </h2>
          <p class="text-slate-500 max-w-md mx-auto text-sm">
            One credit = one validation. Address, email, or phone — your choice.
            Credits in Verify never expire.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-px bg-slate-200">
          <div
            v-for="(plan, i) in plans"
            :key="plan.name"
            v-motion
            :initial="{ opacity: 0, y: 30, scale: 0.98 }"
            :visible="{ opacity: 1, y: 0, scale: 1, transition: { delay: i * 80, duration: 600 } }"
            class="relative flex flex-col p-8 transition-all duration-300"
            :class="plan.highlight
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-white hover:bg-slate-50'"
          >
            <div
              v-if="plan.tag"
              class="absolute -top-3 left-8"
            >
              <span class="bg-slate-900 text-white font-mono text-[10px] font-bold uppercase tracking-wider px-3 py-1">
                {{ plan.tag }}
              </span>
            </div>

            <p
              class="font-mono text-xs font-bold uppercase tracking-widest mb-4"
              :class="plan.highlight ? 'text-blue-200' : 'text-slate-400'"
            >
              {{ plan.name }}
            </p>

            <div class="mb-2">
              <span
                class="text-4xl font-bold tracking-tight"
                :class="plan.highlight ? 'text-white' : 'text-slate-900'"
              >{{ plan.price }}</span>
              <span
                class="text-sm ml-1.5 font-mono"
                :class="plan.highlight ? 'text-blue-200' : 'text-slate-400'"
              >{{ plan.period }}</span>
            </div>

            <p
              class="text-sm mb-6"
              :class="plan.highlight ? 'text-blue-100' : 'text-slate-500'"
            >
              {{ plan.desc }}
            </p>

            <div
              class="h-px mb-6"
              :class="plan.highlight ? 'bg-blue-500' : 'bg-slate-100'"
            />

            <ul class="space-y-3 flex-1 mb-8">
              <li
                v-for="f in plan.features"
                :key="f"
                class="flex items-start gap-2.5 text-sm"
                :class="plan.highlight ? 'text-blue-50' : 'text-slate-600'"
              >
                <UIcon
                  name="i-lucide-check"
                  class="w-4 h-4 mt-0.5 flex-shrink-0"
                  :class="plan.highlight ? 'text-blue-200' : 'text-emerald-500'"
                />
                {{ f }}
              </li>
            </ul>

            <button
              class="w-full py-3 font-semibold text-sm transition-all"
              :class="plan.highlight
                ? 'bg-white text-blue-600 hover:bg-blue-50'
                : 'bg-slate-900 text-white hover:bg-blue-600'"
            >
              {{ plan.cta }} →
            </button>
          </div>
        </div>

        <div
          v-motion
          :initial="{ opacity: 0 }"
          :visible="{ opacity: 1, transition: { delay: 300, duration: 500 } }"
          class="mt-8 grid sm:grid-cols-3 gap-4"
        >
          <div
            v-for="note in [
              { icon: 'i-lucide-infinity', text: 'Credits never expire on Verify' },
              { icon: 'i-lucide-layers', text: '1 credit = 1 validation, any channel' },
              { icon: 'i-lucide-shield-check', text: 'Business email required for free trial' },
            ]"
            :key="note.text"
            class="flex items-center gap-2.5 text-xs text-slate-400"
          >
            <UIcon
              :name="note.icon"
              class="w-4 h-4 text-slate-300 flex-shrink-0"
            />
            {{ note.text }}
          </div>
        </div>
      </div>
    </section>


    <!-- ══════════════════════════════════════════════════════════════════
         LEAD CAPTURE  (dark)
    ════════════════════════════════════════════════════════════════════ -->
    <section class="py-20 px-6 bg-[#04080F]">
      <div class="max-w-4xl mx-auto">
        <div
          v-motion
          :initial="{ opacity: 0, y: 24, scale: 0.98 }"
          :visible="{ opacity: 1, y: 0, scale: 1, transition: { duration: 700 } }"
          class="border border-white/10 p-10 md:p-16 relative overflow-hidden"
        >
          <div class="absolute inset-0">
            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64 bg-blue-600/20 blur-[80px]" />
          </div>

          <div class="relative z-10 flex flex-col md:flex-row gap-12 items-center">
            <div class="flex-1">
              <div class="inline-flex items-center gap-2 font-mono text-xs text-blue-400/70 mb-5">
                <span class="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                Free · No card · Results in minutes
              </div>
              <h2 class="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
                Claim 100 free records.<br>
                <span class="text-blue-400">Right now.</span>
              </h2>
              <p class="text-sm text-white/40 leading-relaxed">
                Business email required. 100-record cap per organisation to prevent abuse.
                Upgrade to Verify when you're ready to scale.
              </p>
            </div>

            <div class="w-full md:w-80 flex-shrink-0">
              <Transition
                name="result-fade"
                mode="out-in"
              >
                <div
                  v-if="!captureDone"
                  key="form"
                  class="space-y-3"
                >
                  <div>
                    <input
                      v-model="captureEmail"
                      type="email"
                      placeholder="you@yourcompany.com"
                      class="w-full bg-white/[0.06] border border-white/10 text-white placeholder-white/20 font-mono text-sm px-4 py-3 outline-none focus:border-blue-500/50 focus:bg-white/[0.08] transition-all"
                      @keyup.enter="submitCapture"
                    >
                    <Transition name="result-fade">
                      <p
                        v-if="captureEmail.includes('@') && isPersonal"
                        class="font-mono text-[11px] text-amber-400/80 mt-1.5"
                      >
                        ⚠ Please use your work email address
                      </p>
                    </Transition>
                  </div>

                  <button
                    class="w-full py-3 font-semibold text-sm transition-all"
                    :class="canSubmit
                      ? 'bg-blue-600 hover:bg-blue-500 text-white'
                      : 'bg-white/5 text-white/20 cursor-not-allowed'"
                    :disabled="!canSubmit"
                    @click="submitCapture"
                  >
                    Claim 100 free records →
                  </button>

                  <p class="font-mono text-[10px] text-white/20 text-center">
                    We verify your email before sending your API key.
                  </p>
                </div>

                <div
                  v-else
                  key="done"
                  class="text-center py-4"
                >
                  <div class="w-12 h-12 bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                    <UIcon
                      name="i-lucide-check"
                      class="w-6 h-6 text-emerald-400"
                    />
                  </div>
                  <p class="font-semibold text-white mb-1">
                    You're in.
                  </p>
                  <p class="font-mono text-xs text-white/30">
                    Check your inbox — API key incoming.
                  </p>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ══════════════════════════════════════════════════════════════════
         FOOTER
    ════════════════════════════════════════════════════════════════════ -->
    <footer class="bg-slate-900 border-t border-slate-800 px-6 py-16">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-2 md:grid-cols-6 gap-10 mb-12">
          <div class="col-span-2">
            <div class="flex items-center gap-2.5 mb-4">
              <div class="w-7 h-7 bg-blue-600 flex items-center justify-center">
                <UIcon
                  name="i-lucide-shield-check"
                  class="w-4 h-4 text-white"
                />
              </div>
              <span class="font-bold text-white tracking-tight">DQE</span>
            </div>
            <p class="text-sm text-slate-500 leading-relaxed max-w-xs mb-5">
              All-in-one Address, Email & Phone validation. Self-serve. US data residency.
              USPS CASS certified.
            </p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="b in ['USPS CASS','SOC 2 II','GDPR','TCPA']"
                :key="b"
                class="font-mono text-[10px] text-slate-500 border border-slate-700 px-2 py-1"
              >{{ b }}</span>
            </div>
          </div>

          <div
            v-for="col in [
              { heading: 'Product', links: ['Address Validation','Email Validation','Phone Validation','API Reference','Changelog'] },
              { heading: 'Compare', links: ['vs Smarty','vs Melissa','vs Loqate','vs ZeroBounce'] },
              { heading: 'Company', links: ['About','Blog','Careers','Contact'] },
              { heading: 'Legal', links: ['Privacy','Terms','Security','DPA'] },
            ]"
            :key="col.heading"
          >
            <p class="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-4">
              {{ col.heading }}
            </p>
            <div class="flex flex-col gap-2.5">
              <a
                v-for="link in col.links"
                :key="link"
                href="#"
                class="text-sm text-slate-400 hover:text-white transition-colors"
              >{{ link }}</a>
            </div>
          </div>
        </div>

        <div class="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span class="font-mono text-xs text-slate-600">
            © {{ new Date().getFullYear() }} DQE USA. All rights reserved.
          </span>
          <div class="flex items-center gap-4">
            <span class="flex items-center gap-1.5 font-mono text-xs text-slate-600">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              All systems operational
            </span>
            <span class="font-mono text-xs text-slate-600">US data residency</span>
          </div>
        </div>
      </div>
    </footer>
  </div>

  <!-- ══════════════════════════════════════════════════════════════════
       FREE RECORDS MODAL
  ════════════════════════════════════════════════════════════════════ -->
  <UModal
    v-model:open="showFreeModal"
    :ui="{ content: 'max-w-lg' }"
  >
    <template #content>
      <div class="bg-white">
        <!-- Header -->
        <div class="flex items-center justify-between px-7 pt-7 pb-5 border-b border-slate-100">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-blue-600 flex items-center justify-center flex-shrink-0">
              <UIcon
                name="i-lucide-shield-check"
                class="w-4 h-4 text-white"
              />
            </div>
            <div>
              <p class="font-bold text-slate-900 text-base leading-tight">
                Get 100 free records
              </p>
              <p class="font-mono text-[11px] text-slate-400 mt-0.5">
                No credit card · API key delivered instantly
              </p>
            </div>
          </div>
          <button
            class="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            @click="showFreeModal = false"
          >
            <UIcon
              name="i-lucide-x"
              class="w-4 h-4"
            />
          </button>
        </div>

        <!-- Body -->
        <Transition
          name="result-fade"
          mode="out-in"
        >
          <!-- Success state -->
          <div
            v-if="freeFormSubmitted"
            key="success"
            class="px-7 py-10 flex flex-col items-center text-center gap-4"
          >
            <div class="w-14 h-14 bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center">
              <UIcon
                name="i-lucide-check"
                class="w-7 h-7 text-emerald-500"
              />
            </div>
            <div>
              <p class="text-xl font-bold text-slate-900 mb-1">
                You're in!
              </p>
              <p class="text-sm text-slate-500 leading-relaxed">
                Check your inbox — your API key and 100 free credits are on their way to<br>
                <span class="font-mono text-slate-700 font-semibold">{{ freeForm.email }}</span>
              </p>
            </div>
            <button
              class="mt-2 px-6 py-2.5 bg-slate-900 text-white text-sm font-semibold hover:bg-blue-600 transition-colors"
              @click="showFreeModal = false"
            >
              Close
            </button>
          </div>

          <!-- Form state -->
          <form
            v-else
            key="form"
            class="px-7 py-6 space-y-4"
            @submit.prevent="submitFreeForm"
          >
            <!-- First / Last name row -->
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-mono text-[11px] text-slate-500 uppercase tracking-wider mb-1.5">
                  First name <span class="text-red-400">*</span>
                </label>
                <input
                  v-model="freeForm.firstName"
                  type="text"
                  autocomplete="given-name"
                  placeholder="Jane"
                  class="w-full border text-sm px-3 py-2.5 outline-none transition-all"
                  :class="freeFormTouched.firstName && !freeForm.firstName.trim()
                    ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-500/10'
                    : 'border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-300 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-500/10'"
                  @blur="freeFormTouched.firstName = true"
                >
                <p
                  v-if="freeFormTouched.firstName && !freeForm.firstName.trim()"
                  class="font-mono text-[10px] text-red-400 mt-1"
                >
                  Required
                </p>
              </div>
              <div>
                <label class="block font-mono text-[11px] text-slate-500 uppercase tracking-wider mb-1.5">
                  Last name <span class="text-red-400">*</span>
                </label>
                <input
                  v-model="freeForm.lastName"
                  type="text"
                  autocomplete="family-name"
                  placeholder="Smith"
                  class="w-full border text-sm px-3 py-2.5 outline-none transition-all"
                  :class="freeFormTouched.lastName && !freeForm.lastName.trim()
                    ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-500/10'
                    : 'border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-300 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-500/10'"
                  @blur="freeFormTouched.lastName = true"
                >
                <p
                  v-if="freeFormTouched.lastName && !freeForm.lastName.trim()"
                  class="font-mono text-[10px] text-red-400 mt-1"
                >
                  Required
                </p>
              </div>
            </div>

            <!-- Company -->
            <div>
              <label class="block font-mono text-[11px] text-slate-500 uppercase tracking-wider mb-1.5">
                Company name <span class="text-red-400">*</span>
              </label>
              <input
                v-model="freeForm.company"
                type="text"
                autocomplete="organization"
                placeholder="Acme Corp"
                class="w-full border text-sm px-3 py-2.5 outline-none transition-all"
                :class="freeFormTouched.company && !freeForm.company.trim()
                  ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-500/10'
                  : 'border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-300 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-500/10'"
                @blur="freeFormTouched.company = true"
              >
              <p
                v-if="freeFormTouched.company && !freeForm.company.trim()"
                class="font-mono text-[10px] text-red-400 mt-1"
              >
                Required
              </p>
            </div>

            <!-- Work email -->
            <div>
              <label class="block font-mono text-[11px] text-slate-500 uppercase tracking-wider mb-1.5">
                Work email <span class="text-red-400">*</span>
              </label>
              <input
                v-model="freeForm.email"
                type="email"
                autocomplete="email"
                placeholder="jane@yourcompany.com"
                class="w-full border font-mono text-sm px-3 py-2.5 outline-none transition-all"
                :class="freeFormTouched.email && !freeEmailValid
                  ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-500/10'
                  : 'border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-300 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-500/10'"
                @blur="freeFormTouched.email = true"
              >
              <p
                v-if="freeFormTouched.email && !freeEmailValid"
                class="font-mono text-[10px] text-red-400 mt-1"
              >
                Enter a valid email address
              </p>
            </div>

            <!-- Terms -->
            <div class="pt-1">
              <label class="flex items-start gap-3 cursor-pointer group">
                <div class="flex-shrink-0 mt-0.5">
                  <div
                    class="w-4 h-4 border-2 flex items-center justify-center transition-colors"
                    :class="freeForm.terms
                      ? 'bg-blue-600 border-blue-600'
                      : 'border-slate-300 group-hover:border-blue-400'"
                    @click="freeForm.terms = !freeForm.terms"
                  >
                    <UIcon
                      v-if="freeForm.terms"
                      name="i-lucide-check"
                      class="w-2.5 h-2.5 text-white"
                    />
                  </div>
                  <input
                    v-model="freeForm.terms"
                    type="checkbox"
                    class="sr-only"
                  >
                </div>
                <span class="text-xs text-slate-500 leading-relaxed">
                  I agree to the
                  <a
                    href="/legal/terms"
                    target="_blank"
                    class="text-blue-600 hover:text-blue-700 underline underline-offset-2"
                  >Terms of Use</a>
                  and
                  <a
                    href="/legal/privacy"
                    target="_blank"
                    class="text-blue-600 hover:text-blue-700 underline underline-offset-2"
                  >Privacy Policy</a>.
                  I understand that my data will be processed in accordance with DQE's data practices.
                  <span class="text-red-400">*</span>
                </span>
              </label>
            </div>

            <!-- Divider -->
            <div class="border-t border-slate-100 pt-4 flex flex-col gap-3">
              <button
                type="submit"
                class="w-full py-3 font-semibold text-sm transition-all"
                :class="freeFormValid
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20'
                  : 'bg-slate-100 text-slate-300 cursor-not-allowed'"
                :disabled="!freeFormValid"
              >
                Claim 100 free records →
              </button>
              <p class="font-mono text-[10px] text-slate-300 text-center">
                We verify your email before sending your API key · No spam
              </p>
            </div>
          </form>
        </Transition>
      </div>
    </template>
  </UModal>
</template>

<style scoped>
/* Marquee */
@keyframes marquee {
  from { transform: translateX(0) }
  to   { transform: translateX(-33.333%) }
}
.marquee-track {
  animation: marquee 28s linear infinite;
}
.marquee-track:hover {
  animation-play-state: paused;
}

/* Validator transitions */
.result-fade-enter-active,
.result-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.result-fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.result-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>

