import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

/**
 * Reusable ScrollReveal wrapper component.
 * Applies subtle, GPU-accelerated fade-and-rise entrance animations
 * triggered cleanly by IntersectionObserver as elements scroll into view.
 */
export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  duration = 550,
  yOffset = 22,
  threshold = 0.08,
  rootMargin = '0px 0px -20px 0px',
  triggerOnce = false,
  as: Component = 'div',
  style = {},
  ...rest
}) {
  const [ref, isVisible] = useScrollReveal({ threshold, rootMargin, triggerOnce });

  const combinedStyle = {
    ...style,
    '--reveal-delay': `${delay}ms`,
    '--reveal-duration': `${duration}ms`,
    '--reveal-y': `${yOffset}px`
  };

  return (
    <Component
      ref={ref}
      className={`scroll-reveal ${isVisible ? 'is-visible' : ''} ${className}`.trim()}
      style={combinedStyle}
      {...rest}
    >
      {children}
    </Component>
  );
}
