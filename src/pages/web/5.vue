<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useHead, useSeoMeta } from '@unhead/vue'
import { useIntersectionObserver } from '@vueuse/core'

definePage({ meta: { layout: 'landing' } })

useSeoMeta({
  title:       'DQE — Validate Every Address, Email & Phone. One API.',
  description: 'USPS CASS-certified address validation + email + phone in a single API call. <150ms. Self-serve. 100 free records.',
  ogTitle:     'DQE — All-in-One Data Validation',
  ogDescription: 'Replace Smarty + 2 vendors with one self-serve API. 100 free records. No card needed.',
  ogType:      'website',
  robots:      'index, follow',
})

useHead({
  htmlAttrs: { lang: 'en' },
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap',
    },
  ],
})

const scrolled = ref(false)
const onScroll = () => { scrolled.value = window.scrollY > 60 }
onMounted(()  => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const heroStatRef  = ref<HTMLElement | null>(null)
const displayValue = ref(0)
let animated = false

useIntersectionObserver(heroStatRef, ([entry]) => {
  if (!entry.isIntersecting || animated) return
  animated = true
  const target   = 849.9
  const duration = 2200
  const start    = performance.now()
  function tick(now: number) {
    const t = Math.min((now - start) / duration, 1)
    const e = 1 - Math.pow(1 - t, 3)
    displayValue.value = Math.round(e * target * 10) / 10
    if (t < 1) requestAnimationFrame(tick)
    else displayValue.value = target
  }
  requestAnimationFrame(tick)
})

type TermTab = 'address' | 'email' | 'phone'
const activeTermTab = ref<TermTab>('address')

const termPayloads: Record<TermTab, string[]> = {
  address: [
    '$ curl -X POST https://api.dqe.io/v1/validate \\',
    '    -H "Authorization: Bearer dqe_live_k3x..." \\',
    "    -d '{\"address\": \"350 5th Ave, New York NY\"}'",
  ],
  email: [
    '$ curl -X POST https://api.dqe.io/v1/validate \\',
    '    -H "Authorization: Bearer dqe_live_k3x..." \\',
    "    -d '{\"email\": \"john@company.com\"}'",
  ],
  phone: [
    '$ curl -X POST https://api.dqe.io/v1/validate \\',
    '    -H "Authorization: Bearer dqe_live_k3x..." \\',
    "    -d '{\"phone\": \"+1 212 555 0101\"}'",
  ],
}

const termResponses: Record<TermTab, string> = {
  address: `{
  "address": {
    "status":       "valid",
    "standardized": "350 5TH AVE, NEW YORK, NY 10118-0110",
    "dpv":          "confirmed",
    "zip4":         "10118-0110",
    "county":       "New York County",
    "rdi":          "Commercial"
  },
  "credits_used": 1,
  "response_ms":  112
}`,
  email: `{
  "email": {
    "status":     "deliverable",
    "risk":       "low",
    "mx":         "found",
    "smtp":       "passed",
    "disposable": false,
    "role_based": false
  },
  "credits_used": 1,
  "response_ms":  98
}`,
  phone: `{
  "phone": {
    "status":  "active",
    "type":    "landline",
    "carrier": "Verizon Communications",
    "location":"New York, NY",
    "tcpa":    "safe"
  },
  "credits_used": 1,
  "response_ms":  87
}`,
}

const typedLines    = ref<string[]>([])
const showResponse  = ref(false)
const isTyping      = ref(false)

async function runTerminal(tab: TermTab = activeTermTab.value) {
  if (isTyping.value) return
  isTyping.value   = true
  typedLines.value = []
  showResponse.value = false

  for (const line of termPayloads[tab]) {
    let typed = ''
    typedLines.value.push('')
    for (const char of line) {
      typed += char
      typedLines.value[typedLines.value.length - 1] = typed
      await new Promise(r => setTimeout(r, 16))
    }
    await new Promise(r => setTimeout(r, 50))
  }

  await new Promise(r => setTimeout(r, 320))
  showResponse.value = true
  isTyping.value     = false
}

function switchTab(tab: TermTab) {
  activeTermTab.value = tab
  runTerminal(tab)
}

onMounted(() => setTimeout(() => runTerminal('address'), 800))

const captureEmail     = ref('')
const captureSubmitted = ref(false)

function submitCapture() {
  if (!captureEmail.value.includes('@')) return
  captureSubmitted.value = true
}

const navLinks = ['Product', 'Pricing', 'Docs', 'Compare']

const tickerItems = [
  'USPS CASS Certified',
  'SOC 2 Type II',
  '<150ms p95',
  '240+ countries',
  'GDPR Compliant',
  '99.99% uptime',
  '10B+ queries / year',
  'TCPA Ready',
  'CCPA Compliant',
  'No SFTP',
  '5-min setup',
]

const statsCards = [
  {
    num:   '$849.9B',
    label: 'lost to e-commerce returns\ndriven by address errors (US, 2026)',
    src:   'US Census / NRF',
  },
  {
    num:   '$1.47',
    label: 'average base cost per\nfailed delivery attempt',
    src:   'Last Mile Consortium',
  },
  {
    num:   '19.3%',
    label: 'of US online orders\nare returned — many avoidable',
    src:   'NRF 2026',
  },
  {
    num:   '$3.1T',
    label: 'lost annually in the US\ndue to poor data quality',
    src:   'IBM / Gartner',
  },
]

const comparisonRows = [
  { feature: 'Address validation',         dqe: true,  smarty: true,  melissa: true  },
  { feature: 'Email validation',           dqe: true,  smarty: false, melissa: true  },
  { feature: 'Phone validation',           dqe: true,  smarty: false, melissa: true  },
  { feature: 'Single API call (all 3)',    dqe: true,  smarty: false, melissa: false },
  { feature: 'Self-serve signup',          dqe: true,  smarty: true,  melissa: false },
  { feature: 'Credit card billing',        dqe: true,  smarty: true,  melissa: false },
  { feature: 'Free trial (no card)',       dqe: true,  smarty: true,  melissa: false },
  { feature: 'Under 5-min setup',         dqe: true,  smarty: true,  melissa: false },
  { feature: '<150ms API response',        dqe: true,  smarty: true,  melissa: false },
  { feature: 'USPS CASS certified',        dqe: true,  smarty: true,  melissa: true  },
  { feature: '240+ country coverage',      dqe: true,  smarty: false, melissa: true  },
  { feature: 'LLM integration guides',     dqe: true,  smarty: false, melissa: false },
  { feature: 'No procurement process',     dqe: true,  smarty: true,  melissa: false },
]

const howSteps = [
  {
    num:  '01',
    title:'Sign up free',
    desc: 'Business email. Google SSO. No card. Account live in 60 seconds.',
    code: `# Your API key is in the dashboard\nexport DQE_KEY="dqe_live_k3x9..."`,
  },
  {
    num:  '02',
    title:'Drop in your API key',
    desc: 'One line in your config. Works with every stack.',
    code: `const dqe = new DQE(process.env.DQE_KEY)\n// Node · Python · PHP · Go · Ruby · REST`,
  },
  {
    num:  '03',
    title:'Validate',
    desc: 'Address + email + phone in a single call. Results in milliseconds.',
    code: `await dqe.validate({\n  address, email, phone\n})\n// response_ms: 112`,
  },
]

const plans = [
  {
    name:     'Starter',
    price:    'Free',
    sub:      'forever',
    desc:     'For evaluation and small teams.',
    features: ['100 validations / month', 'All 3 channels', 'REST API + CSV', 'Community support'],
    cta:      'Start free',
    lime:     false,
  },
  {
    name:     'Verify',
    price:    '$99',
    sub:      '/ month',
    desc:     'For teams who need volume and automation.',
    features: ['10,000 validations / month', 'All 3 channels', 'Webhooks + batch', 'Email support', 'Credits never expire'],
    cta:      'Start free trial',
    lime:     true,
    tag:      'Most popular',
  },
  {
    name:     'Advanced',
    price:    'Custom',
    sub:      'talk to us',
    desc:     'For high-volume and enterprise deployments.',
    features: ['Unlimited validations', 'SLA guarantee', 'CRM integrations', 'Dedicated CSM', 'SOC 2 BAA available'],
    cta:      'Contact sales',
    lime:     false,
  },
]
</script>

<template>
  <div class="page-root">

    <header class="nav-bar" :class="{ 'nav-bar--scrolled': scrolled }">
      <div class="nav-inner">
        <a href="/" class="wordmark">DQE</a>

        <nav class="nav-links">
          <a v-for="l in navLinks" :key="l" :href="`#${l.toLowerCase()}`" class="nav-link">
            {{ l }}
          </a>
        </nav>

        <a href="#capture" class="cta-btn">
          Start free <span class="cta-arrow">→</span>
        </a>
      </div>
    </header>

    <section class="hero">
      <div class="container">

        <p class="kicker">
          <span class="kicker-dot" />
          All-in-one · Self-serve · USPS CASS Certified
        </p>

        <h1 class="hero-headline">
          Validate every address,<br />
          email, and phone.<br />
          <em>In one call.</em>
        </h1>

        <p class="hero-sub">
          The only self-serve API that combines postal address (USPS CASS), email, and phone
          verification in a single request — replacing Smarty, ZeroBounce, and your phone tool
          with one key. Under 150ms. No SFTP. No sales cycle.
        </p>

        <div class="hero-ctas">
          <a href="#capture" class="btn-primary">
            Get 100 free records →
          </a>
          <a href="/developers" class="btn-secondary">
            <span class="mono">View API docs</span>
          </a>
        </div>

        <div ref="heroStatRef" class="hero-stat-box">
          <div class="hero-stat-num">
            ${{ displayValue.toFixed(1) }}B
          </div>
          <div class="hero-stat-label">
            lost annually to bad US e-commerce data.<br />
            <span class="mono text-xs">Address errors alone drive 19.3% of all returns.</span>
          </div>
        </div>

      </div>
    </section>

    <div class="ticker-wrap">
      <div class="ticker-track">
        <span
          v-for="(item, i) in [...tickerItems, ...tickerItems, ...tickerItems]"
          :key="`t-${i}`"
          class="ticker-item"
        >
          {{ item }}
          <span class="ticker-sep">·</span>
        </span>
      </div>
    </div>

    <section id="product" class="section">
      <div class="container">
        <div class="section-label">API Terminal</div>
        <h2 class="section-headline">
          Three validations.<br /><em>One round trip.</em>
        </h2>

        <div class="terminal-wrap">

          <div class="term-tabs">
            <button
              v-for="tab in (['address','email','phone'] as TermTab[])"
              :key="tab"
              class="term-tab"
              :class="{ 'term-tab--active': activeTermTab === tab }"
              @click="switchTab(tab)"
            >
              <span class="mono">{{ tab }}</span>
            </button>
            <div class="term-tab-spacer" />
            <span class="term-badge mono">POST /v1/validate</span>
          </div>

          <div class="term-body">

            <div class="term-pane">
              <div class="term-pane-label mono">request</div>
              <div class="term-lines">
                <div
                  v-for="(line, i) in typedLines"
                  :key="i"
                  class="term-line mono"
                >{{ line }}<span v-if="i === typedLines.length - 1 && isTyping" class="cursor" /></div>
              </div>
            </div>

            <div class="term-divider" />

            <Transition name="term-response">
              <div v-if="showResponse" class="term-pane">
                <div class="term-pane-label mono">
                  response
                  <span class="term-ok mono">200 OK · {{ activeTermTab === 'phone' ? '87' : activeTermTab === 'email' ? '98' : '112' }}ms</span>
                </div>
                <pre class="term-json mono">{{ termResponses[activeTermTab] }}</pre>
              </div>
            </Transition>

            <div v-if="!showResponse" class="term-pane term-pane--waiting">
              <div class="term-pane-label mono">response</div>
              <div class="term-waiting mono">waiting...</div>
            </div>

          </div>

          <div class="term-footer">
            <button class="term-replay mono" @click="runTerminal(activeTermTab)">
              ↺ replay
            </button>
            <span class="term-credit mono">1 credit · all 3 channels available</span>
          </div>

        </div>
      </div>
    </section>

    <section class="section section--ink">
      <div class="container">
        <div class="section-label section-label--paper">The problem</div>
        <h2 class="section-headline section-headline--paper">
          Bad data is a<br /><em>P&amp;L problem.</em>
        </h2>

        <div class="stats-grid">
          <div
            v-for="(card, i) in statsCards"
            :key="i"
            class="stat-card"
          >
            <div class="stat-num">{{ card.num }}</div>
            <div class="stat-label">{{ card.label }}</div>
            <div class="stat-src mono">Source: {{ card.src }}</div>
          </div>
        </div>
      </div>
    </section>

    <section id="compare" class="section">
      <div class="container">
        <div class="section-label">Compare</div>
        <h2 class="section-headline">
          DQE vs. Smarty<br /><em>vs. Melissa.</em>
        </h2>
        <p class="section-sub">
          Smarty is fast — but address-only. Melissa is comprehensive — but built for IT procurement.
          DQE is both: self-serve speed with all-channel coverage.
        </p>

        <div class="compare-table-wrap">
          <table class="compare-table">
            <thead>
            <tr>
              <th class="compare-th compare-th--feature">Feature</th>
              <th class="compare-th compare-th--dqe">
                <span class="compare-brand compare-brand--dqe">DQE</span>
              </th>
              <th class="compare-th">Smarty</th>
              <th class="compare-th">Melissa</th>
            </tr>
            </thead>
            <tbody>
            <tr
              v-for="(row, i) in comparisonRows"
              :key="row.feature"
              class="compare-row"
              :class="{ 'compare-row--alt': i % 2 !== 0 }"
            >
              <td class="compare-td compare-td--feature">{{ row.feature }}</td>
              <td class="compare-td compare-td--dqe">
                <span :class="row.dqe ? 'check' : 'cross'">{{ row.dqe ? '✓' : '✕' }}</span>
              </td>
              <td class="compare-td">
                <span :class="row.smarty ? 'check' : 'cross'">{{ row.smarty ? '✓' : '✕' }}</span>
              </td>
              <td class="compare-td">
                <span :class="row.melissa ? 'check' : 'cross'">{{ row.melissa ? '✓' : '✕' }}</span>
              </td>
            </tr>
            </tbody>
          </table>
        </div>

        <p class="compare-note mono">
          DQE wins {{ comparisonRows.filter(r => r.dqe && !r.smarty).length }} categories where Smarty falls short.
          Melissa wins on legacy enterprise — but requires a procurement cycle.
        </p>
      </div>
    </section>

    <section class="section section--tinted">
      <div class="container">
        <div class="section-label">How it works</div>
        <h2 class="section-headline">
          Three steps.<br /><em>Under five minutes.</em>
        </h2>

        <div class="steps-grid">
          <div
            v-for="step in howSteps"
            :key="step.num"
            class="step-card"
          >
            <div class="step-num mono">{{ step.num }}</div>
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-desc">{{ step.desc }}</p>
            <pre class="step-code mono">{{ step.code }}</pre>
          </div>
        </div>
      </div>
    </section>

    <section id="pricing" class="section">
      <div class="container">
        <div class="section-label">Pricing</div>
        <h2 class="section-headline">
          Start free.<br /><em>Scale without surprises.</em>
        </h2>
        <p class="section-sub">
          One credit = one validation. Address, email, or phone — your choice. Credits never expire.
        </p>

        <div class="pricing-grid">
          <div
            v-for="plan in plans"
            :key="plan.name"
            class="plan-card"
            :class="{ 'plan-card--lime': plan.lime }"
          >
            <div v-if="plan.lime" class="plan-tag mono">{{ plan.tag }}</div>
            <div class="plan-name mono">{{ plan.name }}</div>
            <div class="plan-price">
              {{ plan.price }}
              <span class="plan-sub mono">{{ plan.sub }}</span>
            </div>
            <p class="plan-desc">{{ plan.desc }}</p>

            <ul class="plan-features">
              <li
                v-for="feat in plan.features"
                :key="feat"
                class="plan-feat"
              >
                <span class="plan-check">✓</span>
                {{ feat }}
              </li>
            </ul>

            <a
              href="#capture"
              class="plan-cta"
              :class="{ 'plan-cta--lime': plan.lime }"
            >
              {{ plan.cta }} →
            </a>
          </div>
        </div>
      </div>
    </section>

    <section id="capture" class="capture-section">
      <div class="container">
        <div class="capture-box">

          <div class="capture-copy">
            <p class="kicker">Free · No card · Results in minutes</p>
            <h2 class="capture-headline">
              Claim 100 free records.<br /><em>Right now.</em>
            </h2>
            <p class="capture-sub">
              Business email required. 100-record cap per organisation.
              Upgrade to Verify when you're ready to scale.
            </p>
          </div>

          <div class="capture-form">
            <Transition name="fade" mode="out-in">
              <div v-if="!captureSubmitted" key="form" class="capture-input-row">
                <input
                  v-model="captureEmail"
                  type="email"
                  placeholder="you@yourcompany.com"
                  class="capture-input mono"
                  @keyup.enter="submitCapture"
                />
                <button class="capture-submit" @click="submitCapture">
                  Claim free records →
                </button>
              </div>
              <div v-else key="done" class="capture-done">
                <span class="capture-check">✓</span>
                <span class="mono">Check your inbox — API key on the way.</span>
              </div>
            </Transition>
            <p class="capture-note mono">
              We validate your email before sending. No personal addresses (gmail, yahoo etc.).
            </p>
          </div>

        </div>
      </div>
    </section>

    <footer class="footer">
      <div class="container">
        <div class="footer-top">
          <span class="wordmark">DQE</span>
          <div class="footer-cols">
            <div v-for="col in [
              { heading: 'Product',  links: ['API Reference','Validate','Verify','Advanced'] },
              { heading: 'Compare',  links: ['vs Smarty','vs Melissa','vs Loqate','vs ZeroBounce'] },
              { heading: 'Company',  links: ['About','Blog','Careers','Contact'] },
              { heading: 'Legal',    links: ['Privacy','Terms','Security','DPA'] },
            ]" :key="col.heading" class="footer-col">
              <p class="footer-col-heading mono">{{ col.heading }}</p>
              <a
                v-for="link in col.links"
                :key="link"
                href="#"
                class="footer-link"
              >{{ link }}</a>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <span class="mono">© {{ new Date().getFullYear() }} DQE Software Inc. All rights reserved.</span>
          <span class="mono footer-certs">
            USPS CASS Certified · SOC 2 Type II · GDPR · CCPA · US data residency
          </span>
        </div>
      </div>
    </footer>

  </div>
