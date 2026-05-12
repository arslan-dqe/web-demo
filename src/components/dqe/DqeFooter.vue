<script setup lang="ts">
const columns = [
  {
    heading: 'Product',
    links: [
      { label: 'Address Validation', href: '/product/address' },
      { label: 'Email Validation',   href: '/product/email'   },
      { label: 'Phone Validation',   href: '/product/phone'   },
      { label: 'Deduplication',      href: '/product/unify'   },
      { label: 'API Reference',      href: '/developers'      },
      { label: 'Changelog',          href: '/changelog'       },
    ],
  },
  {
    heading: 'Solutions',
    links: [
      { label: 'Retail & E-commerce', href: '/solutions/retail'       },
      { label: 'Logistics',           href: '/solutions/logistics'    },
      { label: 'Hospitality',         href: '/solutions/hospitality'  },
      { label: 'Developers',          href: '/developers'             },
      { label: 'vs Smarty',           href: '/vs-smarty', highlight: true },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About',   href: '/about'   },
      { label: 'Blog',    href: '/blog'    },
      { label: 'FAQ',     href: '/faq'     },
      { label: 'Careers', href: '/careers' },
      { label: 'Press',   href: '/press'   },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/legal/privacy' },
      { label: 'Terms of Use',   href: '/legal/terms'   },
      { label: 'Security',       href: '/security'},
      { label: 'DPA',            href: '/dpa'     },
      { label: 'Cookie Policy',  href: '/cookies' },
    ],
  },
]

const certBadges = [
  { icon: 'i-lucide-award',        label: 'USPS CASS Certified', color: 'text-blue-500  bg-blue-500/10  border-blue-500/20'  },
  { icon: 'i-lucide-shield-check', label: 'SOC 2 Type II',       color: 'text-success   bg-success/10   border-success/20'   },
  { icon: 'i-lucide-lock',         label: 'GDPR Compliant',      color: 'text-teal-500  bg-teal-500/10  border-teal-500/20'  },
  { icon: 'i-lucide-scale',        label: 'TCPA Ready',          color: 'text-violet-500 bg-violet-500/10 border-violet-500/20' },
  { icon: 'i-lucide-activity',     label: '99.99% Uptime',       color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' },
]

const socials = [
  { icon: 'i-lucide-twitter',  href: '#', label: 'Twitter'  },
  { icon: 'i-lucide-linkedin', href: '#', label: 'LinkedIn' },
  { icon: 'i-lucide-github',   href: '#', label: 'GitHub'   },
  { icon: 'i-lucide-youtube',  href: '#', label: 'YouTube'  },
]
</script>

<template>
  <footer class="border-t border-(--ui-border) bg-(--ui-bg-muted) px-6 pt-16 pb-8">
    <div class="max-w-6xl mx-auto">
      <!-- ── Top section ───────────────────────────────────────────────── -->
      <div class="grid grid-cols-2 md:grid-cols-6 gap-10 mb-12">
        <!-- Brand (2 cols) -->
        <div class="col-span-2">
          <!-- Logo -->
          <div class="flex items-center gap-2.5 mb-4">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center shadow-md shadow-blue-500/20">
              <UIcon
                name="i-lucide-shield-check"
                class="w-4 h-4 text-white"
              />
            </div>
            <div class="leading-none">
              <div class="font-extrabold text-(--ui-text-highlighted) tracking-tight">
                DQE
              </div>
              <div class="text-[10px] text-(--ui-text-dimmed) uppercase tracking-wider font-medium">
                Validate
              </div>
            </div>
          </div>

          <p class="text-sm text-(--ui-text-muted) leading-relaxed max-w-xs mb-5">
            All-in-one Address, Email & Phone validation for US businesses.
            Self-serve. No SFTP. No sales cycle.
          </p>

          <!-- Socials -->
          <div class="flex items-center gap-1.5 mb-6">
            <a
              v-for="s in socials"
              :key="s.label"
              :href="s.href"
              :aria-label="s.label"
              class="w-8 h-8 rounded-lg flex items-center justify-center border border-(--ui-border) text-(--ui-text-muted) hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all"
            >
              <UIcon
                :name="s.icon"
                class="w-3.5 h-3.5"
              />
            </a>
          </div>

          <!-- Newsletter -->
          <div>
            <p class="text-xs font-semibold text-(--ui-text-highlighted) mb-2">
              Get data quality tips
            </p>
            <div class="flex gap-2">
              <UInput
                placeholder="your@email.com"
                size="xs"
                class="flex-1"
              />
              <UButton
                size="xs"
                label="Subscribe"
              />
            </div>
          </div>
        </div>

        <!-- Link columns (4 cols) -->
        <div
          v-for="col in columns"
          :key="col.heading"
          class="col-span-1"
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
                class="text-sm transition-colors flex items-center gap-1.5"
                :class="(link as any).highlight
                  ? 'text-primary font-semibold hover:underline'
                  : 'text-(--ui-text-muted) hover:text-(--ui-text-highlighted)'"
              >
                <UIcon
                  v-if="(link as any).highlight"
                  name="i-lucide-swords"
                  class="w-3 h-3"
                />
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- ── Certification badges ──────────────────────────────────────── -->
      <div class="flex flex-wrap gap-2 mb-8">
        <div
          v-for="cert in certBadges"
          :key="cert.label"
          class="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border"
          :class="cert.color"
        >
          <UIcon
            :name="cert.icon"
            class="w-3.5 h-3.5"
          />
          {{ cert.label }}
        </div>
      </div>

      <USeparator class="mb-6" />

      <!-- ── Bottom bar ────────────────────────────────────────────────── -->
      <div class="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-(--ui-text-dimmed)">
        <div class="flex flex-wrap items-center gap-4">
          <span>© {{ new Date().getFullYear() }} DQE USA. All rights reserved.</span>
          <span class="hidden md:block">·</span>
          <span>Powered by USPS CASS via Melissa OEM partnership</span>
        </div>

        <div class="flex items-center gap-5">
          <span class="flex items-center gap-1.5">
            <UIcon
              name="i-lucide-server"
              class="w-3.5 h-3.5 text-primary"
            />
            US data residency
          </span>
          <span class="flex items-center gap-1.5">
            <UIcon
              name="i-lucide-shield-check"
              class="w-3.5 h-3.5 text-success"
            />
            SOC 2 Certified
          </span>
          <span class="flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            All systems operational
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>
