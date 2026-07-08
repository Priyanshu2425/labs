import type { Metadata } from 'next';
import HomeClient from '@/views/Home/Home';
import { JsonLd, websiteSchema, SITE_URL } from '@/lib/seo/jsonLd';

export const metadata: Metadata = {
  title: 'BuildspaceLabs — AI-Native Product Studio',
  description:
    'BuildspaceLabs is India\'s AI-native product studio and engineering lab for enterprises worldwide. We build custom AI solutions, intelligent automation, and production-ready software.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'BuildspaceLabs — AI-Native Product Studio',
    description:
      'AI-native engineering lab. Custom AI, production software, 24h prototypes. Serving healthcare, logistics, real estate & more.',
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
