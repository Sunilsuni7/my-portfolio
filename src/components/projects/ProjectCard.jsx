import React from 'react';
import { motion } from 'framer-motion';

export default function ProjectCard({ project, onOpenModal, reducedMotion }) {
  return (
    <motion.article 
      className="project-card premium-card"
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
      }}
      whileHover={reducedMotion ? {} : { y: -5 }}
    >
      <div className="project-card-visual" onClick={() => onOpenModal(project)}>
        {/* Placeholder visual if no image */}
        <div className="project-visual-placeholder">
          <span className="project-visual-abbr">{project.title.substring(0, 2).toUpperCase()}</span>
        </div>
      </div>
      
      <div className="project-card-content">
        <div className="project-card-header">
          <span className="project-card-category">{project.category}</span>
          <h3 className="project-card-title">{project.title}</h3>
        </div>
        
        <p className="project-card-desc">{project.description}</p>
        
        <div className="tech-tags">
          {project.technologies.slice(0, 4).map(tech => (
            <span key={tech} className="tech-tag small">{tech}</span>
          ))}
          {project.technologies.length > 4 && (
            <span className="tech-tag small">+{project.technologies.length - 4}</span>
          )}
        </div>
        
        <button className="view-project-btn" onClick={() => onOpenModal(project)}>
          View Project
        </button>
      </div>
    </motion.article>
  );
}
