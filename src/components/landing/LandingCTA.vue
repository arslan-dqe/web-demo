<script setup lang="ts">
import { ref } from 'vue'
import BookDemoModal from '@/components/landing/BookDemoModal.vue'
import StartFreeModal from '@/components/landing/StartFreeModal.vue'

const demoOpen = ref(false)
const signupOpen    = ref(false)

withDefaults(defineProps<{
  badge?:       string
  headline?:    string
  subline?:     string
  primaryCta?:  string
  secondaryCta?: string
}>(), {
  badge:        'Free for your first 1,000 records',
  headline:     'Stop sending emails to ghosts.\nClean your CRM today.',
  subline:      'Join 2,400+ RevOps teams who trust Deduply to keep their pipeline data accurate, complete, and duplicate-free.',
  primaryCta:   'Start for free — no card needed',
  secondaryCta: 'Book a demo',
})

defineEmits<{
  primary:   []
  secondary: []
}>()
</script>

<template>
  <BookDemoModal v-model:open="demoOpen" />
  <StartFreeModal v-model:open="signupOpen" />

  <section class="py-24 px-4">
    <div
      v-motion
      :initial="{ opacity: 0, scale: 0.97 }"
      :visible="{ opacity: 1, scale: 1, transition: { duration: 700 } }"
      class="max-w-4xl mx-auto relative overflow-hidden rounded-3xl"
    >
      <!-- Gradient background -->
      <div class="absolute inset-0 bg-gradient-to-br from-primary via-violet-600 to-secondary" />

      <!-- Orbs -->
      <div
        class="absolute -top-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"
        style="animation-duration:5s"
      />
      <div
        class="absolute -bottom-10 -left-10 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-pulse"
        style="animation-duration:7s; animation-delay:1s"
      />

      <!-- Grid overlay -->
      <div
        class="absolute inset-0 opacity-10"
        style="background-image: linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px); background-size: 30px 30px"
      />

      <!-- Content -->
      <div class="relative z-10 text-center px-8 py-16">
        <!-- Badge -->
        <slot name="badge">
          <div class="inline-flex items-center gap-2 bg-white/15 border border-white/25 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
            <span class="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            {{ badge }}
          </div>
        </slot>

        <!-- Headline -->
        <slot name="headline">
          <h2 class="text-3xl md:text-5xl font-extrabold text-white mb-5 leading-tight whitespace-pre-line">
            {{ headline }}
          </h2>
        </slot>

        <!-- Subline -->
        <slot name="subline">
          <p class="text-white/75 text-lg max-w-xl mx-auto mb-10">
            {{ subline }}
          </p>
        </slot>

        <!-- Buttons -->
        <slot name="actions">
          <div class="flex flex-wrap items-center justify-center gap-4">
            <UButton
              size="xl"
              color="neutral"
              :label="primaryCta"
              trailing-icon="i-lucide-arrow-right"
              class="bg-white! text-violet-700! font-bold! shadow-2xl hover:shadow-white/20"
              @click="signupOpen = true"
            />
            <UButton
              size="xl"
              variant="ghost"
              :label="secondaryCta"
              leading-icon="i-lucide-calendar-days"
              class="text-white! border-white/30! hover:bg-white/10!"
              @click="demoOpen = true"
            />
          </div>
        </slot>
      </div>
    </div>
  </section>
</template>
