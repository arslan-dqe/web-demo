<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

const props = defineProps<{ text: string; size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' }>()

const { copy, copied, isSupported } = useClipboard({ source: () => props.text })
</script>

<template>
  <UButton
    v-if="isSupported"
    :icon="copied ? 'i-lucide-copy-check' : 'i-lucide-copy'"
    :color="copied ? 'success' : 'neutral'"
    variant="ghost"
    :size="size ?? 'xs'"
    @click.stop="copy()"
  />
</template>
