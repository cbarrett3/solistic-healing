'use client';

import { ChangeEvent, forwardRef, InputHTMLAttributes } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  hint?: string;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    label, 
    error, 
    hint, 
    className = '', 
    size = 'md', 
    fullWidth = false,
    icon,
    id,
    ...props 
  }, ref) => {
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-5 py-2.5 text-lg'
    };
    
    const widthClass = fullWidth ? 'w-full' : '';
    const errorClass = error ? 'border-destructive focus:ring-destructive' : 'border-input focus:ring-primary';
    
    const baseClasses = 'bg-background rounded-md border shadow-sm focus:outline-none focus:ring-2 transition-colors';
    const inputClasses = `${baseClasses} ${sizeClasses[size]} ${errorClass} ${widthClass} ${icon ? 'pl-10' : ''} ${className}`;
    
    const labelAnimationProps: HTMLMotionProps<'label'> = {
      initial: { opacity: 0, y: -5 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.3 }
    };
    
    const messageAnimationProps: HTMLMotionProps<'p'> = {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.3, delay: 0.2 }
    };
    
    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <motion.label 
            htmlFor={id} 
            className="block text-sm font-medium text-foreground mb-1.5"
            {...labelAnimationProps}
          >
            {label}
          </motion.label>
        )}
        
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
              {icon}
            </div>
          )}
          
          <input
            id={id}
            ref={ref}
            className={inputClasses}
            {...props}
          />
        </div>
        
        {(error || hint) && (
          <motion.p 
            className={`mt-1.5 text-sm ${error ? 'text-destructive' : 'text-muted-foreground'}`}
            {...messageAnimationProps}
          >
            {error || hint}
          </motion.p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

interface TextareaProps extends Omit<InputHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  label?: string;
  error?: string;
  hint?: string;
  fullWidth?: boolean;
  rows?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    label, 
    error, 
    hint, 
    className = '', 
    fullWidth = false,
    rows = 4,
    id,
    ...props 
  }, ref) => {
    const widthClass = fullWidth ? 'w-full' : '';
    const errorClass = error ? 'border-destructive focus:ring-destructive' : 'border-input focus:ring-primary';
    
    const baseClasses = 'bg-background rounded-md border shadow-sm focus:outline-none focus:ring-2 transition-colors px-4 py-2';
    const textareaClasses = `${baseClasses} ${errorClass} ${widthClass} ${className}`;
    
    const labelAnimationProps: HTMLMotionProps<'label'> = {
      initial: { opacity: 0, y: -5 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.3 }
    };
    
    const messageAnimationProps: HTMLMotionProps<'p'> = {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.3, delay: 0.2 }
    };
    
    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <motion.label 
            htmlFor={id} 
            className="block text-sm font-medium text-foreground mb-1.5"
            {...labelAnimationProps}
          >
            {label}
          </motion.label>
        )}
        
        <textarea
          id={id}
          ref={ref}
          rows={rows}
          className={textareaClasses}
          {...props}
        />
        
        {(error || hint) && (
          <motion.p 
            className={`mt-1.5 text-sm ${error ? 'text-destructive' : 'text-muted-foreground'}`}
            {...messageAnimationProps}
          >
            {error || hint}
          </motion.p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
