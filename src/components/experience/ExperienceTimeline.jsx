import React from 'react';
import ExperienceCard from './ExperienceCard';
import ScrollReveal from '../common/ScrollReveal';

export default function ExperienceTimeline({ experiences }) {
  return (
    <div className="min-experience-timeline-container">
      <div className="min-experience-list">
        {experiences.map((exp, idx) => (
          <ScrollReveal
            key={exp.id}
            delay={idx * 120}
            className="min-timeline-node-wrapper"
          >
            <div className="min-timeline-indicator">
              <div className="min-timeline-line" />
              <div className="min-timeline-dot-inner" />
            </div>
            
            <div className="min-timeline-card-wrapper" style={{ width: '100%' }}>
              <ExperienceCard exp={exp} />
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
