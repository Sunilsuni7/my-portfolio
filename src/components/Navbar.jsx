import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar({ activeSection = 'home' }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMobileMenuOpen(false);

  const navLinks = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Contact', href: '#contact', id: 'contact' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Education', href: '#education', id: 'education' },
    { label: 'Certifications', href: '#certifications', id: 'certifications' },
  ];

  return (
    <header className={`ref-navbar-wrapper ${isScrolled ? 'scrolled' : ''}`}>
      <div className="ref-navbar-container">
        {/* DESKTOP NAVIGATION */}
        <nav className="ref-nav-links" aria-label="Main Navigation">
          {navLinks.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`ref-nav-link ${activeSection === item.id ? 'active' : ''}`}
            >
              {item.label}
              {activeSection === item.id && <span className="ref-nav-active-pill" />}
            </a>
          ))}
        </nav>

        {/* RIGHT CTA BUTTON */}
        <div className="ref-nav-actions">
          <a href="#contact" className="ref-gradient-btn nav-cta">
            Get in Touch
          </a>

          <button
            type="button"
            className="ref-mobile-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* MOBILE MENU DRAWER */}
        {isMobileMenuOpen && (
          <div className="ref-mobile-drawer">
            {navLinks.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`ref-mobile-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}
            <a href="#contact" className="ref-gradient-btn mobile-cta" onClick={closeMenu}>
              Get in Touch
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
