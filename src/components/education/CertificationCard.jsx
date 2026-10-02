import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';

export default function CertificationCard({ cert, reducedMotion }) {
  return (
    <motion.div 
      className="certification-card premium-card"
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
      }}
      whileHover={reducedMotion ? {} : { y: -5 }}
    >
      <div className="cert-header">
        <Award size={24} className="text-accent cert-icon" />
        <span className="cert-category">{cert.category}</span>
      </div>
      
      <div className="cert-body">
        <h4 className="cert-title">{cert.title}</h4>
        <div className="cert-meta">
          <span className="cert-org">{cert.organization}</span>
          {cert.date && <span className="cert-date">• {cert.date}</span>}
        </div>
        
        {cert.skills && cert.skills.length > 0 && (
          <div className="tech-tags cert-tags">
            {cert.skills.map(skill => (
              <span key={skill} className="tech-tag small">{skill}</span>
            ))}
          </div>
        )}
      </div>

      {cert.certificateUrl && (
        <div className="cert-actions">
          <a href={cert.certificateUrl} target="_blank" rel="noreferrer" className="view-cert-link">
            View Certificate <ExternalLink size={14} />
          </a>
        </div>
      )}
    </motion.div>
  );
}
