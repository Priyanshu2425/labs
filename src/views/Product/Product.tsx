'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, ArrowUpRight, Activity, Tag, Users } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './Product.module.scss';
import { productsData } from '../../data/products';

interface ProductProps {
  productId: string;
}

export default function Product({ productId }: ProductProps) {
  const product = productsData[productId];

  if (!product) {
    return null;
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65 } }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

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
                  {product.status}
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

        {/* ── Overview ─────────────────────────── */}
        <section className={`container ${styles.contentSection}`}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
            className={styles.twoCol}
          >
            <div className={styles.stickyLabel}>
              <span className={styles.sectionNumber}>01</span>
              <h2 className={styles.sectionTitle}>Overview</h2>
            </div>
            <div>
              <p className={styles.bodyText}>{product.overview}</p>
            </div>
          </motion.div>
        </section>

        {/* ── Tech Stack ───────────────────────── */}
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
                <span className={styles.sectionNumber}>02</span>
                <h2 className={styles.sectionTitle}>Tech Stack</h2>
              </div>
              <div className={styles.techGrid}>
                {product.techStack.map((tech, i) => (
                  <span key={i} className={styles.techChip}>{tech}</span>
                ))}
              </div>
            </motion.div>
          </section>
        )}

        {/* ── Features ─────────────────────────── */}
        <section className={`container ${styles.contentSection}`}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className={styles.twoCol}
          >
            <div className={styles.stickyLabel}>
              <span className={styles.sectionNumber}>03</span>
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

        {/* ── CTA ──────────────────────────────── */}
        <section className={`container ${styles.ctaSection}`}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
            className={styles.ctaBox}
          >
            <div className={styles.ctaGlow} />
            <p className={styles.ctaEyebrow}>Interested?</p>
            <h2 className={styles.ctaTitle}>Let&apos;s deploy {product.title} for you.</h2>
            <p className={styles.ctaSubtitle}>
              Production-ready. We can have it live in your stack within 72 hours.
            </p>
            <div className={styles.ctaActions}>
              <Link href="/contact-us" className={styles.ctaLink}>
                Get in Touch <ArrowUpRight size={16} />
              </Link>
              <Link href="/portfolio" className={styles.ctaSecondary}>
                View More Projects <ArrowUpRight size={16} />
              </Link>
            </div>
          </motion.div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
