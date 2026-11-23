import React from 'react';
import { contact } from '../../data/contact';
import ContactCard from './ContactCard';
import ContactForm from './ContactForm';
import ScrollReveal from '../common/ScrollReveal';

export default function Contact() {
  return (
    <section id="contact" className="section min-contact-section">
      <div className="container">
        <div className="min-contact-wrapper">
          {/* SECTION HEADER */}
          <ScrollReveal delay={0} className="section-header">
            <div className="min-section-label">
              CONTACT
            </div>
            <h2 className="section-title">
              Let's Connect
            </h2>
            <p className="min-section-subtitle">
              Have an internship opening, software project collaboration, or technical opportunity? Feel free to reach out directly.
            </p>
          </ScrollReveal>

          <div className="min-contact-layout">
            {/* LEFT COLUMN: CONTACT DETAILS */}
            <div className="min-contact-left-col">
              <ScrollReveal delay={60} className="min-contact-intro-card">
                <span className="min-sub-label">DIRECT INQUIRIES</span>
                <p className="min-contact-availability">{contact.availability}</p>
              </ScrollReveal>

              <div className="min-contact-cards-stack">
                <ScrollReveal delay={100}>
                  <ContactCard 
                    type="email" 
                    label="Email Address" 
                    value={contact.email} 
                    isEmail={true} 
                  />
                </ScrollReveal>

                <ScrollReveal delay={160}>
                  <ContactCard 
                    type="linkedin" 
                    label="LinkedIn Profile" 
                    value="linkedin.com/in/sunils7" 
                    link={contact.linkedin} 
                  />
                </ScrollReveal>

                <ScrollReveal delay={220}>
                  <ContactCard 
                    type="github" 
                    label="GitHub Profile" 
                    value="github.com/Sunilsuni7" 
                    link={contact.github} 
                  />
                </ScrollReveal>

                <ScrollReveal delay={280}>
                  <ContactCard 
                    type="location" 
                    label="Location" 
                    value={contact.location} 
                  />
                </ScrollReveal>
              </div>
            </div>

            {/* RIGHT COLUMN: CONTACT FORM */}
            <ScrollReveal delay={140} className="min-contact-right-col">
              <ContactForm />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
