'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Activity, ExternalLink } from 'lucide-react';
import styles from './Portfolio.module.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const projects = [
  {
    id: "boss-os",
    title: "Boss OS",
    client: "CDAC, Govt. of India",
    description: "Contributed the browser module to BOSS Linux — India's national OS with 6M+ government deployments.",
    categories: ["Government", "Open Source"],
    status: "live" as const,
    metrics: [{ label: "Deployments", value: "6M+" }, { label: "Languages", value: "18+" }],
    tags: ["Linux", "C/C++", "GTK+"],
    link: "/product/boss-os",
    filterCategory: "Web",
    accent: "#ba9eff"
  },
  {
    id: "weather-prediction",
    title: "Weather Prediction",
    client: "IMD, Govt. of India",
    description: "ML-based weather forecasting system for the Indian Meteorological Department with real-time sensor data processing.",
    categories: ["ML", "Government"],
    status: "live" as const,
    metrics: [{ label: "Model", value: "LSTM" }, { label: "Scale", value: "National" }],
    tags: ["Python", "TensorFlow", "LSTM"],
    link: "/product/weather-prediction",
    filterCategory: "AI Builds",
    accent: "#53ddfc"
  },
  {
    id: "sanad",
    title: "AI Clinical Notes",
    client: "Private Hospital (NDA)",
    description: "AI medical scribe that listens to doctor-patient conversations and generates clinical notes instantly — cutting doc time by 80%.",
    categories: ["Healthcare AI"],
    status: "live" as const,
    metrics: [{ label: "Doc Time", value: "-80%" }, { label: "Notes", value: "Instant" }],
    tags: ["Python", "Next.js", "OpenAI Whisper"],
    link: "/product/sanad",
    filterCategory: "AI Builds",
    accent: "#6bcb77"
  },
  {
    id: "charge-pulse",
    title: "Charge Pulse",
    client: "Leading EV Network",
    description: "Real-time EV charging station finder with GPS navigation, live availability, and traffic-aware routing.",
    categories: ["EV", "Logistics"],
    status: "live" as const,
    metrics: [{ label: "Availability", value: "Real-Time" }, { label: "Support Tickets", value: "-60%" }],
    tags: ["Next.js", "React", "Flutter"],
    link: "/product/charge-pulse",
    filterCategory: "Mobile",
    accent: "#ffd93d"
  },
  {
    id: "grospace",
    title: "AI Lease Management",
    client: "GroSpace Global",
    description: "AI extracts 60+ fields from commercial lease PDFs, tracks obligations, and manages payments for 500+ outlets.",
    categories: ["Real Estate", "AI Extraction"],
    status: "live" as const,
    metrics: [{ label: "Extracted Fields", value: "60+" }, { label: "API Endpoints", value: "48" }],
    tags: ["Next.js", "FastAPI", "Gemini 2.5 Pro"],
    link: "/product/grospace",
    filterCategory: "Web",
    accent: "#ff9f43"
  },
  {
    id: "crawl360",
    title: "Crawl360",
    client: "Internal SaaS",
    description: "Production-grade web scraping API with auto-escalating fetcher modes — HTTP, headless, stealth — and structured data extraction.",
    categories: ["Web Scraping", "API", "SaaS"],
    status: "live" as const,
    metrics: [{ label: "API Capabilities", value: "7" }, { label: "Fetcher Modes", value: "3" }],
    tags: ["Python", "FastAPI", "Playwright"],
    link: "/product/crawl360",
    filterCategory: "Web",
    accent: "#ff6b6b"
  },
  {
    id: "slm360",
    title: "SLM360",
    client: "Open Edge AI",
    description: "On-device NLU engine — 98-100% accuracy, 39ms latency, 50MB footprint. Runs fully in the browser. No cloud.",
    categories: ["Edge AI", "Research"],
    status: "live" as const,
    metrics: [{ label: "Latency", value: "39ms" }, { label: "Footprint", value: "50MB" }],
    tags: ["TypeScript", "ONNX Runtime", "WebAssembly"],
    link: "/product/slm360",
    filterCategory: "AI Builds",
    accent: "#53ddfc"
  },
  {
    id: "switchos",
    title: "SwitchOS",
    client: "Home Automation",
    description: "Arduino-based 4-channel relay smart switching system replacing traditional wall switches with embedded state control.",
    categories: ["Home Automation", "Hardware & IoT"],
    status: "prototype" as const,
    metrics: [{ label: "Channels", value: "4" }, { label: "Controller", value: "Arduino" }],
    tags: ["Arduino Uno", "ATmega328P", "C++"],
    link: "/product/switchos",
    filterCategory: "Hardware",
    accent: "#6bcb77"
  }
];

