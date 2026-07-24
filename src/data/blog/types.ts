// Blog content model.
//
// Articles are typed TS data rather than MDX so that (a) every word is present
// in the server HTML with no client-side markdown runtime, and (b) TS strict
// catches a malformed article at build time instead of at request time.
//
// Prose supports inline links with markdown link syntax — `[label](/solutions/logistics)`
// — parsed by `renderInline` in the Blog view. Use it liberally: internal links
// inside body copy are the main way these articles pass authority to the money
// pages (/solutions/*, /product/*, /our-services).

/** A single rendered block of article body content. */
export type Block =
  | { type: 'p'; text: string }
  /** Section heading. `id` becomes the anchor + table-of-contents target. */
  | { type: 'h2'; text: string; id: string }
  | { type: 'h3'; text: string; id: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  /** Pull-quote — used for the one quotable, extractable sentence per article. */
  | { type: 'quote'; text: string }
  /** Highlighted aside: a caveat, a rule of thumb, or a "what we actually do". */
  | { type: 'callout'; title: string; text: string }
  | { type: 'table'; caption: string; head: string[]; rows: string[][] };

export interface BlogFAQ {
  q: string;
  a: string;
}

export type BlogCategory =
  | 'Engineering'
  | 'Buying AI'
  | 'Industry'
  | 'Playbooks';

export interface BlogPost {
  /** URL slug — /blog/{slug} */
  slug: string;
  /** Page H1 */
  title: string;
  /** <title> (brand suffix added by the layout template) — keep ≤60 chars */
  metaTitle: string;
  /** Meta description — keep ≤160 chars, keyword front-loaded */
  metaDescription: string;
  /** One-paragraph summary for the index card, OG description, and RSS */
  excerpt: string;
  /**
   * Answer-first opening line. Always rendered as the first visible paragraph
   * and reused as the schema `description` — this is the sentence an AI engine
   * or featured snippet is most likely to lift, so it must stand alone.
   */
  standfirst: string;
  category: BlogCategory;
  /** ISO date (YYYY-MM-DD) */
  publishedAt: string;
  /** ISO date (YYYY-MM-DD) — same as publishedAt until the piece is revised */
  updatedAt: string;
  /** Rough read time in minutes, derived at build time by `readingMinutes()` */
  tags: string[];
  /** Target queries this piece is written to answer. Feeds `keywords` metadata. */
  keywords: string[];
  body: Block[];
  /** Answer-first Q&A rendered in SSR at the foot of the article. */
  faqs: BlogFAQ[];
  /** Product ids (keys of productsData) to surface as "the work behind this" */
  relatedProductIds: string[];
  /** Solution slugs to cross-link */
  relatedSolutionSlugs: string[];
  /** Other post slugs to cross-link */
  relatedPostSlugs: string[];
}
