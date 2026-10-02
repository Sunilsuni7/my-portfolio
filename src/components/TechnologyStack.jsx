import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { categories, technologies } from '../data/technologies';
import TechnologyCategory from './TechnologyCategory';
import TechnologyCard from './TechnologyCard';
import TechnologyEcosystem from './TechnologyEcosystem';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function TechnologyStack() {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const filteredTechs = useMemo(() => {
    return technologies.filter(t => t.category === activeCategory);
  }, [activeCategory]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <section id="skills" className="section darker-bg">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="section-header centered">
            <motion.div variants={fadeUp} className="section-label">
              <span className="text-accent">02 //</span> TECHNOLOGY STACK
            </motion.div>
            <motion.h2 variants={fadeUp}>
              Tools I <span className="gradient-text">build with.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="subtitle">
              A practical ecosystem of technologies used across my projects.
            </motion.p>
          </div>

          <motion.div variants={fadeUp} className="tech-categories-wrapper">
            <div className="tech-categories">
              {categories.map(cat => (
                <TechnologyCategory
                  key={cat.id}
                  label={cat.label}
                  isActive={activeCategory === cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                />
              ))}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={activeCategory}
              className="tech-cards-grid"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={containerVariants}
            >
              {filteredTechs.map(tech => (
                <TechnologyCard 
                  key={tech.id} 
                  tech={tech} 
                  reducedMotion={reducedMotion} 
                />
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="ecosystem-section">
            <TechnologyEcosystem />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
