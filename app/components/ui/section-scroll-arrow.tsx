'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SectionScrollArrowProps {
  targetSectionId: string;
  className?: string;
  offset?: number;
  nextSectionName?: string;
}

export const SectionScrollArrow = ({ 
  targetSectionId, 
  className = '',
  offset = 0,
  nextSectionName = ''
}: SectionScrollArrowProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [screenSize, setScreenSize] = useState('');
  
  useEffect(() => {
    const checkIfLastSection = () => {
      const sections = document.querySelectorAll('[data-section]');
      if (sections.length === 0) return;
      
      const targetSection = document.getElementById(targetSectionId);
      if (!targetSection) return;
      
      const lastSection = sections[sections.length - 1];
      if (lastSection.id === targetSectionId) {
        setIsVisible(false);
      }
    };
    
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenSize('xs');
      } else if (width < 768) {
        setScreenSize('sm');
      } else if (width < 1024) {
        setScreenSize('md');
      } else if (width < 1280) {
        setScreenSize('lg');
      } else {
        setScreenSize('xl');
      }
    };
    
    checkIfLastSection();
    updateScreenSize();
    
    window.addEventListener('resize', updateScreenSize);
    return () => {
      window.removeEventListener('resize', updateScreenSize);
    };
  }, [targetSectionId]);
  
  const handleClick = () => {
    const targetSection = document.getElementById(targetSectionId);
    if (targetSection) {
      const targetPosition = targetSection.getBoundingClientRect().top;
      
      let dynamicOffset = offset;
      if (screenSize === 'xs') {
        dynamicOffset = offset - 20; 
      } else if (screenSize === 'sm') {
        dynamicOffset = offset - 10;
      } else if (screenSize === 'md') {
        dynamicOffset = offset;
      } else if (screenSize === 'lg') {
        dynamicOffset = offset + 10;
      } else {
        dynamicOffset = offset + 20; 
      }
      
      const offsetPosition = targetPosition + window.scrollY + dynamicOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };
  
  if (!isVisible) return null;
  
  // Determine what text to display - keep it short and simple
  const displayText = nextSectionName || (targetSectionId.charAt(0).toUpperCase() + targetSectionId.slice(1).replace(/-/g, ' '));
  
  return (
    <AnimatePresence>
      <motion.div 
        className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 ${className}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.3 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        <motion.div 
          className="flex flex-col items-center cursor-pointer group"
          animate={{ y: isHovered ? [0, -5, 0] : 0 }}
          transition={{ 
            y: { 
              duration: 1.5, 
              repeat: isHovered ? Infinity : 0,
              ease: "easeInOut"
            }
          }}
        >
          <div className="text-[10px] text-white/60 dark:text-white/60 font-light tracking-wider mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {displayText}
          </div>
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-sm flex items-center justify-center border border-white/20 dark:border-white/10 shadow-lg group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-300">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 sm:h-6 sm:w-6 text-white/70 dark:text-white/70 group-hover:text-primary transition-colors duration-300" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
