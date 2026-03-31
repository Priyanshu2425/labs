import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import styles from './CodeSnippet.module.scss';

interface CodeSnippetProps {
  code: string;
  language?: string;
}

export default function CodeSnippet({ code, language = 'python' }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Convert pure text code into numbered lines for a terminal look
  const lines = code.trim().split('\n');

  return (
    <div className={styles.snippetContainer}>
      <div className={styles.header}>
        <div className={styles.dots}>
          <span className={styles.dot} style={{ backgroundColor: '#ff5f56' }} />
          <span className={styles.dot} style={{ backgroundColor: '#ffbd2e' }} />
          <span className={styles.dot} style={{ backgroundColor: '#27c93f' }} />
        </div>
        <span className={styles.language}>{language}</span>
        <button className={styles.copyBtn} onClick={handleCopy} aria-label="Copy code">
          {copied ? <Check size={16} color="#27c93f" /> : <Copy size={16} />}
        </button>
      </div>
      <div className={styles.codeBody}>
        <code>
          {lines.map((line, index) => (
            <div key={index} className={styles.line}>
              <span className={styles.lineNumber}>{index + 1}</span>
              <span className={styles.lineContent}>{line}</span>
            </div>
          ))}
        </code>
      </div>
    </div>
  );
}
