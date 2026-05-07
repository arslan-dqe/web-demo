<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useTheme } from '../../composables/useTheme'

definePage({ meta: { layout: 'landing' } })

const { appConfig: _appConfig, init } = useTheme()
init()

const scrolled = ref(false)
const mobileOpen = ref(false)
const onScroll = () => { scrolled.value = window.scrollY > 20 }
onMounted(() => {
  window.addEventListener('scroll', onScroll)
  initStatsObserver()
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const statsEl = ref<HTMLElement | null>(null)
const statsStarted = ref(false)
const statValues = ref([0, 0, 0, 0])
const statTargets = [849.9, 1.47, 3.1, 19.3]
const statPrefixes = ['$', '$', '$', '']
const statSuffixes = ['B', '', 'T', '%']
const statLabels = ['US e-commerce return cost', 'per failed delivery attempt', 'annual US data quality loss', 'e-commerce return rate']

function initStatsObserver() {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !statsStarted.value) {
      statsStarted.value = true
      statTargets.forEach((target, i) => {
        const start = Date.now()
        const duration = 1800
        const tick = () => {
          const elapsed = Date.now() - start
          const progress = Math.min(elapsed / duration, 1)
          const ease = 1 - Math.pow(1 - progress, 3)
          statValues.value[i] = parseFloat((target * ease).toFixed(target < 10 ? 2 : 1))
          if (progress < 1) requestAnimationFrame(tick)
          else statValues.value[i] = target
        }
        requestAnimationFrame(tick)
      })
    }
  }, { threshold: 0.3 })
  if (statsEl.value) observer.observe(statsEl.value)
}

const activeIndustry = ref('retail')
const industries = [
  {
    id: 'retail',
    label: 'Retail & E-commerce',
    icon: 'i-lucide-shopping-cart',
    stat: '$849.9B',
    statLabel: 'annual return cost driven by bad address data',
    headline: 'Recover margin lost to failed deliveries',
    bullets: [
      'Validate addresses at checkout before orders ship',
      'Cut reverse logistics costs by correcting data at point of entry',
      'Unify customer records across store, web, and loyalty systems',
    ],
  },
  {
    id: 'logistics',
    label: 'Logistics',
    icon: 'i-lucide-truck',
    stat: '$1.47',
    statLabel: 'direct cost per failed delivery attempt',
    headline: 'Eliminate failed delivery attempts at the source',
    bullets: [
      'Validate every address at point of intake before routing',
      'Reduce driver overtime and SLA penalties from misrouted parcels',
      'Integrate directly into your TMS or WMS via REST API',
    ],
  },
  {
    id: 'hospitality',
    label: 'Hospitality',
    icon: 'i-lucide-building-2',
    stat: '40%',
    statLabel: 'of hotel guest profiles are duplicates on average',
    headline: 'Build a single golden record for every guest',
    bullets: [
      'Deduplicate guest profiles across booking channels and PMS systems',
      'Validate email and phone to reach guests directly — not through OTAs',
      'Increase direct booking ratio and suppress OTA commission spend',
    ],
  },
  {
    id: 'developers',
    label: 'Developers',
    icon: 'i-lucide-code-2',
    stat: '<150ms',
    statLabel: 'API response time · 10B+ queries/year capacity',
    headline: 'A validation API built the way you expect',
    bullets: [
      'REST API with clear docs, code examples, and sandbox environment',
      'Validate address, email, and phone in a single API call',
      'Pay-as-you-go credit packs — no sales call required',
    ],
  },
]

const comparison = [
  { feature: 'Address Validation', dqe: true, smarty: true, note: 'USPS CASS Certified batch processing' },
  { feature: 'Email Validation', dqe: true, smarty: false, note: 'Syntax, domain, bounce detection' },
  { feature: 'Phone Validation', dqe: true, smarty: false, note: 'Type, carrier, active line status' },
  { feature: 'Self-serve credit card', dqe: true, smarty: true, note: 'No sales call for entry tiers' },
  { feature: 'Results in minutes', dqe: true, smarty: true, note: 'Real-time API + batch upload' },
  { feature: 'All-in-one pricing', dqe: true, smarty: false, note: 'One bill instead of three vendors' },
]

const pricingPlans = [
  {
    id: 'validate',
    name: 'Validate',
    tag: 'Free forever',
    price: '$0',
    period: '',
    description: '100 validations/month to prove value before spending a cent.',
    cta: 'Start Free — No Credit Card',
    highlight: false,
    icon: 'i-lucide-gift',
    features: [
      '100 validations/month',
      'Address + Email + Phone',
      'Drag-and-drop CSV upload',
      'Results in minutes',
      'No credit card required',
    ],
  },
  {
    id: 'verify',
    name: 'Verify',
    tag: 'Most popular',
    price: 'From $19',
    period: '/credit pack',
    description: 'Pay-as-you-go validation at any scale. No subscriptions.',
    cta: 'Buy Credits',
    highlight: true,
    icon: 'i-lucide-zap',
    features: [
      '1K – 500K credits per pack',
      'REST API + CSV upload',
      'Address + Email + Phone',
      'Priority processing',
      'Usage dashboard',
    ],
  },
  {
    id: 'advanced',
    name: 'Advanced',
    tag: 'Phase 2',
    price: 'Custom',
    period: '/month',
    description: 'Deduplication engine + native CRM integrations.',
    cta: 'Contact US Team',
    highlight: false,
    icon: 'i-lucide-building-2',
    features: [
      'Everything in Verify',
      'AI-powered deduplication',
      'Salesforce + Shopify connectors',
      'Microsoft Dynamics 365',
      'SOC 2 Type II compliance',
    ],
  },
]

const testimonials = [
  {
    quote: 'We were paying Smarty $50 plus two other tools. DQE replaced all three. Our undeliverable parcel rate dropped 43% in the first month.',
    name: 'Sarah Chen',
    role: 'VP of Operations',
    company: 'ShopDirect US',
    industry: 'Retail',
    initials: 'SC',
  },
  {
    quote: 'API setup took 12 minutes. Our team now validates every incoming address before it hits routing. At 50k deliveries/day, $1.47 per failure adds up fast.',
    name: 'Marcus Rodriguez',
    role: 'Head of Last-Mile',
    company: 'FleetRoute Inc.',
    industry: 'Logistics',
    initials: 'MR',
  },
  {
    quote: 'We had 40% duplicate guest profiles. DQE cleaned our intake data and our direct booking ratio went up 18% in 90 days.',
    name: 'Amanda Foster',
    role: 'Director of Guest Experience',
    company: 'Meridian Hotels',
    industry: 'Hospitality',
    initials: 'AF',
  },
]

const themeOpen = ref(false)
const themeTab = ref<'plates' | 'colors' | 'custom'>('plates')
const customHue = ref(293)
const appConfig = _appConfig

const plates = [
  { name: 'Signal',   primary: 'violet',  neutral: 'zinc'    },
  { name: 'Ocean',    primary: 'blue',    neutral: 'slate'   },
  { name: 'Forest',   primary: 'emerald', neutral: 'stone'   },
  { name: 'Sunset',   primary: 'rose',    neutral: 'gray'    },
  { name: 'Gold',     primary: 'amber',   neutral: 'neutral' },
  { name: 'Midnight', primary: 'indigo',  neutral: 'zinc'    },
  { name: 'Coral',    primary: 'orange',  neutral: 'stone'   },
  { name: 'Teal',     primary: 'teal',    neutral: 'slate'   },
  { name: 'Lavender', primary: 'purple',  neutral: 'zinc'    },
  { name: 'Fuchsia',  primary: 'fuchsia', neutral: 'neutral' },
  { name: 'Sky',      primary: 'sky',     neutral: 'slate'   },
  { name: 'Mono',     primary: 'zinc',    neutral: 'zinc'    },
]

