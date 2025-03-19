'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface ConditionCardProps {
  title: string;
  description: string;
  index: number;
}

// Define a base resource type with common properties
type BaseResource = {
  nimh: string;
};

// Define specific resource types for each condition
type AnxietyResource = BaseResource & {
  mayo: string;
  adaa: string;
};

type PTSDResource = BaseResource & {
  mayo: string;
  ptsd: string;
};

type DepressionResource = BaseResource & {
  mayo: string;
  nami: string;
};

type AddictionResource = BaseResource & {
  samhsa: string;
  nida: string;
};

// Union type for all possible resources
type ConditionResource = AnxietyResource | PTSDResource | DepressionResource | AddictionResource;

// External resource links for each condition
const conditionResources: Record<string, ConditionResource> = {
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
  
  // finding our path through condition data
  const resources = conditionResources[title as keyof typeof conditionResources] || {} as ConditionResource;
  
  // crafting links that connect minds
  const renderResourceLink = (url: string | undefined, title: string, icon: React.ReactNode) => {
    if (!url) return null;
    
    // gentle motion brings attention to knowledge
    return (
      <motion.a 
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors duration-200"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title={title}
      >
        {icon}
      </motion.a>
    );
  };
  
  // visual guides for different resource types
  const documentIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  );
  
  const chevronIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
    </svg>
  );
  
  const externalLinkIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
  );
  
  return (
    <div 
      className="h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* container transforms with user interaction */}
      <div 
        className={`
          h-full rounded-xl p-4 flex flex-col relative
          transition-all duration-300
          ${isHovered ? 'shadow-lg -translate-y-1 bg-card/40' : 'bg-card/20'}
        `}
      >
        <div className="flex items-center mb-3">
          {/* tiny dot pulses like healing rhythm */}
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
          
          {/* resource links fade in on hover */}
          <div className="mt-3 flex items-center space-x-2">
            <motion.div 
              className="flex space-x-2"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 5 }}
              transition={{ duration: 0.3 }}
            >
              {/* NIMH Link */}
              {renderResourceLink(resources.nimh, "National Institute of Mental Health", documentIcon)}
              
              {/* Mayo Clinic Link */}
              {'mayo' in resources && renderResourceLink(resources.mayo, "Mayo Clinic", chevronIcon)}
              
              {/* Condition-specific third link */}
              {'adaa' in resources && renderResourceLink(resources.adaa, "Anxiety & Depression Association of America", externalLinkIcon)}
              {'ptsd' in resources && renderResourceLink(resources.ptsd, "National Center for PTSD", externalLinkIcon)}
              {'nami' in resources && renderResourceLink(resources.nami, "National Alliance on Mental Illness", externalLinkIcon)}
              {'nida' in resources && renderResourceLink(resources.nida, "National Institute on Drug Abuse", externalLinkIcon)}
              {'samhsa' in resources && renderResourceLink(resources.samhsa, "SAMHSA's National Helpline", externalLinkIcon)}
              
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
