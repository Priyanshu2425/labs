'use client';

import { motion, useScroll, useTransform, useSpring, useInView, type MotionValue } from 'framer-motion';
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

/* Rotating hero punchlines — typed in and out with a glowing caret. The first
   phrase is the initial state, so the headline is fully meaningful in the SSR
   HTML and with JS off; the rotation only kicks in on the client. */
const HERO_ROTATING = ['actually ship.', 'reach production.', 'users rely on.'];

function useRotatingType() {
  const [text, setText] = useState(HERO_ROTATING[0]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let word = 0;
    let i = HERO_ROTATING[0].length;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const step = () => {
      const current = HERO_ROTATING[word];
      if (deleting) {
        i -= 1;
        setText(current.slice(0, Math.max(0, i)));
        if (i <= 0) {
          deleting = false;
          word = (word + 1) % HERO_ROTATING.length;
          timer = setTimeout(step, 360); // beat before the next word types in
          return;
        }
        timer = setTimeout(step, 34); // erase speed
      } else {
        i += 1;
        setText(current.slice(0, i));
        if (i >= current.length) {
          deleting = true;
          timer = setTimeout(step, 1900); // hold the finished phrase
          return;
        }
        timer = setTimeout(step, 62); // type speed
      }
    };

    // Hold the first (already-full) phrase, then start erasing into the rotation.
    timer = setTimeout(() => { deleting = true; step(); }, 2200);
    return () => clearTimeout(timer);
  }, []);

  return text;
}

/* Static, editorial hero — no video, no scroll-pin. The entrance is driven by
   CSS keyframes (see Home.module.scss), so the copy is always visible even if
   JS never runs, and honours prefers-reduced-motion. No rAF dependency. */
const Hero = () => {
  const typed = useRotatingType();
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroGrid} aria-hidden="true" />
      <div className={styles.heroGlow} aria-hidden="true" />
      <div className={styles.heroContent}>
        <p className={styles.heroEyebrow}>
          India&apos;s AI-native product studio
        </p>
        <h1 className={styles.heroQuote} aria-label="We build AI products that actually ship.">
          We build AI products that<br />
          <span className={styles.rotator}>
            <span className={styles.gradientText}>{typed}</span>
            <span className={styles.caret} aria-hidden="true" />
          </span>
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

const ScrubWord = ({ word, progress, start, end, accent }: { word: string; progress: MotionValue<number>; start: number; end: number; accent?: boolean; }) => {
  const opacity = useTransform(progress, [start, end], [0.12, 1]);
  const y = useTransform(progress, [start, end], [16, 0]);
  return (
    <motion.span className={`${styles.introWord} ${accent ? styles.gradientText : ''}`} style={{ opacity, y }}>
      {word}
    </motion.span>
  );
};

