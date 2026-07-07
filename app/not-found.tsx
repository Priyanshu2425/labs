import type { Metadata } from 'next';
import NotFoundView from '@/views/NotFound/NotFound';

export const metadata: Metadata = {
  title: 'Page not found (404)',
  robots: { index: false, follow: true },
};

/**
 * Renders a real 404 view so Next returns an HTTP 404 status. (The previous
 * `redirect('/')` produced a sitewide soft-404 — every unknown URL 307'd to home,
 * which Google flags as a soft 404 and which masked broken internal links.)
 */
export default function NotFound() {
  return <NotFoundView />;
}
