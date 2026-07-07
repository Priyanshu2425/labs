import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo/jsonLd';

/**
 * Robots policy.
 *
 * AI-crawler stance (decided 2026-07): TRAINING crawlers are ALLOWED — we want
 * long-term brand recall inside generative models and the site is public
 * marketing material. RETRIEVAL/search crawlers are also allowed so the site can
 * be cited in live AI answers (ChatGPT search, Perplexity, Google AI Overviews).
 *
 * To reverse the training decision later, flip TRAINING_CRAWLERS to
 * `disallow: '/'`. Leave the retrieval group allowed regardless — blocking it
 * removes the site from AI-answer citations without protecting anything.
 *
 * Note: /_next/static is intentionally NOT disallowed — Googlebot must fetch the
 * JS/CSS bundles to render these client-hydrated pages and assess Core Web Vitals.
 */

// AI training crawlers — ingest content into model weights.
const TRAINING_CRAWLERS = [
  'GPTBot', // OpenAI training
  'ClaudeBot', // Anthropic training
  'CCBot', // Common Crawl (feeds many training sets)
  'Google-Extended', // Google Gemini training
  'Applebot-Extended', // Apple training
];

// Retrieval / search crawlers — power live AI answers & AI search. Keep allowed.
const RETRIEVAL_CRAWLERS = [
  'OAI-SearchBot', // ChatGPT search index
  'ChatGPT-User', // ChatGPT user-initiated browsing
  'PerplexityBot', // Perplexity index
  'Perplexity-User', // Perplexity user-initiated fetch
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Baseline for every crawler (incl. Googlebot/Bingbot). Only the API is
      // off-limits; everything else — including /_next/static — stays crawlable.
      { userAgent: '*', allow: '/', disallow: '/api/' },
      // AI training crawlers — allowed by decision (see header).
      { userAgent: TRAINING_CRAWLERS, allow: '/', disallow: '/api/' },
      // AI retrieval/search crawlers — allowed so we can be cited in AI answers.
      { userAgent: RETRIEVAL_CRAWLERS, allow: '/', disallow: '/api/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