/* Count-up that fires once when scrolled into view; honours reduced motion. */
const CountUp = ({ to, suffix = '' }: { to: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setVal(to); return; }
    let raf = 0;
    let startTime = 0;
    const dur = 1300;
    const tick = (now: number) => {
      if (!startTime) startTime = now;
      const t = Math.min(1, (now - startTime) / dur);
      setVal(Math.round((1 - Math.pow(1 - t, 3)) * to));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{val}{suffix}</span>;
};

const INTRO_STATS = [
  // Keep in sync with productsData (currently 20 shipped products).
  { to: 20, suffix: '', label: 'Products in production' },
  { to: 8, suffix: '', label: 'Industries transformed' },
  { to: 3, suffix: '', label: 'Ways to work with us' },
  { to: 100, suffix: '%', label: 'Senior team, no juniors' },
];

const INTRO_DOTS = [
  { left: '9%', top: '24%', d: 5 }, { left: '84%', top: '20%', d: 6.5 },
  { left: '72%', top: '58%', d: 5.5 }, { left: '23%', top: '80%', d: 7 },
  { left: '93%', top: '46%', d: 6 }, { left: '46%', top: '13%', d: 5.8 },
];

const IntroSection = () => {
  const ref = useRef<HTMLElement | null>(null);
  // Map progress to the section ENTERING view (0 = just entering from the bottom,
  // 1 = the copy is centred in the viewport) so the reveal completes as you reach
  // it — not after it has scrolled up toward the top.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  const heading = "India's AI-native Product Studio & Engineering Lab.";
  const words = heading.split(' ');
  const wordsStart = 0.22;
  const wordsEnd = 0.62;

  const subtextOpacity = useTransform(scrollYProgress, [0.6, 0.9], [0, 1]);
  const subtextY = useTransform(scrollYProgress, [0.6, 0.9], [40, 0]);

  return (
    <section ref={ref} className={styles.introSection}>
      <div className={styles.introVisual} aria-hidden="true">
        <Image src="/media/home-systems.webp" alt="" fill sizes="100vw" className={styles.introVisualImg} />
      </div>
      <div className={styles.introDots} aria-hidden="true">
        {INTRO_DOTS.map((dot, i) => (
          <motion.span
            key={i}
            className={styles.introDot}
            style={{ left: dot.left, top: dot.top }}
            animate={{ y: [0, -16, 0], opacity: [0.2, 0.75, 0.2] }}
            transition={{ duration: dot.d, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
          />
        ))}
      </div>
      <div className={styles.introContent}>
        <motion.span
          className={styles.introEyebrow}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <span className={styles.introEyebrowDot} aria-hidden="true" />
          The studio
        </motion.span>
        <h2 className={styles.introHeading}>
          {words.map((w, i) => {
            const t0 = wordsStart + (i / words.length) * (wordsEnd - wordsStart);
            const t1 = wordsStart + ((i + 1) / words.length) * (wordsEnd - wordsStart);
            return <ScrubWord key={i} word={w} progress={scrollYProgress} start={t0} end={t1} accent={w === 'AI-native'} />;
          })}
        </h2>
        <motion.p style={{ opacity: subtextOpacity, y: subtextY }} className={styles.introSubtext}>
          BuildspaceLabs is India&apos;s AI-native product studio and engineering lab for enterprises worldwide. We design and ship production AI products end-to-end — from the interface to the model orchestration to the engineering — pairing deep AI expertise with rapid product development.
        </motion.p>

        <motion.div
          className={styles.introDivider}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />

        <motion.div
          className={styles.introStats}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
        >
          {INTRO_STATS.map((s) => (
            <motion.div
              key={s.label}
              className={styles.introStat}
              variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }}
            >
              <span className={styles.introStatValue}><CountUp to={s.to} suffix={s.suffix} /></span>
              <span className={styles.introStatLabel}>{s.label}</span>
            </motion.div>
          ))}
        </motion.div>
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
    {
      title: 'Logistics', tag: 'Operations', image: '/media/industry-logistics.webp', solution: 'logistics',
      description: 'Live fleet tracking, traffic-aware routing, and dispatch at scale.',
      projects: [
        { label: 'Fleet Management', link: '/product/dsv-fleet-management' },
        { label: 'Charge Pulse', link: '/product/charge-pulse' },
        { label: 'See the work', link: '/portfolio' },
      ],
    },
    {
      title: 'Real Estate', tag: 'PropTech', image: '/media/industry-realestate.webp', solution: 'real-estate',
      description: 'Lease extraction, obligation tracking, and AI-native deal sourcing.',
      projects: [
        { label: 'Lease Management', link: '/product/grospace' },
        { label: 'Real Estate Fund', link: '/product/ai-native-real-estate-fund' },
        { label: 'See the work', link: '/portfolio' },
      ],
    },
    {
      title: 'Healthcare', tag: 'MedTech', image: '/media/industry-healthcare.webp', solution: 'healthcare',
      description: 'Ambient clinical scribes and end-to-end consultation automation.',
      projects: [
        { label: 'Clinical Notes', link: '/product/sanad' },
        { label: 'Focuscare', link: '/product/focuscare' },
        { label: 'Patient Front Desk', link: '/product/patient-front-desk' },
      ],
    },
    {
      title: 'Manufacturing & Vision', tag: 'Industrial AI', image: '/media/industry-hardware.webp', solution: 'manufacturing',
      description: 'On-premise video analytics — PPE, surveillance, intrusion detection — and production planning for the factory floor.',
      projects: [
        { label: 'Open Vision PPE', link: '/product/open-vision-ppe' },
        { label: 'Factory OS', link: '/product/factory-os' },
        { label: 'See the work', link: '/portfolio' },
      ],
    },
    {
      title: 'Fintech', tag: 'Finance', image: '/media/industry-fintech.webp', solution: 'fintech',
      description: 'Invoice automation, PO matching, and AI approval routing.',
      projects: [
        { label: 'AP Copilot', link: '/product/ap-copilot' },
        { label: 'Events Payments', link: '/product/food-ordering-platform' },
        { label: 'See the work', link: '/portfolio' },
      ],
    },
    {
      title: 'SaaS & Support', tag: 'Tooling', image: '/media/industry-saas.webp', solution: 'saas-support',
      description: 'AI triage, drafted replies, and churn radar for revenue teams.',
      projects: [
        { label: 'Support Pulse', link: '/product/support-pulse' },
        { label: 'Churn Radar', link: '/product/churn-radar' },
        { label: 'Inbox Zero', link: '/product/inbox-zero' },
      ],
    },
    {
      title: 'Legal Tech', tag: 'Compliance', image: '/media/industry-legal.webp', solution: 'legal-tech',
      description: 'Contract extraction, clause risk scoring, and AI redlines.',
      projects: [
        { label: 'Brief Forge', link: '/product/brief-forge' },
        { label: 'See the work', link: '/portfolio' },
      ],
    },
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
              {(ind as { solution?: string }).solution ? (
                <Link
                  href={`/solutions/${(ind as { solution?: string }).solution}`}
                  className={styles.industryTitleLink}
                >
                  <h3 className={styles.industryTitle}>{ind.title}</h3>
                  <ArrowUpRight size={15} className={styles.industryTitleArrow} aria-hidden="true" />
                </Link>
              ) : (
                <h3 className={styles.industryTitle}>{ind.title}</h3>
              )}
              <p className={styles.industryDesc}>{ind.description}</p>
              <div className={styles.cardDivider} />
              <ul className={styles.projectList}>
                {ind.projects.map((proj) => {
                  const isExternal = (proj as { external?: boolean }).external === true;
                  const content = (
                    <>
                      <span className={styles.projectLabel}>{proj.label}</span>
                      {isExternal
                        ? <ArrowUpRight size={15} className={styles.projectArrow} />
                        : <ArrowRight size={15} className={styles.projectArrow} />}
                    </>
                  );
                  return (
                    <li key={proj.label}>
                      {isExternal ? (
                        <a href={proj.link} target="_blank" rel="noopener noreferrer" className={styles.projectItem}>
                          {content}
                        </a>
                      ) : (
                        <Link href={proj.link} className={styles.projectItem}>
                          {content}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* =============================================
   Studios — specialist, hand-built websites per industry.
   Each card frames the studio's live site like a browser window.
   ============================================= */
const STUDIOS = [
  {
    key: 'travel',
    name: 'Atelier Travel Studio',
    niche: 'Travel & Tourism',
    line: 'Cinematic websites for travel and tourism brands — cliffside stays to desert safaris.',
    count: '28',
    href: 'https://atelier-travel-studio.buildspacelabs.com/',
    image: '/media/studio-travel.jpg',
    host: 'atelier-travel-studio.buildspacelabs.com',
  },
  {
    key: 'pass',
    name: 'The Pass Studio',
    niche: 'Cafés & F&B',
    line: 'Appetite-driving websites for cafés, restaurants, bars and food brands.',
    count: '20',
    href: 'https://buildpacelabs.github.io/the-pass-studio/',
    image: '/media/studio-cafe.jpg',
    host: 'the-pass-studio',
  },
  {
    key: 'rep',
    name: 'The Rep Studio',
    niche: 'Gyms & Fitness',
    line: 'High-energy websites for gyms, studios, boxes and wellness brands.',
    count: '20',
    href: 'https://buildpacelabs.github.io/the-rep-studio/',
    image: '/media/studio-fitness.jpg',
    host: 'the-rep-studio',
  },
  {
    key: 'close',
    name: 'The Close Studio',
    niche: 'Real Estate',
    line: 'Trust-building websites for brokerages, developers and property brands.',
    count: '20',
    href: 'https://buildpacelabs.github.io/the-close-studio/',
    image: '/media/studio-realestate.jpg',
    host: 'the-close-studio',
  },
];

const StudiosSection = () => {
  return (
    <section className={styles.studiosSection} aria-labelledby="studios-title">
      <div className={styles.studiosBg} aria-hidden="true" />
      <div className={styles.studiosInner}>
        <div className={styles.studiosHeader}>
          <motion.span
            className={styles.studiosEyebrow}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <span className={styles.introEyebrowDot} aria-hidden="true" />
            Studios
          </motion.span>
          <h2 id="studios-title" className={styles.studiosTitle}>
            A studio for every industry.<br />
            Every site <em>built by hand</em>.
          </h2>
          <p className={styles.studiosSubtext}>
            Alongside our product work, we run specialist studios that give brands in a single
            industry a website designed and built entirely from scratch — no templates, no two alike.
            Open one and browse the work.
          </p>
        </div>

        <div className={styles.studiosGrid}>
          {STUDIOS.map((s, i) => (
            <motion.a
              key={s.key}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.studioCard}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-90px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (i % 2) * 0.08 }}
            >
              <div className={styles.studioFrame}>
                <div className={styles.studioChrome} aria-hidden="true">
                  <span className={styles.studioDots}><i /><i /><i /></span>
                  <span className={styles.studioUrl}>{s.host}</span>
                </div>
                <div className={styles.studioShot}>
                  <Image
                    src={s.image}
                    alt={`${s.name} — a collection of ${s.niche.toLowerCase()} brand websites`}
                    fill
                    sizes="(max-width: 900px) 92vw, 560px"
                    className={styles.studioShotImg}
                  />
                </div>
              </div>
              <div className={styles.studioBody}>
                <div className={styles.studioMeta}>
                  <span className={styles.studioTag}>{s.niche}</span>
                  <span className={styles.studioCount}>{s.count} brands built</span>
                </div>
                <h3 className={styles.studioName}>{s.name}</h3>
                <p className={styles.studioLine}>{s.line}</p>
                <span className={styles.studioLink}>
                  Visit the studio
                  <ArrowUpRight size={15} className={styles.studioLinkArrow} />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

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

        {/* Studios — specialist hand-built websites, one studio per industry */}
        <StudiosSection />

        {/* Value Props — Why Us */}
        <ValuePropsSection valueProps={valueProps} />

        {/* CTA — scroll-driven scale + lift */}
        <CTASection />

      </main>
      <Footer />
    </div>
  );
}
