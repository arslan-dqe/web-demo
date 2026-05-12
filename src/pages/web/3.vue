<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { useHead, useSeoMeta } from '@unhead/vue'

definePage({
  meta: { layout: 'landing' }
})

useSeoMeta({
  title: 'Deduply — AI-Powered CRM Deduplication',
  description: 'Deduply finds and merges duplicate contacts, leads & accounts in your CRM using AI. Catches fuzzy matches that rules-based tools miss. Trusted by 2,400+ RevOps teams.',
  ogTitle: 'Deduply — AI-Powered CRM Deduplication',
  ogDescription: 'Stop losing revenue to bad data. Deduply cleans your CRM in minutes using AI matching. Works with Salesforce, HubSpot, Pipedrive & more.',
  ogImage: 'https://deduply.io/og-image.png',
  ogImageWidth: '1200',
  ogImageHeight: '630',
  ogImageAlt: 'Deduply — AI CRM Deduplication',
  ogType: 'website',
  ogUrl: 'https://deduply.io',
  ogSiteName: 'Deduply',
  twitterCard: 'summary_large_image',
  twitterSite: '@deduply',
  twitterCreator: '@deduply',
  twitterTitle: 'Deduply — AI-Powered CRM Deduplication',
  twitterDescription: 'Clean your CRM duplicates in minutes with AI. Trusted by 2,400+ RevOps teams.',
  twitterImage: 'https://deduply.io/og-image.png',
  robots: 'index, follow',
})

useHead({
  htmlAttrs: { lang: 'en' },
  link: [
    { rel: 'canonical', href: 'https://deduply.io' },
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Deduply',
        url: 'https://deduply.io',
        description: 'AI-powered CRM deduplication for modern revenue teams.',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        offers: {
          '@type': 'Offer',
          price: '149',
          priceCurrency: 'USD',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '2400',
        },
      }),
    },
  ],
})

import LandingNavbar from '@/components/landing/LandingNavbar.vue'
import LandingHero   from '@/components/landing/LandingHero.vue'

const LandingMarquee      = defineAsyncComponent(() => import('@/components/landing/LandingMarquee.vue'))
const LandingStats        = defineAsyncComponent(() => import('@/components/landing/LandingStats.vue'))
const LandingHowItWorks   = defineAsyncComponent(() => import('@/components/landing/LandingHowItWorks.vue'))
const LandingFeatures     = defineAsyncComponent(() => import('@/components/landing/LandingFeatures.vue'))
const LandingTestimonials = defineAsyncComponent(() => import('@/components/landing/LandingTestimonials.vue'))
const LandingPricing      = defineAsyncComponent(() => import('@/components/landing/LandingPricing.vue'))
const LandingCTA          = defineAsyncComponent(() => import('@/components/landing/LandingCTA.vue'))
const LandingFooter       = defineAsyncComponent(() => import('@/components/landing/LandingFooter.vue'))
</script>

<template>
  <div class="min-h-screen bg-(--ui-bg) text-(--ui-text) font-sans overflow-x-hidden">
    <LandingNavbar />
    <LandingHero />

    <!-- Below the fold — lazy loaded, each in its own Suspense boundary -->
    <!-- Suspense per section so a slow section never blocks others -->

    <Suspense>
      <LandingMarquee />
      <template #fallback>
        <div
          class="py-16 border-y border-(--ui-border) bg-(--ui-bg-muted)"
          aria-hidden="true"
        />
      </template>
    </Suspense>

    <Suspense>
      <LandingStats />
      <template #fallback>
        <div
          class="py-24 bg-zinc-950"
          aria-hidden="true"
        />
      </template>
    </Suspense>

    <Suspense>
      <LandingHowItWorks />
      <template #fallback>
        <div
          class="py-28 bg-(--ui-bg-muted)"
          aria-hidden="true"
        />
      </template>
    </Suspense>

    <Suspense>
      <LandingFeatures />
      <template #fallback>
        <div
          class="py-28 bg-(--ui-bg)"
          aria-hidden="true"
        />
      </template>
    </Suspense>

    <Suspense>
      <LandingTestimonials />
      <template #fallback>
        <div
          class="py-24 bg-(--ui-bg-muted)"
          aria-hidden="true"
        />
      </template>
    </Suspense>

    <Suspense>
      <LandingPricing />
      <template #fallback>
        <div
          class="py-24 bg-(--ui-bg)"
          aria-hidden="true"
        />
      </template>
    </Suspense>

    <Suspense>
      <LandingCTA />
      <template #fallback>
        <div
          class="py-24 bg-(--ui-bg)"
          aria-hidden="true"
        />
      </template>
    </Suspense>

    <Suspense>
      <LandingFooter />
      <template #fallback>
        <div
          class="py-12 border-t border-(--ui-border) bg-(--ui-bg-muted)"
          aria-hidden="true"
        />
      </template>
    </Suspense>

    <ScrollToTop />
  </div>
</template>
