import type { Metadata } from 'next';
import FAQClient from '@/pages/FAQ/FAQ';

export const metadata: Metadata = {
  title: 'FAQ — Frequently Asked Questions',
  description:
    'Answers to common questions about DIMSSU Labs: what we do, AI automation capabilities, pricing, timelines, and how to work with us. AI agents from $1,200. MVPs in 4-6 weeks.',
  openGraph: {
    title: 'FAQ — DIMSSU Labs',
    description: 'Answers to questions about DIMSSU Labs services, pricing, timelines, AI capabilities, and engagement models.',
    url: 'https://labs.dimssu.ai/faq',
  },
};

export default function FAQPage() {
  return <FAQClient />;
}
