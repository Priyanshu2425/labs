'use client';

import { useState } from 'react';
import type { SyntheticEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageCircle, ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import styles from './Contact.module.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

type ServiceKey = 'custom' | 'modules' | 'fractional_cto' | 'other';

const serviceOptions: { value: ServiceKey; letter: string; label: string }[] = [
  { value: 'custom', letter: 'A', label: 'Custom build' },
  { value: 'modules', letter: 'B', label: 'Productised modules' },
  { value: 'fractional_cto', letter: 'C', label: 'Fractional CTO' },
  { value: 'other', letter: '·', label: 'Not sure yet' },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '' as ServiceKey | '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!formData.service) return;
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data: { ok: boolean; error?: string } = await res.json().catch(() => ({ ok: false }));

      if (!res.ok || !data.ok) {
        setSubmitError(data.error ?? 'Something went wrong. Please email us directly.');
        return;
      }

      setShowSuccess(true);
      setFormData({ name: '', email: '', service: '', message: '' });
      setTimeout(() => setShowSuccess(false), 5000);
    } catch {
      setSubmitError('Network error. Please email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const pickService = (svc: ServiceKey) => setFormData((prev) => ({ ...prev, service: svc }));

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65 } },
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <div className={styles.glowBackground} aria-hidden="true" />

      <main className={styles.mainContent}>
        <section className={`container ${styles.contactSection}`}>
          <div className={styles.grid}>
            {/* Left column — narrative + channel chooser */}
            <motion.div
              className={styles.infoCol}
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              <motion.span variants={fadeIn} className={styles.eyebrow}>
                {'// contact'}
              </motion.span>
              <motion.h1 variants={fadeIn} className={styles.pageTitle}>
                Tell us what<br />
                <span className={styles.gradientText}>you&apos;re building.</span>
              </motion.h1>
              <motion.p variants={fadeIn} className={styles.pageSubtitle}>
                A few sentences is enough. Pick the channel you prefer below — or send the form and we&apos;ll come back within a working day.
              </motion.p>

              <motion.div variants={fadeIn} className={styles.responsePill}>
                <span className={styles.responseDot} aria-hidden="true" />
                Usually answers within a working day
              </motion.div>

              <motion.div variants={fadeIn} className={styles.channelStack}>
                <a
                  href="mailto:buildspacelabs@vruoom.com"
                  className={styles.channelCard}
                  data-channel="email"
                >
                  <div className={styles.channelMeta}>
                    <span className={styles.channelLabel}>Email</span>
                    <ArrowUpRight size={16} className={styles.channelArrow} />
                  </div>
                  <span className={styles.channelValue}>buildspacelabs@vruoom.com</span>
                  <span className={styles.channelHint}>Best for project briefs and async</span>
                </a>

                <a
                  href="https://wa.me/918340711366"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.channelCard}
                  data-channel="whatsapp"
                >
                  <div className={styles.channelMeta}>
                    <span className={styles.channelLabel}>WhatsApp</span>
                    <ArrowUpRight size={16} className={styles.channelArrow} />
                  </div>
                  <span className={styles.channelValue}>+91 834 071 1366</span>
                  <span className={styles.channelHint}>Quick questions, fastest reply</span>
                </a>

                <a
                  href="#contact-form"
                  className={styles.channelCard}
                  data-channel="form"
                >
                  <div className={styles.channelMeta}>
                    <span className={styles.channelLabel}>Form</span>
                    <ArrowRight size={16} className={styles.channelArrow} />
                  </div>
                  <span className={styles.channelValue}>Send us details</span>
                  <span className={styles.channelHint}>Picks up the right person internally</span>
                </a>
              </motion.div>

              <motion.div variants={fadeIn} className={styles.leadership}>
                <span className={styles.leadershipLabel}>Who you&apos;ll work with</span>
                <div className={styles.leadershipRow}>
                  <a href="mailto:aryan@vruoom.com" className={styles.person}>
                    <span className={styles.personAvatar} aria-hidden="true">A</span>
                    <span className={styles.personInfo}>
                      <span className={styles.personName}>Aryan</span>
                      <span className={styles.personRole}>Director</span>
                      <span className={styles.personEmail}>aryan@vruoom.com</span>
                    </span>
                  </a>
                  <a href="mailto:priyanshu@vruoom.com" className={styles.person}>
                    <span className={styles.personAvatar} aria-hidden="true">P</span>
                    <span className={styles.personInfo}>
                      <span className={styles.personName}>Priyanshu</span>
                      <span className={styles.personRole}>CTO</span>
                      <span className={styles.personEmail}>priyanshu@vruoom.com</span>
                    </span>
                  </a>
                </div>
              </motion.div>
            </motion.div>

            {/* Right column — conversational form */}
            <motion.form
              id="contact-form"
              className={styles.form}
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <div className={styles.formIntro}>
                <span className={styles.formStep}>01</span>
                <h2 className={styles.formHeading}>In a few sentences, what are you building?</h2>
                <p className={styles.formCaption}>
                  Plain English is fine — context, problem, deadline if there is one.
                </p>
              </div>

              <textarea
                id="message"
                name="message"
                rows={6}
                placeholder="We&rsquo;re a Series A health-tech and we want to add an AI scribe to our existing EHR…"
                required
                value={formData.message}
                onChange={handleChange}
                className={styles.textarea}
              />

              <div className={styles.formStepGroup}>
                <span className={styles.formStep}>02</span>
                <h3 className={styles.formSubheading}>Which engagement is closest?</h3>
              </div>

              <div className={styles.servicePicker} role="radiogroup" aria-label="Engagement type">
                {serviceOptions.map((opt) => {
                  const checked = formData.service === opt.value;
                  return (
                    <button
                      type="button"
                      key={opt.value}
                      role="radio"
                      aria-checked={checked}
                      className={`${styles.serviceChip} ${checked ? styles.serviceChipActive : ''}`}
                      onClick={() => pickService(opt.value)}
                    >
                      <span className={styles.serviceLetter}>{opt.letter}</span>
                      <span>{opt.label}</span>
                      {checked && <Check size={14} className={styles.serviceCheck} aria-hidden="true" />}
                    </button>
                  );
                })}
              </div>

              <div className={styles.formStepGroup}>
                <span className={styles.formStep}>03</span>
                <h3 className={styles.formSubheading}>Where should we reply?</h3>
              </div>

              <div className={styles.identityGrid}>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Name</span>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Pratik"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </label>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Email</span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="you@company.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <button
                type="submit"
                className={`${styles.submitBtn} ${isSubmitting ? styles.loading : ''}`}
                disabled={isSubmitting || !formData.service}
              >
                {isSubmitting ? 'Sending…' : (
                  <>Send it over <ArrowRight size={16} /></>
                )}
              </button>

              {submitError && (
                <div className={styles.formError} role="alert">
                  {submitError} — <a href="mailto:buildspacelabs@vruoom.com">email buildspacelabs@vruoom.com</a> instead.
                </div>
              )}

              <p className={styles.formFootnote}>
                Your details are read by the team. No CRM auto-blast, no drip sequence.
              </p>
            </motion.form>
          </div>
        </section>
      </main>

      <Footer />

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSuccess(false)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              className={styles.modalContent}
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalIcon} aria-hidden="true">
                <MessageCircle size={22} />
              </div>
              <h2 className={styles.modalTitle}>Got it.</h2>
              <p className={styles.modalText}>
                We&apos;ll come back within a working day. If it&apos;s urgent, the WhatsApp number on the previous panel is fastest.
              </p>
              <button className={styles.modalBtn} onClick={() => setShowSuccess(false)}>
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
