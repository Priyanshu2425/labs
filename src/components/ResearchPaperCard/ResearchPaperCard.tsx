import { Link } from 'react-router-dom';
import styles from './ResearchPaperCard.module.scss';
import { ArrowRight } from 'lucide-react';

interface ResearchPaperCardProps {
  type: string;
  year: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
}

export default function ResearchPaperCard({ type, year, title, description, tags, link }: ResearchPaperCardProps) {
  return (
    <div className={styles.card}>
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
        
        <Link to={link} className={styles.readPaper}>
          Read Paper <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
