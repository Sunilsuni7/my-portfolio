import React, { useState } from 'react';
import { Mail, MapPin, Copy, Check, ExternalLink } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function ContactCard({ type, label, value, link, isEmail }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'email':
        return <Mail size={18} />;
      case 'linkedin':
        return <FaLinkedin size={18} />;
      case 'github':
        return <FaGithub size={18} />;
      case 'location':
        return <MapPin size={18} />;
      default:
        return null;
    }
  };

  return (
    <div 
      className="min-contact-card"
      tabIndex={0}
      role="article"
    >
      <div className="min-contact-icon-wrap" aria-hidden="true">
        {getIcon()}
      </div>

      <div className="min-contact-info">
        <span className="min-contact-label">{label}</span>
        
        {isEmail ? (
          <div className="min-contact-action-row">
            <a href={`mailto:${value}`} className="min-contact-value link">
              {value}
            </a>
            <button 
              type="button" 
              onClick={handleCopy} 
              className="min-copy-btn" 
              title="Copy to clipboard"
              aria-label="Copy email address"
            >
              {copied ? <Check size={14} className="text-green" /> : <Copy size={14} />}
            </button>
          </div>
        ) : link ? (
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="min-contact-value link"
            aria-label={`Visit Sunil's ${label}`}
          >
            <span>{value}</span>
            <ExternalLink size={12} className="min-ext-icon" />
          </a>
        ) : (
          <span className="min-contact-value">{value}</span>
        )}
      </div>
    </div>
  );
}
