# SEO / AEO / GEO — REPORT

Running report for **buildspacelabs.com**. Companion to `STATE.md` (phase tracker + findings) and `README.md` (system overview). Last updated **2026-07-08** after Phase 4.

This report is the durable inventory + re-check checklist. It deliberately contains **no live rankings, indexing counts, or traffic numbers** — those are checked in Google Search Console / Bing / analytics, not here, and never mid-run.

---

## 1. What shipped (Phases 1–4)

| Phase | What | Commit |
|-------|------|--------|
| 1 | Read-only audit — 6 specialists, findings recorded in `STATE.md` | — |
| 2 | Technical SEO — real 404 (true HTTP 404), AI-crawler robots policy, `/privacy` + `/terms` | `5bfea1b` |
| 3 | Schema + AEO — honest product schema (no `price:0`), entity `@id`s, server-rendered FAQ answers | `b57e697` |
| 4 | GEO + entity consistency — `llms.txt`, dropped "first" superlative, one canonical one-liner | `43f9557` |
| — | System scaffolding — subagent team, coordination state, README | `53ad6a1` |

Phases 5 (content) and 6 (this report) are in progress; the remaining content work is gated on real data from the owner (see §5).

---

## 2. Crawler-facing infrastructure inventory

All present and verified via `next build` (35/35 routes) and route output.

- **Sitemap** — `app/sitemap.ts` → `/sitemap.xml`. 9 static routes (home 1.0; services/offer/portfolio 0.9; solutions 0.8; faq/contact 0.7; privacy/terms 0.3) + 7 `/solutions/[vertical]` routes (0.8) + 20 product routes (0.8). Solution + product URLs derived from `solutionsData`/`productsData` (no drift when one is added/removed). *Known-low:* `lastModified` is build-time for every URL (weak freshness signal) — acceptable, tracked as T9.
- **Solutions pages** — `/solutions` hub + `/solutions/[vertical]` (7 verticals, SSG). Per-page canonical + metadata + Breadcrumb/Service/ItemList JSON-LD; linked from Header nav + Footer.
- **Robots** — `app/robots.ts` → `/robots.txt`. Baseline allows all, disallows only `/api/`. AI **training** crawlers (GPTBot, ClaudeBot, CCBot, Google-Extended, Applebot-Extended) and **retrieval** crawlers (OAI-SearchBot, ChatGPT-User, PerplexityBot, Perplexity-User) explicitly allowed by decision. `/_next/static` intentionally left crawlable for render/CWV. Declares `sitemap` + `host`.
- **llms.txt** — `public/llms.txt` → `/llms.txt`. Canonical entity sentence, parent-org + verticals paragraph, core pages, all 20 products (one-liner each), contact. Built only from existing site data.
- **Manifest** — `app/manifest.ts` → `/manifest.webmanifest`.
- **Structured data** — `src/lib/seo/jsonLd.tsx`: Organization (`@id` `/#organization`, `parentOrganization` Vruoom), WebSite (`@id` `/#website`, publisher → org), Product (per product page; no `offers`/price), Service (on `/our-services`, provider → org), FAQPage, BreadcrumbList. One consolidated entity graph.
- **Per-route metadata** — title template `%s | BuildspaceLabs`, canonical `alternates`, OpenGraph + Twitter card, keywords. Dynamic OG/Twitter images via `app/opengraph-image.tsx` + `app/twitter-image.tsx` and per-product OG.
- **404** — `app/not-found.tsx` renders a real branded view → true HTTP 404 (no soft-404 redirect).
- **noindex** — `/ai-lab` is intentionally `noindex` and absent from the sitemap (correct — see STATE.md).

---

## 3. Canonical entity facts (single source of truth — use verbatim everywhere)

- **Name:** BuildspaceLabs
- **One-liner (canonical):** *"India's AI-native product studio and engineering lab for enterprises worldwide."* — used in root + home metadata, Organization schema, manifest, OG/Twitter images, Home hero, Footer, and `llms.txt`. **No "first" superlative** (unsubstantiated; removed in Phase 4).
- **Parent org:** Vruoom (`parentOrganization` in Organization schema).
- **Canonical inbound email:** `buildspacelabs@vruoom.com` (role-based) — used in schema, metadata, and all generic contact CTAs. Named-founder links keep their own addresses.
- **Team:** Aryan — Director · Priyanshu — CTO.
- **Verticals (demonstrable, from real portfolio):** logistics, real estate & proptech, healthcare & medtech, manufacturing & industrial vision, fintech, SaaS & customer support, legal tech.
- **Positioning rule:** never publish price figures we charge; scope-based quote language only. Never invent stats/clients/testimonials/results.

When any of these change, update **all** the surfaces listed above **plus** this line — they are intentionally kept in lockstep.

---

## 4. Monitoring status

| Tool | Status | Owner action |
|------|--------|--------------|
| Google Search Console | **Property created 2026-07-25, awaiting verification** — URL-prefix `https://buildspacelabs.com/`. Token is committed (meta tag + HTML file) but only resolves once deployed. Root cause of zero historical data: **the site had never been added to GSC at all** | Deploy, then click Verify, submit `sitemap.xml`, and request indexing for `/`, `/blog`, `/blog/what-is-an-ai-native-product-studio` |
| Bing Webmaster Tools | Not set up | Add site (can import from GSC); feeds Copilot answers |
| Analytics | GA4 placeholder staged (free); Cloudflare Web Analytics is the free no-code alt | Create the property; hand back `G-XXXXXXXXXX` for the env placeholder (or toggle Cloudflare) |
| Rich Results / schema validation | Manual, pre-deploy | After deploy, run Rich Results Test on home, one `/product/*`, `/faq`, `/our-services`, `/portfolio` |