</template>

<style scoped>
/* ── Design tokens ────────────────────────────────────────────────────── */
.page-root {
  --paper:  oklch(0.972 0.012 85);
  --ink:    oklch(0.16 0.02 80);
  --lime:   oklch(0.78 0.19 135);
  --shadow: 6px 6px 0 var(--ink);
  --border: 1px solid var(--ink);
  --font-serif: 'Instrument Serif', Georgia, serif;
  --font-sans:  'Inter', system-ui, sans-serif;
  --font-mono:  'JetBrains Mono', 'Fira Code', monospace;

  background: var(--paper);
  color:      var(--ink);
  font-family: var(--font-sans);
  min-height:  100vh;

  /* Grid paper texture */
  background-image:
    linear-gradient(to right, rgba(22,16,10,0.055) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(22,16,10,0.055) 1px, transparent 1px);
  background-size: 28px 28px;
}

/* ── Utilities ────────────────────────────────────────────────────────── */
.mono       { font-family: var(--font-mono); }
.container  { max-width: 1120px; margin: 0 auto; padding: 0 24px; }

/* ── Nav ──────────────────────────────────────────────────────────────── */
.nav-bar {
  position: sticky;
  top: 0;
  z-index: 50;
  border-bottom: var(--border);
  background: var(--paper);
  transition: box-shadow 0.2s;
}
.nav-bar--scrolled { box-shadow: 0 2px 0 var(--ink); }
.nav-inner {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 24px;
  height: 56px;
  display: flex;
  align-items: center;
  gap: 32px;
}
.wordmark {
  font-family: var(--font-mono);
  font-weight: 600;
  font-size: 1.1rem;
  letter-spacing: -0.02em;
  color: var(--ink);
  text-decoration: none;
  flex-shrink: 0;
}
.nav-links {
  display: flex;
  gap: 0;
  flex: 1;
}
.nav-link {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--ink);
  opacity: 0.6;
  text-decoration: none;
  padding: 4px 14px;
  border-right: var(--border);
  transition: opacity 0.15s, background 0.15s;
}
.nav-link:first-child { border-left: var(--border); }
.nav-link:hover { opacity: 1; background: var(--ink); color: var(--paper); }

