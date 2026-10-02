import { useState, useEffect, Suspense, lazy } from "react";
const Hero3DScene = lazy(() => import('./Hero3D'));
import About from "./components/About";
import TechnologyStack from "./components/TechnologyStack";
import Projects from "./components/projects/Projects";
import Experience from "./components/experience/Experience";
import Education from "./components/education/Education";
import Contact from "./components/contact/Contact";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, ArrowDown } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import profile from "./assets/profile.jpg";
import "./App.css";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ["home", "about", "skills", "projects", "experience", "education", "contact"];
      const current = sections.find(section => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top >= -200 && rect.top <= 300;
        }
        return false;
      });
      
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="portfolio">
      {/* NAVBAR */}
      <header className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="nav-container">

          <nav className="nav-links desktop-nav">
            {["Home", "About", "Skills", "Projects", "Experience", "Education", "Contact"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className={activeSection === item.toLowerCase() ? "active" : ""}
              >
                {item}
              </a>
            ))}
          </nav>

          <a href="#contact" className="nav-button desktop-nav">
            Let's Talk
          </a>

          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {["Home", "About", "Skills", "Projects", "Experience", "Education", "Contact"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                onClick={closeMenu}
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* HERO */}
        <section id="home" className="hero">
          <div className="hero-container">
            <motion.div 
              className="hero-content"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp} className="available badge">
                <span className="dot"></span>
                HELLO, I'M
              </motion.div>

              <motion.h1 variants={fadeUp}>
                Sunil S.
              </motion.h1>

              <motion.p variants={fadeUp} className="hero-role text-accent gradient-text" style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>
                Python & Full-Stack Developer
              </motion.p>

              <motion.p variants={fadeUp} className="hero-description">
                An Information Science Engineering student focusing on software development, Python, machine learning, and building digital experiences that matter.
              </motion.p>

              <motion.div variants={fadeUp} className="hero-buttons">
                <a href="#projects" className="primary-button">
                  Explore Projects <ChevronRight size={18} />
                </a>
                <a
                  href="/resume.pdf"
                  className="outline-button"
                  target="_blank"
                  rel="noreferrer"
                >
                  Download Resume
                </a>
              </motion.div>

              <motion.div variants={fadeUp} className="hero-socials">
                <a href="https://github.com/Sunilsuni7" target="_blank" rel="noreferrer" aria-label="GitHub">
                  <FaGithub size={22} />
                </a>
                <a href="https://www.linkedin.com/in/sunil-s-460a5937b" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <FaLinkedin size={22} />
                </a>
              </motion.div>
            </motion.div>

            <motion.div 
              className="hero-visual hero-3d-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <Suspense fallback={
                <div className="profile-presentation">
                  <div className="profile-glow"></div>
                  <img src={profile} alt="Sunil S. - Software Developer" className="profile-image" width="300" height="300" />
                </div>
              }>
                <Hero3DScene />
              </Suspense>
            </motion.div>
          </div>
          
          <motion.div 
            className="scroll-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <span>SCROLL TO EXPLORE</span>
            <div className="arrow-down-bounce">
              <ArrowDown size={20} />
            </div>
          </motion.div>
        </section>

        {/* ABOUT */}
        <About />

        {/* SKILLS */}
        <TechnologyStack />

        {/* PROJECTS */}
        <Projects />

        {/* EXPERIENCE */}
        <Experience />

        {/* EDUCATION */}
        <Education />

        {/* CONTACT */}
        <Contact />
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-brand">
            <strong>Sunil<span>S.</span></strong>
            <p>Software Developer</p>
          </div>
          
          <div className="footer-copyright">
            © 2026 Sunil S. All rights reserved.
          </div>
          
          <a href="#home" className="back-to-top">
            Back to top ↑
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;