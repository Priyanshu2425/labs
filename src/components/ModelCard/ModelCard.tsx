import Link from 'next/link';
import Image from 'next/image';
import styles from './ModelCard.module.scss';
import { ArrowRight } from 'lucide-react';

interface ModelCardProps {
  status: string;
  name: string;
  description: string;
  link: string;
  image?: string;
}

export default function ModelCard({ status, name, description, link, image }: ModelCardProps) {
  return (
    <Link href={link} className={styles.card}>
      {image && (
        <div className={styles.media} aria-hidden="true">
          <Image
            src={image}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className={styles.mediaImg}
          />
        </div>
      )}
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
