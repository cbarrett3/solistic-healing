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
      className="about-card bg-card/30 backdrop-blur-md rounded-xl overflow-hidden shadow-lg border border-border/10 transition-all duration-300"
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
      {/* Compact layout with better space utilization */}
      <div className="p-4 sm:p-6">
        {/* Header section with title */}
        <div className="mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl md:text-2xl font-light text-foreground">
            Welcome Message from <span className="text-primary font-medium">Our Therapist</span>
          </h3>
          <div className="h-0.5 w-12 sm:w-16 bg-primary mt-2"></div>
        </div>
        
        {/* Main content area with image and text side by side */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          {/* Image container - compact and properly sized */}
          <div className="relative w-full sm:w-1/3 flex-shrink-0">
            <div className="aspect-[4/5] relative rounded-lg overflow-hidden bg-gradient-to-br from-background/80 via-background/50 to-primary/5">
              <motion.div
                animate={{ y: isHovered ? -5 : 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Image 
                  src={imageSrc}
                  alt={name}
                  width={300}
                  height={400}
                  className="object-cover h-full w-full filter brightness-105 contrast-105 saturate-[1.05]"
                  priority
                />
              </motion.div>
              
              {/* Name overlay at bottom of image */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-3">
                <div className="text-primary font-medium text-sm">{name}</div>
                <div className="text-muted-foreground text-xs">{title}</div>
              </div>
            </div>
          </div>
          
          {/* Text content - optimized for readability */}
          <div className="flex-1 space-y-3">
            {bio.map((paragraph, index) => (
              <p key={index} className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
