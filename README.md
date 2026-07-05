# buildspace labs

Marketing and portfolio website for buildspace labs, built as a modern Next.js 15 App Router application.

## What it does

buildspace labs is a content-driven marketing and portfolio site. It renders landing, services, portfolio, product, AI-lab, and FAQ sections using reusable card components, ships a full SEO/social-preview setup, and exposes a single contact-form API route that delivers submissions over multiple channels at once. It is designed to deploy to Cloudflare Pages (a Vercel configuration is also present).

## Features

- Next.js 15 App Router with React 19 and TypeScript
- Sass styling and Framer Motion animations, with `lucide-react` icons
- Reusable card components: `ModelCard`, `ResearchPaperCard`, `ProductCard`, `PortfolioCard`, and `Accordion`
- Full SEO setup: `sitemap.ts`, `robots.ts`, `manifest.ts`, generated OpenGraph and Twitter images, and helpers under `src/lib/seo`
- Contact API route (`app/api/contact/route.ts`) that fans out to Slack, Discord, and Resend email in parallel and succeeds if any single channel delivers
- Ready for Cloudflare Pages via `@cloudflare/next-on-pages` and Wrangler

## Requirements

- Node.js 18+ (20+ recommended for Next.js 15)
- npm
- For deployment: a Cloudflare account with Wrangler configured (or Vercel)

## Install

```bash
npm install
```

## Usage

Run the development server:

```bash
npm run dev
```

Then open `http://localhost:3000`.

Available scripts:

```bash
npm run dev            # start the Next.js dev server
npm run build          # production build
npm run start          # serve the production build
npm run lint           # run ESLint (eslint-config-next)
npm run pages:build    # build for Cloudflare Pages via @cloudflare/next-on-pages
npm run pages:preview  # build and preview locally with Wrangler
```

## Configuration / environment variables

All environment variables are optional and are only used by the contact-form API route. If none are set, the rest of the site still builds and runs; the contact form simply has no delivery channel configured. Set these in your host's environment (never commit real values):

- `SLACK_WEBHOOK_URL`
- `DISCORD_WEBHOOK_URL`
- `RESEND_API_KEY`
- `CONTACT_EMAIL_TO`
- `CONTACT_EMAIL_FROM`

## Project status / limitations

- This is a **web application, not a CLI.** There is no command-line entry point beyond the standard npm scripts.
- The contact route considers a submission successful if at least one channel (Slack, Discord, or email) delivers; with no env vars set, submissions are not delivered anywhere.
- Content is specific to buildspace labs. To reuse it, expect to replace copy, assets, and branding.
- Both a Cloudflare Pages and a Vercel configuration are present; pick one for your deployment target.

## Claude Code integration

This project was developed with Claude Code assistance. The standard npm scripts above are the entry points an agent would use to build, lint, and preview the site.

## License

No license file is currently present. MIT recommended — add a `LICENSE` file if you intend to release this as open source.
