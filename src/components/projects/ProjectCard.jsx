import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { CheckCircle2, Code2, ExternalLink } from 'lucide-react';

export default function ProjectCard({ project }) {
  return (
    <article 
      className="min-project-card"
      tabIndex={0}
      role="article"
      aria-labelledby={`project-title-${project.id}`}
    >
      {/* CARD HEADER */}
      <div className="min-project-header">
        <div className="min-project-top-row">
          <span className="min-project-category">{project.category}</span>
          <div className="min-project-icon-badge" aria-hidden="true">
            <Code2 size={15} />
          </div>
        </div>
        <h3 id={`project-title-${project.id}`} className="min-project-title">
          {project.title}
        </h3>
      </div>

      {/* OVERVIEW */}
      <p className="min-project-overview">
        {project.overview}
      </p>

      {/* KEY FEATURES */}
      <div className="min-project-features-block">
        <h4 className="min-project-subheading">Key Features</h4>
        <ul className="min-project-features-list">
          {project.features.map((feature, idx) => (
            <li key={idx} className="min-project-feature-item">
              <CheckCircle2 size={14} className="min-project-check-icon" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* TECHNOLOGIES */}
      <div className="min-project-tech-block">
        <h4 className="min-project-subheading">Technologies Used</h4>
        <div className="min-project-tech-tags">
          {project.technologies.map((tech) => (
            <span key={tech} className="min-project-tech-tag">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* ACTIONS */}
      <div className="min-project-actions">
        {project.liveDemo && (
          <a
            href={project.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            className="min-project-btn live"
            aria-label={`View live demo of ${project.title}`}
          >
            <ExternalLink size={14} />
            <span>Live Demo</span>
          </a>
        )}

        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="min-project-btn primary"
            aria-label={`View ${project.title} on GitHub`}
          >
            <FaGithub size={14} />
            <span>GitHub Repository</span>
          </a>
        )}
      </div>
    </article>
  );
}
