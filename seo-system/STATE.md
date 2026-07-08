# SEO / AEO / GEO — STATE

**Read this before starting any SEO work. Update it before finishing.**
Cross-session source of truth for the buildspacelabs.com visibility system. Details in `README.md`; running report in `REPORT.md`.

- **Site:** buildspacelabs.com — Next.js 15 App Router (`app/` is top-level), React 19, TS strict, SCSS modules, framer-motion. Deploy: `vercel.json` + `wrangler.toml` both present (confirm live target).
- **SITE_URL:** `https://buildspacelabs.com` · **Parent org:** Vruoom · **Team:** Aryan (Director), Priyanshu (CTO).
- **Verdict:** SEO infra is genuinely **mature** — this is an *enhance* pass, not a rebuild. Full JSON-LD module, sitemap, robots, manifest, per-route metadata, next/image + alt, single h1 per page, SSR of critical text all already correct.

## Phase tracker
| # | Phase | Status |
|---|-------|--------|
| 1 | Audit (read-only) | ✅ done 2026-07-07 — 6 specialists, findings below |
| 2 | Technical SEO fixes | ✅ shipped 2026-07-07 — see "Phase 2 shipped" below |
| 3 | Schema + AEO | ✅ shipped 2026-07-07 — see "Phase 3 shipped" below |
| 4 | GEO (llms.txt, AI-crawler robots, entity consistency) | ✅ shipped 2026-07-08 — see "Phase 4 shipped" below |
| 5 | Content (case studies, copy, bios, industry pages) | 🔶 partial — O2 `/solutions` pages + O6 carousel accuracy shipped 2026-07-08; case studies/About/bios still blocked on real data (§NEEDS-DECISION G/F) |
| 6 | Reporting (REPORT.md + re-check list) | 🔶 partial — `REPORT.md` + `.env.example` analytics/GSC placeholders shipped 2026-07-08; runtime analytics/GSC tag wiring blocked on tool choice + token |

