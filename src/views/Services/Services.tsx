'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Check, Zap } from 'lucide-react';
import styles from './Services.module.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductCard from '../../components/ProductCard';

type Service = {
  letter: string;
  tag: string;
  image: string;
  name: string;
  bestFor: string;
  benefits: string[];
  timeline: string;
  ctaLabel: string;
  cta: string;
  featured?: boolean;
};

const services: Service[] = [
  {
    letter: 'A',
    tag: 'Custom build',
    image: '/media/service-custom-build.webp',
    name: 'Custom software, built end-to-end',
    bestFor: 'You have a problem and want a senior team to design, build, and ship the whole answer.',
    benefits: [
      'A working prototype in the first sprint — not a slide deck',
      'One senior team — engineering, product, design — through to production',
      'Full source and architecture handed over. No black boxes',
    ],
    timeline: 'Prototype in days · production in weeks',
    ctaLabel: 'Tell us about your project',
    cta: '/contact-us',
  },
  {
    letter: 'B',
    tag: 'Ready to deploy',
    image: '/media/service-modules.webp',
    name: 'Production-ready AI modules',
    bestFor: 'The problem is well-known and you want a proven AI product dropped into your stack, fast.',
    benefits: [
      'A library of AI products already shipped and hardened',
      'Configurable and brandable — live in about a week, not a quarter',
      'You get the working system, the source, and an engineer for rollout',
    ],
    timeline: 'Live in about a week',
    ctaLabel: 'Browse the modules',
    cta: '#modules',
    featured: true,
  },
  {
    letter: 'C',
    tag: 'Partnership',
    image: '/media/service-fractional-cto.webp',
    name: 'Fractional CTO & product partner',
    bestFor: "You're a founder who needs a senior technical co-pilot — not just a vendor.",
    benefits: [
      'Hands-on leadership across architecture, hiring, and ship cadence',
      'Build cost plus equity or revenue share — incentives aligned',
      'A senior team behind the lead, so the strategy actually ships',
    ],
    timeline: 'Ongoing partnership',
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

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function Services() {
  return (
    <div className={styles.pageWrapper}>
      <Header />

      <main className={styles.mainContent}>
        {/* ── Hero ───────────────────────────────── */}
        <section className={styles.heroSection}>
          <div className={styles.heroGlow} aria-hidden="true" />
          <div className={styles.heroVisual} aria-hidden="true">
            <Image src="/media/services-hero.webp" alt="" fill sizes="100vw" className={styles.heroVisualImg} />
          </div>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className={styles.heroContent}
            >
              <span className={styles.monoLabel}>{'// services'}</span>
              <h1 className={styles.pageTitle}>
                Three ways to<br />
                <span className={styles.gradientText}>work with us.</span>
              </h1>
              <p className={styles.pageSubtitle}>
                Pick the one that matches where you are — the same senior team is behind all three.
                Each card tells you exactly who it&apos;s for.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Three-way comparison ─────────────── */}
        <section className={`container ${styles.servicesSection}`}>
          <motion.div
            className={styles.servicesGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
          >
            {services.map((svc) => (
              <motion.article
                key={svc.letter}
                variants={fadeUp}
                className={`${styles.serviceCard} ${svc.featured ? styles.featured : ''}`}
              >
                {svc.featured && (
                  <span className={styles.featuredBadge}>
                    <Zap size={12} /> Fastest to live
                  </span>
                )}

                <div className={styles.cardMedia} aria-hidden="true">
                  <Image src={svc.image} alt="" fill sizes="(max-width: 900px) 100vw, 420px" className={styles.cardMediaImg} />
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.cardHead}>
                    <span className={styles.cardLetter}>{svc.letter}</span>
                    <span className={styles.cardTag}>{svc.tag}</span>
                  </div>

                  <h2 className={styles.serviceName}>{svc.name}</h2>

                  <div className={styles.bestFor}>
                    <span className={styles.bestForLabel}>Best for you if</span>
                    <p className={styles.bestForText}>{svc.bestFor}</p>
                  </div>

                  <ul className={styles.benefits}>
                    {svc.benefits.map((b, i) => (
                      <li key={i} className={styles.benefitItem}>
                        <span className={styles.benefitIcon} aria-hidden="true"><Check size={13} /></span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className={styles.cardFooter}>
                    <span className={styles.timelineChip}>{svc.timeline}</span>
                    {svc.cta.startsWith('#') ? (
                      <a href={svc.cta} className={styles.cardCta}>
                        {svc.ctaLabel}
                        <ArrowUpRight size={16} />
                      </a>
                    ) : (
                      <Link href={svc.cta} className={styles.cardCta}>
                        {svc.ctaLabel}
                        <ArrowUpRight size={16} />
                      </Link>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </section>

        {/* ── Modules (for option B) ───────────── */}
        <section id="modules" className={`container ${styles.modulesSection}`}>
          <motion.div
            className={styles.modulesHeader}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
          >
            <span className={styles.monoLabel}>{'// ready to deploy'}</span>
            <h2 className={styles.modulesTitle}>{products.length} modules you can ship this month.</h2>
            <p className={styles.modulesSub}>
              Proven AI products we&apos;ve already built and hardened. Configure it to your brand and stack, and it&apos;s live in about a week.
            </p>
          </motion.div>

          <motion.div
            className={styles.productsGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
          >
            {products.map((product, i) => (
              <motion.div key={i} variants={fadeUp}>
                <ProductCard {...product} />
              </motion.div>
            ))}
          </motion.div>
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
            <h2 className={styles.ctaTitle}>Not sure which one fits?</h2>
            <p className={styles.ctaText}>
              Tell us where you are in a sentence or two. We&apos;ll point you to the right engagement — and if we&apos;re not the right team, we&apos;ll say so.
            </p>
            <Link href="/contact-us" className={styles.ctaBtn}>
              Start the conversation
              <ArrowUpRight size={16} />
            </Link>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
