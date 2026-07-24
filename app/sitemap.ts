import type { MetadataRoute } from 'next';
import { productsData } from '@/data/products';
import { solutionsData } from '@/data/solutions';
import { allPosts } from '@/data/blog';
import { SITE_URL } from '@/lib/seo/jsonLd';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/our-services`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/offer`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/portfolio`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/solutions`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/contact-us`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const solutionRoutes: MetadataRoute.Sitemap = solutionsData.map((s) => ({
    url: `${SITE_URL}/solutions/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const productRoutes: MetadataRoute.Sitemap = Object.keys(productsData).map((id) => ({
    url: `${SITE_URL}/product/${id}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Articles carry a real `updatedAt`, so their lastmod is meaningful freshness
  // data rather than the build timestamp the other routes fall back to.
  const blogRoutes: MetadataRoute.Sitemap = allPosts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(`${p.updatedAt}T00:00:00Z`),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...solutionRoutes, ...productRoutes, ...blogRoutes];
}
