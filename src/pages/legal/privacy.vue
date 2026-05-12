<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useHead } from '@unhead/vue'

useHead({ title: 'Privacy Policy — DQE', htmlAttrs: { lang: 'en' } })

const EFFECTIVE = 'May 11, 2026'

const sections = [
  { id: 'intro',         label: '1. Who We Are' },
  { id: 'collected',     label: '2. Data We Collect' },
  { id: 'how-we-use',    label: '3. How We Use Data' },
  { id: 'legal-bases',   label: '4. Legal Bases (GDPR)' },
  { id: 'sharing',       label: '5. Sharing & Subprocessors' },
  { id: 'validation-data', label: '6. Customer Validation Data' },
  { id: 'retention',     label: '7. Data Retention' },
  { id: 'cookies',       label: '8. Cookies' },
  { id: 'transfers',     label: '9. International Transfers' },
  { id: 'gdpr-rights',   label: '10. GDPR / UK GDPR Rights' },
  { id: 'ccpa',          label: '11. CCPA Rights' },
  { id: 'security',      label: '12. Security' },
  { id: 'children',      label: '13. Children' },
  { id: 'changes',       label: '14. Policy Changes' },
  { id: 'contact',       label: '15. Contact & DPA' },
]

const activeSection = ref('intro')
const scrollY = ref(0)

function updateActive() {
  for (const s of [...sections].reverse()) {
    const el = document.getElementById(s.id)
    if (el && el.getBoundingClientRect().top <= 132) {
      activeSection.value = s.id
      return
    }
  }
  activeSection.value = 'intro'
}

const onScroll = () => { scrollY.value = window.scrollY; updateActive() }
onMounted(() => { window.addEventListener('scroll', onScroll, { passive: true }); updateActive() })
onUnmounted(() => window.removeEventListener('scroll', onScroll))

function jumpTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const subprocessors = [
  { name: 'Stripe',           purpose: 'Payment processing', location: 'USA / EU' },
  { name: 'AWS (Amazon)',     purpose: 'Cloud infrastructure & storage', location: 'USA (us-east-1)' },
  { name: 'Cloudflare',       purpose: 'CDN, DDoS protection, DNS', location: 'USA / Global' },
  { name: 'Google Analytics', purpose: 'Website analytics (anonymized)', location: 'USA' },
  { name: 'Postmark',         purpose: 'Transactional email (API keys, receipts)', location: 'USA' },
  { name: 'Zendesk',          purpose: 'Customer support ticketing', location: 'USA' },
  { name: 'Melissa OEM',      purpose: 'USPS CASS address data provider', location: 'USA' },
]
</script>

