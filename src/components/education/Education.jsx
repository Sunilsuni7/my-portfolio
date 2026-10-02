import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { education } from '../../data/education';
import EducationCard from './EducationCard';
import CertificationGrid from './CertificationGrid';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Education() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const lineVariants = {
    hidden: { height: 0 },
    visible: { height: '100%', transition: { duration: 1, ease: 'easeInOut' } }
  };

  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.4 } }
  };

  return (
    <section id="education" className="section">
      <div className="container">
        <motion.div 
          className="section-header centered"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          <div className="section-label"><span className="text-accent">05 //</span> EDUCATION</div>
          <h2>Academic <span className="gradient-text">Background.</span></h2>
          <p className="subtitle">Academic foundation and certifications supporting my software development journey.</p>
        </motion.div>

        <div className="education-showcase">
          <div className="education-timeline-section">
            <h3 className="education-timeline-title">Education</h3>
            
            <div className="experience-timeline-container education-timeline-container">
              <motion.div 
                className="timeline-track-wrapper"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.div className="timeline-track-line" variants={lineVariants} />
              </motion.div>
              
              <div className="experience-list">
                {education.map(edu => (
                  <div key={edu.id} className="timeline-node-wrapper">
                    <motion.div 
                      className="timeline-dot-wrapper"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-100px" }}
                      variants={dotVariants}
                    >
                      <div className="timeline-dot-inner" />
                    </motion.div>
                    
                    <div className="timeline-card-wrapper">
                      <EducationCard edu={edu} reducedMotion={reducedMotion} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="certifications-section-wrapper">
            <CertificationGrid reducedMotion={reducedMotion} />
          </div>
        </div>
      </div>
    </section>
  );
}
