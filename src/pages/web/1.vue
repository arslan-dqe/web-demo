<script setup lang="ts">
import { ref } from 'vue'

const demoRecords = ref([
  { id: 1, name: 'Jonathan Smith', email: 'jon.smith@acmecorp.com', company: 'Acme Corp', phone: '(212) 555-0101', score: 97, group: 'A', master: true },
  { id: 2, name: 'Jon Smith', email: 'j.smith@acme.com', company: 'Acme Inc.', phone: '(212) 555-0101', score: 97, group: 'A', master: false },
  { id: 3, name: 'Sarah L. Johnson', email: 'sarah.j@globaltech.io', company: 'GlobalTech', phone: '(415) 555-0198', score: 91, group: 'B', master: true },
  { id: 4, name: 'Sara Johnson', email: 'sjohnson@global-tech.com', company: 'Global Tech Inc', phone: '(415) 555-0198', score: 91, group: 'B', master: false },
  { id: 5, name: 'Michael R. Davis', email: 'mdavis@vertex.com', company: 'Vertex Solutions', phone: '(312) 555-0044', score: 88, group: 'C', master: true },
  { id: 6, name: 'Mike Davis', email: 'michael.davis@vertexsolutions.com', company: 'Vertex', phone: '', score: 88, group: 'C', master: false },
])

const merged = ref(false)
const merging = ref(false)

function runMerge() {
  merging.value = true
  setTimeout(() => {
    merged.value = true
    merging.value = false
  }, 1800)
}

function reset() {
  merged.value = false
}

const features = [
  { icon: 'i-lucide-brain-circuit', title: 'Fuzzy AI Matching', desc: 'Catches "Jon Smith" and "Jonathan Smith" as the same person — rules-based tools miss these every time.', color: 'primary' },
  { icon: 'i-lucide-git-merge', title: 'Smart Field Merging', desc: 'Automatically picks the best value per field — keeps the most complete phone, newest email, highest-confidence company.', color: 'secondary' },
  { icon: 'i-lucide-shield-check', title: 'Safe by Default', desc: 'Every merge is logged with a full audit trail. Roll back any merge in one click, anytime.', color: 'success' },
  { icon: 'i-lucide-plug', title: 'CRM Integrations', desc: 'Syncs directly with Salesforce, HubSpot, Pipedrive, and more. No CSV exports, no manual steps.', color: 'info' },
  { icon: 'i-lucide-sliders-horizontal', title: 'Custom Rules Engine', desc: 'Set thresholds and priority fields per team. Your RevOps rules, enforced automatically.', color: 'warning' },
  { icon: 'i-lucide-activity', title: 'Real-Time Monitoring', desc: 'Catches dupes the moment a new lead lands — not weeks later when the damage is done.', color: 'error' },
]

const steps = [
  { num: '01', icon: 'i-lucide-database', title: 'Connect your CRM', desc: 'OAuth in 30 seconds. We pull your contacts, leads, and accounts — no data leaves your region.' },
  { num: '02', icon: 'i-lucide-scan-search', title: 'AI scans & clusters', desc: 'Our model compares names, emails, phones, and companies across every record — even with typos and abbreviations.' },
  { num: '03', icon: 'i-lucide-git-merge', title: 'Review & merge', desc: 'Approve AI suggestions in bulk or one by one. Set confidence thresholds to auto-merge the obvious ones.' },
]

const stats = [
  { value: '2.3M+', label: 'Duplicates removed' },
  { value: '94%', label: 'Match accuracy' },
  { value: '11 hrs', label: 'Saved per rep/month' },
  { value: '$420K', label: 'Avg. revenue recovered / year' },
]

