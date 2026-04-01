import type { Metadata } from 'next';
import ServicesClient from '@/pages/Services/Services';

export const metadata: Metadata = {
  title: 'Our Services — Custom AI Builds, Products & Fractional CTO',
  description:
    'Three ways to work with DIMSSU Labs: custom software builds from $5k, ready-to-deploy AI products live in 72 hours, or fractional CTO partnership. AI-native engineering.',
  openGraph: {
    title: 'Our Services — DIMSSU Labs',
    description: 'Custom software builds, ready-to-deploy AI products, and Fractional CTO partnerships. AI-native engineering for enterprises.',
    url: 'https://labs.dimssu.ai/our-services',
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
