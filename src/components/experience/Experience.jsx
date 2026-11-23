import React from 'react';
import { experience } from '../../data/experience';
import ExperienceTimeline from './ExperienceTimeline';
import ScrollReveal from '../common/ScrollReveal';

export default function Experience() {
  return (
    <section id="experience" className="section min-experience-section">
      <div className="container">
        <div className="min-experience-wrapper">
          {/* SECTION HEADER */}
          <ScrollReveal delay={0} className="section-header">
            <div className="min-section-label">
              EXPERIENCE
            </div>
            <h2 className="section-title">
              Internship Experience
            </h2>
            <p className="min-section-subtitle">
              Industry internship experience developing practical web application features, backend database systems, and software solutions.
            </p>
          </ScrollReveal>

          <div className="min-experience-content">
            <ExperienceTimeline experiences={experience} />
          </div>
        </div>
      </div>
    </section>
  );
}