const testimonials = [
  {
    name: 'Alicia Torres',
    role: 'VP of Revenue Operations',
    company: 'Meridian SaaS',
    avatar: 'AT',
    color: 'primary',
    quote: 'We had 34% duplicate rate in Salesforce before Deduply. Cleaned 180K records in a weekend. Our reps stopped complaining about bad data overnight.',
    stars: 5,
  },
  {
    name: 'James Whitfield',
    role: 'Head of Growth',
    company: 'Stackline Inc.',
    avatar: 'JW',
    color: 'secondary',
    quote: "Other tools missed 'Jon Smith' vs 'Jonathan Smith' at the same company. Deduply caught it. That alone was worth the price.",
    stars: 5,
  },
  {
    name: 'Priya Nair',
    role: 'Sales Ops Manager',
    company: 'Cloudify',
    avatar: 'PN',
    color: 'success',
    quote: "Setup took 20 minutes. Within an hour it found 12,000 dupes our team had been ignoring for two years. The ROI was instant.",
    stars: 5,
  },
]

const plans = [
  {
    name: 'Starter',
    price: '$149',
    period: '/mo',
    desc: 'Perfect for small sales teams cleaning up their CRM for the first time.',
    color: 'neutral',
    features: ['Up to 25,000 records', '1 CRM integration', 'AI deduplication', 'Merge history (30 days)', 'Email support'],
    cta: 'Start free trial',
    popular: false,
  },
  {
    name: 'Growth',
    price: '$399',
    period: '/mo',
    desc: 'For RevOps teams who need automation and deeper integrations.',
    color: 'primary',
    features: ['Up to 250,000 records', '3 CRM integrations', 'Real-time duplicate prevention', 'Custom matching rules', 'Full audit trail', 'Slack alerts', 'Priority support'],
    cta: 'Start free trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'Dedicated infrastructure, SSO, and SLAs for large organizations.',
    color: 'neutral',
    features: ['Unlimited records', 'Unlimited integrations', 'Custom AI model fine-tuning', 'SOC 2 Type II', 'Dedicated CSM', 'SLA guarantee', 'On-premise option'],
    cta: 'Talk to sales',
    popular: false,
  },
]

const navLinks = [
  { label: 'How it works', href: '#how' },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Customers', href: '#testimonials' },
]

const logoNames = ['Salesforce', 'HubSpot', 'Pipedrive', 'Outreach', 'Apollo', 'ZoomInfo']

const colorMap: Record<string, string> = {
  primary: 'bg-primary/10 text-primary',
  secondary: 'bg-secondary/10 text-secondary',
  success: 'bg-success/10 text-success',
  info: 'bg-info/10 text-info',
  warning: 'bg-warning/10 text-warning',
  error: 'bg-error/10 text-error',
  neutral: 'bg-muted text-muted',
}

const avatarColorMap: Record<string, string> = {
  primary: 'bg-primary/15 text-primary',
  secondary: 'bg-secondary/15 text-secondary',
  success: 'bg-success/15 text-success',
}

