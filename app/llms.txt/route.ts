import { productsData } from '@/data/products';
import { solutionsData } from '@/data/solutions';
import { allPosts } from '@/data/blog';
import { faqs } from '@/data/faq';
import { SITE_URL } from '@/lib/seo/jsonLd';

/**
 * /llms.txt — the GEO entry point for AI crawlers and answer engines.
 *
 * Generated from the same data that powers the site rather than hand-written, so
 * it cannot drift. (The previous hand-maintained `public/llms.txt` had fallen
 * behind: it listed 20 products when the catalogue held 36, and predated
 * /solutions and /blog entirely.)
 *
 * Everything below is derived from real site content — no claims are asserted
 * here that are not already on a page.
 */
export const dynamic = 'force-static';

/** Collapse a product subtitle to one clean clause for the listing. */
function oneLiner(text: string): string {
  const trimmed = text.trim().replace(/\s+/g, ' ');
  return trimmed.endsWith('.') ? trimmed : `${trimmed}.`;
}

export async function GET() {
  const products = Object.entries(productsData);

  const solutionLines = solutionsData
    .map((s) => `- ${s.name}: ${SITE_URL}/solutions/${s.slug} - ${oneLiner(s.lead)}`)
    .join('\n');

  const productLines = products
    .map(([id, p]) => `- ${p.title}: ${SITE_URL}/product/${id} - ${oneLiner(p.subtitle)}`)
    .join('\n');

  const postLines = allPosts
    .map((p) => `- ${p.title}: ${SITE_URL}/blog/${p.slug} - ${oneLiner(p.excerpt)}`)
    .join('\n');

  // The General FAQ category carries the entity definitions worth quoting.
  const general = faqs.find((c) => c.category === 'General');
  const faqLines = (general?.questions ?? [])
    .map((qa) => `### ${qa.q}\n\n${qa.a}`)
    .join('\n\n');

  const body = `# BuildspaceLabs

> BuildspaceLabs is India's AI-native product studio and engineering lab for enterprises worldwide.

BuildspaceLabs builds custom AI solutions, intelligent automation systems, and production-ready software. It is operated by Vruoom and works across logistics and mobility, real estate and proptech, healthcare and medtech, manufacturing and industrial vision, fintech, SaaS and customer support, and legal tech. Most engagements are enterprise and B2B rather than consumer.

Contact: buildspacelabs@vruoom.com

## Core pages

- Home: ${SITE_URL}/
- Services: ${SITE_URL}/our-services
- Solutions by industry: ${SITE_URL}/solutions
- Portfolio: ${SITE_URL}/portfolio
- Blog: ${SITE_URL}/blog
- FAQ: ${SITE_URL}/faq
- Contact: ${SITE_URL}/contact-us
- Privacy: ${SITE_URL}/privacy
- Terms: ${SITE_URL}/terms

## Services

- Custom AI Builds: bespoke AI systems and enterprise software built from scratch, end-to-end.
- Ready-to-Deploy AI Products: pre-built AI products integrated into a client stack within a short launch window.
- Fractional CTO: senior engineering leadership embedded with a client's team.

## Industries

${solutionLines}

## Writing

Practical articles on building AI products that reach production. Feed: ${SITE_URL}/blog/rss.xml

${postLines}

## Products and case studies

${productLines}

## Key questions

${faqLines}

## Contact

Use the contact page for inbound project requests: ${SITE_URL}/contact-us
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
