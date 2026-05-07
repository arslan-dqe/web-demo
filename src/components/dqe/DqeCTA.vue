<script setup lang="ts">
const emit = defineEmits<{
  primary:   []
  secondary: []
}>()

const trustItems = [
  { icon: 'i-lucide-credit-card',  label: 'No credit card to start' },
  { icon: 'i-lucide-clock',        label: '5-minute setup'          },
  { icon: 'i-lucide-shield-check', label: 'SOC 2 Type II'           },
  { icon: 'i-lucide-award',        label: 'USPS CASS Certified'     },
]
</script>

<template>
  <section class="py-24 px-4">
    <div
      v-motion
      :initial="{ opacity: 0, scale: 0.97 }"
      :visible="{ opacity: 1, scale: 1, transition: { duration: 700 } }"
      class="max-w-5xl mx-auto"
    >
      <div class="relative overflow-hidden rounded-3xl">

        <!-- Gradient background -->
        <div class="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-600 to-teal-500" />

        <!-- Orbs -->
        <div
          class="absolute -top-16 -right-16 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"
          style="animation-duration:5s"
        />
        <div
          class="absolute -bottom-16 -left-16 w-56 h-56 bg-white/10 rounded-full blur-3xl animate-pulse"
          style="animation-duration:7s; animation-delay:1.5s"
        />
        <div
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl animate-pulse"
          style="animation-duration:9s; animation-delay:3s"
        />

        <!-- Grid overlay -->
        <div
          class="absolute inset-0 opacity-[0.07]"
          style="background-image: linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px); background-size: 32px 32px"
        />

        <!-- USPS badge — top right -->
        <div class="absolute top-5 right-6 hidden md:flex items-center gap-2 bg-white/10 border border-white/20 text-white/70 text-xs font-semibold px-3 py-1.5 rounded-full">
          <UIcon name="i-lucide-award" class="w-3.5 h-3.5" />
          USPS CASS Certified
        </div>

        <div class="relative z-10 px-8 md:px-16 py-16 md:py-20">

          <!-- Two column layout -->
          <div class="grid md:grid-cols-2 gap-10 items-center">

            <!-- Left: Copy -->
            <div>
              <!-- Pill badge -->
              <div class="inline-flex items-center gap-2 bg-white/15 border border-white/25 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
                <span class="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                100 free validations — no card needed
              </div>

              <h2 class="text-3xl md:text-4xl font-extrabold text-white mb-5 leading-tight">
                Clean data starts
                <br />with one API call.
              </h2>
              <p class="text-white/70 text-base md:text-lg leading-relaxed mb-8">
                Stop losing revenue to bad addresses, bounced emails, and wrong phone numbers.
                Set up DQE in 5 minutes and validate your first records free.
              </p>

              <!-- CTAs -->
              <div class="flex flex-wrap gap-3 mb-8">
                <UButton
                  size="lg"
                  color="neutral"
                  label="Start free — 100 validations"
                  trailing-icon="i-lucide-arrow-right"
                  class="bg-white! text-blue-700! font-bold! shadow-2xl hover:shadow-white/20"
                  @click="emit('primary')"
                />
                <UButton
                  size="lg"
                  variant="ghost"
                  label="Talk to team"
                  leading-icon="i-lucide-calendar-days"
                  class="text-white! border-white/30! hover:bg-white/10!"
                  @click="emit('secondary')"
                />
              </div>

              <!-- Trust items -->
              <div class="flex flex-wrap gap-x-5 gap-y-2">
                <div
                  v-for="item in trustItems"
                  :key="item.label"
                  class="flex items-center gap-1.5 text-xs text-white/60"
                >
                  <UIcon :name="item.icon" class="w-3.5 h-3.5 text-white/40" />
                  {{ item.label }}
                </div>
              </div>
            </div>

            <!-- Right: Stats card -->
            <div class="bg-white/10 border border-white/15 backdrop-blur-sm rounded-2xl p-6 space-y-4">
              <p class="text-xs text-white/50 font-bold uppercase tracking-widest mb-4">
                What you get immediately
              </p>

              <div
                v-for="item in [
                  { icon: 'i-lucide-map-pin',  title: 'Address Validation',  desc: 'USPS CASS · ZIP+4 · DPV · County append' },
                  { icon: 'i-lucide-mail',     title: 'Email Validation',    desc: 'SMTP · MX records · Disposable detection' },
                  { icon: 'i-lucide-phone',    title: 'Phone Validation',    desc: 'Carrier · Line type · TCPA compliance'    },
                ]"
                :key="item.title"
                class="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div class="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <UIcon :name="item.icon" class="w-4 h-4 text-white" />
                </div>
                <div>
                  <p class="text-sm font-bold text-white">{{ item.title }}</p>
                  <p class="text-xs text-white/50 mt-0.5">{{ item.desc }}</p>
                </div>
                <div class="ml-auto flex-shrink-0">
                  <div class="w-5 h-5 rounded-full bg-teal-400/20 border border-teal-400/30 flex items-center justify-center">
                    <UIcon name="i-lucide-check" class="w-3 h-3 text-teal-300" />
                  </div>
                </div>
              </div>

              <!-- vs Smarty nudge -->
              <div class="pt-2 border-t border-white/10 flex items-center gap-2">
                <UIcon name="i-lucide-swords" class="w-3.5 h-3.5 text-white/40" />
                <p class="text-xs text-white/40">
                  Coming from Smarty?
                  <a href="/vs-smarty" class="text-white/70 font-semibold hover:text-white transition-colors underline">
                    Migrate in 10 minutes →
                  </a>
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </section>
</template>
