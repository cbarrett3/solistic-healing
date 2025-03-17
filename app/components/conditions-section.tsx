'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import ConditionCard from './condition-card';
import '../styles/conditions.css';

// Define the conditions data
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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
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
    
    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);
  
  return (
    <section className="conditions-section min-h-screen w-full flex items-center py-10 sm:py-12 md:py-16 lg:py-20 relative" data-section="conditions">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 relative z-10">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 h-full">
          {/* Left Column - Header and Conditions Cards */}
          <div className="w-full lg:w-2/3 order-2 lg:order-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6">
              <motion.h2 
                className="section-title text-2xl sm:text-3xl md:text-4xl font-light relative inline-block mb-4 sm:mb-0"
                initial={{ opacity: 0, y: -20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                Conditions We Treat
                <motion.span 
                  className="absolute -bottom-2 left-0 h-0.5 bg-primary/70"
                  initial={{ width: "0%" }}
                  animate={isVisible ? { width: "100%" } : {}}
                  transition={{ delay: 0.4, duration: 0.8 }}
                />
              </motion.h2>
              
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
                  <Link href="/services" className="learn-more-btn px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm uppercase tracking-wider font-medium inline-flex items-center">
                    Learn More
                    <motion.svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-3 w-3 sm:h-4 sm:w-4 ml-1 sm:ml-2 group-hover:ml-2 sm:group-hover:ml-3 transition-all duration-300" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      initial={{ x: 0 }}
                      animate={{ x: [0, 3, 0] }}
                      transition={{ 
                        repeat: Infinity, 
                        repeatType: "reverse", 
                        duration: 1.5,
                        ease: "easeInOut"
                      }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </motion.svg>
                  </Link>
                  <motion.span 
                    className="absolute -inset-1 rounded-full bg-primary/20 -z-10"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 @container">
              {conditions.map((condition, index) => (
                <ConditionCard
                  key={index}
                  title={condition.title}
                  description={condition.description}
                  index={index}
                />
              ))}
            </div>
          </div>
          
          {/* Right Column - Image */}
          <div className="w-full lg:w-1/3 order-1 lg:order-2 flex items-stretch">
            <motion.div 
              className="condition-image w-full mb-6 lg:mb-0 h-full"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.7 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative h-full w-full rounded-lg overflow-hidden shadow-xl condition-image-frame">
                <Image
                  src="/beard.jpeg"
                  alt="Therapist portrait"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
                <motion.div 
                  className="absolute bottom-2 left-2 right-2 z-20"
                  initial={{ y: 10, opacity: 0.8 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-white text-[10px] sm:text-xs bg-black/30 backdrop-blur-sm p-1.5 rounded-lg border border-white/10 shadow-lg">
                    Our holistic approach combines evidence-based therapies.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-bl-[100px] -z-10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/3 bg-primary/5 rounded-tr-[100px] -z-10 blur-3xl"></div>
    </section>
  );
}
