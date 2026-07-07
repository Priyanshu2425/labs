import { useId, useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import styles from './Accordion.module.scss';

interface AccordionProps {
  question: string;
  answer: string;
}

export default function Accordion({ question, answer }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();

  return (
    <div className={`${styles.accordionContainer} ${isOpen ? styles.open : ''}`}>
      <button
        className={`${styles.accordionHeader} ${isOpen ? styles.open : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <h3 className={styles.question}>{question}</h3>
        <span className={styles.iconContainer}>
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </span>
      </button>

      {/* The answer is ALWAYS rendered, so it is present in the server HTML for
          featured-snippet / People-Also-Ask crawlers. It collapses purely with
          CSS (grid-template-rows) and never leaves the DOM. */}
      <div id={panelId} className={styles.answerWrap}>
        <div className={styles.answerInner}>
          <div className={styles.accordionContent}>
            <p className={styles.answer}>{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
