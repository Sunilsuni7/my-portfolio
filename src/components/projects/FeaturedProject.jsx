import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

export default function FeaturedProject({ project, reducedMotion }) {
  if (!project) return null;
  
  return (
    <motion.article 
      className="featured-project-card premium-card"
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
      }}
    >
      <div className="featured-project-layout">
        <div className="featured-visual">
          <div className="project-visual-placeholder featured">
            <span className="project-visual-abbr">{project.title.substring(0, 2).toUpperCase()}</span>
          </div>
        </div>
        
        <div className="featured-content">
          <div className="featured-label">FEATURED PROJECT</div>
          <h3 className="featured-title">{project.title}</h3>
          
          <div className="featured-desc-box">
            <p>{project.longDescription}</p>
          </div>
          
          <div className="tech-tags featured-tags">
            {project.technologies.map(tech => (
              <span key={tech} className="tech-tag">{tech}</span>
            ))}
          </div>
          
          <ul className="featured-features">
            {project.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
          
          <div className="featured-actions">
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" className="primary-button small">
                <FaGithub size={16} /> View on GitHub
              </a>
            )}
            {project.liveDemo && (
              <a href={project.liveDemo} target="_blank" rel="noreferrer" className="outline-button small">
                <FaExternalLinkAlt size={16} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
