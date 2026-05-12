<!-- src/components/dqe/DqeHowItWorks.vue -->
<script setup lang="ts">
import { ref } from 'vue'

type Path = 'csv' | 'api'
const activePath = ref<Path>('csv')

const steps = [
  {
    num:   '01',
    icon:  'i-lucide-upload',
    title: 'Upload your data or connect via API',
    desc:  'Drag-and-drop a CSV file or make a single REST API call. No SFTP. No sales call. No setup fee. Your first 100 validations are completely free.',
    csv: {
      label:   'CSV Upload',
      icon:    'i-lucide-file-spreadsheet',
      mockup: {
        filename: 'customer_addresses_Q4.csv',
        rows:     '48,291 rows detected',
        columns:  ['full_address', 'email', 'phone'],
        status:   'Ready to validate',
      },
    },
    api: {
      label: 'REST API',
      icon:  'i-lucide-code-2',
      code:
        `curl -X POST https://api.dqe.io/v1/validate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "address": "350 5th Ave, New York NY",
    "email":   "john@company.com",
    "phone":   "+1 212 555 0101"
  }'`,
    },
    points: [
      'No file size limit on CSV batch',
      'Sub-100ms API response time',
      'SDKs for Node, Python, PHP, Go',
    ],
  },
  {
    num:   '02',
    icon:  'i-lucide-zap',
    title: 'DQE validates in real time',
    desc:  'Our engine runs USPS CASS certification for addresses, SMTP handshakes for emails, and carrier lookups for phones — all in parallel, all in one pass.',
    csv: {
      label: 'Batch processing',
      icon:  'i-lucide-cpu',
      progress: [
        { label: 'Address validation',  pct: 100, color: 'bg-blue-500'   },
        { label: 'Email verification',  pct: 87,  color: 'bg-teal-500'   },
        { label: 'Phone lookup',        pct: 64,  color: 'bg-violet-500' },
        { label: 'Deduplication check', pct: 31,  color: 'bg-amber-500'  },
      ],
      stats: [
        { value: '48,291', label: 'records'    },
        { value: '2,847',  label: 'issues found' },
        { value: '94.1%',  label: 'valid'      },
      ],
    },
    api: {
      label: 'Real-time response',
      icon:  'i-lucide-activity',
      code:
        `{
  "address": {
    "status":       "valid",
    "standardized": "350 5TH AVE, NEW YORK, NY 10118",
    "dpv":          "confirmed",
    "zip4":         "10118-0110"
  },
  "email": {
    "status":       "deliverable",
    "risk":         "low",
    "smtp":         "passed"
  },
  "phone": {
    "status":       "active",
    "type":         "landline",
    "carrier":      "Verizon"
  },
  "response_ms": 112
}`,
    },
    points: [
      'All 3 validations run in parallel',
      'USPS CASS certified for addresses',
      'Risk scoring on every email',
    ],
  },
  {
    num:   '03',
    icon:  'i-lucide-download',
    title: 'Download results or push to your CRM',
    desc:  'Get a clean, enriched file back instantly. Or push validated records directly to Salesforce, HubSpot, and Shopify — no manual export steps.',
    csv: {
      label: 'Download enriched CSV',
      icon:  'i-lucide-file-down',
      columns: [
        { name: 'original_address', status: 'unchanged' },
        { name: 'standardized_address', status: 'new' },
        { name: 'zip4', status: 'new' },
        { name: 'address_status', status: 'new' },
        { name: 'email_status', status: 'new' },
        { name: 'phone_status', status: 'new' },
      ],
    },
    api: {
      label: 'Webhook / CRM push',
      icon:  'i-lucide-webhook',
      destinations: [
        { name: 'Salesforce',  icon: 'i-lucide-cloud',       status: 'Connected', color: 'text-blue-500  bg-blue-500/10'  },
        { name: 'HubSpot',     icon: 'i-lucide-magnet',      status: 'Connected', color: 'text-orange-500 bg-orange-500/10' },
        { name: 'Shopify',     icon: 'i-lucide-shopping-bag', status: 'Connected', color: 'text-emerald-500 bg-emerald-500/10' },
        { name: 'Webhook',     icon: 'i-lucide-webhook',     status: 'Custom URL', color: 'text-violet-500 bg-violet-500/10' },
      ],
    },
    points: [
      'Enriched CSV with 6 new columns',
      'Direct CRM sync — no manual export',
      'Webhook support for custom pipelines',
    ],
  },
]
</script>

