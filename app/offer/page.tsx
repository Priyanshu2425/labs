import type { Metadata } from 'next';
import OfferClient from '@/views/Offer';
import { JsonLd, breadcrumbSchema, SITE_URL, SITE_NAME } from '@/lib/seo/jsonLd';

export const metadata: Metadata = {
  title: 'Get Your Offer — 48-Hour Fixed-Price MVP | BuildspaceLabs',
  description:
    'Answer two questions, run our AI market-audit prompt, and get a personalized, fixed-price build offer. Investor-ready MVPs shipped in a 48-hour horizon by an AI-native studio.',
  keywords: [
    'MVP in 48 hours',
    'fixed price software development',
    'AI-native development studio',
    'rapid MVP build',
    'startup software India',
    'get software quote',
  ],
  alternates: { canonical: '/offer' },
  openGraph: {
    title: 'Get Your Offer — 48-Hour Fixed-Price MVP',
    description:
      'Run our AI market-audit prompt and get a personalized, fixed-price build offer. Investor-ready MVPs in 48 hours.',
    url: `${SITE_URL}/offer`,
    type: 'website',
  },
};

const offerServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: '48-Hour Fixed-Price MVP Build',
  provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
  areaServed: 'Worldwide',
  description:
    'AI-native software builds delivered in a 48-hour horizon on a fixed price. Validation Stack from ₹50,000; Custom Scaling Stack from ₹1,50,000.',
  offers: [
    { '@type': 'Offer', name: 'The Validation Stack', price: '50000', priceCurrency: 'INR' },
    { '@type': 'Offer', name: 'The Custom Scaling Stack', price: '150000', priceCurrency: 'INR' },
  ],
};

export default function OfferPage() {
  return (
    <>
      <JsonLd data={offerServiceSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Get Your Offer', url: `${SITE_URL}/offer` },
        ])}
      />
      <OfferClient />
    </>
  );
}
