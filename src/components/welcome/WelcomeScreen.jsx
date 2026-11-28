import { useState, useEffect } from 'react';
import { ArrowRight, Code2, Sparkles, Terminal } from 'lucide-react';
import './WelcomeScreen.css';

export default function WelcomeScreen({ onEnter }) {
  const [isExiting, setIsExiting] = useState(false);

  const handleEnterClick = () => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      if (onEnter) onEnter();
    }, 650);
  };

  // Keyboard accessibility: press Enter to enter portfolio
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        handleEnterClick();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExiting]);

  return (
    <div
      className={`rose-welcome-root ${isExiting ? 'rose-welcome-exit' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to Sunil S Portfolio"
    >
      {/* -------------------------------------------------------------
          1. SOFT FLOWING LIGHT WAVES BACKGROUND
          ------------------------------------------------------------- */}
      <div className="rose-waves-container" aria-hidden="true">
        {/* Ambient radial lighting in Rose Copper & Soft Rose */}
        <div className="rose-ambient-glow glow-top-left" />
        <div className="rose-ambient-glow glow-top-right" />
        <div className="rose-ambient-glow glow-bottom-center" />
        <div className="rose-ambient-glow glow-bottom-right" />

        {/* Soft Flowing Light Waves (SVG Ribbons around edges & corners) */}
        <div className="rose-wave-mesh-wrapper">
          {/* Wave Layer 1 — Deep Bronze / Charcoal Soft Wave */}
          <svg className="rose-wave-svg wave-layer-1" viewBox="0 0 1440 600" preserveAspectRatio="none">
            <defs>
              <linearGradient id="roseWaveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#E18C78" stopOpacity="0.18" />
                <stop offset="35%" stopColor="#C98F83" stopOpacity="0.25" />
                <stop offset="70%" stopColor="#60463F" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#D9A99E" stopOpacity="0.15" />
              </linearGradient>
            </defs>
            <path
              d="M0,160 C320,300 420,-40 720,120 C1020,280 1120,40 1440,200 L1440,600 L0,600 Z"
              fill="url(#roseWaveGrad1)"
            />
          </svg>

          {/* Wave Layer 2 — Primary Rose Copper & Muted Pink */}
          <svg className="rose-wave-svg wave-layer-2" viewBox="0 0 1440 600" preserveAspectRatio="none">
            <defs>
              <linearGradient id="roseWaveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#D9A99E" stopOpacity="0.22" />
                <stop offset="40%" stopColor="#E18C78" stopOpacity="0.32" />
                <stop offset="75%" stopColor="#C98F83" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#E8D8D3" stopOpacity="0.18" />
              </linearGradient>
            </defs>
            <path
              d="M0,240 C280,100 540,360 840,220 C1140,80 1280,320 1440,180 L1440,600 L0,600 Z"
              fill="url(#roseWaveGrad2)"
            />
          </svg>

          {/* Wave Layer 3 — Warm Silver & Soft Rose Flow */}
          <svg className="rose-wave-svg wave-layer-3" viewBox="0 0 1440 600" preserveAspectRatio="none">
            <defs>
              <linearGradient id="roseWaveGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#E8D8D3" stopOpacity="0.12" />
                <stop offset="50%" stopColor="#E18C78" stopOpacity="0.26" />
                <stop offset="85%" stopColor="#D9A99E" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#60463F" stopOpacity="0.15" />
              </linearGradient>
            </defs>
            <path
              d="M0,320 C360,180 620,420 920,260 C1220,100 1340,300 1440,240 L1440,600 L0,600 Z"
              fill="url(#roseWaveGrad3)"
            />
          </svg>

          {/* Top Edge Flowing Wave Layer */}
          <svg className="rose-wave-svg wave-layer-top" viewBox="0 0 1440 400" preserveAspectRatio="none">
            <defs>
              <linearGradient id="roseWaveGradTop" x1="100%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#E18C78" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#C98F83" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#60463F" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <path
              d="M0,0 L1440,0 L1440,120 C1180,240 960,60 680,180 C400,300 220,90 0,160 Z"
              fill="url(#roseWaveGradTop)"
            />
          </svg>
        </div>

        {/* Subtle Floating Code Symbols in Rose Copper & Silver */}
        <div className="rose-syntax-layer">
          <span className="rose-token token-1">&lt;/&gt;</span>
          <span className="rose-token token-2">&#123; &#125;</span>
          <span className="rose-token token-3">def async</span>
          <span className="rose-token token-4">=&gt;</span>
          <span className="rose-token token-5">const</span>
          <span className="rose-token token-6">import</span>
          <span className="rose-token token-7">[ * ]</span>
          <span className="rose-token token-8">git:main</span>
          <span className="rose-token token-9">fn()</span>
          <span className="rose-token token-10">01</span>
        </div>

        {/* Soft Vignette Mask — keeps central welcome text area clear and readable */}
        <div className="rose-center-clear-mask" />
      </div>

      {/* -------------------------------------------------------------
          2. CENTRAL ELEGANT ROSE COPPER WELCOME CARD
          ------------------------------------------------------------- */}
      <div className="rose-center-container">
        <div className="rose-glass-card">
          {/* Subtle Rose Copper Top Rim Highlight */}
          <div className="rose-card-top-glow" />

          {/* Rose Copper Code Icon & Subtitle Pill */}
          <div className="rose-badge-wrap">
            <div className="rose-code-icon-badge" title="Developer Code Interface">
              <Code2 size={16} className="rose-code-icon" />
            </div>
            <div className="rose-subtitle-pill">
              <span className="rose-status-dot" />
              <span className="rose-subtitle-text">Information Science Engineering Student</span>
            </div>
          </div>

          {/* Main Heading: Welcome to Sunil S */}
          <h1 className="rose-welcome-heading">
            <span className="rose-heading-prefix">Welcome to </span>
            <span className="rose-heading-name">Sunil S</span>
          </h1>

          {/* Description Text */}
          <p className="rose-welcome-description">
            Explore my portfolio, skills, projects and experience.
          </p>

          {/* Elegant Rose Copper Subtle Decorative Accent */}
          <div className="rose-divider-accent">
            <span className="rose-divider-line line-left" />
            <Sparkles size={14} className="rose-sparkle-icon" />
            <span className="rose-divider-line line-right" />
          </div>

          {/* Main Button: LOGIN / ENTER PORTFOLIO → */}
          <div className="rose-action-wrap">
            <button
              type="button"
              className="rose-enter-btn"
              onClick={handleEnterClick}
              aria-label="Enter Portfolio"
              autoFocus
            >
              <span className="rose-btn-shimmer" />
              <span className="rose-btn-content">
                <span className="rose-btn-label">LOGIN / ENTER PORTFOLIO</span>
                <span className="rose-btn-arrow-wrap">
                  <ArrowRight size={18} className="rose-btn-arrow" />
                </span>
              </span>
            </button>
            <span className="rose-btn-hint">Press Enter or click to enter portfolio</span>
          </div>
        </div>
      </div>
    </div>
  );
}
