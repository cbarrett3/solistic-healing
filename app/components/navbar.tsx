'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface NavbarProps {
  onMobileMenuToggle?: (isOpen: boolean) => void;
}

export default function Navbar({ onMobileMenuToggle }: NavbarProps) {
  const [hoveredIcon, setHoveredIcon] = useState<number | null>(null);
  const [pressedIcon, setPressedIcon] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    const newState = !mobileMenuOpen;
    setMobileMenuOpen(newState);
    if (onMobileMenuToggle) {
      onMobileMenuToggle(newState);
    }
  };

  // Handle scroll detection for background change
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Handle link click to prevent default behavior
  const handleLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // No scrolling behavior - just update the URL
    const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
    if (href) {
      window.history.pushState({}, '', href);
    }
    // Close mobile menu if open
    if (mobileMenuOpen) {
      toggleMobileMenu();
    }
  };

  // Handler functions for icon interactions
  const handleIconMouseEnter = (index: number) => setHoveredIcon(index);
  const handleIconMouseLeave = () => setHoveredIcon(null);
  const handleIconMouseDown = (index: number) => setPressedIcon(index);
  const handleIconMouseUp = () => setPressedIcon(null);

  // Navigation items array
  const navItems = ['Home', 'About', 'Services', 'Media', 'Pricing', 'Contact'];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-background/90 backdrop-blur-sm shadow-sm' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-5 sm:px-8 md:px-10 py-4 sm:py-5">
        <div className="flex items-center justify-between">
          {/* Logo and brand */}
          <div className="flex items-center group">
            <div className="mr-3 md:mr-4 transition-transform duration-500 ease-out group-hover:rotate-[360deg]">
              <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center">
                {/* Sun icon */}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-8 h-8 sm:w-9 sm:h-9 text-primary transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(var(--color-primary-rgb)/0.8)]">
                  <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z" strokeWidth="0.5" fill="currentColor" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" strokeWidth="1" />
                </svg>
              </div>
            </div>
            <Link href="/">
              <h1 className={`text-xl sm:text-2xl font-light tracking-[0.25em] sm:tracking-[0.3em] ${scrolled ? 'text-foreground' : 'text-white'} uppercase relative group-hover:text-primary transition-colors duration-300 cursor-pointer`}>
                SOLISTIC HEALING
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-500 ease-out group-hover:w-full"></span>
              </h1>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="block sm:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-primary transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-full h-0.5 bg-primary transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`w-full h-0.5 bg-primary transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden sm:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={`#${item.toLowerCase()}`}
                className={`relative text-sm font-light uppercase tracking-wider ${
                  scrolled ? 'text-foreground hover:text-primary' : 'text-white hover:text-primary'
                } transition-colors duration-300`}
                onMouseEnter={() => handleIconMouseEnter(index)}
                onMouseLeave={handleIconMouseLeave}
                onMouseDown={() => handleIconMouseDown(index)}
                onMouseUp={handleIconMouseUp}
                onClick={handleLinkClick}
              >
                {item}
                <motion.span
                  className="absolute -bottom-1 left-0 h-[1px] bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: hoveredIcon === index ? '100%' : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            ))}
          </nav>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="fixed inset-0 top-16 bg-background/95 backdrop-blur-sm z-40 sm:hidden">
              <nav className="flex flex-col items-center justify-center h-full">
                {navItems.map((item, index) => (
                  <Link
                    key={index}
                    href={`#${item.toLowerCase()}`}
                    className="text-lg font-light uppercase tracking-wider text-foreground hover:text-primary my-4 transition-colors duration-300"
                    onClick={handleLinkClick}
                  >
                    {item}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`sm:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-sm shadow-md transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? 'max-h-[300px] border-b border-border/10' : 'max-h-0'
        }`}
      >
        <nav className="container mx-auto px-5 py-4">
          <ul className="flex flex-col space-y-4">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={`#${item.toLowerCase()}`}
                  className="block text-foreground hover:text-primary transition-colors duration-300 uppercase text-sm tracking-wider"
                  onClick={handleLinkClick}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
