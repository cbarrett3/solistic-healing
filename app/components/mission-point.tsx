'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface MissionPointProps {
  title: string;
  description: string;
}

export default function MissionPoint({ title, description }: MissionPointProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className="flex items-start gap-4 group"
      initial={{ opacity: 0.9 }}
      whileHover={{ 
        scale: 1.02,
        opacity: 1,
        transition: { duration: 0.2 }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="text-primary mt-1 flex-shrink-0 transition-all duration-300">
        <motion.div
          animate={{ 
            rotate: isHovered ? [0, 15, 0] : 0,
            scale: isHovered ? 1.2 : 1
          }}
          transition={{ duration: 0.3 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
      </div>
      <div className="relative px-2 py-1.5 rounded-lg">
        <h4 className="text-base font-medium text-theme-primary mb-2 group-hover:text-primary transition-colors duration-300">
          {title}
        </h4>
        <p className="text-theme-secondary text-sm line-clamp-2 group-hover:text-theme-primary transition-colors duration-300 pr-2">
          {description}
        </p>
        <div className="absolute -left-3 -top-2 w-0 h-0 bg-primary/20 group-hover:w-[calc(100%+1.5rem)] group-hover:h-[calc(100%+1rem)] -z-10 transition-all duration-500 rounded-lg"></div>
      </div>
    </motion.div>
  );
}
