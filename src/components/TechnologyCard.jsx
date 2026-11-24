import React from 'react';

export default function TechnologyCard({ skill }) {
  const Icon = skill.icon;

  return (
    <div 
      className="min-skill-badge min-skill-card"
      tabIndex={0}
      role="listitem"
      aria-label={skill.name}
    >
      <div className="min-skill-badge-icon min-skill-icon-wrap" aria-hidden="true">
        {Icon && <Icon size={16} />}
      </div>
      <span className="min-skill-badge-name min-skill-name">{skill.name}</span>
    </div>
  );
}
