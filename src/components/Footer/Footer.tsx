import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import Logo from '../Logo';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.brand}>
          <div className={styles.logoWrapper}>
            <Logo />
          </div>
          <p className={styles.tagline}>AI Engineering Lab – Open models built for Indic languages and Indian healthcare.</p>
        </div>
        
        <div className={styles.linksBlock}>
          <div className={styles.linkGroup}>
            <h4 className={styles.groupTitle}>Company</h4>
            <Link to="/portfolio" className={styles.link}>Portfolio</Link>
            <Link to="/ai-lab" className={styles.link}>AI Lab</Link>
            <Link to="/our-services" className={styles.link}>Services</Link>
            <Link to="/contact-us" className={styles.link}>Contact</Link>
          </div>
          <div className={styles.linkGroup}>
            <h4 className={styles.groupTitle}>Legal</h4>
            <Link to="/privacy" className={styles.link}>Privacy Policy</Link>
            <Link to="/terms" className={styles.link}>Terms & Conditions</Link>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>pra@labs.dimssu.com</p>
      </div>
    </footer>
  );
}
