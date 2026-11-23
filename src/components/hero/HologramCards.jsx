import { MapPin, ArrowUpRight, Download } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function HologramCards() {
  return (
    <div className="holo-cards-wrapper">
      {/* Animated Hologram SVG Connector Lines */}
      <svg className="holo-connector-svg" viewBox="0 0 800 560" aria-hidden="true">
        <defs>
          <linearGradient id="cyanLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.9" />
            <stop offset="65%" stopColor="#00F0FF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.2" />
          </linearGradient>
          <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="glow" />
            <feComposite in="SourceGraphic" in2="glow" operator="over" />
          </filter>
        </defs>

        {/* Line 1: From Card 1 Right Anchor towards Center Avatar Chest */}
        <path
          className="connector-path path-1"
          d="M 440 105 L 510 105 L 590 170 L 670 170"
          stroke="url(#cyanLineGrad)"
          strokeWidth="1.8"
          fill="none"
          filter="url(#cyanGlow)"
        />
        {/* Node dots on Line 1 */}
        <circle cx="440" cy="105" r="3.5" fill="#00F0FF" className="connector-dot" />
        <circle cx="510" cy="105" r="2.5" fill="#38BDF8" />
        <circle cx="590" cy="170" r="2.5" fill="#38BDF8" />
        <circle cx="670" cy="170" r="4.5" fill="#00F0FF" className="connector-dot pulse" />
        <circle cx="670" cy="170" r="8" stroke="#00F0FF" strokeWidth="1" fill="none" opacity="0.6" />

        {/* Line 2: From Card 2 Right Anchor towards Center Avatar Midsection */}
        <path
          className="connector-path path-2"
          d="M 440 370 L 505 370 L 575 305 L 660 305"
          stroke="url(#cyanLineGrad)"
          strokeWidth="1.8"
          fill="none"
          filter="url(#cyanGlow)"
        />
        {/* Node dots on Line 2 */}
        <circle cx="440" cy="370" r="3.5" fill="#00F0FF" className="connector-dot" />
        <circle cx="505" cy="370" r="2.5" fill="#38BDF8" />
        <circle cx="575" cy="305" r="2.5" fill="#38BDF8" />
        <circle cx="660" cy="305" r="4.5" fill="#00F0FF" className="connector-dot pulse" />
        <circle cx="660" cy="305" r="8" stroke="#00F0FF" strokeWidth="1" fill="none" opacity="0.6" />
      </svg>

      {/* CARD 1: IDENTITY & ROLE */}
      <div className="holo-glass-card holo-card-primary">
        <div className="holo-card-corner-tl"></div>
        <div className="holo-card-corner-br"></div>
        
        <div className="holo-card-status">
          <span className="holo-status-pulse"></span>
          <span className="holo-status-text">HOLOGRAPHIC PROFILE &bull; ACTIVE</span>
        </div>

        <h1 className="holo-developer-name">Sunil S.</h1>
        <div className="holo-developer-role">Aspiring Software Developer</div>

        <div className="holo-location-row">
          <MapPin size={15} className="holo-cyan-icon" />
          <span>Bengaluru, India</span>
        </div>

        <div className="holo-node-anchor anchor-card-1"></div>
      </div>

      {/* CARD 2: STATEMENT & ACTIONS */}
      <div className="holo-glass-card holo-card-secondary">
        <div className="holo-card-corner-tl"></div>
        <div className="holo-card-corner-br"></div>

        <div className="holo-card-tag">SYSTEM SUMMARY</div>

        <p className="holo-card-quote">
          &ldquo;Information Science Engineering student passionate about building practical software solutions and exploring Python, Java and web development.&rdquo;
        </p>

        {/* Tech Focus Highlights */}
        <div className="holo-tech-pills">
          <span className="holo-pill">Python</span>
          <span className="holo-pill">Java</span>
          <span className="holo-pill">React</span>
          <span className="holo-pill">Full-Stack</span>
        </div>

        {/* Interactive Action Buttons */}
        <div className="holo-card-buttons">
          <a href="#projects" className="holo-btn holo-btn-primary">
            Explore Projects <ArrowUpRight size={15} />
          </a>
          <a
            href={`${import.meta.env.BASE_URL}resume.pdf`}
            download="Sunil_S_Resume.pdf"
            className="holo-btn holo-btn-outline"
            target="_blank"
            rel="noreferrer"
          >
            <Download size={14} /> Resume
          </a>
        </div>

        {/* Direct Social Links */}
        <div className="holo-card-socials">
          <a
            href="https://github.com/Sunilsuni7"
            target="_blank"
            rel="noreferrer"
            className="holo-social-icon"
            aria-label="GitHub Profile"
          >
            <FaGithub size={17} />
          </a>
          <a
            href="https://www.linkedin.com/in/sunil-s-460a5937b"
            target="_blank"
            rel="noreferrer"
            className="holo-social-icon"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedin size={17} />
          </a>
        </div>

        <div className="holo-node-anchor anchor-card-2"></div>
      </div>
    </div>
  );
}
