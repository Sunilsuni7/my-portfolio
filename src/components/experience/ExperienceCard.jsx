import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, ChevronRight, ExternalLink } from 'lucide-react';

export default function ExperienceCard({ exp, reducedMotion }) {
  return (
    <motion.div 
      className="experience-card premium-card"
      variants={{
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
      }}
      whileHover={reducedMotion ? {} : { x: 5 }}
    >
      <div className="experience-card-header">
        <h3 className="experience-org">{exp.organization}</h3>
        <div className="experience-role-wrap">
          <span className="experience-role">{exp.role}</span>
          <span className="experience-type-badge">{exp.type}</span>
        </div>
        <div className="experience-date">
          <Calendar size={14} /> {exp.startDate} – {exp.endDate}
        </div>
      </div>
      
      <div className="experience-card-body">
        <div className="experience-project-box">
          <strong>Project:</strong> {exp.project}
        </div>
        
        <div className="experience-section">
          <h4>Overview</h4>
          <p>{exp.description}</p>
        </div>
        
        <div className="experience-section">
          <h4>Responsibilities</h4>
          <ul>
            {exp.responsibilities.map((req, idx) => (
              <li key={idx}>{req}</li>
            ))}
          </ul>
        </div>
        
        <div className="experience-section">
          <h4>Technologies</h4>
          <div className="tech-tags">
            {exp.technologies.map(tech => (
              <span key={tech} className="tech-tag small">{tech}</span>
            ))}
          </div>
        </div>
        
        <div className="experience-actions">
          {exp.projectId && (
            <a href={`#projects`} className="view-project-link">
              View Project <ChevronRight size={16} />
            </a>
          )}
          {exp.certificateUrl && (
            <a href={exp.certificateUrl} target="_blank" rel="noreferrer" className="outline-button small">
              <ExternalLink size={14} /> View Certificate
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
