import type { BlogPost, Block } from './types';

import { post as whatIsAnAiNativeProductStudio } from './posts/what-is-an-ai-native-product-studio';
import { post as aiStudioVsAgencyVsConsultancy } from './posts/ai-studio-vs-agency-vs-consultancy';
import { post as choosingAnAiDevelopmentPartner } from './posts/choosing-an-ai-development-partner';
import { post as scopingAnAiProject } from './posts/scoping-an-ai-project';
import { post as aiPocToProduction } from './posts/ai-poc-to-production';
import { post as aiAgentsInProduction } from './posts/ai-agents-in-production';
import { post as ragVsFineTuning } from './posts/rag-vs-fine-tuning';
import { post as llmEvaluationInPractice } from './posts/llm-evaluation-in-practice';
import { post as privateLlmDeployment } from './posts/private-llm-deployment';
import { post as aiForHealthcareOperations } from './posts/ai-for-healthcare-operations';
import { post as aiForCustomerSupport } from './posts/ai-for-customer-support';
import { post as aiInLogisticsOperations } from './posts/ai-in-logistics-operations';
import { post as computerVisionIndustrialSafety } from './posts/computer-vision-industrial-safety';

export type { BlogPost, Block, BlogFAQ, BlogCategory } from './types';

/**
 * Registry order is editorial (pillar pieces first). `allPosts` re-sorts by
 * date for listing surfaces; use `blogPosts` when you want the curated order.
 */
export const blogPosts: BlogPost[] = [
  whatIsAnAiNativeProductStudio,
  aiStudioVsAgencyVsConsultancy,
  choosingAnAiDevelopmentPartner,
  scopingAnAiProject,
  aiPocToProduction,
  aiAgentsInProduction,
  ragVsFineTuning,
  llmEvaluationInPractice,
  privateLlmDeployment,
  aiForHealthcareOperations,
  aiForCustomerSupport,
  aiInLogisticsOperations,
  computerVisionIndustrialSafety,
];

/** Newest first, then by title so the order is stable across builds. */
export const allPosts: BlogPost[] = [...blogPosts].sort((a, b) =>
  a.publishedAt === b.publishedAt
    ? a.title.localeCompare(b.title)
    : b.publishedAt.localeCompare(a.publishedAt),
);

export const postSlugs: string[] = blogPosts.map((p) => p.slug);

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

/**
 * Explicit `relatedPostSlugs` first, topped up with same-category posts so an
 * article always has somewhere to send the reader. Never returns the post itself.
 */
export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const explicit = post.relatedPostSlugs
    .map((slug) => getPost(slug))
    .filter((p): p is BlogPost => Boolean(p) && p!.slug !== post.slug);

  const seen = new Set(explicit.map((p) => p.slug));
  const sameCategory = allPosts.filter(
    (p) => p.category === post.category && p.slug !== post.slug && !seen.has(p.slug),
  );

  return [...explicit, ...sameCategory].slice(0, limit);
}

export const blogCategories = [
  'Buying AI',
  'Engineering',
  'Playbooks',
  'Industry',
] as const;

/**
 * Read time from the article body. Counts prose in every block type — a piece
 * that is mostly tables and lists would otherwise report as a 1-minute read.
 */
export function readingMinutes(post: BlogPost): number {
  const words = post.body.reduce((total, block) => total + countWords(block), 0);
  return Math.max(1, Math.round(words / 220));
}

function countWords(block: Block): number {
  const count = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;
  switch (block.type) {
    case 'p':
    case 'h2':
    case 'h3':
    case 'quote':
      return count(block.text);
    case 'ul':
    case 'ol':
      return block.items.reduce((n, i) => n + count(i), 0);
    case 'callout':
      return count(block.title) + count(block.text);
    case 'table':
      return (
        count(block.caption) +
        block.head.reduce((n, h) => n + count(h), 0) +
        block.rows.reduce((n, r) => n + r.reduce((m, c) => m + count(c), 0), 0)
      );
  }
}

/** Section headings, for the in-article table of contents. */
export function tableOfContents(post: BlogPost): { id: string; text: string }[] {
  return post.body
    .filter((b): b is Extract<Block, { type: 'h2' }> => b.type === 'h2')
    .map((b) => ({ id: b.id, text: b.text }));
}

/** "25 July 2026" — stable across locales, since the build machine's may differ. */
export function formatPostDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  return `${d} ${months[m - 1]} ${y}`;
}
