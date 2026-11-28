import { useState, useEffect } from "react";
import WelcomeScreen from "./components/welcome/WelcomeScreen";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Contact from "./components/contact/Contact";
import TechnologyStack from "./components/TechnologyStack";
import Projects from "./components/projects/Projects";
import Experience from "./components/experience/Experience";
import Education from "./components/education/Education";
import ScrollReveal from "./components/common/ScrollReveal";
import WaveBackground from "./components/common/WaveBackground";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { ArrowUp, Monitor } from "lucide-react";
import "./App.css";

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const handleScroll = () => {
      // 1. If near top, activate About
      if (window.scrollY < 120) {
        setActiveSection("about");
        return;
      }

      // 2. If near page bottom, activate Certifications (last section)
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80;
      if (isAtBottom) {
        setActiveSection("certifications");
        return;
      }

      // 3. Priority check for certifications (nested inside education section)
      const certEl = document.getElementById("certifications");
      if (certEl) {
        const certRect = certEl.getBoundingClientRect();
        if (certRect.top <= 260 && certRect.bottom >= 120) {
          setActiveSection("certifications");
          return;
        }
      }

      // 4. Check primary navigation targets in order of page placement (bottom to top for accurate detection)
      // Exact top-to-bottom sequence: about -> contact -> skills -> projects -> experience -> education -> certifications
      const sectionTargets = [
        { id: "certifications", navId: "certifications" },
        { id: "education", navId: "education" },
        { id: "experience", navId: "experience" },
        { id: "projects", navId: "projects" },
        { id: "skills", navId: "skills" },
        { id: "contact", navId: "contact" },
        { id: "about", navId: "about" },
      ];

      for (const target of sectionTargets) {
        const el = document.getElementById(target.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 260 && rect.bottom >= 100) {
            setActiveSection(target.navId);
            return;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="portfolio-root">
      {/* DEVELOPER-THEMED WELCOME LANDING SCREEN (APPEARS FIRST) */}
      {showWelcome && (
        <WelcomeScreen onEnter={() => setShowWelcome(false)} />
      )}

      {/* ANIMATED MULTI-COLOUR WAVE BACKGROUND */}
      <WaveBackground />

      {/* FLOATING MODERN NAVIGATION BAR */}
      <Navbar activeSection={activeSection} />

      <div className="portfolio">
        <main>
          {/* 1. ABOUT SECTION (FIRST SECTION IMMEDIATELY BELOW NAVBAR) */}
          <About />

          {/* 2. CONTACT SECTION */}
          <Contact />

          {/* 3. SKILLS / TECHNOLOGY STACK SECTION */}
          <TechnologyStack />

          {/* 4. PROJECTS SECTION */}
          <Projects />

          {/* 5. EXPERIENCE SECTION */}
          <Experience />

          {/* 6. EDUCATION & CERTIFICATIONS SECTION */}
          <Education />
        </main>

        {/* MINIMAL PROFESSIONAL FOOTER WITH SMOOTH ENTRANCE */}
        <footer className="pro-footer">
          <ScrollReveal delay={0} threshold={0.01} rootMargin="0px" className="container pro-footer-content">
            <div className="pro-footer-left">
              <span className="pro-footer-copy">© 2026 Sunil S All Rights Reserved.</span>
            </div>

            <div className="pro-footer-socials">
              <a 
                href="https://github.com/Sunilsuni7" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="GitHub Profile"
                className="pro-footer-icon"
              >
                <FaGithub size={18} />
              </a>
              <a 
                href="https://linkedin.com/in/sunils7" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="LinkedIn Profile"
                className="pro-footer-icon"
              >
                <FaLinkedin size={18} />
              </a>
              <button
                type="button"
                className="pro-welcome-replay-btn"
                onClick={() => {
                  window.scrollTo({ top: 0 });
                  setShowWelcome(true);
                }}
                title="Return to Developer Welcome Screen"
                aria-label="Return to Developer Welcome Screen"
              >
                <Monitor size={16} />
              </button>
              <a 
                href="#about" 
                className="pro-back-to-top" 
                aria-label="Back to top"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <ArrowUp size={16} />
              </a>
            </div>
          </ScrollReveal>
        </footer>
      </div>
    </div>
  );
}

export default App;
