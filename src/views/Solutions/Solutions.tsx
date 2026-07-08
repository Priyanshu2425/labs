'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Check } from 'lucide-react';
import styles from './Solutions.module.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { productsData } from '../../data/products';
import { solutionsData, getSolution } from '../../data/solutions';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

/** Single-vertical page: /solutions/[vertical] */
export default function Solutions({ slug }: { slug: string }) {
  const solution = getSolution(slug);
  // page.tsx guards invalid slugs with notFound(); this is a defensive fallback.
  if (!solution) return null;

  const products = solution.productIds
    .map((id) => productsData[id])
    .filter(Boolean);
  const others = solutionsData.filter((s) => s.slug !== slug);

  return (
    <div className={styles.pageWrapper}>
      <Header />

      <main className={styles.mainContent}>
        {/* ── Hero ─────────────────────────────── */}
        <section className={styles.heroSection}>
          <div className={styles.heroGlow} aria-hidden="true" />
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className={styles.heroContent}
            >
              <span className={styles.monoLabel}>{'// solutions'}</span>
              <h1 className={styles.pageTitle}>{solution.h1}</h1>
              <p className={styles.pageSubtitle}>{solution.intro}</p>
              <div className={styles.heroActions}>
                <Link href="/contact-us" className={styles.primaryBtn}>
                  Start a project <ArrowUpRight size={16} />
                </Link>
                <Link href="/solutions" className={styles.secondaryBtn}>
                  All industries
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Capabilities ─────────────────────── */}
        <section className={`container ${styles.capSection}`}>
          <motion.div
            className={styles.sectionHeader}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
          >
            <span className={styles.monoLabel}>{'// what we build'}</span>
            <h2 className={styles.sectionTitle}>What we build in this space</h2>
          </motion.div>

          <motion.ul
            className={styles.capGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
          >
            {solution.capabilities.map((cap, i) => (
              <motion.li key={i} variants={fadeUp} className={styles.capItem}>
                <span className={styles.capIcon} aria-hidden="true"><Check size={13} /></span>
                <span>{cap}</span>
              </motion.li>
            ))}
          </motion.ul>
        </section>

        {/* ── Shipped products in this vertical ── */}
        {products.length > 0 && (
          <section className={`container ${styles.workSection}`}>
            <motion.div
              className={styles.sectionHeader}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeUp}
            >
              <span className={styles.monoLabel}>{'// shipped work'}</span>
              <h2 className={styles.sectionTitle}>Products we&apos;ve shipped here</h2>
              <p className={styles.sectionLede}>
                Real builds from our portfolio in {solution.name}. Every one is a production system, not a concept.
              </p>
            </motion.div>

            <motion.div
              className={styles.workGrid}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={stagger}
            >
              {products.map((p) => {
                const cover = p.coverImage?.src ?? p.gallery?.[0]?.src;
                const coverAlt = p.coverImage?.alt ?? p.gallery?.[0]?.alt ?? p.title;
                return (
                  <motion.div key={p.id} variants={fadeUp}>
                    <Link href={`/product/${p.id}`} className={styles.workCard}>
                      {cover && (
                        <div className={styles.workCardMedia}>
                          <Image
                            src={cover}
                            alt={coverAlt}
                            fill
                            sizes="(max-width: 768px) 100vw, 380px"
                            className={styles.workCardImg}
                          />
                        </div>
                      )}
                      <div className={styles.workCardBody}>
                        <h3 className={styles.workCardTitle}>{p.title}</h3>
                        <p className={styles.workCardText}>{p.subtitle}</p>
                        <div className={styles.workCardFooter}>
                          <span className={styles.workCardCat}>{p.categories[0]}</span>
                          <ArrowUpRight size={16} className={styles.workCardArrow} />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </section>
        )}

        {/* ── Cross-links to other verticals ───── */}
        <section className={`container ${styles.moreSection}`}>
          <h2 className={styles.moreTitle}>Other industries we build for</h2>
          <div className={styles.moreGrid}>
            {others.map((s) => (
              <Link key={s.slug} href={`/solutions/${s.slug}`} className={styles.moreCard}>
                <span className={styles.moreName}>{s.name}</span>
                <ArrowUpRight size={15} className={styles.moreArrow} />
              </Link>
            ))}
          </div>
        </section>

        {/* ── CTA ──────────────────────────────── */}
        <section className={`container ${styles.ctaSection}`}>
          <motion.div
            className={styles.ctaInner}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
          >
            <h2 className={styles.ctaTitle}>Have a project in this space?</h2>
            <p className={styles.ctaText}>
              Tell us where you are in a sentence or two. We&apos;ll tell you honestly whether we&apos;re the right team — and how fast we can ship.
            </p>
            <Link href="/contact-us" className={styles.ctaBtn}>
              Start the conversation <ArrowUpRight size={16} />
            </Link>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

/** Hub page: /solutions */
export function SolutionsIndex() {
  return (
    <div className={styles.pageWrapper}>
      <Header />

      <main className={styles.mainContent}>
        <section className={styles.heroSection}>
          <div className={styles.heroGlow} aria-hidden="true" />
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className={styles.heroContent}
            >
              <span className={styles.monoLabel}>{'// solutions'}</span>
              <h1 className={styles.pageTitle}>AI solutions by industry</h1>
              <p className={styles.pageSubtitle}>
                BuildspaceLabs builds custom AI and production software across the industries where we&apos;ve shipped.
                Pick your space to see what we build and the real products behind it.
              </p>
            </motion.div>
          </div>
        </section>

        <section className={`container ${styles.indexSection}`}>
          <motion.div
            className={styles.indexGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
          >
            {solutionsData.map((s) => (
              <motion.div key={s.slug} variants={fadeUp}>
                <Link href={`/solutions/${s.slug}`} className={styles.indexCard}>
                  <div className={styles.indexCardMedia}>
                    <Image
                      src={s.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className={styles.indexCardImg}
                    />
                  </div>
                  <div className={styles.indexCardBody}>
                    <span className={styles.monoLabel}>{`// ${s.slug}`}</span>
                    <h2 className={styles.indexCardTitle}>{s.name}</h2>
                    <p className={styles.indexCardText}>{s.lead}</p>
                    <span className={styles.indexCardCta}>
                      Explore <ArrowUpRight size={15} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className={`container ${styles.ctaSection}`}>
          <motion.div
            className={styles.ctaInner}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
          >
            <h2 className={styles.ctaTitle}>Don&apos;t see your industry?</h2>
            <p className={styles.ctaText}>
              We build AI products end-to-end, whatever the domain. Tell us the problem — we&apos;ll tell you honestly whether we&apos;re the right team.
            </p>
            <Link href="/contact-us" className={styles.ctaBtn}>
              Start the conversation <ArrowUpRight size={16} />
            </Link>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
