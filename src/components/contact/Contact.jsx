import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { contact } from '../../data/contact';
import ContactCard from './ContactCard';
import ContactForm from './ContactForm';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Contact() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <section id="contact" className="section contact-section darker-bg">
      <div className="container">
        <motion.div 
          className="section-header centered"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          <div className="section-label"><span className="text-accent">06 //</span> WHAT'S NEXT</div>
          <h2>Let's <span className="gradient-text">Connect.</span></h2>
          <p className="subtitle">Have a project, opportunity, or question? Feel free to get in touch.</p>
        </motion.div>

        <div className="contact-layout">
          <motion.div 
            className="contact-left-col"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
          >
            <div className="contact-intro">
              <p>{contact.availability}</p>
            </div>
            
            <div className="contact-cards-stack">
              <ContactCard 
                type="email" 
                label="Email" 
                value={contact.email} 
                isEmail={true} 
                reducedMotion={reducedMotion} 
              />
              
              <ContactCard 
                type="linkedin" 
                label="LinkedIn" 
                value="Professional Profile" 
                link={contact.linkedin} 
                reducedMotion={reducedMotion} 
              />
              
              <ContactCard 
                type="github" 
                label="GitHub" 
                value="Projects & Code" 
                link={contact.github} 
                reducedMotion={reducedMotion} 
              />
            </div>
          </motion.div>
          
          <motion.div 
            className="contact-right-col"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <ContactForm />
          </motion.div>
        </div>
        
        <motion.div 
          className="cta-banner"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
        >
          <h4>Open to Opportunities</h4>
          <p>Interested in connecting? Reach out through email or LinkedIn.</p>
        </motion.div>
      </div>
    </section>
  );
}
