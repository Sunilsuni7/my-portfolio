import React from 'react';
import { motion } from 'framer-motion';
import ExperienceCard from './ExperienceCard';
import { Briefcase } from 'lucide-react';

export default function ExperienceTimeline({ experiences, reducedMotion }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const lineVariants = {
    hidden: { height: 0 },
    visible: { height: '100%', transition: { duration: 1, ease: 'easeInOut' } }
  };

  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.4 } }
  };

  return (
    <div className="experience-timeline-container">
      <motion.div 
        className="timeline-track-wrapper"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div className="timeline-track-line" variants={lineVariants} />
      </motion.div>
      
      <motion.div 
        className="experience-list"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {experiences.map((exp, index) => (
          <div key={exp.id} className="timeline-node-wrapper">
            <motion.div className="timeline-dot-wrapper" variants={dotVariants}>
              <div className="timeline-dot-inner">
                <Briefcase size={16} />
              </div>
            </motion.div>
            
            <div className="timeline-card-wrapper">
              <ExperienceCard exp={exp} reducedMotion={reducedMotion} />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
