'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Brain, Heart, Lightbulb, Shield } from 'lucide-react';
import ConditionCard from '../ui/condition-card';
import { SectionScrollArrow } from '../ui';

// our mental health journey map
const conditions = [
  {
    title: 'Anxiety Disorders',
    description: 'Anxiety disorders are characterized by persistent, excessive worry and fear that interferes with daily activities. Our approach addresses both the psychological and physiological aspects of anxiety.',
    icon: <Shield className="w-5 h-5 text-primary" />,
    resources: [
      { name: 'NIMH Anxiety Info', url: 'https://www.nimh.nih.gov/health/topics/anxiety-disorders' },
      { name: 'Anxiety & Depression Association', url: 'https://adaa.org/' }
    ]
  },
  {
    title: 'Post-Traumatic Stress Disorder',
    description: 'PTSD develops after experiencing or witnessing traumatic events. Our trauma-informed approach creates a safe space for processing and healing traumatic memories.',
    icon: <Brain className="w-5 h-5 text-primary" />,
    resources: [
      { name: 'PTSD Alliance', url: 'https://ptsdalliance.org/' },
      { name: 'National Center for PTSD', url: 'https://www.ptsd.va.gov/' }
    ]
  },
  {
    title: 'Depression',
    description: 'Depression affects mood, thinking, and daily functioning. Our holistic approach addresses the biological, psychological, and social factors contributing to depression.',
    icon: <Heart className="w-5 h-5 text-primary" />,
    resources: [
      { name: 'Depression & Bipolar Support', url: 'https://www.dbsalliance.org/' },
      { name: 'NIMH Depression Info', url: 'https://www.nimh.nih.gov/health/topics/depression' }
    ]
  },
  {
    title: 'Substance Use & Addiction',
    description: 'Addiction involves compulsive substance use despite harmful consequences. Our compassionate approach focuses on understanding the underlying factors driving addictive behaviors.',
    icon: <Lightbulb className="w-5 h-5 text-primary" />,
    resources: [
      { name: 'SAMHSA Helpline', url: 'https://www.samhsa.gov/find-help/national-helpline' },
      { name: 'National Institute on Drug Abuse', url: 'https://nida.nih.gov/' }
    ]
  },
];

export default function ConditionsSection() {
  // tracking user engagement states
  const [isVisible, setIsVisible] = useState(false);
  
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
    <section className="conditions-section w-full py-16 md:py-20 relative bg-background overflow-hidden" data-section="conditions">
      {/* Accent image */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] opacity-10 -z-10 blur-sm">
        <Image 
          src="/beard.jpeg"
          alt=""
          fill
          className="object-cover"
          style={{ objectPosition: "center top" }}
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-background"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section header with more engaging text */}
          <div className="mb-12">
            <motion.div 
              className="flex items-center space-x-2 mb-3"
              initial={{ opacity: 0, x: -20 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <div className="h-px w-8 bg-primary"></div>
              <span className="text-primary text-sm font-medium uppercase tracking-wider">Holistic Care</span>
            </motion.div>
            
            <motion.h2 
              className="section-title text-2xl sm:text-3xl md:text-4xl font-medium relative inline-block mb-4"
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
            
            <motion.p
              className="text-foreground/90 max-w-2xl text-sm md:text-base font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Our integrative approach combines evidence-based therapies with holistic practices to address both symptoms and underlying causes. We believe in treating the whole person—mind, body, and spirit.
            </motion.p>
          </div>
          
          {/* Visually interesting condition cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
            {conditions.map((condition, index) => (
              <motion.div
                key={condition.title}
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Subtle hover effect - toned down from green to neutral */}
                <div className="absolute inset-0 bg-foreground/5 rounded-xl -m-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="bg-white dark:bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-gray-300 dark:border-border/30 shadow-sm transition-all duration-300 relative overflow-hidden h-full flex flex-col cursor-pointer">
                  {/* Card header with icon */}
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-primary/10 rounded-full mr-3">
                      {condition.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{condition.title}</h3>
                  </div>
                  
                  {/* Card content */}
                  <p className="text-foreground/80 dark:text-foreground/70 text-sm mb-4 flex-grow font-medium">
                    {condition.description}
                  </p>
                  
                  {/* Helpful external resource links */}
                  <div className="space-y-2">
                    <p className="text-xs text-foreground/70 dark:text-foreground/50 font-medium uppercase tracking-wide">Helpful Resources:</p>
                    <div className="flex flex-wrap gap-2">
                      {condition.resources.map((resource, i) => (
                        <a 
                          key={i}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-xs px-3 py-1.5 bg-gray-100 dark:bg-foreground/5 hover:bg-gray-200 dark:hover:bg-foreground/10 text-foreground/90 dark:text-foreground/80 rounded-full transition-colors duration-200 border border-gray-200 dark:border-transparent"
                        >
                          {resource.name}
                          <ArrowUpRight className="ml-1 w-3 h-3" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* More professional CTA section */}
          <motion.div
            className="bg-white dark:bg-black/20 p-6 md:p-8 rounded-xl border border-gray-300 dark:border-border/30 flex flex-col md:flex-row items-center justify-between shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="mb-4 md:mb-0 md:mr-6">
              <h3 className="text-lg font-semibold mb-1 text-foreground">Contact us about treatment options</h3>
              <p className="text-foreground/80 dark:text-foreground/70 text-sm font-medium">Schedule a confidential consultation to discuss your needs.</p>
            </div>
            
            <Link href="/#contact" className="inline-block shrink-0">
              <motion.div
                className="px-5 py-2.5 rounded-lg text-sm font-medium inline-flex items-center justify-center bg-primary text-white shadow-sm hover:shadow-md transition-all duration-300"
                whileHover={{ 
                  scale: 1.02,
                }}
                whileTap={{ scale: 0.98 }}
              >
                Contact Us
                <ArrowRight className="ml-2 w-4 h-4" />
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* scroll arrow to next section */}
      <SectionScrollArrow 
        targetSectionId="media" 
        offset={-60}
        nextSectionName="Media" 
      />
    </section>
  );
}
