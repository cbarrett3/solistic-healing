'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface MissionPointProps {
  title: string;
  description: string;
  isCompact?: boolean;
}

export default function MissionPoint({ title, description, isCompact = false }: MissionPointProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className={`flex items-start gap-3 group ${isCompact ? 'py-0.5' : ''}`}
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
          <svg xmlns="http://www.w3.org/2000/svg" className={`${isCompact ? 'h-4 w-4' : 'h-5 w-5'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
      </div>
      <div className={`relative ${isCompact ? 'px-2 py-1.5' : 'px-3 py-2.5'} rounded-lg`}>
        <h4 className={`${isCompact ? 'text-sm' : 'text-base'} font-medium text-theme-primary ${isCompact ? 'mb-1.5' : 'mb-2.5'} group-hover:text-primary transition-colors duration-300`}>
          {title}
        </h4>
        <p className={`text-theme-secondary ${isCompact ? 'text-xs leading-relaxed' : 'text-sm leading-relaxed'} group-hover:text-theme-primary transition-colors duration-300 pr-2`}>
          {description}
        </p>
        <div 
          className="absolute -left-1 -top-2 w-0 h-0 bg-primary/10 group-hover:w-[calc(100%+1rem)] group-hover:h-[calc(100%+1rem)] -z-10 transition-all duration-500 rounded-lg"
          style={{
            border: isHovered ? '1px solid rgba(var(--color-primary-rgb), 0.3)' : '0px solid transparent',
            transition: 'all 0.5s ease'
          }}
        ></div>
      </div>
    </motion.div>
  );
}
