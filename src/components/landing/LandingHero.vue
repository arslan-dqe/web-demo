<script setup lang="ts">
import { ref } from 'vue'
import VideoModal     from '@/components/landing/VideoModal.vue'
const videoOpen  = ref(false)
const signupOpen = ref(false)

interface DemoRecord {
  id: number
  name: string
  email: string
  company: string
  score: number
  group: string
  master: boolean
}

withDefaults(defineProps<{
  badge?:       string
  headline?:    string[]   // array of lines
  highlight?:   string     // the gradient word/phrase
  description?: string
  primaryCta?:  string
  secondaryCta?: string
  trustAvatars?: string[]
  trustText?:   string
  rating?:      number
  ratingSource?: string
}>(), {
  badge:        'Now with GPT-4o matching engine',
  headline:     () => ['Your CRM data is'],
  highlight:    'lying to you.',
  description:  "Deduply's AI finds and merges duplicate contacts, leads & accounts in your CRM — catching fuzzy matches that rules-based tools miss every time.",
  primaryCta:   'Clean my CRM for free',
  secondaryCta: 'Watch 2-min demo',
  trustAvatars: () => ['AT', 'JW', 'PN', 'MR', 'SK'],
  trustText:    'Trusted by <strong class="text-(--ui-text)">2,400+ RevOps teams</strong>',
  rating:       4.9,
  ratingSource: 'G2',
})

const emit = defineEmits<{
  primaryCta:   []
  secondaryCta: []
}>()

// ── Demo state ────────────────────────────────────────────────────────────
const demoRecords = ref<DemoRecord[]>([
  { id: 1, name: 'Jonathan Smith',   email: 'jon.smith@acmecorp.com',           company: 'Acme Corp',       score: 97, group: 'A', master: true  },
  { id: 2, name: 'Jon Smith',        email: 'j.smith@acme.com',                 company: 'Acme Inc.',       score: 97, group: 'A', master: false },
  { id: 3, name: 'Sarah L. Johnson', email: 'sarah.j@globaltech.io',            company: 'GlobalTech',      score: 91, group: 'B', master: true  },
  { id: 4, name: 'Sara Johnson',     email: 'sjohnson@global-tech.com',         company: 'Global Tech Inc', score: 91, group: 'B', master: false },
  { id: 5, name: 'Michael R. Davis', email: 'mdavis@vertex.com',               company: 'Vertex Solutions', score: 88, group: 'C', master: true  },
  { id: 6, name: 'Mike Davis',       email: 'michael.davis@vertexsolutions.com', company: 'Vertex',         score: 88, group: 'C', master: false },
])

const masterRecords = demoRecords.value.filter(r => r.master)

const merged  = ref(false)
const merging = ref(false)

function runMerge() {
  merging.value = true
  setTimeout(() => { merged.value = true; merging.value = false }, 1800)
}
function reset() { merged.value = false }

const groupColorMap: Record<string, string> = {
  A: 'bg-primary/10 text-primary border border-primary/20',
  B: 'bg-secondary/10 text-secondary border border-secondary/20',
  C: 'bg-warning/10 text-warning border border-warning/20',
}

const avatarColors = [
  'bg-primary/20 text-primary',
  'bg-secondary/20 text-secondary',
  'bg-success/20 text-success',
  'bg-warning/20 text-warning',
  'bg-info/20 text-info',
]
</script>

