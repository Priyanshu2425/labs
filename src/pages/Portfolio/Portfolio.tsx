import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Portfolio.module.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PortfolioCard from '../../components/PortfolioCard/PortfolioCard';
import type { PortfolioCardProps } from '../../components/PortfolioCard/PortfolioCard';

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'AI Builds', 'Web', 'Mobile', 'Hardware'];

  // Map 360labs data samples to user's desired filter types for demonstration
  const projects: (PortfolioCardProps & { filterCategory: string })[] = [
    {
      title: "Boss OS",
      client: "CDAC, Govt. of India",
      description: "Contributed the browser module to BOSS Linux, India's national open-source operating system with 6M+ deployments across government and institutional installations.",
      categories: ["GOVERNMENT", "OPEN SOURCE"],
      status: "live",
      metrics: [
        { label: "Deployments", value: "6M+" },
        { label: "Public contribution", value: "Open Source" }
      ],
      tags: ["Linux", "C/C++", "GTK+"],
      link: "/product/boss-os",
      filterCategory: "Web" // Approximated
    },
    {
      title: "Weather Prediction",
      client: "IMD, Govt. of India",
      description: "Weather analysis devices and ML-based prediction algorithms built for the Indian Meteorological Department for real-time forecasting and environmental data processing.",
      categories: ["ML", "GOVERNMENT"],
      status: "live",
      metrics: [
        { label: "Algorithms", value: "ML/DL" },
        { label: "Devices", value: "Hardware" }
      ],
      tags: ["Python", "TensorFlow", "LSTM"],
      link: "/product/weather-prediction",
      filterCategory: "AI Builds"
    },
    {
      title: "AI-Native Clinical Notes",
      client: "Private Hospital (NDA)",
      description: "AI-powered medical scribe that listens to doctor-patient conversations and writes clinical notes automatically.",
      categories: ["HEALTHCARE AI"],
      status: "live",
      metrics: [
        { label: "Doc Time", value: "-80%" },
        { label: "After consultation", value: "Instant Notes" }
      ],
      tags: ["Python", "Next.js", "OpenAI Whisper"],
      link: "/product/sanad",
      filterCategory: "AI Builds"
    },
    {
      title: "Charge Pulse",
      client: "Leading EV Charging Network",
      description: "Real-time EV charging station finder with GPS navigation, live availability, and traffic-aware routing.",
      categories: ["EV", "LOGISTICS"],
      status: "live",
      metrics: [
        { label: "Availability data", value: "Real-Time" },
        { label: "Support tickets", value: "-60%" }
      ],
      tags: ["Next.js", "React", "Flutter"],
      link: "/product/charge-pulse",
      filterCategory: "Mobile"
    },
    {
      title: "AI-Native Lease Management",
      client: "GroSpace Global",
      description: "AI-powered commercial real estate lease management for multi-brand retail operators. Automates lease data extraction from PDFs and tracks obligations.",
      categories: ["REAL ESTATE", "AI EXTRACTION"],
      status: "live",
      metrics: [
        { label: "Extracted fields", value: "60+" },
        { label: "API endpoints", value: "48" }
      ],
      tags: ["Next.js", "FastAPI", "Supabase"],
      link: "/product/grospace",
      filterCategory: "Web"
    },
    {
      title: "Crawl360",
      client: "Internal SaaS",
      description: "Production-grade web scraping API with auto-escalating fetcher modes (fast HTTP, headless browser, stealth), structured data extraction and mult-page crawling.",
      categories: ["WEB SCRAPING", "API", "SAAS"],
      status: "live",
      metrics: [
        { label: "API capabilities", value: "7" },
        { label: "Fetcher modes", value: "3" }
      ],
      tags: ["Python", "FastAPI", "Playwright"],
      link: "/product/crawl360",
      filterCategory: "Web"
    },
    {
      title: "SLM360",
      client: "Open Edge AI",
      description: "On-device NLU engine with 98-100% accuracy, 39ms latency, 50MB footprint. Solves the NLU trilemma.",
      categories: ["EDGE AI", "RESEARCH"],
      status: "live",
      metrics: [
        { label: "Latency", value: "39ms" },
        { label: "Footprint", value: "50MB" }
      ],
      tags: ["TypeScript", "ONNX Runtime", "WebAssembly"],
      link: "/product/slm360",
      filterCategory: "AI Builds"
    },
    {
      title: "SwitchOS",
      client: "Home Automation",
      description: "Custom Arduino-based home automation system replacing traditional wall switches with relay-controlled smart switching.",
      categories: ["HOME AUTOMATION", "HARDWARE & IOT"],
      status: "prototype",
      metrics: [
        { label: "Controllers", value: "Arduino" },
        { label: "Nodes", value: "4-Ch Relay" }
      ],
      tags: ["Arduino Uno", "ATmega328P", "C++"],
      link: "/product/switchos",
      filterCategory: "Hardware"
    }
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.filterCategory === activeFilter);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className={styles.pageWrapper}>
      <Header />

      <main className={styles.mainContent}>
        <section className={`container ${styles.headerSection}`}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className={styles.pageTitle}>
              Our <span className={styles.gradientText}>Portfolio</span>
            </h1>
            <p className={styles.pageSubtitle}>
              Technical deep-dives across healthcare AI, computer vision, edge computing, developer tooling, multi-agent systems, and operations platforms. All live and in production.
            </p>
          </motion.div>
        </section>

        <section className={`container ${styles.portfolioSection}`}>
          {/* Filters */}
          <motion.div 
            className={styles.filtersWrapper}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            {filters.map(filter => (
              <button
                key={filter}
                className={`${styles.filterBtn} ${activeFilter === filter ? styles.active : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <motion.div layout className={styles.grid}>
            <AnimatePresence mode='popLayout'>
              {filteredProjects.map((project) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={project.title}
                >
                  <PortfolioCard {...project} />
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
