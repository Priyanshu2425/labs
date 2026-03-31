import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.scss';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [theme, setTheme] = useState<'dark'|'light'>('dark');
  const location = useLocation();

  const navLinks = [
    { name: 'Services', path: '/our-services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'AI Lab', path: '/ai-lab' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact-us' }
  ];

  useEffect(() => {
    // Check local storage for theme
    const savedTheme = localStorage.getItem('app-theme') as 'dark' | 'light';
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      // Default to dark
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('app-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = documentHeight > 0 ? Math.round((scrollPosition / documentHeight) * 100) : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <Link to="/" className={styles.logo}>
          labs.dimssu.com
        </Link>

        {/* Navigation & Utilities */}
        <div className={styles.rightSection}>
          <nav className={styles.navDesktop}>
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`${styles.navLink} ${location.pathname === link.path ? styles.active : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Theme Toggle Button */}
          <button 
            className={styles.themeToggleBtn} 
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Scroll Progress Indicator */}
          <div className={styles.scrollProgressBlock}>
            <div className={styles.scrollProgress}>
              <span className={styles.scrollText}>// scroll to explore</span>
              <span className={styles.progressText}>
                progress: <span className={styles.progressValue}>{scrollProgress}%</span>
              </span>
            </div>
            
            {/* Mobile menu button inside the right block for alignment */}
            <button 
              className={styles.mobileMenuBtn}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={`${styles.mobileNavLink} ${location.pathname === link.path ? styles.active : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