.cta-btn {
  margin-left: auto;
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  font-weight: 600;
  padding: 8px 18px;
  background: var(--lime);
  color: var(--ink);
  border: var(--border);
  box-shadow: 3px 3px 0 var(--ink);
  text-decoration: none;
  transition: transform 0.1s, box-shadow 0.1s;
  white-space: nowrap;
}
.cta-btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: 5px 5px 0 var(--ink);
}
.cta-btn:active { transform: translate(2px, 2px); box-shadow: 1px 1px 0 var(--ink); }

/* ── Hero ─────────────────────────────────────────────────────────────── */
.hero {
  padding: 96px 0 80px;
  border-bottom: var(--border);
}
.kicker {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 28px;
  opacity: 0.5;
}
.kicker-dot {
  width: 7px;
  height: 7px;
  background: var(--lime);
  border: var(--border);
  flex-shrink: 0;
  animation: blink 1.4s step-end infinite;
}
@keyframes blink { 0%,100% { opacity:1 } 50% { opacity:0 } }

.hero-headline {
  font-family: var(--font-serif);
  font-size: clamp(2.8rem, 7vw, 5.5rem);
  font-weight: 400;
  line-height: 1.05;
  letter-spacing: -0.03em;
  margin-bottom: 28px;
  max-width: 760px;
}
.hero-headline em {
  font-style: italic;
  color: var(--ink);
}

