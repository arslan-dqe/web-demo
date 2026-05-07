<!-- src/components/dqe/DqeNavbar.vue -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useColorMode } from '@vueuse/core'
import { useRouter } from 'vue-router'

const colorMode = useColorMode()
const router    = useRouter()
const scrolled  = ref(false)
const solutionsOpen = ref(false)
let closeTimer: ReturnType<typeof setTimeout>

function onScroll() { scrolled.value = window.scrollY > 20 }
onMounted(()  => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

function openSolutions()  {
  clearTimeout(closeTimer)
  solutionsOpen.value = true
}
function closeSolutions() {
  closeTimer = setTimeout(() => { solutionsOpen.value = false }, 120)
}

const solutions = [
  {
    icon: 'i-lucide-shopping-cart',
    color: 'bg-blue-500/10 text-blue-500',
    label: 'Retail & E-commerce',
    desc:  'Cut failed deliveries and returns at checkout',
    href:  '/solutions/retail',
  },
  {
    icon: 'i-lucide-truck',
    color: 'bg-teal-500/10 text-teal-500',
    label: 'Logistics & Supply Chain',
    desc:  'Maximise last-mile delivery success rates',
    href:  '/solutions/logistics',
  },
  {
    icon: 'i-lucide-hotel',
    color: 'bg-violet-500/10 text-violet-500',
    label: 'Hospitality',
    desc:  'Unify guest profiles across OTA channels',
    href:  '/solutions/hospitality',
  },
  {
    icon: 'i-lucide-code-2',
    color: 'bg-amber-500/10 text-amber-500',
    label: 'Developers',
    desc:  'REST API · <150ms · 10B+ queries/year',
    href:  '/developers',
  },
]

const navLinks = [
  { label: 'Product',  href: '#product'  },
  { label: 'Pricing',  href: '#pricing'  },
  { label: 'Developers', href: '/developers' },
]

const mobileOpen = ref(false)
</script>

<template>
  <header
    class="fixed top-0 inset-x-0 z-50 transition-all duration-300"
    :class="scrolled
      ? 'bg-(--ui-bg)/90 backdrop-blur-xl border-b border-(--ui-border) shadow-sm'
      : 'bg-transparent'"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="flex items-center justify-between h-16">

        <!-- ── Logo ──────────────────────────────────────────────────── -->
        <a href="/" class="flex items-center gap-2.5 flex-shrink-0 group">
          <div class="relative w-8 h-8">
            <!-- Shield shape -->
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center shadow-md shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-shadow duration-300">
              <UIcon name="i-lucide-shield-check" class="w-4 h-4 text-white" />
            </div>
            <!-- Pulse dot -->
            <span class="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-teal-400 border-2 border-(--ui-bg) animate-pulse" />
          </div>
          <div class="flex flex-col leading-none">
            <span class="font-extrabold text-sm text-(--ui-text-highlighted) tracking-tight">DQE</span>
            <span class="text-[10px] text-(--ui-text-dimmed) font-medium tracking-wider uppercase">Validate</span>
          </div>
        </a>

        <!-- ── Desktop nav ────────────────────────────────────────────── -->
        <nav class="hidden lg:flex items-center gap-1">

          <!-- Solutions dropdown -->
          <div
            class="relative"
            @mouseenter="openSolutions"
            @mouseleave="closeSolutions"
          >
            <button
              class="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              :class="solutionsOpen
                ? 'text-(--ui-text-highlighted) bg-(--ui-bg-elevated)'
                : 'text-(--ui-text-muted) hover:text-(--ui-text-highlighted) hover:bg-(--ui-bg-elevated)'"
            >
              Solutions
              <UIcon
                name="i-lucide-chevron-down"
                class="w-3.5 h-3.5 transition-transform duration-200"
                :class="solutionsOpen ? 'rotate-180' : ''"
              />
            </button>

            <!-- Mega dropdown -->
            <Transition name="dropdown">
              <div
                v-if="solutionsOpen"
                class="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[480px] rounded-2xl border border-(--ui-border) bg-(--ui-bg)/95 backdrop-blur-xl shadow-2xl shadow-black/10 overflow-hidden"
                @mouseenter="openSolutions"
                @mouseleave="closeSolutions"
              >
                <!-- Header -->
                <div class="px-4 py-3 border-b border-(--ui-border) bg-(--ui-bg-elevated)">
                  <p class="text-xs font-bold text-(--ui-text-dimmed) uppercase tracking-widest">
                    Solutions by industry
                  </p>
                </div>

                <!-- Items -->
                <div class="p-2 grid grid-cols-2 gap-1">
                  <a
                    v-for="sol in solutions"
                    :key="sol.label"
                    :href="sol.href"
                    class="flex items-start gap-3 p-3 rounded-xl hover:bg-(--ui-bg-elevated) transition-colors group/sol"
                    @click="solutionsOpen = false"
                  >
                    <div
                      class="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/sol:scale-110 transition-transform duration-200"
                      :class="sol.color"
                    >
                      <UIcon :name="sol.icon" class="w-4 h-4" />
                    </div>
                    <div>
                      <div class="text-sm font-semibold text-(--ui-text-highlighted) mb-0.5">{{ sol.label }}</div>
                      <div class="text-xs text-(--ui-text-muted) leading-snug">{{ sol.desc }}</div>
                    </div>
                  </a>
                </div>

                <!-- Footer -->
                <div class="px-4 py-3 border-t border-(--ui-border) bg-(--ui-bg-elevated) flex items-center justify-between">
                  <span class="text-xs text-(--ui-text-dimmed)">Not sure? We'll help you find the right fit.</span>
                  <a href="/contact" class="text-xs text-primary font-semibold hover:underline">Talk to us →</a>
                </div>
              </div>
            </Transition>
          </div>

          <!-- Regular links -->
          <a
            v-for="link in navLinks"
            :key="link.label"
            :href="link.href"
            class="px-3 py-2 rounded-lg text-sm font-medium text-(--ui-text-muted) hover:text-(--ui-text-highlighted) hover:bg-(--ui-bg-elevated) transition-colors"
          >{{ link.label }}</a>

          <!-- vs Smarty — highlighted -->
          <a
            href="/vs-smarty"
            class="px-3 py-2 rounded-lg text-sm font-semibold text-primary hover:bg-primary/8 transition-colors flex items-center gap-1.5"
          >
            <UIcon name="i-lucide-swords" class="w-3.5 h-3.5" />
            vs Smarty
          </a>
        </nav>

        <!-- ── Right actions ──────────────────────────────────────────── -->
        <div class="hidden lg:flex items-center gap-2">
          <!-- USPS badge -->
          <div class="flex items-center gap-1.5 text-xs text-(--ui-text-dimmed) bg-(--ui-bg-elevated) border border-(--ui-border) px-2.5 py-1.5 rounded-full mr-1">
            <UIcon name="i-lucide-award" class="w-3 h-3 text-primary" />
            USPS CASS Certified
          </div>

          <UButton
            size="xs"
            variant="ghost"
            :icon="colorMode === 'dark' ? 'i-lucide-sun' : 'i-lucide-moon'"
            @click="colorMode = colorMode === 'dark' ? 'light' : 'dark'"
          />

          <UButton size="xs" variant="ghost" label="Sign in" />

          <UButton
            size="xs"
            label="Start free"
            trailing-icon="i-lucide-arrow-right"
            class="shadow-sm shadow-primary/20"
          />
        </div>

        <!-- ── Mobile hamburger ───────────────────────────────────────── -->
        <div class="flex lg:hidden items-center gap-2">
          <UButton
            size="xs"
            variant="ghost"
            :icon="colorMode === 'dark' ? 'i-lucide-sun' : 'i-lucide-moon'"
            @click="colorMode = colorMode === 'dark' ? 'light' : 'dark'"
          />
          <button
            class="w-9 h-9 rounded-lg flex items-center justify-center border border-(--ui-border) bg-(--ui-bg-elevated) text-(--ui-text-muted) hover:text-(--ui-text-highlighted) transition-colors"
            @click="mobileOpen = !mobileOpen"
          >
            <UIcon :name="mobileOpen ? 'i-lucide-x' : 'i-lucide-menu'" class="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>

    <!-- ── Mobile menu ─────────────────────────────────────────────────── -->
    <Transition name="mobile-menu">
      <div
        v-if="mobileOpen"
        class="lg:hidden border-t border-(--ui-border) bg-(--ui-bg)/95 backdrop-blur-xl"
      >
        <div class="max-w-7xl mx-auto px-4 py-4 space-y-1">

          <!-- Solutions -->
          <div class="pb-3 mb-3 border-b border-(--ui-border)">
            <p class="text-xs font-bold text-(--ui-text-dimmed) uppercase tracking-widest px-3 mb-2">
              Solutions
            </p>
            <a
              v-for="sol in solutions"
              :key="sol.label"
              :href="sol.href"
              class="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-(--ui-bg-elevated) transition-colors"
              @click="mobileOpen = false"
            >
              <div class="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" :class="sol.color">
                <UIcon :name="sol.icon" class="w-3.5 h-3.5" />
              </div>
              <span class="text-sm font-medium text-(--ui-text)">{{ sol.label }}</span>
            </a>
          </div>

          <!-- Regular links -->
          <a
            v-for="link in navLinks"
            :key="link.label"
            :href="link.href"
            class="flex items-center px-3 py-2.5 rounded-xl text-sm font-medium text-(--ui-text-muted) hover:text-(--ui-text-highlighted) hover:bg-(--ui-bg-elevated) transition-colors"
            @click="mobileOpen = false"
          >{{ link.label }}</a>

          <a
            href="/vs-smarty"
            class="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-primary hover:bg-primary/8 transition-colors"
            @click="mobileOpen = false"
          >
            <UIcon name="i-lucide-swords" class="w-3.5 h-3.5" />
            vs Smarty
          </a>

          <!-- CTA -->
          <div class="pt-3 mt-3 border-t border-(--ui-border) flex flex-col gap-2">
            <UButton block variant="ghost"  label="Sign in"    />
            <UButton block label="Start free — 100 validations" trailing-icon="i-lucide-arrow-right" />
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.98);
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
