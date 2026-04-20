import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '../src/styles/global.scss';
import { JsonLd, organizationSchema, SITE_URL } from '@/lib/seo/jsonLd';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'DIMSSU Labs — India\'s First AI-Native Product Studio',
    template: '%s | DIMSSU Labs',
  },
  description:
    'DIMSSU Labs is India\'s AI-native product studio and engineering lab. We build custom AI solutions, intelligent automation, and production-ready software for enterprises worldwide.',
  applicationName: 'DIMSSU Labs',
  keywords: [
    'AI product studio',
    'India AI engineering',
    'custom AI solutions',
    'AI agents',
    'LLM development',
    'machine learning',
    'software development',
    'fractional CTO',
    'AI automation',
    'DIMSSU Labs',
  ],
  authors: [{ name: 'DIMSSU Labs', url: SITE_URL }],
  creator: 'DIMSSU Labs',
  publisher: 'DIMSSU Labs',
  category: 'technology',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'DIMSSU Labs',
    title: 'DIMSSU Labs — India\'s First AI-Native Product Studio',
    description:
      'We build custom AI solutions, intelligent automation, and production-ready software. Working prototypes in 24 hours.',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@dimssu',
    creator: '@dimssu',
    title: 'DIMSSU Labs — AI-Native Product Studio',
    description: 'India\'s AI-native engineering lab. Custom AI, production software, 24h prototypes.',
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  formatDetection: { email: false, address: false, telephone: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" className={inter.variable}>
      <body>
        <JsonLd data={organizationSchema()} />
        {children}
      </body>
    </html>
  );
}
