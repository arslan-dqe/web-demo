# GEO Analysis — DQE Validate

**Analysis date:** 2026-05-12
**Site:** http://localhost:5173 (production target: https://dqe.io)
**Stack:** Vue 3 + Vite SPA (client-side rendered — no SSR)
**Primary pages analyzed:** /web/6 (main landing), /web/4 (alternate landing), /legal/terms, /legal/privacy

---

## 1. GEO Readiness Score — Overall: 28 / 100

| Dimension | Weight | Raw Score | Weighted |
|---|---|---|---|
| Citability | 25% | 18/100 | 4.5 |
| Structural Readability | 20% | 25/100 | 5.0 |
| Multi-Modal Content | 15% | 45/100 | 6.75 |
| Authority & Brand Signals | 20% | 30/100 | 6.0 |
| Technical Accessibility | 20% | 28/100 | 5.6 |
| **Total** | 100% | — | **27.85 ≈ 28** |

**Verdict:** Critical GEO deficiency. The site has strong product content and solid authority signals in its source files, but all of it is invisible to AI crawlers because it is locked inside a CSR SPA that renders a near-empty HTML shell. Every other dimension is penalized downstream by this architectural fact.

---

## 2. AI Crawler Access Status

### robots.txt
**Status: MISSING** — No `/robots.txt` file exists in `/public/`. Without a robots.txt:
- AI crawlers follow the most permissive assumption (crawl allowed), which is beneficial in theory.
- However, crawlers like GPTBot explicitly look for robots.txt to confirm allowance. Absence signals an unclaimed, unoptimized property.
- No explicit Crawl-delay or Sitemap pointer is declared.

| Crawler | Purpose | Current Status |
|---|---|---|
| GPTBot | ChatGPT training + citations | Implicitly allowed (no robots.txt) |
| OAI-SearchBot | ChatGPT search grounding | Implicitly allowed |
| ClaudeBot | Claude training | Implicitly allowed |
| PerplexityBot | Perplexity AI citations | Implicitly allowed |
| CCBot | Common Crawl (training data) | Implicitly allowed |
| anthropic-ai | Anthropic direct scraper | Implicitly allowed |
| cohere-ai | Cohere training | Implicitly allowed |

**Recommended action:** Create `/public/robots.txt` to explicitly allow high-value crawlers and optionally block training-only crawlers (CCBot, cohere-ai) while keeping AI search/citation crawlers open. See Section 10.

---

## 3. llms.txt Status

**Status: MISSING**

No `/llms.txt` file exists in `/public/`. This is a significant missed opportunity. llms.txt is the emerging standard for telling AI systems which content is authoritative, what the product does, and how to represent the brand in LLM responses.

### RSL 1.0 Licensing
No RSL 1.0 (Robot-readable Software License) declaration exists anywhere in the codebase or public directory. Content usage terms for AI systems are undefined.

**Impact:** AI systems that follow llms.txt have no curated "ground truth" about DQE. They must infer the brand's positioning from whatever fragments they can crawl, which — given the CSR architecture — is almost nothing.

---

## 4. Sitemap Status

**Status: MISSING**

No `sitemap.xml` exists in `/public/`. This means:
- AI search crawlers (OAI-SearchBot, PerplexityBot) cannot discover the canonical URL structure.
- Pages at `/web/4`, `/web/6`, `/legal/terms`, and `/legal/privacy` have no declared priority signals.
- The canonical URL (`https://dqe.io`) set in page 4's `useSeoMeta()` is never pointed to from a sitemap.

---

## 5. Technical Accessibility for AI Crawlers

**Score: 28/100 — Critical**

This is the most severe finding. The entire site is a Vue 3 SPA with no Server-Side Rendering (SSR) and no Static Site Generation (SSG).

### What crawlers receive from the HTML shell (`index.html`)

The HTML document delivered to any non-JS-executing crawler (including GPTBot, ClaudeBot, OAI-SearchBot, and most AI indexers) contains:
- A `<title>`: "DQE Validate — Address, Email & Phone Validation"
- A `<meta name="description">` with one sentence of product copy
- Standard OG tags (title, description, type)
- A Twitter card declaration
- A single `<div id="app"></div>` — empty body

