'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import ConditionCard from '../ui/condition-card';
import { SectionScrollArrow } from '../ui';

// our mental health journey map
const conditions = [
  {
    title: 'Anxiety Disorders',
    description: 'Anxiety disorders are characterized by persistent, excessive worry and fear that interferes with daily activities. Our approach addresses both the psychological and physiological aspects of anxiety.',
  },
  {
    title: 'Post-Traumatic Stress Disorder',
    description: 'PTSD develops after experiencing or witnessing traumatic events. Our trauma-informed approach creates a safe space for processing and healing traumatic memories.',
  },
  {
    title: 'Depression',
    description: 'Depression affects mood, thinking, and daily functioning. Our holistic approach addresses the biological, psychological, and social factors contributing to depression.',
  },
  {
    title: 'Substance Use & Addiction',
    description: 'Addiction involves compulsive substance use despite harmful consequences. Our compassionate approach focuses on understanding the underlying factors driving addictive behaviors.',
  },
];

export default function ConditionsSection() {
  // tracking user engagement states
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);
  
  useEffect(() => {
    // reveal content on scroll
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    const section = document.querySelector('.conditions-section');
    if (section) {
      observer.observe(section);
    }
    
    // cleanup observer on unmount
    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);
  
  return (
    <section className="conditions-section min-h-screen w-full flex items-center py-10 sm:py-12 md:py-16 lg:py-20 relative bg-background" data-section="conditions">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 relative z-10">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 h-full">
          {/* left column with cards */}
          <div className="w-full lg:w-2/3 order-2 lg:order-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8">
              {/* animated section title */}
              <motion.h2 
                className="section-title text-2xl sm:text-3xl md:text-4xl font-light relative inline-block mb-4 sm:mb-0"
                initial={{ opacity: 0, y: -20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                Conditions We Treat
                <motion.span 
                  className="absolute -bottom-2 left-0 h-0.5 bg-primary"
                  initial={{ width: "0%" }}
                  animate={isVisible ? { width: "100%" } : {}}
                  transition={{ delay: 0.4, duration: 0.8 }}
                />
              </motion.h2>
              
              {/* learn more button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="self-end sm:self-auto"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group"
                >
                  <Link href="/#contact" className="inline-block">
                    <motion.div
                      className="learn-more-btn px-5 py-2.5 rounded-full text-xs sm:text-sm uppercase tracking-wider font-medium inline-flex items-center justify-center bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white shadow-lg hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 border border-primary/20"
                      initial={{ opacity: 1 }}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 10px 15px -3px rgba(var(--color-primary-rgb), 0.3)"
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Begin Your Journey
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 ml-1.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
            
            {/* condition cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 @container">
              {conditions.map((condition, index) => (
                <motion.div
                  key={condition.title}
                  className="bg-gradient-to-br from-white/10 to-white/5 dark:from-white/5 dark:to-transparent backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:border-primary/40 transition-all duration-300 group cursor-pointer shadow-md hover:shadow-lg hover:shadow-primary/5 relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                >
                  {/* subtle background glow on hover */}
                  <div className="absolute -inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg blur-xl -z-10"></div>
                  
                  {/* the condition card component */}
                  <ConditionCard
                    title={condition.title}
                    description={condition.description}
                    index={index}
                  />
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* right column with image */}
          <div className="w-full lg:w-1/3 order-1 lg:order-2 flex items-center justify-center">
            <div className="condition-image w-full max-w-[300px] lg:max-w-none mb-6 lg:mb-0 h-[350px] lg:h-full relative">
              {/* border container - separate from image for reliable effect */}
              <div 
                className="absolute -inset-1 rounded-lg bg-gradient-to-br from-primary to-primary/70"
                style={{
                  transform: isImageHovered ? 'translate(4px, -4px)' : 'translate(0, 0)',
                  transition: 'transform 0.4s ease-out',
                  zIndex: 0,
                  opacity: isImageHovered ? 0.9 : 0.7
                }}
              ></div>
              
              {/* image container */}
              <div 
                className="aspect-[3/4] relative rounded-lg overflow-hidden shadow-xl bg-black"
                style={{
                  transform: isImageHovered ? 'translate(4px, -4px)' : 'translate(0, 0)',
                  transition: 'transform 0.4s ease-out',
                  zIndex: 1,
                  position: 'relative'
                }}
                onMouseEnter={() => setIsImageHovered(true)}
                onMouseLeave={() => setIsImageHovered(false)}
              >
                <Image 
                  src="/beard.jpeg"
                  alt="Therapist portrait"
                  width={400}
                  height={500}
                  className="object-cover h-full w-full"
                  style={{ 
                    filter: isImageHovered ? 'brightness(1.1) contrast(1.05)' : 'brightness(1) contrast(1)',
                    objectPosition: "center top",
                    transition: 'filter 0.4s ease-out'
                  }}
                  priority
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent"></div>
                
                <div 
                  className="absolute inset-0"
                  style={{
                    backgroundColor: isImageHovered ? 'rgba(var(--color-primary-rgb), 0.15)' : 'rgba(var(--color-primary-rgb), 0)',
                    transition: 'background-color 0.4s ease-out'
                  }}
                />
                
                <div className="absolute bottom-0 left-0 right-0 p-4 pb-5 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="text-white font-light text-xs sm:text-sm italic">
                    "Healing is not an overnight process. It is a daily cleansing of pain, a daily healing of your life."
                  </div>
                  <div className="text-primary/90 text-xs mt-1 font-medium">— Leon Brown</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* background elements - enhanced with more vibrant gradients */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/10 rounded-bl-[100px] -z-10 blur-3xl opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/3 bg-primary/10 rounded-tr-[100px] -z-10 blur-3xl opacity-70"></div>
      
      {/* scroll arrow to media section */}
      <SectionScrollArrow 
        targetSectionId="media" 
        offset={-60}
        nextSectionName="Media" 
      />
    </section>
  );
}
