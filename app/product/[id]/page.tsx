import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { productsData } from '@/data/products';
import ProductClient from '@/pages/Product/Product';

interface Props {
  params: Promise<{ id: string }>;
}

/** Pre-build all product pages as static HTML at build time */
export async function generateStaticParams() {
  return Object.keys(productsData).map((id) => ({ id }));
}

/** Per-product SEO metadata */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = productsData[id];

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  const techStackStr = product.techStack.join(', ');
  const categoriesStr = product.categories.join(', ');

  return {
    title: `${product.title} — ${categoriesStr}`,
    description: `${product.subtitle} Tech stack: ${techStackStr}. Built by DIMSSU Labs for ${product.client}.`,
    openGraph: {
      title: `${product.title} | DIMSSU Labs`,
      description: product.subtitle,
      url: `https://labs.dimssu.ai/product/${id}`,
    },
    keywords: [
      product.title,
      ...product.categories,
      ...product.techStack,
      product.client,
      'DIMSSU Labs',
      'AI product',
    ],
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = productsData[id];

  if (!product) {
    notFound();
  }

  return <ProductClient productId={id} />;
}
