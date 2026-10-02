import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

export default function EducationCard({ edu, reducedMotion }) {
  return (
    <motion.div 
      className="education-card premium-card"
      variants={{
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
      }}
      whileHover={reducedMotion ? {} : { x: 5 }}
    >
      <div className="edu-icon-container">
        <GraduationCap size={32} className="text-accent" />
      </div>
      
      <div className="education-card-body">
        <h3 className="education-org">{edu.institution}</h3>
        
        <div className="education-degree-wrap">
          <span className="education-program">{edu.program}</span>
          <span className="education-type-badge">{edu.degree}</span>
        </div>
        
        {edu.period && (
          <div className="education-date">
            {edu.period}
          </div>
        )}
        
        {edu.description && (
          <div className="education-section">
            <p>{edu.description}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
