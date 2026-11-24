import React from 'react';
import { Award, Calendar, ShieldCheck } from 'lucide-react';

export default function CertificationCard({ cert }) {
  return (
    <div 
      className="min-cert-card"
      tabIndex={0}
      role="article"
    >
      <div className="min-cert-header">
        <div className="min-cert-icon-wrap" aria-hidden="true">
          <Award size={18} />
        </div>
        <div className="min-cert-badge-row">
          <span className="min-cert-pill min-pill-verified">
            <ShieldCheck size={12} className="min-pill-icon" />
            <span>Verified</span>
          </span>
          <span className="min-cert-pill min-pill-provider">{cert.organization}</span>
        </div>
      </div>

      <h4 className="min-cert-title">{cert.title}</h4>

      <div className="min-cert-meta">
        <span className="min-cert-date">
          <Calendar size={13} /> {cert.completionDate || cert.date}
        </span>
      </div>

      {cert.skills && cert.skills.length > 0 && (
        <div className="min-cert-skills">
          {cert.skills.map((skill) => (
            <span key={skill} className="min-cert-skill-tag">
              {skill}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