.hero-sub {
  font-size: 1.0625rem;
  line-height: 1.65;
  opacity: 0.65;
  max-width: 560px;
  margin-bottom: 40px;
}

.hero-ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 56px;
}
.btn-primary {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  font-weight: 600;
  padding: 12px 24px;
  background: var(--lime);
  color: var(--ink);
  border: var(--border);
  box-shadow: var(--shadow);
  text-decoration: none;
  transition: transform 0.1s, box-shadow 0.1s;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.btn-primary:hover {
  transform: translate(-3px, -3px);
  box-shadow: 9px 9px 0 var(--ink);
}
.btn-primary:active { transform: translate(3px,3px); box-shadow: 1px 1px 0 var(--ink); }

.btn-secondary {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  font-weight: 600;
  padding: 12px 24px;
  background: transparent;
  color: var(--ink);
  border: var(--border);
  box-shadow: var(--shadow);
  text-decoration: none;
  transition: transform 0.1s, box-shadow 0.1s, background 0.15s;
}
.btn-secondary:hover {
  background: var(--ink);
  color: var(--paper);
  transform: translate(-3px, -3px);
  box-shadow: 9px 9px 0 var(--lime);
}
.btn-secondary:active { transform: translate(3px,3px); box-shadow: 1px 1px 0 var(--ink); }

.hero-stat-box {
  display: inline-flex;
  flex-direction: column;
  gap: 10px;
  border: var(--border);
  box-shadow: var(--shadow);
  padding: 24px 32px;
  background: var(--paper);
  max-width: 480px;
}
.hero-stat-num {
  font-family: var(--font-mono);
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  font-weight: 600;
  letter-spacing: -0.04em;
  color: var(--ink);
  line-height: 1;
}
.hero-stat-label {
  font-size: 0.875rem;
  line-height: 1.5;
  opacity: 0.6;
}

/* ── Ticker ────────────────────────────────────────────────────────────── */
.ticker-wrap {
  border-top: var(--border);
  border-bottom: var(--border);
  background: var(--ink);
  color: var(--lime);
  overflow: hidden;
  padding: 10px 0;
}
.ticker-track {
  display: flex;
  width: max-content;
  animation: ticker-scroll 36s linear infinite;
}
.ticker-track:hover { animation-play-state: paused; }
@keyframes ticker-scroll {
  from { transform: translateX(0) }
  to   { transform: translateX(-50%) }
}
.ticker-item {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  white-space: nowrap;
  padding: 0 4px;
}
.ticker-sep {
  margin: 0 16px;
  opacity: 0.4;
}

/* ── Section base ──────────────────────────────────────────────────────── */
.section {
  padding: 96px 0;
  border-bottom: var(--border);
}
.section--ink {
  background: var(--ink);
  color: var(--paper);
}
.section--tinted {
  background: oklch(0.955 0.014 85);
}
.section-label {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  opacity: 0.4;
  border: var(--border);
  display: inline-block;
  padding: 3px 10px;
  margin-bottom: 24px;
}
.section-label--paper {
  border-color: var(--paper);
  color: var(--paper);
}
.section-headline {
  font-family: var(--font-serif);
  font-size: clamp(2rem, 5vw, 3.75rem);
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: 40px;
  max-width: 640px;
}
.section-headline--paper { color: var(--paper); }
.section-headline em { font-style: italic; }
.section-sub {
  font-size: 1rem;
  line-height: 1.65;
  opacity: 0.6;
  max-width: 560px;
  margin-bottom: 48px;
  margin-top: -24px;
}

/* ── Terminal ──────────────────────────────────────────────────────────── */
.terminal-wrap {
  border: var(--border);
  box-shadow: var(--shadow);
  background: var(--ink);
  color: var(--lime);
  overflow: hidden;
}
.term-tabs {
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.04);
}
.term-tab {
  padding: 10px 20px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: lowercase;
  color: rgba(255,255,255,0.35);
  background: transparent;
  border: none;
  border-right: 1px solid rgba(255,255,255,0.08);
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.term-tab:hover { color: var(--lime); background: rgba(255,255,255,0.06); }
.term-tab--active {
  color: var(--lime);
  background: var(--ink);
  border-bottom: 2px solid var(--lime);
  margin-bottom: -1px;
}
.term-tab-spacer { flex: 1; }
.term-badge {
  font-size: 0.65rem;
  padding: 0 16px;
  color: rgba(255,255,255,0.2);
  letter-spacing: 0.06em;
}
.term-body {
  display: grid;
  grid-template-columns: 1fr 1px 1fr;
  min-height: 280px;
}
.term-pane { padding: 24px; }
.term-pane--waiting { opacity: 0.3; }
.term-pane-label {
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.25);
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}
.term-ok {
  font-size: 0.65rem;
  color: var(--lime);
  letter-spacing: 0.06em;
}
.term-divider { background: rgba(255,255,255,0.1); width: 1px; }
.term-lines { display: flex; flex-direction: column; gap: 4px; }
.term-line {
  font-size: 0.8125rem;
  line-height: 1.6;
  color: rgba(255,255,255,0.85);
  white-space: pre;
}
.cursor {
  display: inline-block;
  width: 2px;
  height: 1em;
  background: var(--lime);
  vertical-align: middle;
  margin-left: 2px;
  animation: blink 0.8s step-end infinite;
}
.term-json {
  font-size: 0.78rem;
  line-height: 1.7;
  color: rgba(255,255,255,0.8);
  white-space: pre;
  margin: 0;
  overflow-x: auto;
}
.term-waiting {
  font-size: 0.8125rem;
  color: rgba(255,255,255,0.25);
  animation: blink 1.2s step-end infinite;
}
.term-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 24px;
  border-top: 1px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.03);
}
.term-replay {
  font-size: 0.72rem;
  color: rgba(255,255,255,0.35);
  background: transparent;
  border: 1px solid rgba(255,255,255,0.15);
  padding: 4px 12px;
  cursor: pointer;
  transition: color 0.15s, border-color 0.15s;
  letter-spacing: 0.04em;
}
.term-replay:hover { color: var(--lime); border-color: var(--lime); }
.term-credit {
  font-size: 0.68rem;
  color: rgba(255,255,255,0.2);
  letter-spacing: 0.04em;
}
.term-response-enter-active { transition: opacity 0.35s ease, transform 0.35s ease; }
.term-response-enter-from   { opacity: 0; transform: translateY(8px); }

