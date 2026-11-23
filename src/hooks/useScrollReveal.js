import { useEffect, useRef, useState } from 'react';

/**
 * Custom React hook for triggering performant scroll-based reveals using IntersectionObserver.
 * 
 * @param {Object} options
 * @param {number} options.threshold - Visibility ratio to trigger (default: 0.12)
 * @param {string} options.rootMargin - Margin around the root (default: '0px 0px -40px 0px')
 * @param {boolean} options.triggerOnce - Whether animation only runs once (default: false)
 * @returns {[React.RefObject, boolean]} [elementRef, isVisible]
 */
export function useScrollReveal({
  threshold = 0.08,
  rootMargin = '0px 0px -20px 0px',
  triggerOnce = false
} = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // If user prefers reduced motion, reveal content immediately
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(node);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, isVisible];
}
