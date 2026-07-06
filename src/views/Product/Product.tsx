'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, ArrowUpRight, Activity, Tag, Users, TrendingUp, Calendar, Clock } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './Product.module.scss';
import { productsData, landingUrlFor } from '../../data/products';

interface ProductProps {
  productId: string;
}

// Group a flat tech list into layers so the breadth of the stack reads at a glance.
const TECH_GROUPS: { label: string; test: RegExp }[] = [
  { label: 'AI & ML', test: /gpt|whisper|yolo|xgboost|\bllm\b|gemini|embedding|ocr|bytetrack|insightface|vision|\bml\b|model/i },
  { label: 'Frontend & Mobile', test: /next\.?js|react|flutter|tailwind|framer|typescript|radix|recharts|mobile/i },
  { label: 'Data & Infrastructure', test: /postgre|firebase|sqlite|supabase|stripe|mapbox|bigquery|vercel|prisma|redis|dbt|\bs3\b/i },
  { label: 'Backend & APIs', test: /.*/ },
];

function groupTech(stack: string[]): { label: string; items: string[] }[] {
  const buckets = TECH_GROUPS.map((g) => ({ label: g.label, items: [] as string[] }));
  stack.forEach((tech) => {
    const gi = TECH_GROUPS.findIndex((g) => g.test.test(tech));
    buckets[gi === -1 ? buckets.length - 1 : gi].items.push(tech);
  });
  return buckets.filter((b) => b.items.length > 0);
}

const INDUSTRY_COUNT = 8; // matches the "Industries we've transformed" set on the home page

