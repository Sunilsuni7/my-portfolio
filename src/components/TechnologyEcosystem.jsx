import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const DesktopSVG = ({ reducedMotion }) => {
  const nodeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  };

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 1, transition: { duration: 1, ease: "easeInOut" } }
  };

  return (
    <svg viewBox="0 0 1200 700" style={{ width: '100%', height: 'auto' }} className="eco-svg">
      <defs>
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8e72ff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#8e72ff" stopOpacity="0.2" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <linearGradient id="boxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a1a24" />
          <stop offset="100%" stopColor="#101018" />
        </linearGradient>
      </defs>

      {/* Connection Paths */}
      <motion.g initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
        <motion.path d="M 600 120 L 600 200" stroke="url(#lineGrad)" strokeWidth="2" fill="none" variants={pathVariants} />
        <motion.path d="M 600 280 L 600 320 L 350 320 L 350 400" stroke="url(#lineGrad)" strokeWidth="2" fill="none" variants={pathVariants} />
        <motion.path d="M 600 280 L 600 320 L 850 320 L 850 400" stroke="url(#lineGrad)" strokeWidth="2" fill="none" variants={pathVariants} />
        <motion.path d="M 350 480 L 350 540 L 600 540 L 600 600" stroke="url(#lineGrad)" strokeWidth="2" fill="none" variants={pathVariants} />
        <motion.path d="M 850 480 L 850 540 L 600 540 L 600 600" stroke="url(#lineGrad)" strokeWidth="2" fill="none" variants={pathVariants} />
      </motion.g>

      {/* Nodes */}
      <motion.g initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} transition={{ staggerChildren: 0.2, delayChildren: 0.5 }}>
        
        {/* AI / Gemini */}
        <motion.g variants={nodeVariants} whileHover={reducedMotion ? {} : { scale: 1.05 }} style={{ cursor: 'pointer' }}>
          <rect x="475" y="40" width="250" height="80" rx="12" fill="url(#boxGrad)" stroke="#8e72ff" strokeWidth="1.5" filter="url(#glow)" />
          <text x="600" y="75" fill="#ffffff" fontSize="18" fontWeight="600" textAnchor="middle">AI / Gemini</text>
          <text x="600" y="98" fill="#a1a1aa" fontSize="14" textAnchor="middle">Intelligence</text>
        </motion.g>

        {/* Python */}
        <motion.g variants={nodeVariants} whileHover={reducedMotion ? {} : { scale: 1.05 }} style={{ cursor: 'pointer' }}>
          <rect x="475" y="200" width="250" height="80" rx="12" fill="url(#boxGrad)" stroke="#8e72ff" strokeWidth="1" />
          <text x="600" y="235" fill="#ffffff" fontSize="18" fontWeight="600" textAnchor="middle">PYTHON</text>
          <text x="600" y="258" fill="#a1a1aa" fontSize="14" textAnchor="middle">Core Logic</text>
        </motion.g>

        {/* FastAPI */}
        <motion.g variants={nodeVariants} whileHover={reducedMotion ? {} : { scale: 1.05 }} style={{ cursor: 'pointer' }}>
          <rect x="225" y="400" width="250" height="80" rx="12" fill="url(#boxGrad)" stroke="#8e72ff" strokeWidth="1" />
          <text x="350" y="435" fill="#ffffff" fontSize="18" fontWeight="600" textAnchor="middle">FastAPI</text>
          <text x="350" y="458" fill="#a1a1aa" fontSize="14" textAnchor="middle">Backend</text>
        </motion.g>

        {/* React */}
        <motion.g variants={nodeVariants} whileHover={reducedMotion ? {} : { scale: 1.05 }} style={{ cursor: 'pointer' }}>
          <rect x="725" y="400" width="250" height="80" rx="12" fill="url(#boxGrad)" stroke="#8e72ff" strokeWidth="1" />
          <text x="850" y="435" fill="#ffffff" fontSize="18" fontWeight="600" textAnchor="middle">React</text>
          <text x="850" y="458" fill="#a1a1aa" fontSize="14" textAnchor="middle">Frontend</text>
        </motion.g>

        {/* Database */}
        <motion.g variants={nodeVariants} whileHover={reducedMotion ? {} : { scale: 1.05 }} style={{ cursor: 'pointer' }}>
          <rect x="475" y="600" width="250" height="80" rx="12" fill="url(#boxGrad)" stroke="#8e72ff" strokeWidth="1" />
          <text x="600" y="635" fill="#ffffff" fontSize="18" fontWeight="600" textAnchor="middle">Database</text>
          <text x="600" y="658" fill="#a1a1aa" fontSize="14" textAnchor="middle">SQLite / MySQL</text>
        </motion.g>

      </motion.g>

      {/* Animated Particles */}
      {!reducedMotion && (
        <motion.g>
          <motion.circle r="4" fill="#8e72ff" filter="url(#glow)"
            animate={{
              offsetDistance: ["0%", "100%"],
              opacity: [0, 1, 0]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            style={{ offsetPath: "path('M 600 120 L 600 200')" }}
          />
          <motion.circle r="4" fill="#8e72ff" filter="url(#glow)"
            animate={{
              offsetDistance: ["0%", "100%"],
              opacity: [0, 1, 0]
            }}
            transition={{ duration: 4, delay: 1, repeat: Infinity, ease: "linear" }}
            style={{ offsetPath: "path('M 600 280 L 600 320 L 350 320 L 350 400')" }}
          />
          <motion.circle r="4" fill="#8e72ff" filter="url(#glow)"
            animate={{
              offsetDistance: ["0%", "100%"],
              opacity: [0, 1, 0]
            }}
            transition={{ duration: 4, delay: 2, repeat: Infinity, ease: "linear" }}
            style={{ offsetPath: "path('M 600 280 L 600 320 L 850 320 L 850 400')" }}
          />
        </motion.g>
      )}
    </svg>
  );
};

