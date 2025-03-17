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
    <motion.div 
      className="condition-card rounded-lg p-3 sm:p-4 h-full transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        y: -3, 
        boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)",
        borderColor: "var(--conditions-accent)"
      }}
      whileTap={{ scale: 0.98, y: 0 }}
    >
      <div className="flex items-center mb-2">
        <motion.div
          className="condition-indicator w-1.5 h-1.5 rounded-full mr-2"
          animate={{ 
            scale: isHovered ? [1, 1.5, 1] : 1,
            boxShadow: isHovered ? "0 0 10px var(--conditions-accent)" : "0 0 0px transparent"
          }}
          transition={{ 
            repeat: isHovered ? Infinity : 0, 
            duration: 1.5,
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
            className="absolute -bottom-1 left-0 h-0.5 bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: isHovered ? "100%" : "0%" }}
            transition={{ duration: 0.4 }}
          />
        </motion.h4>
      </div>
      
      <motion.div 
        className="pl-3 pr-1"
        animate={{
          opacity: isHovered ? 1 : 0.9
        }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-xs leading-relaxed line-clamp-4 sm:line-clamp-none">
          {description}
        </p>
        
        <motion.div 
          className="mt-2 flex justify-end"
          initial={{ opacity: 0, y: 5 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 5
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.button 
            className="text-xs text-primary font-medium flex items-center"
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn more
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-3 w-3 ml-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
