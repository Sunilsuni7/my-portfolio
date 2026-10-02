import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { contact } from '../../data/contact';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your name.';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    
    if (!formData.message.trim()) newErrors.message = 'Please enter a message.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setStatus('sending');
      
      // Simulate preparing the mailto client open
      setTimeout(() => {
        const subject = encodeURIComponent('Portfolio Contact');
        const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
        window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
        
        setStatus('idle');
      }, 800);
    }
  };

  return (
    <form className="contact-form premium-card" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input 
          type="text" 
          id="name" 
          value={formData.name}
          onChange={handleChange}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          placeholder="John Doe" 
          className={errors.name ? 'error-input' : ''}
        />
        {errors.name && <span id="name-error" className="error-text">{errors.name}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input 
          type="email" 
          id="email" 
          value={formData.email}
          onChange={handleChange}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          placeholder="john@example.com" 
          className={errors.email ? 'error-input' : ''}
        />
        {errors.email && <span id="email-error" className="error-text">{errors.email}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea 
          id="message" 
          rows="5" 
          value={formData.message}
          onChange={handleChange}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          placeholder="How can we work together?"
          className={errors.message ? 'error-input' : ''}
        ></textarea>
        {errors.message && <span id="message-error" className="error-text">{errors.message}</span>}
      </div>
      
      <button 
        type="submit" 
        className="primary-button w-full contact-submit-btn"
        disabled={status === 'sending'}
      >
        {status === 'sending' ? 'Opening your email client...' : (
          <>Send Message <Send size={18} /></>
        )}
      </button>
      
      {status === 'sending' && (
        <p className="form-status-msg">Your email client will open to send this message.</p>
      )}
    </form>
  );
}
