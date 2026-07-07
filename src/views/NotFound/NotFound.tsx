import Link from 'next/link';
import styles from './NotFound.module.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function NotFound() {
  return (
    <div className={styles.pageWrapper}>
      <Header />

      <main className={styles.main}>
        <div className="container">
          <div className={styles.content}>
            <span className={styles.monoLabel}>{'// 404'}</span>
            <p className={styles.code} aria-hidden="true">
              404
            </p>
            <h1 className={styles.title}>This page took a detour.</h1>
            <p className={styles.subtitle}>
              The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you
              back to something real — every project in the portfolio shipped for a paying client.
            </p>
            <div className={styles.actions}>
              <Link href="/" className={styles.primaryBtn}>
                Back to home
              </Link>
              <Link href="/portfolio" className={styles.secondaryBtn}>
                See the work
              </Link>
              <Link href="/contact-us" className={styles.secondaryBtn}>
                Start a project
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
