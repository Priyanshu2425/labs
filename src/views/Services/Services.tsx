'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import styles from './Services.module.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductCard from '../../components/ProductCard';

type Service = {
  letter: string;
  accent: string;
  tag: string;
  title: string;
  tagline: string;
  bullets: string[];
  ctaLabel: string;
  cta: string;
  hasGrid?: boolean;
};

const services: Service[] = [
  {
    letter: 'A',
    accent: '#ba9eff',
    tag: 'Custom build',
    title: 'Custom software, built end-to-end.',
    tagline: 'When you have a problem and want a senior team to architect, build, and ship the answer.',
    bullets: [
      'Tightly scoped engagements that produce a working prototype inside the first sprint.',
      'A small senior team — engineering, product, design — owning the build through to production.',
      'Architecture, infra, and deployment handled. We hand over what we ship; nothing under the hood is a black box.',
    ],
    ctaLabel: 'Tell us about your project',
    cta: '/contact-us',
  },
  {
    letter: 'B',
    accent: '#53ddfc',
    tag: 'Productised modules',
    title: 'Production-ready AI modules you can deploy.',
    tagline: 'When the problem is well-known and you want a sharp solution dropped into your stack.',
    bullets: [
      'A library of modular AI products we have already shipped and hardened across clients.',
      'Configurable, integrated, and brand-able — typically up and running inside a week, not a quarter.',
      'You get the working system, the source, and a senior engineer alongside you for the rollout.',
    ],
    ctaLabel: 'Browse the modules',
    cta: '#modules',
    hasGrid: true,
  },
  {
    letter: 'C',
    accent: '#6bcb77',
    tag: 'Partnership',
    title: 'Fractional CTO and product partner.',
    tagline: "When you're a founder who wants a senior technical co-pilot, not just a vendor.",
    bullets: [
      'Hands-on technical leadership across architecture, hiring, and ship cadence.',
      'Engagements structured around build cost plus equity or revenue share — incentives aligned.',
      'A small senior team behind the lead, so the strategy ships and the team grows with the work.',
    ],
    ctaLabel: 'Start the conversation',
    cta: '/contact-us',
  },
];

const products = [
  { title: "AI Medical Scribe", description: "Doctors talk, notes write themselves. Cut documentation time by 80%.", category: "Healthcare", link: "/product/sanad" },
  { title: "Clinic Management", description: "Patient check-in to follow-up scheduling. One AI system handles everything.", category: "Healthcare", link: "/product/focuscare" },
  { title: "Fleet Tracking & Routing", description: "Know where every vehicle is, optimise routes in real time, manage drivers.", category: "Logistics", link: "/product/dsv-fleet-management" },
  { title: "Location Finder", description: "Help customers find what's nearby, check availability, and get there.", category: "Maps & Discovery", link: "/product/charge-pulse" },
  { title: "Marketplace Platform", description: "Multi-vendor marketplace with order tracking, payments, and settlements.", category: "Marketplace", link: "/product/food-ordering-platform" },
  { title: "Jobsite Safety Monitor", description: "Catch safety violations before incidents. On-prem, no cloud required.", category: "Safety & Compliance", link: "/product/open-vision-ppe" },
  { title: "Production Management", description: "Automated planning, quality checks, and real-time factory floor visibility.", category: "Manufacturing", link: "/product/factory-os" },
  { title: "Lease Management", description: "Extract key terms from leases, track obligations, manage payments instantly.", category: "Real Estate", link: "/product/grospace" },
  { title: "Deal Sourcing & Underwriting", description: "AI finds deals, runs numbers, drafts outreach and structures offers.", category: "Real Estate", link: "/product/ai-native-real-estate-fund" },
  { title: "Job Application Autopilot", description: "Apply to hundreds of jobs automatically across Lever, Greenhouse, Workday.", category: "HR & Recruiting", link: "/product/ai-job-automation" },
];

export default function Services() {
  const [showSolutions, setShowSolutions] = useState(false);

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className={styles.pageWrapper}>
      <Header />

      <main className={styles.mainContent}>
        {/* ── Hero ───────────────────────────────── */}
        <section className={styles.heroSection}>
          <div className={styles.heroGlow} aria-hidden="true" />
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className={styles.heroContent}
            >
              <span className={styles.monoLabel}>{'// services'}</span>
              <h1 className={styles.pageTitle}>
                Three ways<br />
                <span className={styles.gradientText}>we work with you.</span>
              </h1>
              <p className={styles.pageSubtitle}>
                Pick the engagement that matches the moment. Same senior team behind all three.
              </p>
              <ul className={styles.heroJump} aria-label="Service options">
                {services.map((svc, i) => (
                  <li key={svc.letter}>
                    <a href={`#service-${svc.letter}`} style={{ '--svc-accent': svc.accent } as React.CSSProperties}>
                      <span className={styles.heroJumpLetter}>{svc.letter}</span>
                      <span className={styles.heroJumpTag}>{svc.tag}</span>
                    </a>
                    {i < services.length - 1 && <span className={styles.heroJumpDivider} aria-hidden="true" />}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* ── Service Cards (sticky stack) ────── */}
        <div className={styles.cardsStack}>
          {services.map((svc, idx) => (
            <section
              key={svc.letter}
              id={`service-${svc.letter}`}
              className={`container ${styles.serviceBlock}`}
              style={{ top: 80 + idx * 24, position: 'sticky', zIndex: idx + 10 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className={styles.cardContainer}
                style={{ '--svc-accent': svc.accent } as React.CSSProperties}
              >
                <div className={styles.cardHead}>
                  <span className={styles.cardLetter}>{svc.letter}</span>
                  <span className={styles.cardTag}>{svc.tag}</span>
                </div>

                <h2 className={styles.blockTitle}>{svc.title}</h2>
                <p className={styles.blockTagline}>{svc.tagline}</p>

                <ul className={styles.bulletList}>
                  {svc.bullets.map((text, i) => (
                    <li key={i}>
                      <span className={styles.bulletMarker} style={{ background: svc.accent }} aria-hidden="true" />
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>

                <div className={styles.buttonGroup}>
                  {svc.hasGrid ? (
                    <button
                      className={styles.toggleBtn}
                      onClick={() => setShowSolutions(!showSolutions)}
                      aria-expanded={showSolutions}
                    >
                      {showSolutions ? 'Hide modules' : svc.ctaLabel}
                      {showSolutions ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  ) : (
                    <Link href={svc.cta} className={styles.ctaLink}>
                      {svc.ctaLabel}
                      <ArrowUpRight size={16} />
                    </Link>
                  )}
                </div>

                {svc.hasGrid && (
                  <AnimatePresence>
                    {showSolutions && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: '3rem' }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.4 }}
                        className={styles.productsGridWrapper}
                      >
                        <div className={styles.productsGridHeader}>
                          <ArrowRight size={14} className={styles.productsGridArrow} />
                          <span>{products.length} modules ready to deploy</span>
                        </div>
                        <motion.div
                          initial="hidden"
                          animate="visible"
                          variants={staggerContainer}
                          className={styles.productsGrid}
                        >
                          {products.map((product, i) => (
                            <motion.div key={i} variants={fadeUp}>
                              <ProductCard {...product} />
                            </motion.div>
                          ))}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </motion.div>
            </section>
          ))}
        </div>

        <div style={{ height: '60vh' }} aria-hidden="true" />
      </main>

      <Footer />
    </div>
  );
}
