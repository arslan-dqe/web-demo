<script setup lang="ts">
interface FooterLink {
  label: string
  href: string
}

interface FooterColumn {
  heading: string
  links: FooterLink[]
}

interface SocialLink {
  icon: string
  href: string
  label: string
}

interface BadgeItem {
  icon: string
  label: string
  color: string
}

withDefaults(defineProps<{
  brandName?:  string
  brandDesc?:  string
  brandIcon?:  string
  copyright?:  string
  columns?:    FooterColumn[]
  socials?:    SocialLink[]
  badges?:     BadgeItem[]
  statusText?: string
}>(), {
  brandName: 'Deduply',
  brandIcon: 'i-lucide-git-merge',
  brandDesc: 'AI-powered deduplication for modern revenue teams. Clean CRM data, zero headaches.',
  copyright: 'Deduply Inc. All rights reserved.',
  statusText: 'All systems operational',
  socials: () => [
    { icon: 'i-lucide-twitter',  href: '#', label: 'Twitter'  },
    { icon: 'i-lucide-linkedin', href: '#', label: 'LinkedIn' },
    { icon: 'i-lucide-github',   href: '#', label: 'GitHub'   },
  ],
  columns: () => [
    {
      heading: 'Product',
      links: [
        { label: 'Features',     href: '#' },
        { label: 'Integrations', href: '#' },
        { label: 'Changelog',    href: '#' },
        { label: 'Roadmap',      href: '#' },
      ],
    },
    {
      heading: 'Company',
      links: [
        { label: 'About',   href: '#' },
        { label: 'Blog',    href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Press',   href: '#' },
      ],
    },
    {
      heading: 'Legal',
      links: [
        { label: 'Privacy',  href: '#' },
        { label: 'Terms',    href: '#' },
        { label: 'Security', href: '#' },
        { label: 'DPA',      href: '#' },
      ],
    },
  ],
  badges: () => [
    { icon: 'i-lucide-shield-check', label: 'SOC 2 Certified', color: 'text-success' },
    { icon: 'i-lucide-lock',         label: 'GDPR Ready',      color: 'text-primary' },
  ],
})
</script>

<template>
  <footer class="border-t border-(--ui-border) bg-(--ui-bg-muted) px-6 py-12">
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
        <!-- Brand -->
        <div class="col-span-2">
          <slot name="brand">
            <div class="flex items-center gap-2 mb-3">
              <div class="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <UIcon
                  :name="brandIcon"
                  class="w-4 h-4 text-white"
                />
              </div>
              <span class="font-bold text-(--ui-text-highlighted)">{{ brandName }}</span>
            </div>
            <p class="text-sm text-(--ui-text-muted) leading-relaxed max-w-xs mb-4">
              {{ brandDesc }}
            </p>
            <div class="flex items-center gap-2">
              <UButton
                v-for="social in socials"
                :key="social.label"
                size="xs"
                variant="ghost"
                :icon="social.icon"
                :to="social.href"
                :aria-label="social.label"
              />
            </div>
          </slot>
        </div>

        <!-- Link columns -->
        <div
          v-for="col in columns"
          :key="col.heading"
        >
          <div class="text-xs font-bold text-(--ui-text-highlighted) uppercase tracking-widest mb-4">
            {{ col.heading }}
          </div>
          <ul class="space-y-2.5">
            <li
              v-for="link in col.links"
              :key="link.label"
            >
              <a
                :href="link.href"
                class="text-sm text-(--ui-text-muted) hover:text-(--ui-text-highlighted) transition-colors"
              >{{ link.label }}</a>
            </li>
          </ul>
        </div>
      </div>

      <USeparator class="mb-6" />

      <!-- Bottom bar -->
      <div class="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-(--ui-text-dimmed)">
        <slot name="copyright">
          <span>© {{ new Date().getFullYear() }} {{ copyright }}</span>
        </slot>

        <slot name="badges">
          <div class="flex items-center gap-4">
            <span
              v-for="badge in badges"
              :key="badge.label"
              class="flex items-center gap-1.5"
            >
              <UIcon
                :name="badge.icon"
                class="w-3.5 h-3.5"
                :class="badge.color"
              />
              {{ badge.label }}
            </span>
            <span class="flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              {{ statusText }}
            </span>
          </div>
        </slot>
      </div>
    </div>
  </footer>
</template>
