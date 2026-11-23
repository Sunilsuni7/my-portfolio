import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import CertificationCard from './CertificationCard';
import { certifications } from '../../data/certifications';
import ScrollReveal from '../common/ScrollReveal';
import { Award, Calendar, CheckCircle, Maximize2, X, ExternalLink, User } from 'lucide-react';

export default function CertificationGrid() {
  const [activeModalCert, setActiveModalCert] = useState(null);

  const imageCerts = certifications.filter((c) => c.hasImage);
  const otherCerts = certifications.filter((c) => !c.hasImage);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveModalCert(null);
    };
    if (activeModalCert) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeModalCert]);

  return (
    <div className="min-certifications-wrapper">
      <ScrollReveal delay={60} className="min-cert-section-header">
        <span className="min-sub-label">CERTIFICATIONS</span>
        <h3 className="min-sub-title">Certifications &amp; Professional Training</h3>
      </ScrollReveal>

      {/* ------------------------------------------------------------------
          VERIFIED CERTIFICATE CARDS WITH ACTUAL IMAGES
          ------------------------------------------------------------------ */}
      <div className="min-featured-certs-stack">
        {imageCerts.map((cert, idx) => (
          <ScrollReveal
            key={cert.id}
            delay={80 + idx * 100}
            className="min-featured-cert-block"
          >
            <div className="min-featured-cert-card" role="article" tabIndex={0}>
              {/* LEFT / TOP: CERTIFICATE IMAGE THUMBNAIL */}
              <div className="min-featured-cert-media">
                <button
                  type="button"
                  className="min-cert-img-btn"
                  onClick={() => setActiveModalCert(cert)}
                  aria-label={`View larger version of ${cert.title} certificate`}
                >
                  <div className="min-cert-img-frame">
                    <img
                      src={cert.image}
                      alt={`${cert.organization} - ${cert.title} awarded to ${cert.recipient}`}
                      className="min-cert-img"
                      loading="lazy"
                    />
                    <div className="min-cert-hover-overlay" aria-hidden="true">
                      <span className="min-cert-zoom-pill">
                        <Maximize2 size={15} />
                        <span>Click to view larger</span>
                      </span>
                    </div>
                  </div>
                </button>
              </div>

              {/* RIGHT / BOTTOM: CERTIFICATE DETAILS */}
              <div className="min-featured-cert-content">
                <div className="min-cert-badge-row">
                  <span className="min-cert-verified-pill">
                    <CheckCircle size={14} className="min-verified-icon" />
                    Verified Certificate
                  </span>
                  <span className="min-cert-org-badge">{cert.organization}</span>
                </div>

                <h4 className="min-featured-cert-title">{cert.title}</h4>

                <div className="min-cert-meta-grid">
                  <div className="min-cert-meta-item">
                    <User size={14} className="min-meta-icon" />
                    <div>
                      <span className="min-meta-label">Recipient</span>
                      <strong className="min-meta-value">{cert.recipient}</strong>
                    </div>
                  </div>

                  <div className="min-cert-meta-item">
                    <Award size={14} className="min-meta-icon" />
                    <div>
                      <span className="min-meta-label">Organization</span>
                      <strong className="min-meta-value">{cert.organization}</strong>
                    </div>
                  </div>

                  {cert.completionDate && cert.issuedDate ? (
                    <>
                      <div className="min-cert-meta-item">
                        <Calendar size={14} className="min-meta-icon" />
                        <div>
                          <span className="min-meta-label">Completion Date</span>
                          <strong className="min-meta-value">{cert.completionDate}</strong>
                        </div>
                      </div>

                      <div className="min-cert-meta-item">
                        <Calendar size={14} className="min-meta-icon" />
                        <div>
                          <span className="min-meta-label">Issued Date</span>
                          <strong className="min-meta-value">{cert.issuedDate}</strong>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="min-cert-meta-item">
                      <Calendar size={14} className="min-meta-icon" />
                      <div>
                        <span className="min-meta-label">Date</span>
                        <strong className="min-meta-value">{cert.completionDate || cert.date}</strong>
                      </div>
                    </div>
                  )}
                </div>

                {cert.skills && (
                  <div className="min-featured-cert-skills">
                    <span className="min-skills-label">Core Competencies:</span>
                    <div className="min-skills-tags-wrap">
                      {cert.skills.map((skill) => (
                        <span key={skill} className="min-cert-skill-tag">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="min-cert-actions">
                  <button
                    type="button"
                    className="min-btn min-btn-primary min-cert-view-btn"
                    onClick={() => setActiveModalCert(cert)}
                  >
                    <Maximize2 size={14} />
                    <span>View Larger Certificate</span>
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* ------------------------------------------------------------------
          ADDITIONAL CERTIFICATIONS (FALLBACK FOR NON-IMAGE CERTS)
          ------------------------------------------------------------------ */}
      {otherCerts.length > 0 && (
        <div className="min-additional-certs-section">
          <div className="min-additional-certs-grid">
            {otherCerts.map((cert, idx) => (
              <ScrollReveal key={cert.id} delay={180 + idx * 80}>
                <CertificationCard cert={cert} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------
          FULLSCREEN CERTIFICATE LIGHTBOX MODAL
          ------------------------------------------------------------------ */}
      {activeModalCert && typeof document !== 'undefined' && createPortal(
        <div
          className="min-cert-modal-backdrop"
          onClick={() => setActiveModalCert(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${activeModalCert.title} Full View`}
        >
          <div
            className="min-cert-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* MODAL HEADER */}
            <div className="min-cert-modal-header">
              <div className="min-cert-modal-title-wrap">
                <span className="min-cert-modal-org">{activeModalCert.organization}</span>
                <h3 className="min-cert-modal-title">{activeModalCert.title}</h3>
                <span className="min-cert-modal-recipient">Awarded to {activeModalCert.recipient}</span>
              </div>

              <button
                type="button"
                className="min-cert-modal-close-btn"
                onClick={() => setActiveModalCert(null)}
                aria-label="Close certificate modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* MODAL IMAGE */}
            <div className="min-cert-modal-body">
              <img
                src={activeModalCert.image}
                alt={`${activeModalCert.organization} - ${activeModalCert.title}`}
                className="min-cert-modal-img"
              />
            </div>

            {/* MODAL FOOTER */}
            <div className="min-cert-modal-footer">
              <div className="min-cert-modal-dates">
                {activeModalCert.completionDate && activeModalCert.issuedDate ? (
                  <>
                    <span>Completed: <strong>{activeModalCert.completionDate}</strong></span>
                    <span className="min-modal-dot">•</span>
                    <span>Issued: <strong>{activeModalCert.issuedDate}</strong></span>
                  </>
                ) : (
                  <span>Date: <strong>{activeModalCert.completionDate || activeModalCert.date}</strong></span>
                )}
              </div>

              <div className="min-cert-modal-actions">
                <a
                  href={`${import.meta.env.BASE_URL}${activeModalCert.imagePublicPath}`}
                  target="_blank"
                  rel="noreferrer"
                  className="min-cert-modal-link"
                >
                  <ExternalLink size={14} />
                  <span>Open Full Resolution</span>
                </a>
                <button
                  type="button"
                  className="min-btn min-btn-secondary min-modal-close-action"
                  onClick={() => setActiveModalCert(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
