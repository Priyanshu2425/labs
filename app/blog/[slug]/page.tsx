import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogPostView from '@/views/Blog/BlogPostView';
import { getPost, postSlugs, readingMinutes, type BlogPost } from '@/data/blog';
import {
  JsonLd,
  articleSchema,
  breadcrumbSchema,
  SITE_URL,
} from '@/lib/seo/jsonLd';

interface Props {
  params: Promise<{ slug: string }>;
}

/** Pre-build every article as static HTML at build time */
export async function generateStaticParams() {
  return postSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return { title: 'Article Not Found', robots: { index: false, follow: false } };
  }

  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    keywords: post.keywords,
    authors: [{ name: 'BuildspaceLabs', url: SITE_URL }],
    openGraph: {
      title: `${post.title} | BuildspaceLabs`,
      description: post.excerpt,
      url,
      type: 'article',
      locale: 'en_IN',
      siteName: 'BuildspaceLabs',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: ['BuildspaceLabs'],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | BuildspaceLabs`,
      description: post.excerpt,
    },
  };
}

/** Body word count, for the `wordCount` field on BlogPosting. */
function wordCount(post: BlogPost): number {
  return readingMinutes(post) * 220;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Blog', url: `${SITE_URL}/blog` },
          { name: post.title, url: `${SITE_URL}/blog/${post.slug}` },
        ])}
      />
      <JsonLd
        data={articleSchema({
          slug: post.slug,
          title: post.title,
          description: post.standfirst,
          publishedAt: post.publishedAt,
          updatedAt: post.updatedAt,
          category: post.category,
          keywords: post.keywords,
          wordCount: wordCount(post),
        })}
      />
      <BlogPostView post={post} />
    </>
  );
}