All product copy, headings, statistics, testimonials, feature lists, pricing tables, comparison tables, and FAQ content exist exclusively inside Vue component JavaScript. They are never present in the initial HTML response.

### Consequence
AI crawlers that do not execute JavaScript — which includes the majority of LLM training crawlers and many AI search grounding systems — see the site as a single-sentence product stub. All of the substantive, citable content in DqeHero, DqeProblem, DqeProduct, DqePricing, DqeTestimonials, and DqeVsSmarty is invisible.

### Partial mitigation: page 4 schema markup
`src/pages/web/4.vue` injects a `SoftwareApplication` schema via `useHead()`:
```json
{
  "@type": "SoftwareApplication",
  "name": "DQE Validate",
  "applicationCategory": "BusinessApplication",
  "offers": { "price": "0" },
  "aggregateRating": { "ratingValue": "4.9", "reviewCount": "340" }
}
```
This schema is injected client-side after JS execution. Crawlers that do execute JavaScript will find it, but the schema alone without surrounding semantic HTML content provides limited grounding.

---

## 6. Citability Analysis

**Score: 18/100 — Poor**

Citability measures how well the content is structured for AI systems to extract, quote, and attribute a discrete, self-contained passage.

### Optimal passage length (134–167 words)
The content in the Vue components contains several passages of the right length for citation, but they are fragmented across reactive component state objects (JavaScript arrays and records), not prose blocks in the HTML. For example:

- `DqeProblem.vue` contains the statistic "$3.1 trillion per year to poor data quality" with attribution to "IBM / Gartner" — this is precisely the kind of sourced, specific statistic AI systems cite. However, it is rendered only after JS hydration.
- `DqeProduct.vue` address tab description (~45 words) and email tab description (~42 words) are each too short for optimal citation.
- `DqeTestimonials.vue` quotes run 30–55 words each — below the 134-word floor for reliable AI citation.

### Direct answers in first 40–60 words
The hero copy across both page 4 and page 6 ("Validate Addresses, Emails & Phones in one platform. Replace 3 vendors with one self-serve API. Set up in 5 minutes, pay by credit card. No SFTP. No sales cycle.") is a strong direct answer — but it is JavaScript-rendered.

### Question-based headings
All H2/H3 headings use declarative or imperative forms:
- "Three validations. One platform. One price."
- "Bad data is a P&L problem."
- "Start free. Scale when ready."
- "Three steps. Under five minutes."

None are phrased as questions. Question-based headings ("What is DQE?", "How does address validation work?", "How much does phone validation cost?") directly match the query form that AI systems answer and would substantially improve citability.

### Statistics with source attribution
The site contains well-sourced statistics:
- $849.9B US e-commerce returns (NRF 2026)
- $1.47 average base cost per failed delivery (Last Mile Consortium)
- 19.3% US online order return rate (US Census)
- $3.1T annual US poor data quality loss (IBM / Gartner)

Attribution is present in the source files but only in small-type labels, not in the surrounding prose. AI systems need the attribution embedded in the passage itself to properly cite the claim.

### Self-contained answer blocks
No dedicated FAQ page exists. The pricing section in `DqePricing.vue` has three FAQ items (are credits mixed, do they expire, when does sales get involved) that are close to self-contained but are JS-rendered and only ~30 words each.

---

## 7. Structural Readability

**Score: 25/100 — Poor**

### Heading hierarchy
Page 6 (`/web/6`) has a single H1 followed by multiple H2 sections — correct hierarchy. Page 4 (`/web/4`) follows the same pattern. However:
- All headings are rendered client-side.
- None of the H2/H3 headings are phrased as questions.
- The comparison section heading "Smarty is fast. But it only does addresses." is a strong differentiator statement but would not match a "DQE vs Smarty" question query in AI search.

### Navigation and semantic structure
Both pages use `<section>`, `<header>`, `<footer>`, and `<nav>` elements, which is good semantic HTML — but again, all rendered via Vue, not in the static HTML shell.

### Content density
The pages are content-rich with well-organized sections covering: problem framing, product features, competitive comparison, how it works, testimonials, and pricing. The issue is exclusively delivery mechanism, not content quality.

