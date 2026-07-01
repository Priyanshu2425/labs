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
    name: SITE_NAME,
    legalName: 'BuildspaceLabs',
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    parentOrganization: {
      '@type': 'Organization',
      name: 'Vruoom',
    },
    description:
      "India's first AI-native product studio and engineering lab. We build custom AI solutions, intelligent automation, and production-ready software for enterprises worldwide.",
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
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: 'en',
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/portfolio?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function productSchema(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: product.title,
    description: product.overview,
    applicationCategory: product.categories.join(', '),
    operatingSystem: 'Web, Cross-platform',
    url: `${SITE_URL}/product/${product.id}`,
    featureList: product.features,
    keywords: [...product.categories, ...product.techStack].join(', '),
    creator: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    ...(product.client && product.client !== 'Private Hospital (NDA)'
      ? { audience: { '@type': 'Audience', name: product.client } }
      : {}),
    offers: {
      '@type': 'Offer',
      availability:
        product.status === 'live'
          ? 'https://schema.org/InStock'
          : 'https://schema.org/PreOrder',
      priceCurrency: 'USD',
      price: '0',
    },
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
