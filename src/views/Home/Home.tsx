'use client';

import { motion, useScroll, useTransform, useSpring, type MotionValue } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import styles from './Home.module.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const SHIPPED_PROJECTS = [
  'Sanad', 'Focuscare', 'Charge Pulse', 'DSV Fleet', 'Factory OS',
  'Grospace', 'Brief Forge', 'Reply Rail', 'Sales Call Coach',
  'Inbox Zero', 'Support Pulse', 'Patient Front Desk', 'Investor Update Drafter',
];

const Marquee = () => {
  // Two copies for seamless loop. Each item is a real shipped project.
  const items = [...SHIPPED_PROJECTS, ...SHIPPED_PROJECTS];

  return (
    <div className={styles.marqueeContainer}>
      <span className={styles.marqueeLabel} aria-hidden="true">Recently shipped /</span>
      <motion.div
        className={styles.marqueeContent}
        animate={{ x: [0, '-50%'] }}
        transition={{ repeat: Infinity, duration: 45, ease: 'linear' }}
      >
        {items.map((name, i) => (
          <span key={i} className={styles.marqueeItem}>
            <span className={styles.marqueeDot} aria-hidden="true" />
            {name}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

/* Static, editorial hero — no video, no scroll-pin. The entrance is driven by
   CSS keyframes (see Home.module.scss), so the copy is always visible even if
   JS never runs, and honours prefers-reduced-motion. No rAF dependency. */
const Hero = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroGrid} aria-hidden="true" />
      <div className={styles.heroVisual} aria-hidden="true">
        <Image
          src="/media/home-hero.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.heroVisualImg}
        />
      </div>
      <div className={styles.heroGlow} aria-hidden="true" />
      <div className={styles.heroScrim} aria-hidden="true" />
      <div className={styles.heroContent}>
        <p className={styles.heroEyebrow}>
          India&apos;s AI-native product studio
        </p>
        <h1 className={styles.heroQuote}>
          We build AI products that <span className={styles.gradientText}>actually ship.</span>
        </h1>
        <p className={styles.heroSubtext}>
          Not pilots. Not slide decks. Production systems your team uses on Monday morning — designed, engineered, and shipped end-to-end by senior AI builders.
        </p>
        <div className={styles.heroActions}>
          <Link href="/contact-us" className={styles.heroPrimary}>
            Start a project
            <ArrowRight size={16} />
          </Link>
          <Link href="/portfolio" className={styles.heroSecondary}>
            See what we&apos;ve shipped
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};

const ScrubWord = ({ word, progress, start, end }: { word: string; progress: MotionValue<number>; start: number; end: number; }) => {
  const opacity = useTransform(progress, [start, end], [0.12, 1]);
  const y = useTransform(progress, [start, end], [16, 0]);
  return (
    <motion.span className={styles.introWord} style={{ opacity, y }}>
      {word}
    </motion.span>
  );
};

const IntroSection = () => {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const heading = "India's first AI-native Product Studio & Engineering Lab.";
  const words = heading.split(' ');
  const wordsStart = 0.18;
  const wordsEnd = 0.58;

  const subtextOpacity = useTransform(scrollYProgress, [0.55, 0.75], [0, 1]);
  const subtextY = useTransform(scrollYProgress, [0.55, 0.75], [40, 0]);

  return (
    <section ref={ref} className={styles.introSection}>
      <div className={styles.introVisual} aria-hidden="true">
        <Image src="/media/home-systems.webp" alt="" fill sizes="100vw" className={styles.introVisualImg} />
      </div>
      <div className={styles.introContent}>
        <h2 className={styles.introHeading}>
          {words.map((w, i) => {
            const t0 = wordsStart + (i / words.length) * (wordsEnd - wordsStart);
            const t1 = wordsStart + ((i + 1) / words.length) * (wordsEnd - wordsStart);
            return <ScrubWord key={i} word={w} progress={scrollYProgress} start={t0} end={t1} />;
          })}
        </h2>
        <motion.p style={{ opacity: subtextOpacity, y: subtextY }} className={styles.introSubtext}>
          BuildspaceLabs is redefining how complex technical products are built. We combine deep AI expertise with rapid product development, delivering production-ready, world-class software that you can be proud of. We&apos;re not just a vendor; we&apos;re your technical co-founders.
        </motion.p>
      </div>
    </section>
  );
};

type ValueProp = { number: string; title: string; desc: string };

const ValueCard = ({ prop }: { prop: ValueProp }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start center'],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [70, 0]);
  // Big-number parallax — drifts in faster than the card body, creating depth.
  const numberY = useTransform(scrollYProgress, [0, 1], [140, 0]);
  const numberOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.18]);

  return (
    <motion.article ref={ref} className={styles.valueCard} style={{ opacity, y }}>
      <motion.span className={styles.valueNumber} style={{ y: numberY, opacity: numberOpacity }}>
        {prop.number}
      </motion.span>
      <div className={styles.valueCardBody}>
        <h3 className={styles.valueTitle}>{prop.title}</h3>
        <p className={styles.valueDesc}>{prop.desc}</p>
      </div>
    </motion.article>
  );
};

const ValuePropsSection = ({ valueProps }: { valueProps: ValueProp[] }) => {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const eyebrowY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const subtitleY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section ref={ref} className={styles.valuePropsSection}>
      <div className={styles.valuePropsSplit}>
        <div className={styles.valuePropsStickyLeft}>
          <motion.span style={{ y: eyebrowY }} className={styles.valueSectionEyebrow}>Why teams pick us</motion.span>
          <motion.h2 style={{ y: titleY }} className={styles.valuePropsTitle}>
            Four reasons<br />people sign with us.
          </motion.h2>
          <motion.p style={{ y: subtitleY }} className={styles.valueSectionSubtext}>
            Plain talk — what makes the work different when BuildspaceLabs is the team behind it.
          </motion.p>
        </div>

        <div className={styles.valuePropsStack}>
          {valueProps.map((prop) => (
            <ValueCard key={prop.number} prop={prop} />
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });
  const headingY = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const subtextY = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const subtextOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const buttonsY = useTransform(scrollYProgress, [0, 1], [30, 0]);
  const buttonsOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={ref} className={styles.ctaSection}>
      <div className={styles.ctaGrid} aria-hidden="true" />
      <div className={styles.ctaInner}>
        <motion.h2 className={styles.ctaHeading} style={{ y: headingY, opacity: headingOpacity }}>
          Ready when you are.
        </motion.h2>
        <motion.p className={styles.ctaSubtext} style={{ y: subtextY, opacity: subtextOpacity }}>
          If you want the cheapest agency, we&apos;re not it. If you want a senior team that ships AI products your users actually pick up — that&apos;s exactly what we do.
        </motion.p>
        <motion.div className={styles.ctaActions} style={{ y: buttonsY, opacity: buttonsOpacity }}>
          <Link href="/contact-us" className={styles.ctaPrimary}>
            Start a project
            <ArrowRight size={16} />
          </Link>
          <Link href="/portfolio" className={styles.ctaSecondary}>
            Browse the work
            <ArrowUpRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  // travel = horizontal distance the track must move so the last card aligns
  // to the right edge of the viewport. We measure the actual track scrollWidth
  // and viewport width at runtime so the math is responsive and correct.
  const [travel, setTravel] = useState(0);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const measure = () => {
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      setEnabled(!isMobile);
      if (isMobile) {
        setTravel(0);
        return;
      }
      const track = trackRef.current;
      if (!track) return;
      // scrollWidth includes overflow content; subtract viewport for distance.
      const next = Math.max(0, track.scrollWidth - window.innerWidth);
      setTravel(next);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  // Linear x in pixels; spring-smoothed to absorb scroll jitter without lagging.
  const xRaw = useTransform(scrollYProgress, [0, 1], [0, -travel]);
  const x = useSpring(xRaw, { stiffness: 220, damping: 40, mass: 0.4 });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const industries = [
    { title: 'Government', tag: 'Public Sector', image: '/media/industry-government.webp', projects: ['Boss OS', 'Weather Prediction', 'AI-Native Digital Tutor'] },
    { title: 'Defence', tag: 'Mission Critical', image: '/media/industry-defence.webp', projects: ['VAJRA', 'KAVACH', 'SAGAR'] },
    { title: 'Logistics', tag: 'Operations', image: '/media/industry-logistics.webp', projects: ['Fleet Management', 'Charge Pulse', 'Supply Chain Ops'] },
    { title: 'Real Estate', tag: 'PropTech', image: '/media/industry-realestate.webp', projects: ['Lease Management', 'Real Estate Fund', 'Real Estate MIS'] },
    { title: 'Healthcare', tag: 'MedTech', image: '/media/industry-healthcare.webp', projects: ['Clinical Notes', 'Focuscare', 'Patient Analytics'] },
    { title: 'Hardware & IoT', tag: 'Embedded Systems', image: '/media/industry-hardware.webp', projects: ['PCB Design', 'Embedded Firmware', 'Sensor Networks'] },
  ];

  // Section height = one viewport (for the pin) + the actual horizontal travel.
  // Result: 1px of vertical scroll = 1px of horizontal motion, which is the
  // single most important property for the pin to feel like horizontal scroll.
  // We always set the inline height (uses 0 when disabled / pre-measure) to
  // keep the rendered prop shape stable across renders — React 19 + framer
  // are happier when motion props don't appear and disappear.
  const sectionStyle: React.CSSProperties = enabled
    ? { height: `calc(100vh + ${travel}px)` }
    : { height: 'auto' };

  return (
    <section ref={targetRef} className={styles.scrollCarouselContainer} style={sectionStyle}>
      <div className={styles.stickyContent}>
        <div className={styles.carouselHeader}>
          <span className={styles.carouselEyebrow}>Our Expertise</span>
          <h2 className={styles.carouselSectionTitle}>Industries we&apos;ve <br /><em>transformed</em></h2>
          <div className={styles.scrollProgressTrack}>
            <motion.div className={styles.scrollProgressBar} style={{ width: progressWidth }} />
          </div>
        </div>

        <motion.div ref={trackRef} style={{ x }} className={styles.horizontalScroll}>
          {/* Leading spacer so the first card lands flush with section padding */}
          <div className={styles.carouselSpacer} aria-hidden="true" />
          {industries.map((ind) => (
            <div key={ind.title} className={styles.industryCard}>
              <div className={styles.cardMedia} aria-hidden="true">
                <Image
                  src={ind.image}
                  alt=""
                  fill
                  sizes="360px"
                  className={styles.cardMediaImg}
                />
              </div>
              <div className={styles.cardTop}>
                <span className={styles.cardTag}>{ind.tag}</span>
              </div>
              <h3 className={styles.industryTitle}>{ind.title}</h3>
              <div className={styles.cardDivider} />
              <ul className={styles.projectList}>
                {ind.projects.map((proj) => (
                  <li key={proj} className={styles.projectItem}>
                    <ArrowRight size={14} className={styles.projectArrow} />
                    {proj}
                  </li>
                ))}
              </ul>
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
      number: '01',
      title: 'AI-native by default',
      desc: "Generative AI sits at the core of how we design products — not pasted on at the end. Every architectural decision is shaped by what models can and can't do.",
    },
    {
      number: '02',
      title: 'Senior people in the room',
      desc: 'You work directly with engineers and product designers who have shipped before. No proxy layer of project managers, no junior pool delivering the work.',
    },
    {
      number: '03',
      title: 'We stay until it ships',
      desc: "Most agencies hand over a Figma file and disappear. We treat the engagement as a build partnership — through production, into iteration, and across handover.",
    },
    {
      number: '04',
      title: 'Speed without the smell',
      desc: "Working prototypes in days, production systems in weeks. Velocity comes from sharp scope and small senior teams — not from cutting corners on the parts that matter.",
    },
  ];

  return (
    <div className={styles.pageWrapper}>
      <Header />

      <main className={styles.mainContent}>
        {/* Marquee Ticker */}
        <Marquee />

        {/* Hero — static editorial */}
        <Hero />

        {/* Intro — scroll-scrubbed word reveal */}
        <IntroSection />

        {/* Horizontal Scrolling Industries Array */}
        <HorizontalScrollCarousel />

        {/* Value Props — Why Us */}
        <ValuePropsSection valueProps={valueProps} />

        {/* CTA — scroll-driven scale + lift */}
        <CTASection />

      </main>
      <Footer />
    </div>
  );
}
