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
  const wheelEvents = useRef<number[]>([]);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const sections = Array.from(document.querySelectorAll(sectionSelector));
    if (!sections.length) return;

    // Get section heights for better positioning
    const getSectionPositions = () => {
      return sections.map(section => {
        const rect = section.getBoundingClientRect();
        return {
          top: window.scrollY + rect.top,
          bottom: window.scrollY + rect.bottom,
          element: section
        };
      });
    };

    // Find the nearest section to scroll to
    const findNearestSection = (direction: 'up' | 'down') => {
      const positions = getSectionPositions();
      const currentScrollY = window.scrollY;
      
      // Find the current section
      let currentIndex = positions.findIndex(pos => 
        currentScrollY >= pos.top - threshold && currentScrollY < pos.bottom - threshold
      );
      
      // If no current section found, find the nearest one
      if (currentIndex === -1) {
        if (direction === 'down') {
          currentIndex = positions.findIndex(pos => currentScrollY < pos.top) - 1;
        } else {
          currentIndex = positions.findIndex(pos => currentScrollY < pos.bottom);
        }
      }
      
      // Determine target section based on direction
      let targetIndex = currentIndex;
      if (direction === 'down' && currentIndex < positions.length - 1) {
        targetIndex = currentIndex + 1;
      } else if (direction === 'up' && currentIndex > 0) {
        targetIndex = currentIndex - 1;
      }
      
      return targetIndex >= 0 && targetIndex < positions.length ? positions[targetIndex] : null;
    };

    // Scroll to the target section
    const scrollToSection = (direction: 'up' | 'down') => {
      const now = Date.now();
      
      // If we're already scrolling or in cooldown period, don't trigger again
      if (isScrolling || now - lastScrollTime.current < cooldown) return;
      
      const targetSection = findNearestSection(direction);
      if (!targetSection) return;
      
      setIsScrolling(true);
      lastScrollTime.current = now;
      
      // Scroll to the target section
      window.scrollTo({
        top: targetSection.top,
        behavior: 'smooth'
      });
      
      // Reset scrolling state after animation completes
      setTimeout(() => {
        setIsScrolling(false);
      }, 800); // Approximate duration of smooth scroll
    };

    // Handle wheel events for more precise scrolling
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      // Add the delta to the wheel events array
      wheelEvents.current.push(e.deltaY);
      
      // Only keep the last 5 events
      if (wheelEvents.current.length > 5) {
        wheelEvents.current.shift();
      }
      
      // Calculate the average delta to determine direction
      const avgDelta = wheelEvents.current.reduce((sum, delta) => sum + delta, 0) / wheelEvents.current.length;
      
      if (Math.abs(avgDelta) > 10) { // Threshold to avoid tiny scrolls
        scrollDirection.current = avgDelta > 0 ? 'down' : 'up';
        scrollToSection(scrollDirection.current);
      }
    };

    // Handle touch events for mobile
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null) return;
      
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;
      
      if (Math.abs(deltaY) > 50) { // Threshold for touch swipes
        scrollDirection.current = deltaY > 0 ? 'down' : 'up';
        scrollToSection(scrollDirection.current);
      }
      
      touchStartY.current = null;
    };

    // Use passive: false to be able to prevent default
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [sectionSelector, threshold, cooldown, isScrolling]);
}