export default function Product({ productId }: ProductProps) {
  const product = productsData[productId];

  if (!product) {
    return null;
  }

  // The standalone marketing landing page we built for this product.
  const landingUrl = landingUrlFor(product.id);

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65 } }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  // Dynamic section numbering — only count sections that will actually render.
  const sectionList: { key: string; title: string }[] = [{ key: 'overview', title: 'Overview' }];
  if (product.highlights && product.highlights.length > 0) sectionList.push({ key: 'highlights', title: 'Highlights' });
  if (product.gallery && product.gallery.length > 0) sectionList.push({ key: 'gallery', title: 'Gallery' });
  if (product.outcomes && product.outcomes.length > 0) sectionList.push({ key: 'outcomes', title: 'Outcomes' });
  if (product.techStack && product.techStack.length > 0) sectionList.push({ key: 'techStack', title: 'Tech Stack' });
  if (product.features && product.features.length > 0) sectionList.push({ key: 'features', title: 'Features' });
  const sectionNum = (key: string) => {
    const idx = sectionList.findIndex(s => s.key === key);
    return idx === -1 ? '' : String(idx + 1).padStart(2, '0');
  };

  // Studio breadth + related work — conveys range across products/industries and links onward.
  const allProducts = Object.values(productsData);
  const productCount = allProducts.length;
  const techCount = new Set(allProducts.flatMap(p => p.techStack ?? [])).size;
  const related = allProducts
    .filter(p => p.id !== product.id)
    .map(p => ({ p, shared: p.categories.some(c => product.categories.includes(c)) ? 1 : 0 }))
    .sort((a, b) => b.shared - a.shared)
    .slice(0, 3)
    .map(x => x.p);

  return (
    <div className={styles.pageWrapper}>
      <Header />

      <main className={styles.mainContent}>

        {/* ── Hero ─────────────────────────────── */}
        <section className={`${styles.heroSection} ${product.coverImage ? styles.heroWithImage : ''}`}>
          {product.coverImage && (
            <div className={styles.heroBackdrop} aria-hidden="true">
              <Image
                src={product.coverImage.src}
                alt=""
                fill
                sizes="100vw"
                className={styles.heroBackdropImage}
                priority
              />
              <div className={styles.heroBackdropFade} />
            </div>
          )}
          <div className={styles.heroGlow} />
          <div className="container">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className={styles.heroInner}
            >
              {/* Back link */}
              <motion.div variants={fadeUp}>
                <Link href="/portfolio" className={styles.backLink}>
                  <ArrowLeft size={15} />
                  Back to Portfolio
                </Link>
              </motion.div>

              {/* Status + categories */}
              <motion.div variants={fadeUp} className={styles.heroBadges}>
                <span className={`${styles.statusBadge} ${product.status === 'live' ? styles.live : styles.prototype}`}>
                  {product.status === 'live' && <Activity size={11} className={styles.blink} />}
                  {product.status === 'live' ? 'Shipped' : product.status}
                </span>
                {product.categories.map(c => (
                  <span key={c} className={styles.categoryBadge}>
                    <Tag size={11} />
                    {c}
                  </span>
                ))}
              </motion.div>

              <motion.span variants={fadeUp} className={styles.monoLabel}>{'// product'}</motion.span>
              <motion.h1 variants={fadeUp} className={styles.pageTitle}>{product.title}</motion.h1>
              <motion.p variants={fadeUp} className={styles.pageSubtitle}>{product.subtitle}</motion.p>

              {/* Client */}
              <motion.div variants={fadeUp} className={styles.clientRow}>
                <Users size={14} className={styles.clientIcon} />
                <span className={styles.clientLabel}>Client:</span>
                <span className={styles.clientName}>{product.client}</span>
              </motion.div>

              {/* Engagement strip */}
              {product.engagement && (
                <motion.div variants={fadeUp} className={styles.engagementStrip}>
                  <div className={styles.engagementItem}>
                    <span className={styles.engagementLabel}><Clock size={11} /> Duration</span>
                    <span className={styles.engagementValue}>{product.engagement.duration}</span>
                  </div>
                  <div className={styles.engagementItem}>
                    <span className={styles.engagementLabel}><Calendar size={11} /> Scope</span>
                    <span className={styles.engagementValue}>{product.engagement.scope}</span>
                  </div>
                  <div className={styles.engagementItem}>
                    <span className={styles.engagementLabel}><Users size={11} /> Team</span>
                    <span className={styles.engagementValue}>{product.engagement.team}</span>
                  </div>
                </motion.div>
              )}

              {product.coverImage?.caption && (
                <motion.p variants={fadeUp} className={styles.heroCaption}>
                  <span className={styles.captionMark}>{'//'}</span> {product.coverImage.caption}
                </motion.p>
              )}
            </motion.div>
          </div>
        </section>

        {/* ── Metrics Bar ──────────────────────── */}
        {product.metrics && product.metrics.length > 0 && (
          <div className={styles.metricsBar}>
            <div className="container">
              <div className={styles.metricsGrid}>
                {product.metrics.map((m, i) => (
                  <div key={i} className={styles.metricItem}>
                    <span className={styles.metricValue}>{m.value}</span>
                    <span className={styles.metricLabel}>{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── 01 Overview ─────────────────────── */}
        <section className={`container ${styles.contentSection}`}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
            className={styles.twoCol}
          >
            <div className={styles.stickyLabel}>
              <span className={styles.sectionNumber}>{sectionNum('overview')}</span>
              <h2 className={styles.sectionTitle}>Overview</h2>
            </div>
            <div>
              <p className={styles.bodyText}>{product.overview}</p>
            </div>
          </motion.div>
        </section>

        {/* ── Highlights ──────────────────────── */}
        {product.highlights && product.highlights.length > 0 && (
          <section className={`container ${styles.contentSection}`}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={stagger}
              className={styles.twoCol}
            >
              <div className={styles.stickyLabel}>
                <span className={styles.sectionNumber}>{sectionNum('highlights')}</span>
                <h2 className={styles.sectionTitle}>Highlights</h2>
              </div>
              <ul className={styles.highlightsList}>
                {product.highlights.map((h, i) => (
                  <motion.li key={i} variants={fadeUp} className={styles.highlightItem}>
                    <span className={styles.highlightDot} aria-hidden="true" />
                    <span>{h}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </section>
        )}

        {/* ── Gallery ─────────────────────────── */}
        {product.gallery && product.gallery.length > 0 && (
          <section className={`container ${styles.contentSection}`}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={stagger}
              className={styles.twoCol}
            >
              <div className={styles.stickyLabel}>
                <span className={styles.sectionNumber}>{sectionNum('gallery')}</span>
                <h2 className={styles.sectionTitle}>Gallery</h2>
              </div>
              <div className={styles.gallery}>
                {product.gallery.map((g, i) => (
                  <motion.figure key={i} variants={fadeUp} className={styles.galleryItem}>
                    <div className={styles.galleryImageWrap}>
                      <Image
                        src={g.src}
                        alt={g.alt}
                        fill
                        sizes="(max-width: 900px) 100vw, 720px"
                        className={styles.galleryImage}
                      />
                    </div>
                    <figcaption className={styles.galleryCaption}>
                      <span className={styles.galleryCaptionMark}>{'//'}</span> {g.caption}
                    </figcaption>
                  </motion.figure>
                ))}
              </div>
            </motion.div>
          </section>
        )}

        {/* ── Outcomes ────────────────────────── */}
        {product.outcomes && product.outcomes.length > 0 && (
          <section className={`container ${styles.contentSection}`}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={stagger}
              className={styles.twoCol}
            >
              <div className={styles.stickyLabel}>
                <span className={styles.sectionNumber}>{sectionNum('outcomes')}</span>
                <h2 className={styles.sectionTitle}>Outcomes</h2>
              </div>
              <ul className={styles.outcomesList}>
                {product.outcomes.map((o, i) => (
                  <motion.li key={i} variants={fadeUp} className={styles.outcomeItem}>
                    <div className={styles.outcomeIcon}>
                      <TrendingUp size={14} />
                    </div>
                    <span>{o}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </section>
        )}

        {/* ── Tech Stack ──────────────────────── */}
        {product.techStack && product.techStack.length > 0 && (
          <section className={`container ${styles.contentSection}`}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeUp}
              className={styles.twoCol}
            >
              <div className={styles.stickyLabel}>
                <span className={styles.sectionNumber}>{sectionNum('techStack')}</span>
                <h2 className={styles.sectionTitle}>Tech Stack</h2>
              </div>
              <div>
                <p className={styles.techIntro}>Chosen per constraint, not per habit — the stack shifts with the problem.</p>
                <div className={styles.techGroups}>
                  {groupTech(product.techStack).map((g) => (
                    <div key={g.label} className={styles.techGroup}>
                      <span className={styles.techGroupLabel}>{g.label}</span>
                      <div className={styles.techGrid}>
                        {g.items.map((tech, i) => (
                          <span key={i} className={styles.techChip}>{tech}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </section>
        )}

        {/* ── Features ────────────────────────── */}
        <section className={`container ${styles.contentSection}`}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className={styles.twoCol}
          >
            <div className={styles.stickyLabel}>
              <span className={styles.sectionNumber}>{sectionNum('features')}</span>
              <h2 className={styles.sectionTitle}>Features</h2>
            </div>
            <ul className={styles.featuresList}>
              {product.features.map((f, i) => (
                <motion.li key={i} variants={fadeUp} className={styles.featureItem}>
                  <div className={styles.checkIcon}>
                    <Check size={14} />
                  </div>
                  <span>{f}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </section>

        {/* ── Live landing page (embedded preview) ─── */}
        <section className={`container ${styles.siteSection}`}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
          >
            <div className={styles.siteHeader}>
              <span className={styles.monoLabel}>{'// live landing page'}</span>
              <h2 className={styles.siteTitle}>See {product.title} as its own site.</h2>
              <p className={styles.siteLede}>
                Beyond the build, we designed and shipped {product.title} a standalone landing page &mdash; its own look, copy and motion. Here&apos;s a live preview; scroll inside it, or open it full-screen.
              </p>
            </div>

            <div className={styles.siteFrame}>
              <div className={styles.siteBar}>
                <span className={styles.siteDots} aria-hidden="true"><i /><i /><i /></span>
                <a href={landingUrl} target="_blank" rel="noopener noreferrer" className={styles.siteUrl}>
                  {landingUrl.replace('https://', '')}
                  <ArrowUpRight size={12} />
                </a>
              </div>
              <div className={styles.siteViewport}>
                <iframe
                  src={landingUrl}
                  title={`${product.title} — live landing page preview`}
                  loading="lazy"
                  className={styles.siteIframe}
                />
              </div>
            </div>

            <div className={styles.siteActions}>
              <a href={landingUrl} target="_blank" rel="noopener noreferrer" className={styles.siteCta}>
                Open the landing page
                <ArrowUpRight size={16} />
              </a>
            </div>
          </motion.div>
        </section>

        {/* ── More from the lab (breadth + related) ─── */}
        <section className={`container ${styles.relatedSection}`}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
            className={styles.relatedHeader}
          >
            <span className={styles.monoLabel}>{'// more from the lab'}</span>
            <h2 className={styles.relatedTitle}>A team that ships across the board.</h2>
            <div className={styles.breadthStats}>
              <div className={styles.breadthStat}>
                <span className={styles.breadthValue}>{productCount}</span>
                <span className={styles.breadthLabel}>products in production</span>
              </div>
              <div className={styles.breadthStat}>
                <span className={styles.breadthValue}>{INDUSTRY_COUNT}</span>
                <span className={styles.breadthLabel}>industries served</span>
              </div>
              <div className={styles.breadthStat}>
                <span className={styles.breadthValue}>{techCount}+</span>
                <span className={styles.breadthLabel}>technologies in play</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className={styles.relatedGrid}
          >
            {related.map((p) => (
              <motion.div key={p.id} variants={fadeUp}>
                <Link href={`/product/${p.id}`} className={styles.relatedCard}>
                  <span className={styles.relatedCat}>{p.categories[0]}</span>
                  <h3 className={styles.relatedCardTitle}>{p.title}</h3>
                  <p className={styles.relatedCardSub}>{p.subtitle}</p>
                  <span className={styles.relatedArrow}>
                    View project <ArrowUpRight size={14} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── CTA ──────────────────────────────── */}
        <section className={`container ${styles.ctaSection}`}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
            className={styles.ctaBox}
          >
            <div className={styles.ctaGlow} aria-hidden="true" />
            <p className={styles.ctaEyebrow}>{'// next'}</p>
            <h2 className={styles.ctaTitle}>Building something in this space?</h2>
            <p className={styles.ctaSubtitle}>
              A 30-minute call is enough for us to understand your situation and tell you whether we&apos;re the right team. Usable version in the first two weeks if we are.
            </p>
            <div className={styles.ctaActions}>
              <Link href="/contact-us" className={styles.ctaLink}>
                Start the conversation
                <ArrowUpRight size={16} />
              </Link>
              <Link href="/portfolio" className={styles.ctaSecondary}>
                See more shipped work
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </motion.div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
