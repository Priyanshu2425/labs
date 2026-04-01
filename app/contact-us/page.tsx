import type { Metadata } from 'next';
import ContactClient from '../../src/pages/Contact/Contact';

export const metadata: Metadata = {
  title: 'Contact Us — Start a Project with DIMSSU Labs',
  description:
    'Get in touch with DIMSSU Labs to start a project. Email labs@dimssu.com, WhatsApp +91 834 071 1366, or fill out the form. We respond within 24 hours.',
  openGraph: {
    title: 'Contact DIMSSU Labs',
    description: 'Start a project with DIMSSU Labs. Custom AI builds, ready-to-deploy products, fractional CTO. We respond within 24 hours.',
    url: 'https://labs.dimssu.ai/contact-us',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
