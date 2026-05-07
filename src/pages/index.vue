<script setup lang="ts">
const meta: Record<string, { label: string; desc: string; icon: string; badge: string }> = {
  '1': { label: 'Landing page 1',          desc: 'AI-powered CRM deduplication landing page',            icon: 'i-lucide-git-merge',      badge: 'Landing'     },
  '2': { label: 'Landing page 2',   desc: 'Component-based landing page using shared layout',     icon: 'i-lucide-layout',         badge: 'Landing'   },
  '3': { label: 'Landing page 3',       desc: 'AI-Powered CRM Deduplication — alternate design',      icon: 'i-lucide-brain-circuit',  badge: 'Landing'     },
  '4': { label: 'Landing page 4',   desc: 'Address, Email & Phone validation — full self-serve',  icon: 'i-lucide-shield-check',   badge: 'Landing'       },
  '5': { label: 'Landing page 5',  desc: 'Validate every address, email & phone — One API',      icon: 'i-lucide-zap',            badge: 'Landing'       },
  '6': { label: 'Landing page 6',  desc: 'Address, Email & Phone in one API call — alt layout',  icon: 'i-lucide-cpu',            badge: 'Landing'       },
  '7': { label: 'Landing page 7',    desc: 'US market page — Smarty alternative with theme panel', icon: 'i-lucide-map-pin',        badge: 'Landing'        },
}

const modules = import.meta.glob('./web/*.vue')

const pages = Object.keys(modules).map((path) => {
  const name = path.replace('./web/', '').replace('.vue', '')
  const info = meta[name] ?? { label: `Page ${name}`, desc: '', icon: 'i-lucide-file', badge: 'Page' }
  return { name, route: `/web/${name}`, ...info }
}).sort((a, b) => Number(a.name) - Number(b.name))
</script>

<template>
  <div class="p-8 max-w-5xl mx-auto">

    <div class="mb-10">
      <h1 class="text-3xl font-black text-(--ui-text-highlighted) mb-2">Web Pages</h1>
      <p class="text-sm text-(--ui-text-muted)">
        {{ pages.length }} pages · click any card to open in a new tab
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <a
        v-for="page in pages"
        :key="page.route"
        :href="page.route"
        target="_blank"
        rel="noopener"
        class="group flex flex-col gap-4 p-5 bg-(--ui-bg-elevated) border border-(--ui-border) rounded-2xl hover:border-primary-500/40 hover:shadow-lg hover:shadow-primary-500/8 transition-all duration-200"
      >
        <div class="flex items-start justify-between gap-3">
          <div class="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-500/20 transition-colors">
            <UIcon :name="page.icon" class="w-5 h-5 text-primary-400" />
          </div>
          <UBadge color="neutral" variant="soft" size="xs" class="font-semibold flex-shrink-0 mt-1">
            {{ page.badge }}
          </UBadge>
        </div>

        <div class="flex-1">
          <div class="flex items-center gap-2 mb-1">
            <span class="text-xs font-mono text-(--ui-text-dimmed)">#{{ page.name }}</span>
            <span class="font-bold text-(--ui-text-highlighted) text-sm">{{ page.label }}</span>
          </div>
          <p class="text-xs text-(--ui-text-muted) leading-relaxed">{{ page.desc }}</p>
        </div>

        <div class="flex items-center justify-between">
          <span class="text-xs font-mono text-(--ui-text-dimmed)">{{ page.route }}</span>
          <span class="flex items-center gap-1 text-xs text-primary-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
            <UIcon name="i-lucide-external-link" class="w-3.5 h-3.5" />Open
          </span>
        </div>
      </a>
    </div>

  </div>
</template>
