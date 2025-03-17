'use client';

import { useEffect, useState, useRef } from 'react';

interface UseSectionScrollOptions {
  sectionSelector: string;
  threshold?: number;
  cooldown?: number;
}

export function useSectionScroll({
  sectionSelector,
  threshold = 100, // Threshold in pixels to trigger the scroll
  cooldown = 1000, // Cooldown period in milliseconds
}: UseSectionScrollOptions) {
  const [isScrolling, setIsScrolling] = useState(false);
  const lastScrollTime = useRef(0);
  const scrollDirection = useRef<'up' | 'down' | null>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const sections = Array.from(document.querySelectorAll(sectionSelector));
    if (!sections.length) return;

    const handleScroll = () => {
      const now = Date.now();
      const currentScrollY = window.scrollY;
      
      // Determine scroll direction
      if (currentScrollY > lastScrollY.current) {
        scrollDirection.current = 'down';
      } else if (currentScrollY < lastScrollY.current) {
        scrollDirection.current = 'up';
      }
      
      lastScrollY.current = currentScrollY;
      
      // If we're already scrolling or in cooldown period, don't trigger again
      if (isScrolling || now - lastScrollTime.current < cooldown) return;
      
      // Find current section
      const currentSectionIndex = sections.findIndex((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= threshold && rect.bottom > 0;
      });
      
      if (currentSectionIndex === -1) return;
      
      // Determine target section based on scroll direction
      let targetSectionIndex = currentSectionIndex;
      if (scrollDirection.current === 'down' && currentSectionIndex < sections.length - 1) {
        targetSectionIndex = currentSectionIndex + 1;
      } else if (scrollDirection.current === 'up' && currentSectionIndex > 0) {
        targetSectionIndex = currentSectionIndex - 1;
      } else {
        return; // No valid target section
      }
      
      // Scroll to target section
      const targetSection = sections[targetSectionIndex];
      if (targetSection) {
        setIsScrolling(true);
        lastScrollTime.current = now;
        
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        
        // Reset scrolling state after animation completes
        setTimeout(() => {
          setIsScrolling(false);
        }, 800); // Approximate duration of smooth scroll
      }
    };
    
    // Use passive: true for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionSelector, threshold, cooldown, isScrolling]);
}
