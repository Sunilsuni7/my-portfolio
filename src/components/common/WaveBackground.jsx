import React from 'react';

/**
 * WaveBackground Component - BURGUNDY ROSE THEME
 * 
 * Elegant, smooth, continuously moving abstract multi-colour wave layers.
 * 
 * Palette:
 * - Main background:     #17151B
 * - Secondary bg:        #211A24
 * - Section bg:          #28202B
 * - Card bg:             #332735
 * - Burgundy accent:     #694D68
 * - Dusty Rose:          #D19BBE
 * - Soft Pink:           #B987A8
 * - Muted Silver:        #D8CED7
 * - Primary text:        #F5F1F3
 * - Secondary text:      #BDB4BD
 */
export default function WaveBackground() {
  return (
    <div className="wave-bg-viewport" aria-hidden="true">
      {/* ------------------------------------------------------------------
          1. DEEP AMBIENT GLOWS & MESH GRADIENTS (Full page background depth)
          ------------------------------------------------------------------ */}
      <div className="wave-ambient-glow glow-top" />
      <div className="wave-ambient-glow glow-mid" />
      <div className="wave-ambient-glow glow-bottom" />

      {/* ------------------------------------------------------------------
          2. HERO PROMINENT FLOWING BURGUNDY ROSE WAVE SYSTEM
          ------------------------------------------------------------------ */}
      <div className="hero-waves-container">
        {/* SVG GRADIENT DEFINITIONS */}
        <svg className="wave-defs-svg" aria-hidden="true" focusable="false">
          <defs>
            {/* Wave 1: Burgundy -> Soft Pink -> Dusty Rose -> Muted Silver */}
            <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#694D68" stopOpacity="0.44" />
              <stop offset="30%" stopColor="#B987A8" stopOpacity="0.38" />
              <stop offset="65%" stopColor="#D19BBE" stopOpacity="0.36" />
              <stop offset="100%" stopColor="#D8CED7" stopOpacity="0.38" />
            </linearGradient>

            {/* Wave 2: Dusty Rose -> Burgundy -> Muted Silver -> Section Dark */}
            <linearGradient id="waveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D19BBE" stopOpacity="0.38" />
              <stop offset="35%" stopColor="#694D68" stopOpacity="0.40" />
              <stop offset="70%" stopColor="#D8CED7" stopOpacity="0.30" />
              <stop offset="100%" stopColor="#28202B" stopOpacity="0.45" />
            </linearGradient>

            {/* Wave 3: Soft Pink -> Muted Silver -> Burgundy -> Dusty Rose */}
            <linearGradient id="waveGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#B987A8" stopOpacity="0.34" />
              <stop offset="38%" stopColor="#D8CED7" stopOpacity="0.32" />
              <stop offset="72%" stopColor="#694D68" stopOpacity="0.36" />
              <stop offset="100%" stopColor="#D19BBE" stopOpacity="0.30" />
            </linearGradient>

            {/* Wave 4: Base Burgundy -> Burgundy Accent -> Soft Pink -> Dusty Rose */}
            <linearGradient id="waveGrad4" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#28202B" stopOpacity="0.48" />
              <stop offset="32%" stopColor="#694D68" stopOpacity="0.38" />
              <stop offset="66%" stopColor="#B987A8" stopOpacity="0.30" />
              <stop offset="100%" stopColor="#D19BBE" stopOpacity="0.34" />
            </linearGradient>

            {/* Subtle Middle Section Gradient (Skills & Projects area) */}
            <linearGradient id="waveGradMid" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#694D68" stopOpacity="0.24" />
              <stop offset="50%" stopColor="#B987A8" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#D19BBE" stopOpacity="0.20" />
            </linearGradient>

            {/* Subtle Lower Section Gradient (Experience & Education area) */}
            <linearGradient id="waveGradLower" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D19BBE" stopOpacity="0.20" />
              <stop offset="50%" stopColor="#694D68" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#D8CED7" stopOpacity="0.16" />
            </linearGradient>

            {/* Subtle Contact & Footer Section Gradient */}
            <linearGradient id="waveGradContact" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#694D68" stopOpacity="0.22" />
              <stop offset="45%" stopColor="#D19BBE" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#B987A8" stopOpacity="0.19" />
            </linearGradient>
          </defs>
        </svg>

        {/* LAYER 4: DEEP ATMOSPHERIC BASE WAVE (Slowest, broad undulating crest) */}
        <div className="wave-track wave-track-4">
          <svg
            className="wave-svg"
            viewBox="0 0 2880 560"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              fill="url(#waveGrad4)"
              d="M0,340 C320,220 640,410 960,310 C1180,240 1340,380 1440,340 C1760,220 2080,410 2400,310 C2620,240 2780,380 2880,340 L2880,560 L0,560 Z"
            />
          </svg>
        </div>

        {/* LAYER 3: MID DEPTH WAVE (Teal, Ice Blue & Violet blend) */}
        <div className="wave-track wave-track-3">
          <svg
            className="wave-svg"
            viewBox="0 0 2880 540"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              fill="url(#waveGrad3)"
              d="M0,180 C360,290 720,120 1080,230 C1260,280 1380,140 1440,180 C1800,290 2160,120 2520,230 C2700,280 2820,140 2880,180 L2880,540 L0,540 Z"
            />
          </svg>
        </div>

        {/* LAYER 2: CRESTING WAVE RIBBON (Soft Violet & Cyan shimmer) */}
        <div className="wave-track wave-track-2">
          <svg
            className="wave-svg"
            viewBox="0 0 2880 520"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              fill="url(#waveGrad2)"
              d="M0,300 C280,380 560,180 840,260 C1120,340 1320,220 1440,300 C1720,380 2000,180 2280,260 C2560,340 2760,220 2880,300 L2880,520 L0,520 Z"
            />
          </svg>
        </div>

        {/* LAYER 1: FOREGROUND PRIMARY WAVE (Cyan, Ice Blue & Deep Blue flow) */}
        <div className="wave-track wave-track-1">
          <svg
            className="wave-svg"
            viewBox="0 0 2880 500"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              fill="url(#waveGrad1)"
              d="M0,240 C240,150 480,320 720,260 C960,200 1200,310 1440,240 C1680,150 1920,320 2160,260 C2400,200 2640,310 2880,240 L2880,500 L0,500 Z"
            />
          </svg>
        </div>
      </div>

      {/* ------------------------------------------------------------------
          3. SUBTLE PAGE-WIDE WAVES (Subtly flowing throughout mid & lower page)
          ------------------------------------------------------------------ */}
      <div className="page-waves-subtle">
        {/* Mid-page subtle wave band (Skills & Projects area) */}
        <div className="subtle-wave-track track-mid">
          <svg
            className="subtle-wave-svg"
            viewBox="0 0 2880 420"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              fill="url(#waveGradMid)"
              d="M0,200 C360,280 720,130 1080,220 C1260,260 1380,160 1440,200 C1800,280 2160,130 2520,220 C2700,260 2820,160 2880,200 L2880,420 L0,420 Z"
            />
          </svg>
        </div>

        {/* Lower-page subtle wave band (Experience & Education area) */}
        <div className="subtle-wave-track track-lower">
          <svg
            className="subtle-wave-svg"
            viewBox="0 0 2880 400"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              fill="url(#waveGradLower)"
              d="M0,220 C320,150 640,290 960,210 C1200,160 1360,250 1440,220 C1760,150 2080,290 2400,210 C2640,160 2800,250 2880,220 L2880,400 L0,400 Z"
            />
          </svg>
        </div>

        {/* Contact & Footer subtle wave band */}
        <div className="subtle-wave-track track-contact">
          <svg
            className="subtle-wave-svg"
            viewBox="0 0 2880 390"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              fill="url(#waveGradContact)"
              d="M0,190 C340,270 680,120 1020,210 C1240,250 1380,150 1440,190 C1780,270 2120,120 2460,210 C2680,250 2820,150 2880,190 L2880,390 L0,390 Z"
            />
          </svg>
        </div>
      </div>

      {/* ------------------------------------------------------------------
          4. SUBTLE RADIAL HIGHLIGHT ACCENTS (Burgundy, Dusty Rose & Soft Pink)
          ------------------------------------------------------------------ */}
      <div className="wave-accent-orb orb-burgundy" />
      <div className="wave-accent-orb orb-dusty-rose" />
      <div className="wave-accent-orb orb-soft-pink" />
    </div>
  );
}
