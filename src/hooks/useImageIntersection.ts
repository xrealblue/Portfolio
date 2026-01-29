  'use client';

  import { useState, useEffect, useRef } from 'react';

  interface UseImageIntersectionOptions {
    rootMargin?: string;
    threshold?: number;
    triggerOnce?: boolean;
  }

  /**
   * Custom hook for detecting when an element enters the viewport
   * Useful for implementing lazy loading of images and other content
   */
  export function useImageIntersection({
    rootMargin = '200px 0px',
    threshold = 0.1,
    triggerOnce = true,
  }: UseImageIntersectionOptions = {}) {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const [hasIntersected, setHasIntersected] = useState(false);
    const ref = useRef<HTMLElement | null>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          const isElementIntersecting = entry.isIntersecting;
          setIsIntersecting(isElementIntersecting);
          
          if (isElementIntersecting && triggerOnce) {
            setHasIntersected(true);
            // Unobserve after first intersection if triggerOnce is true
            if (ref.current) {
              observer.unobserve(ref.current);
            }
          }
        },
        { rootMargin, threshold }
      );

      const currentRef = ref.current;
      if (currentRef) {
        observer.observe(currentRef);
      }

      return () => {
        if (currentRef) {
          observer.unobserve(currentRef);
        }
      };
    }, [rootMargin, threshold, triggerOnce]);

    return { ref, isIntersecting, hasIntersected };
  }