---

## 8. Multi-Modal Content

**Score: 45/100 — Below Average**

### What exists
- **Interactive live validator widget** in both hero sections (DqeHero and page 6): demonstrates address, email, and phone validation with mock results. High engagement value but zero AI citability.
- **Comparison table** (DqeVsSmarty): structured data in a proper `<table>` element within the Vue component — becomes crawlable if JS executes.
- **Code snippets**: API endpoint examples (`POST https://api.dqe.io/v1/validate`) appear in multiple sections. These are strong developer-targeted signals.
- **Animated stat counters**: $849.9B, $1.47, $3.1T — rendered as animated JavaScript counters. The final values are real and attributable but reach the DOM only after animation completes.
- **Before/After examples** in DqeProblem: concrete input/output pairs for addresses, emails, and CRM records — excellent citability potential if delivered as static HTML.

### What is missing
- No images with meaningful `alt` text (the only image is `logo.svg`).
- No video content (YouTube would have the highest brand-mention correlation at ~0.737).
- No infographics or data visualizations served as static image assets.
- No downloadable resources (whitepapers, ROI guides) that AI systems could reference.

---

## 9. Authority & Brand Signals

**Score: 30/100 — Below Average**

### Internal signals (present in source)
- USPS CASS Certification — named explicitly throughout. Strong authority signal when crawlable.
- SOC 2 Type II — present in hero badge, footer, and trust bar.
- GDPR, TCPA, CCPA compliance signals — present but not linked to certification documents.
- "G2 rating: 4.9 / 5 based on 340+ verified reviews" — declared in `DqeTestimonials.vue`. Not linked to an actual G2 profile URL.
- AggregateRating schema in page 4: `ratingValue: "4.9", reviewCount: "340"` — correctly implemented but JS-rendered.
- Named contact: "Rafael Herrera, Director of Alliance Sales, NA" — a real named entity signal.

### External signals (absent or unverified)
- **Wikipedia:** No evidence of a DQE Wikipedia entity. This is a high-correlation signal for AI citation.
- **Reddit:** No Reddit presence detected in source code or linked content.
- **YouTube:** Social links in `DqeFooter.vue` point to `href: '#'` — placeholder links. No real YouTube channel. YouTube brand mentions correlate at ~0.737 with AI citation frequency.
- **LinkedIn:** Footer link present but points to `#`.
- **GitHub:** Footer link present but points to `#`. A public GitHub repository with API examples would create high developer citation value.
- **Press / media mentions:** A `/press` page is linked in the footer but does not exist as a route.
- **Blog:** `/blog` linked in footer but no blog content exists.
- **Authorship:** No named authors on any content. All articles, documentation, and landing copy is authorless.

### Domain authority
No backlink data is available for the local site, but the production URL (`dqe.io`) appears to be a new domain with minimal third-party coverage. Domain Rating (DR) has only ~0.266 correlation with AI citation frequency — building Wikipedia, Reddit, YouTube, and press mentions is significantly higher priority than link building.

---

## 10. Platform-Specific Scores

| Platform | Score | Primary Barrier |
|---|---|---|
| Google AI Overviews | 15/100 | CSR content invisible; no static HTML to index; no FAQ schema |
| ChatGPT (GPT-4o search) | 12/100 | No llms.txt; GPTBot likely crawls near-empty shell; no static content |
| Perplexity AI | 18/100 | PerplexityBot may execute JS but no structured answer blocks; no sitemap |
| Bing Copilot | 20/100 | Better JS execution capability; schema present in page 4; but no static prose |
| Claude (Anthropic) | 10/100 | ClaudeBot gets empty shell; no llms.txt guidance; no RSL declaration |

Note: Only 11% of domains are cited by both ChatGPT and Google AI Overviews. At current state, DQE would not qualify for either list.

---

## 11. Top 5 Highest-Impact Changes

