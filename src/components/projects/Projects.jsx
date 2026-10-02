import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../../data/projects';
import ProjectFilters from './ProjectFilters';
import FeaturedProject from './FeaturedProject';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const categories = ['All', 'AI & ML', 'Full Stack', 'Frontend', 'Java / Database'];

  const featuredProject = projects.find(p => p.featured);
  
  const filteredProjects = useMemo(() => {
    let filtered = projects.filter(p => !p.featured);
    if (activeCategory !== 'All') {
      filtered = filtered.filter(p => p.category === activeCategory);
    }
    return filtered;
  }, [activeCategory]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <section id="projects" className="section">
      <div className="container">
        <motion.div 
          className="section-header centered"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          <div className="section-label"><span className="text-accent">03 //</span> SELECTED WORK</div>
          <h2><span className="gradient-text">Projects.</span></h2>
          <p className="subtitle">Selected projects where I apply software development, AI, data, and web technologies to build practical applications.</p>
        </motion.div>

        <ProjectFilters 
          categories={categories} 
          activeCategory={activeCategory} 
          onCategoryChange={setActiveCategory} 
        />

        {activeCategory === 'All' && featuredProject && (
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="featured-section-wrapper"
          >
            <FeaturedProject project={featuredProject} reducedMotion={reducedMotion} />
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          <motion.div 
            key={activeCategory}
            className="projects-grid"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={containerVariants}
          >
            {filteredProjects.map(project => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onOpenModal={setSelectedProject}
                reducedMotion={reducedMotion}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <ProjectModal 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
}
