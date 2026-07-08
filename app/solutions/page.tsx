import type { Metadata } from 'next';
import { SolutionsIndex } from '@/views/Solutions/Solutions';
import { solutionsData } from '@/data/solutions';
import { JsonLd, breadcrumbSchema, itemListSchema, SITE_URL } from '@/lib/seo/jsonLd';

export const metadata: Metadata = {
  title: 'AI Solutions by Industry',
  description:
    'Custom AI and production software by industry: logistics, real estate, healthcare, manufacturing, fintech, SaaS & support, and legal. Built by BuildspaceLabs.',
  alternates: { canonical: '/solutions' },
  keywords: [
    'AI solutions by industry',
    'AI development for enterprises',
    'custom AI software',
    'BuildspaceLabs',
  ],
  openGraph: {
    title: 'AI Solutions by Industry | BuildspaceLabs',
    description:
      'Custom AI across logistics, real estate, healthcare, manufacturing, fintech, SaaS & support, and legal — with the real products behind each.',
    url: `${SITE_URL}/solutions`,
    type: 'website',
    locale: 'en_IN',
    siteName: 'BuildspaceLabs',
  },
};

export default function SolutionsIndexPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Solutions', url: `${SITE_URL}/solutions` },
        ])}
      />
      <JsonLd
        data={itemListSchema(
          solutionsData.map((s) => ({
            name: s.h1,
            url: `${SITE_URL}/solutions/${s.slug}`,
            description: s.lead,
          })),
          'AI solutions by industry',
        )}
      />
      <SolutionsIndex />
    </>
  );
}
