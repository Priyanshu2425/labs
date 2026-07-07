import type { Metadata } from 'next';
import Terms from '@/views/Legal/Terms';
import { JsonLd, breadcrumbSchema, SITE_URL } from '@/lib/seo/jsonLd';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description:
    'The terms that govern your use of the BuildspaceLabs website. Any paid engagement is governed by a separate written agreement.',
  alternates: { canonical: '/terms' },
  openGraph: {
    title: 'Terms & Conditions | BuildspaceLabs',
    description: 'The terms that govern your use of the BuildspaceLabs website.',
    url: `${SITE_URL}/terms`,
    type: 'website',
  },
};

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Terms & Conditions', url: `${SITE_URL}/terms` },
        ])}
      />
      <Terms />
    </>
  );
}
