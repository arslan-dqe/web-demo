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

const marketplaces = [
  {
    name: 'AWS Marketplace',
    shortName: 'AWS',
    href: 'https://aws.amazon.com/marketplace/pp/prodview-kmbqv66phqbx6?sr=0-1&ref_=beagle&applicationId=AWSMPContessa',
    color: '#FF9900',
    bg: 'bg-[#FF9900]/10',
    border: 'border-[#FF9900]/30',
    hover: 'hover:border-[#FF9900]/60 hover:bg-[#FF9900]/15',
  },
  {
    name: 'Microsoft Azure Marketplace',
    shortName: 'Azure',
    href: '#',
    color: '#0089D6',
    bg: 'bg-[#0089D6]/10',
    border: 'border-[#0089D6]/30',
    hover: 'hover:border-[#0089D6]/60 hover:bg-[#0089D6]/15',
  },
  {
    name: 'Google Cloud Marketplace',
    shortName: 'Google Cloud',
    href: '#',
    color: '#4285F4',
    bg: 'bg-[#4285F4]/10',
    border: 'border-[#4285F4]/30',
    hover: 'hover:border-[#4285F4]/60 hover:bg-[#4285F4]/15',
  },
  {
    name: 'Salesforce AppExchange',
    shortName: 'Salesforce',
    href: '#',
    color: '#00A1E0',
    bg: 'bg-[#00A1E0]/10',
    border: 'border-[#00A1E0]/30',
    hover: 'hover:border-[#00A1E0]/60 hover:bg-[#00A1E0]/15',
  },
  {
    name: 'Snowflake Marketplace',
    shortName: 'Snowflake',
    href: '#',
    color: '#29B5E8',
    bg: 'bg-[#29B5E8]/10',
    border: 'border-[#29B5E8]/30',
    hover: 'hover:border-[#29B5E8]/60 hover:bg-[#29B5E8]/15',
  },
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

    <!-- Marketplace logos -->
    <div
      v-motion
      :initial="{ opacity: 0, y: 10 }"
      :visible="{ opacity: 1, y: 0, transition: { delay: 200, duration: 500 } }"
      class="mt-10 text-center"
    >
      <p class="text-xs text-(--ui-text-dimmed) font-bold uppercase tracking-widest mb-4">
        Available on major cloud marketplaces
      </p>
      <div class="flex flex-wrap items-center justify-center gap-3">
        <a
          v-for="mp in marketplaces"
          :key="mp.name"
          :href="mp.href"
          :aria-label="mp.name"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-200"
          :class="[mp.bg, mp.border, mp.hover]"
          :style="{ color: mp.color }"
        >
          <!-- AWS -->
          <svg v-if="mp.shortName === 'AWS'" class="h-4 w-auto flex-shrink-0" viewBox="0 0 60 36" fill="currentColor" aria-hidden="true">
            <path d="M16.8 13.3c0 .7.1 1.3.2 1.7.2.4.4.9.7 1.4.1.2.2.4.2.5 0 .2-.1.4-.4.6l-1.3.9c-.2.1-.4.2-.5.2-.2 0-.4-.1-.6-.3-.3-.3-.5-.7-.7-1-.2-.4-.4-.8-.7-1.4-1.7 2-3.8 3-6.4 3-1.8 0-3.3-.5-4.3-1.5-1-.9-1.5-2.2-1.5-3.8 0-1.7.6-3 1.8-4 1.2-1 2.8-1.5 4.9-1.5.7 0 1.4.1 2.1.2.8.1 1.5.3 2.3.5V8.3c0-1.5-.3-2.5-.9-3.1-.6-.6-1.7-.9-3.2-.9-.7 0-1.4.1-2.1.3-.7.2-1.4.4-2.1.7-.3.1-.5.2-.7.3-.1 0-.2.1-.3.1-.3 0-.4-.2-.4-.6V3.9c0-.3 0-.5.1-.7.1-.2.3-.3.6-.5C4.9 2.2 5.9 1.8 7 1.6c1.1-.3 2.3-.4 3.6-.4 2.7 0 4.7.6 6 1.8 1.2 1.2 1.9 3 1.9 5.5v7.2l-.7-.4zm-8.9 3.4c.7 0 1.3-.1 2-.4.7-.3 1.3-.8 1.8-1.5.3-.4.5-.9.6-1.4.1-.5.2-1.1.2-1.8v-.9c-.6-.1-1.2-.3-1.8-.3-.7-.1-1.3-.1-1.9-.1-1.3 0-2.3.3-3 .8-.7.5-1 1.3-1 2.3 0 1 .2 1.7.7 2.2.5.7 1.3 1.1 2.4 1.1zm16.2 2.2c-.3 0-.5 0-.7-.1-.2-.1-.4-.3-.5-.7L19 4.6c-.1-.4-.2-.7-.2-.9 0-.4.2-.6.6-.6h2.4c.3 0 .6 0 .7.1.2.1.3.3.4.7l3.6 14.1 3.3-14.1c.1-.4.2-.6.4-.7.2-.1.5-.1.8-.1h1.9c.3 0 .6 0 .8.1.2.1.3.3.4.7l3.3 14.3L40.2 4c.1-.4.3-.6.4-.7.2-.1.4-.1.7-.1h2.3c.4 0 .6.2.6.6 0 .1 0 .3-.1.5l-4.5 14.3c-.1.4-.3.6-.5.7-.2.1-.5.1-.7.1H36c-.3 0-.6 0-.8-.1-.2-.1-.3-.3-.4-.7l-3.2-13.4-3.2 13.4c-.1.4-.3.6-.4.7-.2.1-.5.1-.8.1h-2.1zm24 .5c-1.5 0-3-.3-4.3-.9-1.3-.6-2.3-1.5-3-2.6-.7-1.1-1-2.5-1-4.1 0-1.5.3-2.8 1-3.9.7-1.1 1.7-2 2.9-2.6 1.3-.6 2.7-.9 4.3-.9 1.5 0 2.9.3 4.1.9 1.2.6 2.1 1.4 2.8 2.5.7 1.1 1 2.3 1 3.8v.9c0 .3-.2.5-.6.5H47.4v.3c.1 1.2.5 2.1 1.2 2.7.7.7 1.7 1 3 1 .6 0 1.2-.1 1.8-.2.6-.2 1.1-.4 1.6-.7.3-.2.5-.3.6-.3.2-.1.3-.1.4-.1.3 0 .4.2.4.5v1.7c0 .3 0 .5-.1.6-.1.2-.3.3-.6.5-.7.4-1.4.7-2.2.9-.8.3-1.8.4-2.7.4zm.3-13.7c-1.1 0-2 .3-2.7.9-.7.6-1.1 1.5-1.3 2.6h7.6v-.2c0-1-.3-1.8-1-2.5-.6-.5-1.5-.8-2.6-.8z"/>
          </svg>
          <!-- Snowflake -->
          <svg v-else-if="mp.shortName === 'Snowflake'" class="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M22 12.5h-2.9l1.6-1.6-.7-.7-2.3 2.3H13v-.8l4.1-2.4-.5-.9-3.6 2.1V7.3l2.3-2.3-.7-.7-1.6 1.6V2h-1v3.9L10.4 4.3l-.7.7 2.3 2.3v3.2l-.8-.5-3.6-2.1-.5.9L11.2 11h-.8L8.1 8.7l-.7.7 1.6 1.6H2v1h6.9l-1.6 1.6.7.7 2.3-2.3H11v.8l-4.1 2.4.5.9 3.6-2.1v3.2l-2.3 2.3.7.7 1.6-1.6V22h1v-3.9l1.6 1.6.7-.7-2.3-2.3v-3.2l3.6 2.1.5-.9L12.8 13h.8l2.3 2.3.7-.7-1.6-1.6H22v-1z"/>
          </svg>
          <!-- Google Cloud -->
          <svg v-else-if="mp.shortName === 'Google Cloud'" class="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 6.5A5.5 5.5 0 0 1 17.5 12h2A7.5 7.5 0 0 0 12 4.5v2zm-5.5 5.5a5.5 5.5 0 0 1 5.5-5.5v-2A7.5 7.5 0 0 0 4.5 12h2zM12 17.5A5.5 5.5 0 0 1 6.5 12h-2A7.5 7.5 0 0 0 12 19.5v-2zm5.5-5.5a5.5 5.5 0 0 1-5.5 5.5v2a7.5 7.5 0 0 0 7.5-7.5h-2z" fill="#4285F4"/>
            <path d="M12 9.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z" fill="#34A853"/>
          </svg>
          <!-- Azure -->
          <svg v-else-if="mp.shortName === 'Azure'" class="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M13.05 4.24L6.56 18.05 2 18.06l4.84-8.23 6.21-5.59zM13.89 5.4l3.97 11.16 3.47.01-7.44-11.17zm-3.01 8.31L8.5 18.06h8.5l-6.12-4.35z"/>
          </svg>
          <!-- Salesforce -->
          <svg v-else-if="mp.shortName === 'Salesforce'" class="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M10.02 6.75a3.54 3.54 0 0 1 2.6-1.13 3.6 3.6 0 0 1 3.23 2.01 4.43 4.43 0 0 1 1.7-.34 4.47 4.47 0 0 1 4.47 4.47 4.47 4.47 0 0 1-4.47 4.47H6.52a3.52 3.52 0 0 1-3.52-3.52 3.52 3.52 0 0 1 3-3.49 2.96 2.96 0 0 1-.08-.69 2.97 2.97 0 0 1 2.97-2.97c.56 0 1.08.16 1.53.43l-.4.76z"/>
          </svg>
          {{ mp.shortName }}
          <UIcon name="i-lucide-external-link" class="w-3 h-3 opacity-60" />
        </a>
      </div>
    </div>

    <!-- Trust strip -->
    <div
      v-motion
      :initial="{ opacity: 0 }"
      :visible="{ opacity: 1, transition: { delay: 300, duration: 500 } }"
      class="flex items-center justify-center gap-8 mt-8 flex-wrap"
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
