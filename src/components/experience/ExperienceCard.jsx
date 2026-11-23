import React from 'react';
import { Briefcase, CheckCircle2, Calendar } from 'lucide-react';

export default function ExperienceCard({ exp }) {
  return (
    <div className="min-experience-card">
      <div className="min-exp-header">
        <div className="min-exp-role-group">
          <div className="min-exp-org-badge">
            <Briefcase size={14} className="min-exp-briefcase-icon" />
            <span className="min-exp-org">{exp.organization}</span>
          </div>
          <h3 className="min-exp-role">{exp.role}</h3>
        </div>
        <div className="min-exp-meta-pills">
          {exp.duration && (
            <span className="min-exp-duration-pill">
              <Calendar size={13} className="min-exp-cal-icon" />
              {exp.duration}
            </span>
          )}
          {exp.type && (
            <span className="min-exp-type-pill">{exp.type}</span>
          )}
        </div>
      </div>

      {exp.project && (
        <div className="min-exp-project-row">
          <span className="min-exp-label">Project:</span>
          <span className="min-exp-project-name">{exp.project}</span>
        </div>
      )}

      <div className="min-exp-responsibilities">
        <h4 className="min-exp-section-title">Key Responsibilities</h4>
        <ul className="min-exp-bullets">
          {exp.responsibilities.map((resp, idx) => (
            <li key={idx} className="min-exp-bullet-item">
              <CheckCircle2 size={16} className="min-exp-check-icon" />
              <span>{resp}</span>
            </li>
          ))}
        </ul>
      </div>

      {exp.technologies && exp.technologies.length > 0 && (
        <div className="min-exp-techs">
          <h4 className="min-exp-section-title">Core Competencies</h4>
          <div className="min-exp-tech-tags">
            {exp.technologies.map((tech) => (
              <span key={tech} className="min-exp-tech-tag">
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
