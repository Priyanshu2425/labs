import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, Code2, Cpu, Rocket, Users, Landmark, Shield, Truck, Building2, HeartPulse, Microchip } from 'lucide-react';
import styles from './Home.module.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Marquee = () => {
  return (
    <div className={styles.marqueeContainer}>
      <motion.div 
        className={styles.marqueeContent}
        animate={{ x: [0, -2000] }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      >
        <span>AI-powered weather forecasting • Custom AI agents • Smart governance • Intelligent document processing • </span>
        <span>AI-powered weather forecasting • Custom AI agents • Smart governance • Intelligent document processing • </span>
        <span>AI-powered weather forecasting • Custom AI agents • Smart governance • Intelligent document processing • </span>
      </motion.div>
    </div>
  )
}

const HorizontalScrollCarousel = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ 
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const industries = [
    {
      title: "Government",
      icon: <Landmark size={22} />,
      accent: "#ba9eff",
      tag: "Public Sector",
      projects: ["Boss OS", "Weather Prediction", "AI-Native Digital Tutor"]
    },
    {
      title: "Defence",
      icon: <Shield size={22} />,
      accent: "#ff6b6b",
      tag: "Mission Critical",
      projects: ["VAJRA", "KAVACH", "SAGAR"]
    },
    {
      title: "Logistics",
      icon: <Truck size={22} />,
      accent: "#ffd93d",
      tag: "Operations",
      projects: ["Fleet Management", "Charge Pulse", "Supply Chain Ops"]
    },
    {
      title: "Real Estate",
      icon: <Building2 size={22} />,
      accent: "#6bcb77",
      tag: "PropTech",
      projects: ["Lease Management", "Real Estate Fund", "Real Estate MIS"]
    },
    {
      title: "Healthcare",
      icon: <HeartPulse size={22} />,
      accent: "#53ddfc",
      tag: "MedTech",
      projects: ["Clinical Notes", "Focuscare", "Patient Analytics"]
    },
    {
      title: "Hardware & IoT",
      icon: <Microchip size={22} />,
      accent: "#ff9f43",
      tag: "Embedded Systems",
      projects: ["PCB Design", "Embedded Firmware", "Sensor Networks"]
    }
  ];

  return (
    <section ref={targetRef} className={styles.scrollCarouselContainer}>
      <div className={styles.stickyContent}>
        <div className={styles.carouselHeader}>
          <span className={styles.carouselEyebrow}>Our Expertise</span>
          <h2 className={styles.carouselSectionTitle}>Industries we've <br /><em>transformed</em></h2>
          <div className={styles.scrollProgressTrack}>
            <motion.div className={styles.scrollProgressBar} style={{ width: progressWidth }} />
          </div>
        </div>
        
        <motion.div style={{ x }} className={styles.horizontalScroll}>
          {/* Spacer so card 01 starts fully visible */}
          <div style={{ minWidth: '5rem', flexShrink: 0 }} />
          {industries.map((ind, idx) => (
            <div
              key={ind.title}
              className={styles.industryCard}
              style={{ '--card-accent': ind.accent } as React.CSSProperties}
            >
              <div className={styles.cardIndex}>{String(idx + 1).padStart(2, '0')}</div>
              <div className={styles.cardTop}>
                <div className={styles.cardIconWrap} style={{ background: `${ind.accent}18`, color: ind.accent }}>
                  {ind.icon}
                </div>
                <span className={styles.cardTag}>{ind.tag}</span>
              </div>
              <h3 className={styles.industryTitle}>{ind.title}</h3>
              <div className={styles.cardDivider} style={{ background: ind.accent }} />
              <ul className={styles.projectList}>
                {ind.projects.map((proj) => (
                  <li key={proj} className={styles.projectItem}>
                    <ArrowRight size={14} className={styles.projectArrow} style={{ color: ind.accent }} />
                    {proj}
                  </li>
                ))}
              </ul>
              <div className={styles.cardFooter}>
                <span className={styles.projectCount}>{ind.projects.length} projects</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default function Home() {
  const valueProps = [
    {
      icon: <Cpu size={32} />,
      title: "AI-Native Engineering",
      desc: "We grew up building with LLMs and generative AI. We don't retrofit AI; we architect around it directly from day one."
    },
    {
      icon: <Code2 size={32} />,
      title: "Technical Partners",
      desc: "Most agencies take your money and disappear for months. We act as your technical co-founder and long-term partner."
    },
    {
      icon: <Users size={32} />,
      title: "Senior Talent Only",
      desc: "Direct access to senior AI engineers and product builders. No layers of project managers or junior developers involved."
    },
    {
      icon: <Rocket size={32} />,
      title: "Rapid Execution",
      desc: "Working prototypes in 24 hours. Production systems shipped in weeks, not months. We believe in high-velocity momentum."
    }
  ];

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], ["0%", "5%"]);

  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        {/* Parallax Hero Section */}
        <motion.section 
          className={styles.heroSection}
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        >
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className={styles.heroContent}
          >
            <h1 className={styles.heroQuote}>
              "The people who are crazy enough to think they can change the world <span className={styles.gradientText}>are the ones who do.</span>"
            </h1>
            <p className={styles.quoteAuthor}>— Steve Jobs</p>
          </motion.div>
        </motion.section>

        {/* Marquee Ticker */}
        <Marquee />

        {/* Intro Highlight Section */}
        <section className={styles.introSection}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-150px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={styles.introContent}
          >
            <h2 className={styles.introHeading}>India's first AI-native Product Studio & Engineering Lab.</h2>
            <p className={styles.introSubtext}>
              DIMSSU Labs is redefining how complex technical products are built. We combine deep AI expertise with rapid product development, delivering production-ready, world-class software that you can be proud of. We're not just a vendor; we're your technical co-founders.
            </p>
          </motion.div>
        </section>

        {/* Horizontal Scrolling Industries Array */}
        <HorizontalScrollCarousel />

        {/* Floating Value Props / Why Us Feature */}
        <section className={styles.valuePropsSection}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className={styles.valuePropsHeader}
          >
            <h2 className={styles.valuePropsTitle}>Why choose DIMSSU Labs?</h2>
          </motion.div>
          <div className={styles.valuePropsGrid}>
            {valueProps.map((prop, idx) => (
              <motion.div 
                key={idx} 
                className={styles.valueCard}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className={styles.valueIcon}>{prop.icon}</div>
                <h3 className={styles.valueTitle}>{prop.title}</h3>
                <p className={styles.valueDesc}>{prop.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Cinematic CTA / Contact Teaser */}
        <section className={styles.ctaSection}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className={styles.ctaBox}
          >
            <h2 className={styles.ctaHeading}>Ready to build something exceptional?</h2>
            <p className={styles.ctaText}>
              The ones worth building. If you want the cheapest option, we're probably not it. But if you want world-class software you're actually proud of, architected for infinite scale...
            </p>
            <div className={styles.ctaButtons}>
              <Link to="/contact-us" className={styles.primaryBtn}>
                <MessageSquare size={20} />
                Let's Talk
              </Link>
              <Link to="/portfolio" className={styles.secondaryBtn}>
                View Portfolio <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