### Priority 1 — Add SSR or SSG (Impact: Foundational / Effort: High)
**Current state:** Pure CSR SPA. AI crawlers receive an empty `<div id="app"></div>`.
**Required change:** Migrate the main landing pages to Nuxt 3 (SSR), Vite SSG via `vite-ssg`, or add a pre-rendering step (e.g., `vite-plugin-ssr`, `@vitejs/plugin-legacy` + Puppeteer prerender) so that the hero copy, product descriptions, statistics, comparison table, and testimonials appear in the initial HTML response.
**Minimum viable version:** Pre-render `/web/4`, `/web/6`, and a new `/` root page as static HTML using `vite-ssg`. The existing Vue component structure is already composable and will adapt with minimal refactoring.
**GEO impact:** Unlocks all other dimensions. Without this, the ceiling for every AI platform is single-digit citation probability.
**Effort:** 3–5 engineering days.

### Priority 2 — Create /llms.txt with product summary and canonical content map (Impact: High / Effort: Low)
**Current state:** No llms.txt.
**Required change:** Add `/home/dbarthelemy/us-website/web-demo/public/llms.txt` with:
- A 150–200 word plain-prose product summary that an LLM can quote directly.
- Canonical URLs for each major page section.
- Key statistics with their source attributions in plain text.
- A declaration of permitted AI use (RSL 1.0 or equivalent statement).

**Example structure:**
```
# DQE — All-in-One US Address, Email & Phone Validation

DQE is a USPS CASS-certified data validation platform that validates US postal addresses, email addresses, and phone numbers in a single API call. The platform is designed for retail, logistics, hospitality, and developer teams that need reliable contact data without a procurement cycle or SFTP workflow. Setup takes five minutes; a free tier provides 100 validations across all three channels with no credit card required.

Key facts:
- USPS CASS certified (via Melissa OEM partnership for batch; DQE real-time engine for API)
- SOC 2 Type II certified
- API response time: <150ms at p95
- Pricing: free (100 records), $19 per 1,000 credits (pay-as-you-go), $399/month (Advanced)
- Sources: NRF 2026 ($849.9B e-commerce returns), IBM/Gartner ($3.1T annual US data quality loss)

## Pages
- https://dqe.io/ : Main product overview
- https://dqe.io/product/address : Address validation details
- https://dqe.io/product/email : Email validation details
- https://dqe.io/product/phone : Phone validation details
- https://dqe.io/legal/terms : Terms of Use
- https://dqe.io/legal/privacy : Privacy Policy
```
**GEO impact:** Provides AI systems with a reliable ground truth for brand representation independent of crawl quality.
**Effort:** 2–4 hours.

### Priority 3 — Create robots.txt and sitemap.xml (Impact: High / Effort: Low)
**Current state:** Neither file exists.
**Required change:**

`/public/robots.txt`:
```
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: CCBot
Disallow: /

User-agent: cohere-ai
Disallow: /

Sitemap: https://dqe.io/sitemap.xml
```

`/public/sitemap.xml`: List all canonical URLs with `<lastmod>` and `<priority>` attributes covering the root, product pages, solution pages, legal pages, and blog (when live).

**GEO impact:** Enables all AI search crawlers to discover content reliably; signals which crawlers are welcome for citations vs. blocked for training.
**Effort:** 1–2 hours.

### Priority 4 — Rewrite H2/H3 headings as questions and add a dedicated FAQ page (Impact: Medium-High / Effort: Low-Medium)
**Current state:** All headings are declarative ("Three validations. One platform.") or imperative ("Start free. Scale when ready."). No FAQ page exists.
**Required change:**
- Add question-based H2/H3 variants to key sections. Examples:
  - "What is DQE?" (hero or product intro)
  - "How does USPS CASS address validation work?"
  - "How does DQE compare to Smarty?"
  - "How much does address, email, and phone validation cost?"
  - "Can I validate addresses, emails, and phones in one API call?"
  - "What is the DQE free tier?"
- Create a `/faq` page with 15–25 question-answer pairs, each answer in the 134–167 word optimal citation range, with source attribution embedded in the prose (not just a footer label).
- Add `FAQPage` JSON-LD schema to the FAQ page.
**GEO impact:** Directly maps to AI search query patterns. FAQ content is the highest-cited content type across ChatGPT, Perplexity, and Google AIO.
**Effort:** 4–8 hours (content writing + implementation).

