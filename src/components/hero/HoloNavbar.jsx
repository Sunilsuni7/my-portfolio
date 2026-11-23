import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X } from 'lucide-react';
import { ambientAudio } from '../../utils/audioSynth';

export default function HoloNavbar({ activeSection = 'home' }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const active = ambientAudio.toggle();
    setSoundEnabled(active);
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className={`holo-nav-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="holo-nav-container">
        {/* NAV PILL */}
        <div className="holo-nav-pill">
          {/* LEFT: MINIMAL DEVELOPER GEOMETRIC LOGO */}
          <a href="#home" className="holo-nav-logo" aria-label="Sunil S. - Home">
            <div className="holo-logo-icon">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                {/* Outer Hexagon */}
                <polygon
                  points="16,3 28,10 28,22 16,29 4,22 4,10"
                  stroke="#00F0FF"
                  strokeWidth="1.8"
                  fill="rgba(0, 240, 255, 0.08)"
                />
                {/* Inner Cyber developer brackets */}
                <path
                  d="M12 12L9 16L12 20"
                  stroke="#38BDF8"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 12L23 16L20 20"
                  stroke="#38BDF8"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="16" cy="16" r="2" fill="#00F0FF" />
              </svg>
            </div>
            <span className="holo-logo-text">SUNIL</span>
          </a>

          {/* CENTER: PRIMARY SECTIONS (ABOUT, PROJECTS, CONTACT) */}
          <nav className="holo-desktop-menu" aria-label="Primary Navigation">
            <a
              href="#about"
              className={`holo-nav-link ${activeSection === 'about' ? 'active' : ''}`}
            >
              ABOUT
            </a>
            <a
              href="#projects"
              className={`holo-nav-link ${activeSection === 'projects' ? 'active' : ''}`}
            >
              PROJECTS
            </a>
            <a
              href="#contact"
              className={`holo-nav-link ${activeSection === 'contact' ? 'active' : ''}`}
            >
              CONTACT
            </a>
          </nav>

          {/* RIGHT: SOUND TOGGLE & ORANGE CTA BUTTON */}
          <div className="holo-nav-right">
            {/* Functional Audio Sound Toggle */}
            <button
              type="button"
              className={`holo-sound-toggle ${soundEnabled ? 'active' : ''}`}
              onClick={handleToggleSound}
              aria-label={soundEnabled ? 'Mute ambient sound' : 'Enable futuristic ambient sound'}
              title={soundEnabled ? 'Mute ambient sound' : 'Enable futuristic ambient sound'}
            >
              {soundEnabled ? (
                <>
                  <Volume2 size={16} className="sound-icon" />
                  <span className="sound-bar-wave">
                    <span className="bar bar-1"></span>
                    <span className="bar bar-2"></span>
                    <span className="bar bar-3"></span>
                  </span>
                </>
              ) : (
                <VolumeX size={16} className="sound-icon-muted" />
              )}
            </button>

            {/* Glowing Orange CTA Button */}
            <a href="#contact" className="holo-orange-cta">
              GET IN TOUCH
            </a>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              className="holo-mobile-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {isMobileMenuOpen && (
          <div className="holo-mobile-drawer">
            <a href="#home" onClick={closeMobileMenu}>HOME</a>
            <a href="#about" onClick={closeMobileMenu}>ABOUT</a>
            <a href="#skills" onClick={closeMobileMenu}>SKILLS</a>
            <a href="#projects" onClick={closeMobileMenu}>PROJECTS</a>
            <a href="#experience" onClick={closeMobileMenu}>EXPERIENCE</a>
            <a href="#education" onClick={closeMobileMenu}>EDUCATION</a>
            <a href="#contact" onClick={closeMobileMenu}>CONTACT</a>
            <a href="#contact" className="holo-mobile-orange-cta" onClick={closeMobileMenu}>
              GET IN TOUCH
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