const groupColorMap: Record<string, string> = {
  A: 'bg-primary/10 text-primary border-primary/20',
  B: 'bg-secondary/10 text-secondary border-secondary/20',
  C: 'bg-warning/10 text-warning border-warning/20',
}
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-zinc-950 font-sans overflow-x-hidden">

    <nav class="sticky top-0 z-50 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <div class="flex items-center gap-2.5">
          <div class="size-8 rounded-xl bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center shadow-lg shadow-violet-500/30">
            <UIcon name="i-lucide-git-merge" class="size-4 text-white" />
          </div>
          <span class="text-lg font-bold text-zinc-900 dark:text-white tracking-tight">Deduply</span>
        </div>

        <div class="hidden md:flex items-center gap-6">
          <a v-for="link in navLinks" :key="link.label" :href="link.href"
             class="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors font-medium">
            {{ link.label }}
          </a>
        </div>

        <div class="flex items-center gap-3">
          <UButton label="Log in" variant="ghost" color="neutral" size="sm" class="hidden sm:flex" />
          <UButton label="Start free trial" size="sm" trailing-icon="i-lucide-arrow-right" />
        </div>
      </div>
    </nav>

    <section class="relative overflow-hidden pt-20 pb-24 px-4 sm:px-6">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-violet-100 to-transparent dark:from-violet-950/40 dark:to-transparent rounded-full blur-3xl opacity-60" />
        <div class="absolute top-20 right-0 w-72 h-72 bg-cyan-200/30 dark:bg-cyan-900/20 rounded-full blur-3xl" />
        <div class="absolute top-40 left-0 w-56 h-56 bg-violet-200/40 dark:bg-violet-900/20 rounded-full blur-3xl" />
      </div>

      <div class="relative max-w-5xl mx-auto text-center">
        <UBadge
          label="🚀 Now with real-time duplicate prevention"
          color="primary"
          variant="subtle"
          size="sm"
          class="mb-6 cursor-default"
        />

        <h1 class="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-zinc-900 dark:text-white leading-[1.08] tracking-tight mb-6">
          Your CRM is full of
          <span class="relative inline-block">
            <span class="bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">duplicates.</span>
            <svg class="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
              <path d="M2 9C50 3 100 1 150 5C200 9 250 7 298 3" stroke="url(#grad)" stroke-width="3" stroke-linecap="round"/>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="300" y2="0">
                  <stop stop-color="#7c3aed"/>
                  <stop offset="1" stop-color="#06b6d4"/>
                </linearGradient>
              </defs>
            </svg>
          </span>
          <br />AI finds them all.
        </h1>

        <p class="text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Deduply uses AI to detect and merge duplicate contacts, leads, and accounts in your CRM — catching fuzzy matches that rule-based tools miss entirely.
        </p>

        <div class="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <UButton
            label="Start free — no credit card"
            size="xl"
            trailing-icon="i-lucide-arrow-right"
            class="shadow-xl shadow-violet-500/25 px-8"
          />
          <UButton
            label="Watch 2-min demo"
            size="xl"
            variant="ghost"
            color="neutral"
            leading-icon="i-lucide-play-circle"
          />
        </div>

        <p class="mt-4 text-sm text-zinc-400">Free 14-day trial · No setup fees · Cancel anytime</p>
      </div>

      <div class="relative max-w-4xl mx-auto mt-16">
        <div class="absolute -inset-4 bg-gradient-to-r from-violet-500/20 to-cyan-500/20 rounded-3xl blur-2xl" />
        <div class="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden">
          <div class="flex items-center justify-between px-5 py-3.5 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80">
            <div class="flex gap-1.5">
              <div class="size-3 rounded-full bg-rose-400" />
              <div class="size-3 rounded-full bg-amber-400" />
              <div class="size-3 rounded-full bg-emerald-400" />
            </div>
            <div class="flex items-center gap-2 text-xs text-zinc-400 font-medium">
              <UIcon name="i-lucide-sparkles" class="size-3.5 text-violet-500" />
              AI Duplicate Scanner — Live Preview
            </div>
            <div class="flex items-center gap-1.5">
              <div class="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                6 records · 3 duplicate groups found
              </div>
            </div>
          </div>

          <div class="grid grid-cols-12 gap-2 px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800/60 border-b border-zinc-100 dark:border-zinc-800 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            <div class="col-span-1">Group</div>
            <div class="col-span-3">Name</div>
            <div class="col-span-3">Email</div>
            <div class="col-span-2">Company</div>
            <div class="col-span-1">Score</div>
            <div class="col-span-2 text-right">Status</div>
          </div>

          <div class="divide-y divide-zinc-100 dark:divide-zinc-800/80">
            <template v-if="!merged">
              <div
                v-for="rec in demoRecords"
                :key="rec.id"
                class="grid grid-cols-12 gap-2 px-4 py-3 items-center text-sm transition-colors"
                :class="rec.master ? 'bg-white dark:bg-zinc-900' : 'bg-violet-50/50 dark:bg-violet-950/20'"
              >
                <div class="col-span-1">
                  <span class="inline-flex items-center justify-center size-6 rounded-full border text-xs font-bold"
                        :class="groupColorMap[rec.group]">
                    {{ rec.group }}
                  </span>
                </div>
                <div class="col-span-3 font-medium text-zinc-800 dark:text-zinc-200 truncate">
                  {{ rec.name }}
                  <span v-if="rec.master" class="ml-1.5 text-xs font-normal text-violet-500">(master)</span>
                </div>
                <div class="col-span-3 text-zinc-500 dark:text-zinc-400 truncate text-xs">{{ rec.email }}</div>
                <div class="col-span-2 text-zinc-600 dark:text-zinc-300 truncate text-xs">{{ rec.company }}</div>
                <div class="col-span-1">
                  <div class="flex items-center gap-1">
                    <div class="flex-1 h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-700 overflow-hidden">
                      <div class="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500" :style="`width:${rec.score}%`" />
                    </div>
                    <span class="text-xs font-semibold text-zinc-500">{{ rec.score }}%</span>
                  </div>
                </div>
                <div class="col-span-2 text-right">
                  <UBadge
                    :label="rec.master ? '✓ Master' : '⚠ Duplicate'"
                    :color="rec.master ? 'success' : 'warning'"
                    variant="subtle"
                    size="xs"
                  />
                </div>
              </div>
            </template>

            <template v-else>
              <div
                v-for="rec in demoRecords.filter(r => r.master)"
                :key="rec.id"
                class="grid grid-cols-12 gap-2 px-4 py-3 items-center text-sm bg-emerald-50/60 dark:bg-emerald-950/20 animate-pulse-once"
              >
                <div class="col-span-1">
                  <UIcon name="i-lucide-check-circle" class="size-5 text-emerald-500" />
                </div>
                <div class="col-span-3 font-medium text-zinc-800 dark:text-zinc-200 truncate">{{ rec.name }}</div>
                <div class="col-span-3 text-zinc-500 dark:text-zinc-400 truncate text-xs">{{ rec.email }}</div>
                <div class="col-span-2 text-zinc-600 dark:text-zinc-300 truncate text-xs">{{ rec.company }}</div>
                <div class="col-span-1 text-xs font-semibold text-emerald-500">100%</div>
                <div class="col-span-2 text-right">
                  <UBadge label="✓ Merged" color="success" variant="subtle" size="xs" />
                </div>
              </div>
            </template>
          </div>

          <div class="flex items-center justify-between px-5 py-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/80">
            <p class="text-sm text-zinc-500">
              <span class="font-semibold text-zinc-800 dark:text-zinc-200">3 duplicate groups</span> detected · {{ merged ? '3 records remain after merge' : '6 records · 3 can be merged' }}
            </p>
            <div class="flex gap-2">
              <UButton
                v-if="merged"
                label="Reset demo"
                size="sm"
                variant="ghost"
                color="neutral"
                leading-icon="i-lucide-rotate-ccw"
                @click="reset"
              />
              <UButton
                :label="merging ? 'Merging with AI...' : merged ? '✓ All merged!' : 'Merge all duplicates'"
                size="sm"
                :loading="merging"
                :color="merged ? 'success' : 'primary'"
                :leading-icon="merged ? 'i-lucide-check' : 'i-lucide-git-merge'"
                :disabled="merged"
                @click="runMerge"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-12 border-y border-zinc-100 dark:border-zinc-800/60 bg-zinc-50/60 dark:bg-zinc-900/40 px-4">
      <div class="max-w-5xl mx-auto text-center">
        <p class="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-8">Integrates with your existing stack</p>
        <div class="flex flex-wrap justify-center gap-x-12 gap-y-4">
          <div v-for="logo in logoNames" :key="logo"
               class="text-sm font-bold text-zinc-300 dark:text-zinc-600 tracking-wide hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors">
            {{ logo }}
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 px-4 sm:px-6">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-14">
          <UBadge label="The Problem" color="error" variant="subtle" size="sm" class="mb-4" />
          <h2 class="text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4">
            Duplicates are killing your pipeline
          </h2>
          <p class="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
            The average CRM has a <strong class="text-zinc-800 dark:text-zinc-200">25–40% duplicate rate</strong>. Every dupe is a wasted rep call, a missed follow-up, or a burned relationship.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div v-for="pain in [
            { icon: 'i-lucide-phone-missed', title: 'Reps call the same lead twice', desc: 'Your prospect gets two cold calls from two different reps in the same week. Deal killed.', color: 'error' },
            { icon: 'i-lucide-chart-no-axes-combined', title: 'Reporting is completely wrong', desc: 'Inflated lead counts, broken attribution, and a pipeline dashboard nobody trusts anymore.', color: 'warning' },
            { icon: 'i-lucide-dollar-sign', title: 'Youre paying for ghost contacts', desc: `Most CRMs charge per record. Duplicates mean you're paying for data you'll never close.`, color: 'primary' },
          ]"
                :key="pain.title"
          class="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
          <div class="p-3 rounded-xl w-fit mb-4" :class="colorMap[pain.color]">
            <UIcon :name="pain.icon" class="size-5" />
          </div>
          <h3 class="font-semibold text-zinc-900 dark:text-white mb-2">{{ pain.title }}</h3>
          <p class="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{{ pain.desc }}</p>
        </div>
      </div>
  </div>
  </section>

  <section id="how" class="py-24 px-4 sm:px-6 bg-zinc-50 dark:bg-zinc-900/60">
    <div class="max-w-5xl mx-auto">
      <div class="text-center mb-14">
        <UBadge label="How it works" color="primary" variant="subtle" size="sm" class="mb-4" />
        <h2 class="text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4">
          Clean data in 3 steps
        </h2>
        <p class="text-lg text-zinc-500 dark:text-zinc-400">From messy CRM to clean pipeline in under an hour.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        <div class="hidden md:block absolute top-10 left-1/3 right-1/3 h-px bg-gradient-to-r from-violet-300 to-cyan-300 dark:from-violet-700 dark:to-cyan-700" />
        <div class="hidden md:block absolute top-10 left-2/3 right-0 h-px bg-gradient-to-r from-cyan-300 to-zinc-200 dark:from-cyan-700 dark:to-zinc-700" />

        <div v-for="step in steps" :key="step.num" class="relative flex flex-col items-center text-center p-6">
          <div class="relative mb-5">
            <div class="size-16 rounded-2xl bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center shadow-xl shadow-violet-500/30">
              <UIcon :name="step.icon" class="size-7 text-white" />
            </div>
            <div class="absolute -top-2 -right-2 size-6 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold flex items-center justify-center">
              {{ step.num }}
            </div>
          </div>
          <h3 class="font-bold text-zinc-900 dark:text-white mb-2 text-lg">{{ step.title }}</h3>
          <p class="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{{ step.desc }}</p>
        </div>
      </div>
    </div>
  </section>

  <section id="features" class="py-24 px-4 sm:px-6">
    <div class="max-w-5xl mx-auto">
      <div class="text-center mb-14">
        <UBadge label="Features" color="secondary" variant="subtle" size="sm" class="mb-4" />
        <h2 class="text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4">
          Built for RevOps & Sales teams
        </h2>
        <p class="text-lg text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
          Everything you need to keep your CRM permanently clean — not just once.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div v-for="feat in features" :key="feat.title"
             class="group p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-violet-300 dark:hover:border-violet-700 hover:shadow-xl hover:shadow-violet-500/10 hover:-translate-y-1 transition-all duration-200">
          <div class="p-2.5 rounded-xl w-fit mb-4" :class="colorMap[feat.color]">
            <UIcon :name="feat.icon" class="size-5" />
          </div>
          <h3 class="font-semibold text-zinc-900 dark:text-white mb-2">{{ feat.title }}</h3>
          <p class="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{{ feat.desc }}</p>
        </div>
      </div>
    </div>
  </section>

  <section class="py-20 px-4 sm:px-6 bg-gradient-to-br from-violet-600 to-violet-800 dark:from-violet-800 dark:to-violet-950">
    <div class="max-w-5xl mx-auto">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div v-for="stat in stats" :key="stat.label" class="space-y-2">
          <p class="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">{{ stat.value }}</p>
          <p class="text-sm text-violet-200 font-medium">{{ stat.label }}</p>
        </div>
      </div>
    </div>
  </section>
  </div>
</template>
