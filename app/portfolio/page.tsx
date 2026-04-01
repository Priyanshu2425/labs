import type { Metadata } from 'next';
import PortfolioClient from '@/pages/Portfolio/Portfolio';

export const metadata: Metadata = {
  title: 'Portfolio — Production AI & Software Projects',
  description:
    'Explore DIMSSU Labs\' portfolio: AI clinical notes, fleet management, EV charging, lease management, web scraping APIs, edge AI engines and more. All live. All in production.',
  openGraph: {
    title: 'Portfolio — DIMSSU Labs',
    description: 'Production AI and software projects across healthcare, logistics, real estate, government and more.',
    url: 'https://labs.dimssu.ai/portfolio',
  },
};

export default function PortfolioPage() {
  return <PortfolioClient />;
}
