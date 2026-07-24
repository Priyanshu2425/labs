import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import styles from './Blog.module.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {
  allPosts,
  blogPosts,
  blogCategories,
  readingMinutes,
  formatPostDate,
} from '../../data/blog';

/**
 * /blog hub. Server component: every article title, excerpt, and link is in the
 * server HTML, and the sections are grouped by category rather than filtered
 * client-side so a crawler sees the full index without running anything.
 */
export default function BlogIndex() {
  // Lead slot follows the curated registry order (pillar piece first), not the
  // date sort — every article currently shares a publish date, so `allPosts`
  // would otherwise lead alphabetically.
  const lead = blogPosts[0];
  const rest = allPosts.filter((p) => p.slug !== lead.slug);

  return (
    <div className={styles.pageWrapper}>
      <Header />

      <main className={styles.mainContent}>
        <section className={styles.indexHero}>
          <div className={styles.heroGlow} aria-hidden="true" />
          <div className="container">
            <div className={styles.postHeroInner}>
              <span className={styles.monoLabel}>{'// writing'}</span>
              <h1 className={styles.postTitle}>Notes from the build</h1>
              <p className={styles.standfirst}>
                Practical writing on building AI products that survive production — how to scope
                them, how to evaluate them, what breaks, and what the work actually looks like
                inside each industry we ship in.
              </p>
            </div>
          </div>
        </section>

        {/* ── Lead article ───────────────────── */}
        {lead && (
          <section className={`container ${styles.leadSection}`}>
            <Link href={`/blog/${lead.slug}`} className={styles.leadCard}>
              <span className={styles.relatedCat}>{lead.category}</span>
              <h2 className={styles.leadTitle}>{lead.title}</h2>
              <p className={styles.leadText}>{lead.excerpt}</p>
              <div className={styles.postMeta}>
                <time dateTime={lead.publishedAt}>{formatPostDate(lead.publishedAt)}</time>
                <span aria-hidden="true">·</span>
                <span>{readingMinutes(lead)} min read</span>
              </div>
              <span className={styles.relatedCta}>
                Read the article <ArrowUpRight size={15} />
              </span>
            </Link>
          </section>
        )}

        {/* ── Everything else, grouped by category ── */}
        {blogCategories.map((category) => {
          const posts = rest.filter((p) => p.category === category);
          if (posts.length === 0) return null;

          return (
            <section key={category} className={`container ${styles.catSection}`}>
              <span className={styles.monoLabel}>{`// ${category.toLowerCase()}`}</span>
              <h2 className={styles.sectionTitle}>{category}</h2>

              <div className={styles.indexGrid}>
                {posts.map((p) => (
                  <Link key={p.slug} href={`/blog/${p.slug}`} className={styles.indexCard}>
                    <h3 className={styles.indexCardTitle}>{p.title}</h3>
                    <p className={styles.indexCardText}>{p.excerpt}</p>
                    <div className={styles.indexCardFooter}>
                      <span>{readingMinutes(p)} min read</span>
                      <ArrowUpRight size={15} className={styles.moreArrow} />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        <section className={`container ${styles.ctaSection}`}>
          <div className={styles.ctaInner}>
            <h2 className={styles.ctaTitle}>Have a problem worth writing about?</h2>
            <p className={styles.ctaText}>
              Most of these came out of real builds. Tell us what you&apos;re working on and
              we&apos;ll tell you honestly whether we&apos;re the right team.
            </p>
            <Link href="/contact-us" className={styles.ctaBtn}>
              Start the conversation <ArrowUpRight size={16} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
