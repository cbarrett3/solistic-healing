'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface TherapistCardProps {
  name: string;
  title: string;
  bio: string[];
  imageSrc: string;
}

export default function TherapistCard({ name, title, bio, imageSrc }: TherapistCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className="about-card bg-card/30 backdrop-blur-md rounded-xl overflow-hidden shadow-lg border border-primary/20 transition-all duration-300 h-full"
      initial={{ opacity: 0.95 }}
      whileHover={{ 
        opacity: 1,
        scale: 1.01,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-4 sm:p-6 h-full flex flex-col">
        {/* Enhanced header section with more professional title */}
        <div className="mb-4 sm:mb-5">
          <h3 className="text-lg sm:text-xl md:text-2xl font-light text-foreground">
            <span className="text-primary font-medium">Clinical Expertise</span> & Therapeutic Approach
          </h3>
          <div className="h-0.5 w-16 sm:w-20 bg-primary mt-2"></div>
        </div>
        
        {/* Main content area with improved image presentation */}
        <div className="flex-1">
          {/* Image container with float-left to allow text wrapping */}
          <div className="float-left mr-5 mb-4 w-full max-w-[200px] md:max-w-[180px] xl:max-w-[200px] relative">
            {/* Border container - separate from image for reliable effect */}
            <div 
              className="absolute -inset-0.5 rounded-lg bg-primary"
              style={{
                transform: isHovered ? 'translate(3px, -3px)' : 'translate(0, 0)',
                transition: 'transform 0.4s ease-out',
                zIndex: 0
              }}
            ></div>
            
            {/* Image container */}
            <div 
              className="aspect-[3/4] relative rounded-lg overflow-hidden shadow-md bg-black"
              style={{
                transform: isHovered ? 'translate(3px, -3px)' : 'translate(0, 0)',
                transition: 'transform 0.4s ease-out',
                zIndex: 1,
                position: 'relative'
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Image 
                src="/eric.jpeg"
                alt={name}
                width={400}
                height={500}
                className="object-cover h-full w-full"
                style={{ 
                  filter: isHovered ? 'brightness(1.05) contrast(1.05)' : 'brightness(1) contrast(1)',
                  objectPosition: "center top",
                  transition: 'filter 0.4s ease-out'
                }}
                priority
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent"></div>
              
              <div 
                className="absolute inset-0"
                style={{
                  backgroundColor: isHovered ? 'rgba(var(--color-primary-rgb), 0.1)' : 'rgba(var(--color-primary-rgb), 0)',
                  transition: 'background-color 0.4s ease-out'
                }}
              />
              
              <div className="absolute bottom-0 left-0 right-0 p-4 pb-5 bg-gradient-to-t from-black/80 to-transparent">
                <div className="text-white font-medium text-sm sm:text-base">{name}</div>
                <div className="text-white/80 text-xs sm:text-sm font-light">{title}</div>
              </div>
            </div>
          </div>
          
          {/* Text content - will wrap around the floating image */}
          <div className="space-y-3 sm:space-y-4">
            {bio.map((paragraph, index) => (
              <p key={index} className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
          
          {/* Added professional credential highlight with responsive styling - kept together */}
          <div className="mt-4 pt-3 border-t border-border/20 clear-left">
            <ul className="list-none space-y-1.5">
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2 flex-shrink-0"></div>
                <span className="text-xs sm:text-sm text-primary font-medium">M.A. Counseling & Psychological Services</span>
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2 flex-shrink-0"></div>
                <span className="text-xs sm:text-sm text-primary font-medium">Graduate Certificate in Addiction Studies</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
