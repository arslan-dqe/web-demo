<script setup lang="ts">
import { ref } from 'vue'
import { useHead, useSeoMeta } from '@unhead/vue'
import DqeNavbar from '@/components/dqe/DqeNavbar.vue'
import DqeFooter from '@/components/dqe/DqeFooter.vue'
import StartFreeModal from '@/components/landing/StartFreeModal.vue'

definePage({ meta: { layout: 'landing' } })

useSeoMeta({
  title: 'FAQ — DQE Address, Email & Phone Validation',
  description: 'Answers to common questions about DQE: how USPS CASS address validation works, email and phone validation, pricing, setup time, TCPA compliance, and more.',
  robots: 'index, follow',
  ogTitle: 'DQE FAQ — Address, Email & Phone Validation Questions Answered',
  ogDescription: 'Everything you need to know about DQE: USPS CASS certification, one-API-call validation, credit pricing, TCPA compliance, and setup in under 5 minutes.',
})

const categories = [
  {
    id: 'product',
    heading: 'What is DQE?',
    items: [
      {
        q: 'What is DQE?',
        a: 'DQE is a US data validation platform that verifies postal addresses, email addresses, and phone numbers in a single self-serve API call. Unlike traditional validation vendors that require procurement cycles, SFTP file transfers, and enterprise contracts, DQE is fully self-serve: sign up with a business email, receive 100 free validations across all three channels, and start validating immediately — no credit card, no sales call. Under the hood, DQE is USPS CASS-certified for address standardization and deliverability verification, runs live SMTP handshakes for email validation, and performs real-time carrier lookups for phone line-type and TCPA compliance checking. The platform is built for retail, logistics, hospitality, marketing operations, and developer teams that need accurate contact data without a multi-week procurement process. API response time is under 150ms at the 95th percentile, and the service maintains a 99.99% uptime SLA with US data residency.',
      },
      {
        q: 'What does DQE validate?',
        a: 'DQE validates three categories of US contact data in one API call. Address validation uses USPS CASS-certified data to standardize postal addresses, confirm deliverability (DPV), append ZIP+4 codes, identify county and RDI (Residential Delivery Indicator) data, and flag vacant or undeliverable units. Email validation performs an MX record lookup, a live SMTP handshake against the receiving mail server, and checks against disposable domain lists, role-based address patterns, and spam trap databases — returning a risk score of Low, Medium, or High. Phone validation identifies the carrier, classifies the line type (mobile, landline, or VoIP), confirms whether the number is active or ported, and returns a TCPA compliance flag — critical for businesses making outbound calls under the Telephone Consumer Protection Act. All three validations consume a single credit per API call, regardless of how many channels you include in the request.',
      },
      {
        q: 'Is DQE USPS CASS certified?',
        a: 'Yes. DQE is a USPS CASS (Coding Accuracy Support System) certified address validation provider. CASS certification is the USPS standard for software that standardizes and verifies postal addresses against the official USPS database, confirming that an address is deliverable, appending the ZIP+4 code, and checking for vacancies or non-delivery points. DQE\'s CASS certification is provided through a licensed OEM partnership with Melissa Data, one of the longest-standing USPS-licensed data providers. The certification applies to batch processing jobs submitted through DQE\'s batch CSV validation endpoint. Individual real-time API calls carry USPS DPV (Delivery Point Validation) confirmation — the same deliverability check — but real-time calls are not independently CASS-certified per USPS program definitions. For compliance purposes that specifically require CASS certification, such as nonprofit postal discounts or large-volume mailer programs, DQE\'s batch processing workflow satisfies the requirement.',
      },
    ],
  },
  {
    id: 'validation',
    heading: 'How does each validation type work?',
    items: [
      {
        q: 'Can I validate addresses, emails, and phones in a single API call?',
        a: 'Yes — this is DQE\'s primary differentiator. A single POST request to the /validate endpoint can include an address, an email, and a phone number simultaneously, and DQE returns validation results for all three in one response. This means a checkout form submission, a CRM record import, or a new account registration can be fully validated in a single round trip — typically under 150ms. Each API call consumes exactly one credit regardless of how many of the three validation channels are included. This contrasts with the typical vendor stack where address validation (Smarty or Melissa), email validation (ZeroBounce or NeverBounce), and phone validation (Twilio Lookup or Numverify) each require a separate API key, a separate billing account, and a separate integration. DQE replaces all three with a single self-serve platform and one unified API key.',
      },
      {
        q: 'How does DQE email validation work?',
        a: 'DQE email validation performs a multi-step verification sequence that goes beyond simple format checking. First, DQE checks whether the domain has a valid MX (mail exchange) record — confirming the domain is configured to receive email. Second, DQE performs a live SMTP handshake with the receiving mail server, which tests whether the specific email address is accepted as a valid recipient without actually delivering a message. Third, the address is checked against a continuously updated database of disposable email domain providers such as Mailinator and Guerrilla Mail, role-based prefixes such as admin@ and noreply@, and known spam trap addresses. The result is a risk score — Low (deliverable), Medium (uncertain or risky), or High (likely to bounce or damage sender reputation) — plus individual flags for each check. The entire validation takes under 150ms and is returned in the same API response as address and phone validation.',
      },
      {
        q: 'What data does DQE return for a validated address?',
        a: 'When you submit an address to DQE, the response includes: the standardized address in USPS format (all-caps, abbreviated directionals and street suffixes); the ZIP+4 code if the address is deliverable; a DPV (Delivery Point Validation) confirmation indicating whether the address is deliverable, vacant, or a non-delivery point; the county name and FIPS code; an RDI flag indicating whether the address is residential or commercial; and a standardized suite or unit component if the input included a secondary address line. For addresses that cannot be standardized, DQE returns a structured error code indicating whether the street was not found, whether the city-state-ZIP combination was inconsistent, or whether the unit number was missing or invalid. The response schema is consistent across all valid and invalid outcomes, so your application can handle the full range of address quality with a single branch on the DPV status field.',
      },
      {
        q: 'How does DQE compare to Smarty for US address validation?',
        a: 'DQE and Smarty are both self-serve, credit-card-billed address validation APIs with no procurement cycle. The key difference is scope: Smarty validates addresses only. DQE validates addresses, emails, and phone numbers in one API call, replacing 2–3 vendors with a single integration. On address validation specifically, both platforms deliver USPS DPV confirmation, ZIP+4 appending, and county data. DQE adds RDI (Residential Delivery Indicator) and returns structured validation flags for downstream logic. Pricing is comparable at the credit-pack level. Migration from Smarty to DQE takes under ten minutes — DQE\'s address endpoint accepts the same input fields as Smarty\'s US Street Address API, so the change is typically a one-line base URL swap plus updating your response field mappings. DQE does not require a long-term contract; you pay per credit at the same self-serve pace as Smarty.',
      },
    ],
  },
  {
    id: 'setup',
    heading: 'Setup and integration',
    items: [
      {
        q: 'How quickly can I set up DQE?',
        a: 'DQE is designed to go from sign-up to first validated record in under five minutes. The process has three steps. First, create a free account using a business email address or Google SSO — no credit card required. Your account is activated immediately and includes 100 free validations across all three channels. Second, copy your API key from the dashboard. Third, send your first POST request to the /validate endpoint with any combination of address, email, and phone fields, and inspect the structured JSON response. DQE provides working code snippets in curl, Python, Node.js, and PHP directly in the dashboard, so you do not need to read the full API reference to make your first call. The API is designed to be familiar to any developer who has used a REST API — standard JSON request body, standard HTTP status codes, and a consistent response schema across all three validation types.',
      },
      {
        q: 'Does DQE offer batch validation for CSV files?',
        a: 'Yes. DQE supports batch validation in addition to the real-time REST API. The batch workflow allows you to upload a CSV file containing records with address, email, or phone columns. DQE automatically detects the column structure, runs CASS-certified address validation across all rows, and returns a downloadable CSV with standardized data and validation flags appended to each record. Batch processing is available on all paid plans (Verify and Advanced) and is the workflow that carries DQE\'s USPS CASS certification — meaning the output file is a CASS-certified address file, suitable for bulk mail discounts and compliance programs that require certified outputs. Processing time depends on file size: most files under 50,000 rows complete in under ten minutes. Larger files are processed asynchronously and deliver results to a webhook or a downloadable dashboard link. The batch endpoint uses the same credit pricing as the real-time API — one credit per row processed.',
      },
    ],
  },
  {
    id: 'pricing',
    heading: 'Pricing and credits',
    items: [
      {
        q: 'How much does address, email, and phone validation cost?',
        a: 'DQE offers three pricing tiers. The Validate plan is free forever and includes 100 validations across all three channels — no credit card required. The Verify plan costs $99 per month and includes 25,000 validations per month, plus webhooks, batch processing, and credits that never expire. The Advanced plan has custom pricing and includes unlimited validations, CRM integrations, a dedicated Customer Success Manager, an SLA guarantee, and a SOC 2 BAA for HIPAA-eligible workflows. For teams that need more than 100 but fewer than 25,000 validations per month, DQE also sells credit packs on a pay-as-you-go basis at approximately $19 per 1,000 credits, purchasable from the dashboard without committing to a monthly subscription. All plans use the same credit model — one credit per API call — and pay-as-you-go credits never expire.',
      },
      {
        q: 'Do DQE credits expire?',
        a: 'No. Credits purchased on the Verify plan and through pay-as-you-go credit packs never expire. You can buy a pack of 10,000 credits today and use the last credit two years from now — your balance does not reset at the end of a billing period. This is intentional: DQE is designed for teams whose validation volume fluctuates month to month, such as e-commerce businesses that spike during holiday seasons or SaaS platforms that onboard users in cohorts. The only exception is the 100 free credits included with a new account on the Validate plan — these are intended for trial and evaluation use. The Verify plan\'s 25,000 monthly validations reset at the start of each billing cycle, as is standard for subscription-based entitlements, but any additional credits purchased through pay-as-you-go packs remain in your balance indefinitely regardless of plan status.',
      },
      {
        q: 'Can I mix address, email, and phone validations from the same credit balance?',
        a: 'Yes. DQE uses a unified credit pool — credits are not siloed by validation type. If your balance contains 1,000 credits, you can use all 1,000 for address-only calls, all 1,000 for email-only calls, all 1,000 for combined address-email-phone calls, or any combination that fits your workflow. Each API call to the /validate endpoint consumes exactly one credit regardless of how many of the three validation channels you include in the request body. This means that validating an address alone costs the same as validating an address, an email, and a phone number simultaneously in a single call. DQE\'s pricing model eliminates the per-channel billing complexity common on multi-vendor stacks, where each validation type carries its own rate and negotiation. One credit, all channels, zero friction. Unused credits roll over indefinitely, so there is no pressure to exhaust your balance before a calendar date.',
      },
    ],
  },
  {
    id: 'compliance',
    heading: 'Compliance and security',
    items: [
      {
        q: 'What is TCPA and does DQE help with TCPA compliance?',
        a: 'The Telephone Consumer Protection Act (TCPA) is a US federal law that restricts automated calls and text messages to mobile phones. Businesses that make outbound calls or send automated SMS campaigns must obtain prior express written consent from recipients before contacting mobile numbers using an autodialer. The penalty for a TCPA violation is $500 to $1,500 per call or text message — enforcement is aggressive and class action litigation is common in this space. DQE helps you avoid TCPA liability by identifying whether a phone number is a mobile line before you attempt contact. DQE\'s phone validation response includes a line type field (mobile, landline, or VoIP) and an explicit TCPA compliance flag. If a number is classified as mobile, you should verify that you have prior express written consent before including it in an automated outreach campaign. DQE identifies the phone type — consent verification remains your responsibility.',
      },
      {
        q: 'Is DQE GDPR compliant?',
        a: 'DQE\'s data handling practices are designed to meet EU General Data Protection Regulation requirements for data processors. DQE processes validation inputs (addresses, emails, phone numbers) on behalf of its customers, acting as a data processor under GDPR terminology. DQE does not retain validation inputs beyond the duration of the API call for processing purposes, and does not use customer-submitted personal data for training, marketing, or enrichment purposes. DQE is SOC 2 Type II certified, which provides independent third-party verification of security and data handling controls. Customers who are themselves subject to GDPR as data controllers — EU-based businesses or US businesses handling EU resident data — should review DQE\'s Privacy Policy and Data Processing Agreement, available at dqe.io/dpa, before integrating DQE into workflows that process EU personal data. DQE maintains US data residency; EU-based organizations should evaluate transfer obligations before deployment.',
      },
      {
        q: 'Is DQE data stored in the US?',
        a: 'Yes. DQE maintains US data residency — all customer data, including validation inputs (addresses, emails, and phone numbers submitted to the API) and validation outputs, is processed and stored exclusively on infrastructure located in the United States. DQE does not transfer customer data to servers outside the United States as part of the core validation workflow. This is relevant for customers subject to data residency requirements under state privacy laws such as the California Consumer Privacy Act (CCPA), or for businesses handling health-related contact data under HIPAA-adjacent frameworks. DQE is SOC 2 Type II certified, meaning an independent auditor has verified DQE\'s security controls, availability commitments, and data handling practices against the AICPA Trust Services Criteria. Advanced plan customers can request a SOC 2 BAA (Business Associate Agreement) for workflows that involve protected health information. DQE\'s Privacy Policy, effective May 11, 2026, describes the full data retention and processing framework.',
      },
    ],
  },
]

useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: categories.flatMap(cat =>
        cat.items.map(item => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a,
          },
        }))
      ),
    }),
  }],
})

const signupOpen = ref(false)
</script>

<template>
  <div class="min-h-screen bg-(--ui-bg) text-(--ui-text) font-sans overflow-x-hidden">

    <DqeNavbar @start-free="signupOpen = true" />

    <!-- Hero -->
    <section class="py-20 px-4 text-center bg-(--ui-bg-muted) border-b border-(--ui-border)">
      <div class="max-w-2xl mx-auto">
        <div class="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
          <UIcon name="i-lucide-circle-help" class="w-3.5 h-3.5" />
          Help Center
        </div>
        <h1 class="text-4xl md:text-5xl font-extrabold text-(--ui-text-highlighted) mb-4 leading-tight">
          Frequently Asked Questions
        </h1>
        <p class="text-(--ui-text-muted) text-lg">
          Everything you need to know about DQE's address, email, and phone validation platform.
          Can't find what you're looking for?
          <a href="mailto:support@dqe.io" class="text-primary font-semibold hover:underline">Contact support →</a>
        </p>
      </div>
    </section>

    <!-- Jump nav -->
    <nav class="sticky top-0 z-10 bg-(--ui-bg)/90 backdrop-blur border-b border-(--ui-border) py-3 px-4">
      <div class="max-w-4xl mx-auto flex flex-wrap gap-x-6 gap-y-1 justify-center">
        <a
          v-for="cat in categories"
          :key="cat.id"
          :href="`#${cat.id}`"
          class="text-sm text-(--ui-text-muted) hover:text-primary transition-colors font-medium"
        >
          {{ cat.heading }}
        </a>
      </div>
    </nav>

    <!-- FAQ sections -->
    <main class="py-16 px-4">
      <div class="max-w-3xl mx-auto space-y-20">

        <section
          v-for="cat in categories"
          :key="cat.id"
          :id="cat.id"
          class="scroll-mt-16"
        >
          <h2 class="text-2xl font-extrabold text-(--ui-text-highlighted) mb-8 pb-3 border-b border-(--ui-border)">
            {{ cat.heading }}
          </h2>

          <div class="space-y-10">
            <div
              v-for="item in cat.items"
              :key="item.q"
            >
              <h3 class="text-lg font-bold text-(--ui-text-highlighted) mb-3 flex items-start gap-2">
                <UIcon name="i-lucide-chevron-right" class="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                {{ item.q }}
              </h3>
              <p class="text-(--ui-text-muted) leading-relaxed pl-7">{{ item.a }}</p>
            </div>
          </div>
        </section>

      </div>
    </main>

    <!-- Bottom CTA -->
    <section class="py-16 px-4 bg-(--ui-bg-muted) border-t border-(--ui-border) text-center">
      <h2 class="text-2xl font-extrabold text-(--ui-text-highlighted) mb-3">Still have questions?</h2>
      <p class="text-(--ui-text-muted) mb-6">Our team typically responds within one business day.</p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
        <UButton
          label="Start for free"
          trailing-icon="i-lucide-arrow-right"
          @click="signupOpen = true"
        />
        <UButton
          label="Email support"
          variant="outline"
          icon="i-lucide-mail"
          to="mailto:support@dqe.io"
        />
      </div>
    </section>

    <DqeFooter />

    <StartFreeModal v-model:open="signupOpen" />

  </div>
</template>
