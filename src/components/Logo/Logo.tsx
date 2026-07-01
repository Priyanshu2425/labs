import styles from './Logo.module.scss';
import type { FC } from 'react';

interface LogoProps {
  className?: string;
}

const Logo: FC<LogoProps> = ({ className = '' }) => {
  return (
    <div className={`${styles.logo} ${className}`} aria-label="BuildspaceLabs">
      <span className={styles.brace}>{'{'}</span>
      <span className={styles.brand}>bs</span>
      <span className={styles.brace}>{'}'}</span>
    </div>
  );
};

export default Logo;
