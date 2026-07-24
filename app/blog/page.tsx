import type { Metadata } from 'next';
import BlogIndex from '@/views/Blog/BlogIndex';
import { allPosts } from '@/data/blog';
import {
  JsonLd,
  blogSchema,
  breadcrumbSchema,
  itemListSchema,
  SITE_URL,
} from '@/lib/seo/jsonLd';

export const metadata: Metadata = {
  title: 'AI Engineering & Product Notes',
  description:
    'Practical writing on building AI products that survive production: scoping, evaluation, agent reliability, deployment, and industry use cases.',
  alternates: {
    canonical: '/blog',
    types: { 'application/rss+xml': `${SITE_URL}/blog/rss.xml` },
  },
  openGraph: {
    title: 'Notes from the build | BuildspaceLabs',
    description:
      'Practical writing on building AI products that survive production — scoping, evaluation, what breaks, and what the work looks like per industry.',
    url: `${SITE_URL}/blog`,
    type: 'website',
    locale: 'en_IN',
    siteName: 'BuildspaceLabs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Notes from the build | BuildspaceLabs',
    description: 'Practical writing on building AI products that survive production.',
  },
  keywords: [
    'AI engineering blog',
    'AI product development',
    'LLM engineering',
    'AI agents',
    'BuildspaceLabs',
  ],
};

export default function BlogPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Blog', url: `${SITE_URL}/blog` },
        ])}
      />
      <JsonLd
        data={blogSchema(
          allPosts.map((p) => ({
            slug: p.slug,
            title: p.title,
            description: p.excerpt,
            publishedAt: p.publishedAt,
          })),
        )}
      />
      <JsonLd
        data={itemListSchema(
          allPosts.map((p) => ({
            name: p.title,
            url: `${SITE_URL}/blog/${p.slug}`,
            description: p.excerpt,
          })),
          'BuildspaceLabs articles',
        )}
      />
      <BlogIndex />
    </>
  );
}
