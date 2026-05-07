# Landing Components — Help Guide

Reusable, slot-driven landing page components built with Nuxt UI + Vue.
All components live in `src/components/landing/`.

---

## Quick Start

Every component works with **zero props** — all content has sensible defaults.

```
<template>
  <div>
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
```

```
<!-- Zero config -->
<LandingNavbar />

<!-- Custom links -->
<LandingNavbar
  :links="[
    { label: 'Docs',    href: '/docs'    },
    { label: 'Pricing', href: '/pricing' },
  ]"
/>

<!-- Custom logo + actions -->
<LandingNavbar>
  <template #logo>
    <a href="/" class="font-black text-primary">MyApp</a>
  </template>
  <template #actions>
    <UButton size="xs" label="Login"   to="/login"    />
    <UButton size="xs" label="Sign up" to="/register" />
  </template>
</LandingNavbar>
```

## LandingHero
```
<!-- Custom copy + route on click -->
<LandingHero
  badge="Now in public beta"
  :headline="['Stop losing deals to']"
  highlight="bad pipeline data."
  description="Your own copy here."
  primary-cta="Start for free"
  secondary-cta="See a live demo"
  rating="4.8"
  rating-source="Capterra"
  @primary-cta="router.push('/signup')"
  @secondary-cta="openDemoModal"
/>

<!-- Replace the demo card -->
<LandingHero>
  <template #demo>
    <MyCustomDemoWidget />
  </template>
</LandingHero>
```

## LandingMarquee

```
<!-- Custom integrations -->
<LandingMarquee
  title="Connects to your entire data stack"
  subtitle="Any warehouse. Any CRM. Any pipeline tool."
  :row1="[
    { name: 'Snowflake', icon: 'i-lucide-database', iconBg: 'bg-sky-500/10',  iconColor: 'text-sky-500'  },
    { name: 'BigQuery',  icon: 'i-lucide-layers',   iconBg: 'bg-blue-500/10', iconColor: 'text-blue-500' },
  ]"
/>

<!-- Custom trust strip -->
<LandingMarquee>
  <template #trust>
    <span class="text-xs text-(--ui-text-dimmed)">✓ GDPR</span>
    <span class="text-xs text-(--ui-text-dimmed)">✓ SOC 2</span>
  </template>
</LandingMarquee>
```
## LandingStats

```
<!-- Custom stats -->
<LandingStats
  headline="Numbers that speak for themselves."
  :stats="[
    {
      raw: 500000, prefix: '', suffix: '+',
      label: 'Records processed',
      trend: '+22% MoM',
      icon: 'i-lucide-database',
      iconBg: 'bg-primary/15', iconColor: 'text-primary',
      gradient: 'from-primary to-violet-300',
      glow: 'bg-primary',
      bar: 'bg-gradient-to-r from-primary to-violet-400',
      barWidth: '80%',
    },
  ]"
/>

<!-- Custom header -->
<LandingStats>
  <template #header>
    <h2 class="text-4xl font-black text-white">Our impact in numbers.</h2>
  </template>
</LandingStats>
```
## LandingHowItWorks

```
<!-- Custom copy only -->
<LandingHowItWorks
  badge="The process"
  headline="Three steps to perfect data."
  subline="Simple, fast, no engineers needed."
/>

<!-- Override one step's visual card -->
<LandingHowItWorks>
  <template #step-visual-0>
    <MyCustomConnectUI />
  </template>
</LandingHowItWorks>
```

## LandingFeatures

```
<!-- Custom copy + features array -->
<LandingFeatures
  badge="What you get"
  headline="The only dedup tool\nyour team will love."
  subline="Powerful enough for enterprise, simple enough for day one."
  :features="myFeatures"
/>

<!-- Custom CTA button -->
<LandingFeatures>
  <template #cta>
    <UButton size="lg" label="Start free trial" to="/signup" />
  </template>
</LandingFeatures>
```

## LandingTestimonials

```
<!-- Custom testimonials -->
<LandingTestimonials
  badge="What our users say"
  headline="Loved by data teams worldwide."
  :testimonials="[
    {
      name:    'John Doe',
      role:    'CTO',
      company: 'Acme',
      avatar:  'JD',
      color:   'primary',
      stars:   5,
      quote:   'Incredible product.',
    },
  ]"
/>

<!-- Custom trust bar -->
<LandingTestimonials>
  <template #trust>
    <span class="text-sm text-(--ui-text-muted)">✓ GDPR</span>
    <span class="text-sm text-(--ui-text-muted)">✓ ISO 27001</span>
  </template>
</LandingTestimonials>
```

## LandingPricing

```
<!-- Route to signup with plan query param -->
<LandingPricing
  @cta="(plan) => router.push(`/signup?plan=${plan}`)"
/>

<!-- Custom plans -->
<LandingPricing
  headline="Simple, honest pricing."
  :plans="[
    {
      name: 'Free', price: '$0', period: '/mo', popular: false,
      desc: 'Get started for free.',
      features: ['100 records', 'Manual merges only'],
      cta: 'Get started',
    },
    {
      name: 'Pro', price: '$99', period: '/mo', popular: true,
      desc: 'For growing teams.',
      features: ['10,000 records', 'AI matching', 'Priority support'],
      cta: 'Start trial',
    },
  ]"
/>

<!-- Override Enterprise CTA button -->
<LandingPricing>
  <template #cta-enterprise>
    <UButton block variant="outline" label="Schedule a call" leading-icon="i-lucide-phone" />
  </template>
</LandingPricing>
```
## LandingCTA

```
<!-- Custom copy + events -->
<LandingCTA
  headline="Ready to fix your pipeline data?\nStart today."
  subline="No engineers needed. No long onboarding."
  primary-cta="Get started free"
  secondary-cta="Talk to sales"
  @primary="router.push('/signup')"
  @secondary="router.push('/demo')"
/>

<!-- Fully custom buttons -->
<LandingCTA headline="Let's get started.">
  <template #actions>
    <UButton size="xl" label="Create account" to="/signup" />
  </template>
</LandingCTA>
```

## LandingCTA

```
<!-- Custom brand + links -->
<LandingFooter
  brand-name="MyApp"
  brand-icon="i-lucide-rocket"
  brand-desc="The fastest way to ship products."
  copyright="MyApp Inc. All rights reserved."
  :columns="[
    {
      heading: 'Product',
      links: [
        { label: 'Docs',    href: '/docs'    },
        { label: 'Pricing', href: '/pricing' },
      ],
    },
  ]"
  :socials="[
    { icon: 'i-lucide-twitter', href: 'https://twitter.com/myapp', label: 'Twitter' },
  ]"
/>

<!-- Custom bottom bar -->
<LandingFooter>
  <template #badges>
    <span class="text-xs text-(--ui-text-dimmed)">Built with ❤️ in NYC</span>
  </template>
</LandingFooter>
```