/* ── Stats Grid ────────────────────────────────────────────────────────── */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0;
  border-left: 1px solid rgba(255,255,255,0.15);
  border-top: 1px solid rgba(255,255,255,0.15);
}
.stat-card {
  border-right: 1px solid rgba(255,255,255,0.15);
  border-bottom: 1px solid rgba(255,255,255,0.15);
  padding: 36px 28px;
  transition: background 0.2s;
}
.stat-card:hover { background: rgba(255,255,255,0.04); }
.stat-num {
  font-family: var(--font-mono);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 600;
  color: var(--lime);
  letter-spacing: -0.04em;
  line-height: 1;
  margin-bottom: 12px;
}
.stat-label {
  font-size: 0.9rem;
  line-height: 1.5;
  color: rgba(255,255,255,0.65);
  white-space: pre-line;
  margin-bottom: 12px;
}
.stat-src {
  font-size: 0.65rem;
  color: rgba(255,255,255,0.25);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

/* ── Comparison Table ──────────────────────────────────────────────────── */
.compare-table-wrap {
  overflow-x: auto;
  border: var(--border);
  box-shadow: var(--shadow);
  margin-bottom: 20px;
}
.compare-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}
.compare-th {
  padding: 14px 20px;
  text-align: center;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border-bottom: var(--border);
  border-right: var(--border);
  background: var(--paper);
}
.compare-th:last-child { border-right: none; }
.compare-th--feature { text-align: left; width: 42%; }
.compare-th--dqe { background: var(--ink); color: var(--lime); }
.compare-brand { font-size: 0.8rem; }
.compare-brand--dqe { color: var(--lime); }
.compare-row { border-bottom: var(--border); transition: background 0.12s; }
.compare-row:last-child { border-bottom: none; }
.compare-row:hover { background: oklch(0.955 0.014 85); }
.compare-row--alt { background: oklch(0.962 0.013 85); }
.compare-row--alt:hover { background: oklch(0.948 0.014 85); }
.compare-td {
  padding: 11px 20px;
  border-right: var(--border);
  text-align: center;
  vertical-align: middle;
}
.compare-td:last-child { border-right: none; }
.compare-td--feature {
  text-align: left;
  font-size: 0.875rem;
  color: var(--ink);
}
.compare-td--dqe { background: oklch(0.97 0.035 135); }
.check {
  font-family: var(--font-mono);
  font-weight: 700;
  color: oklch(0.45 0.15 135);
  font-size: 1rem;
}
.cross {
  font-family: var(--font-mono);
  color: oklch(0.55 0.04 30);
  opacity: 0.4;
  font-size: 0.9rem;
}
.compare-note {
  font-size: 0.72rem;
  opacity: 0.45;
  letter-spacing: 0.03em;
}

