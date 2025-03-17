'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import MissionPoint from './mission-point';

interface MissionPoint {
  title: string;
  description: string;
}

interface MissionSectionProps {
  title: string;
  points: MissionPoint[];
}

export default function MissionSection({ title, points }: MissionSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  return (
    <motion.div 
      className="about-card rounded-lg p-5 h-full transition-all duration-500"
      initial={{ opacity: 0.95 }}
      whileHover={{ 
        opacity: 1,
        scale: 1.01,
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center mb-5 px-2">
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-primary mr-3"
          animate={{ 
            scale: [1, 1.5, 1],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2,
            repeatType: "reverse" 
          }}
        />
        <h3 className="text-xl text-theme-primary font-medium relative inline-block cursor-default">
          {title}
          <motion.span 
            className="absolute -bottom-1 left-0 h-0.5 bg-primary/70"
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
          />
        </h3>
      </div>
      
      <div className="space-y-5 px-2">
        {points.map((point, index) => (
          <div 
            key={index}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            className="cursor-pointer group"
          >
            <MissionPoint
              title={point.title}
              description={point.description}
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
