import React from 'react';

/**
 * WaveBackground Component
 * 
 * Elegant, smooth, continuously moving abstract multi-colour wave layers.
 * 
 * Palette:
 * - Ice Blue:        #8BBCE8
 * - Cyan:            #55C7D9
 * - Muted Teal:      #4DADA5
 * - Soft Violet:     #8584C7
 * - Metallic Silver: #AEBAC8
 * - Deep Blue:       #30485E
 * 
 * Features:
 * - Multiple layered SVG paths with natural gradient transitions
 * - Multi-axis continuous movement (horizontal flow + gentle vertical oscillation)
 * - Distinct animation durations per layer for parallax depth
 * - Subtle opacity and soft blur for a premium ambient appearance
 * - Concentrated behind hero, extending subtly throughout the page
 * - Text, buttons, and cards remain clearly readable
 * - Fully responsive and honors prefers-reduced-motion
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
          2. HERO PROMINENT FLOWING MULTI-COLOUR WAVE SYSTEM
          ------------------------------------------------------------------ */}
      <div className="hero-waves-container">
        {/* SVG GRADIENT DEFINITIONS */}
        <svg className="wave-defs-svg" aria-hidden="true" focusable="false">
          <defs>
            {/* Wave 1: Deep Blue -> Muted Teal -> Cyan -> Ice Blue */}
            <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#30485E" stopOpacity="0.45" />
              <stop offset="32%" stopColor="#4DADA5" stopOpacity="0.40" />
              <stop offset="68%" stopColor="#55C7D9" stopOpacity="0.36" />
              <stop offset="100%" stopColor="#8BBCE8" stopOpacity="0.42" />
            </linearGradient>

            {/* Wave 2: Soft Violet -> Cyan -> Metallic Silver -> Deep Blue */}
            <linearGradient id="waveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8584C7" stopOpacity="0.38" />
              <stop offset="38%" stopColor="#55C7D9" stopOpacity="0.32" />
              <stop offset="72%" stopColor="#AEBAC8" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#30485E" stopOpacity="0.36" />
            </linearGradient>

            {/* Wave 3: Muted Teal -> Ice Blue -> Soft Violet -> Metallic Silver */}
            <linearGradient id="waveGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4DADA5" stopOpacity="0.32" />
              <stop offset="42%" stopColor="#8BBCE8" stopOpacity="0.34" />
              <stop offset="75%" stopColor="#8584C7" stopOpacity="0.30" />
              <stop offset="100%" stopColor="#AEBAC8" stopOpacity="0.26" />
            </linearGradient>

            {/* Wave 4: Deep Blue -> Soft Violet -> Cyan -> Ice Blue */}
            <linearGradient id="waveGrad4" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#30485E" stopOpacity="0.40" />
              <stop offset="35%" stopColor="#8584C7" stopOpacity="0.28" />
              <stop offset="68%" stopColor="#55C7D9" stopOpacity="0.26" />
              <stop offset="100%" stopColor="#8BBCE8" stopOpacity="0.32" />
            </linearGradient>

            {/* Subtle Middle Section Gradient */}
            <linearGradient id="waveGradMid" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#30485E" stopOpacity="0.18" />
              <stop offset="50%" stopColor="#4DADA5" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#8584C7" stopOpacity="0.16" />
            </linearGradient>

            {/* Subtle Lower Section Gradient */}
            <linearGradient id="waveGradLower" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8584C7" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#55C7D9" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#30485E" stopOpacity="0.16" />
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

        {/* Lower-page subtle wave band (Experience, Education & Contact area) */}
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
      </div>

      {/* ------------------------------------------------------------------
          4. SUBTLE RADIAL HIGHLIGHT ACCENTS (Muted Teal & Soft Violet)
          ------------------------------------------------------------------ */}
      <div className="wave-accent-orb orb-teal" />
      <div className="wave-accent-orb orb-violet" />
      <div className="wave-accent-orb orb-cyan" />
    </div>
  );
}
