import { useRef, useEffect, useState } from 'react';
import { ArrowRight, Download, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import profileImg from '../../assets/profile.jpg';

const techBadges = [
  "Python",
  "Java",
  "JavaScript",
  "React",
  "SQL",
  "Git"
];

export default function Hero() {
  const heroRef = useRef(null);
  const [isHeroVisible, setIsHeroVisible] = useState(false);

  useEffect(() => {
    // Accessibility check: prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsHeroVisible(true);
      return;
    }

    const node = heroRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setIsHeroVisible(true);
      return;
    }

    // IntersectionObserver triggers when hero enters viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeroVisible(true);
        } else {
          setIsHeroVisible(false);
        }
      },
      {
        threshold: [0, 0.05, 0.1],
        rootMargin: '0px'
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="home" ref={heroRef} className="min-hero-section">
      {/* Subtle Grid Background */}
      <div className="min-hero-grid-bg" aria-hidden="true" />

      <div className="container min-hero-container">
        {/* ------------------------------------------------------------------
            1. LEFT COLUMN: HERO INFORMATION & ACTIONS
            ------------------------------------------------------------------ */}
        <div className="min-hero-left">
          {/* Main Heading with Smooth Fade-in and Flowing Gradient Shimmer Animation (PHASE 8) */}
          <h1 
            className={`min-hero-name hero-name-reveal ${isHeroVisible ? 'visible' : ''}`} 
            aria-label="SUNIL S"
          >
            <span className="sunil-animated-name">SUNIL&nbsp;S</span>
          </h1>

          {/* Education Title - Smooth fade-in starting shortly after main heading */}
          <div 
            className={`min-hero-badge hero-fade-item ${isHeroVisible ? 'visible' : ''}`}
            style={{ transitionDelay: '380ms' }}
          >
            <span className="min-badge-dot" />
            <span>Information Science Engineering Student</span>
          </div>

          {/* Subtitle - Gentle slide-up and fade-in with slight delay */}
          <h2 
            className={`min-hero-title hero-fade-item ${isHeroVisible ? 'visible' : ''}`}
            style={{ transitionDelay: '460ms' }}
          >
            Python Programming | Web Technologies | AI | Technology Enthusiast
          </h2>

          {/* Supporting Paragraph - Smooth fade-in and upward movement */}
          <p 
            className={`min-hero-desc hero-fade-item ${isHeroVisible ? 'visible' : ''}`}
            style={{ transitionDelay: '540ms' }}
          >
            I am an Information Science Engineering student passionate about Python programming, web technologies and artificial intelligence. I enjoy building practical projects, exploring new technologies and continuously improving my technical knowledge and skills.
          </p>

          {/* Technology Badges */}
          <div 
            className={`min-hero-tech-badges hero-fade-item ${isHeroVisible ? 'visible' : ''}`}
            style={{ transitionDelay: '620ms' }}
          >
            {techBadges.map((tech) => (
              <span key={tech} className="min-tech-badge">
                {tech}
              </span>
            ))}
          </div>

          {/* Hero Action Buttons - Individual Staggered Entrances with Hover & Click Effects */}
          <div className="min-hero-buttons">
            <a 
              href="#projects" 
              className={`min-btn min-btn-primary hero-btn-animate ${isHeroVisible ? 'visible' : ''}`}
              style={{ transitionDelay: '680ms' }}
            >
              View Projects <ArrowRight size={15} />
            </a>

            <a 
              href="#contact" 
              className={`min-btn min-btn-secondary hero-btn-animate ${isHeroVisible ? 'visible' : ''}`}
              style={{ transitionDelay: '750ms' }}
            >
              Contact
            </a>

            <a
              href={`${import.meta.env.BASE_URL}resume.pdf`}
              download="Sunil_S_Resume.pdf"
              className={`min-btn min-btn-secondary hero-btn-animate ${isHeroVisible ? 'visible' : ''}`}
              style={{ transitionDelay: '820ms' }}
              target="_blank"
              rel="noreferrer"
            >
              <Download size={14} /> Download Resume
            </a>
          </div>

          {/* Social Links */}
          <div 
            className={`min-hero-socials hero-fade-item ${isHeroVisible ? 'visible' : ''}`}
            style={{ transitionDelay: '890ms' }}
          >
            <a 
              href="https://github.com/Sunilsuni7" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="GitHub Profile"
              className="min-social-link"
              title="GitHub"
            >
              <FaGithub size={18} />
            </a>
            <a 
              href="https://linkedin.com/in/sunils7" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="LinkedIn Profile"
              className="min-social-link"
              title="LinkedIn"
            >
              <FaLinkedin size={18} />
            </a>
            <a 
              href="mailto:sunilsriramappa@gmail.com" 
              aria-label="Email Sunil S"
              className="min-social-link"
              title="Email sunilsriramappa@gmail.com"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* ------------------------------------------------------------------
            2. RIGHT COLUMN: PROFILE IMAGE WITH SUBTLE FADE-IN & SCALE ANIMATION
            ------------------------------------------------------------------ */}
        <div 
          className={`min-hero-right hero-image-animate ${isHeroVisible ? 'visible' : ''}`}
          style={{ transitionDelay: '220ms' }}
        >
          <div className="min-portrait-card">
            <div className="min-portrait-img-box">
              <img 
                src={profileImg} 
                alt="Sunil S - Information Science Engineering Student" 
                className="min-portrait-img"
                width="380"
                height="460"
                loading="eager"
              />
            </div>
            <div className="min-portrait-meta">
              <div className="min-portrait-meta-left">
                <span className="min-meta-name">Sunil S</span>
                <span className="min-meta-role">Bengaluru, India</span>
              </div>
              <span className="min-meta-tag">GCU 2023–2027</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
