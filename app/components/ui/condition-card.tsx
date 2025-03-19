'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface ConditionCardProps {
  title: string;
  description: string;
  index: number;
}

export default function ConditionCard({ title, description, index }: ConditionCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`
          h-full rounded-xl p-4 flex flex-col relative
          transition-all duration-300
          ${isHovered ? 'shadow-lg -translate-y-1 bg-card/40' : 'bg-card/20'}
        `}
      >
        <div className="flex items-center mb-3">
          <motion.div
            className="w-2 h-2 rounded-full mr-2.5 bg-primary"
            animate={{ 
              scale: isHovered ? [1, 1.2, 1] : 1,
              opacity: isHovered ? 1 : 0.7
            }}
            transition={{ 
              duration: 1.5, 
              repeat: isHovered ? Infinity : 0, 
              repeatType: "reverse" 
            }}
          />
          <h4 
            className={`text-base sm:text-lg font-medium relative transition-colors duration-300 ${
              isHovered ? 'text-primary' : ''
            }`}
          >
            {title}
            <motion.span 
              className="absolute -bottom-1 left-0 h-0.5 bg-primary"
              initial={{ width: "0%" }}
              animate={{ width: isHovered ? "100%" : "0%" }}
              transition={{ duration: 0.4 }}
            />
          </h4>
        </div>
        
        <div className="flex-grow flex flex-col">
          <p className="text-xs sm:text-sm leading-relaxed line-clamp-4 sm:line-clamp-none flex-grow text-muted-foreground">
            {description}
          </p>
          
          {/* Learn More button */}
          <div className="h-8 mt-3">
            <motion.div 
              className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90 text-white text-xs font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 5 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-1.5">Learn more</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