<template>
  <div class="bg-white text-slate-900 font-sans antialiased min-h-screen">
    <!-- Nav -->
    <header
      class="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-shadow duration-300"
      :class="scrollY > 10 ? 'shadow-sm' : ''"
    >
      <div class="max-w-7xl mx-auto px-6 h-14 flex items-center gap-6">
        <a
          href="/web/4"
          class="flex items-center gap-2 flex-shrink-0"
        >
          <div class="w-7 h-7 bg-blue-600 flex items-center justify-center">
            <UIcon
              name="i-lucide-shield-check"
              class="w-3.5 h-3.5 text-white"
            />
          </div>
          <span class="font-bold text-slate-900 tracking-tight text-sm">DQE</span>
        </a>
        <div class="h-4 w-px bg-slate-200" />
        <span class="text-sm text-slate-400">Privacy Policy</span>
        <div class="ml-auto flex items-center gap-4">
          <a
            href="/legal/terms"
            class="text-sm text-slate-500 hover:text-blue-600 transition-colors"
          >Terms of Use</a>
          <UButton
            size="xs"
            label="Get started"
            @click="$router.push('/web/4')"
          />
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-6 pt-24 pb-20 flex gap-12">
      <!-- Sidebar TOC -->
      <aside class="hidden lg:block w-60 flex-shrink-0">
        <div class="sticky top-20">
          <p class="font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-4">
            On this page
          </p>
          <nav class="flex flex-col gap-0.5">
            <button
              v-for="s in sections"
              :key="s.id"
              class="text-left text-xs px-3 py-1.5 rounded transition-all duration-150 font-medium"
              :class="activeSection === s.id
                ? 'text-blue-600 bg-blue-50'
                : 'text-slate-400 hover:text-slate-700 hover:bg-slate-50'"
              @click="jumpTo(s.id)"
            >
              {{ s.label }}
            </button>
          </nav>
          <div class="mt-6 pt-6 border-t border-slate-100">
            <a
              href="/legal/terms"
              class="flex items-center gap-1.5 text-xs text-slate-400 hover:text-blue-600 transition-colors"
            >
              <UIcon
                name="i-lucide-arrow-right"
                class="w-3 h-3"
              />
              Terms of Use
            </a>
          </div>
        </div>
      </aside>

      <!-- Main content -->
      <main class="flex-1 min-w-0 max-w-3xl">
        <!-- Header -->
        <div class="mb-12 pb-8 border-b border-slate-100">
          <div class="inline-flex items-center gap-2 bg-blue-50 text-blue-600 font-mono text-[11px] px-3 py-1.5 mb-5">
            <UIcon
              name="i-lucide-lock"
              class="w-3.5 h-3.5"
            />
            Legal document
          </div>
          <h1 class="text-4xl font-bold text-slate-900 tracking-tight mb-3">
            Privacy Policy
          </h1>
          <p class="text-slate-500 text-sm">
            Effective date: <strong class="text-slate-700">{{ EFFECTIVE }}</strong> ·
            DQE USA
          </p>
          <p class="mt-4 text-sm text-slate-500 leading-relaxed max-w-2xl">
            This Privacy Policy describes how DQE USA ("DQE USA", "we", "us", "our") collects,
            uses, and protects information about you when you use our website, platform, and API
            services (the "Service"). We are committed to handling your data with transparency and care.
          </p>
        </div>

        <!-- §1 Who We Are -->
        <section
          id="intro"
          class="mb-10 scroll-mt-24"
        >
          <h2 class="text-xl font-bold text-slate-900 mb-4">
            1. Who We Are
          </h2>
          <div class="prose-legal">
            <p>DQE USA is a data-quality and validation company. We provide a unified API for address standardization (USPS CASS-certified), email verification, and phone validation.</p>
            <p>For the purposes of the GDPR and UK GDPR, DQE USA acts as a <strong>data controller</strong> with respect to personal information collected through account registration, billing, and website interactions. For Customer Data submitted to the Service for validation, DQE USA acts as a <strong>data processor</strong> on your behalf.</p>
            <div class="bg-slate-50 border border-slate-200 rounded px-5 py-4 text-sm text-slate-700 space-y-1 mt-3">
              <p class="font-semibold text-slate-900">
                DQE USA
              </p>
              <p>1200 Brickell Ave, Ste 1960</p>
              <p>Miami, FL 33131, United States</p>
              <p>
                Data protection contact: <a
                  href="mailto:privacy@dqe.io"
                  class="text-blue-600 hover:underline"
                >privacy@dqe.io</a>
              </p>
            </div>
          </div>
        </section>

        <!-- §2 Data We Collect -->
        <section
          id="collected"
          class="mb-10 scroll-mt-24"
        >
          <h2 class="text-xl font-bold text-slate-900 mb-4">
            2. Data We Collect
          </h2>
          <div class="prose-legal">
            <h3 class="text-base font-semibold text-slate-800 mb-2 mt-5">
              2.1 Account & Registration Data
            </h3>
            <p>When you create an Account, we collect: first name, last name, company name, business email address, and the date/time of registration. This data is required to provide the Service.</p>

            <h3 class="text-base font-semibold text-slate-800 mb-2 mt-5">
              2.2 Billing & Payment Data
            </h3>
            <p>When you subscribe to a paid plan, we collect billing name, billing address, and payment method details. Payment card numbers are handled exclusively by <strong>Stripe</strong> and are never stored on DQE's servers. We retain a tokenized reference and the last four digits of your card for billing records.</p>

            <h3 class="text-base font-semibold text-slate-800 mb-2 mt-5">
              2.3 API Usage & Log Data
            </h3>
            <p>Our servers automatically record: API request timestamps, the endpoint called, Credit consumption, HTTP response codes, and your IP address. We do not log the full body of API requests containing Customer Data beyond what is necessary to deliver and debug the Service.</p>

            <h3 class="text-base font-semibold text-slate-800 mb-2 mt-5">
              2.4 Customer Validation Data
            </h3>
            <p>Addresses, email addresses, and phone numbers that you submit via the API or CSV batch upload for validation. See Section 6 for how this data is specifically handled.</p>

            <h3 class="text-base font-semibold text-slate-800 mb-2 mt-5">
              2.5 Website & Cookie Data
            </h3>
            <p>When you visit our website, we collect browsing behavior, pages viewed, session duration, device type, operating system, browser version, and referring URL. See Section 8 for cookie details.</p>

            <h3 class="text-base font-semibold text-slate-800 mb-2 mt-5">
              2.6 Communications
            </h3>
            <p>If you contact us via email or our support portal, we retain the content of your communications and our responses to provide support and improve the Service.</p>
          </div>
        </section>

        <!-- §3 How We Use Data -->
        <section
          id="how-we-use"
          class="mb-10 scroll-mt-24"
        >
          <h2 class="text-xl font-bold text-slate-900 mb-4">
            3. How We Use Your Data
          </h2>
          <div class="prose-legal">
            <p>We use the personal data we collect to:</p>
            <ul>
              <li><strong>Provide and operate the Service</strong> — account management, API key issuance, Credit tracking, and result delivery.</li>
              <li><strong>Process payments</strong> — billing, invoicing, tax compliance, and fraud prevention.</li>
              <li><strong>Communicate with you</strong> — transactional emails (API key delivery, receipts, service alerts), and, with your consent, product updates and newsletters.</li>
              <li><strong>Improve the Service</strong> — aggregate, anonymized analysis of usage patterns to optimize performance and develop new features.</li>
              <li><strong>Security and fraud prevention</strong> — detecting and preventing abuse, rate-limit violations, and unauthorized access.</li>
              <li><strong>Legal compliance</strong> — meeting obligations under applicable law, responding to lawful government requests, and enforcing our Terms of Use.</li>
            </ul>
            <p>We do not sell, rent, or share your personal information with third parties for their independent marketing purposes. We do not use Customer Validation Data (the addresses, emails, or phones you submit) for any purpose other than performing the validation you requested.</p>
          </div>
        </section>

        <!-- §4 Legal Bases -->
        <section
          id="legal-bases"
          class="mb-10 scroll-mt-24"
        >
          <h2 class="text-xl font-bold text-slate-900 mb-4">
            4. Legal Bases for Processing (GDPR)
          </h2>
          <div class="prose-legal">
            <p>If you are located in the European Economic Area, the United Kingdom, or Switzerland, we process your personal data under the following legal bases:</p>
            <div class="space-y-3 mt-2">
              <div class="grid grid-cols-[180px_1fr] gap-4 py-2.5 border-b border-slate-100">
                <dt class="font-semibold text-slate-700 text-sm">
                  Contract performance
                </dt>
                <dd class="text-sm text-slate-600 leading-relaxed">
                  Processing necessary to create and maintain your Account, deliver API results, and fulfil paid subscription obligations (Art. 6(1)(b) GDPR).
                </dd>
              </div>
              <div class="grid grid-cols-[180px_1fr] gap-4 py-2.5 border-b border-slate-100">
                <dt class="font-semibold text-slate-700 text-sm">
                  Legitimate interests
                </dt>
                <dd class="text-sm text-slate-600 leading-relaxed">
                  Fraud prevention, security monitoring, improving the Service, and business communications where our interests are not overridden by your rights (Art. 6(1)(f) GDPR).
                </dd>
              </div>
              <div class="grid grid-cols-[180px_1fr] gap-4 py-2.5 border-b border-slate-100">
                <dt class="font-semibold text-slate-700 text-sm">
                  Legal obligation
                </dt>
                <dd class="text-sm text-slate-600 leading-relaxed">
                  Tax records, financial accounting, and responding to lawful requests from public authorities (Art. 6(1)(c) GDPR).
                </dd>
              </div>
              <div class="grid grid-cols-[180px_1fr] gap-4 py-2.5">
                <dt class="font-semibold text-slate-700 text-sm">
                  Consent
                </dt>
                <dd class="text-sm text-slate-600 leading-relaxed">
                  Marketing communications and non-essential cookies, where we have obtained your prior opt-in consent. You may withdraw consent at any time (Art. 6(1)(a) GDPR).
                </dd>
              </div>
            </div>
          </div>
        </section>

        <!-- §5 Sharing & Subprocessors -->
        <section
          id="sharing"
          class="mb-10 scroll-mt-24"
        >
          <h2 class="text-xl font-bold text-slate-900 mb-4">
            5. Sharing & Subprocessors
          </h2>
          <div class="prose-legal">
            <p>We do not sell personal data. We share data only with the following categories of parties:</p>
            <ul>
              <li><strong>Service providers and subprocessors</strong> — third parties who process data on our behalf, contractually bound to use it only for the services they provide to DQE.</li>
              <li><strong>Legal and regulatory authorities</strong> — where required by law, court order, or to protect DQE's legal rights.</li>
              <li><strong>Business transfers</strong> — in connection with a merger, acquisition, or sale of assets, where the acquiring entity agrees to honor this Privacy Policy.</li>
            </ul>

            <h3 class="text-base font-semibold text-slate-800 mb-3 mt-6">
              Subprocessor list
            </h3>
            <div class="border border-slate-200 overflow-hidden rounded text-sm">
              <table class="w-full">
                <thead>
                  <tr class="bg-slate-50 border-b border-slate-200">
                    <th class="text-left px-4 py-2.5 font-mono text-[10px] text-slate-500 uppercase tracking-wider">
                      Subprocessor
                    </th>
                    <th class="text-left px-4 py-2.5 font-mono text-[10px] text-slate-500 uppercase tracking-wider">
                      Purpose
                    </th>
                    <th class="text-left px-4 py-2.5 font-mono text-[10px] text-slate-500 uppercase tracking-wider">
                      Location
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(sp, i) in subprocessors"
                    :key="sp.name"
                    class="border-b border-slate-100 last:border-0"
                    :class="i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'"
                  >
                    <td class="px-4 py-2.5 font-semibold text-slate-700">
                      {{ sp.name }}
                    </td>
                    <td class="px-4 py-2.5 text-slate-500">
                      {{ sp.purpose }}
                    </td>
                    <td class="px-4 py-2.5 text-slate-500 font-mono text-[11px]">
                      {{ sp.location }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p class="text-xs text-slate-400 mt-2">
              This list is reviewed and updated at least annually. We will notify you of material changes to our subprocessors via email or in-app notice.
            </p>
          </div>
        </section>

        <!-- §6 Customer Validation Data -->
        <section
          id="validation-data"
          class="mb-10 scroll-mt-24"
        >
          <h2 class="text-xl font-bold text-slate-900 mb-4">
            6. Customer Validation Data
          </h2>
          <div class="prose-legal">
            <div class="bg-emerald-50 border border-emerald-200 px-4 py-3 rounded text-sm text-emerald-800 mb-4 flex gap-2.5">
              <UIcon
                name="i-lucide-shield-check"
                class="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5"
              />
              <span>You own your data. DQE processes addresses, emails, and phones you submit solely to perform validation and return results to you — nothing more.</span>
            </div>
            <p><strong>You retain full ownership</strong> of all Customer Validation Data. DQE processes this data exclusively to execute the validation service you requested. We do not:</p>
            <ul>
              <li>use Customer Validation Data for our own marketing, profiling, or analytics;</li>
              <li>sell or share Customer Validation Data with third parties for their own use;</li>
              <li>combine Customer Validation Data with other datasets for enrichment or targeting; or</li>
              <li>use Customer Validation Data to train machine learning models for purposes unrelated to the core validation service.</li>
            </ul>
            <p>
              Customer Validation Data is stored in encrypted form (AES-256 at rest, TLS 1.2+ in transit) and is automatically deleted <strong>30 days</strong> after processing is complete. You may request earlier deletion at any time by contacting <a
                href="mailto:privacy@dqe.io"
                class="text-blue-600 hover:underline"
              >privacy@dqe.io</a> or using the delete function in your Account dashboard.
            </p>
          </div>
        </section>

        <!-- §7 Retention -->
        <section
          id="retention"
          class="mb-10 scroll-mt-24"
        >
          <h2 class="text-xl font-bold text-slate-900 mb-4">
            7. Data Retention
          </h2>
          <div class="prose-legal">
            <div class="border border-slate-200 overflow-hidden rounded text-sm mt-2">
              <table class="w-full">
                <thead>
                  <tr class="bg-slate-50 border-b border-slate-200">
                    <th class="text-left px-4 py-2.5 font-mono text-[10px] text-slate-500 uppercase tracking-wider">
                      Data type
                    </th>
                    <th class="text-left px-4 py-2.5 font-mono text-[10px] text-slate-500 uppercase tracking-wider">
                      Retention period
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  <tr class="bg-white">
                    <td class="px-4 py-3 font-semibold text-slate-700">
                      Account registration data
                    </td>
                    <td class="px-4 py-3 text-slate-500">
                      Duration of account + 90 days after closure
                    </td>
                  </tr>
                  <tr class="bg-slate-50/50">
                    <td class="px-4 py-3 font-semibold text-slate-700">
                      Billing & payment records
                    </td>
                    <td class="px-4 py-3 text-slate-500">
                      7 years (tax & accounting legal requirement)
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="px-4 py-3 font-semibold text-slate-700">
                      Customer validation data
                    </td>
                    <td class="px-4 py-3 text-slate-500">
                      30 days post-processing, then permanently deleted
                    </td>
                  </tr>
                  <tr class="bg-slate-50/50">
                    <td class="px-4 py-3 font-semibold text-slate-700">
                      API usage logs
                    </td>
                    <td class="px-4 py-3 text-slate-500">
                      90 days (security & debugging)
                    </td>
                  </tr>
                  <tr class="bg-white">
                    <td class="px-4 py-3 font-semibold text-slate-700">
                      Support communications
                    </td>
                    <td class="px-4 py-3 text-slate-500">
                      2 years after ticket closure
                    </td>
                  </tr>
                  <tr class="bg-slate-50/50">
                    <td class="px-4 py-3 font-semibold text-slate-700">
                      Website analytics (anonymized)
                    </td>
                    <td class="px-4 py-3 text-slate-500">
                      26 months
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>When retention periods expire, data is securely deleted or irreversibly anonymized. Data subject to an active legal hold is retained until the hold is released.</p>
          </div>
        </section>

        <!-- §8 Cookies -->
        <section
          id="cookies"
          class="mb-10 scroll-mt-24"
        >
          <h2 class="text-xl font-bold text-slate-900 mb-4">
            8. Cookies & Tracking Technologies
          </h2>
          <div class="prose-legal">
            <p>We use cookies and similar tracking technologies on our website. You can manage your cookie preferences via the consent banner that appears on first visit.</p>
            <div class="space-y-3 mt-3">
              <div class="border border-slate-200 rounded p-4">
                <div class="flex items-center gap-2 mb-1.5">
                  <div class="w-2 h-2 rounded-full bg-red-400" />
                  <span class="font-semibold text-slate-800 text-sm">Strictly Necessary</span>
                  <span class="font-mono text-[10px] text-slate-400 ml-auto">Cannot be disabled</span>
                </div>
                <p class="text-xs text-slate-500 leading-relaxed">
                  Session management, authentication, CSRF protection, load balancing (Cloudflare). Required for the Service to function.
                </p>
              </div>
              <div class="border border-slate-200 rounded p-4">
                <div class="flex items-center gap-2 mb-1.5">
                  <div class="w-2 h-2 rounded-full bg-amber-400" />
                  <span class="font-semibold text-slate-800 text-sm">Analytics & Performance</span>
                  <span class="font-mono text-[10px] text-slate-400 ml-auto">Optional (opt-in)</span>
                </div>
                <p class="text-xs text-slate-500 leading-relaxed">
                  Google Analytics (anonymized IP). Helps us understand how visitors use the site so we can improve it. No personal data is shared with Google for advertising.
                </p>
              </div>
              <div class="border border-slate-200 rounded p-4">
                <div class="flex items-center gap-2 mb-1.5">
                  <div class="w-2 h-2 rounded-full bg-slate-300" />
                  <span class="font-semibold text-slate-800 text-sm">Marketing & Targeting</span>
                  <span class="font-mono text-[10px] text-slate-400 ml-auto">Optional (opt-in)</span>
                </div>
                <p class="text-xs text-slate-500 leading-relaxed">
                  Used to measure the effectiveness of our advertising campaigns (Google Ads conversion tracking). Disabled by default; enabled only with your explicit consent.
                </p>
              </div>
            </div>
            <p>Cookie consent is refreshed every 12 months in accordance with applicable law. You may withdraw consent at any time by clearing your browser cookies or visiting our cookie preference center.</p>
          </div>
        </section>

        <!-- §9 International Transfers -->
        <section
          id="transfers"
          class="mb-10 scroll-mt-24"
        >
          <h2 class="text-xl font-bold text-slate-900 mb-4">
            9. International Data Transfers
          </h2>
          <div class="prose-legal">
            <p>DQE is based in the United States. If you are located in the European Economic Area (EEA), the United Kingdom, or Switzerland, your personal data will be transferred to and processed in the United States.</p>
            <p>We rely on the following safeguards for cross-border transfers:</p>
            <ul>
              <li><strong>EU Standard Contractual Clauses (SCCs)</strong> — incorporated by reference into our Data Processing Addendum (DPA) for transfers from the EEA to DQE's US processing environment.</li>
              <li><strong>UK International Data Transfer Agreement (IDTA)</strong> — applied for transfers from the United Kingdom.</li>
              <li><strong>EU-U.S. Data Privacy Framework</strong> — DQE is certified under the EU-U.S. Data Privacy Framework and its UK and Swiss Extensions, which provides an adequacy finding for transatlantic data flows.</li>
            </ul>
            <p>
              Customers who require a Data Processing Addendum (DPA) for GDPR compliance may request one at <a
                href="mailto:privacy@dqe.io"
                class="text-blue-600 hover:underline"
              >privacy@dqe.io</a>. We execute DPAs within five business days of a valid request.
            </p>
          </div>
        </section>

        <!-- §10 GDPR Rights -->
        <section
          id="gdpr-rights"
          class="mb-10 scroll-mt-24"
        >
          <h2 class="text-xl font-bold text-slate-900 mb-4">
            10. Your Rights under GDPR / UK GDPR
          </h2>
          <div class="prose-legal">
            <p>If you are in the EEA, UK, or Switzerland, you have the following rights regarding your personal data:</p>
            <div class="space-y-2 mt-3">
              <div
                v-for="right in [
                  { title: 'Right of access', desc: 'Request a copy of the personal data we hold about you (Art. 15 GDPR).' },
                  { title: 'Right to rectification', desc: 'Request correction of inaccurate or incomplete personal data (Art. 16 GDPR).' },
                  { title: 'Right to erasure', desc: 'Request deletion of your personal data where there is no legitimate ground for its continued processing (Art. 17 GDPR).' },
                  { title: 'Right to restriction', desc: 'Request that we restrict processing of your data while a dispute is resolved (Art. 18 GDPR).' },
                  { title: 'Right to portability', desc: 'Receive your personal data in a structured, machine-readable format (Art. 20 GDPR).' },
                  { title: 'Right to object', desc: 'Object to processing based on legitimate interests, including profiling (Art. 21 GDPR).' },
                  { title: 'Right to withdraw consent', desc: 'Where processing is based on consent, you may withdraw it at any time without affecting prior processing.' },
                  { title: 'Right to lodge a complaint', desc: 'You have the right to complain to your national supervisory authority (e.g., the ICO in the UK, CNIL in France).' },
                ]"
                :key="right.title"
                class="flex gap-3 py-2.5 border-b border-slate-100 last:border-0"
              >
                <UIcon
                  name="i-lucide-check-circle"
                  class="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5"
                />
                <div>
                  <span class="text-sm font-semibold text-slate-700">{{ right.title }}. </span>
                  <span class="text-sm text-slate-500">{{ right.desc }}</span>
                </div>
              </div>
            </div>
            <p class="mt-4">
              To exercise any of these rights, contact us at <a
                href="mailto:privacy@dqe.io"
                class="text-blue-600 hover:underline"
              >privacy@dqe.io</a>. We will respond within <strong>30 days</strong> (extendable by a further 60 days for complex requests, with notice). Identity verification may be required before we act on a request.
            </p>
          </div>
        </section>

        <!-- §11 CCPA -->
        <section
          id="ccpa"
          class="mb-10 scroll-mt-24"
        >
          <h2 class="text-xl font-bold text-slate-900 mb-4">
            11. California Privacy Rights (CCPA / CPRA)
          </h2>
          <div class="prose-legal">
            <p>If you are a California resident, the California Consumer Privacy Act (CCPA) as amended by the CPRA grants you the following rights:</p>
            <ul>
              <li><strong>Right to know</strong> — request disclosure of the categories and specific pieces of personal information we collect, use, disclose, or sell about you.</li>
              <li><strong>Right to delete</strong> — request deletion of personal information we hold about you, subject to certain exceptions.</li>
              <li><strong>Right to correct</strong> — request correction of inaccurate personal information.</li>
              <li><strong>Right to opt out of sale / sharing</strong> — DQE does not sell or share personal information for cross-context behavioral advertising. You need not opt out.</li>
              <li><strong>Right to limit use of sensitive personal information</strong> — DQE does not use sensitive personal information (as defined under CPRA) for purposes other than providing the Service.</li>
              <li><strong>Non-discrimination</strong> — exercising your CCPA rights will not result in discriminatory treatment.</li>
            </ul>
            <p>
              Submit a verifiable consumer request by emailing <a
                href="mailto:privacy@dqe.io"
                class="text-blue-600 hover:underline"
              >privacy@dqe.io</a> or calling <a
                href="tel:+18005550100"
                class="text-blue-600 hover:underline"
              >1-800-555-0100</a>. We will respond within <strong>45 days</strong>.
            </p>
            <p>You may designate an authorized agent to exercise these rights on your behalf by providing written authorization together with verification of the agent's identity.</p>
          </div>
        </section>

        <!-- §12 Security -->
        <section
          id="security"
          class="mb-10 scroll-mt-24"
        >
          <h2 class="text-xl font-bold text-slate-900 mb-4">
            12. Security
          </h2>
          <div class="prose-legal">
            <p>DQE implements technical and organizational measures appropriate to the risk of the processing, including:</p>
            <ul>
              <li>AES-256 encryption for data at rest;</li>
              <li>TLS 1.2 or higher for all data in transit;</li>
              <li>API key authentication with optional IP allowlisting;</li>
              <li>Role-based access controls and least-privilege principles;</li>
              <li>Regular penetration testing and vulnerability scanning;</li>
              <li>SOC 2 Type II certification (audit reports available under NDA upon request); and</li>
              <li>Incident response procedures with 72-hour breach notification obligations under GDPR.</li>
            </ul>
            <p>
              No method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your data, we cannot guarantee absolute security. Report suspected security issues to <a
                href="mailto:security@dqe.io"
                class="text-blue-600 hover:underline"
              >security@dqe.io</a>.
            </p>
          </div>
        </section>

        <!-- §13 Children -->
        <section
          id="children"
          class="mb-10 scroll-mt-24"
        >
          <h2 class="text-xl font-bold text-slate-900 mb-4">
            13. Children's Privacy
          </h2>
          <div class="prose-legal">
            <p>
              The Service is intended for use by businesses and professionals. We do not knowingly collect personal information from individuals under the age of 16. If you become aware that a child under 16 has provided us with personal data, please contact us at <a
                href="mailto:privacy@dqe.io"
                class="text-blue-600 hover:underline"
              >privacy@dqe.io</a> and we will take steps to delete such information promptly.
            </p>
          </div>
        </section>

        <!-- §14 Changes -->
        <section
          id="changes"
          class="mb-10 scroll-mt-24"
        >
          <h2 class="text-xl font-bold text-slate-900 mb-4">
            14. Changes to This Policy
          </h2>
          <div class="prose-legal">
            <p>We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make material changes, we will:</p>
            <ul>
              <li>post the revised policy on this page with an updated "Effective date";</li>
              <li>send an email notification to the address associated with your Account at least 14 days before the changes take effect; and</li>
              <li>display a prominent in-app notice for the 30 days following the change.</li>
            </ul>
            <p>Your continued use of the Service after the effective date of any amendment constitutes acceptance of the revised Privacy Policy.</p>
          </div>
        </section>

        <!-- §15 Contact & DPA -->
        <section
          id="contact"
          class="mb-10 scroll-mt-24"
        >
          <h2 class="text-xl font-bold text-slate-900 mb-4">
            15. Contact & Data Processing Addendum
          </h2>
          <div class="prose-legal">
            <p>For any privacy-related questions, data subject requests, DPA requests, or to report a concern:</p>
            <div class="bg-slate-50 border border-slate-200 rounded px-5 py-4 text-sm text-slate-700 space-y-1 mt-3">
              <p class="font-semibold text-slate-900">
                DQE USA — Privacy Team
              </p>
              <p>1200 Brickell Ave, Ste 1960</p>
              <p>Miami, FL 33131, United States</p>
              <p>
                Email: <a
                  href="mailto:privacy@dqe.io"
                  class="text-blue-600 hover:underline"
                >privacy@dqe.io</a>
              </p>
              <p>
                Security: <a
                  href="mailto:security@dqe.io"
                  class="text-blue-600 hover:underline"
                >security@dqe.io</a>
              </p>
            </div>
            <p class="mt-4">
              Enterprise customers requiring a signed <strong>Data Processing Addendum (DPA)</strong> including EU Standard Contractual Clauses may request one at <a
                href="mailto:privacy@dqe.io"
                class="text-blue-600 hover:underline"
              >privacy@dqe.io</a>. We execute DPAs within five business days.
            </p>
          </div>
        </section>

        <!-- Footer note -->
        <div class="border-t border-slate-100 pt-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <p class="text-xs text-slate-400 font-mono">
            © {{ new Date().getFullYear() }} DQE USA · Effective {{ EFFECTIVE }}
          </p>
          <a
            href="/legal/terms"
            class="text-sm text-blue-600 hover:underline font-medium"
          >
            Read our Terms of Use →
          </a>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
@reference "tailwindcss";

.prose-legal p {
  @apply text-sm text-slate-600 leading-relaxed mb-4;
}
.prose-legal ul {
  @apply list-disc list-outside pl-5 space-y-2 mb-4;
}
.prose-legal ul li {
  @apply text-sm text-slate-600 leading-relaxed;
}
.prose-legal strong {
  @apply text-slate-800;
}
.prose-legal h3 {
  @apply text-sm font-semibold text-slate-800;
}
</style>
