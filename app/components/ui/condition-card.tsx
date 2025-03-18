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
    <motion.div 
      className="h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div 
        className={`
          h-full rounded-xl p-4 flex flex-col relative
          border border-solid transition-all duration-300
          ${isHovered ? 'border-primary/30 shadow-lg -translate-y-2 bg-card/40' : 'border-white/10 bg-card/20'}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
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
          <div className="h-6 mt-3 text-xs">
            <motion.div 
              className="inline-flex items-center text-primary cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="mr-1">Learn more</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
