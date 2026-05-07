<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue'
import { useHead, useSeoMeta } from '@unhead/vue'

definePage({ meta: { layout: 'landing' } })

useSeoMeta({
  title:           'DQE — All-in-One Address, Email & Phone Validation',
  description:     'Validate US addresses, emails, and phones in one self-serve platform. USPS CASS certified. Set up in 5 minutes. Replace 3 vendors with 1 API.',
  ogTitle:         'DQE — All-in-One Validation Platform',
  ogDescription:   'Address + Email + Phone validation in one API call. No SFTP. No sales cycle. 100 free validations.',
  ogImage:         'https://dqe.io/og-image.png',
  ogType:          'website',
  ogUrl:           'https://dqe.io',
  twitterCard:     'summary_large_image',
  twitterTitle:    'DQE — All-in-One Validation',
  twitterDescription: 'Replace Smarty + 2 other tools with one self-serve API.',
  robots:          'index, follow',
})

useHead({
  htmlAttrs: { lang: 'en' },
  link: [{ rel: 'canonical', href: 'https://dqe.io' }],
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context':          'https://schema.org',
      '@type':             'SoftwareApplication',
      name:                'DQE Validate',
      url:                 'https://dqe.io',
      description:         'All-in-one US address, email, and phone validation platform.',
      applicationCategory: 'BusinessApplication',
      operatingSystem:     'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '340' },
    }),
  }],
})

import DqeNavbar from '@/components/dqe/DqeNavbar.vue'
import DqeHero   from '@/components/dqe/DqeHero.vue'

const DqeMarquee      = defineAsyncComponent(() => import('@/components/dqe/DqeMarquee.vue'))
const DqeProblem      = defineAsyncComponent(() => import('@/components/dqe/DqeProblem.vue'))
const DqeProduct      = defineAsyncComponent(() => import('@/components/dqe/DqeProduct.vue'))
const DqeHowItWorks   = defineAsyncComponent(() => import('@/components/dqe/DqeHowItWorks.vue'))
const DqeVsSmarty     = defineAsyncComponent(() => import('@/components/dqe/DqeVsSmarty.vue'))
const DqeUseCases     = defineAsyncComponent(() => import('@/components/dqe/DqeUseCases.vue'))
const DqeTestimonials = defineAsyncComponent(() => import('@/components/dqe/DqeTestimonials.vue'))
const DqePricing      = defineAsyncComponent(() => import('@/components/dqe/DqePricing.vue'))
const DqeCTA          = defineAsyncComponent(() => import('@/components/dqe/DqeCTA.vue'))
const DqeFooter       = defineAsyncComponent(() => import('@/components/dqe/DqeFooter.vue'))

const signupOpen = ref(false)
const demoOpen   = ref(false)
</script>

<template>
  <div class="min-h-screen bg-(--ui-bg) text-(--ui-text) font-sans overflow-x-hidden">

    <DqeNavbar />
    <DqeHero />

    <Suspense>
      <DqeMarquee />
      <template #fallback><div class="py-16 bg-(--ui-bg-muted)" /></template>
    </Suspense>

    <Suspense>
      <DqeProblem />
      <template #fallback><div class="py-28 bg-slate-950" /></template>
    </Suspense>

    <Suspense>
      <DqeProduct />
      <template #fallback><div class="py-28" /></template>
    </Suspense>

    <Suspense>
      <DqeHowItWorks />
      <template #fallback><div class="py-28 bg-(--ui-bg-muted)" /></template>
    </Suspense>

    <Suspense>
      <DqeVsSmarty />
      <template #fallback><div class="py-28 bg-(--ui-bg-muted)" /></template>
    </Suspense>

    <Suspense>
      <DqeUseCases />
      <template #fallback><div class="py-28" /></template>
    </Suspense>

    <Suspense>
      <DqeTestimonials />
      <template #fallback><div class="py-28 bg-(--ui-bg-muted)" /></template>
    </Suspense>

    <Suspense>
      <DqePricing @cta="signupOpen = true" />
      <template #fallback><div class="py-28" /></template>
    </Suspense>

    <Suspense>
      <DqeCTA
        @primary="signupOpen = true"
        @secondary="demoOpen = true"
      />
      <template #fallback><div class="py-24" /></template>
    </Suspense>

    <Suspense>
      <DqeFooter />
      <template #fallback><div class="py-16 bg-(--ui-bg-muted)" /></template>
    </Suspense>

    <ScrollToTop />

    <StartFreeModal v-model:open="signupOpen" />
    <BookDemoModal  v-model:open="demoOpen"   />

  </div>
</template>
