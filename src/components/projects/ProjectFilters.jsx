import React from 'react';
import { motion } from 'framer-motion';

export default function ProjectFilters({ categories, activeCategory, onCategoryChange }) {
  return (
    <div className="project-filters-wrapper">
      <div className="project-filters">
        {categories.map(category => (
          <button
            key={category}
            className={`project-filter-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => onCategoryChange(category)}
            aria-pressed={activeCategory === category}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
