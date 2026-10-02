import React from 'react';

export default function TechnologyCategory({ label, isActive, onClick }) {
  return (
    <button 
      className={`tech-category-btn ${isActive ? 'active' : ''}`}
      onClick={onClick}
      aria-pressed={isActive}
    >
      {label}
    </button>
  );
}