const activePlate = computed(() =>
  plates.find(p => p.primary === appConfig.ui.colors.primary && p.neutral === appConfig.ui.colors.neutral) ?? null
)

const chromatic = ['red','orange','amber','yellow','lime','green','emerald','teal','cyan','sky','blue','indigo','violet','purple','fuchsia','pink','rose']
const neutralPalette = ['slate','gray','zinc','neutral','stone']

const colorRoles = [
  { key: 'primary',   label: 'Primary',   options: chromatic      },
  { key: 'secondary', label: 'Secondary', options: chromatic      },
  { key: 'neutral',   label: 'Neutral',   options: neutralPalette },
  { key: 'success',   label: 'Success',   options: chromatic      },
  { key: 'warning',   label: 'Warning',   options: chromatic      },
  { key: 'error',     label: 'Error',     options: chromatic      },
]

const customColors = ref<Record<string, string>>({})
const customActive = ref<Record<string, boolean>>({})

function colorVar(name: string): string {
  return `var(--color-${name === 'neutral' ? 'old-neutral' : name}-500)`
}

function getColor(key: string): string {
  return (appConfig.ui.colors as Record<string, string>)[key] ?? ''
}

// Lightness/chroma template (Tailwind violet scale)
const shadeTemplate = [
  [50, 0.969, 0.016], [100, 0.943, 0.029], [200, 0.894, 0.057],
  [300, 0.811, 0.111], [400, 0.702, 0.183], [500, 0.606, 0.25],
  [600, 0.541, 0.281], [700, 0.491, 0.27],  [800, 0.432, 0.232],
  [900, 0.380, 0.189], [950, 0.283, 0.141],
] as [number, number, number][]

function clearCustomForRole(key: string) {
  customActive.value[key] = false
  shadeTemplate.forEach(([shade]) =>
    document.documentElement.style.removeProperty(`--ui-color-${key}-${shade}`)
  )
}

function setColor(key: string, value: string) {
  clearCustomForRole(key)
  ;(appConfig.ui.colors as Record<string, string>)[key] = value
}

function applyPlate(p: typeof plates[0]) {
  clearCustomForRole('primary')
  clearCustomForRole('neutral')
  appConfig.ui.colors.primary = p.primary
  appConfig.ui.colors.neutral = p.neutral
}

// hex → oklch conversion (sRGB → linear → XYZ D65 → OKLab → OKLCH)
function hexToOklch(hex: string): { l: number; c: number; h: number } {
  hex = hex.replace('#', '')
  if (hex.length === 3) hex = hex.split('').map(ch => ch + ch).join('')
  const r = parseInt(hex.slice(0, 2), 16) / 255
  const g = parseInt(hex.slice(2, 4), 16) / 255
  const b = parseInt(hex.slice(4, 6), 16) / 255
  const lin = (v: number) => v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  const rl = lin(r), gl = lin(g), bl = lin(b)
  const x = 0.4122214708 * rl + 0.5363325363 * gl + 0.0514459929 * bl
  const y = 0.2119034982 * rl + 0.6806995451 * gl + 0.1073969566 * bl
  const z = 0.0883024619 * rl + 0.2817188376 * gl + 0.6299787005 * bl
  const lc = Math.cbrt(0.8189330101 * x + 0.3618667424 * y - 0.1288597137 * z)
  const mc = Math.cbrt(0.0329845436 * x + 0.9293118715 * y + 0.0361456387 * z)
  const sc = Math.cbrt(0.0482003018 * x + 0.2643662691 * y + 0.6338517070 * z)
  const L  = 0.2104542553 * lc + 0.7936177850 * mc - 0.0040720468 * sc
  const a  = 1.9779984951 * lc - 2.4285922050 * mc + 0.4505937099 * sc
  const bv = 0.0259040371 * lc + 0.7827717662 * mc - 0.8086757660 * sc
  const C = Math.sqrt(a * a + bv * bv)
  const H = ((Math.atan2(bv, a) * 180 / Math.PI) + 360) % 360
  return { l: L, c: C, h: H }
}