/* ── How It Works ──────────────────────────────────────────────────────── */
.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 0;
  border-left: var(--border);
  border-top: var(--border);
}
.step-card {
  border-right: var(--border);
  border-bottom: var(--border);
  padding: 36px 32px;
  transition: background 0.15s;
  position: relative;
  overflow: hidden;
}
.step-card:hover { background: var(--paper); }
.step-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 3px;
  height: 0;
  background: var(--lime);
  transition: height 0.3s ease;
}
.step-card:hover::before { height: 100%; }
.step-num {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--lime);
  opacity: 0.8;
  margin-bottom: 16px;
  display: block;
  background: var(--ink);
  color: var(--lime);
  width: fit-content;
  padding: 2px 8px;
}
.step-title {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: -0.02em;
  margin-bottom: 12px;
  color: var(--ink);
}
.step-desc {
  font-size: 0.875rem;
  line-height: 1.6;
  opacity: 0.6;
  margin-bottom: 20px;
}
.step-code {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  line-height: 1.7;
  background: var(--ink);
  color: var(--lime);
  padding: 14px 16px;
  margin: 0;
  white-space: pre-wrap;
  border-left: 3px solid var(--lime);
}

/* ── Pricing ───────────────────────────────────────────────────────────── */
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 0;
  border: var(--border);
  box-shadow: var(--shadow);
}
.plan-card {
  border-right: var(--border);
  padding: 40px 32px;
  background: var(--paper);
  transition: background 0.15s;
  position: relative;
  display: flex;
  flex-direction: column;
}
.plan-card:last-child { border-right: none; }
.plan-card:hover { background: oklch(0.958 0.014 85); }
.plan-card--lime {
  background: var(--lime);
}
.plan-card--lime:hover { background: oklch(0.81 0.2 135); }
.plan-tag {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: var(--ink);
  color: var(--lime);
  width: fit-content;
  padding: 3px 10px;
  margin-bottom: 16px;
}
.plan-name {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0.5;
  margin-bottom: 12px;
}
.plan-price {
  font-family: var(--font-mono);
  font-size: 2.5rem;
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 1;
  margin-bottom: 4px;
  color: var(--ink);
}
.plan-sub {
  font-size: 0.8rem;
  font-weight: 400;
  opacity: 0.5;
  letter-spacing: 0;
}
.plan-desc {
  font-size: 0.875rem;
  line-height: 1.55;
  opacity: 0.6;
  margin-bottom: 24px;
  margin-top: 8px;
}
.plan-features {
  list-style: none;
  padding: 0;
  margin: 0 0 32px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 9px;
  border-top: var(--border);
  padding-top: 20px;
}
.plan-feat {
  font-size: 0.8125rem;
  display: flex;
  align-items: flex-start;
  gap: 8px;
}
.plan-check {
  font-family: var(--font-mono);
  font-weight: 700;
  color: var(--ink);
  flex-shrink: 0;
}
.plan-cta {
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  font-weight: 600;
  padding: 12px 20px;
  background: var(--ink);
  color: var(--paper);
  border: var(--border);
  box-shadow: 4px 4px 0 rgba(22,16,10,0.25);
  text-decoration: none;
  text-align: center;
  transition: transform 0.1s, box-shadow 0.1s;
  display: block;
  margin-top: auto;
}
.plan-cta:hover {
  transform: translate(-2px,-2px);
  box-shadow: 6px 6px 0 rgba(22,16,10,0.3);
}
.plan-cta--lime {
  background: var(--paper);
  color: var(--ink);
  box-shadow: 4px 4px 0 var(--ink);
}
.plan-cta--lime:hover { box-shadow: 6px 6px 0 var(--ink); }