const filters = ['All', 'AI Builds', 'Web', 'Mobile', 'Hardware'];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.filterCategory === activeFilter);

  return (
    <div className={styles.pageWrapper}>
      <Header />

      <main className={styles.mainContent}>
        {/* Hero */}
        <section className={styles.heroSection}>
          <div className={styles.heroGlow} />
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className={styles.heroContent}
            >
              <span className={styles.monoLabel}>// portfolio</span>
              <h1 className={styles.pageTitle}>
                Built with purpose.<br />
                <span className={styles.gradientText}>Deployed in production.</span>
              </h1>
              <p className={styles.pageSubtitle}>
                Technical deep-dives across healthcare AI, computer vision, edge computing,
                developer tooling, and operations platforms — all live and in the wild.
              </p>

              {/* Stats row */}
              <div className={styles.statsRow}>
                {[
                  { value: `${projects.filter(p => p.status === 'live').length}`, label: "Live Products" },
                  { value: "6M+", label: "End Users" },
                  { value: "8+", label: "Industries" },
                ].map((s, i) => (
                  <div key={i} className={styles.statItem}>
                    <span className={styles.statValue}>{s.value}</span>
                    <span className={styles.statLabel}>{s.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filter + Grid */}
        <section className={`container ${styles.portfolioSection}`}>
          <motion.div
            className={styles.filtersWrapper}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {filters.map(f => (
              <button
                key={f}
                className={`${styles.filterBtn} ${activeFilter === f ? styles.active : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
                {f !== 'All' && (
                  <span className={styles.filterCount}>
                    {f === 'All' ? projects.length : projects.filter(p => p.filterCategory === f).length}
                  </span>
                )}
              </button>
            ))}
          </motion.div>

          <motion.div layout className={styles.grid}>
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    href={project.link}
                    className={styles.card}
                    style={{ '--card-accent': project.accent } as React.CSSProperties}
                  >
                    {/* Card top */}
                    <div className={styles.cardTop}>
                      <div className={styles.categoryRow}>
                        {project.categories.map(c => (
                          <span key={c} className={styles.categoryChip}>{c}</span>
                        ))}
                      </div>
                      <span className={`${styles.statusBadge} ${project.status === 'live' ? styles.live : styles.prototype}`}>
                        {project.status === 'live' && <Activity size={10} className={styles.blink} />}
                        {project.status}
                      </span>
                    </div>

                    {/* Title */}
                    <div className={styles.titleRow}>
                      <h3 className={styles.title}>{project.title}</h3>
                      <ExternalLink size={18} className={styles.icon} />
                    </div>
                    <p className={styles.client}>{project.client}</p>
                    <p className={styles.description}>{project.description}</p>

                    {/* Metrics */}
                    <div className={styles.metricsRow}>
                      {project.metrics.map((m, i) => (
                        <div key={i} className={styles.metric}>
                          <span className={styles.metricValue} style={{ color: project.accent }}>{m.value}</span>
                          <span className={styles.metricLabel}>{m.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className={styles.tags}>
                      {project.tags.map(t => (
                        <span key={t} className={styles.tag}>{t}</span>
                      ))}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
