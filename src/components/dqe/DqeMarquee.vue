<script setup lang="ts">
const row1 = [
  { name: 'USPS',        icon: 'i-lucide-mail-open',      iconBg: 'bg-blue-500/10',    iconColor: 'text-blue-500'    },
  { name: 'Salesforce',  icon: 'i-lucide-cloud',           iconBg: 'bg-sky-500/10',     iconColor: 'text-sky-500'     },
  { name: 'Shopify',     icon: 'i-lucide-shopping-bag',    iconBg: 'bg-emerald-500/10', iconColor: 'text-emerald-500' },
  { name: 'FedEx',       icon: 'i-lucide-truck',           iconBg: 'bg-violet-500/10',  iconColor: 'text-violet-500'  },
  { name: 'HubSpot',     icon: 'i-lucide-magnet',          iconBg: 'bg-orange-500/10',  iconColor: 'text-orange-500'  },
  { name: 'Melissa',     icon: 'i-lucide-database',        iconBg: 'bg-blue-500/10',    iconColor: 'text-blue-500'    },
  { name: 'UPS',         icon: 'i-lucide-package',         iconBg: 'bg-amber-500/10',   iconColor: 'text-amber-500'   },
  { name: 'BigCommerce', icon: 'i-lucide-store',           iconBg: 'bg-teal-500/10',    iconColor: 'text-teal-500'    },
]

const row2 = [
  { name: 'Dynamics 365',icon: 'i-lucide-layout-grid',     iconBg: 'bg-blue-500/10',    iconColor: 'text-blue-500'    },
  { name: 'Pipedrive',   icon: 'i-lucide-git-branch',      iconBg: 'bg-emerald-500/10', iconColor: 'text-emerald-500' },
  { name: 'Klaviyo',     icon: 'i-lucide-mail',            iconBg: 'bg-yellow-500/10',  iconColor: 'text-yellow-500'  },
  { name: 'ShipBob',     icon: 'i-lucide-box',             iconBg: 'bg-cyan-500/10',    iconColor: 'text-cyan-500'    },
  { name: 'Marketo',     icon: 'i-lucide-bar-chart-2',     iconBg: 'bg-purple-500/10',  iconColor: 'text-purple-500'  },
  { name: 'WooCommerce', icon: 'i-lucide-shopping-cart',   iconBg: 'bg-violet-500/10',  iconColor: 'text-violet-500'  },
  { name: 'Stripe',      icon: 'i-lucide-credit-card',     iconBg: 'bg-indigo-500/10',  iconColor: 'text-indigo-500'  },
  { name: 'Mailchimp',   icon: 'i-lucide-send',            iconBg: 'bg-yellow-500/10',  iconColor: 'text-yellow-500'  },
]

const trustItems = [
  { icon: 'i-lucide-award',        label: 'USPS CASS Certified'   },
  { icon: 'i-lucide-zap',          label: 'Sub-100ms API'         },
  { icon: 'i-lucide-plug',         label: '20+ native integrations'},
]
</script>

<template>
  <section class="py-16 border-y border-(--ui-border) bg-(--ui-bg-muted) overflow-hidden">
    <!-- Header -->
    <div
      v-motion
      :initial="{ opacity: 0, y: 10 }"
      :visible="{ opacity: 1, y: 0, transition: { duration: 500 } }"
      class="text-center mb-10"
    >
      <p class="text-xs text-(--ui-text-dimmed) font-bold uppercase tracking-widest mb-2">
        Works with your entire stack
      </p>
      <p class="text-sm text-(--ui-text-muted)">
        One API. Every CRM, e-commerce platform, and shipping carrier you already use.
      </p>
    </div>

    <!-- Marquee rows -->
    <div class="relative">
      <!-- Edge fades -->
      <div class="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none bg-gradient-to-r from-(--ui-bg-muted) to-transparent" />
      <div class="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none bg-gradient-to-l from-(--ui-bg-muted) to-transparent" />

      <!-- Row 1 → left to right -->
      <div class="flex gap-3 mb-3 animate-marquee-ltr whitespace-nowrap">
        <div
          v-for="(logo, i) in [...row1, ...row1]"
          :key="`r1-${i}`"
          class="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-(--ui-border) bg-(--ui-bg) text-sm font-semibold text-(--ui-text-muted) hover:text-(--ui-text-highlighted) hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all duration-300 cursor-default flex-shrink-0 group"
        >
          <div
            class="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
            :class="logo.iconBg"
          >
            <UIcon
              :name="logo.icon"
              class="w-3.5 h-3.5"
              :class="logo.iconColor"
            />
          </div>
          {{ logo.name }}
        </div>
      </div>

      <!-- Row 2 ← right to left -->
      <div class="flex gap-3 animate-marquee-rtl whitespace-nowrap">
        <div
          v-for="(logo, i) in [...row2, ...row2]"
          :key="`r2-${i}`"
          class="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-(--ui-border) bg-(--ui-bg) text-sm font-semibold text-(--ui-text-muted) hover:text-(--ui-text-highlighted) hover:border-secondary/30 hover:shadow-md hover:shadow-secondary/5 transition-all duration-300 cursor-default flex-shrink-0 group"
        >
          <div
            class="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
            :class="logo.iconBg"
          >
            <UIcon
              :name="logo.icon"
              class="w-3.5 h-3.5"
              :class="logo.iconColor"
            />
          </div>
          {{ logo.name }}
        </div>
      </div>
    </div>

    <!-- Trust strip -->
    <div
      v-motion
      :initial="{ opacity: 0 }"
      :visible="{ opacity: 1, transition: { delay: 300, duration: 500 } }"
      class="flex items-center justify-center gap-8 mt-10 flex-wrap"
    >
      <div
        v-for="item in trustItems"
        :key="item.label"
        class="flex items-center gap-1.5 text-xs text-(--ui-text-dimmed)"
      >
        <UIcon
          :name="item.icon"
          class="w-3.5 h-3.5 text-primary"
        />
        <span class="font-medium">{{ item.label }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes marquee-ltr {
  from { transform: translateX(0) }
  to   { transform: translateX(-50%) }
}
@keyframes marquee-rtl {
  from { transform: translateX(-50%) }
  to   { transform: translateX(0) }
}
.animate-marquee-ltr {
  animation: marquee-ltr 30s linear infinite;
}
.animate-marquee-rtl {
  animation: marquee-rtl 25s linear infinite;
}
.animate-marquee-ltr:hover,
.animate-marquee-rtl:hover {
  animation-play-state: paused;
}
</style>
