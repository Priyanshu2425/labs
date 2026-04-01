import styles from './Logo.module.scss';
import type { FC } from 'react';

interface LogoProps {
  className?: string;
}

const Logo: FC<LogoProps> = ({ className = '' }) => {
  return (
    <div className={`${styles.logo} ${className}`}>
      <span className={styles.bracket}>[</span>
      <span className={styles.brand}>labs.dimssu</span>
      <span className={styles.tld}>.ai</span>
      <span className={styles.bracket}>]</span>
    </div>
  );
};

export default Logo;
