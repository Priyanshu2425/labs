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
| 3 | Schema + AEO | ⏳ pending (some items need decisions B/C) |
| 4 | GEO (llms.txt, AI-crawler robots, entity consistency) | ⏳ pending (needs decisions B/C) |
| 5 | Content (case studies, copy, bios, industry pages) | ⏳ pending (needs real outcomes/bios) |
| 6 | Reporting (REPORT.md + re-check list) | ⏳ pending |

## Decisions locked (2026-07-07)
- **[B]** Canonical positioning = *"India's AI-native product studio & engineering lab for enterprises worldwide."* **Drop "first."** (applies in Phase 4 entity pass)
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

## Corrections to the original brief (verified against the repo)
- `/privacy` and `/terms` **do NOT exist** as routes — but the Footer links to them on every page (broken/soft-404).
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
- **O6 [MED]** `Home.tsx:395-466` — carousel content bugs: **Sales Call Coach filed under Legal Tech**; "Hardware & IoT / embedded firmware" claim unsupported by the 3 linked products; dead-end "Supply Chain Ops"/"Marketplace Ops" links; the "21" count. → Recategorize, soften/relabel, fix links, derive count.
- **O8 [MED]** Inner meta descriptions exceed ~155-160 chars (Home 214, FAQ 184, Portfolio 176, Offer 175, Services 163). → Trim, front-load keyword.

### AEO
- **A1 [HIGH]** `Accordion.tsx:33-51` — answers are `{isOpen && …}` so **FAQ answer text is absent from server HTML** until clicked → invisible to snippet/PAA crawlers and a schema-vs-visible mismatch. → Always render answer in DOM; collapse visually via CSS max-height/opacity, not conditional mount.
- **A2 [HIGH]** "AI-native product studio" is the core brand term but **never defined**. → Add FAQ "What is an AI-native product studio?" (answer-first) + one-line echo on Home/Services.
- **A3 [HIGH]** No static, quotable "BuildspaceLabs is…" sentence; the only definition is trapped in a scroll-opacity reveal (`Home.tsx:217-226`). → Add one always-visible "BuildspaceLabs is an AI-native product studio that builds X for Y" line near top of Home.
- **A4 [MED]** `faq.ts:48` — "We build some of the best AI agents in the market" buries the lede behind an unverifiable boast. → Lead with the factual capability sentence.
- **A5 [MED]** `Services.tsx:117` — hero gives no extractable "what BuildspaceLabs does" line. → Add one lead sentence before the three cards.
- **A6 [MED]** No vertical PAA Q&A though each vertical maps to a real product. → Add industry FAQ block (Healthcare, SaaS/Support, Fintech first), each answered from a real product, no invented stats.
- **A7 [MED]** Product section labels are bare nouns. → Reframe H2s as questions where honest ("What does {product} do?", "What were the results?"). Keep editorial styling.
- **A8 [MED]** `faq.ts` stale/inconsistent: names "GPT-4" (dated), lists 10 industries contradicting the canonical 8, ends on "transparent pricing". → Model-agnostic phrasing; align to 8 verticals; "clear fixed-scope quotes".
- **A10 [LOW]** `faq.ts:66` pricing answer hedges before the answer. → Lead with the no-figure answer, then the caveat.

### GEO
- **G1 [HIGH]** No `/public/llms.txt`. → Create it from existing `products.ts`/`faq.ts` data: H1, one-line canonical blockquote, parent/industries paragraph, Core pages + 20 Products (one-liner each) + Contact. Absolute links, no invented facts.

### Monitoring
- **M3 [MED]** No `REPORT.md`, no re-check checklist. → Create `REPORT.md` (infra inventory, canonical entity facts, monitoring status, re-check checklist). *Re-check list must exclude live rankings/indexing/traffic.*
- **M4 [LOW]** `.env.example` has no analytics/GSC section. → Append commented `NEXT_PUBLIC_GA_MEASUREMENT_ID` + `NEXT_PUBLIC_GSC_VERIFICATION` block (placeholders only).

