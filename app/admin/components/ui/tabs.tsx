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
          ? 'bg-primary text-primary-foreground' 
          : 'text-foreground/70 hover:text-foreground hover:bg-muted';
      case 'boxed':
        return isActive 
          ? 'bg-background text-foreground border-t border-l border-r border-border' 
          : 'bg-muted/50 text-foreground/70 hover:text-foreground border border-transparent';
      case 'underline':
      default:
        return isActive 
          ? 'text-foreground border-b-2 border-primary' 
          : 'text-foreground/70 hover:text-foreground border-b-2 border-transparent hover:border-muted';
    }
  };
  
  return (
    <div className={`w-full ${className}`}>
      <div className="flex overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => handleTabChange(tab.value)}
            className={`px-4 py-2 flex items-center transition-all duration-200 ${getTabStyles(tab.value)}`}
          >
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            <span>{tab.label}</span>
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
