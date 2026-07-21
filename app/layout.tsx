import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Inter, Space_Grotesk } from 'next/font/google';
import '../src/styles/global.scss';
import { JsonLd, organizationSchema, SITE_URL } from '@/lib/seo/jsonLd';

// Public analytics identifiers (safe to ship to the browser). Overridable via
// env for other environments; the literals are the production BuildspaceLabs IDs.
const HUBSPOT_PORTAL_ID = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID ?? '246744054';
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? '2741855546169931';
// Contentsquare (Hotjar) session-analytics tag — heatmaps & session replay.
const CONTENTSQUARE_SRC =
  process.env.NEXT_PUBLIC_CONTENTSQUARE_SRC ?? 'https://t.contentsquare.net/uxa/418ed7dd99917.js';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'BuildspaceLabs — AI-Native Product Studio',
    template: '%s | BuildspaceLabs',
  },
  description:
    'BuildspaceLabs is India\'s AI-native product studio and engineering lab for enterprises worldwide. We build custom AI solutions, intelligent automation, and production-ready software.',
  applicationName: 'BuildspaceLabs',
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
    'BuildspaceLabs',
  ],
  authors: [{ name: 'BuildspaceLabs', url: SITE_URL }],
  creator: 'BuildspaceLabs',
  publisher: 'BuildspaceLabs',
  category: 'technology',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'BuildspaceLabs',
    title: 'BuildspaceLabs — AI-Native Product Studio',
    description:
      'We build custom AI solutions, intelligent automation, and production-ready software. Working prototypes in 24 hours.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BuildspaceLabs — AI-Native Product Studio',
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
    <html lang="en" data-theme="dark" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <JsonLd data={organizationSchema()} />
        {children}

        {/* HubSpot tracking — sets the hubspotutk cookie on landing so form
            submissions attribute back to the visitor's original source. */}
        <Script
          id="hs-script-loader"
          strategy="afterInteractive"
          src={`https://js.hs-scripts.com/${HUBSPOT_PORTAL_ID}.js`}
        />

        {/* Contentsquare (Hotjar) — session replay & heatmaps. */}
        <Script id="contentsquare-uxa" strategy="afterInteractive" src={CONTENTSQUARE_SRC} />

        {/* Meta Pixel — base code only (init, no PageView). The only events we
            track are the conversions Lead + Schedule, fired from the /offer
            funnel (browser Pixel + server-side Conversions API, deduped). */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');`}
        </Script>
      </body>
    </html>
  );
}
