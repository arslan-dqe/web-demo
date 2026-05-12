<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useHead } from '@unhead/vue'

useHead({ title: 'Terms of Use — DQE', htmlAttrs: { lang: 'en' } })

const EFFECTIVE = 'May 11, 2026'

const sections = [
  { id: 'acceptance',    label: '1. Acceptance of Terms' },
  { id: 'definitions',   label: '2. Definitions' },
  { id: 'license',       label: '3. License Grant' },
  { id: 'permitted',     label: '4. Permitted Use' },
  { id: 'prohibited',    label: '5. Prohibited Use' },
  { id: 'api',           label: '6. API & Rate Limits' },
  { id: 'free-trial',    label: '7. Free Trial' },
  { id: 'payment',       label: '8. Payment & Credits' },
  { id: 'usps',          label: '9. USPS Data Terms' },
  { id: 'ip',            label: '10. Intellectual Property' },
  { id: 'customer-data', label: '11. Customer Data' },
  { id: 'warranties',    label: '12. Warranty Disclaimer' },
  { id: 'liability',     label: '13. Limitation of Liability' },
  { id: 'indemnification', label: '14. Indemnification' },
  { id: 'termination',   label: '15. Termination' },
  { id: 'governing-law', label: '16. Governing Law' },
  { id: 'arbitration',   label: '17. Dispute Resolution' },
  { id: 'modifications', label: '18. Modifications' },
  { id: 'contact',       label: '19. Contact' },
]

const activeSection = ref('acceptance')
const scrollY = ref(0)

function updateActive() {
  for (const s of [...sections].reverse()) {
    const el = document.getElementById(s.id)
    if (el && el.getBoundingClientRect().top <= 132) {
      activeSection.value = s.id
      return
    }
  }
  activeSection.value = 'acceptance'
}

const onScroll = () => { scrollY.value = window.scrollY; updateActive() }
onMounted(() => { window.addEventListener('scroll', onScroll, { passive: true }); updateActive() })
onUnmounted(() => window.removeEventListener('scroll', onScroll))

function jumpTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <div class="bg-white text-slate-900 font-sans antialiased min-h-screen">

    <!-- Nav -->
    <header
      class="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-shadow duration-300"
      :class="scrollY > 10 ? 'shadow-sm' : ''"
    >
      <div class="max-w-7xl mx-auto px-6 h-14 flex items-center gap-6">
        <a href="/web/4" class="flex items-center gap-2 flex-shrink-0">
          <div class="w-7 h-7 bg-blue-600 flex items-center justify-center">
            <UIcon name="i-lucide-shield-check" class="w-3.5 h-3.5 text-white" />
          </div>
          <span class="font-bold text-slate-900 tracking-tight text-sm">DQE</span>
        </a>
        <div class="h-4 w-px bg-slate-200" />
        <span class="text-sm text-slate-400">Terms of Use</span>
        <div class="ml-auto flex items-center gap-4">
          <a href="/legal/privacy" class="text-sm text-slate-500 hover:text-blue-600 transition-colors">Privacy Policy</a>
          <UButton size="xs" label="Get started" @click="$router.push('/web/4')" />
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-6 pt-24 pb-20 flex gap-12">

      <!-- Sidebar TOC -->
      <aside class="hidden lg:block w-60 flex-shrink-0">
        <div class="sticky top-20">
          <p class="font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-4">On this page</p>
          <nav class="flex flex-col gap-0.5">
            <button
              v-for="s in sections"
              :key="s.id"
              class="text-left text-xs px-3 py-1.5 rounded transition-all duration-150 font-medium"
              :class="activeSection === s.id
                ? 'text-blue-600 bg-blue-50'
                : 'text-slate-400 hover:text-slate-700 hover:bg-slate-50'"
              @click="jumpTo(s.id)"
            >{{ s.label }}</button>
          </nav>
          <div class="mt-6 pt-6 border-t border-slate-100">
            <a
              href="/legal/privacy"
              class="flex items-center gap-1.5 text-xs text-slate-400 hover:text-blue-600 transition-colors"
            >
              <UIcon name="i-lucide-arrow-right" class="w-3 h-3" />
              Privacy Policy
            </a>
          </div>
        </div>
      </aside>

      <!-- Main content -->
      <main class="flex-1 min-w-0 max-w-3xl">

        <!-- Header -->
        <div class="mb-12 pb-8 border-b border-slate-100">
          <div class="inline-flex items-center gap-2 bg-blue-50 text-blue-600 font-mono text-[11px] px-3 py-1.5 mb-5">
            <UIcon name="i-lucide-file-text" class="w-3.5 h-3.5" />
            Legal document
          </div>
          <h1 class="text-4xl font-bold text-slate-900 tracking-tight mb-3">Terms of Use</h1>
          <p class="text-slate-500 text-sm">
            Effective date: <strong class="text-slate-700">{{ EFFECTIVE }}</strong> ·
            DQE USA
          </p>
          <p class="mt-4 text-sm text-slate-500 leading-relaxed max-w-2xl">
            These Terms of Use ("Terms") govern your access to and use of the DQE USA platform,
            APIs, and related services (collectively, the "Service") provided by DQE USA
            ("DQE USA", "we", "us", or "our"). Please read them carefully before using the Service.
          </p>
        </div>

        <!-- §1 Acceptance -->
        <section id="acceptance" class="mb-10 scroll-mt-24">
          <h2 class="text-xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
          <div class="prose-legal">
            <p>By creating an account, accessing, or using the Service in any way, you ("Customer", "you") agree to be bound by these Terms and all policies incorporated herein by reference, including the <a href="/legal/privacy" class="text-blue-600 hover:underline">Privacy Policy</a>. If you are entering into these Terms on behalf of a company or other legal entity, you represent that you have the authority to bind such entity to these Terms.</p>
            <p>If you do not agree to these Terms, you may not access or use the Service. Continued use of the Service following notice of any amendment to these Terms constitutes acceptance of those amendments.</p>
          </div>
        </section>

        <!-- §2 Definitions -->
        <section id="definitions" class="mb-10 scroll-mt-24">
          <h2 class="text-xl font-bold text-slate-900 mb-4">2. Definitions</h2>
          <div class="prose-legal">
            <dl class="space-y-3">
              <div class="grid grid-cols-[160px_1fr] gap-4 py-2.5 border-b border-slate-100">
                <dt class="font-semibold text-slate-700 text-sm">"Account"</dt>
                <dd class="text-sm text-slate-600 leading-relaxed">The registered account you create to access the Service.</dd>
              </div>
              <div class="grid grid-cols-[160px_1fr] gap-4 py-2.5 border-b border-slate-100">
                <dt class="font-semibold text-slate-700 text-sm">"API"</dt>
                <dd class="text-sm text-slate-600 leading-relaxed">The DQE application programming interface, endpoints, and associated developer tools.</dd>
              </div>
              <div class="grid grid-cols-[160px_1fr] gap-4 py-2.5 border-b border-slate-100">
                <dt class="font-semibold text-slate-700 text-sm">"Credits"</dt>
                <dd class="text-sm text-slate-600 leading-relaxed">The unit of consumption for the Service. One Credit equals one validation query (address, email, or phone) regardless of channel.</dd>
              </div>
              <div class="grid grid-cols-[160px_1fr] gap-4 py-2.5 border-b border-slate-100">
                <dt class="font-semibold text-slate-700 text-sm">"Customer Data"</dt>
                <dd class="text-sm text-slate-600 leading-relaxed">Any data submitted by you to the Service for the purpose of validation, including addresses, email addresses, and phone numbers.</dd>
              </div>
              <div class="grid grid-cols-[160px_1fr] gap-4 py-2.5 border-b border-slate-100">
                <dt class="font-semibold text-slate-700 text-sm">"Output Data"</dt>
                <dd class="text-sm text-slate-600 leading-relaxed">The results returned by the Service in response to a validation query, including standardized addresses, validation statuses, and appended data fields.</dd>
              </div>
              <div class="grid grid-cols-[160px_1fr] gap-4 py-2.5 border-b border-slate-100">
                <dt class="font-semibold text-slate-700 text-sm">"Free Trial"</dt>
                <dd class="text-sm text-slate-600 leading-relaxed">The no-cost, limited access to the Service comprising 100 Credits granted upon account creation, subject to Section 7.</dd>
              </div>
              <div class="grid grid-cols-[160px_1fr] gap-4 py-2.5 border-b border-slate-100">
                <dt class="font-semibold text-slate-700 text-sm">"Subscription Plan"</dt>
                <dd class="text-sm text-slate-600 leading-relaxed">A paid tier of the Service (currently "Verify" or "Advanced") selected by the Customer.</dd>
              </div>
              <div class="grid grid-cols-[160px_1fr] gap-4 py-2.5">
                <dt class="font-semibold text-slate-700 text-sm">"USPS Data"</dt>
                <dd class="text-sm text-slate-600 leading-relaxed">United States Postal Service address data incorporated into the Service under a USPS license.</dd>
              </div>
            </dl>
          </div>
        </section>

        <!-- §3 License Grant -->
        <section id="license" class="mb-10 scroll-mt-24">
          <h2 class="text-xl font-bold text-slate-900 mb-4">3. License Grant</h2>
          <div class="prose-legal">
            <p>Subject to these Terms and timely payment of all applicable fees, DQE grants you a <strong>non-exclusive, non-transferable, non-sublicensable, revocable license</strong> to access and use the Service solely for your own internal business purposes during the term of your Subscription Plan or Free Trial.</p>
            <p>This license does not include any right to:</p>
            <ul>
              <li>sublicense, resell, or otherwise make the Service available to any third party;</li>
              <li>modify, adapt, translate, or create derivative works of the Service;</li>
              <li>reverse engineer, disassemble, or decompile any component of the Service; or</li>
              <li>remove or alter any proprietary notices embedded in the Service.</li>
            </ul>
            <p>All rights not expressly granted herein are reserved by DQE.</p>
          </div>
        </section>

        <!-- §4 Permitted Use -->
        <section id="permitted" class="mb-10 scroll-mt-24">
          <h2 class="text-xl font-bold text-slate-900 mb-4">4. Permitted Use</h2>
          <div class="prose-legal">
            <p>You may use the Service to:</p>
            <ul>
              <li>validate the accuracy and deliverability of addresses, email addresses, and phone numbers that you already lawfully possess;</li>
              <li>improve the quality of your own internal customer or contact records;</li>
              <li>integrate Output Data into your own internal business applications and workflows; and</li>
              <li>access the API via your API key for automated, programmatic validation calls within your licensed volume.</li>
            </ul>
            <p>All permitted use is limited to your internal business operations. The Service may not be embedded in or used to provide a competing data-validation or data-enrichment product or service to third parties.</p>
          </div>
        </section>

        <!-- §5 Prohibited Use -->
        <section id="prohibited" class="mb-10 scroll-mt-24">
          <h2 class="text-xl font-bold text-slate-900 mb-4">5. Prohibited Use</h2>
          <div class="prose-legal">
            <p>You shall not, directly or indirectly:</p>
            <ul>
              <li><strong>Resell or redistribute.</strong> Sublicense, resell, rent, lease, transfer, or otherwise make the Service or Output Data commercially available to any third party.</li>
              <li><strong>Build mailing or address lists.</strong> Use the Service or Output Data to construct, compile, augment, or enhance any mailing list, address database, or contact file for internal use, sale, or distribution — beyond correction of records you already lawfully hold. This restriction reflects downstream USPS license obligations (see Section 9).</li>
              <li><strong>Scraping and bulk extraction.</strong> Use bots, spiders, crawlers, scrapers, or any automated tool to extract data from the Service beyond your licensed API access.</li>
              <li><strong>Reverse engineering.</strong> Attempt to derive source code, algorithms, trade secrets, or the underlying USPS or third-party datasets embedded in the Service.</li>
              <li><strong>Unsolicited communications.</strong> Use validated contact data to send spam, unsolicited commercial communications, or messages that violate the CAN-SPAM Act, TCPA, or any applicable anti-spam law.</li>
              <li><strong>Unauthorized access.</strong> Circumvent authentication or security controls, probe for vulnerabilities, or attempt to gain unauthorized access to any system or account.</li>
              <li><strong>Interference.</strong> Introduce malicious code, conduct denial-of-service attacks, or otherwise interfere with the integrity, performance, or availability of the Service.</li>
              <li><strong>Unlawful purposes.</strong> Use the Service in connection with any activity that violates applicable federal, state, or local law.</li>
              <li><strong>Competitive intelligence.</strong> Access the Service to benchmark it against a competing product or to design a product intended to compete with DQE.</li>
            </ul>
            <p>Violations of this Section may result in immediate suspension or termination of your Account without notice and without refund of any prepaid fees.</p>
          </div>
        </section>

        <!-- §6 API & Rate Limits -->
        <section id="api" class="mb-10 scroll-mt-24">
          <h2 class="text-xl font-bold text-slate-900 mb-4">6. API Keys & Rate Limits</h2>
          <div class="prose-legal">
            <p><strong>API keys.</strong> You are responsible for maintaining the confidentiality of your API key(s). Do not share, expose, or commit your API key in public repositories. You are liable for all API calls made using your key. Report suspected key compromise to <a href="mailto:security@dqe.io" class="text-blue-600 hover:underline">security@dqe.io</a> immediately.</p>
            <p><strong>Rate limits.</strong> The Service enforces request-rate limits per plan. Exceeding rate limits may trigger temporary throttling or a block lasting up to 24 hours. Persistent abuse may result in permanent suspension. Rate limit enforcement is not a service failure and does not entitle you to a credit or refund.</p>
            <p><strong>SLA exclusions.</strong> Downtime or degraded performance caused by your failure to comply with rate limits, by third-party network issues outside DQE's control, or by scheduled maintenance windows announced with at least 24 hours' notice is excluded from any service-level commitments.</p>
            <p><strong>One credit, all channels.</strong> Each API call to the <code class="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">/validate</code> endpoint consumes one Credit regardless of how many validation channels (address, email, phone) are requested in a single call.</p>
          </div>
        </section>

        <!-- §7 Free Trial -->
        <section id="free-trial" class="mb-10 scroll-mt-24">
          <h2 class="text-xl font-bold text-slate-900 mb-4">7. Free Trial</h2>
          <div class="prose-legal">
            <p>Upon account registration with a verified business email address, DQE grants you 100 Credits ("Free Trial Credits") at no charge, subject to the following conditions:</p>
            <ul>
              <li><strong>One per organization.</strong> Free Trial Credits are limited to one Account per organization. Creating multiple accounts to receive additional Free Trial Credits constitutes abuse and may result in termination of all associated Accounts.</li>
              <li><strong>Business email required.</strong> Accounts registered with personal email domains (e.g., gmail.com, yahoo.com) are not eligible for Free Trial Credits.</li>
              <li><strong>Non-transferable.</strong> Free Trial Credits have no cash value and may not be transferred, sold, or exchanged.</li>
              <li><strong>Expiration.</strong> Free Trial Credits expire 12 months from account creation or upon upgrade to a paid Subscription Plan, whichever occurs first. Unused Free Trial Credits are forfeited upon expiration.</li>
              <li><strong>Full Terms apply.</strong> Your use of the Free Trial is subject to all provisions of these Terms. DQE reserves the right to modify or discontinue the Free Trial at any time without notice.</li>
            </ul>
          </div>
        </section>

        <!-- §8 Payment & Credits -->
        <section id="payment" class="mb-10 scroll-mt-24">
          <h2 class="text-xl font-bold text-slate-900 mb-4">8. Payment & Credits</h2>
          <div class="prose-legal">
            <p><strong>Billing.</strong> Paid Subscription Plans are billed in advance on a monthly or annual basis, depending on the plan selected. All fees are quoted in US dollars and are exclusive of applicable taxes.</p>
            <p><strong>Credit card authorization.</strong> By providing payment information, you authorize DQE to charge your payment method for all fees incurred under your Subscription Plan, including automatic renewals.</p>
            <p><strong>Credit expiration.</strong> Credits included in the Verify Subscription Plan do not expire as long as your subscription remains active. Credits purchased as add-ons or top-ups expire 12 months from the date of purchase.</p>
            <p><strong>No refunds on consumed credits.</strong> Credits that have been consumed by validation queries are non-refundable. Credits that have not been consumed at the time of subscription cancellation are forfeited unless DQE expressly agrees otherwise in writing.</p>
            <p><strong>Price changes.</strong> DQE may modify Subscription Plan pricing with at least 30 days' notice. Continued use of the Service after the effective date of a price change constitutes your acceptance of the new pricing.</p>
            <p><strong>Late payment.</strong> Overdue balances accrue interest at 1.5% per month (or the maximum permitted by law, whichever is less). DQE reserves the right to suspend access to the Service for accounts with overdue balances.</p>
          </div>
        </section>

        <!-- §9 USPS Data Terms -->
        <section id="usps" class="mb-10 scroll-mt-24">
          <h2 class="text-xl font-bold text-slate-900 mb-4">9. USPS Data Terms</h2>
          <div class="prose-legal">
            <div class="bg-amber-50 border border-amber-200 px-4 py-3 rounded text-sm text-amber-800 mb-4 flex gap-2.5">
              <UIcon name="i-lucide-triangle-alert" class="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <span>The address validation component of the Service incorporates data and technology licensed from the United States Postal Service. Downstream use is subject to USPS license restrictions described in this section.</span>
            </div>
            <p>DQE is a USPS CASS-certified provider. The USPS address data embedded in the Service is licensed to DQE for the purpose of enabling address standardization and deliverability verification. As a condition of DQE's USPS license, you agree that:</p>
            <ul>
              <li>Output Data derived from USPS-sourced validation (standardized addresses, ZIP+4, DPV confirmation) may be used only to correct and verify addresses you already lawfully hold — not to compile, augment, or create new address lists.</li>
              <li>You shall not reproduce, redistribute, sublicense, or commercially exploit USPS-sourced Output Data as a standalone dataset.</li>
              <li>You shall display all copyright and proprietary notices required by USPS in any materials that incorporate USPS-sourced Output Data.</li>
              <li>DQE provides address validation via its real-time API and CASS-certified batch processing. CASS certification applies to batch jobs processed by DQE's certified engine; individual real-time API results carry USPS DPV confirmation but are not independently CASS-certified.</li>
            </ul>
          </div>
        </section>

        <!-- §10 Intellectual Property -->
        <section id="ip" class="mb-10 scroll-mt-24">
          <h2 class="text-xl font-bold text-slate-900 mb-4">10. Intellectual Property</h2>
          <div class="prose-legal">
            <p><strong>DQE IP.</strong> DQE and its licensors own all right, title, and interest in and to the Service, including all software, algorithms, APIs, documentation, trademarks, and underlying datasets. Nothing in these Terms transfers any ownership interest to you.</p>
            <p><strong>Customer Data.</strong> You retain all ownership rights in Customer Data. By submitting Customer Data to the Service, you grant DQE a limited, non-exclusive, royalty-free license to process Customer Data solely for the purpose of delivering the Service to you.</p>
            <p><strong>Feedback.</strong> If you provide DQE with suggestions, ideas, or feedback regarding the Service ("Feedback"), you grant DQE a perpetual, irrevocable, royalty-free license to use and incorporate such Feedback into the Service without any obligation to you.</p>
          </div>
        </section>

        <!-- §11 Customer Data -->
        <section id="customer-data" class="mb-10 scroll-mt-24">
          <h2 class="text-xl font-bold text-slate-900 mb-4">11. Customer Data</h2>
          <div class="prose-legal">
            <p><strong>You own your data.</strong> DQE does not claim ownership of Customer Data. You are solely responsible for the legality, accuracy, and quality of Customer Data you submit to the Service.</p>
            <p><strong>Processing.</strong> DQE processes Customer Data only to perform validation and deliver Output Data to you. DQE does not use Customer Data for its own marketing, profiling, or any purpose unrelated to the Service.</p>
            <p><strong>Retention.</strong> Customer Data submitted via the API is retained for up to <strong>30 days</strong> following the completion of processing, after which it is deleted or anonymized. Customer Data submitted via CSV batch upload is retained for up to 30 days to allow you to retrieve your processed results and is then permanently deleted.</p>
            <p><strong>Your compliance obligations.</strong> You represent and warrant that you have obtained all necessary consents and have the legal right to submit Customer Data to the Service under applicable law, including GDPR, CCPA, and the TCPA where applicable.</p>
          </div>
        </section>

        <!-- §12 Warranty Disclaimer -->
        <section id="warranties" class="mb-10 scroll-mt-24">
          <h2 class="text-xl font-bold text-slate-900 mb-4">12. Warranty Disclaimer</h2>
          <div class="prose-legal">
            <div class="bg-slate-50 border border-slate-200 px-4 py-4 rounded text-sm text-slate-700 leading-relaxed">
              THE SERVICE, INCLUDING ALL OUTPUT DATA, IS PROVIDED <strong>"AS IS"</strong> AND <strong>"AS AVAILABLE"</strong> WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, DQE EXPRESSLY DISCLAIMS ALL WARRANTIES, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, AND ANY WARRANTY ARISING FROM COURSE OF DEALING OR USAGE OF TRADE.
            </div>
            <p>DQE does not warrant that: (a) the Service will be error-free, uninterrupted, or secure; (b) Output Data will be complete, accurate, or current at all times; (c) the Service will meet your specific requirements; or (d) any errors or defects in the Service will be corrected. Address validation depends on USPS data, which is updated periodically and may not reflect real-time changes.</p>
          </div>
        </section>

        <!-- §13 Limitation of Liability -->
        <section id="liability" class="mb-10 scroll-mt-24">
          <h2 class="text-xl font-bold text-slate-900 mb-4">13. Limitation of Liability</h2>
          <div class="prose-legal">
            <div class="bg-slate-50 border border-slate-200 px-4 py-4 rounded text-sm text-slate-700 leading-relaxed">
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL DQE, ITS DIRECTORS, EMPLOYEES, LICENSORS, OR SUPPLIERS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, REVENUE, DATA, GOODWILL, OR BUSINESS OPPORTUNITIES, ARISING OUT OF OR RELATED TO THESE TERMS OR THE SERVICE, EVEN IF DQE HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
            </div>
            <p><strong>Aggregate cap.</strong> DQE's total cumulative liability to you arising out of or related to these Terms, regardless of the theory of liability, shall not exceed the greater of: (a) the total fees paid by you to DQE in the <strong>twelve (12) months</strong> immediately preceding the event giving rise to the claim; or (b) <strong>USD $100</strong> if you are on the Free Trial.</p>
            <p>Some jurisdictions do not allow the exclusion of certain warranties or the limitation of liability for consequential or incidental damages. In such jurisdictions, DQE's liability is limited to the maximum extent permitted by law.</p>
          </div>
        </section>

        <!-- §14 Indemnification -->
        <section id="indemnification" class="mb-10 scroll-mt-24">
          <h2 class="text-xl font-bold text-slate-900 mb-4">14. Indemnification</h2>
          <div class="prose-legal">
            <p><strong>By you.</strong> You agree to defend, indemnify, and hold harmless DQE and its officers, directors, employees, and agents from and against any third-party claim, liability, damage, loss, or expense (including reasonable attorneys' fees) arising out of or related to: (a) your use of the Service in violation of these Terms; (b) Customer Data submitted by you; (c) your violation of any applicable law; or (d) your infringement of any third-party intellectual property right.</p>
            <p><strong>By DQE.</strong> DQE agrees to defend you against any third-party claim alleging that the Service, as provided by DQE and used in accordance with these Terms, infringes such third party's intellectual property rights. DQE's obligations under this paragraph do not apply to claims arising from: (i) your modification of the Service; (ii) use of the Service in combination with products or services not provided by DQE; or (iii) your failure to use an updated or corrected version of the Service provided by DQE.</p>
          </div>
        </section>

        <!-- §15 Termination -->
        <section id="termination" class="mb-10 scroll-mt-24">
          <h2 class="text-xl font-bold text-slate-900 mb-4">15. Termination</h2>
          <div class="prose-legal">
            <p><strong>By you.</strong> You may cancel your Subscription Plan at any time through your Account settings. Cancellation takes effect at the end of the current billing period. You will retain access to the Service until that date.</p>
            <p><strong>By DQE — for convenience.</strong> DQE may terminate your Account for any reason with 30 days' notice, provided that DQE will refund any prepaid fees for the period following termination on a pro-rated basis.</p>
            <p><strong>By DQE — for cause.</strong> DQE may immediately suspend or terminate your Account without notice or refund if: (a) you violate any provision of Section 5 (Prohibited Use); (b) you fail to pay amounts due and the failure continues for 10 days after notice; (c) you become insolvent or subject to bankruptcy proceedings; or (d) continuation of the relationship would expose DQE to legal liability.</p>
            <p><strong>Effect of termination.</strong> Upon termination: (i) your license to use the Service immediately ceases; (ii) unused Credits are forfeited with no refund; (iii) DQE will delete Customer Data within 30 days; and (iv) Sections 5, 9, 10, 12, 13, 14, 16, and 17 survive termination.</p>
            <p><strong>Inactive accounts.</strong> Accounts that have been inactive for more than 24 consecutive months may be terminated without notice. Any remaining Credits in such accounts are forfeited.</p>
          </div>
        </section>

        <!-- §16 Governing Law -->
        <section id="governing-law" class="mb-10 scroll-mt-24">
          <h2 class="text-xl font-bold text-slate-900 mb-4">16. Governing Law</h2>
          <div class="prose-legal">
            <p>These Terms are governed by and construed in accordance with the laws of the <strong>State of Delaware</strong>, without regard to its conflict-of-laws provisions. To the extent that any dispute is not subject to the arbitration clause in Section 17, you and DQE submit to the exclusive jurisdiction of the state and federal courts located in <strong>Wilmington, Delaware</strong>.</p>
          </div>
        </section>

        <!-- §17 Dispute Resolution -->
        <section id="arbitration" class="mb-10 scroll-mt-24">
          <h2 class="text-xl font-bold text-slate-900 mb-4">17. Dispute Resolution & Arbitration</h2>
          <div class="prose-legal">
            <p><strong>Informal resolution.</strong> Before initiating arbitration or litigation, you agree to contact DQE at <a href="mailto:legal@dqe.io" class="text-blue-600 hover:underline">legal@dqe.io</a> and attempt to resolve any dispute informally. DQE will similarly contact you using your Account email. If the dispute is not resolved within 30 days of initial notice, either party may proceed to arbitration.</p>
            <p><strong>Binding arbitration.</strong> Except for claims for injunctive or other equitable relief, any dispute arising out of or related to these Terms shall be resolved by binding arbitration administered by the <strong>American Arbitration Association (AAA)</strong> under its Commercial Arbitration Rules. Arbitration shall be conducted in <strong>Wilmington, Delaware</strong>, or via videoconference at the election of either party. The arbitrator's decision shall be final and binding and may be entered as a judgment in any court of competent jurisdiction.</p>
            <p><strong>Class action waiver.</strong> YOU AND DQE AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE ACTION. The arbitrator may not consolidate more than one person's claims and may not otherwise preside over any class or representative proceeding.</p>
            <p><strong>Opt-out.</strong> You may opt out of the binding arbitration and class-action waiver provisions by sending written notice to <a href="mailto:legal@dqe.io" class="text-blue-600 hover:underline">legal@dqe.io</a> within <strong>30 days</strong> of first creating your Account. Your opt-out notice must include your name, Account email, and a clear statement that you wish to opt out of arbitration.</p>
          </div>
        </section>

        <!-- §18 Modifications -->
        <section id="modifications" class="mb-10 scroll-mt-24">
          <h2 class="text-xl font-bold text-slate-900 mb-4">18. Modifications to These Terms</h2>
          <div class="prose-legal">
            <p>DQE reserves the right to modify these Terms at any time. Material changes will be communicated to you via email to your Account address and/or a prominent notice within the Service at least <strong>14 days</strong> before the changes take effect. Non-material changes (e.g., clarifications, typographic corrections) take effect immediately upon posting.</p>
            <p>Your continued use of the Service after the effective date of any amendment constitutes acceptance of the revised Terms. If you do not agree to the amended Terms, you must cancel your Account before the effective date.</p>
          </div>
        </section>

        <!-- §19 Contact -->
        <section id="contact" class="mb-10 scroll-mt-24">
          <h2 class="text-xl font-bold text-slate-900 mb-4">19. Contact</h2>
          <div class="prose-legal">
            <p>Questions about these Terms? Contact us at:</p>
            <div class="bg-slate-50 border border-slate-200 rounded px-5 py-4 text-sm text-slate-700 space-y-1 mt-3">
              <p class="font-semibold text-slate-900">DQE USA</p>
              <p>Legal Department</p>
              <p>1200 Brickell Ave, Ste 1960</p>
              <p>Miami, FL 33131, United States</p>
              <p><a href="mailto:legal@dqe.io" class="text-blue-600 hover:underline">legal@dqe.io</a></p>
            </div>
          </div>
        </section>

        <!-- Footer note -->
        <div class="border-t border-slate-100 pt-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <p class="text-xs text-slate-400 font-mono">
            © {{ new Date().getFullYear() }} DQE USA · Effective {{ EFFECTIVE }}
          </p>
          <a href="/legal/privacy" class="text-sm text-blue-600 hover:underline font-medium">
            Read our Privacy Policy →
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
</style>
