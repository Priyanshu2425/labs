import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SolutionsClient from '@/views/Solutions/Solutions';
import { productsData } from '@/data/products';
import { getSolution, solutionSlugs } from '@/data/solutions';
import {
  JsonLd,
  breadcrumbSchema,
  servicesSchema,
  itemListSchema,
  faqSchema,
  SITE_URL,
} from '@/lib/seo/jsonLd';

interface Props {
  params: Promise<{ vertical: string }>;
}

/** Pre-build every vertical page as static HTML at build time */
export async function generateStaticParams() {
  return solutionSlugs.map((vertical) => ({ vertical }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { vertical } = await params;
  const solution = getSolution(vertical);

  if (!solution) {
    return { title: 'Solution Not Found', robots: { index: false, follow: false } };
  }

  const url = `${SITE_URL}/solutions/${solution.slug}`;
  return {
    title: solution.metaTitle,
    description: solution.metaDescription,
    alternates: { canonical: `/solutions/${solution.slug}` },
    openGraph: {
      title: `${solution.h1} | BuildspaceLabs`,
      description: solution.lead,
      url,
      type: 'website',
      locale: 'en_IN',
      siteName: 'BuildspaceLabs',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${solution.h1} | BuildspaceLabs`,
      description: solution.lead,
    },
    keywords: [
      solution.h1,
      `AI for ${solution.name}`,
      ...solution.name.split(/[&,]/).map((s) => s.trim()),
      'BuildspaceLabs',
      'custom AI development',
    ],
  };
}

export default async function SolutionPage({ params }: Props) {
  const { vertical } = await params;
  const solution = getSolution(vertical);

  if (!solution) notFound();

  const products = solution.productIds
    .map((id) => productsData[id])
    .filter(Boolean);
  const url = `${SITE_URL}/solutions/${solution.slug}`;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Solutions', url: `${SITE_URL}/solutions` },
          { name: solution.name, url },
        ])}
      />
      <JsonLd
        data={servicesSchema([{ name: solution.h1, url, description: solution.intro }])}
      />
      {products.length > 0 && (
        <JsonLd
          data={itemListSchema(
            products.map((p) => ({
              name: p.title,
              url: `${SITE_URL}/product/${p.id}`,
              description: p.subtitle,
            })),
            `${solution.name} products by BuildspaceLabs`,
          )}
        />
      )}
      {solution.faqs.length > 0 && (
        <JsonLd
          data={faqSchema([
            { category: solution.name, description: solution.lead, questions: solution.faqs },
          ])}
        />
      )}
      <SolutionsClient slug={solution.slug} />
    </>
  );
}
