import React from 'react';
import { GraduationCap, MapPin, Sparkles } from 'lucide-react';
import ScrollReveal from './common/ScrollReveal';

export default function About() {
  return (
    <section id="about" className="section min-about-section">
      <div className="container">
        <div className="min-about-wrapper">
          {/* SECTION HEADER */}
          <ScrollReveal delay={0} className="section-header">
            <div className="min-section-label">
              ABOUT
            </div>
            <h2 className="section-title">
              About Me
            </h2>
          </ScrollReveal>

          {/* MINIMALIST ABOUT CONTENT */}
          <div className="min-about-grid">
            <ScrollReveal delay={80} className="min-about-left">
              <div className="min-card min-about-card">
                <h3 className="min-card-heading">Professional Summary</h3>
                <p className="min-summary-text">
                  An Information Science Engineering student with foundational knowledge of Python, SQL and web technologies. Familiar with MySQL and React.js. Hands-on experience developing projects involving application development, database integration and problem-solving skills.
                </p>

                <div className="min-highlights-list">
                  <ScrollReveal delay={140} className="min-highlight-item">
                    <GraduationCap size={18} className="min-check-icon" />
                    <div>
                      <strong>Information Science Engineering Student</strong>
                      <p>Currently pursuing Bachelor of Engineering at Garden City University (2023 — 2027).</p>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal delay={200} className="min-highlight-item">
                    <MapPin size={18} className="min-check-icon" />
                    <div>
                      <strong>Bengaluru, India</strong>
                      <p>Based in Bengaluru, actively seeking internships and software engineering opportunities.</p>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal delay={260} className="min-highlight-item">
                    <Sparkles size={18} className="min-check-icon" />
                    <div>
                      <strong>Interest in software development and practical applications</strong>
                      <p>Dedicated to writing clean, maintainable code, developing database-backed applications, and solving real-world challenges.</p>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
