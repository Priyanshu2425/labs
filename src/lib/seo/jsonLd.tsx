import type { Product } from '@/data/products';
import type { FAQCategory } from '@/data/faq';

export const SITE_URL = 'https://buildspacelabs.com';
export const SITE_NAME = 'BuildspaceLabs';

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: 'BuildspaceLabs',
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    parentOrganization: {
      '@type': 'Organization',
      name: 'Vruoom',
    },
    description:
      "India's AI-native product studio and engineering lab for enterprises worldwide. We build custom AI solutions, intelligent automation, and production-ready software.",
    foundingLocation: {
      '@type': 'Place',
      address: { '@type': 'PostalAddress', addressCountry: 'IN' },
    },
    areaServed: ['IN', 'US', 'GB', 'AE', 'AU', 'EU'],
    knowsAbout: [
      'Artificial Intelligence',
      'Large Language Models',
      'AI Agents',
      'Machine Learning',
      'Software Engineering',
      'Product Development',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: 'aryan@vruoom.com',
        telephone: '+91-834-071-1366',
        availableLanguage: ['English', 'Hindi'],
      },
    ],
  };
}

export function websiteSchema() {
  // No `potentialAction`/SearchAction: the site has no `?q=` search endpoint, so a
  // sitelinks-searchbox action would be invalid per Google's guidelines. Re-add it
  // only if real on-site search is implemented.
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: 'en',
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}

export function productSchema(product: Product) {
  // Suppress the client name in structured data for any anonymized (NDA) client.
  const isNda = /\(?\bNDA\b\)?/i.test(product.client);
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: product.title,
    description: product.overview,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web, Cross-platform',
    url: `${SITE_URL}/product/${product.id}`,
    featureList: product.features,
    keywords: [...product.categories, ...product.techStack].join(', '),
    creator: { '@id': `${SITE_URL}/#organization` },
    author: { '@id': `${SITE_URL}/#organization` },
    ...(product.client && !isNda
      ? { audience: { '@type': 'Audience', name: product.client } }
      : {}),
    // No `offers`: these are bespoke client builds, not purchasable software. A
    // fabricated price (previously '0') would read as "free" to search + AI engines
    // and conflict with the no-pricing rule, so it is intentionally omitted.
  };
}

export function faqSchema(faqs: FAQCategory[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.flatMap((cat) =>
      cat.questions.map((qa) => ({
        '@type': 'Question',
        name: qa.q,
        acceptedAnswer: { '@type': 'Answer', text: qa.a },
      })),
    ),
  };
}

interface Crumb {
  name: string;
  url: string;
}

export function breadcrumbSchema(trail: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
}

export function itemListSchema(
  items: { name: string; url: string; description?: string }[],
  listName: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: item.url,
      ...(item.description ? { description: item.description } : {}),
    })),
  };
}

/** Emit each offering as a Service tied to the provider Organization (@id). */
export function servicesSchema(
  items: { name: string; url: string; description: string }[],
) {
  return items.map((s) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.name,
    serviceType: s.name,
    description: s.description,
    url: s.url,
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: ['IN', 'US', 'GB', 'AE', 'AU', 'EU'],
  }));
}
