'use client';

import { useState, ReactNode, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Tab {
  value: string;
  label: string;
  content?: ReactNode;
  icon?: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  value?: string;
  variant?: 'underline' | 'pills' | 'boxed';
  className?: string;
  onChange?: (value: string | number | boolean) => void;
}

export function Tabs({ 
  tabs, 
  value, 
  variant = 'underline',
  className = '',
  onChange
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(value || tabs[0]?.value);
  
  // Update active tab when value prop changes
  useEffect(() => {
    if (value && value !== activeTab) {
      setActiveTab(value);
    }
  }, [value, activeTab]);
  
  const handleTabChange = (tabValue: string) => {
    setActiveTab(tabValue);
    if (onChange) {
      onChange(tabValue as string | number | boolean);
    }
  };
  
  const getTabStyles = (tabValue: string) => {
    const isActive = activeTab === tabValue;
    
    switch (variant) {
      case 'pills':
        return isActive 
          ? 'bg-lime-500 text-white dark:bg-lime-600' 
          : 'text-foreground/70 hover:text-foreground hover:bg-muted';
      case 'boxed':
        return isActive 
          ? 'bg-background text-lime-500 dark:text-lime-400 border-b-2 border-lime-500 dark:border-lime-400 font-medium' 
          : 'bg-muted/30 text-foreground/70 hover:text-foreground border-b-2 border-transparent';
      case 'underline':
      default:
        return isActive 
          ? 'text-foreground border-b-2 border-lime-500' 
          : 'text-foreground/70 hover:text-foreground border-b-2 border-transparent';
    }
  };
  
  return (
    <div className={`w-full ${className}`}>
      <div className={`flex ${variant === 'boxed' ? 'gap-1' : 'gap-4'} overflow-x-auto`}>
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => handleTabChange(tab.value)}
            className={`
              ${getTabStyles(tab.value)}
              ${variant === 'pills' ? 'px-4 py-2 rounded-md' : ''}
              ${variant === 'boxed' ? 'px-4 py-2 rounded-t-md' : ''}
              ${variant === 'underline' ? 'pb-2' : ''}
              transition-all duration-200 cursor-pointer
              flex items-center
            `}
          >
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>
      
      <div className="mt-4">
        {tabs.map((tab) => (
          activeTab === tab.value && (
            <motion.div
              key={tab.value}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              {tab.content}
            </motion.div>
          )
        ))}
      </div>
    </div>
  );
}
