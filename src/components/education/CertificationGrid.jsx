import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CertificationCard from './CertificationCard';
import { certifications } from '../../data/certifications';

export default function CertificationGrid({ reducedMotion }) {
  const [activeFilter, setActiveFilter] = useState('All');
  
  // Extract unique categories, keeping "All" at the front
  const categories = ['All', ...new Set(certifications.map(c => c.category))];
  
  const filteredCerts = activeFilter === 'All' 
    ? certifications 
    : certifications.filter(c => c.category === activeFilter);

  return (
    <div className="certification-section">
      <div className="cert-section-header">
        <h3>Certifications</h3>
      </div>
      
      {categories.length > 2 && (
        <div className="project-filters-wrapper cert-filters-wrapper">
          <div className="project-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`project-filter-btn ${activeFilter === category ? 'active' : ''}`}
                onClick={() => setActiveFilter(category)}
                aria-pressed={activeFilter === category}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div 
          key={activeFilter}
          className="certifications-grid"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
        >
          {filteredCerts.map(cert => (
            <CertificationCard key={cert.id} cert={cert} reducedMotion={reducedMotion} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