const MobileSVG = ({ reducedMotion }) => {
  const nodeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 1, transition: { duration: 1, ease: "easeInOut" } }
  };

  return (
    <svg viewBox="0 0 400 900" style={{ width: '100%', height: 'auto' }} className="eco-svg">
      <defs>
        <linearGradient id="lineGradMobile" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8e72ff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#8e72ff" stopOpacity="0.2" />
        </linearGradient>
        <filter id="glowMobile" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <linearGradient id="boxGradMobile" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a1a24" />
          <stop offset="100%" stopColor="#101018" />
        </linearGradient>
      </defs>

      {/* Connection Paths */}
      <motion.g initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
        <motion.path d="M 200 120 L 200 180" stroke="url(#lineGradMobile)" strokeWidth="2" fill="none" variants={pathVariants} />
        <motion.path d="M 200 260 L 200 320" stroke="url(#lineGradMobile)" strokeWidth="2" fill="none" variants={pathVariants} />
        <motion.path d="M 200 400 L 200 460" stroke="url(#lineGradMobile)" strokeWidth="2" fill="none" variants={pathVariants} />
        <motion.path d="M 200 540 L 200 600" stroke="url(#lineGradMobile)" strokeWidth="2" fill="none" variants={pathVariants} />
      </motion.g>

      {/* Nodes */}
      <motion.g initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} transition={{ staggerChildren: 0.2, delayChildren: 0.3 }}>
        
        <motion.g variants={nodeVariants}>
          <rect x="75" y="40" width="250" height="80" rx="10" fill="url(#boxGradMobile)" stroke="#8e72ff" strokeWidth="1.5" filter="url(#glowMobile)" />
          <text x="200" y="75" fill="#ffffff" fontSize="18" fontWeight="600" textAnchor="middle">AI / Gemini</text>
          <text x="200" y="98" fill="#a1a1aa" fontSize="14" textAnchor="middle">Intelligence</text>
        </motion.g>

        <motion.g variants={nodeVariants}>
          <rect x="75" y="180" width="250" height="80" rx="10" fill="url(#boxGradMobile)" stroke="#8e72ff" strokeWidth="1" />
          <text x="200" y="215" fill="#ffffff" fontSize="18" fontWeight="600" textAnchor="middle">PYTHON</text>
          <text x="200" y="238" fill="#a1a1aa" fontSize="14" textAnchor="middle">Core Logic</text>
        </motion.g>

        <motion.g variants={nodeVariants}>
          <rect x="75" y="320" width="250" height="80" rx="10" fill="url(#boxGradMobile)" stroke="#8e72ff" strokeWidth="1" />
          <text x="200" y="355" fill="#ffffff" fontSize="18" fontWeight="600" textAnchor="middle">FastAPI</text>
          <text x="200" y="378" fill="#a1a1aa" fontSize="14" textAnchor="middle">Backend</text>
        </motion.g>

        <motion.g variants={nodeVariants}>
          <rect x="75" y="460" width="250" height="80" rx="10" fill="url(#boxGradMobile)" stroke="#8e72ff" strokeWidth="1" />
          <text x="200" y="495" fill="#ffffff" fontSize="18" fontWeight="600" textAnchor="middle">React</text>
          <text x="200" y="518" fill="#a1a1aa" fontSize="14" textAnchor="middle">Frontend</text>
        </motion.g>

        <motion.g variants={nodeVariants}>
          <rect x="75" y="600" width="250" height="80" rx="10" fill="url(#boxGradMobile)" stroke="#8e72ff" strokeWidth="1" />
          <text x="200" y="635" fill="#ffffff" fontSize="18" fontWeight="600" textAnchor="middle">Database</text>
          <text x="200" y="658" fill="#a1a1aa" fontSize="14" textAnchor="middle">SQLite / MySQL</text>
        </motion.g>
      </motion.g>
    </svg>
  );
};

export default function TechnologyEcosystem() {
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);

    return () => {
      window.removeEventListener('resize', handleResize);
      mediaQuery.removeEventListener('change', handler);
    };
  }, []);

  return (
    <motion.div 
      className="ecosystem-container premium-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="ecosystem-header">
        <h3>Developer Ecosystem</h3>
        <p>How the technologies in my portfolio connect across frontend, backend, data, and AI workflows.</p>
      </div>
      
      <div className="ecosystem-diagram-wrapper">
        {isMobile ? (
          <MobileSVG reducedMotion={reducedMotion} />
        ) : (
          <DesktopSVG reducedMotion={reducedMotion} />
        )}
      </div>
    </motion.div>
  );
}
