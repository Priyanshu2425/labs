'use client';

import { motion } from 'framer-motion';
import styles from './FAQ.module.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Accordion from '../../components/Accordion';
import { Mail, MessageSquare } from 'lucide-react';
import { faqs } from '@/data/faq';

export default function FAQ() {

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <div className={styles.glowBackground} />

      <main className={styles.mainContent}>
        {/* Hero */}
        <section className={`container ${styles.headerSection}`}>
          <motion.div
            className={styles.heroContent}
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeIn} className={styles.badge}>
              Knowledge Base
            </motion.div>
            <motion.h1 variants={fadeIn} className={styles.pageTitle}>
              Frequently Asked <br /><span className={styles.titleHighlight}>Questions</span>
            </motion.h1>
            <motion.p variants={fadeIn} className={styles.pageSubtitle}>
              Got questions? We have got answers. If you do not find what you are looking for, feel free to reach out.
            </motion.p>
          </motion.div>
        </section>

        {/* FAQ Categories & Accordions */}
        <section className={`container ${styles.faqSection}`}>
          <div className={styles.faqWrapper}>
            {faqs.map((categoryGroup, index) => (
              <motion.div 
                key={index} 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn} 
                className={styles.categoryBlock}
              >
                <div className={styles.categoryHeader}>
                  <h2 className={styles.categoryTitle}>{categoryGroup.category}</h2>
                  <p className={styles.categoryDesc}>{categoryGroup.description}</p>
                </div>
                
                <div className={styles.accordionGroup}>
                  {categoryGroup.questions.map((item, qIndex) => (
                    <motion.div 
                      key={qIndex}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: qIndex * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Accordion question={item.q} answer={item.a} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className={`container ${styles.contactSection}`}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeIn}
            className={styles.contactBox}
          >
            <MessageSquare size={48} className={styles.contactIcon} color="rgba(186,158,255,0.8)" style={{ marginBottom: '1.5rem' }} />
            <h3 className={styles.contactTitle}>Still have questions?</h3>
            <p className={styles.contactSub}>Can&apos;t find the answer you&apos;re looking for? Reach out to our engineering team directly.</p>
            <a href="mailto:pra@labs.dimssu.com" className={styles.contactBtn}>
              <Mail size={20} />
              Contact our team
            </a>
          </motion.div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
