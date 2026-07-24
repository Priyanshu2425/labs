import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import styles from './Blog.module.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { productsData } from '../../data/products';
import { getSolution } from '../../data/solutions';
import {
  getRelatedPosts,
  readingMinutes,
  tableOfContents,
  formatPostDate,
  type BlogPost,
  type Block,
} from '../../data/blog';
import { renderInline } from './renderInline';

/**
 * Article page. Deliberately a SERVER component with no scroll-reveal animation
 * on the body: article prose is the thing search and AI crawlers are here for,
 * so it ships as plain server HTML at full opacity rather than behind a
 * motion wrapper. Motion is reserved for the index cards.
 */
export default function BlogPostView({ post }: { post: BlogPost }) {
  const toc = tableOfContents(post);
  const related = getRelatedPosts(post);
  const products = post.relatedProductIds
    .map((id) => productsData[id])
    .filter(Boolean);
  const solutions = post.relatedSolutionSlugs
    .map((slug) => getSolution(slug))
    .filter((s): s is NonNullable<ReturnType<typeof getSolution>> => Boolean(s));

  return (
    <div className={styles.pageWrapper}>
      <Header />

      <main className={styles.mainContent}>
        <article>
          {/* ── Article header ─────────────────── */}
          <header className={styles.postHero}>
            <div className={styles.heroGlow} aria-hidden="true" />
            <div className="container">
              <div className={styles.postHeroInner}>
                <Link href="/blog" className={styles.backLink}>
                  <ArrowLeft size={14} /> All articles
                </Link>
                <span className={styles.monoLabel}>{`// ${post.category.toLowerCase()}`}</span>
                <h1 className={styles.postTitle}>{post.title}</h1>
                <p className={styles.standfirst}>{post.standfirst}</p>
                <div className={styles.postMeta}>
                  <span>BuildspaceLabs</span>
                  <span aria-hidden="true">·</span>
                  <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
                  <span aria-hidden="true">·</span>
                  <span>{readingMinutes(post)} min read</span>
                </div>
              </div>
            </div>
          </header>

          <div className={`container ${styles.postLayout}`}>
            {/* ── Table of contents ────────────── */}
            {toc.length > 2 && (
              <aside className={styles.toc} aria-label="On this page">
                <p className={styles.tocTitle}>On this page</p>
                <ol className={styles.tocList}>
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`}>{item.text}</a>
                    </li>
                  ))}
                </ol>
              </aside>
            )}

            {/* ── Body ─────────────────────────── */}
            <div className={styles.prose}>
              {post.body.map((block, i) => (
                <BlockRenderer key={i} block={block} />
              ))}

              {/* ── Article FAQ ────────────────── */}
              {post.faqs.length > 0 && (
                <section className={styles.faqBlock} aria-labelledby="article-faq">
                  <h2 id="article-faq" className={styles.faqHeading}>
                    Frequently asked questions
                  </h2>
                  {post.faqs.map((f, i) => (
                    <div key={i} className={styles.faqItem}>
                      <h3 className={styles.faqQ}>{f.q}</h3>
                      <p className={styles.faqA}>{f.a}</p>
                    </div>
                  ))}
                </section>
              )}

              {/* ── Tags ───────────────────────── */}
              <ul className={styles.tagList} aria-label="Topics">
                {post.tags.map((t) => (
                  <li key={t} className={styles.tag}>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── The work behind the writing ──── */}
          {products.length > 0 && (
            <section className={`container ${styles.workSection}`}>
              <span className={styles.monoLabel}>{'// shipped work'}</span>
              <h2 className={styles.sectionTitle}>The systems behind this article</h2>
              <p className={styles.sectionLede}>
                Production builds from our portfolio that this piece draws on.
              </p>
              <div className={styles.workGrid}>
                {products.map((p) => {
                  const cover = p.coverImage?.src ?? p.gallery?.[0]?.src;
                  const coverAlt = p.coverImage?.alt ?? p.gallery?.[0]?.alt ?? p.title;
                  return (
                    <Link key={p.id} href={`/product/${p.id}`} className={styles.workCard}>
                      {cover && (
                        <div className={styles.workCardMedia}>
                          <Image
                            src={cover}
                            alt={coverAlt}
                            fill
                            sizes="(max-width: 768px) 100vw, 340px"
                            className={styles.workCardImg}
                          />
                        </div>
                      )}
                      <div className={styles.workCardBody}>
                        <h3 className={styles.workCardTitle}>{p.title}</h3>
                        <p className={styles.workCardText}>{p.subtitle}</p>
                        <span className={styles.workCardCat}>{p.categories[0]}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* ── Cross-links ───────────────────── */}
          {(solutions.length > 0 || related.length > 0) && (
            <section className={`container ${styles.moreSection}`}>
              {solutions.length > 0 && (
                <div className={styles.moreBlock}>
                  <h2 className={styles.moreTitle}>Industries this applies to</h2>
                  <div className={styles.moreGrid}>
                    {solutions.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/solutions/${s.slug}`}
                        className={styles.moreCard}
                      >
                        <span className={styles.moreName}>{s.name}</span>
                        <ArrowUpRight size={15} className={styles.moreArrow} />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {related.length > 0 && (
                <div className={styles.moreBlock}>
                  <h2 className={styles.moreTitle}>Read next</h2>
                  <div className={styles.relatedGrid}>
                    {related.map((r) => (
                      <Link key={r.slug} href={`/blog/${r.slug}`} className={styles.relatedCard}>
                        <span className={styles.relatedCat}>{r.category}</span>
                        <h3 className={styles.relatedTitle}>{r.title}</h3>
                        <p className={styles.relatedText}>{r.excerpt}</p>
                        <span className={styles.relatedCta}>
                          Read <ArrowUpRight size={14} />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* ── CTA ───────────────────────────── */}
          <section className={`container ${styles.ctaSection}`}>
            <div className={styles.ctaInner}>
              <h2 className={styles.ctaTitle}>Working on something in this space?</h2>
              <p className={styles.ctaText}>
                Tell us where you are in a sentence or two. We&apos;ll tell you honestly whether
                we&apos;re the right team — and how fast we can ship.
              </p>
              <Link href="/contact-us" className={styles.ctaBtn}>
                Start the conversation <ArrowUpRight size={16} />
              </Link>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}

function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case 'p':
      return <p>{renderInline(block.text)}</p>;
    case 'h2':
      return (
        <h2 id={block.id} className={styles.h2}>
          {block.text}
        </h2>
      );
    case 'h3':
      return (
        <h3 id={block.id} className={styles.h3}>
          {block.text}
        </h3>
      );
    case 'ul':
      return (
        <ul>
          {block.items.map((item, i) => (
            <li key={i}>{renderInline(item)}</li>
          ))}
        </ul>
      );
    case 'ol':
      return (
        <ol>
          {block.items.map((item, i) => (
            <li key={i}>{renderInline(item)}</li>
          ))}
        </ol>
      );
    case 'quote':
      return (
        <blockquote className={styles.quote}>
          <p>{renderInline(block.text)}</p>
        </blockquote>
      );
    case 'callout':
      return (
        <aside className={styles.callout}>
          <p className={styles.calloutTitle}>{block.title}</p>
          <p className={styles.calloutText}>{renderInline(block.text)}</p>
        </aside>
      );
    case 'table':
      return (
        <figure className={styles.tableWrap}>
          <div className={styles.tableScroll}>
            <table className={styles.table}>
              <thead>
                <tr>
                  {block.head.map((h, i) => (
                    <th key={i} scope="col">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) =>
                      j === 0 ? (
                        <th key={j} scope="row">
                          {cell}
                        </th>
                      ) : (
                        <td key={j}>{cell}</td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <figcaption className={styles.tableCaption}>{block.caption}</figcaption>
        </figure>
      );
  }
}