### Priority 5 — Build external entity presence (Impact: High / Effort: High)
**Current state:** Social links in footer all point to `#` (placeholders). No Wikipedia entity. No real YouTube, Reddit, or GitHub presence. G2 rating is declared but not linked.
**Required change (prioritized by correlation strength):**
1. **YouTube** (~0.737 correlation): Publish 2–4 product demo videos on a real YouTube channel. Even short "How DQE validates an address in 5 minutes" screencasts create the strongest AI citation signal of any content type.
2. **Reddit** (High correlation): Participate genuinely in r/devops, r/webdev, r/dataengineering, and r/ecommerce. Answer questions about data quality, address validation APIs, and USPS certification. Link to DQE where relevant and helpful.
3. **G2 profile** (High correlation): Link the declared "4.9 / 5, 340+ reviews" claim to a real, live G2 profile URL. G2 pages are crawled by AI systems and serve as third-party validation.
4. **GitHub** (Developer signals): Publish API client libraries or example repositories. A real GitHub org page creates crawlable, attributable developer content and is referenced in DqeVsSmarty ("LLM integration guides" feature).
5. **Wikipedia** (High correlation): If DQE reaches sufficient notability, a Wikipedia page or mention in the "address validation software" category article would be the highest-authority citation signal available.
**Effort:** Ongoing. YouTube and Reddit can begin immediately with 4–8 hours of initial investment per channel.

---

## 12. Structural JSON-LD Recommendations

Page 4 already has `SoftwareApplication` schema. Add these additional schema types as static HTML (not JS-injected) once SSR/SSG is implemented:

```json
// On /faq page
{ "@type": "FAQPage", "mainEntity": [...] }

// On /legal/terms and /legal/privacy
{ "@type": "WebPage", "name": "...", "dateModified": "2026-05-11" }

// On /product/address, /product/email, /product/phone
{ "@type": "Product", "name": "...", "offers": {...} }

// On company pages
{ "@type": "Organization", "name": "DQE Software Inc.", "url": "https://dqe.io", "sameAs": [...] }
```

---

## 13. Content Passage Gap Analysis

The following content blocks exist in the source files and have high citability potential but must be delivered as static HTML to be usable:

| Content | Source File | Word Count | Citability Gap |
|---|---|---|---|
| Problem section intro paragraph | DqeProblem.vue line 139–144 | ~45 words | Too short; expand to 134+ words with source citation embedded in prose |
| Address validation description | DqeProduct.vue line 33 | ~42 words | Too short; expand |
| Email validation description | DqeProduct.vue line 65 | ~44 words | Too short; expand |
| Phone validation description | DqeProduct.vue line 99 | ~42 words | Too short; expand |
| "Switching from Smarty" callout | web/6.vue line 1035 | ~18 words | Convert to a full 150-word migration guide passage |
| Stats with sources | DqeProblem.vue / web/6.vue | Fragmented | Combine into a single attributed passage block |
| Pricing FAQ items | DqePricing.vue line 536 | ~25–35 words each | Expand to 134+ words with context |
| Testimonial quotes | DqeTestimonials.vue | 30–55 words each | Add context sentences; co-cite with company vertical |

---

## 14. Summary Scorecard

```
GEO Readiness: 28/100

Critical blockers (must fix first):
  [x] No robots.txt
  [x] No llms.txt
  [x] No sitemap.xml
  [x] Full CSR — content invisible to most AI crawlers
  [x] No SSR/SSG

Content quality (strong, blocked by delivery):
  [+] Accurate, sourced statistics with named sources
  [+] Clear competitive positioning vs. Smarty/Melissa/Loqate
  [+] Concrete pricing with credit pack structure
  [+] Structured product feature lists per validation type
  [+] Real testimonials with quantified outcomes
  [+] SoftwareApplication schema on page 4

Missing for AI search visibility:
  [ ] Question-based headings
  [ ] 134-167 word self-contained answer blocks
  [ ] FAQ page with FAQPage schema
  [ ] Embedded source attribution in prose
  [ ] Wikipedia entity
  [ ] Live YouTube channel
  [ ] Real Reddit presence
  [ ] Live G2 profile URL
  [ ] Named author attribution
  [ ] External press/media links
```

