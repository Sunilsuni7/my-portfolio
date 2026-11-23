import React from 'react';

export default function TechnologyCategory({ label, isActive, onClick }) {
  return (
    <button 
      type="button"
      className={`min-category-tab ${isActive ? 'active' : ''}`}
      onClick={onClick}
      aria-pressed={isActive}
    >
      {label}
    </button>
  );
}
