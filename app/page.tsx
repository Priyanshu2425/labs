import type { Metadata } from 'next';
import HomeClient from '@/pages/Home/Home';

export const metadata: Metadata = {
  title: 'DIMSSU Labs — India\'s First AI-Native Product Studio',
  description:
    'DIMSSU Labs is India\'s AI-native product studio and engineering lab. We build custom AI solutions, intelligent automation, and production-ready software for enterprises worldwide. Working prototypes in 24 hours.',
  openGraph: {
    title: 'DIMSSU Labs — India\'s First AI-Native Product Studio',
    description:
      'AI-native engineering lab. Custom AI, production software, 24h prototypes. Serving healthcare, government, logistics, real estate & more.',
    url: 'https://labs.dimssu.ai',
  },
};

export default function HomePage() {
  return <HomeClient />;
}
