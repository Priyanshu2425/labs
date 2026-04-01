'use client';

import { motion } from 'framer-motion';
import styles from './FAQ.module.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Accordion from '../../components/Accordion';
import { Mail, MessageSquare } from 'lucide-react';

export default function FAQ() {
  const faqs = [
    {
      category: "General",
      description: "Everything you need to know about DIMSSU Labs and what we do.",
      questions: [
        {
          q: "What is DIMSSU Labs?",
          a: "DIMSSU Labs is an AI-native software development company and product studio that builds custom AI solutions, intelligent automation systems, and production-ready software for businesses worldwide. Unlike traditional IT consultancies, DIMSSU Labs ships working AI products in weeks, not months."
        },
        {
          q: "What kind of solutions do you build?",
          a: "DIMSSU Labs builds custom AI solutions including AI agents, intelligent chatbots, workflow automation systems, LLM-powered applications, and enterprise software to help businesses automate customer support, lead generation, document processing, and workflows."
        },
        {
          q: "Where are you located?",
          a: "DIMSSU Labs is headquartered in India and serves clients globally including the US, UK, Europe, Middle East, and Australia. The company operates remotely with distributed teams."
        },
        {
          q: "How do you differ from traditional IT consultancies?",
          a: "We are AI-native (built from the ground up around AI, not retrofitting it), we ship fast (working prototypes in days, not months), we provide direct access to senior talent (no layers of project managers), and we offer transparent pricing."
        },
        {
          q: "What industries do you work with?",
          a: "DIMSSU Labs works across multiple industries including fintech, banking, e-commerce, retail, healthcare, manufacturing, logistics, education, real estate, and professional SaaS companies."
        }
      ]
    },
    {
      category: "AI Automation & Agents",
      description: "Learn about the capabilities, models, and integrations of our AI agents.",
      questions: [
        {
          q: "What is AI Automation?",
          a: "AI automation uses artificial intelligence to handle manual, repetitive, or time-consuming tasks. We help businesses implement AI to automate processes across customer support, lead qualification, data extraction, and internal workflows."
        },
        {
          q: "How good are your AI agents?",
          a: "We build some of the best AI agents in the market. They use advanced LLM orchestration with tools like LangChain and LlamaIndex to handle complex multi-turn conversations, integrate with enterprise systems, and operate reliably in production."
        },
        {
          q: "Can you build AI Chatbots?",
          a: "Yes. Our AI chatbots integrate with WhatsApp Business API, web chat, Slack, and Microsoft Teams. They learn from your knowledge base, handle dynamic multi-turn flows, and escalate to human agents only when necessary."
        },
        {
          q: "What LLMs do you use?",
          a: "We build with OpenAI (GPT-4), Anthropic Claude, Gemini, as well as open-source models like Llama and Mistral. We choose the best model based on latency, cost, and task complexity."
        }
      ]
    },
    {
      category: "Pricing & Engagement",
      description: "Details on timelines, pricing limits, and how we handle projects.",
      questions: [
        {
          q: "How much do your services cost?",
          a: "AI agents and automations typically start at $1,200 USD. Web and mobile applications range from $3,600-$12,000 USD. Enterprise AI systems start at $10,000+ USD. We provide transparent pricing upfront based on scope."
        },
        {
          q: "How fast can you deliver?",
          a: "AI agents and automations: 1-2 weeks. Web applications and MVPs: 4-6 weeks. Complex enterprise systems: 8-12 weeks. We ship working prototypes within 24-48 hours of project kickoff."
        },
        {
          q: "Do you offer post-launch support and maintenance?",
          a: "Yes, we provide comprehensive post-launch support including bug fixes, performance monitoring, security updates, prompt tuning, model updates, and 24/7 incident response for critical systems."
        },
        {
          q: "Do you integrate with our existing stack?",
          a: "Yes. We work with CRMs (Salesforce, HubSpot, Zoho), ERPs (SAP, Oracle), databases, cloud platforms (AWS, GCP), and workflow tools like Slack or Teams using API connections."
        },
        {
          q: "Do you do pilot projects?",
          a: "Yes, we encourage pilot projects. We typically start with a focused proof of concept around one workflow, deliver results with real data, and then expand based on validated outcomes."
        }
      ]
    }
  ];

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
