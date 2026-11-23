import React from 'react';

export default function TechnologyCard({ skill }) {
  const Icon = skill.icon;

  return (
    <div 
      className="min-skill-card"
      tabIndex={0}
      role="listitem"
    >
      <div className="min-skill-icon-wrap" aria-hidden="true">
        {Icon && <Icon size={18} />}
      </div>
      <span className="min-skill-name">{skill.name}</span>
    </div>
  );
}
