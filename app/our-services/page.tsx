import type { Metadata } from 'next';
import ServicesClient from '@/views/Services/Services';
import {
  JsonLd,
  itemListSchema,
  breadcrumbSchema,
  SITE_URL,
} from '@/lib/seo/jsonLd';

export const metadata: Metadata = {
  title: 'Our Services — Custom AI Builds, Products & Fractional CTO',
  description:
    'Three ways to work with DIMSSU Labs: custom software builds from $5k, ready-to-deploy AI products live in 72 hours, or fractional CTO partnership. AI-native engineering.',
  keywords: [
    'custom AI development',
    'AI products',
    'fractional CTO',
    'AI engineering services',
    'DIMSSU Labs services',
    'enterprise AI',
  ],
  alternates: { canonical: '/our-services' },
  openGraph: {
    title: 'Our Services — DIMSSU Labs',
    description:
      'Custom software builds, ready-to-deploy AI products, and Fractional CTO partnerships. AI-native engineering for enterprises.',
    url: `${SITE_URL}/our-services`,
    type: 'website',
  },
};

const services = [
  {
    name: 'Custom AI Builds',
    url: `${SITE_URL}/our-services#custom`,
    description: 'Bespoke AI systems and enterprise software, built from scratch. Starts at $5k.',
  },
  {
    name: 'Ready-to-Deploy AI Products',
    url: `${SITE_URL}/our-services#products`,
    description: 'Pre-built AI products live in your stack within 72 hours.',
  },
  {
    name: 'Fractional CTO',
    url: `${SITE_URL}/our-services#fractional-cto`,
    description: 'Senior engineering leadership embedded in your team.',
  },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={itemListSchema(services, 'DIMSSU Labs Services')} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Our Services', url: `${SITE_URL}/our-services` },
        ])}
      />
      <ServicesClient />
    </>
  );
}
