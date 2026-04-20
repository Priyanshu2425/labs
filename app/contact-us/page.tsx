import type { Metadata } from 'next';
import ContactClient from '@/views/Contact/Contact';
import { JsonLd, breadcrumbSchema, SITE_URL, SITE_NAME } from '@/lib/seo/jsonLd';

export const metadata: Metadata = {
  title: 'Contact Us — Start a Project with DIMSSU Labs',
  description:
    'Get in touch with DIMSSU Labs to start a project. Email labs@dimssu.com, WhatsApp +91 834 071 1366, or fill out the form. We respond within 24 hours.',
  keywords: [
    'contact DIMSSU Labs',
    'start AI project',
    'hire AI developers',
    'AI consulting India',
  ],
  alternates: { canonical: '/contact-us' },
  openGraph: {
    title: 'Contact DIMSSU Labs',
    description:
      'Start a project with DIMSSU Labs. Custom AI builds, ready-to-deploy products, fractional CTO. We respond within 24 hours.',
    url: `${SITE_URL}/contact-us`,
    type: 'website',
  },
};

const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: `Contact ${SITE_NAME}`,
  url: `${SITE_URL}/contact-us`,
  description:
    'Reach DIMSSU Labs via email, WhatsApp, or the contact form. Responses within 24 hours.',
  mainEntity: {
    '@type': 'Organization',
    name: SITE_NAME,
    email: 'labs@dimssu.com',
    telephone: '+91-834-071-1366',
    url: SITE_URL,
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactPageSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Contact', url: `${SITE_URL}/contact-us` },
        ])}
      />
      <ContactClient />
    </>
  );
}
