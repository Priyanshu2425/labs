import Link from 'next/link';
import styles from './ModelCard.module.scss';
import { ArrowRight } from 'lucide-react';

interface ModelCardProps {
  status: string;
  name: string;
  description: string;
  link: string;
}

export default function ModelCard({ status, name, description, link }: ModelCardProps) {
  return (
    <Link href={link} className={styles.card}>
      <div className={styles.statusBadge}>{status}</div>
      <h3 className={styles.modelName}>{name}</h3>
      <p className={styles.description}>{description}</p>
      
      <div className={styles.footer}>
        <span className={styles.learnMore}>Learn more</span>
        <ArrowRight size={18} className={styles.icon} />
      </div>
    </Link>
  );
}
