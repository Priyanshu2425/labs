import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react';
import styles from './Services.module.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductCard from '../../components/ProductCard';

const StickyServiceCard = ({ children, index }: { children: React.ReactNode, index: number }) => {
  // Calculate dynamic top offset based on index (100px base + 20px per card)
  const topOffset = 100 + index * 20;

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section 
      className={`container ${styles.serviceBlock}`} 
      style={{ top: topOffset, position: 'sticky', zIndex: index + 10 }}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
        className={styles.cardContainer}
      >
        {children}
      </motion.div>
    </section>
  );
};


export default function Services() {
  const [showSolutions, setShowSolutions] = useState(false);

  const products = [
    {
      title: "AI Medical Scribe",
      description: "Doctors talk, notes write themselves. Cut documentation time by 80%.",
      category: "Healthcare",
      link: "/product/sanad"
    },
    {
      title: "Clinic Management",
      description: "From patient check-in to follow-up scheduling. One system handles onboarding, notes, and appointments automatically.",
      category: "Healthcare",
      link: "/product/focuscare"
    },
    {
      title: "Fleet Tracking & Routing",
      description: "Know where every vehicle is, optimize routes in real time, and manage drivers from a single dashboard.",
      category: "Logistics",
      link: "/product/dsv-fleet-management"
    },
    {
      title: "Location Finder",
      description: "Help your customers find what's nearby, check availability, and get there fast. Works on web and mobile.",
      category: "Maps & Discovery",
      link: "/product/charge-pulse"
    },
    {
      title: "Marketplace Platform",
      description: "Run a multi-vendor marketplace with order tracking, payments, and automated settlements. All in one place.",
      category: "Marketplace",
      link: "/product/food-ordering-platform"
    },
    {
      title: "Jobsite Safety Monitoring",
      description: "Catch safety violations before they become incidents. Automated monitoring and reporting. No cloud needed, runs on your premises.",
      category: "Safety & Compliance",
      link: "/product/open-vision-ppe"
    },
    {
      title: "Production Management",
      description: "Never miss a production milestone. Automated planning, quality checkpoints, and real-time visibility across your factory floor.",
      category: "Manufacturing",
      link: "/product/factory-os"
    },
    {
      title: "Lease Management",
      description: "Extract key terms from lease documents instantly. Track obligations, manage payments, and see your entire portfolio at a glance.",
      category: "Real Estate",
      link: "/product/grospace"
    },
    {
      title: "Deal Sourcing & Underwriting",
      description: "AI finds deals, runs the numbers, drafts outreach, and structures offers across distressed properties and land parcels.",
      category: "Real Estate",
      link: "/product/ai-native-real-estate-fund"
    },
    {
      title: "Job Application Autopilot",
      description: "Apply to hundreds of jobs automatically across Lever, Greenhouse, and Workday. Your AI hiring assistant that never stops.",
      category: "HR & Recruiting",
      link: "/product/ai-job-automation"
    }
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <Header />

      <main className={styles.mainContent}>
        {/* Main Header */}
        <section className={`container ${styles.headerSection}`}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <span className={styles.monoLabel}>// services</span>
            <h1 className={styles.pageTitle}>Our Services</h1>
            <p className={styles.pageSubtitle}>
              Building AI products and solutions that drive real business value.
            </p>
          </motion.div>
        </section>

        {/* Custom Software Builds */}
        <StickyServiceCard index={0}>
          <h2 className={styles.blockTitle}>Custom Software Builds</h2>
          <ul className={styles.bulletList}>
            <li>
              <span className={styles.bulletIcon}>›</span>
              <span>Have a specific problem? Budget of $5k?</span>
            </li>
            <li>
              <span className={styles.bulletIcon}>›</span>
              <span>Forward-deployed engineers will understand your challenge and build a custom solution</span>
            </li>
            <li>
              <span className={styles.bulletIcon}>›</span>
              <span>Prototypes delivered within 24 hours of a clear scope</span>
            </li>
          </ul>
          <Link to="/contact-us" className={styles.ctaLink}>
            GET IN TOUCH <ArrowUpRight size={18} />
          </Link>
        </StickyServiceCard>

        {/* Ready to Deploy Products Outline */}
        <StickyServiceCard index={1}>
          <h2 className={styles.blockTitle}>Ready-to-Deploy AI Products</h2>
          <ul className={styles.bulletList}>
            <li>
              <span className={styles.bulletIcon}>›</span>
              <span>Plug-and-play, modular solutions we originally built as internal tools or for client projects</span>
            </li>
            <li>
              <span className={styles.bulletIcon}>›</span>
              <span>Each one is production-tested, configurable, and ready to drop into your stack</span>
            </li>
            <li>
              <span className={styles.bulletIcon}>›</span>
              <span>Skip the build phase. Go live within 72 hours</span>
            </li>
          </ul>
          
          <div className={styles.buttonGroup}>
            <Link to="/contact-us" className={styles.ctaLink}>
              GET IN TOUCH <ArrowUpRight size={18} />
            </Link>
            <button 
              className={styles.toggleBtn}
              onClick={() => setShowSolutions(!showSolutions)}
            >
              {showSolutions ? 'HIDE SOLUTIONS' : 'EXPLORE SOLUTIONS'} 
              {showSolutions ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          </div>
          
          {/* The Grid of Ready Products */}
          <AnimatePresence>
            {showSolutions && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: '3rem' }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.4 }}
                className={styles.productsGridWrapper}
              >
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={staggerContainer}
                  className={styles.productsGrid}
                >
                  {products.map((product, idx) => (
                    <motion.div key={idx} variants={fadeIn}>
                      <ProductCard {...product} />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </StickyServiceCard>

        {/* Fractional CTO / Technical Co-founders */}
        <StickyServiceCard index={2}>
          <h2 className={styles.blockTitle}>Fractional CTO / Technical Co-founders</h2>
          <ul className={styles.bulletList}>
            <li>
              <span className={styles.bulletIcon}>›</span>
              <span>Not looking for a vendor. Looking for someone who owns the tech side with you</span>
            </li>
            <li>
              <span className={styles.bulletIcon}>›</span>
              <span>Base build cost + revenue share. We grow when you grow</span>
            </li>
            <li>
              <span className={styles.bulletIcon}>›</span>
              <span>Product strategy, architecture, and execution. All handled</span>
            </li>
          </ul>
          <Link to="/contact-us" className={styles.ctaLink}>
            GET IN TOUCH <ArrowUpRight size={18} />
          </Link>
        </StickyServiceCard>
      </main>

      <Footer />
    </div>
  );
}
