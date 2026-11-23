import React from 'react';
import { GraduationCap, Calendar, Award } from 'lucide-react';

export default function EducationCard({ edu }) {
  return (
    <div 
      className="min-education-card"
      tabIndex={0}
      role="article"
    >
      <div className="min-edu-header">
        <div className="min-edu-icon-wrap" aria-hidden="true">
          <GraduationCap size={20} />
        </div>
        <div className="min-edu-org-wrap">
          <h3 className="min-edu-institution">{edu.degree}</h3>
          <span className="min-edu-degree">{edu.institution}</span>
        </div>
        {edu.score && (
          <span className="min-edu-score-pill">
            <Award size={13} className="min-edu-award-icon" />
            {edu.score}
          </span>
        )}
      </div>

      <div className="min-edu-meta">
        <span className="min-edu-date">
          <Calendar size={13} /> {edu.period}
        </span>
      </div>

      {edu.description && (
        <p className="min-edu-description">{edu.description}</p>
      )}
    </div>
  );
}
