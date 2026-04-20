import type { Metadata } from 'next';
import FAQClient from '@/views/FAQ/FAQ';
import { faqs } from '@/data/faq';
import {
  JsonLd,
  faqSchema,
  breadcrumbSchema,
  SITE_URL,
} from '@/lib/seo/jsonLd';

export const metadata: Metadata = {
  title: 'FAQ — Frequently Asked Questions',
  description:
    'Answers to common questions about DIMSSU Labs: what we do, AI automation capabilities, pricing, timelines, and how to work with us. AI agents from $1,200. MVPs in 4-6 weeks.',
  keywords: [
    'DIMSSU Labs FAQ',
    'AI agent pricing',
    'AI development cost',
    'MVP timeline',
    'AI automation questions',
  ],
  alternates: { canonical: '/faq' },
  openGraph: {
    title: 'FAQ — DIMSSU Labs',
    description:
      'Answers to questions about DIMSSU Labs services, pricing, timelines, AI capabilities, and engagement models.',
    url: `${SITE_URL}/faq`,
    type: 'website',
  },
};

export default function FAQPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'FAQ', url: `${SITE_URL}/faq` },
        ])}
      />
      <FAQClient />
    </>
  );
}
