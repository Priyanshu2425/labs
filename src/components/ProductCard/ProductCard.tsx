import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';
import { ArrowUpRight } from 'lucide-react';

interface ProductCardProps {
  title: string;
  description: string;
  category: string;
  link: string;
}

export default function ProductCard({ title, description, category, link }: ProductCardProps) {
  return (
    <Link to={link} className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      
      <div className={styles.footer}>
        <div className={styles.category}>{category}</div>
        <ArrowUpRight size={20} className={styles.icon} />
      </div>
    </Link>
  );
}