function applyHexToRole(roleKey: string, hex: string) {
  if (!hex || !/^#[0-9a-f]{6}$/i.test(hex)) return
  customColors.value[roleKey] = hex
  customActive.value[roleKey] = true
  const { h, c: pickedC } = hexToOklch(hex)
  // Scale chroma relative to violet-500 (C≈0.25) so saturation feels natural
  const ratio = pickedC / 0.25
  shadeTemplate.forEach(([shade, l, templateC]) => {
    const c = Math.min(templateC * ratio, 0.4)
    document.documentElement.style.setProperty(`--ui-color-${roleKey}-${shade}`, `oklch(${l} ${c} ${h})`)
  })
}

function onHueSlider(e: Event) {
  const hue = Number((e.target as HTMLInputElement).value)
  customHue.value = hue
  shadeTemplate.forEach(([shade, l, c]) =>
    document.documentElement.style.setProperty(`--ui-color-primary-${shade}`, `oklch(${l} ${c} ${hue})`)
  )
}
</script>

<template>
  <div class="min-h-screen bg-(--ui-bg) text-(--ui-text) antialiased">

    <header
      :class="[
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'bg-(--ui-bg)/90 backdrop-blur-xl border-b border-(--ui-border) shadow-sm' : '',
      ]"
    >
      <nav class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        <a href="#" class="flex items-center gap-2.5 flex-shrink-0">
          <div class="relative w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center shadow-lg shadow-primary-500/30">
            <UIcon name="i-lucide-shield-check" class="w-4 h-4 text-white" />
            <span class="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-success-400 border border-(--ui-bg) animate-pulse" />
          </div>
          <span class="font-extrabold text-lg tracking-tight text-(--ui-text-highlighted)">
            DQE <span class="text-primary-500">Validate</span>
          </span>
        </a>

        <div class="hidden md:flex items-center gap-8 text-sm font-medium text-(--ui-text-muted)">
          <a href="#how" class="hover:text-(--ui-text-highlighted) transition-colors">Product</a>
          <a href="#pricing" class="hover:text-(--ui-text-highlighted) transition-colors">Pricing</a>
          <a href="#developers" class="hover:text-(--ui-text-highlighted) transition-colors">Developers</a>
          <a href="#compare" class="flex items-center gap-1.5 text-primary-500 font-semibold hover:text-primary-400 transition-colors">
            <UIcon name="i-lucide-swords" class="w-3.5 h-3.5" />
            vs Smarty
          </a>
        </div>

        <div class="hidden md:flex items-center gap-3 flex-shrink-0">
          <span class="text-xs font-bold px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20 tracking-wide">
            USPS CASS Certified
          </span>
          <UButton variant="ghost" size="sm" class="text-(--ui-text-muted) hover:text-(--ui-text-highlighted)">Sign in</UButton>
          <UButton size="sm" class="bg-primary-500 hover:bg-primary-600 text-white font-bold shadow-lg shadow-primary-500/25 transition-colors">
            Start Free
          </UButton>
        </div>

        <button class="md:hidden p-2 text-(--ui-text-muted)" @click="mobileOpen = !mobileOpen">
          <UIcon :name="mobileOpen ? 'i-lucide-x' : 'i-lucide-menu'" class="w-5 h-5" />
        </button>
      </nav>

      <Transition name="mobile-menu">
        <div v-if="mobileOpen" class="md:hidden bg-(--ui-bg) border-t border-(--ui-border) px-6 py-5 flex flex-col gap-4 text-sm font-medium">
          <a href="#how" class="text-(--ui-text-muted)" @click="mobileOpen = false">Product</a>
          <a href="#pricing" class="text-(--ui-text-muted)" @click="mobileOpen = false">Pricing</a>
          <a href="#developers" class="text-(--ui-text-muted)" @click="mobileOpen = false">Developers</a>
          <a href="#compare" class="text-primary-500 font-semibold" @click="mobileOpen = false">vs Smarty</a>
          <UButton class="w-full bg-primary-500 text-white font-bold">Start Free</UButton>
        </div>
      </Transition>
    </header>

    <section class="relative pt-28 pb-20 px-6 overflow-hidden">
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <div class="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-primary-500/6 rounded-full blur-3xl" />
        <div class="absolute top-20 right-1/4 w-[500px] h-[500px] bg-primary-500/4 rounded-full blur-3xl" />
        <div class="absolute inset-0 bg-[image:linear-gradient(var(--color-primary-500,rgba(139,92,246,0.025))_0%,transparent_0.1px),linear-gradient(90deg,var(--color-primary-500,rgba(139,92,246,0.025))_0%,transparent_0.1px)] [background-size:72px_72px] opacity-[0.03]" />
      </div>

      <div class="relative max-w-7xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-14 items-center">

          <div v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0, transition: { duration: 650 } }">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/25 text-primary-400 text-sm font-semibold mb-7">
              <span class="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
              All-in-one · USPS CASS Certified · 5-min setup
            </div>

            <h1 class="text-5xl lg:text-[3.6rem] font-black leading-[1.05] tracking-tight text-(--ui-text-highlighted) mb-6">
              All the validation<br>
              <span class="bg-gradient-to-r from-primary-300 to-primary-600 bg-clip-text text-transparent">
                Smarty can't do.
              </span><br>
              In one platform.
            </h1>

            <p class="text-xl text-(--ui-text-muted) leading-relaxed mb-8 max-w-lg">
              DQE validates Address, Email, and Phone in a single self-serve platform —
              replacing three tools, eliminating SFTP, and delivering results in minutes.
            </p>

            <div class="flex flex-wrap gap-4 mb-10">
              <UButton size="lg" class="bg-primary-500 hover:bg-primary-600 text-white font-bold shadow-xl shadow-primary-500/30 transition-colors px-8">
                <UIcon name="i-lucide-zap" class="w-4 h-4 mr-2" />
                Validate 100 Records Free
              </UButton>
              <UButton size="lg" variant="outline" class="border-(--ui-border) text-(--ui-text-muted) hover:text-(--ui-text-highlighted) hover:border-primary-500/40 transition-all px-7">
                <UIcon name="i-lucide-code-2" class="w-4 h-4 mr-2" />
                See API Docs
              </UButton>
            </div>

            <div class="flex flex-wrap items-center gap-6 text-sm text-(--ui-text-dimmed)">
              <div class="flex items-center gap-2">
                <div class="flex -space-x-2">
                  <div
                    v-for="(letter, i) in ['S','M','R','A']"
                    :key="i"
                    class="w-7 h-7 rounded-full bg-primary-500/20 border-2 border-(--ui-bg) flex items-center justify-center text-xs font-bold text-primary-400"
                  >{{ letter }}</div>
                </div>
                <span>800+ companies worldwide</span>
              </div>
              <div class="flex items-center gap-1.5">
                <div class="flex">
                  <UIcon v-for="i in 5" :key="i" name="i-lucide-star" class="w-4 h-4 text-warning-400 fill-warning-400" />
                </div>
                <span>4.9/5 on G2</span>
              </div>
              <div class="flex items-center gap-1.5">
                <UIcon name="i-lucide-shield-check" class="w-4 h-4 text-success-400" />
                <span>SOC 2 Type II</span>
              </div>
            </div>
          </div>

          <div v-motion :initial="{ opacity: 0, x: 40, scale: 0.95 }" :enter="{ opacity: 1, x: 0, scale: 1, transition: { duration: 650, delay: 180 } }" class="relative">
            <div class="relative mx-auto max-w-md">
              <div class="absolute -inset-4 rounded-[2rem] bg-primary-500/10 blur-2xl" />

              <div class="relative bg-(--ui-bg-elevated) border border-(--ui-border) rounded-3xl overflow-hidden shadow-2xl">

                <div class="bg-primary-500/6 border-b border-(--ui-border) px-6 py-4 flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-9 h-9 rounded-xl bg-primary-500 flex items-center justify-center shadow-lg shadow-primary-500/30">
                      <UIcon name="i-lucide-shield-check" class="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div class="text-sm font-bold text-(--ui-text-highlighted)">DQE Validation Report</div>
                      <div class="text-xs text-(--ui-text-dimmed)">3 checks · 47ms · All passed</div>
                    </div>
                  </div>
                  <UBadge color="success" variant="soft" size="xs" class="font-bold tracking-wide">PASSED</UBadge>
                </div>

                <div class="px-6 py-5 border-b border-(--ui-border)">
                  <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary-400">
                      <UIcon name="i-lucide-map-pin" class="w-3.5 h-3.5" />Address
                    </div>
                    <div class="flex items-center gap-1.5 text-xs text-success-400 font-semibold">
                      <UIcon name="i-lucide-check-circle-2" class="w-3.5 h-3.5" />Corrected & Verified
                    </div>
                  </div>
                  <div class="bg-(--ui-bg) rounded-xl px-4 py-3">
                    <div class="text-sm font-semibold text-(--ui-text-highlighted)">123 Main Street</div>
                    <div class="text-sm text-(--ui-text-muted)">New York, NY 10001-0001</div>
                    <div class="flex items-center gap-2 mt-2">
                      <span class="text-xs px-2 py-0.5 rounded-full bg-success-500/10 text-success-400 font-semibold border border-success-500/20">DPV Confirmed</span>
                      <span class="text-xs px-2 py-0.5 rounded-full bg-primary-500/10 text-primary-400 font-semibold border border-primary-500/20">USPS CASS</span>
                    </div>
                  </div>
                </div>

                <div class="px-6 py-5 border-b border-(--ui-border)">
                  <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary-400">
                      <UIcon name="i-lucide-mail" class="w-3.5 h-3.5" />Email
                    </div>
                    <div class="flex items-center gap-1.5 text-xs text-success-400 font-semibold">
                      <UIcon name="i-lucide-check-circle-2" class="w-3.5 h-3.5" />Deliverable
                    </div>
                  </div>
                  <div class="bg-(--ui-bg) rounded-xl px-4 py-3">
                    <div class="text-sm font-semibold text-(--ui-text-highlighted)">john.doe@example.com</div>
                    <div class="flex items-center gap-3 mt-2">
                      <span class="text-xs px-2 py-0.5 rounded-full bg-success-500/10 text-success-400 font-semibold border border-success-500/20">Deliverable</span>
                      <span class="text-xs text-(--ui-text-muted)">Score: <span class="text-success-400 font-bold">98/100</span></span>
                    </div>
                  </div>
                </div>

                <div class="px-6 py-5">
                  <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary-400">
                      <UIcon name="i-lucide-phone" class="w-3.5 h-3.5" />Phone
                    </div>
                    <div class="flex items-center gap-1.5 text-xs text-success-400 font-semibold">
                      <UIcon name="i-lucide-check-circle-2" class="w-3.5 h-3.5" />Active Line
                    </div>
                  </div>
                  <div class="bg-(--ui-bg) rounded-xl px-4 py-3">
                    <div class="text-sm font-semibold text-(--ui-text-highlighted)">+1 (212) 555-0198</div>
                    <div class="flex items-center gap-2 mt-2">
                      <span class="text-xs px-2 py-0.5 rounded-full bg-success-500/10 text-success-400 font-semibold border border-success-500/20">Mobile</span>
                      <span class="text-xs px-2 py-0.5 rounded-full bg-(--ui-bg-accented) text-(--ui-text-muted) font-semibold">AT&T</span>
                    </div>
                  </div>
                </div>

                <div class="px-6 py-3 bg-(--ui-bg-muted) border-t border-(--ui-border) flex items-center justify-between text-xs text-(--ui-text-dimmed)">
                  <span class="flex items-center gap-1.5"><UIcon name="i-lucide-credit-card" class="w-3.5 h-3.5" />No credit card for first 100</span>
                  <span class="flex items-center gap-1.5"><UIcon name="i-lucide-timer" class="w-3.5 h-3.5" />Results in minutes</span>
                </div>
              </div>

              <div class="absolute -top-3 -right-3 bg-warning-400 text-black text-xs font-black px-3 py-1.5 rounded-full shadow-lg rotate-3">
                3-in-1
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section ref="statsEl" class="py-16 bg-(--ui-bg-elevated) border-y border-(--ui-border)">
      <div class="max-w-7xl mx-auto px-6">
        <p class="text-center text-xs font-bold uppercase tracking-widest text-(--ui-text-dimmed) mb-10">
          The real cost of bad data in the US
        </p>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-(--ui-border)">
          <div v-for="(val, i) in statValues" :key="i" class="text-center px-6">
            <div class="text-4xl lg:text-5xl font-black text-(--ui-text-highlighted) tabular-nums">
              {{ statPrefixes[i] }}{{ val }}{{ statSuffixes[i] }}
            </div>
            <div class="text-sm text-(--ui-text-dimmed) mt-2">{{ statLabels[i] }}</div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 px-6">
      <div class="max-w-5xl mx-auto text-center">
        <UBadge color="neutral" variant="soft" size="sm" class="mb-6 font-bold uppercase tracking-widest">
          The fragmentation tax
        </UBadge>
        <h2 class="text-4xl lg:text-5xl font-black text-(--ui-text-highlighted) mb-5 leading-tight">
          You're paying for three tools<br>when you need one.
        </h2>
        <p class="text-xl text-(--ui-text-muted) mb-16 max-w-2xl mx-auto leading-relaxed">
          US ops teams stitch together Smarty for address, a separate tool for email, and another for phone —
          managing three vendors, three invoices, three integrations.
        </p>

        <div class="flex flex-col lg:flex-row items-center justify-center gap-3 lg:gap-0">
          <template
            v-for="(tool, i) in [
              { icon: 'i-lucide-map-pin', name: 'Smarty', sub: 'Address only', price: '$50' },
              { icon: 'i-lucide-mail', name: 'Email tool', sub: 'Email only', price: '$40' },
              { icon: 'i-lucide-phone', name: 'Phone tool', sub: 'Phone only', price: '$30' },
            ]"
            :key="tool.name"
          >
            <div class="bg-(--ui-bg-elevated) border border-(--ui-border) rounded-2xl px-6 py-5 w-44 text-center">
              <div class="w-10 h-10 rounded-xl bg-(--ui-bg-accented) flex items-center justify-center mx-auto mb-3">
                <UIcon :name="tool.icon" class="w-5 h-5 text-(--ui-text-muted)" />
              </div>
              <div class="text-sm font-bold text-(--ui-text-highlighted)">{{ tool.name }}</div>
              <div class="text-xs text-(--ui-text-muted) mt-0.5">{{ tool.sub }}</div>
              <div class="mt-3 text-xl font-black text-(--ui-text-highlighted)">
                {{ tool.price }}<span class="text-xs font-normal text-(--ui-text-dimmed)">/mo</span>
              </div>
            </div>
            <div v-if="i < 2" class="text-2xl font-black text-(--ui-text-dimmed) lg:mx-4 my-1 lg:my-0">+</div>
          </template>

          <div class="flex flex-col items-center gap-1 text-(--ui-text-dimmed) mx-3">
            <div class="text-xs uppercase tracking-widest mb-1">vs</div>
            <UIcon name="i-lucide-arrow-right" class="w-7 h-7 text-primary-400 hidden lg:block" />
            <UIcon name="i-lucide-arrow-down" class="w-7 h-7 text-primary-400 lg:hidden" />
          </div>

          <div class="bg-primary-500/10 border border-primary-500/30 rounded-2xl px-7 py-6 w-52 text-center shadow-xl shadow-primary-500/10">
            <div class="w-11 h-11 rounded-xl bg-primary-500 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-primary-500/30">
              <UIcon name="i-lucide-shield-check" class="w-5 h-5 text-white" />
            </div>
            <div class="text-sm font-bold text-(--ui-text-highlighted)">DQE Validate</div>
            <div class="text-xs text-primary-400 font-semibold mt-0.5">Address + Email + Phone</div>
            <div class="mt-3 text-xl font-black text-success-400">
              From $19<span class="text-xs font-normal text-(--ui-text-dimmed)">/pack</span>
            </div>
            <div class="mt-1.5 text-xs font-bold text-success-400 flex items-center justify-center gap-1">
              <UIcon name="i-lucide-check" class="w-3 h-3" />One tool. One bill.
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="how" class="py-24 px-6 bg-(--ui-bg-elevated) border-y border-(--ui-border)">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-16">
          <UBadge color="primary" variant="soft" size="sm" class="mb-4 font-bold uppercase tracking-widest">How it works</UBadge>
          <h2 class="text-4xl font-black text-(--ui-text-highlighted) mb-4">From data to results in minutes.</h2>
          <p class="text-lg text-(--ui-text-muted)">No SFTP. No local software. No procurement cycle for entry tiers.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <div
            v-for="(step, i) in [
              { icon: 'i-lucide-upload-cloud', title: 'Upload or connect', desc: 'Drag-and-drop your CSV or connect via REST API. Google SSO signup — no friction, no wait.' },
              { icon: 'i-lucide-cpu', title: 'Validate instantly', desc: 'DQE checks every address, email, and phone record against live data sources in under 150ms per call.' },
              { icon: 'i-lucide-download', title: 'Get clean data', desc: 'Download corrected records or receive them via webhook. Results in minutes — not days via SFTP.' },
            ]"
            :key="i"
            v-motion :initial="{ opacity: 0, y: 20 }" :visible-once="{ opacity: 1, y: 0, transition: { duration: 500, delay: i * 120 } }"
            class="relative group"
          >
            <div class="absolute -top-5 -left-1 text-8xl font-black text-(--ui-text-highlighted)/[0.04] select-none pointer-events-none">{{ i + 1 }}</div>
            <div class="relative bg-(--ui-bg) border border-(--ui-border) rounded-2xl p-7 h-full group-hover:border-primary-500/30 group-hover:shadow-lg group-hover:shadow-primary-500/5 transition-all duration-300">
              <div class="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center mb-5 group-hover:bg-primary-500/20 transition-all">
                <UIcon :name="step.icon" class="w-6 h-6 text-primary-400" />
              </div>
              <h3 class="text-lg font-bold text-(--ui-text-highlighted) mb-2">{{ step.title }}</h3>
              <p class="text-sm text-(--ui-text-muted) leading-relaxed">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="compare" class="py-24 px-6">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <UBadge color="primary" variant="soft" size="sm" class="mb-4 font-bold uppercase tracking-widest">DQE vs Smarty</UBadge>
          <h2 class="text-4xl font-black text-(--ui-text-highlighted) mb-4 leading-tight">
            Smarty is a great address tool.<br>But what about the rest?
          </h2>
          <p class="text-lg text-(--ui-text-muted)">When you need email and phone validation too, Smarty stops. DQE doesn't.</p>
        </div>

        <div class="bg-(--ui-bg-elevated) border border-(--ui-border) rounded-2xl overflow-hidden shadow-xl">
          <div class="grid grid-cols-3 bg-(--ui-bg-muted) border-b border-(--ui-border)">
            <div class="px-6 py-4 text-xs font-bold text-(--ui-text-dimmed) uppercase tracking-widest">Feature</div>
            <div class="px-4 py-4 text-center">
              <div class="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/30 rounded-xl px-4 py-1.5">
                <UIcon name="i-lucide-shield-check" class="w-3.5 h-3.5 text-primary-400" />
                <span class="text-sm font-black text-primary-400">DQE Validate</span>
              </div>
            </div>
            <div class="px-4 py-4 text-center">
              <div class="inline-flex items-center gap-2 bg-(--ui-bg) border border-(--ui-border) rounded-xl px-4 py-1.5">
                <span class="text-sm font-semibold text-(--ui-text-muted)">Smarty</span>
              </div>
            </div>
          </div>

          <div class="divide-y divide-(--ui-border)">
            <div v-for="row in comparison" :key="row.feature" class="grid grid-cols-3 hover:bg-(--ui-bg-muted)/40 transition-colors">
              <div class="px-6 py-4">
                <div class="text-sm font-medium text-(--ui-text-highlighted)">{{ row.feature }}</div>
                <div class="text-xs text-(--ui-text-dimmed) mt-0.5">{{ row.note }}</div>
              </div>
              <div class="px-4 py-4 flex justify-center items-center">
                <div :class="['w-8 h-8 rounded-full flex items-center justify-center', row.dqe ? 'bg-success-500/10' : 'bg-error-500/10']">
                  <UIcon :name="row.dqe ? 'i-lucide-check' : 'i-lucide-x'" :class="['w-4 h-4', row.dqe ? 'text-success-400' : 'text-error-400']" />
                </div>
              </div>
              <div class="px-4 py-4 flex justify-center items-center">
                <div :class="['w-8 h-8 rounded-full flex items-center justify-center', row.smarty ? 'bg-success-500/10' : 'bg-error-500/10']">
                  <UIcon :name="row.smarty ? 'i-lucide-check' : 'i-lucide-x'" :class="['w-4 h-4', row.smarty ? 'text-success-400' : 'text-error-400']" />
                </div>
              </div>
            </div>
          </div>

          <div class="px-6 py-5 bg-primary-500/5 border-t border-(--ui-border) flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p class="text-sm text-(--ui-text-muted)">DQE wins on <span class="text-success-400 font-bold">4 of 6</span> features Smarty can't match.</p>
            <UButton size="sm" class="bg-primary-500 hover:bg-primary-600 text-white font-semibold flex-shrink-0 transition-colors">
              Switch to DQE Free
              <UIcon name="i-lucide-arrow-right" class="w-4 h-4 ml-1.5" />
            </UButton>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 px-6 bg-(--ui-bg-elevated) border-y border-(--ui-border)">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-12">
          <UBadge color="primary" variant="soft" size="sm" class="mb-4 font-bold uppercase tracking-widest">Use cases</UBadge>
          <h2 class="text-4xl font-black text-(--ui-text-highlighted)">Built for your industry.</h2>
        </div>

        <div class="flex flex-wrap justify-center gap-2 mb-10">
          <button
            v-for="ind in industries"
            :key="ind.id"
            :class="[
              'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200',
              activeIndustry === ind.id
                ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                : 'bg-(--ui-bg) border border-(--ui-border) text-(--ui-text-muted) hover:border-primary-500/30 hover:text-primary-400',
            ]"
            @click="activeIndustry = ind.id"
          >
            <UIcon :name="ind.icon" class="w-4 h-4" />{{ ind.label }}
          </button>
        </div>

        <template v-for="ind in industries" :key="ind.id">
          <div v-show="activeIndustry === ind.id" class="bg-(--ui-bg) border border-(--ui-border) rounded-2xl overflow-hidden shadow-lg">
            <div class="grid md:grid-cols-2">
              <div class="p-8 lg:p-10">
                <div class="text-5xl font-black bg-gradient-to-r from-primary-300 to-primary-600 bg-clip-text text-transparent mb-1">{{ ind.stat }}</div>
                <div class="text-sm text-(--ui-text-muted) mb-6">{{ ind.statLabel }}</div>
                <h3 class="text-2xl font-black text-(--ui-text-highlighted) mb-5">{{ ind.headline }}</h3>
                <ul class="space-y-3">
                  <li v-for="bullet in ind.bullets" :key="bullet" class="flex items-start gap-3 text-sm text-(--ui-text-muted)">
                    <UIcon name="i-lucide-check-circle-2" class="w-4 h-4 text-success-400 mt-0.5 flex-shrink-0" />
                    {{ bullet }}
                  </li>
                </ul>
                <UButton size="sm" variant="outline" class="mt-8 border-primary-500/30 text-primary-400 hover:bg-primary-500/5">
                  See {{ ind.label }} case study
                  <UIcon name="i-lucide-arrow-right" class="w-3.5 h-3.5 ml-1.5" />
                </UButton>
              </div>
              <div class="bg-primary-500/5 border-l border-(--ui-border) p-8 lg:p-10 flex items-center justify-center">
                <div class="text-center">
                  <div class="w-20 h-20 rounded-2xl bg-primary-500 flex items-center justify-center mx-auto mb-5 shadow-2xl shadow-primary-500/25">
                    <UIcon :name="ind.icon" class="w-10 h-10 text-white" />
                  </div>
                  <div class="text-xs font-bold text-(--ui-text-dimmed) uppercase tracking-widest">Key metric</div>
                  <div class="text-4xl font-black text-(--ui-text-highlighted) mt-2">{{ ind.stat }}</div>
                  <div class="text-sm text-(--ui-text-dimmed) mt-1 max-w-[160px] mx-auto leading-snug">{{ ind.statLabel }}</div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </section>

    <section id="pricing" class="py-24 px-6">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-16">
          <UBadge color="primary" variant="soft" size="sm" class="mb-4 font-bold uppercase tracking-widest">Pricing</UBadge>
          <h2 class="text-4xl font-black text-(--ui-text-highlighted) mb-4">Simple. Self-serve. No sales call.</h2>
          <p class="text-lg text-(--ui-text-muted)">Start free. Pay as you grow. No SFTP, no contracts under $500K.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-6 items-start">
          <div
            v-for="plan in pricingPlans"
            :key="plan.id"
            :class="[
              'relative bg-(--ui-bg-elevated) border rounded-2xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-1',
              plan.highlight ? 'border-primary-500/40 shadow-2xl shadow-primary-500/15 md:scale-[1.03] md:-mt-2' : 'border-(--ui-border) hover:border-primary-500/20',
            ]"
          >
            <div v-if="plan.highlight" class="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <div class="bg-primary-500 text-white text-xs font-black px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap">Most Popular</div>
            </div>

            <div class="mb-6">
              <div class="flex items-center gap-3 mb-4">
                <div :class="['w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', plan.highlight ? 'bg-primary-500' : 'bg-(--ui-bg-accented)']">
                  <UIcon :name="plan.icon" :class="['w-5 h-5', plan.highlight ? 'text-white' : 'text-(--ui-text-muted)']" />
                </div>
                <div>
                  <div class="font-black text-(--ui-text-highlighted)">{{ plan.name }}</div>
                  <UBadge size="xs" :color="plan.highlight ? 'primary' : 'neutral'" variant="soft" class="font-semibold">{{ plan.tag }}</UBadge>
                </div>
              </div>
              <div class="text-3xl font-black text-(--ui-text-highlighted)">
                {{ plan.price }}<span class="text-base font-normal text-(--ui-text-dimmed)">{{ plan.period }}</span>
              </div>
              <p class="text-sm text-(--ui-text-muted) mt-2 leading-relaxed">{{ plan.description }}</p>
            </div>

            <ul class="space-y-3 mb-8 flex-1">
              <li v-for="f in plan.features" :key="f" class="flex items-center gap-2.5 text-sm text-(--ui-text-muted)">
                <UIcon name="i-lucide-check" :class="['w-4 h-4 flex-shrink-0', plan.highlight ? 'text-primary-400' : 'text-success-400']" />
                {{ f }}
              </li>
            </ul>

            <UButton
              size="md"
              :class="[
                'w-full font-bold',
                plan.highlight
                  ? 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/25 transition-colors'
                  : 'border border-(--ui-border) text-(--ui-text-muted) hover:border-primary-500/30 hover:text-primary-400 bg-transparent transition-all',
              ]"
            >{{ plan.cta }}</UButton>
          </div>
        </div>

        <p class="text-center text-sm text-(--ui-text-dimmed) mt-8 flex items-center justify-center gap-2">
          <UIcon name="i-lucide-credit-card" class="w-4 h-4" />
          No credit card required for free tier · Stripe-powered payments · Cancel anytime
        </p>
      </div>
    </section>

    <section class="py-24 px-6 bg-(--ui-bg-elevated) border-y border-(--ui-border)">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-14">
          <UBadge color="primary" variant="soft" size="sm" class="mb-4 font-bold uppercase tracking-widest">Testimonials</UBadge>
          <h2 class="text-4xl font-black text-(--ui-text-highlighted)">What US teams are saying.</h2>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <div
            v-for="t in testimonials"
            :key="t.name"
            v-motion :initial="{ opacity: 0, y: 20 }" :visible-once="{ opacity: 1, y: 0, transition: { duration: 500 } }"
            class="bg-(--ui-bg) border border-(--ui-border) rounded-2xl p-6 flex flex-col hover:border-primary-500/25 hover:shadow-lg hover:shadow-primary-500/5 transition-all duration-300"
          >
            <div class="flex gap-1 mb-4">
              <UIcon v-for="i in 5" :key="i" name="i-lucide-star" class="w-4 h-4 text-warning-400 fill-warning-400" />
            </div>
            <p class="text-sm text-(--ui-text-muted) leading-relaxed mb-6 flex-1">"{{ t.quote }}"</p>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {{ t.initials }}
              </div>
              <div class="min-w-0">
                <div class="text-sm font-bold text-(--ui-text-highlighted) truncate">{{ t.name }}</div>
                <div class="text-xs text-(--ui-text-dimmed) truncate">{{ t.role }} · {{ t.company }}</div>
              </div>
              <UBadge size="xs" color="neutral" variant="soft" class="ml-auto flex-shrink-0 font-semibold text-xs">{{ t.industry }}</UBadge>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="developers" class="py-24 px-6">
      <div class="max-w-5xl mx-auto">
        <div class="bg-(--ui-bg-elevated) border border-(--ui-border) rounded-3xl overflow-hidden shadow-2xl">
          <div class="grid lg:grid-cols-2">
            <div class="p-10 lg:p-12 flex flex-col justify-center">
              <UBadge color="primary" variant="soft" size="sm" class="mb-5 font-bold uppercase tracking-widest w-fit">Developers</UBadge>
              <h2 class="text-3xl font-black text-(--ui-text-highlighted) mb-4 leading-tight">
                Built API-first.<br>Documented for humans.
              </h2>
              <p class="text-base text-(--ui-text-muted) mb-7 leading-relaxed">
                One REST API call validates address, email, and phone simultaneously. Under 150ms. 10B+ queries/year capacity.
              </p>
              <ul class="space-y-3 mb-8">
                <li v-for="item in ['Clear docs with code examples in 5 languages', 'Sandbox environment — no production data needed', 'Pay-as-you-go credit packs, no sales call', 'LLM integration guides (Claude, ChatGPT, Perplexity)']" :key="item" class="flex items-center gap-2.5 text-sm text-(--ui-text-muted)">
                  <UIcon name="i-lucide-check-circle-2" class="w-4 h-4 text-success-400 flex-shrink-0" />{{ item }}
                </li>
              </ul>
              <div class="flex flex-wrap gap-3">
                <UButton size="sm" class="bg-primary-500 hover:bg-primary-600 text-white font-semibold transition-colors">
                  Read the Docs<UIcon name="i-lucide-external-link" class="w-3.5 h-3.5 ml-1.5" />
                </UButton>
                <UButton size="sm" variant="ghost" class="text-(--ui-text-muted) hover:text-(--ui-text-highlighted)">
                  GitHub<UIcon name="i-lucide-github" class="w-3.5 h-3.5 ml-1.5" />
                </UButton>
              </div>
            </div>

            <div class="bg-neutral-950 border-l border-(--ui-border) p-8 font-mono text-sm overflow-hidden">
              <div class="flex items-center gap-2 mb-6">
                <div class="w-3 h-3 rounded-full bg-error-500/70" />
                <div class="w-3 h-3 rounded-full bg-warning-500/70" />
                <div class="w-3 h-3 rounded-full bg-success-500/70" />
                <span class="ml-3 text-xs text-neutral-500 font-sans">validate.js</span>
              </div>
              <pre class="text-neutral-300 leading-7 overflow-x-auto whitespace-pre-wrap break-words"><code><span class="text-neutral-400">const</span> <span class="text-neutral-100">res</span> <span class="text-neutral-500">=</span> <span class="text-neutral-400">await</span> <span class="text-primary-400">fetch</span><span class="text-neutral-400">(</span>
  <span class="text-warning-400">'https://api.dqe.software/v1/validate'</span><span class="text-neutral-400">,</span>
  <span class="text-neutral-400">{</span>
    method<span class="text-neutral-400">:</span> <span class="text-warning-400">'POST'</span><span class="text-neutral-400">,</span>
    headers<span class="text-neutral-400">:</span> <span class="text-neutral-400">{</span>
      <span class="text-warning-400">'Authorization'</span><span class="text-neutral-400">:</span> <span class="text-warning-400">`Bearer <span class="text-neutral-300">${apiKey}</span>`</span>
    <span class="text-neutral-400">},</span>
    body<span class="text-neutral-400">:</span> <span class="text-neutral-200">JSON</span><span class="text-neutral-400">.</span><span class="text-primary-400">stringify</span><span class="text-neutral-400">({</span>
      address<span class="text-neutral-400">:</span> <span class="text-warning-400">'123 Main St, New York NY'</span><span class="text-neutral-400">,</span>
      email<span class="text-neutral-400">:</span>   <span class="text-warning-400">'john@example.com'</span><span class="text-neutral-400">,</span>
      phone<span class="text-neutral-400">:</span>   <span class="text-warning-400">'+12125550198'</span>
    <span class="text-neutral-400">})</span>
  <span class="text-neutral-400">}</span>
<span class="text-neutral-400">)</span>

