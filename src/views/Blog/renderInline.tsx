import Link from 'next/link';
import type { ReactNode } from 'react';

/**
 * Renders article prose, converting markdown-style links — `[label](/solutions/logistics)`
 * — into real anchors. Internal paths go through next/link so they prefetch and
 * behave like the rest of the app; anything with a scheme is treated as external
 * and gets rel="noopener".
 *
 * Deliberately minimal: this is not a markdown parser. Article bodies are typed
 * data (see `src/data/blog/types.ts`), so the only inline syntax we support is
 * the one that matters for SEO — links.
 */
const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;

export function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;

  // `matchAll` needs the global flag; reuse a fresh regex per call so the
  // shared lastIndex on the module-level literal can't leak between calls.
  for (const match of text.matchAll(new RegExp(LINK_RE.source, 'g'))) {
    const [full, label, href] = match;
    const start = match.index ?? 0;

    if (start > lastIndex) nodes.push(text.slice(lastIndex, start));

    if (href.startsWith('/')) {
      nodes.push(
        <Link key={`l${key++}`} href={href}>
          {label}
        </Link>,
      );
    } else {
      nodes.push(
        <a key={`l${key++}`} href={href} rel="noopener noreferrer" target="_blank">
          {label}
        </a>,
      );
    }

    lastIndex = start + full.length;
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

/** Strips link syntax — for schema fields, meta descriptions, and RSS. */
export function stripInline(text: string): string {
  return text.replace(new RegExp(LINK_RE.source, 'g'), '$1');
}
