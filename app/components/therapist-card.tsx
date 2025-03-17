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
      className="about-card rounded-lg overflow-hidden backdrop-blur-sm transition-all duration-300 group"
      initial={{ opacity: 0.95 }}
      whileHover={{ 
        opacity: 1,
        scale: 1.01,
      }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col md:flex-row">
        <motion.div 
          className="md:w-2/5 lg:w-1/3 relative h-[180px] md:h-auto overflow-hidden"
          animate={{ 
            scale: isHovered ? 1.03 : 1
          }}
          transition={{ duration: 0.4 }}
        >
          <Image 
            src={imageSrc}
            alt={name}
            width={300}
            height={400}
            className="object-cover w-full h-full transition-all duration-700 hover:scale-105 therapist-image-filter"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        </motion.div>
        
        <div className="p-5 md:p-6 flex-1">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: isHovered ? '40%' : '0%' }}
            transition={{ duration: 0.5 }}
            className="h-0.5 bg-primary absolute top-0 left-0"
          />
          
          <h3 className="text-lg text-theme-primary font-medium mb-2 group-hover:text-primary transition-colors duration-300">
            Welcome Message from Our Therapist
          </h3>
          
          {bio.map((paragraph, index) => (
            <p key={index} className="text-theme-secondary mb-2 text-sm leading-relaxed line-clamp-2 lg:line-clamp-2 pr-4">
              {paragraph}
            </p>
          ))}
          
          <div className="text-primary text-sm font-medium mt-3 flex items-center pr-6">
            <motion.span
              animate={{ 
                x: isHovered ? [0, 2, 0] : 0
              }}
              transition={{ repeat: isHovered ? Infinity : 0, duration: 1 }}
              className="inline-block mr-2"
            >
              {name}
            </motion.span>
            <br />
            <span className="text-theme-tertiary font-normal block mt-1">{title}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
