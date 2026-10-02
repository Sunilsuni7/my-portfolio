import React from 'react';
import { motion } from 'framer-motion';

export default function TechnologyCard({ tech, reducedMotion }) {
  const Icon = tech.icon;

  return (
    <motion.div 
      className="tech-card premium-card"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
      }}
      whileHover={reducedMotion ? {} : { y: -5, scale: 1.02 }}
      tabIndex={0}
    >
      <div className="tech-card-header">
        <div className="tech-card-icon">
          <Icon size={24} />
        </div>
        <div>
          <h3>{tech.name}</h3>
          <span className="tech-card-category">{tech.category}</span>
        </div>
      </div>
      
      <p className="tech-card-desc">{tech.description}</p>
      
      {tech.projects && tech.projects.length > 0 && (
        <div className="tech-card-projects">
          <strong>Related:</strong>
          <ul>
            {tech.projects.map((project, idx) => (
              <li key={idx}>• {project}</li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}
