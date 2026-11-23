import React from 'react';
import { education } from '../../data/education';
import EducationCard from './EducationCard';
import CertificationGrid from './CertificationGrid';
import ScrollReveal from '../common/ScrollReveal';

export default function Education() {
  return (
    <section id="education" className="section min-education-section">
      <div className="container">
        <div className="min-education-wrapper">
          {/* SECTION HEADER */}
          <ScrollReveal delay={0} className="section-header">
            <div className="min-section-label">
              EDUCATION &amp; CERTIFICATIONS
            </div>
            <h2 className="section-title">
              Academic Background
            </h2>
            <p className="min-section-subtitle">
              Formal education in Information Science Engineering complemented by verified technical certifications.
            </p>
          </ScrollReveal>

          {/* EDUCATION HISTORY */}
          <div className="min-education-block">
            <ScrollReveal delay={60} className="min-education-sub-header">
              <span className="min-sub-label">EDUCATION</span>
              <h3 className="min-sub-title">Education History</h3>
            </ScrollReveal>
            <div className="min-education-cards-grid">
              {education.map((edu, idx) => (
                <ScrollReveal key={edu.id} delay={100 + idx * 80}>
                  <EducationCard edu={edu} />
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* CERTIFICATIONS */}
          <div id="certifications" className="min-certifications-block">
            <CertificationGrid />
          </div>
        </div>
      </div>
    </section>
  );
}