## Decisions locked (2026-07-08, this session)
- **[I] Canonical inbound email = `buildspacelabs@vruoom.com`** (role-based). ✅ shipped: schema, contact metadata, and all generic CTAs (Footer email, Contact primary channel + error fallback, FAQ buttons). Named-founder links (Footer team, Contact "who you'll work with") intentionally keep aryan@/priyanshu@.
- **[E] Travel = REAL** → carousel "Travel & Hospitality" card now links the live Atelier site (`atelier-travel-studio.buildspacelabs.com`). **Government + defence = REMOVED** (per user): dropped VAJRA/KAVACH from AI Lab + its metadata, removed "government" from Home OG + Portfolio desc, deleted orphaned defence media. (Open Vision PPE kept — it's industrial PPE/safety, not defence.)
- **[J] Analytics** — GA4 is free (dormant placeholder staged); Cloudflare Web Analytics is the free no-code alt (site has `wrangler.toml`). Left GA4 placeholder as default; runtime tag still needs the ID.
- **[O2] `/solutions`** ✅ built (see Phase 5 update) — was a no-input content build from existing product data; user approved.

## Decisions locked (2026-07-07)
- **[B]** Canonical positioning = *"India's AI-native product studio & engineering lab for enterprises worldwide."* **Drop "first."** ✅ shipped in Phase 4.
- **[D]** **Keep** `/offer` ₹ figures + `offerServiceSchema` Offers. (Still remove fake `price:'0'` from the 20 portfolio products — S1.)
- **[C]** **Allow** AI training crawlers (explicit, intentional). ✅ shipped in robots.ts.
- **[A]** **Build real** `/privacy` + `/terms`. ✅ shipped (grounded copy, India law, contact buildspacelabs@vruoom.com; entity name/address + lawyer review still to confirm).

## Phase 2 shipped (2026-07-07)
- **T1 ✅** `app/not-found.tsx` → renders real `NotFoundView` (`src/views/NotFound/*`); unknown URLs now return **HTTP 404** (verified), not 307→home.
- **T3 ✅** `app/robots.ts` rewritten: removed `/_next/`, `/404`, `/500`; explicit intentional AI-crawler groups (training + retrieval both allowed). Verified via `/robots.txt`.
- **T4 ✅** `priority` added to Portfolio + Services hero images.
- **T9 (partial) ✅** Home "21 Products" → **20** with sync comment. (sitemap `lastModified` freshness improvement still open — low.)
- **[A] ✅** `/privacy` + `/terms` routes + views + breadcrumb schema + sitemap entries (priority 0.3). Footer links now resolve 200.
- Verified: clean `next build` (35/35), 404 status, robots.txt, sitemap.xml, on-brand screenshots.

## Phase 3 shipped (2026-07-07) — Schema + AEO
- **S1 ✅** Removed `offers { price:'0' }` from `productSchema`; `applicationCategory` → `BusinessApplication`. Verified: no `price:0`/`offers` in any product HTML.
- **S2 ✅** Removed the invalid `SearchAction` from `websiteSchema`. Verified: no `SearchAction` anywhere.
- **S5 ✅** Added `@id` to Organization (`/#organization`) + WebSite (`/#website`); product `creator/author` and website `publisher` now reference the org `@id` (one consolidated entity). Verified.
- **S6 ✅** `/our-services` now emits `Service` entities (provider → org `@id`) instead of a generic ItemList. Verified.
- **S7 ✅** NDA `audience` guard generalized (regex on `NDA`) — no more one-off exact-string match; no `(NDA)`-named audiences.
- **A1 ✅** FAQ `Accordion` reworked: answer is **always in the server HTML** (verified), collapsed via CSS grid-rows (measured: closed 0px → open 138px). Dropped framer-motion from the component (/faq bundle −1.5 kB).
- **A2 ✅** New answer-first FAQ: "What is an AI-native product studio?" (General now 6).
- **A3 ✅** Home intro definition reworded to a crisp "BuildspaceLabs is an AI-native product studio and engineering lab…" entity sentence.
- **A4 ✅** "How good are your AI agents?" now leads with the factual capability (dropped the "best in the market" boast).
- **A5 ✅** Services hero gains an extractable offering summary line.
- **A8 ✅** FAQ de-staled: "GPT-4" → model-agnostic; industry list → the demonstrable verticals; "transparent pricing" → "clear, fixed scopes agreed before we start".
- **A10 ✅** Pricing FAQ reordered to lead with the direct (no-figure) answer.
- Verified: clean `next build` (35/35); schema + FAQ-SSR checks pass; accordion + Services hero screenshots.

**Deferred with reason:**
- **A7 (question-style product H2s) → needs your call.** Those headings sit in a narrow sticky-label column; full-question H2s would wrap and break the editorial rhythm. Flagged per the "AEO-vs-design clash → ask" rule.
- **A6 (vertical PAA Q&A) + O6 (Home carousel recategorization: Sales Call Coach mis-filed, "embedded firmware" claim, dead links) → Phase 5**, where product-data mapping + real outcomes are in hand (avoids miscategorizing).
- **A9 ("India's first") + footer tagline + all entity-description wording → Phase 4** (done as one cohesive entity-consistency sweep using the locked canonical line).

## Phase 4 shipped (2026-07-08) — GEO + entity consistency
- **G1 ✅** Added `public/llms.txt` with the canonical entity sentence, parent org context, core pages, services, all 20 product URLs, and contact page. Built only from existing site/product/FAQ facts.
- **A9 ✅** Removed the unsupported "first" superlative from home metadata, root metadata, manifest, OG/Twitter generated image alt/text, Organization JSON-LD, Home hero copy, and Footer tagline.
- **Entity consistency ✅** Canonical line is now used across schema, metadata, Home copy, Footer, and `llms.txt`: "India's AI-native product studio and engineering lab for enterprises worldwide."
- Not added: `sameAs`, founder `Person` schema, substantiated founder bios, or canonical inbound email. Those still require real URLs/details from the user.

## Phase 5 (partial) shipped (2026-07-08) — carousel accuracy
- **O6 ✅** Home "Industries" carousel corrected against real `products.ts` data, no fabrication:
  - Removed **Sales Call Coach** from the **Legal Tech** card (it's Sales AI, not legal) → Brief Forge + "See the work".
  - Retitled **Hardware & IoT → "Manufacturing & Vision"** (tag "Industrial AI"); dropped the unsupported "on-device ML / embedded firmware / ship on real hardware" claim (none of the linked products are embedded/firmware). Now: Open Vision PPE (on-prem vision) + Factory OS (production planning) + "See the work"; removed Charge Pulse (consumer EV app, already under Logistics). **⚠ If the team actually does embedded/hardware work elsewhere, tell me and I'll restore/expand the card.**
  - Fixed phantom/miscategorized links: Logistics "Supply Chain Ops" → "See the work"; Real Estate "Marketplace Ops"→food-ordering-platform (an events-ops product, not real estate) → "See the work". Fintech "Events Payments"→food-ordering-platform kept (payments/settlements is defensible; only defensible appearance retained).
  - "21"→20 count already fixed in Phase 2 (T9); verified no residual "21" in Home.
- **O2 ✅ (2026-07-08)** Built `/solutions` hub + `/solutions/[vertical]` (7 SSG pages: logistics, real-estate, healthcare, manufacturing, fintech, saas-support, legal-tech). Content drafted entirely from `products.ts` — real capabilities + the actual products per vertical, no invented stats. New files: `src/data/solutions.ts`, `src/views/Solutions/*`, `app/solutions/*`. Each page emits Breadcrumb + Service + ItemList JSON-LD, canonical, per-page metadata; added to sitemap; Header nav + Footer link. Build 43/43; SSR + schema + screenshots verified.
- **Decision-driven edits ✅ (2026-07-08):** email canonicalized [I]; Travel card → live Atelier site + government/defence removed [E]. See "Decisions locked (2026-07-08)".
- **A6 ✅ + /solutions differentiation (2026-07-09):** each vertical page now carries a "problems we solve" block + a per-industry FAQ (SSR + FAQPage schema); the Home carousel titles link into `/solutions/[vertical]` (teaser → destination). Answered the "isn't /solutions redundant?" concern by making the pages carry content the carousel/portfolio lack.
- **Still Phase 5 (blocked on real data):** case-study copy + Outcomes/engagement for the 7 thin products [G], About page + `Person` schema/bios [F]; A7 product H2s (needs your call) remains optional.

## Phase 6 (partial) shipped (2026-07-08) — reporting
- **M3 ✅** `seo-system/REPORT.md` created: infra inventory, canonical entity facts (single source of truth), monitoring status, owner-only inputs, off-repo action list, and a monthly re-check checklist (excludes live rankings/indexing/traffic per the Do-NOT rule).
- **M4 ✅** `.env.example` gains a dormant, commented **Analytics & Search Console** block (`NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_GSC_VERIFICATION`) — placeholders only; nothing renders until set.
- **Still Phase 6 (blocked):** wiring the actual GA/GSC runtime tag once the analytics tool [J] + IDs/token [J/K] are provided.

## Corrections to the original brief (verified against the repo)
- `/privacy` and `/terms` were missing in the original audit; Phase 2 added real routes, legal views, footer-resolving links, breadcrumb schema, and sitemap entries.
- `/ai-lab` missing from the sitemap is **correct** — the page is `noindex`; a noindex page should not be in the sitemap. Not a bug.
- Metadata/canonicals/OG/alt/headings are already in good shape. The real damage is behavioral + content, not missing tags.

---

## FIX-NOW findings (no user input needed — safe to ship in Phases 2–6)

### Technical
- **T1 [HIGH]** `app/not-found.tsx:4` — `redirect('/')` turns every unknown URL into a 307→home **soft-404**. → Render a real on-brand 404 view (Header+Footer+links) so Next returns a true 404 status.
- **T3 [MED]** `app/robots.ts:10` — `disallow` includes `/_next/` (blocks Googlebot from JS/CSS bundles a hydrated site needs) plus inert `/404` `/500`. → Remove `/_next/`, `/404`, `/500`; keep `/api/`.
- **T4 [MED]** `Portfolio.tsx:372`, `Services.tsx:107` — full-bleed hero images are lazy LCP candidates. → Add `priority` (keep `alt=""`).
- **T9 [LOW]** `sitemap.ts:6` build-time `lastModified` for all URLs (weak freshness); `Home.tsx:160` hardcodes **"21 Products"** while data has **20**. → Derive count from `productsData.length`; give products a real `updatedAt` for lastmod.

### Schema
- **S1 [HIGH]** `jsonLd.tsx:94-102` — `productSchema` emits `offers { price:'0' }` → engines read products as **free**, and it violates the no-pricing rule. → **Delete the `offers` block.** Also tighten `applicationCategory` (comma-joined free-text → recognized value or drop).
- **S2 [HIGH]** `jsonLd.tsx:67-74` — `websiteSchema` `SearchAction` targets `/portfolio?q=` but **no page reads `q`** → invalid action. → Remove `potentialAction` (no real site search exists).
- **S5 [LOW]** `jsonLd.tsx` — schema nodes are isolated islands. → Give Organization `@id` `${SITE_URL}/#organization`, WebSite `@id` `#website`, and point product/website `creator/author/publisher` at the `@id`.
- **S6 [LOW]** `our-services` uses generic `ItemList`. → Optionally emit each offering as a `Service` with `provider:{@id}` (no pricing).
- **S7 [LOW]** `jsonLd.tsx:91-93` — NDA `audience` guard is an exact-string match for one client; other `(NDA)` clients leak an audience literally named "…(NDA)". → Detect NDA generically / strip suffix / omit.

### On-page
- **O1 [HIGH]** Title brand duplication: Offer renders `… | BuildspaceLabs | BuildspaceLabs`; Home & Contact double the brand (template at `layout.tsx:23`). → Drop manual brand suffixes; use `title.absolute` where needed; target ≤60 chars.
- **O4 [MED]** `product/[id]/page.tsx:38-39` — auto title (`title — all categories`) + description (subtitle + full techStack + "for {client}") overflow SERP + keyword-stuff. → Title = name + `categories[0]`; description = trimmed subtitle only (≤150), techStack stays in `keywords`, drop "for {NDA client}".
- **O6 [MED] ✅** `Home.tsx:395-466` — carousel content bugs fixed (see "Phase 5 (partial) shipped"): Sales Call Coach removed from Legal Tech; Hardware & IoT retitled "Manufacturing & Vision" with the embedded-firmware claim dropped; "Supply Chain Ops"/"Marketplace Ops" phantom/miscategorized links relabeled to "See the work"; "21" already 20.
- **O8 [MED]** Inner meta descriptions exceed ~155-160 chars (Home 214, FAQ 184, Portfolio 176, Offer 175, Services 163). → Trim, front-load keyword.

### AEO
- **A1 [HIGH]** `Accordion.tsx:33-51` — answers are `{isOpen && …}` so **FAQ answer text is absent from server HTML** until clicked → invisible to snippet/PAA crawlers and a schema-vs-visible mismatch. → Always render answer in DOM; collapse visually via CSS max-height/opacity, not conditional mount.
- **A2 [HIGH]** "AI-native product studio" is the core brand term but **never defined**. → Add FAQ "What is an AI-native product studio?" (answer-first) + one-line echo on Home/Services.
- **A3 [HIGH]** No static, quotable "BuildspaceLabs is…" sentence; the only definition is trapped in a scroll-opacity reveal (`Home.tsx:217-226`). → Add one always-visible "BuildspaceLabs is an AI-native product studio that builds X for Y" line near top of Home.
- **A4 [MED]** `faq.ts:48` — "We build some of the best AI agents in the market" buries the lede behind an unverifiable boast. → Lead with the factual capability sentence.
- **A5 [MED]** `Services.tsx:117` — hero gives no extractable "what BuildspaceLabs does" line. → Add one lead sentence before the three cards.
- **A6 [MED] ✅ (2026-07-09)** Per-vertical FAQ (2–3 Q&A) added to every `/solutions/[vertical]` page — answer-first, SSR-visible, grounded in real products, emitted as FAQPage schema. Also added a "problems we solve" buyer-intent block per vertical. This differentiates `/solutions` from the Home carousel (which is now a teaser linking into these pages).
- **A7 [MED]** Product section labels are bare nouns. → Reframe H2s as questions where honest ("What does {product} do?", "What were the results?"). Keep editorial styling.
- **A8 [MED]** `faq.ts` stale/inconsistent: names "GPT-4" (dated), lists 10 industries contradicting the canonical 8, ends on "transparent pricing". → Model-agnostic phrasing; align to 8 verticals; "clear fixed-scope quotes".
- **A10 [LOW]** `faq.ts:66` pricing answer hedges before the answer. → Lead with the no-figure answer, then the caveat.

### GEO
- **G1 [HIGH] ✅** `/public/llms.txt` created from existing `products.ts`/`faq.ts` data: H1, one-line canonical blockquote, parent/industries paragraph, Core pages + 20 Products (one-liner each) + Contact. Absolute links, no invented facts.

### Monitoring
- **M3 [MED] ✅** `seo-system/REPORT.md` created — infra inventory, canonical entity facts, monitoring status, owner-only inputs, off-repo actions, and a monthly re-check checklist that excludes live rankings/indexing/traffic.
- **M4 [LOW] ✅** `.env.example` now has a dormant commented `NEXT_PUBLIC_GA_MEASUREMENT_ID` + `NEXT_PUBLIC_GSC_VERIFICATION` block (placeholders only).

### Larger, no-input-needed (Phase 5)
- **O2 [HIGH]** No industry/solution landing pages — 8 verticals live only as carousel one-liners, so vertical long-tail queries have no ranking target. → Build `/solutions/[vertical]` pages linking the real products in each vertical; add to sitemap. (Content drafted from existing product data; no invented clients/stats.)
- **T8/O-related [LOW]** Product category badges are plain `<span>`; no topical hub. → When industry pages exist, link badges to them.

---

## NEEDS-DECISION findings (blocked on the user)

- **[A] Legal pages** — `/privacy` + `/terms` don't exist but Footer links them sitewide (broken + enterprise trust gap). Build real pages (needs legal entity name/address, jurisdiction, human review) **or** remove the two dead links for now?
- **[B] Canonical positioning + footer + "first"** — Footer (`Footer.tsx:14`) says *"AI products and applied research for Indic languages and Indian healthcare"*, contradicting the site-wide *"India's (first) AI-native product studio & engineering lab for enterprises worldwide."* Pick ONE canonical one-liner (used in layout desc, org schema, manifest, home, footer, llms.txt). Keep the superlative **"first"** or drop it (must be defensible)?
- **[C] AI training-crawler policy** — robots currently allows all. ALLOW or BLOCK training bots (GPTBot, ClaudeBot, CCBot, Google-Extended, Applebot-Extended)? Retrieval/search bots (OAI-SearchBot, PerplexityBot, Googlebot) stay allowed either way.
- **[D] Pricing on `/offer`** — `/offer` + `offerServiceSchema` publish explicit ₹ figures (₹50k / ₹1.5–2.5L), conflicting with the standing **no-pricing** rule and the FAQ's scope-based answer. Keep the figures or switch to scope-based language sitewide?
- **[E] ✅ RESOLVED (2026-07-08)** — Travel is real → carousel card links the live Atelier site. Government + defence removed sitewide (VAJRA/KAVACH + "government" mentions + orphaned media). Open Vision PPE kept (industrial safety, not defence).
- **[F] `sameAs` + founder Person data** — org has no `sameAs`; no Person schema. Need real URLs (LinkedIn company/Crunchbase/GitHub/X + Vruoom) and, for Aryan & Priyanshu: full legal names, 2-4 sentence bios, headshots, profile links. (Ship everything else; wire these when provided.)
- **[G] 7 thin product pages** — focuscare, dsv-fleet-management, food-ordering-platform, open-vision-ppe, factory-os, ai-native-real-estate-fund, ai-job-automation lack Outcomes + engagement strip. Need real outcome numbers + engagement facts (duration/scope/team) per product, or confirm which are unavailable so we frame without fabrication.
- **[H] `/ai-lab`** — deliberately hidden (noindex, no nav) or should it be indexable? And are SLM360 (39ms) / Med360 / AgentGuard / VAJRA / KAVACH real & substantiable? (Recommend: keep noindex until substantiated.)
- **[I] ✅ RESOLVED (2026-07-08)** — canonical inbound = `buildspacelabs@vruoom.com` (role-based). Shipped across schema/metadata/generic CTAs; named-founder links keep their own addresses.
- **[J] ~RESOLVED (2026-07-08)** — GA4 (free) placeholder staged as default; Cloudflare Web Analytics is the free no-code alt. Only the runtime tag + ID remain (off-repo).
- **[K] GSC verification** — provide the `google-site-verification` token, or verify via DNS TXT (no meta tag). (Ship empty env-gated placeholder either way.)
- **[L] Host config / atelier** — confirm www→apex 308 + http→https at the platform, and that `atelier-travel-studio.buildspacelabs.com` self-canonicalizes and shares no `/portfolio` content. (Verification; not blocking.)

---

## Do-NOT rules (every phase)
No AI attribution anywhere. Never invent stats/clients/testimonials/results — flag instead. No pricing figures. TS strict, match conventions, small commits, enhance don't template. **Never re-check live rankings/indexing/traffic mid-run.**
