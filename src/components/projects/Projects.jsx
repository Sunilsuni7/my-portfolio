import React from "react";
import { projects } from "../../data/projects";
import ProjectCard from "./ProjectCard";
import ScrollReveal from "../common/ScrollReveal";

export default function Projects() {
  return (
    <section id="projects" className="section min-projects-section">
      <div className="container">
        <div className="min-projects-wrapper">
          {/* SECTION HEADER */}
          <ScrollReveal delay={0} className="section-header">
            <div className="min-section-label">
              PROJECTS
            </div>

            <h2 className="section-title">
              Featured Projects
            </h2>

            <p className="min-section-subtitle">
              Practical software engineering applications showcasing frontend development, RESTful APIs, database integration, and applied AI systems.
            </p>
          </ScrollReveal>

          {/* THREE-COLUMN PROJECT GRID */}
          <div className="min-projects-grid">
            {projects.map((project, idx) => (
              <ScrollReveal
                key={project.id}
                delay={idx * 120}
                as="div"
                style={{ height: '100%' }}
              >
                <ProjectCard project={project} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
