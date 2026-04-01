import { useState } from 'react';
import type { SyntheticEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import styles from './Contact.module.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({ name: '', email: '', service: '', message: '' });
      
      // Auto close modal after 5s
      setTimeout(() => setShowSuccess(false), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

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
        <section className={`container ${styles.contactSection}`}>
          <div className={styles.grid}>
            
            {/* Left Column: Details */}
            <motion.div 
              className={styles.infoCol}
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeIn} className={styles.badge}>
                Contact Us
              </motion.div>
              <motion.h1 variants={fadeIn} className={styles.pageTitle}>
                Let's <span className={styles.gradientText}>build</span>
              </motion.h1>
              <motion.p variants={fadeIn} className={styles.pageSubtitle}>
                Get in touch with our engineering team directly for any questions, or fill out the form to start a project.
              </motion.p>
              
              <motion.div variants={fadeIn} className={styles.contactDetails}>
                <a href="mailto:pra@labs.dimssu.com" className={styles.detailCard}>
                  <div className={styles.detailIcon}>
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className={styles.detailTitle}>Email</h3>
                    <p className={styles.detailText}>labs@dimssu.com</p>
                  </div>
                </a>
                
                <a href="https://wa.me/918340711366" target="_blank" rel="noopener noreferrer" className={styles.detailCard}>
                  <div className={styles.detailIcon}>
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className={styles.detailTitle}>WhatsApp</h3>
                    <p className={styles.detailText}>+91 834 071 1366</p>
                  </div>
                </a>

                <div className={styles.detailCard}>
                  <div className={styles.detailIcon}>
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className={styles.detailTitle}>Location</h3>
                    <p className={styles.detailText}>Global (Remote-First, India HQ)</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Right Column: Form */}
            <motion.div 
              className={styles.formCol}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <form className={styles.contactForm} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="John Doe"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="john@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="service">How can we help?</label>
                  <div className={styles.selectWrapper}>
                    <select 
                      id="service" 
                      name="service"
                      required
                      value={formData.service}
                      onChange={handleChange}
                    >
                      <option value="" disabled>Select a service...</option>
                      <option value="custom">Custom Software Build</option>
                      <option value="ai_products">Ready-to-Deploy AI Products</option>
                      <option value="fractional_cto">Fractional CTO</option>
                      <option value="consulting">AI Consulting</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="message">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={5} 
                    placeholder="Tell us about your project or problem..."
                    required
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className={`${styles.submitBtn} ${isSubmitting ? styles.loading : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : (
                    <>Send Message <ArrowRight size={18} /></>
                  )}
                </button>
              </form>
            </motion.div>

          </div>
        </section>
      </main>

      <Footer />

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSuccess(false)}
          >
            <motion.div 
              className={styles.modalContent}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CheckCircle className={styles.successIcon} size={48} />
              <h2 className={styles.modalTitle}>Message Sent!</h2>
              <p className={styles.modalText}>
                Thanks for reaching out. Our team will get back to you within 24 hours to discuss your requirements.
              </p>
              <button 
                className={styles.modalBtn}
                onClick={() => setShowSuccess(false)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
