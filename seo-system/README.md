# SEO / AEO / GEO System — buildspacelabs.com

A durable, re-runnable system for improving the site's visibility across three surfaces:

- **SEO** — organic ranking in Google/Bing
- **AEO** — featured snippets, People Also Ask, voice answers
- **GEO** — being cited/recommended by ChatGPT, Claude, Perplexity, Gemini, and Google AI Overviews

This is a **system, not a one-off pass**. The coordination file (`STATE.md`), the running report (`REPORT.md`), and the agent definitions in `../.claude/agents/seo-*.md` are checked into the repo so a future session can pick up exactly where the last one stopped.

## How to re-run (next month, or after shipping new products)

1. Point the assistant back at the original SEO brief (the phase plan is mirrored in `STATE.md`).
2. It reads `STATE.md`, runs the **re-check checklist** in `REPORT.md` (new products missing schema/case-study treatment, new routes missing sitemap/metadata, broken internal links, schema/entity drift), and continues from the next open phase.
3. Work proceeds phase by phase with a checkpoint after each — nothing runs silently end to end.

## The team

| Agent | Owns |
|-------|------|
| `seo-orchestrator` | `STATE.md`, phase plan, checkpoints — the only one that talks to the user |
| `seo-technical` | sitemap, robots, canonicals, images/alt, headings, internal links, 404, www/slash |
| `seo-schema` | JSON-LD: Organization, WebSite, Person, Service/Product, FAQPage, BreadcrumbList |
| `seo-onpage` | titles/descriptions, long-tail mapping, product case studies, founder bios |
| `seo-aeo` | answer-first FAQ, quotable definitions, PAA Q&A |
| `seo-geo` | llms.txt, AI-crawler robots policy, semantic HTML/SSR, entity consistency |
| `seo-monitoring` | GA4/GSC placeholders, `REPORT.md`, the re-check checklist |

## Non-negotiables

- No AI attribution anywhere (commits, code, comments, copy, UI).
- Never invent stats, client names, testimonials, or results — flag missing real numbers instead.
- No pricing figures on the site.
- Enhance the existing (already mature) metadata — never template over it.
- Never re-check live rankings/indexing/traffic mid-run; that data moves on a weeks-to-months timescale, not a session's.

## Files

- `STATE.md` — live audit findings + phase status. Read before working, update before finishing.
- `REPORT.md` — what was audited/fixed/pending, prioritized next steps, and the manual off-repo checklist.
