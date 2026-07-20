'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './BuildLoader.module.scss';

// Real portfolio dashboards — the loader is literally assembled from shipped
// product screenshots, "compiling" like a build pipeline while the offer runs.
const TILES = [
  '/projects/churn-radar/dashboard.webp',
  '/projects/pipeline-iq/dashboard.webp',
  '/projects/notewell/dashboard.webp',
  '/projects/ap-copilot/dashboard.webp',
  '/projects/shortlist/dashboard.webp',
  '/projects/rent-iq/dashboard.webp',
  '/projects/scan-queue/dashboard.webp',
  '/projects/quote-forge/dashboard.webp',
  '/projects/tenant-desk/dashboard.webp',
];

// Build-log steps, revealed one at a time to give the wait a sense of progress.
const STEPS = [
  'parsing market-audit report',
  'scoring 10 first-principles tests',
  'matching your build tier',
  'pricing the fixed stack',
  'compiling 48-hour blueprint',
];

const STEP_MS = 1500;

export default function BuildLoader() {
  // How many steps are "done". Holds on the final step (we don't know when the
  // network call returns, so the last line stays active/pulsing until unmount).
  const [done, setDone] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setDone((d) => (d < STEPS.length - 1 ? d + 1 : d));
    }, STEP_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <div className={styles.wrap} role="status" aria-live="polite" aria-label="Building your offer">
      <div className={styles.grid}>
        {TILES.map((src, i) => (
          <div className={styles.tile} key={src}>
            <Image src={src} alt="" fill sizes="(max-width: 480px) 28vw, 140px" />
            <div className={styles.tileVeil} />
            {/* Per-tile "compile" flash, staggered across the grid. */}
            <motion.div
              className={styles.tileFlash}
              animate={{ opacity: [0, 0.85, 0] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                delay: i * 0.22,
                ease: 'easeInOut',
              }}
            />
          </div>
        ))}
        {/* Scan-line sweeping down the whole grid. */}
        <motion.div
          className={styles.scan}
          animate={{ y: ['-70%', '400%'] }}
          transition={{ duration: 2.1, repeat: Infinity, ease: 'linear' }}
        />
        <div className={styles.gridFrame} aria-hidden="true" />
      </div>

      <div className={styles.panel}>
        <span className={styles.kicker}>{'// compiling your build offer'}</span>
        <div className={styles.log}>
          {STEPS.map((s, i) => {
            const state = i < done ? styles.logDone : i === done ? styles.logActive : styles.logPending;
            return (
              <div className={`${styles.logLine} ${state}`} key={s}>
                <span className={styles.mark}>{i < done ? '✓' : i === done ? '›' : '·'}</span>
                <span className={styles.logText}>
                  {s}
                  {i === done ? <span className={styles.caret} /> : i < done ? '' : ''}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
