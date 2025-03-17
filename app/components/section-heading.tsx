'use client';

import { motion } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="relative">
      <motion.h2 
        className="text-3xl sm:text-4xl font-light text-theme-primary leading-tight relative inline-block"
        initial={{ opacity: 0.9 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {title}
        <motion.span 
          className="absolute -bottom-1 left-0 h-0.5 bg-primary/70"
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        />
      </motion.h2>
      
      {subtitle && (
        <motion.p 
          className="mt-2 text-theme-secondary text-sm max-w-md"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