Env placeholders for GA4 + GSC are staged (dormant, commented) in `.env.example` — wiring the runtime tag is a small follow-up once the tool + IDs are chosen.

---

## 5. Owner-only inputs still blocking in-repo work

These are the *only* things standing between us and finishing Phases 5–6. Nothing here can be fabricated.

1. ~~**Canonical inbound email**~~ ✅ RESOLVED (2026-07-08) → `buildspacelabs@vruoom.com`.
2. **`sameAs` + founder data** — real URLs (LinkedIn company, Crunchbase, GitHub org, X, Vruoom) for Organization `sameAs`; for Aryan & Priyanshu: full legal names, 2–4 sentence bios, headshots, profile links — for `Person` schema + an About page (E-E-A-T).
3. **Real outcomes for 7 thin products** — focuscare, dsv-fleet-management, food-ordering-platform, open-vision-ppe, factory-os, ai-native-real-estate-fund, ai-job-automation lack Outcomes + engagement (duration/scope/team). Provide real numbers or say which are unavailable so we frame without fabrication.
4. **Legal specifics** — registered legal entity name, registered office address, governing city/state, and confirm a lawyer will review `/privacy` + `/terms` (currently "India" + `buildspacelabs@vruoom.com` placeholders).
5. ~~**Travel & "government" claims**~~ ✅ RESOLVED (2026-07-08) → Travel card links the live Atelier site; government + defence removed sitewide.
6. **`/ai-lab`** — keep `noindex` or make indexable? Are SLM360 / Med360 / AgentGuard real & substantiable? *(Recommend: keep noindex until substantiated. Defence models VAJRA/KAVACH already removed.)*
7. **A7 product H2s** — keep short section headings (recommended) or switch to question-style H2s?
8. **Analytics** ~ decided → GA4 (free) staged, or free no-code Cloudflare Web Analytics. Only the `G-XXXX` ID / runtime tag remains.
9. **GSC verification** — the `google-site-verification` token, or you'll verify via DNS TXT.
10. **Host config** — confirm www→apex (308) + http→https enforced at Vercel/Cloudflare, and that the Atelier subdomain self-canonicalizes and shares no `/portfolio` content.

---

## 6. Off-repo actions — only the owner can do these (biggest ranking + GEO levers)

0. **Cloudflare Managed robots.txt — turn it off (or reverse decision [C]).** Cloudflare injects a managed block above our `robots.ts` output that `Disallow: /` for GPTBot, ClaudeBot, CCBot, Google-Extended, Applebot-Extended, Bytespider, Amazonbot and meta-externalagent, and sets `Content-Signal: ai-train=no`. Our own groups then allow the same bots, so the live file contradicts itself. This is the single biggest GEO blocker and it is a dashboard toggle, not a code change.
1. **Google Search Console** — property now exists; deploy, verify, submit `sitemap.xml` (66 URLs).
2. **Bing Webmaster Tools** — same (import from GSC); feeds Copilot / AI answers.
3. **Analytics** — create the property, hand back the ID for the env placeholder.
4. **Rich Results Test** (once live) — validate JSON-LD on home, one `/product/*`, `/faq`, `/our-services`, `/portfolio`.
5. **Google Business Profile** (optional) — helps local queries ("AI development studio Gurugram").
6. **LinkedIn company page + founder profiles** — make them exist, use the exact canonical one-liner, feed URLs back (unblocks §5-2).
7. **Directory listings** — Clutch, GoodFirms, DesignRush and similar B2B/agency directories with the same one-liner. Doubles as the third-party corroboration GEO needs.
8. **Digital PR / backlinks** — the single biggest lever for both SEO and GEO and the one thing impossible in-repo. Reuse the "build first, talk after" outreach model, aimed at industry blogs/newsletters in the verticals, using case studies as source material.

---

## 7. Re-check checklist (run monthly — read `STATE.md` first)

Point Claude back at `seo-system/STATE.md`, then verify:

- [ ] **New products** — every product in `productsData` has: a product page, Product JSON-LD (no `offers`/price), a sitemap entry (automatic), and a line in `llms.txt`.
- [ ] **New routes** — any new page has metadata (title/description/canonical), an OG image, and a sitemap entry; `noindex` pages stay out of the sitemap.
- [ ] **Entity consistency** — the canonical one-liner (§3) still matches across metadata, Organization schema, manifest, Home, Footer, and `llms.txt`; no "first"/superlative crept back; no price figures.
- [ ] **Link rot** — carousel/product/portfolio links resolve (no phantom labels pointing at `/portfolio`); external landing-site links (`landingUrlFor`) still 200.
- [ ] **Schema drift** — Rich Results Test passes on the 5 sample routes; `@id` graph still consolidated; no invalid `SearchAction`/`price:0` reintroduced.
- [ ] **Honesty** — no invented stats/clients/testimonials; claims map to real portfolio work; blocked items in §5 either resolved with real data or still flagged.
- [ ] **Build** — clean `next build` (route count matches expected), true 404 on unknown URLs, `/robots.txt` + `/sitemap.xml` + `/llms.txt` serve correctly.

**Never** re-check live rankings, indexing counts, or traffic as part of this run — that belongs in GSC/analytics, not this repo.
