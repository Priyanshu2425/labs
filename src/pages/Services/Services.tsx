'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowUpRight, ChevronDown, ChevronUp,
  Code2, Package2, Users2,
  Zap, CheckCheck, ArrowRight
} from 'lucide-react';
import styles from './Services.module.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductCard from '../../components/ProductCard';

const services = [
  {
    index: "01",
    icon: <Code2 size={22} />,
    accent: "#ba9eff",
    tag: "Custom Build",
    title: "Custom Software Builds",
    tagline: "Your problem, our obsession.",
    bullets: [
      { icon: <Zap size={15} />, text: "Have a specific problem? Budget of $5k? We'll build for it." },
      { icon: <CheckCheck size={15} />, text: "Forward-deployed engineers who own your challenge end-to-end." },
      { icon: <CheckCheck size={15} />, text: "Working prototypes delivered within 24 hours of a clear scope." },
    ],
    cta: "/contact-us",
  },
  {
    index: "02",
    icon: <Package2 size={22} />,
    accent: "#53ddfc",
    tag: "AI Products",
    title: "Ready-to-Deploy AI Products",
    tagline: "Battle-tested. Go live in 72 hours.",
    bullets: [
      { icon: <Zap size={15} />, text: "Plug-and-play, modular solutions built as internal tools or for client projects." },
      { icon: <CheckCheck size={15} />, text: "Production-tested, fully configurable, ready to drop into your stack." },
      { icon: <CheckCheck size={15} />, text: "Skip the build phase entirely. Live within 72 hours." },
    ],
    cta: "/contact-us",
    hasGrid: true,
  },
  {
    index: "03",
    icon: <Users2 size={22} />,
    accent: "#6bcb77",
    tag: "Partnership",
    title: "Fractional CTO",
    tagline: "We grow when you grow.",
    bullets: [
      { icon: <Zap size={15} />, text: "Not looking for a vendor. Looking for someone who owns the tech side with you." },
      { icon: <CheckCheck size={15} />, text: "Base build cost + revenue share model — aligned incentives." },
      { icon: <CheckCheck size={15} />, text: "Product strategy, architecture, and full execution. All handled." },
    ],
    cta: "/contact-us",
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
          <div className={styles.heroGlow} />
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className={styles.heroContent}
            >
              <span className={styles.monoLabel}>{'// services'}</span>
              <h1 className={styles.pageTitle}>
                What we <span className={styles.gradientText}>build</span><br />
                for you.
              </h1>
              <p className={styles.pageSubtitle}>
                Three ways to work with the DIMSSU Labs team — from rapid custom builds to
                long-term technical co-founding partnerships.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Service Cards (sticky stack) ────── */}
        <div className={styles.cardsStack}>
          {services.map((svc, idx) => (
            <section
              key={svc.index}
              className={`container ${styles.serviceBlock}`}
              style={{ top: 80 + idx * 24, position: 'sticky', zIndex: idx + 10 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.65 }}
                className={styles.cardContainer}
                style={{ '--svc-accent': svc.accent } as React.CSSProperties}
              >
                {/* Card top row */}
                <div className={styles.cardHead}>
                  <div className={styles.cardMeta}>
                    <div
                      className={styles.cardIconBadge}
                      style={{ background: `${svc.accent}18`, color: svc.accent }}
                    >
                      {svc.icon}
                    </div>
                    <span className={styles.cardTag}>{svc.tag}</span>
                  </div>
                  <span className={styles.cardIndex}>{svc.index}</span>
                </div>

                {/* Title + tagline */}
                <h2 className={styles.blockTitle}>{svc.title}</h2>
                <p className={styles.blockTagline}>{svc.tagline}</p>

                {/* Divider */}
                <div className={styles.cardDivider} style={{ background: svc.accent }} />

                {/* Bullet list */}
                <ul className={styles.bulletList}>
                  {svc.bullets.map((b, i) => (
                    <li key={i}>
                      <span className={styles.bulletIcon} style={{ color: svc.accent }}>
                        {b.icon}
                      </span>
                      <span>{b.text}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA / toggle row */}
                <div className={styles.buttonGroup}>
                  <Link href={svc.cta} className={styles.ctaLink}>
                    Get in Touch <ArrowUpRight size={16} />
                  </Link>
                  {svc.hasGrid && (
                    <button
                      className={styles.toggleBtn}
                      onClick={() => setShowSolutions(!showSolutions)}
                    >
                      {showSolutions ? 'Hide Solutions' : 'Explore Solutions'}
                      {showSolutions ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  )}
                </div>

                {/* Expandable product grid */}
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
                          <span>{products.length} products available to deploy</span>
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

        {/* ── Bottom spacer so last card isn't obscured by footer */}
        <div style={{ height: '60vh' }} />
      </main>

      <Footer />
    </div>
  );
}