/* ── Capture ───────────────────────────────────────────────────────────── */
.capture-section {
  padding: 80px 0;
  border-bottom: var(--border);
}
.capture-box {
  background: var(--lime);
  border: var(--border);
  box-shadow: var(--shadow);
  padding: 56px 48px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
}
.capture-headline {
  font-family: var(--font-serif);
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 400;
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin-bottom: 12px;
  color: var(--ink);
}
.capture-headline em { font-style: italic; }
.capture-sub {
  font-size: 0.875rem;
  line-height: 1.6;
  opacity: 0.65;
  color: var(--ink);
}
.capture-input-row {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.capture-input {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  padding: 12px 16px;
  background: var(--paper);
  color: var(--ink);
  border: var(--border);
  box-shadow: 3px 3px 0 var(--ink);
  outline: none;
  width: 100%;
  transition: box-shadow 0.15s;
}
.capture-input:focus { box-shadow: 5px 5px 0 var(--ink); }
.capture-input::placeholder { opacity: 0.4; }
.capture-submit {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  font-weight: 700;
  padding: 13px 20px;
  background: var(--ink);
  color: var(--lime);
  border: var(--border);
  box-shadow: var(--shadow);
  cursor: pointer;
  transition: transform 0.1s, box-shadow 0.1s;
  letter-spacing: 0.01em;
}
.capture-submit:hover {
  transform: translate(-3px,-3px);
  box-shadow: 9px 9px 0 rgba(22,16,10,0.5);
}
.capture-submit:active { transform: translate(2px,2px); box-shadow: 2px 2px 0 var(--ink); }
.capture-note {
  font-size: 0.68rem;
  opacity: 0.5;
  margin-top: 8px;
  letter-spacing: 0.02em;
  color: var(--ink);
}
.capture-done {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.875rem;
  color: var(--ink);
}
.capture-check {
  font-family: var(--font-mono);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--ink);
  width: 32px;
  height: 32px;
  border: var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--paper);
  flex-shrink: 0;
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to       { opacity: 0; }

