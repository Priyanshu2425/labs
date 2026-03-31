import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, ArrowUpRight } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './Product.module.scss';
import { productsData } from '../../data/products';

export default function Product() {
  const { id } = useParams<{ id: string }>();

  if (!id || !productsData[id]) {
    return <Navigate to="/our-services" replace />;
  }

  const product = productsData[id];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <Header />

      <main className={styles.mainContent}>
        {/* Breadcrumb / Back Link */}
        <section className={`container ${styles.navSection}`}>
           <Link to="/our-services" className={styles.backLink}>
              <ArrowLeft size={16} />
              <span>Back to Services</span>
           </Link>
        </section>

        {/* Hero Section */}
        <section className={`container ${styles.heroSection}`}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <span className={styles.monoLabel}>// product</span>
            <h1 className={styles.pageTitle}>{product.title}</h1>
            <p className={styles.pageSubtitle}>{product.subtitle}</p>
          </motion.div>
        </section>

        {/* Overview Section */}
        <section className={`container ${styles.overviewSection}`}>
           <motion.div
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             variants={fadeIn}
             className={styles.contentBlock}
           >
              <h2 className={styles.sectionTitle}>Overview</h2>
              <p className={styles.bodyText}>{product.overview}</p>
           </motion.div>
        </section>

        {/* Features Section */}
        <section className={`container ${styles.featuresSection}`}>
           <motion.div
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             variants={staggerContainer}
             className={styles.contentBlock}
           >
              <h2 className={styles.sectionTitle}>Features</h2>
              <ul className={styles.featuresList}>
                {product.features.map((feature, i) => (
                  <motion.li key={i} variants={fadeIn} className={styles.featureItem}>
                    <div className={styles.checkIcon}>
                       <Check size={16} />
                    </div>
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
           </motion.div>
        </section>

        {/* CTA Section */}
        <section className={`container ${styles.ctaSection}`}>
           <motion.div
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             variants={fadeIn}
             className={styles.ctaBox}
           >
              <h2 className={styles.ctaTitle}>Interested in {product.title}?</h2>
              <p className={styles.ctaSubtitle}>Let's discuss how this can work for you.</p>
              <Link to="/contact-us" className={styles.ctaLink}>
                 GET IN TOUCH <ArrowUpRight size={18} />
              </Link>
           </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
