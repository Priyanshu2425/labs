import Link from 'next/link';
import Image from 'next/image';
import styles from './ResearchPaperCard.module.scss';
import { ArrowRight } from 'lucide-react';

interface ResearchPaperCardProps {
  type: string;
  year: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
  image?: string;
}

export default function ResearchPaperCard({ type, year, title, description, tags, link, image }: ResearchPaperCardProps) {
  return (
    <div className={styles.card}>
      {image && (
        <div className={styles.media} aria-hidden="true">
          <Image
            src={image}
            alt=""
            fill
            sizes="(max-width: 900px) 100vw, 460px"
            className={styles.mediaImg}
          />
        </div>
      )}
      <div className={styles.header}>
        <span className={styles.meta}>{type} • {year}</span>
      </div>

      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>

      <div className={styles.bottomSection}>
        <div className={styles.tags}>
          {tags.map(tag => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>

        <Link href={link} className={styles.readPaper}>
          Read Paper <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
