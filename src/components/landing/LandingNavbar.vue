<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useColorMode } from '@vueuse/core'

const props = defineProps<{
  links?: { label: string; href: string }[]
}>()

const colorMode = useColorMode()
const scrollY = ref(0)
const onScroll = () => (scrollY.value = window.scrollY)
onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const defaultLinks = [
  { label: 'How it works', href: '#how' },
  { label: 'Features',     href: '#features' },
  { label: 'Pricing',      href: '#pricing' },
  { label: 'Customers',    href: '#testimonials' },
]

const navLinks = props.links ?? defaultLinks
</script>

<template>
  <header class="fixed top-4 inset-x-0 z-50 flex justify-center px-4 transition-all duration-500">
    <nav
      class="flex items-center gap-6 px-5 py-3 rounded-full border border-(--ui-border) backdrop-blur-xl shadow-xl transition-all duration-500"
      :class="scrollY > 40 ? 'bg-(--ui-bg)/80 shadow-primary/10' : 'bg-(--ui-bg)/60'"
    >
      <!-- Logo slot or default -->
      <slot name="logo">
        <a href="#" class="flex items-center gap-2 mr-2">
          <div class="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <UIcon name="i-lucide-git-merge" class="w-4 h-4 text-white" />
          </div>
          <span class="font-bold text-sm text-(--ui-text-highlighted) tracking-tight">Deduply</span>
        </a>
      </slot>

      <!-- Links -->
      <div class="hidden md:flex items-center gap-5">
        <a
          v-for="link in navLinks" :key="link.label"
          :href="link.href"
          class="text-xs font-medium text-(--ui-text-muted) hover:text-(--ui-text-highlighted) transition-colors"
        >{{ link.label }}</a>
      </div>

      <!-- Actions slot or default -->
      <div class="flex items-center gap-2 ml-2">
        <slot name="actions">
          <UButton
            size="xs"
            variant="ghost"
            :icon="colorMode === 'dark' ? 'i-lucide-sun' : 'i-lucide-moon'"
            @click="colorMode = colorMode === 'dark' ? 'light' : 'dark'"
          />
          <UButton size="xs" variant="soft" label="Sign in" />
          <UButton size="xs" label="Get started" />
        </slot>
      </div>
    </nav>
  </header>
</template>