<template>
  <section id="how-it-works" class="py-28 px-4 relative overflow-hidden bg-(--ui-bg-muted)">

    <!-- Background -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-20 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      <div class="absolute bottom-20 left-0 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl" />
    </div>

    <div class="relative z-10 max-w-6xl mx-auto">

      <!-- ── Header ───────────────────────────────────────────────────── -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="text-center mb-10"
      >
        <UBadge color="primary" variant="soft" label="How it works" size="md" class="mb-4" />
        <h2 class="text-4xl md:text-5xl font-extrabold text-(--ui-text-highlighted) mb-3 leading-tight">
          Clean data in
          <span class="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
            under 5 minutes.
          </span>
        </h2>
        <h3 class="text-base font-medium text-(--ui-text-muted) mb-4">How quickly can I integrate address, email, and phone validation into my app?</h3>
        <p class="text-(--ui-text-muted) text-lg max-w-xl mx-auto mb-8">
          Two paths, same result: accurate addresses, deliverable emails,
          and verified phone numbers — without a sales call.
        </p>

        <!-- Path toggle -->
        <div class="inline-flex items-center p-1 rounded-xl bg-(--ui-bg) border border-(--ui-border) shadow-sm">
          <button
            class="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
            :class="activePath === 'csv'
              ? 'bg-primary text-white shadow-sm'
              : 'text-(--ui-text-muted) hover:text-(--ui-text)'"
            @click="activePath = 'csv'"
          >
            <UIcon name="i-lucide-file-spreadsheet" class="w-4 h-4" />
            CSV Upload
          </button>
          <button
            class="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
            :class="activePath === 'api'
              ? 'bg-primary text-white shadow-sm'
              : 'text-(--ui-text-muted) hover:text-(--ui-text)'"
            @click="activePath = 'api'"
          >
            <UIcon name="i-lucide-code-2" class="w-4 h-4" />
            REST API
          </button>
        </div>
      </div>

      <!-- ── Steps ─────────────────────────────────────────────────────── -->
      <div class="space-y-6 md:space-y-0">
        <div
          v-for="(step, i) in steps"
          :key="step.num"
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :visible="{ opacity: 1, y: 0, transition: { delay: i * 150, duration: 600 } }"
          class="relative"
        >
          <!-- Vertical connector -->
          <div
            v-if="i < steps.length - 1"
            class="hidden md:block absolute left-[calc(50%-0.5px)] top-full w-px h-6 bg-gradient-to-b from-primary/30 to-transparent z-10"
          />

          <div
            class="grid md:grid-cols-2 gap-6 md:gap-12 items-center mb-6 md:mb-16"
            :class="i % 2 !== 0 ? 'md:[direction:rtl]' : ''"
          >

            <!-- Text side ─────────────────────────────────────────────── -->
            <div class="md:[direction:ltr]">
              <!-- Decorative number -->
              <div
                class="absolute font-black text-[7rem] md:text-[9rem] leading-none select-none pointer-events-none text-(--ui-text-highlighted)/[0.04]"
                :class="i % 2 === 0 ? '-left-4' : '-right-4'"
              >{{ step.num }}</div>

              <div class="relative">
                <!-- Step indicator -->
                <div class="flex items-center gap-3 mb-5">
                  <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center shadow-md shadow-blue-500/30 text-white text-xs font-black flex-shrink-0">
                    {{ i + 1 }}
                  </div>
                  <div class="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
                  <span class="text-xs font-bold text-primary/60 tracking-widest uppercase">
                    Step {{ step.num }}
                  </span>
                </div>

                <h3 class="text-2xl md:text-3xl font-extrabold text-(--ui-text-highlighted) mb-4 leading-tight">
                  {{ step.title }}
                </h3>
                <p class="text-(--ui-text-muted) leading-relaxed mb-6">
                  {{ step.desc }}
                </p>

                <!-- Points -->
                <ul class="space-y-2.5 mb-6">
                  <li
                    v-for="point in step.points"
                    :key="point"
                    class="flex items-center gap-2.5 text-sm text-(--ui-text)"
                  >
                    <div class="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <UIcon name="i-lucide-check" class="w-3 h-3 text-primary" />
                    </div>
                    {{ point }}
                  </li>
                </ul>

                <!-- Path label pill -->
                <div class="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-primary/8 text-primary border border-primary/15">
                  <UIcon :name="activePath === 'csv' ? step.csv.icon : step.api.icon" class="w-3.5 h-3.5" />
                  {{ activePath === 'csv' ? step.csv.label : step.api.label }}
                </div>
              </div>
            </div>

            <!-- Visual side ────────────────────────────────────────────── -->
            <div class="md:[direction:ltr]">
              <Transition name="path-switch" mode="out-in">

                <!-- ── Step 1 CSV ── -->
                <div
                  v-if="i === 0 && activePath === 'csv'"
                  key="s1-csv"
                  class="rounded-2xl border border-(--ui-border) bg-(--ui-bg) shadow-xl overflow-hidden"
                >
                  <div class="flex items-center gap-1.5 px-4 py-3 bg-(--ui-bg-elevated) border-b border-(--ui-border)">
                    <span class="w-2 h-2 rounded-full bg-rose-400/70" />
                    <span class="w-2 h-2 rounded-full bg-amber-400/70" />
                    <span class="w-2 h-2 rounded-full bg-emerald-400/70" />
                    <span class="flex-1 text-center text-[11px] text-(--ui-text-dimmed)">DQE — Upload</span>
                  </div>
                  <div class="p-5">
                    <!-- Drop zone -->
                    <div class="border-2 border-dashed border-primary/30 bg-primary/5 rounded-xl p-6 text-center mb-4">
                      <UIcon name="i-lucide-upload-cloud" class="w-8 h-8 text-primary/40 mx-auto mb-2" />
                      <p class="text-sm font-semibold text-(--ui-text-highlighted)">{{ step.csv.mockup.filename }}</p>
                      <p class="text-xs text-primary mt-1">{{ step.csv.mockup.rows }}</p>
                    </div>
                    <!-- Detected columns -->
                    <p class="text-[10px] text-(--ui-text-dimmed) font-bold uppercase tracking-widest mb-2">Detected columns</p>
                    <div class="flex flex-wrap gap-2 mb-4">
                      <div
                        v-for="col in step.csv.mockup.columns"
                        :key="col"
                        class="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-primary/8 text-primary border border-primary/15"
                      >
                        <UIcon name="i-lucide-check-circle-2" class="w-3 h-3" />
                        {{ col }}
                      </div>
                    </div>
                    <UButton block label="Start validation →" size="sm" />
                  </div>
                </div>

                <!-- ── Step 1 API ── -->
                <div
                  v-else-if="i === 0 && activePath === 'api'"
                  key="s1-api"
                  class="rounded-2xl border border-(--ui-border) bg-(--ui-bg) shadow-xl overflow-hidden"
                >
                  <div class="flex items-center gap-1.5 px-4 py-3 bg-(--ui-bg-elevated) border-b border-(--ui-border)">
                    <span class="w-2 h-2 rounded-full bg-rose-400/70" />
                    <span class="w-2 h-2 rounded-full bg-amber-400/70" />
                    <span class="w-2 h-2 rounded-full bg-emerald-400/70" />
                    <span class="flex-1 text-center text-[11px] text-(--ui-text-dimmed)">Terminal</span>
                  </div>
                  <div class="p-4 bg-zinc-950">
                    <pre class="text-[11px] leading-relaxed overflow-x-auto"><code><span class="text-teal-400">{{ step.api.code }}</span></code></pre>
                  </div>
                </div>

                <!-- ── Step 2 CSV ── -->
                <div
                  v-else-if="i === 1 && activePath === 'csv'"
                  key="s2-csv"
                  class="rounded-2xl border border-(--ui-border) bg-(--ui-bg) shadow-xl overflow-hidden"
                >
                  <div class="flex items-center gap-1.5 px-4 py-3 bg-(--ui-bg-elevated) border-b border-(--ui-border)">
                    <span class="w-2 h-2 rounded-full bg-rose-400/70" />
                    <span class="w-2 h-2 rounded-full bg-amber-400/70" />
                    <span class="w-2 h-2 rounded-full bg-emerald-400/70" />
                    <span class="flex-1 text-center text-[11px] text-(--ui-text-dimmed)">Processing batch…</span>
                    <UBadge size="xs" color="primary" variant="soft" label="Live" class="animate-pulse" />
                  </div>
                  <div class="p-5 space-y-3">
                    <!-- Stats row -->
                    <div class="grid grid-cols-3 gap-3">
                      <div
                        v-for="stat in step.csv.stats"
                        :key="stat.label"
                        class="text-center p-2.5 rounded-lg bg-(--ui-bg-elevated) border border-(--ui-border)"
                      >
                        <div class="text-sm font-extrabold text-(--ui-text-highlighted)">{{ stat.value }}</div>
                        <div class="text-[10px] text-(--ui-text-dimmed)">{{ stat.label }}</div>
                      </div>
                    </div>
                    <!-- Progress bars -->
                    <div
                      v-for="bar in step.csv.progress"
                      :key="bar.label"
                      class="space-y-1"
                    >
                      <div class="flex justify-between text-xs">
                        <span class="text-(--ui-text-muted)">{{ bar.label }}</span>
                        <span class="font-semibold text-(--ui-text-highlighted)">{{ bar.pct }}%</span>
                      </div>
                      <div class="h-1.5 w-full rounded-full bg-(--ui-bg-accented) overflow-hidden">
                        <div
                          class="h-full rounded-full transition-all duration-1000"
                          :class="bar.color"
                          :style="{ width: bar.pct + '%' }"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- ── Step 2 API ── -->
                <div
                  v-else-if="i === 1 && activePath === 'api'"
                  key="s2-api"
                  class="rounded-2xl border border-(--ui-border) overflow-hidden shadow-xl"
                >
                  <div class="flex items-center gap-1.5 px-4 py-3 bg-(--ui-bg-elevated) border-b border-(--ui-border)">
                    <span class="w-2 h-2 rounded-full bg-rose-400/70" />
                    <span class="w-2 h-2 rounded-full bg-amber-400/70" />
                    <span class="w-2 h-2 rounded-full bg-emerald-400/70" />
                    <span class="flex-1 text-center text-[11px] text-(--ui-text-dimmed)">API Response · 74ms</span>
                    <div class="flex items-center gap-1 text-[10px] text-success bg-success/10 px-2 py-0.5 rounded-full">
                      <span class="w-1.5 h-1.5 rounded-full bg-success" />
                      200 OK
                    </div>
                  </div>
                  <div class="p-4 bg-zinc-950">
                    <pre class="text-[11px] leading-relaxed overflow-x-auto"><code><span class="text-slate-300">{{ step.api.code }}</span></code></pre>
                  </div>
                </div>

                <!-- ── Step 3 CSV ── -->
                <div
                  v-else-if="i === 2 && activePath === 'csv'"
                  key="s3-csv"
                  class="rounded-2xl border border-(--ui-border) bg-(--ui-bg) shadow-xl overflow-hidden"
                >
                  <div class="flex items-center gap-1.5 px-4 py-3 bg-(--ui-bg-elevated) border-b border-(--ui-border)">
                    <span class="w-2 h-2 rounded-full bg-rose-400/70" />
                    <span class="w-2 h-2 rounded-full bg-amber-400/70" />
                    <span class="w-2 h-2 rounded-full bg-emerald-400/70" />
                    <span class="flex-1 text-center text-[11px] text-(--ui-text-dimmed)">Enriched output ready</span>
                  </div>
                  <div class="p-5">
                    <p class="text-[10px] text-(--ui-text-dimmed) font-bold uppercase tracking-widest mb-3">Output columns</p>
                    <div class="space-y-1.5 mb-4">
                      <div
                        v-for="col in step.csv.columns"
                        :key="col.name"
                        class="flex items-center justify-between px-3 py-2 rounded-lg border"
                        :class="col.status === 'new'
                          ? 'bg-success/5 border-success/20'
                          : 'bg-(--ui-bg-elevated) border-(--ui-border)'"
                      >
                        <span
                          class="text-xs font-mono font-medium"
                          :class="col.status === 'new' ? 'text-success' : 'text-(--ui-text-muted)'"
                        >{{ col.name }}</span>
                        <UBadge
                          v-if="col.status === 'new'"
                          size="xs"
                          color="success"
                          variant="soft"
                          label="+ new"
                        />
                      </div>
                    </div>
                    <UButton
                      block
                      label="Download enriched CSV"
                      leading-icon="i-lucide-download"
                      size="sm"
                      variant="soft"
                    />
                  </div>
                </div>

                <!-- ── Step 3 API ── -->
                <div
                  v-else-if="i === 2 && activePath === 'api'"
                  key="s3-api"
                  class="rounded-2xl border border-(--ui-border) bg-(--ui-bg) shadow-xl overflow-hidden"
                >
                  <div class="flex items-center gap-1.5 px-4 py-3 bg-(--ui-bg-elevated) border-b border-(--ui-border)">
                    <span class="w-2 h-2 rounded-full bg-rose-400/70" />
                    <span class="w-2 h-2 rounded-full bg-amber-400/70" />
                    <span class="w-2 h-2 rounded-full bg-emerald-400/70" />
                    <span class="flex-1 text-center text-[11px] text-(--ui-text-dimmed)">CRM Integrations</span>
                  </div>
                  <div class="p-5 space-y-2.5">
                    <!-- Phase 2 banner -->
                    <div class="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-500/8 border border-amber-500/15 mb-3">
                      <UIcon name="i-lucide-clock" class="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                      <p class="text-xs text-amber-600 dark:text-amber-400 font-medium">
                        CRM integrations launching in Phase 2
                      </p>
                    </div>

                    <p class="text-[10px] text-(--ui-text-dimmed) font-bold uppercase tracking-widest mb-3">
                      Push validated data to
                    </p>

                    <div
                      v-for="dest in step.api.destinations"
                      :key="dest.name"
                      class="flex items-center gap-3 p-3 rounded-xl border border-(--ui-border) bg-(--ui-bg-elevated) opacity-60"
                    >
                      <div
                        class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        :class="dest.color"
                      >
                        <UIcon :name="dest.icon" class="w-4 h-4" />
                      </div>
                      <span class="text-sm font-semibold text-(--ui-text-highlighted) flex-1">
      {{ dest.name }}
    </span>
                      <UBadge size="xs" color="neutral" variant="soft" label="Phase 2" />
                    </div>
                  </div>
                </div>

              </Transition>
            </div>

          </div>

          <!-- Step connector -->
          <div
            v-if="i < steps.length - 1"
            class="hidden md:flex justify-center mb-4 -mt-10"
          >
            <div class="flex flex-col items-center gap-1">
              <div class="w-px h-6 bg-gradient-to-b from-primary/40 to-primary/10" />
              <div class="w-7 h-7 rounded-full border-2 border-primary/25 bg-(--ui-bg-muted) flex items-center justify-center">
                <UIcon name="i-lucide-chevron-down" class="w-3.5 h-3.5 text-primary/50" />
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- ── Bottom CTA ─────────────────────────────────────────────────── -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible="{ opacity: 1, y: 0, transition: { delay: 300, duration: 500 } }"
        class="mt-10 text-center"
      >
        <div class="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl border border-(--ui-border) bg-(--ui-bg)">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
              <UIcon name="i-lucide-timer" class="w-5 h-5 text-success" />
            </div>
            <div class="text-left">
              <p class="text-sm font-bold text-(--ui-text-highlighted)">Ready in under 5 minutes</p>
              <p class="text-xs text-(--ui-text-muted)">No credit card · No sales call · 100 free validations</p>
            </div>
          </div>
          <USeparator orientation="vertical" class="hidden sm:block h-10" />
          <UButton
            label="Start validating now"
            trailing-icon="i-lucide-arrow-right"
            class="shadow-md shadow-primary/20 w-full sm:w-auto"
          />
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.path-switch-enter-active,
.path-switch-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.path-switch-enter-from { opacity: 0; transform: translateX(12px);  }
.path-switch-leave-to   { opacity: 0; transform: translateX(-12px); }
</style>