### Larger, no-input-needed (Phase 5)
- **O2 [HIGH]** No industry/solution landing pages — 8 verticals live only as carousel one-liners, so vertical long-tail queries have no ranking target. → Build `/solutions/[vertical]` pages linking the real products in each vertical; add to sitemap. (Content drafted from existing product data; no invented clients/stats.)
- **T8/O-related [LOW]** Product category badges are plain `<span>`; no topical hub. → When industry pages exist, link badges to them.

---

## NEEDS-DECISION findings (blocked on the user)

- **[A] Legal pages** — `/privacy` + `/terms` don't exist but Footer links them sitewide (broken + enterprise trust gap). Build real pages (needs legal entity name/address, jurisdiction, human review) **or** remove the two dead links for now?
- **[B] Canonical positioning + footer + "first"** — Footer (`Footer.tsx:14`) says *"AI products and applied research for Indic languages and Indian healthcare"*, contradicting the site-wide *"India's (first) AI-native product studio & engineering lab for enterprises worldwide."* Pick ONE canonical one-liner (used in layout desc, org schema, manifest, home, footer, llms.txt). Keep the superlative **"first"** or drop it (must be defensible)?
- **[C] AI training-crawler policy** — robots currently allows all. ALLOW or BLOCK training bots (GPTBot, ClaudeBot, CCBot, Google-Extended, Applebot-Extended)? Retrieval/search bots (OAI-SearchBot, PerplexityBot, Googlebot) stay allowed either way.
- **[D] Pricing on `/offer`** — `/offer` + `offerServiceSchema` publish explicit ₹ figures (₹50k / ₹1.5–2.5L), conflicting with the standing **no-pricing** rule and the FAQ's scope-based answer. Keep the figures or switch to scope-based language sitewide?
- **[E] Unsupported vertical claims** — Travel & Hospitality carousel card + "government" claims (Home OG, Portfolio hero) have **no matching work** in the indexed portfolio (Travel = the separate atelier subdomain; defence AI only on noindex /ai-lab). Provide real refs or remove those claims?
- **[F] `sameAs` + founder Person data** — org has no `sameAs`; no Person schema. Need real URLs (LinkedIn company/Crunchbase/GitHub/X + Vruoom) and, for Aryan & Priyanshu: full legal names, 2-4 sentence bios, headshots, profile links. (Ship everything else; wire these when provided.)
- **[G] 7 thin product pages** — focuscare, dsv-fleet-management, food-ordering-platform, open-vision-ppe, factory-os, ai-native-real-estate-fund, ai-job-automation lack Outcomes + engagement strip. Need real outcome numbers + engagement facts (duration/scope/team) per product, or confirm which are unavailable so we frame without fabrication.
- **[H] `/ai-lab`** — deliberately hidden (noindex, no nav) or should it be indexable? And are SLM360 (39ms) / Med360 / AgentGuard / VAJRA / KAVACH real & substantiable? (Recommend: keep noindex until substantiated.)
- **[I] Contact email** — schema/metadata use `aryan@vruoom.com`; visible Contact page leads with `priyanshu@vruoom.com`. Which is the single canonical inbound?
- **[J] Analytics tool** — GA4 (needs `G-XXXX` ID), Cloudflare Web Analytics (dashboard toggle, no code), or Plausible? (Default: ship dormant env-gated GA4 placeholder.)
- **[K] GSC verification** — provide the `google-site-verification` token, or verify via DNS TXT (no meta tag). (Ship empty env-gated placeholder either way.)
- **[L] Host config / atelier** — confirm www→apex 308 + http→https at the platform, and that `atelier-travel-studio.buildspacelabs.com` self-canonicalizes and shares no `/portfolio` content. (Verification; not blocking.)

---

## Do-NOT rules (every phase)
No AI attribution anywhere. Never invent stats/clients/testimonials/results — flag instead. No pricing figures. TS strict, match conventions, small commits, enhance don't template. **Never re-check live rankings/indexing/traffic mid-run.**
