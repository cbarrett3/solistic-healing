'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface ConditionCardProps {
  title: string;
  description: string;
  index: number;
}

// External resource links for each condition
const conditionResources = {
  'Anxiety Disorders': {
    nimh: 'https://www.nimh.nih.gov/health/topics/anxiety-disorders',
    mayo: 'https://www.mayoclinic.org/diseases-conditions/anxiety/symptoms-causes/syc-20350961',
    adaa: 'https://adaa.org/understanding-anxiety'
  },
  'Post-Traumatic Stress Disorder': {
    nimh: 'https://www.nimh.nih.gov/health/topics/post-traumatic-stress-disorder-ptsd',
    mayo: 'https://www.mayoclinic.org/diseases-conditions/post-traumatic-stress-disorder/symptoms-causes/syc-20355967',
    ptsd: 'https://www.ptsd.va.gov/'
  },
  'Depression': {
    nimh: 'https://www.nimh.nih.gov/health/topics/depression',
    mayo: 'https://www.mayoclinic.org/diseases-conditions/depression/symptoms-causes/syc-20356007',
    nami: 'https://www.nami.org/About-Mental-Illness/Mental-Health-Conditions/Depression'
  },
  'Substance Use & Addiction': {
    nimh: 'https://www.nimh.nih.gov/health/topics/substance-use-and-mental-health',
    samhsa: 'https://www.samhsa.gov/find-help/national-helpline',
    nida: 'https://nida.nih.gov/research-topics/addiction-science'
  }
};

export default function ConditionCard({ title, description, index }: ConditionCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Get resources for this condition, or use empty object if not found
  const resources = conditionResources[title as keyof typeof conditionResources] || {};
  
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
          
          {/* External resource links with icons */}
          <div className="mt-3 flex items-center space-x-2">
            <motion.div 
              className="flex space-x-2"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 5 }}
              transition={{ duration: 0.3 }}
            >
              {/* NIMH Link */}
              {resources.nimh && (
                <motion.a 
                  href={resources.nimh}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title="National Institute of Mental Health"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </motion.a>
              )}
              
              {/* Mayo Clinic Link */}
              {resources.mayo && (
                <motion.a 
                  href={resources.mayo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title="Mayo Clinic"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
                  </svg>
                </motion.a>
              )}
              
              {/* Third resource - varies by condition */}
              {(resources.adaa || resources.ptsd || resources.nami || resources.nida || resources.samhsa) && (
                <motion.a 
                  href={resources.adaa || resources.ptsd || resources.nami || resources.nida || resources.samhsa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title={
                    resources.adaa ? "Anxiety & Depression Association of America" :
                    resources.ptsd ? "National Center for PTSD" :
                    resources.nami ? "National Alliance on Mental Illness" :
                    resources.nida ? "National Institute on Drug Abuse" :
                    resources.samhsa ? "SAMHSA's National Helpline" : ""
                  }
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </motion.a>
              )}
              
              <motion.span 
                className="text-xs text-primary/70 self-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                Learn more
              </motion.span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
