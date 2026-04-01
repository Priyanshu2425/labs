import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../src/styles/global.scss';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'DIMSSU Labs — India\'s First AI-Native Product Studio',
    template: '%s | DIMSSU Labs',
  },
  description:
    'DIMSSU Labs is India\'s AI-native product studio and engineering lab. We build custom AI solutions, intelligent automation, and production-ready software for enterprises worldwide.',
  keywords: [
    'AI product studio',
    'India AI engineering',
    'custom AI solutions',
    'AI agents',
    'machine learning',
    'software development',
    'DIMSSU Labs',
  ],
  authors: [{ name: 'DIMSSU Labs', url: 'https://labs.dimssu.ai' }],
  creator: 'DIMSSU Labs',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://labs.dimssu.ai',
    siteName: 'DIMSSU Labs',
    title: 'DIMSSU Labs — India\'s First AI-Native Product Studio',
    description:
      'We build custom AI solutions, intelligent automation, and production-ready software. Working prototypes in 24 hours.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DIMSSU Labs — AI-Native Product Studio',
    description: 'India\'s AI-native engineering lab. Custom AI, production software, 24h prototypes.',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
