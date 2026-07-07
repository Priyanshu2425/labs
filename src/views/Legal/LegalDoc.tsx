import type { ReactNode } from 'react';
import styles from './Legal.module.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

interface LegalDocProps {
  title: string;
  updated: string;
  lede: string;
  children: ReactNode;
}

export default function LegalDoc({ title, updated, lede, children }: LegalDocProps) {
  return (
    <div className={styles.pageWrapper}>
      <Header />

      <main className={styles.main}>
        <div className="container">
          <article className={styles.doc}>
            <header className={styles.docHeader}>
              <span className={styles.monoLabel}>{'// legal'}</span>
              <h1 className={styles.title}>{title}</h1>
              <p className={styles.updated}>Last updated: {updated}</p>
              <p className={styles.lede}>{lede}</p>
            </header>

            <div className={styles.body}>{children}</div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
