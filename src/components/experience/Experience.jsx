import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { experience } from '../../data/experience';
import ExperienceTimeline from './ExperienceTimeline';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Experience() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <section id="experience" className="section darker-bg">
      <div className="container">
        <motion.div 
          className="section-header centered"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          <div className="section-label"><span className="text-accent">04 //</span> EXPERIENCE</div>
          <h2>Professional <span className="gradient-text">Journey.</span></h2>
          <p className="subtitle">Practical experience through internships and project-based development.</p>
        </motion.div>

        <div className="experience-wrapper">
          <ExperienceTimeline experiences={experience} reducedMotion={reducedMotion} />
        </div>
      </div>
    </section>
  );
}