<template>
  <VideoModal
    v-model:open="videoOpen"
    video-id="aqz-KE-bpKQ"
    @start-free="signupOpen = true"
  />
  <StartFreeModal v-model:open="signupOpen" />


  <!--  <VideoModal-->
  <!--    v-model:open="videoOpen"-->
  <!--    platform="mp4"-->
  <!--    video-url="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"-->
  <!--    title="See Deduply in action — 2 min"-->
  <!--  />-->

  <section class="relative min-h-screen flex flex-col items-center justify-center px-4 pt-28 pb-20 overflow-hidden">
    <!-- Animated background orbs -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        class="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-primary/20 blur-3xl animate-pulse"
        style="animation-duration:4s"
      />
      <div
        class="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-secondary/20 blur-3xl animate-pulse"
        style="animation-duration:6s; animation-delay:1s"
      />
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-primary/10 blur-2xl animate-pulse"
        style="animation-duration:8s; animation-delay:2s"
      />
    </div>

    <!-- Grid pattern overlay -->
    <div
      class="absolute inset-0 opacity-[0.03]"
      style="background-image: linear-gradient(rgba(139,92,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.5) 1px, transparent 1px); background-size: 40px 40px"
    />

    <!-- Content -->
    <div class="relative z-10 text-center max-w-4xl mx-auto">
      <!-- Badge slot or default -->
      <slot name="badge">
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 100, duration: 600 } }"
          class="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-6"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          {{ badge }}
          <UIcon
            name="i-lucide-arrow-right"
            class="w-3 h-3"
          />
        </div>
      </slot>

      <!-- Headline slot or default -->
      <slot name="headline">
        <h1
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 200, duration: 700 } }"
          class="text-5xl md:text-7xl font-extrabold leading-[1.1] text-(--ui-text-highlighted) mb-6"
        >
          <span
            v-for="(line, i) in headline"
            :key="i"
          >
            {{ line }}<br>
          </span>
          <span class="relative inline-block">
            <span class="bg-gradient-to-r from-primary via-violet-400 to-secondary bg-clip-text text-transparent">
              {{ highlight }}
            </span>
            <svg
              class="absolute -bottom-2 left-0 w-full"
              height="6"
              viewBox="0 0 300 6"
              preserveAspectRatio="none"
            >
              <path
                d="M0 3 Q37.5 0 75 3 Q112.5 6 150 3 Q187.5 0 225 3 Q262.5 6 300 3"
                stroke="url(#hero-grad)"
                stroke-width="2.5"
                fill="none"
                stroke-linecap="round"
              />
              <defs>
                <linearGradient
                  id="hero-grad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop
                    offset="0%"
                    stop-color="#8b5cf6"
                  />
                  <stop
                    offset="100%"
                    stop-color="#06b6d4"
                  />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </h1>
      </slot>

      <!-- Description -->
      <p
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 350, duration: 600 } }"
        class="text-lg md:text-xl text-(--ui-text-muted) max-w-2xl mx-auto mb-10 leading-relaxed"
      >
        <slot name="description">
          {{ description }}
        </slot>
      </p>

      <!-- CTAs slot or default -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 500, duration: 600 } }"
        class="flex flex-wrap items-center justify-center gap-4 mb-14"
      >
        <slot name="cta">
          <UButton
            size="xl"
            :label="primaryCta"
            trailing-icon="i-lucide-arrow-right"
            class="shadow-lg shadow-primary/30"
            @click="emit('primaryCta')"
          />
          <UButton
            size="xl"
            variant="ghost"
            :label="secondaryCta"
            leading-icon="i-lucide-play-circle"
            @click="videoOpen = true"
          />
        </slot>
      </div>

      <!-- Social proof -->
      <div
        v-motion
        :initial="{ opacity: 0 }"
        :enter="{ opacity: 1, transition: { delay: 700, duration: 800 } }"
        class="flex flex-wrap items-center justify-center gap-6 text-xs text-(--ui-text-muted)"
      >
        <slot name="social-proof">
          <div class="flex -space-x-2">
            <div
              v-for="(av, i) in trustAvatars"
              :key="i"
              class="w-7 h-7 rounded-full border-2 border-(--ui-bg) flex items-center justify-center text-[10px] font-bold"
              :class="avatarColors[i % avatarColors.length]"
            >
              {{ av }}
            </div>
          </div>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="trustText" />
          <USeparator
            orientation="vertical"
            class="h-4"
          />
          <div class="flex items-center gap-1">
            <StarRating :rating="rating" />
            <span class="ml-1"><strong class="text-(--ui-text)">{{ rating }}</strong> / 5 on {{ ratingSource }}</span>
          </div>
        </slot>
      </div>
    </div>

    <!-- Demo card slot or default -->
    <div
      v-motion
      :initial="{ opacity: 0, y: 60, scale: 0.95 }"
      :enter="{ opacity: 1, y: 0, scale: 1, transition: { delay: 800, duration: 800 } }"
      class="relative z-10 mt-16 w-full max-w-3xl"
    >
      <slot name="demo">
        <div class="rounded-2xl border border-(--ui-border) bg-(--ui-bg)/80 backdrop-blur-xl shadow-2xl shadow-primary/10 overflow-hidden">
          <!-- Window bar -->
          <div class="flex items-center gap-2 px-4 py-3 bg-(--ui-bg-elevated) border-b border-(--ui-border)">
            <span class="w-3 h-3 rounded-full bg-rose-400" />
            <span class="w-3 h-3 rounded-full bg-amber-400" />
            <span class="w-3 h-3 rounded-full bg-emerald-400" />
            <span class="flex-1 text-center text-xs text-(--ui-text-muted) font-medium">Deduply — Live Merge Preview</span>
            <UBadge
              v-if="!merged"
              size="xs"
              color="warning"
              variant="soft"
              label="6 duplicates detected"
            />
            <UBadge
              v-else
              size="xs"
              color="success"
              variant="soft"
              label="✓ 3 records merged"
            />
          </div>

          <div class="p-4">
            <Transition
              name="fade-slide"
              mode="out-in"
            >
              <!-- Before -->
              <div
                v-if="!merged"
                key="before"
              >
                <div class="space-y-2 mb-4">
                  <div
                    v-for="rec in demoRecords"
                    :key="rec.id"
                    class="flex items-center gap-3 p-3 rounded-xl border transition-all duration-300"
                    :class="[
                      rec.master
                        ? 'bg-(--ui-bg-elevated) border-(--ui-border-accented)'
                        : 'bg-error/5 border-error/20',
                      merging ? 'animate-pulse' : ''
                    ]"
                  >
                    <div
                      class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                      :class="groupColorMap[rec.group]"
                    >
                      {{ rec.group }}
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center gap-2">
                        <span class="text-sm font-semibold text-(--ui-text-highlighted) truncate">{{ rec.name }}</span>
                        <UBadge
                          v-if="rec.master"
                          size="xs"
                          color="primary"
                          variant="soft"
                          label="Master"
                        />
                        <UBadge
                          v-else
                          size="xs"
                          color="error"
                          variant="soft"
                          label="Dupe"
                        />
                      </div>
                      <p class="text-xs text-(--ui-text-muted) truncate">
                        {{ rec.email }} · {{ rec.company }}
                      </p>
                    </div>
                    <div class="text-right flex-shrink-0">
                      <div class="text-xs font-bold text-primary">
                        {{ rec.score }}%
                      </div>
                      <div class="text-[10px] text-(--ui-text-dimmed)">
                        match
                      </div>
                    </div>
                  </div>
                </div>
                <UButton
                  block
                  :loading="merging"
                  :label="merging ? 'AI is merging records…' : 'Run AI Merge'"
                  leading-icon="i-lucide-sparkles"
                  @click="runMerge"
                />
              </div>

              <!-- After -->
              <div
                v-else
                key="after"
              >
                <div class="text-center py-3 mb-4">
                  <div class="inline-flex items-center gap-2 text-success bg-success/10 px-4 py-2 rounded-full text-sm font-semibold">
                    <UIcon
                      name="i-lucide-check-circle-2"
                      class="w-4 h-4"
                    />
                    Merge complete — 6 records → 3 clean contacts
                  </div>
                </div>
                <div class="space-y-2 mb-4">
                  <div
                    v-for="rec in masterRecords"
                    :key="rec.id"
                    v-motion
                    :initial="{ opacity: 0, x: -20 }"
                    :enter="{ opacity: 1, x: 0, transition: { delay: rec.id * 100, duration: 400 } }"
                    class="flex items-center gap-3 p-3 rounded-xl border bg-(--ui-bg-elevated) border-(--ui-border-accented)"
                  >
                    <div
                      class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                      :class="groupColorMap[rec.group]"
                    >
                      {{ rec.group }}
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center gap-2">
                        <span class="text-sm font-semibold text-(--ui-text-highlighted) truncate">{{ rec.name }}</span>
                        <UBadge
                          size="xs"
                          color="success"
                          variant="soft"
                          label="✓ Clean"
                        />
                      </div>
                      <p class="text-xs text-(--ui-text-muted) truncate">
                        {{ rec.email }} · {{ rec.company }}
                      </p>
                    </div>
                    <UIcon
                      name="i-lucide-check-circle-2"
                      class="w-4 h-4 text-success flex-shrink-0"
                    />
                  </div>
                </div>
                <UButton
                  block
                  variant="soft"
                  label="Reset demo"
                  leading-icon="i-lucide-rotate-ccw"
                  @click="reset"
                />
              </div>
            </Transition>
          </div>
        </div>
      </slot>
    </div>
  </section>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.fade-slide-enter-from { opacity: 0; transform: translateY(12px);  }
.fade-slide-leave-to   { opacity: 0; transform: translateY(-12px); }
</style>