/* ── Footer ────────────────────────────────────────────────────────────── */
.footer {
  padding: 48px 0;
  border-top: var(--border);
  background: var(--ink);
  color: var(--paper);
}
.footer-top {
  display: flex;
  gap: 64px;
  margin-bottom: 48px;
  align-items: flex-start;
}
.footer .wordmark { color: var(--paper); font-size: 1.2rem; flex-shrink: 0; }
.footer-cols {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  flex: 1;
}
.footer-col { display: flex; flex-direction: column; gap: 10px; }
.footer-col-heading {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.3);
  margin-bottom: 4px;
}
.footer-link {
  font-size: 0.8125rem;
  color: rgba(255,255,255,0.55);
  text-decoration: none;
  transition: color 0.15s;
}
.footer-link:hover { color: var(--lime); }
.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 24px;
  border-top: 1px solid rgba(255,255,255,0.1);
  font-size: 0.72rem;
  color: rgba(255,255,255,0.25);
  letter-spacing: 0.03em;
  flex-wrap: wrap;
  gap: 12px;
}
.footer-certs { opacity: 0.4; }

/* ── Responsive ────────────────────────────────────────────────────────── */
@media (max-width: 768px) {
  .nav-links { display: none; }
  .term-body { grid-template-columns: 1fr; }
  .term-divider { display: none; }
  .capture-box { grid-template-columns: 1fr; padding: 36px 24px; }
  .footer-top { flex-direction: column; gap: 32px; }
  .footer-cols { grid-template-columns: repeat(2,1fr); gap: 24px; }
  .footer-bottom { flex-direction: column; align-items: flex-start; }
}

@media (max-width: 480px) {
  .hero { padding: 64px 0 56px; }
  .section { padding: 64px 0; }
  .hero-stat-box { padding: 20px 24px; }
  .capture-box { padding: 28px 20px; }
  .footer-cols { grid-template-columns: 1fr 1fr; }
}
</style>

/* ── Hero ──────────────────────────────────────────────────────────────
