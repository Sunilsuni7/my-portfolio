import { useState, useEffect } from 'react';
import { ArrowRight, Terminal, Code2, Monitor, Sparkles, CheckCircle2 } from 'lucide-react';
import './WelcomeScreen.css';

export default function WelcomeScreen({ onEnter }) {
  const [isExiting, setIsExiting] = useState(false);
  const [typedLineIndex, setTypedLineIndex] = useState(0);

  const codeSnippets = [
    { num: '01', text: '// Sunil S — Developer Workstation', type: 'comment' },
    { num: '02', text: 'import { EngineeringStudent, Developer } from "@sunil/core";', type: 'import' },
    { num: '03', text: '', type: 'empty' },
    { num: '04', text: 'const profile: Developer = {', type: 'decl' },
    { num: '05', text: '  name: "Sunil S",', type: 'prop' },
    { num: '06', text: '  discipline: "Information Science Engineering",', type: 'prop' },
    { num: '07', text: '  institution: "Garden City University (2023–2027)",', type: 'prop' },
    { num: '08', text: '  focus: ["Python", "React", "SQL", "Web Technologies", "AI"],', type: 'prop' },
    { num: '09', text: '  status: "Ready to Innovate & Collaborate"', type: 'prop' },
    { num: '10', text: '};', type: 'decl' },
    { num: '11', text: '', type: 'empty' },
    { num: '12', text: 'export async function initializePortfolio() {', type: 'func' },
    { num: '13', text: '  await profile.loadProjects({ featured: true });', type: 'body' },
    { num: '14', text: '  return profile.launchDashboard();', type: 'body' },
    { num: '15', text: '}', type: 'func' },
  ];

  // Subtle code reveal ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setTypedLineIndex((prev) => (prev < codeSnippets.length ? prev + 1 : prev));
    }, 140);
    return () => clearInterval(interval);
  }, [codeSnippets.length]);

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
    <div className={`welcome-screen-root ${isExiting ? 'welcome-screen-exit' : ''}`} role="dialog" aria-modal="true" aria-label="Welcome to Sunil S Portfolio">
      {/* -------------------------------------------------------------
          1. REALISTIC DEVELOPER WORKSPACE BACKGROUND
          ------------------------------------------------------------- */}
      <div className="dev-workspace-backdrop" aria-hidden="true">
        {/* Soft radial ambient bias lighting */}
        <div className="dev-ambient-glow glow-cyan" />
        <div className="dev-ambient-glow glow-ice-blue" />
        <div className="dev-ambient-glow glow-violet" />
        <div className="dev-grid-pattern" />

        {/* Ambient Floating Syntax Particles */}
        <div className="dev-floating-syntax-layer">
          <span className="floating-syntax token-1">&lt;/&gt;</span>
          <span className="floating-syntax token-2">&#123; &#125;</span>
          <span className="floating-syntax token-3">def async</span>
          <span className="floating-syntax token-4">=&gt;</span>
          <span className="floating-syntax token-5">const</span>
          <span className="floating-syntax token-6">import</span>
          <span className="floating-syntax token-7">[ * ]</span>
          <span className="floating-syntax token-8">git:main</span>
          <span className="floating-syntax token-9">fn()</span>
          <span className="floating-syntax token-10">01</span>
          <span className="floating-syntax token-11">await</span>
          <span className="floating-syntax token-12">&amp;&amp;</span>
        </div>

        {/* Developer Desk & Programming Monitor Setup */}
        <div className="dev-workstation-scenery">
          {/* Ambient LED bias lighting behind monitor */}
          <div className="monitor-bias-lighting" />

          {/* Computer Monitor */}
          <div className="dev-monitor-chassis">
            {/* Monitor Top Bezel / Camera */}
            <div className="dev-monitor-bezel-top">
              <span className="monitor-webcam-dot" />
            </div>

            {/* Dark Code Editor Screen */}
            <div className="dev-editor-display">
              {/* Window Header */}
              <div className="dev-editor-header">
                <div className="dev-window-controls">
                  <span className="window-dot dot-close" />
                  <span className="window-dot dot-minimize" />
                  <span className="window-dot dot-maximize" />
                </div>
                <div className="dev-editor-tabs">
                  <div className="dev-editor-tab active">
                    <Code2 size={13} className="tab-icon" />
                    <span>developer_profile.ts</span>
                  </div>
                  <div className="dev-editor-tab">
                    <span>portfolio.py</span>
                  </div>
                  <div className="dev-editor-tab">
                    <span>App.jsx</span>
                  </div>
                </div>
                <div className="dev-editor-breadcrumb">
                  <span>sunil-portfolio &gt; src &gt; workstation</span>
                </div>
              </div>

              {/* Editor Workspace: Code lines & Syntax */}
              <div className="dev-code-surface">
                {codeSnippets.map((line, idx) => (
                  <div
                    key={line.num}
                    className={`dev-code-line line-${line.type} ${idx <= typedLineIndex ? 'line-revealed' : ''}`}
                  >
                    <span className="line-num">{line.num}</span>
                    <span className="line-content">{line.text}</span>
                  </div>
                ))}
              </div>

              {/* Embedded Editor Terminal */}
              <div className="dev-editor-terminal">
                <div className="terminal-header">
                  <Terminal size={12} className="terminal-icon" />
                  <span>TERMINAL — zsh (sunil-dev)</span>
                  <span className="terminal-status">● PORT 5173 ACTIVE</span>
                </div>
                <div className="terminal-body">
                  <span className="terminal-prompt">sunil@workstation:~/my-portfolio$</span>
                  <span className="terminal-cmd">npm run dev --ready</span>
                  <span className="terminal-cursor" />
                </div>
              </div>
            </div>

            {/* Monitor Stand */}
            <div className="dev-monitor-neck" />
            <div className="dev-monitor-base" />
          </div>

          {/* Desk Surface & Silhouette Accessories */}
          <div className="dev-desk-surface">
            <div className="desk-mat">
              {/* Subtle Keyboard Silhouette */}
              <div className="keyboard-chassis">
                <div className="keyboard-glow-underlay" />
                <div className="keyboard-keys-hint" />
              </div>
            </div>
            {/* Minimalist Coffee Mug */}
            <div className="dev-desk-accessory coffee-mug">
              <div className="coffee-steam" />
            </div>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------
          2. CENTRAL PROMINENT WELCOME CARD
          ------------------------------------------------------------- */}
      <div className="welcome-center-container">
        <div className="welcome-glass-card">
          {/* Subtle Ambient Card Glow */}
          <div className="card-ambient-highlight" />

          {/* Top Badge: Information Science Engineering Student */}
          <div className="welcome-badge">
            <span className="welcome-badge-dot" />
            <span className="welcome-badge-text">Information Science Engineering Student</span>
          </div>

          {/* Main Heading: Welcome to Sunil S */}
          <h1 className="welcome-heading">
            <span className="welcome-heading-prefix">Welcome to </span>
            <span className="welcome-heading-name">Sunil S</span>
          </h1>

          {/* Subtitle / Description */}
          <p className="welcome-subtitle">
            Explore my technical skills, projects and professional journey.
          </p>

          {/* Developer Highlights Ticker */}
          <div className="welcome-meta-pills">
            <span className="welcome-pill">
              <CheckCircle2 size={13} className="pill-check" />
              Python &amp; Full Stack
            </span>
            <span className="welcome-pill">
              <CheckCircle2 size={13} className="pill-check" />
              Web Technologies
            </span>
            <span className="welcome-pill">
              <CheckCircle2 size={13} className="pill-check" />
              AI &amp; Data Engineering
            </span>
          </div>

          {/* Prominent Action Button: LOGIN / ENTER PORTFOLIO → */}
          <div className="welcome-action-wrap">
            <button
              type="button"
              className="welcome-enter-btn"
              onClick={handleEnterClick}
              aria-label="Enter Portfolio"
              autoFocus
            >
              <span className="enter-btn-bg-shimmer" />
              <span className="enter-btn-content">
                <span className="enter-btn-label">LOGIN / ENTER PORTFOLIO</span>
                <span className="enter-btn-arrow-wrap">
                  <ArrowRight size={18} className="enter-btn-arrow" />
                </span>
              </span>
            </button>
            <span className="welcome-btn-hint">Press Enter or click to enter</span>
          </div>
        </div>
      </div>
    </div>
  );
}