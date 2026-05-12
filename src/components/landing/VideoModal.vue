<script setup lang="ts">
import { ref, watch, computed } from 'vue'

const props = withDefaults(defineProps<{
  videoId?:    string   // YouTube video ID
  videoUrl?:   string   // or a direct mp4 URL
  title?:      string
  platform?:   'youtube' | 'vimeo' | 'mp4'
}>(), {
  videoId:  'dQw4w9WgXcQ', // replace with your real demo video ID
  title:    'See Deduply in action',
  platform: 'youtube',
})

const open = defineModel<boolean>('open', { default: false })

// Stop video when modal closes
const iframeKey = ref(0)
watch(open, (val) => {
  if (!val) iframeKey.value++
})

const embedUrl = computed(() => {
  if (props.platform === 'youtube') {
    return `https://www.youtube.com/embed/${props.videoId}?autoplay=1&rel=0&modestbranding=1&color=white`
  }
  if (props.platform === 'vimeo') {
    return `https://player.vimeo.com/video/${props.videoId}?autoplay=1&color=8b5cf6`
  }
  return props.videoUrl ?? ''
})
</script>

<template>
  <UModal
    v-model:open="open"
    :ui="{
      content: 'max-w-4xl overflow-hidden bg-zinc-950 border-white/10',
      overlay: 'bg-black/80 backdrop-blur-md',
    }"
  >
    <template #content>
      <div class="flex flex-col">
        <!-- ── Header ───────────────────────────────────────────────── -->
        <div class="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div class="flex items-center gap-3">
            <div class="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
              <UIcon
                name="i-lucide-git-merge"
                class="w-4 h-4 text-white"
              />
            </div>
            <span class="text-sm font-semibold text-white">{{ title }}</span>
          </div>

          <div class="flex items-center gap-2">
            <!-- Duration badge -->
            <div class="flex items-center gap-1.5 text-xs text-white/50 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
              <UIcon
                name="i-lucide-clock"
                class="w-3 h-3"
              />
              2 min
            </div>
            <!-- Close -->
            <button
              class="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
              @click="open = false"
            >
              <UIcon
                name="i-lucide-x"
                class="w-4 h-4"
              />
            </button>
          </div>
        </div>

        <!-- ── Video ─────────────────────────────────────────────────── -->
        <div
          class="relative w-full bg-black"
          style="padding-bottom: 56.25%"
        >
          <!-- Iframe embed (YouTube / Vimeo) -->
          <iframe
            v-if="platform !== 'mp4'"
            :key="iframeKey"
            :src="open ? embedUrl : ''"
            class="absolute inset-0 w-full h-full"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />

          <!-- Native mp4 -->
          <video
            v-else
            :key="iframeKey"
            class="absolute inset-0 w-full h-full object-cover"
            controls
            autoplay
            :src="videoUrl"
          />
        </div>

        <!-- ── Footer ───────────────────────────────────────────────── -->
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4 px-5 py-4 border-t border-white/10 bg-zinc-950">
          <p class="text-sm text-white/50 text-center sm:text-left">
            Ready to clean your CRM?
          </p>
          <div class="flex items-center gap-3">
            <UButton
              size="sm"
              variant="ghost"
              label="Book a demo"
              leading-icon="i-lucide-calendar-days"
              class="text-white! hover:bg-white/10!"
              @click="open = false; $emit('bookDemo')"
            />
            <UButton
              size="sm"
              label="Start for free"
              trailing-icon="i-lucide-arrow-right"
              class="shadow-lg shadow-primary/30"
              @click="open = false; $emit('startFree')"
            />
          </div>
        </div>
      </div>
    </template>
  </UModal>
</template>
