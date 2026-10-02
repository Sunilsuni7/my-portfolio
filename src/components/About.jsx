import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Layout, Terminal, Cpu, ArrowDown } from 'lucide-react';
import DeveloperInfoCard from './DeveloperInfoCard';
import DeveloperCodeBlock from './DeveloperCodeBlock';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function About() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <section id="about" className="section">
      <div className="container">
        <motion.div 
          className="about-wrapper"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="about-header">
            <motion.div variants={fadeUp} className="section-label">
              <span className="text-accent">01 //</span> ABOUT
            </motion.div>
            <motion.h2 variants={fadeUp}>
              Building with <span className="gradient-text">code, data & AI.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="about-intro">
              I'm an Information Science Engineering student focused on building practical web applications, AI-powered tools, and full-stack software using Python, React, APIs, databases, and modern development technologies.
            </motion.p>
          </div>

          <div className="about-grid-layout">
            <div className="cards-grid">
              <DeveloperInfoCard 
                title="EDUCATION" 
                icon={GraduationCap} 
                items={["Information Science Engineering", "Garden City University"]}
                reducedMotion={reducedMotion}
              />
              <DeveloperInfoCard 
                title="DEVELOPMENT FOCUS" 
                icon={Layout} 
                items={["Python", "Full-Stack Development", "AI Applications"]}
                reducedMotion={reducedMotion}
              />
              <DeveloperInfoCard 
                title="CURRENT STACK" 
                icon={Terminal} 
                items={["Python", "React", "JavaScript", "FastAPI", "SQL"]}
                reducedMotion={reducedMotion}
              />
              <DeveloperInfoCard 
                title="CURRENTLY BUILDING" 
                icon={Cpu} 
                items={["Intelligent AI Productivity Assistant", "HealthCarePro – Smart Healthcare Management System"]}
                reducedMotion={reducedMotion}
              />
            </div>
            
            <div className="code-visual-wrapper">
              <DeveloperCodeBlock reducedMotion={reducedMotion} />
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="section-transition"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <span>TECHNOLOGY STACK</span>
          <div className="arrow-down-bounce">
            <ArrowDown size={20} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
