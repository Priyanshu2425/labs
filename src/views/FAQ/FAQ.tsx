'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Search, X } from 'lucide-react';
import styles from './FAQ.module.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Accordion from '../../components/Accordion';
import { faqs } from '@/data/faq';

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export default function FAQ() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>(faqs[0]?.category ?? '');
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // Filtered categories: hide questions that don't match query, then hide categories
  // that have zero matches. Empty query = full list.
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return faqs;
    return faqs
      .map((cat) => ({
        ...cat,
        questions: cat.questions.filter(
          (item) => item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)
        ),
      }))
      .filter((cat) => cat.questions.length > 0);
  }, [query]);

  const totalMatches = useMemo(
    () => filtered.reduce((sum, c) => sum + c.questions.length, 0),
    [filtered]
  );

  // Scroll-spy: track which category section is in view to highlight the matching jump pill.
  useEffect(() => {
    if (query) return; // disable scroll-spy while filtering
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        // Pick the entry closest to the top of the viewport.
        const top = visible.sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
        )[0];
        const cat = top.target.getAttribute('data-category');
        if (cat) setActiveCategory(cat);
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: 0 }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [query]);

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <div className={styles.glowBackground} />

      <main className={styles.mainContent}>
        {/* Hero */}
        <section className={`container ${styles.headerSection}`}>
          <motion.div
            className={styles.heroContent}
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.span variants={fadeIn} className={styles.eyebrow}>
              {'// faq'}
            </motion.span>
            <motion.h1 variants={fadeIn} className={styles.pageTitle}>
              The questions we<br />
              <span className={styles.titleHighlight}>get the most.</span>
            </motion.h1>
            <motion.p variants={fadeIn} className={styles.pageSubtitle}>
              Engagement, scope, pricing, and what working with us actually looks like — answered straight, no boilerplate.
            </motion.p>

            {/* Search */}
            <motion.div variants={fadeIn} className={styles.searchRow}>
              <label className={styles.searchField}>
                <Search size={16} className={styles.searchIcon} aria-hidden="true" />
                <input
                  type="search"
                  placeholder="Search questions…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Search FAQ"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className={styles.searchClear}
                    aria-label="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
              </label>

              {/* Category jump pills (hidden while filtering — pills wouldn't match the filtered set cleanly) */}
              {!query && (
                <nav className={styles.jumpNav} aria-label="Jump to category">
                  {faqs.map((cat) => (
                    <a
                      key={cat.category}
                      href={`#${slugify(cat.category)}`}
                      className={`${styles.jumpPill} ${activeCategory === cat.category ? styles.jumpPillActive : ''}`}
                    >
                      {cat.category}
                      <span className={styles.jumpCount}>{cat.questions.length}</span>
                    </a>
                  ))}
                </nav>
              )}

              {/* Result counter when filtering */}
              {query && (
                <p className={styles.searchSummary}>
                  {totalMatches === 0
                    ? 'No matches. Try different terms.'
                    : `${totalMatches} match${totalMatches === 1 ? '' : 'es'}`}
                </p>
              )}
            </motion.div>
          </motion.div>
        </section>

        {/* FAQ Categories */}
        <section className={`container ${styles.faqSection}`}>
          {filtered.length === 0 ? (
            <div className={styles.emptyState}>
              <p>Nothing matches &ldquo;{query}&rdquo;. Try a different phrase, or email us directly.</p>
              <a href="mailto:buildspacelabs@vruoom.com" className={styles.emptyEmail}>
                <Mail size={16} />
                buildspacelabs@vruoom.com
              </a>
            </div>
          ) : (
            <div className={styles.faqWrapper}>
              {filtered.map((categoryGroup) => {
                const id = slugify(categoryGroup.category);
                return (
                  <motion.section
                    key={categoryGroup.category}
                    id={id}
                    data-category={categoryGroup.category}
                    ref={(el) => { sectionRefs.current[categoryGroup.category] = el; }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    variants={fadeIn}
                    className={styles.categoryBlock}
                  >
                    <div className={styles.categoryHeader}>
                      <span className={styles.categoryNumber}>{`0${faqs.findIndex((c) => c.category === categoryGroup.category) + 1}`}</span>
                      <h2 className={styles.categoryTitle}>{categoryGroup.category}</h2>
                      <p className={styles.categoryDesc}>{categoryGroup.description}</p>
                      <span className={styles.categoryCount}>
                        {categoryGroup.questions.length} {categoryGroup.questions.length === 1 ? 'question' : 'questions'}
                      </span>
                    </div>

                    <div className={styles.accordionGroup}>
                      {categoryGroup.questions.map((item, qIndex) => (
                        <motion.div
                          key={item.q}
                          initial={{ opacity: 0, y: 12 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.45, delay: Math.min(qIndex * 0.06, 0.4) }}
                          viewport={{ once: true, margin: '-40px' }}
                        >
                          <Accordion question={item.q} answer={item.a} />
                        </motion.div>
                      ))}
                    </div>
                  </motion.section>
                );
              })}
            </div>
          )}
        </section>

        {/* Contact CTA */}
        <section className={`container ${styles.contactSection}`}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeIn}
            className={styles.contactBox}
          >
            <div>
              <h3 className={styles.contactTitle}>Question we didn&apos;t cover?</h3>
              <p className={styles.contactSub}>
                The fastest path is a short email to the team. We usually answer within a working day.
              </p>
            </div>
            <a href="mailto:buildspacelabs@vruoom.com" className={styles.contactBtn}>
              <Mail size={16} />
              buildspacelabs@vruoom.com
            </a>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
