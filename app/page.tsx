import type { Metadata } from 'next';
import HomeClient from '@/views/Home/Home';
import { JsonLd, websiteSchema, SITE_URL } from '@/lib/seo/jsonLd';

export const metadata: Metadata = {
  title: 'DIMSSU Labs — India\'s First AI-Native Product Studio',
  description:
    'DIMSSU Labs is India\'s AI-native product studio and engineering lab. We build custom AI solutions, intelligent automation, and production-ready software for enterprises worldwide. Working prototypes in 24 hours.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'DIMSSU Labs — India\'s First AI-Native Product Studio',
    description:
      'AI-native engineering lab. Custom AI, production software, 24h prototypes. Serving healthcare, government, logistics, real estate & more.',
    url: SITE_URL,
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={websiteSchema()} />
      <HomeClient />
    </>
  );
}
