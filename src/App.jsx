import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/hero/Hero";
import TechnologyStack from "./components/TechnologyStack";
import Projects from "./components/projects/Projects";
import Experience from "./components/experience/Experience";
import Education from "./components/education/Education";
import About from "./components/About";
import Contact from "./components/contact/Contact";
import ScrollReveal from "./components/common/ScrollReveal";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { ArrowUp } from "lucide-react";
import "./App.css";

function App() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      // 1. If near top, activate Home
      if (window.scrollY < 120) {
        setActiveSection("home");
        return;
      }

      // 2. If near page bottom, activate Contact
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80;
      if (isAtBottom) {
        setActiveSection("contact");
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

      // 4. Check primary navigation targets in order of page placement
      // Layout sequence: home -> skills -> projects -> experience -> education (with certifications) -> about -> contact
      const sectionTargets = [
        { id: "contact", navId: "contact" },
        { id: "about", navId: "about" },
        { id: "certifications", navId: "certifications" },
        { id: "education", navId: "education" },
        { id: "experience", navId: "experience" },
        { id: "projects", navId: "projects" },
        { id: "skills", navId: "skills" },
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
      {/* FLOATING MODERN NAVIGATION BAR */}
      <Navbar activeSection={activeSection} />

      <div className="portfolio">
        <main>
        {/* HERO SECTION WITH REAL PROFILE PHOTOGRAPH */}
        <Hero />

        {/* SKILLS / TECHNOLOGY STACK SECTION */}
        <TechnologyStack />

        {/* PROJECTS SECTION */}
        <Projects />

        {/* EXPERIENCE SECTION */}
        <Experience />

        {/* EDUCATION & CERTIFICATIONS SECTION */}
        <Education />

        {/* ABOUT SECTION (TWO-COLUMN PROFESSIONAL LAYOUT AT DOWN SIDE) */}
        <About />

        {/* CONTACT SECTION */}
        <Contact />
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
            <a href="#home" className="pro-back-to-top" aria-label="Back to top">
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
