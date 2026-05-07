<script setup lang="ts">
interface PricingPlan {
  name: string
  price: string
  period: string
  desc: string
  features: string[]
  cta: string
  popular: boolean
  isEnterprise?: boolean
}

withDefaults(defineProps<{
  badge?:    string
  headline?: string
  subline?:  string
  plans?:    PricingPlan[]
  faqText?:  string
  faqLink?:  string
  faqHref?:  string
}>(), {
  badge:    'Pricing',
  headline: 'Pay for clean data.\nNot for bloated software.',
  subline:  'All plans include a 14-day free trial. No credit card required.',
  faqText:  'Questions about limits or volume discounts?',
  faqLink:  'Talk to us →',
  faqHref:  '#',
  plans: () => [
    {
      name: 'Starter', price: '$149', period: '/mo', popular: false,
      desc: 'Perfect for small sales teams cleaning up their CRM for the first time.',
      features: ['Up to 25,000 records', '1 CRM integration', 'AI deduplication', 'Merge history (30 days)', 'Email support'],
      cta: 'Start free trial',
    },
    {
      name: 'Growth', price: '$399', period: '/mo', popular: true,
      desc: 'For RevOps teams who need automation and deeper integrations.',
      features: ['Up to 250,000 records', '3 CRM integrations', 'Real-time duplicate prevention', 'Custom matching rules', 'Full audit trail', 'Slack alerts', 'Priority support'],
      cta: 'Start free trial',
    },
    {
      name: 'Enterprise', price: 'Custom', period: '', popular: false, isEnterprise: true,
      desc: 'Dedicated infrastructure, SSO, and SLAs for large organizations.',
      features: ['Unlimited records', 'Unlimited integrations', 'Custom AI model fine-tuning', 'SOC 2 Type II', 'Dedicated CSM', 'SLA guarantee', 'On-premise option'],
      cta: 'Talk to sales',
    },
  ],
})

const emit = defineEmits<{
  cta: [plan: string]
}>()
</script>

<template>
  <section id="pricing" class="py-24 px-4">
    <div class="max-w-6xl mx-auto">

      <!-- Header -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="text-center mb-16"
      >
        <slot name="header">
          <UBadge color="success" variant="soft" :label="badge" size="md" class="mb-4" />
          <h2 class="text-4xl md:text-5xl font-extrabold text-(--ui-text-highlighted) mb-4 whitespace-pre-line">
            {{ headline }}
          </h2>
          <p class="text-(--ui-text-muted) text-lg max-w-lg mx-auto">{{ subline }}</p>
        </slot>
      </div>

      <!-- Plans -->
      <div class="grid md:grid-cols-3 gap-6 items-start">
        <div
          v-for="(plan, i) in plans"
          :key="plan.name"
          v-motion
          :initial="{ opacity: 0, y: 40, scale: 0.97 }"
          :visible="{ opacity: 1, y: 0, scale: 1, transition: { delay: i * 100, duration: 600 } }"
          class="relative flex flex-col p-7 rounded-2xl border transition-all duration-300"
          :class="plan.popular
            ? 'border-primary/50 bg-gradient-to-b from-primary/5 to-secondary/5 shadow-2xl shadow-primary/15 scale-[1.02]'
            : 'border-(--ui-border) bg-(--ui-bg) hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5'"
        >
          <!-- Popular badge -->
          <div v-if="plan.popular" class="absolute -top-3.5 left-1/2 -translate-x-1/2">
            <UBadge color="primary" label="Most popular" size="sm" class="shadow-lg shadow-primary/30 px-4" />
          </div>

          <!-- Plan header -->
          <div class="mb-6">
            <h3 class="text-lg font-bold text-(--ui-text-highlighted) mb-2">{{ plan.name }}</h3>
            <p class="text-sm text-(--ui-text-muted) mb-4 leading-relaxed">{{ plan.desc }}</p>
            <div class="flex items-end gap-1">
              <span class="text-4xl font-extrabold text-(--ui-text-highlighted)">{{ plan.price }}</span>
              <span class="text-sm text-(--ui-text-muted) mb-1.5">{{ plan.period }}</span>
            </div>
          </div>

          <USeparator class="mb-6" />

          <!-- Features list -->
          <ul class="space-y-3 flex-1 mb-8">
            <li
              v-for="feat in plan.features"
              :key="feat"
              class="flex items-start gap-2.5 text-sm text-(--ui-text)"
            >
              <UIcon
                name="i-lucide-check"
                class="w-4 h-4 mt-0.5 flex-shrink-0"
                :class="plan.popular ? 'text-primary' : 'text-success'"
              />
              {{ feat }}
            </li>
          </ul>

          <!-- CTA -->
          <slot :name="`cta-${plan.name.toLowerCase()}`">
            <UButton
              block
              :variant="plan.popular ? 'solid' : 'outline'"
              :label="plan.cta"
              :trailing-icon="plan.isEnterprise ? 'i-lucide-calendar' : 'i-lucide-arrow-right'"
              :class="plan.popular ? 'shadow-lg shadow-primary/30' : ''"
              @click="emit('cta', plan.name)"
            />
          </slot>
        </div>
      </div>

      <!-- FAQ teaser -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible="{ opacity: 1, y: 0, transition: { delay: 200, duration: 600 } }"
        class="mt-10 text-center text-sm text-(--ui-text-muted)"
      >
        <slot name="faq">
          {{ faqText }}
          <a :href="faqHref" class="text-primary font-semibold hover:underline ml-1">{{ faqLink }}</a>
        </slot>
      </div>

    </div>
  </section>
</template>