<span class="text-neutral-600">// ✓ Response in &lt;150ms</span>
<span class="text-neutral-400">const</span> <span class="text-neutral-100">{ address, email, phone }</span>
  <span class="text-neutral-500">=</span> <span class="text-neutral-400">await</span> res<span class="text-neutral-400">.</span><span class="text-primary-400">json</span><span class="text-neutral-400">()</span></code></pre>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 px-6 relative overflow-hidden">
      <div class="absolute inset-0 bg-primary-500/5 pointer-events-none" />
      <div class="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary-500/8 rounded-full blur-3xl pointer-events-none" />

      <div class="relative max-w-3xl mx-auto text-center">
        <div class="w-16 h-16 rounded-2xl bg-primary-500 flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-primary-500/30">
          <UIcon name="i-lucide-shield-check" class="w-8 h-8 text-white" />
        </div>
        <h2 class="text-5xl font-black text-(--ui-text-highlighted) mb-6 leading-tight">
          Start validating in<br>
          <span class="bg-gradient-to-r from-primary-300 to-primary-600 bg-clip-text text-transparent">5 minutes.</span>
        </h2>
        <p class="text-xl text-(--ui-text-muted) mb-10 leading-relaxed">
          100 free validations. No credit card. No SFTP. No sales call.<br>Just clean data — in minutes.
        </p>
        <div class="flex flex-wrap gap-4 justify-center">
          <UButton size="xl" class="bg-primary-500 hover:bg-primary-600 text-white font-black shadow-2xl shadow-primary-500/30 transition-colors px-10 text-lg">
            <UIcon name="i-lucide-zap" class="w-5 h-5 mr-2" />Validate 100 Records Free
          </UButton>
          <UButton size="xl" variant="outline" class="border-(--ui-border) text-(--ui-text-muted) hover:border-primary-500/40 hover:text-primary-400 transition-all px-8">
            Compare DQE vs Smarty
          </UButton>
        </div>
        <p class="text-sm text-(--ui-text-dimmed) mt-7 flex items-center justify-center gap-4">
          <span class="flex items-center gap-1.5"><UIcon name="i-lucide-shield-check" class="w-4 h-4 text-success-400" />USPS CASS Certified</span>
          <span class="flex items-center gap-1.5"><UIcon name="i-lucide-lock" class="w-4 h-4 text-success-400" />SOC 2 Type II</span>
          <span class="flex items-center gap-1.5"><UIcon name="i-lucide-users" class="w-4 h-4 text-success-400" />800+ companies</span>
        </p>
      </div>
    </section>

    <footer class="border-t border-(--ui-border) bg-(--ui-bg-elevated) py-14 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="grid md:grid-cols-4 gap-10 mb-10">
          <div class="md:col-span-2">
            <div class="flex items-center gap-2.5 mb-4">
              <div class="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center">
                <UIcon name="i-lucide-shield-check" class="w-4 h-4 text-white" />
              </div>
              <span class="font-extrabold text-lg text-(--ui-text-highlighted)">DQE Validate</span>
            </div>
            <p class="text-sm text-(--ui-text-muted) max-w-xs leading-relaxed mb-5">
              The all-in-one Address, Email, and Phone validation platform built for US self-serve buyers.
            </p>
            <div class="flex flex-wrap items-center gap-2">
              <span class="text-xs px-2.5 py-1 rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20 font-bold">USPS CASS Certified</span>
              <span class="text-xs px-2.5 py-1 rounded-full bg-success-500/10 text-success-400 border border-success-500/20 font-bold">SOC 2 Type II</span>
              <span class="text-xs px-2.5 py-1 rounded-full bg-(--ui-bg-accented) text-(--ui-text-muted) border border-(--ui-border) font-bold">CCPA Compliant</span>
            </div>
          </div>
          <div>
            <div class="text-sm font-bold text-(--ui-text-highlighted) mb-4">Product</div>
            <ul class="space-y-2.5 text-sm text-(--ui-text-muted)">
              <li><a href="#" class="hover:text-primary-400 transition-colors">Address Validation</a></li>
              <li><a href="#" class="hover:text-primary-400 transition-colors">Email Validation</a></li>
              <li><a href="#" class="hover:text-primary-400 transition-colors">Phone Validation</a></li>
              <li><a href="#" class="hover:text-primary-400 transition-colors">API Documentation</a></li>
              <li><a href="#pricing" class="hover:text-primary-400 transition-colors">Pricing</a></li>
            </ul>
          </div>
          <div>
            <div class="text-sm font-bold text-(--ui-text-highlighted) mb-4">Company</div>
            <ul class="space-y-2.5 text-sm text-(--ui-text-muted)">
              <li><a href="#compare" class="hover:text-primary-400 transition-colors">DQE vs Smarty</a></li>
              <li><a href="#" class="hover:text-primary-400 transition-colors">Case Studies</a></li>
              <li><a href="#" class="hover:text-primary-400 transition-colors">Contact US Team</a></li>
              <li><a href="#" class="hover:text-primary-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" class="hover:text-primary-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div class="border-t border-(--ui-border) pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-(--ui-text-dimmed)">
          <span>© {{ new Date().getFullYear() }} DQE Software. All rights reserved.</span>
          <span>US-based infrastructure · GDPR compliant · CCPA compliant</span>
        </div>
      </div>
    </footer>

    <div class="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <Transition name="theme-panel">
        <div
          v-if="themeOpen"
          class="w-80 bg-(--ui-bg-elevated) border border-(--ui-border) rounded-2xl shadow-2xl overflow-hidden"
        >
          <div class="flex items-center justify-between px-4 pt-4 pb-3 border-b border-(--ui-border)">
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-palette" class="w-4 h-4 text-primary-400" />
              <span class="text-sm font-bold text-(--ui-text-highlighted)">Color Theme</span>
            </div>
            <button class="text-(--ui-text-dimmed) hover:text-(--ui-text-highlighted) transition-colors" @click="themeOpen = false">
              <UIcon name="i-lucide-x" class="w-4 h-4" />
            </button>
          </div>

          <div class="flex border-b border-(--ui-border) px-4 gap-0">
            <button
              v-for="tab in [
                { id: 'plates', label: 'Plates' },
                { id: 'colors', label: 'Colors' },
                { id: 'custom', label: 'Custom' },
              ]"
              :key="tab.id"
              :class="[
                'py-2.5 px-3 text-xs font-semibold transition-all border-b-2 -mb-px',
                themeTab === tab.id
                  ? 'border-primary-500 text-primary-400'
                  : 'border-transparent text-(--ui-text-dimmed) hover:text-(--ui-text-muted)',
              ]"
              @click="themeTab = (tab.id as any)"
            >
              {{ tab.label }}
            </button>
          </div>

          <div v-if="themeTab === 'plates'" class="p-3">
            <div class="grid grid-cols-3 gap-2">
              <button
                v-for="p in plates"
                :key="p.name"
                :class="[
                  'relative flex flex-col items-center gap-1.5 p-2.5 rounded-xl border transition-all',
                  activePlate?.name === p.name
                    ? 'border-primary-500 bg-primary-500/8'
                    : 'border-(--ui-border) hover:border-primary-500/40 hover:bg-(--ui-bg-accented)',
                ]"
                @click="applyPlate(p)"
              >
                <div v-if="activePlate?.name === p.name" class="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full bg-primary-500 flex items-center justify-center">
                  <UIcon name="i-lucide-check" class="w-2 h-2 text-white" />
                </div>
                <div class="flex items-center gap-1">
                  <div class="w-5 h-5 rounded-full shadow-sm ring-1 ring-(--ui-border)" :style="{ backgroundColor: colorVar(p.primary) }" />
                  <div class="w-3 h-3 rounded-full ring-1 ring-(--ui-border)" :style="{ backgroundColor: colorVar(p.neutral) }" />
                </div>
                <span class="text-[11px] font-semibold text-(--ui-text-muted) leading-none">{{ p.name }}</span>
              </button>
            </div>
          </div>

          <div v-else-if="themeTab === 'colors'" class="p-3 space-y-3 max-h-72 overflow-y-auto">
            <div v-for="role in colorRoles" :key="role.key">
              <div class="flex items-center gap-2 mb-1.5">
                <span class="text-xs font-bold text-(--ui-text-highlighted)">{{ role.label }}</span>
                <span
                  class="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                  :style="customActive[role.key]
                    ? { backgroundColor: (customColors[role.key] ?? '#7c3aed') + '30', color: customColors[role.key] ?? '#7c3aed' }
                    : { backgroundColor: colorVar(getColor(role.key)) + '30', color: colorVar(getColor(role.key)) }"
                >{{ customActive[role.key] ? (customColors[role.key] ?? '') : getColor(role.key) }}</span>
              </div>
              <div class="flex flex-wrap gap-1.5 items-center">
                <button
                  v-for="color in role.options"
                  :key="color"
                  :title="color"
                  :class="[
                    'w-6 h-6 rounded-full transition-all hover:scale-110 shadow-sm',
                    !customActive[role.key] && getColor(role.key) === color ? 'ring-2 ring-offset-1 ring-(--ui-border) scale-110' : '',
                  ]"
                  :style="{ backgroundColor: colorVar(color) }"
                  @click="setColor(role.key, color)"
                >
                  <UIcon v-if="!customActive[role.key] && getColor(role.key) === color" name="i-lucide-check" class="w-3 h-3 text-white m-auto drop-shadow" />
                </button>

                <UPopover :ui="{ content: 'p-0 overflow-hidden' }">
                  <button
                    :title="customActive[role.key] ? (customColors[role.key] ?? 'Custom') : 'Pick custom color'"
                    :class="[
                      'w-6 h-6 rounded-full transition-all hover:scale-110 shadow-sm flex items-center justify-center',
                      customActive[role.key]
                        ? 'ring-2 ring-offset-1 ring-(--ui-border) scale-110'
                        : 'border-2 border-dashed border-(--ui-border) bg-(--ui-bg-accented)',
                    ]"
                    :style="customActive[role.key] ? { backgroundColor: customColors[role.key] ?? '#7c3aed' } : {}"
                  >
                    <UIcon v-if="customActive[role.key]" name="i-lucide-check" class="w-3 h-3 text-white drop-shadow" />
                    <UIcon v-else name="i-lucide-plus" class="w-3 h-3 text-(--ui-text-dimmed)" />
                  </button>
                  <template #content>
                    <div class="p-3">
                      <UColorPicker
                        :model-value="customColors[role.key] ?? '#7c3aed'"
                        @update:model-value="(v: string) => applyHexToRole(role.key, v)"
                      />
                    </div>
                  </template>
                </UPopover>
              </div>
            </div>
          </div>

          <div v-else-if="themeTab === 'custom'" class="p-4 space-y-4">
            <div class="text-xs text-(--ui-text-dimmed) leading-relaxed">
              Drag to pick any hue for the primary colour. Overrides the plate setting.
            </div>
            <div>
              <div class="flex items-center justify-between text-xs text-(--ui-text-dimmed) mb-2">
                <span>Primary hue</span>
                <span class="font-mono font-bold text-primary-400">{{ customHue }}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                :value="customHue"
                class="hue-slider w-full h-3 rounded-full appearance-none cursor-pointer"
                @input="onHueSlider"
              />
            </div>
            <div class="grid grid-cols-11 gap-0.5 rounded-lg overflow-hidden h-5">
              <div v-for="[shade, l, c] in shadeTemplate" :key="shade"
                :style="{ backgroundColor: `oklch(${l} ${c} ${customHue})` }"
              />
            </div>
          </div>
        </div>
      </Transition>

      <button
        :class="[
          'w-12 h-12 rounded-2xl border shadow-xl flex items-center justify-center transition-all',
          themeOpen
            ? 'bg-primary-500 border-primary-500 text-white shadow-primary-500/30'
            : 'bg-(--ui-bg-elevated) border-(--ui-border) text-(--ui-text-muted) hover:text-primary-400 hover:border-primary-500/30',
        ]"
        @click="themeOpen = !themeOpen"
      >
        <UIcon name="i-lucide-palette" class="w-5 h-5" />
      </button>
    </div>

  </div>
</template>

<style scoped>
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.theme-panel-enter-active,
.theme-panel-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}
.theme-panel-enter-from,
.theme-panel-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.97);
}

.fill-warning-400 {
  fill: rgb(var(--color-warning-400));
}

.hue-slider {
  background: linear-gradient(
    to right,
    oklch(0.606 0.237 0),
    oklch(0.606 0.237 60),
    oklch(0.606 0.237 120),
    oklch(0.606 0.237 180),
    oklch(0.606 0.237 240),
    oklch(0.606 0.237 300),
    oklch(0.606 0.237 360)
  );
}
.hue-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: white;
  border: 2px solid rgba(0,0,0,0.2);
  box-shadow: 0 1px 4px rgba(0,0,0,0.3);
  cursor: pointer;
}
.hue-slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: white;
  border: 2px solid rgba(0,0,0,0.2);
  box-shadow: 0 1px 4px rgba(0,0,0,0.3);
  cursor: pointer;
}
</style>
