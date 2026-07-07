import type { Metadata } from 'next';
import Privacy from '@/views/Legal/Privacy';
import { JsonLd, breadcrumbSchema, SITE_URL } from '@/lib/seo/jsonLd';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How BuildspaceLabs collects, uses, and protects the information you share through buildspacelabs.com. Minimal data collection, no selling of personal data.',
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: 'Privacy Policy | BuildspaceLabs',
    description:
      'How BuildspaceLabs collects, uses, and protects the information you share through the site.',
    url: `${SITE_URL}/privacy`,
    type: 'website',
  },
};

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Privacy Policy', url: `${SITE_URL}/privacy` },
        ])}
      />
      <Privacy />
    </>
  );
}
