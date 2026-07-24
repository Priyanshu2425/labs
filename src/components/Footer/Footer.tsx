import Link from 'next/link';
import styles from './Footer.module.scss';
import Logo from '../Logo';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContainer}>
          <div className={styles.brand}>
            <div className={styles.logoWrapper}>
              <Logo />
            </div>
            <p className={styles.tagline}>India&apos;s AI-native product studio and engineering lab for enterprises worldwide.</p>
          </div>

          <div className={styles.linksBlock}>
            <div className={styles.linkGroup}>
              <h4 className={styles.groupTitle}>Company</h4>
              <Link href="/portfolio" className={styles.link}>Portfolio</Link>
              <Link href="/our-services" className={styles.link}>Services</Link>
              <Link href="/solutions" className={styles.link}>Solutions</Link>
              <Link href="/blog" className={styles.link}>Blog</Link>
              <Link href="/contact-us" className={styles.link}>Contact</Link>
            </div>
            <div className={styles.linkGroup}>
              <h4 className={styles.groupTitle}>Team</h4>
              <a href="mailto:aryan@vruoom.com" className={styles.link}>Aryan · Director</a>
              <a href="mailto:priyanshu@vruoom.com" className={styles.link}>Priyanshu · CTO</a>
            </div>
            <div className={styles.linkGroup}>
              <h4 className={styles.groupTitle}>Legal</h4>
              <Link href="/privacy" className={styles.link}>Privacy Policy</Link>
              <Link href="/terms" className={styles.link}>Terms & Conditions</Link>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} BuildspaceLabs. Built in India.</p>
          <a href="mailto:buildspacelabs@vruoom.com" className={styles.footerEmail}>buildspacelabs@vruoom.com</a>
        </div>
      </div>
    </footer>
  );
}
