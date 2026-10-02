import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Copy, Check, ExternalLink } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function ContactCard({ type, label, value, link, isEmail, reducedMotion }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.preventDefault();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'email': return <Mail size={20} className="text-accent" />;
      case 'linkedin': return <FaLinkedin size={20} className="text-accent" />;
      case 'github': return <FaGithub size={20} className="text-accent" />;
      default: return null;
    }
  };

  return (
    <motion.div 
      className="contact-card-box premium-card"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
      }}
      whileHover={reducedMotion ? {} : { y: -5 }}
    >
      <div className="contact-card-icon">
        {getIcon()}
      </div>
      <div className="contact-card-content">
        <h4>{label}</h4>
        <p className="contact-card-value">{value}</p>
        
        {isEmail ? (
          <button onClick={handleCopy} className="contact-action-btn">
            {copied ? (
              <><Check size={14} className="text-green-400" /> Copied!</>
            ) : (
              <><Copy size={14} /> Copy Email →</>
            )}
          </button>
        ) : (
          <a href={link} target="_blank" rel="noreferrer" className="contact-action-link">
            Visit Profile <ExternalLink size={14} />
          </a>
        )}
      </div>
    </motion.div>
  );
}
