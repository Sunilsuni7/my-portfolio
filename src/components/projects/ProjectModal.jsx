import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';

export default function ProjectModal({ project, isOpen, onClose }) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="modal-content premium-card"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          onClick={e => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <button 
            className="modal-close-btn" 
            onClick={onClose}
            aria-label="Close modal"
          >
            <FaTimes size={20} />
          </button>
          
          <div className="modal-header">
            <span className="project-card-category">{project.category}</span>
            <h2 id="modal-title">{project.title}</h2>
          </div>
          
          <div className="modal-body">
            <div className="modal-section">
              <h3>Overview</h3>
              <p>{project.longDescription}</p>
            </div>
            
            {project.features && project.features.length > 0 && (
              <div className="modal-section">
                <h3>Key Features</h3>
                <ul>
                  {project.features.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
              </div>
            )}
            
            <div className="modal-section">
              <h3>Technology Stack</h3>
              <div className="tech-tags">
                {project.technologies.map(tech => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
            
            <div className="modal-actions">
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer" className="primary-button">
                  <FaGithub size={18} /> View on GitHub
                </a>
              )}
              {project.liveDemo && (
                <a href={project.liveDemo} target="_blank" rel="noreferrer" className="outline-button">
                  <FaExternalLinkAlt size={18} /> Live Demo
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
