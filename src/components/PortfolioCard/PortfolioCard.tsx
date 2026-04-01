import Link from 'next/link';
import { ArrowUpRight, Activity } from 'lucide-react';
import styles from './PortfolioCard.module.scss';


export interface PortfolioCardProps {
  title: string;
  client: string;
  description: string;
  categories: string[];
  status: 'live' | 'prototype';
  metrics: { label: string; value: string }[];
  tags: string[];
  link: string;
}

export default function PortfolioCard({
  title,
  client,
  description,
  categories,
  status,
  metrics,
  tags,
  link
}: PortfolioCardProps) {
  return (
    <Link href={link} className={styles.card}>
      <div className={styles.categoryBadgeRow}>
        <span className={styles.categoriesText}>
          {categories.join(' / ')}
        </span>
        <span className={`${styles.statusBadge} ${status === 'live' ? styles.live : styles.prototype}`}>
          {status === 'live' && <Activity size={12} className={styles.blink} />}
          {status}
        </span>
      </div>
      
      <div className={styles.content}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{title}</h3>
          <ArrowUpRight size={22} className={styles.icon} />
        </div>
        
        <p className={styles.client}>Client: {client}</p>
        <p className={styles.description}>{description}</p>
      </div>

      <div className={styles.metricsGrid}>
        {metrics.map((metric, i) => (
          <div key={i} className={styles.metricBlock}>
            <span className={styles.metricValue}>{metric.value}</span>
            <span className={styles.metricLabel}>{metric.label}</span>
          </div>
        ))}
      </div>

      <div className={styles.tagsContainer}>
        {tags.map((tag) => (
          <span key={tag} className={styles.tag}>{tag}</span>
        ))}
      </div>
    </Link>
  );
}
