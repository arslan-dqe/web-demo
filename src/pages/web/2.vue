<script setup lang="ts">
definePage({
  meta: { layout: 'landing' }
})
</script>

<template>
  <div class="min-h-screen bg-(--ui-bg) text-(--ui-text) font-sans overflow-x-hidden">
    <LandingNavbar />
    <LandingHero />
    <LandingMarquee />
    <LandingStats />
    <LandingHowItWorks />
    <LandingFeatures />
    <LandingTestimonials />
    <LandingPricing />
    <LandingCTA />
    <LandingFooter />
  </div>
</template>
