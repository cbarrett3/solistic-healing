'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface ConditionCardProps {
  title: string;
  description: string;
  index: number;
}

export default function ConditionCard({ title, description, index }: ConditionCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="group h-full relative">
      {/* Hover effect container - maintains size */}
      <div className="absolute inset-0 transition-transform duration-300 group-hover:-translate-y-4 pointer-events-none"></div>
      
      <motion.div 
        className="condition-card rounded-lg p-3 sm:p-4 h-full transition-all duration-300 relative flex flex-col"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transform: 'translate3d(0, 0, 0)',
          transformStyle: 'preserve-3d'
        }}
      >
        <div className="flex items-center mb-2">
          <motion.div
            className="condition-indicator w-1.5 h-1.5 rounded-full mr-2"
            animate={{ 
              scale: isHovered ? [1, 1.5, 1] : 1,
              boxShadow: isHovered ? "0 0 10px var(--conditions-accent)" : "0 0 0px transparent"
            }}
            transition={{ 
              duration: 1.5, 
              repeat: isHovered ? Infinity : 0, 
              repeatType: "reverse" 
            }}
          />
          <motion.h4 
            className="text-base sm:text-lg font-medium relative"
            animate={{
              color: isHovered ? "var(--conditions-accent)" : "var(--conditions-text-primary)"
            }}
            transition={{ duration: 0.3 }}
          >
            {title}
            <motion.span 
              className="absolute -bottom-1 left-0 h-0.5 bg-primary/70"
              initial={{ width: "0%" }}
              animate={{ width: isHovered ? "100%" : "0%" }}
              transition={{ duration: 0.4 }}
            />
          </motion.h4>
        </div>
        
        <div className="pl-3 pr-1 flex-grow flex flex-col">
          <p className="text-xs sm:text-sm leading-relaxed line-clamp-4 sm:line-clamp-none flex-grow">
            {description}
          </p>
          
          {/* Fixed-height container for the Learn More button */}
          <div className="h-5 mt-2 text-xs text-right">
            <motion.span 
              className="text-primary underline cursor-pointer inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              Learn more
            </motion.span>
          </div>
        </div>
        
        {/* Shadow and border effect on hover */}
        <motion.div 
          className="absolute inset-0 rounded-lg pointer-events-none"
          initial={{ boxShadow: "0 0 0 0 rgba(0,0,0,0), 0 0 0 0 rgba(0,0,0,0)" }}
          animate={{ 
            boxShadow: isHovered 
              ? "0 12px 24px rgba(0, 0, 0, 0.1), 0 0 0 2px var(--conditions-accent)" 
              : "0 0 0 0 rgba(0,0,0,0), 0 0 0 0 rgba(0,0,0,0)" 
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </div>
  );
}
