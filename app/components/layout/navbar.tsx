'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface NavbarProps {
  onMobileMenuToggle?: (isOpen: boolean) => void;
  forceDarkMode?: boolean;
}

export default function Navbar({ onMobileMenuToggle, forceDarkMode = false }: NavbarProps) {
  const [hoveredIcon, setHoveredIcon] = useState<number | null>(null);
  const [pressedIcon, setPressedIcon] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const pathname = usePathname();

  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    const newState = !mobileMenuOpen;
    setMobileMenuOpen(newState);
    
    if (newState) {
      // Store current scroll position
      setScrollPosition(window.scrollY);
      // Add fixed positioning to body
      document.body.style.position = 'fixed';
      document.body.style.top = `-${window.scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // Restore scroll position
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollPosition);
    }
    
    if (onMobileMenuToggle) {
      onMobileMenuToggle(newState);
    }
  };

  // Cleanup body styles when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, []);

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

  // Detect system color scheme
  useEffect(() => {
    // Check if browser supports matchMedia
    if (typeof window !== 'undefined' && window.matchMedia) {
      const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      // Set initial state
      setIsDarkMode(darkModeQuery.matches);
      
      // Add listener for changes
      const handleChange = (e: MediaQueryListEvent) => {
        setIsDarkMode(e.matches);
      };
      
      // Modern browsers
      if (darkModeQuery.addEventListener) {
        darkModeQuery.addEventListener('change', handleChange);
        return () => darkModeQuery.removeEventListener('change', handleChange);
      }
    }
  }, []);

  // Handle section link click
  const handleSectionLinkClick = (e: React.MouseEvent, href: string, isSection: boolean) => {
    // Close mobile menu first if open
    if (mobileMenuOpen) {
      toggleMobileMenu();
    }
    
    if (isSection) {
      e.preventDefault();
      
      // Check if we're on the home page
      const isHomePage = window.location.pathname === '/' || window.location.pathname === '';
      
      if (!isHomePage && href.startsWith('/#')) {
        // If we're not on the home page and the link is to a section on the home page,
        // navigate to the home page first
        window.location.href = href;
        return;
      }
      
      const targetId = href.split('#')[1];
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        // Finding a middle ground for the scroll position
        const width = window.innerWidth;
        let dynamicOffset = -20; // Default offset
        
        // Special case for About section (transforming-lives)
        if (targetId === 'transforming-lives') {
          // Using positive offsets to position it higher (closer to top of viewport)
          if (width < 640) {
            dynamicOffset = -120; // xs screens
          } else if (width < 768) {
            dynamicOffset = -110; // sm screens
          } else if (width < 1024) {
            dynamicOffset = -100; // md screens
          } else if (width < 1280) {
            dynamicOffset = -90; // lg screens
          } else {
            dynamicOffset = -80; // xl screens
          }
        } else {
          // For all other sections
          if (width < 640) {
            dynamicOffset = -40; // xs screens
          } else if (width < 768) {
            dynamicOffset = -30; // sm screens
          } else if (width < 1024) {
            dynamicOffset = -20; // md screens
          } else if (width < 1280) {
            dynamicOffset = -10; // lg screens
          } else {
            dynamicOffset = 0; // xl screens
          }
        }
        
        const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset + dynamicOffset;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  };

  // Handler functions for icon interactions
  const handleIconMouseEnter = (index: number) => setHoveredIcon(index);
  const handleIconMouseLeave = () => setHoveredIcon(null);
  const handleIconMouseDown = (index: number) => setPressedIcon(index);
  const handleIconMouseUp = () => setPressedIcon(null);

  // Animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        delayChildren: 0.2 // Delay children animations
      }
    }
  };

  const overlayVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.2, // Faster transition for the overlay
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: 20 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  // Navigation items array
  const navItems = [
    { name: 'About', href: '/#transforming-lives', isSection: true },
    { name: 'Conditions', href: '/#conditions', isSection: true },
    { name: 'Blog', href: '/blog', isSection: false },
    { name: 'Services', href: '/#services-pricing', isSection: true },
    { name: 'FAQ', href: '/#faq', isSection: true },
    { name: 'Contact', href: '/#contact', isSection: true }
  ];

  // Check if a nav item is active based on the current path
  const isActive = (href: string) => {
    if (href === '/blog') {
      return pathname === '/blog' || pathname.startsWith('/blog/');
    }
    return false;
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-background/90 backdrop-blur-sm shadow-sm' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-5 sm:px-8 md:px-10 py-4 sm:py-5">
        <div className="flex items-center justify-between">
          {/* Logo and brand */}
          <Link href="/" className="flex items-center group cursor-pointer">
            <div className="mr-3 md:mr-4 transition-all duration-300 ease-out group-hover:scale-110">
              <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center">
                {/* Tree of life / peace symbol inspired icon */}
                <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 sm:w-9 sm:h-9 text-primary transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(var(--color-primary-rgb)/0.8)]">
                  {/* Circle */}
                  <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  
                  {/* Tree/peace symbol */}
                  <path 
                    d="M12 4V20" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                  />
                  
                  {/* Branches/peace lines */}
                  <path 
                    d="M12 8L8 12M12 8L16 12" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                  />
                  
                  <path 
                    d="M12 14L9 17M12 14L15 17" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                  />
                </svg>
              </div>
            </div>
            <h1 className={`text-base sm:text-lg font-normal tracking-wider hidden md:block ${
              !scrolled && !forceDarkMode ? 'text-white/80' : forceDarkMode ? (isDarkMode ? 'text-white/80' : 'text-foreground/80') : isDarkMode ? 'text-white/80' : 'text-foreground/80'
            } transition-colors duration-300 hover:text-primary`}>
              Solistic Healing
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-500 ease-out group-hover:w-full"></span>
            </h1>
          </Link>

          {/* Mobile Menu Button - Only visible when menu is closed */}
          {!mobileMenuOpen && (
            <button 
              className="block sm:hidden cursor-pointer relative group p-2 -m-2 rounded-lg transition-all duration-300 hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/30 z-50"
              onClick={toggleMobileMenu}
              aria-label="Open menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className="w-full h-0.5 bg-primary transition-all duration-300 group-hover:w-5 group-hover:translate-x-1"></span>
                <span className="w-full h-0.5 bg-primary transition-all duration-300 group-hover:w-4 group-hover:translate-x-2"></span>
                <span className="w-full h-0.5 bg-primary transition-all duration-300 group-hover:w-5 group-hover:translate-x-1"></span>
              </div>
            </button>
          )}

          {/* Desktop Navigation */}
          <nav className="hidden sm:flex items-center space-x-4 md:space-x-6 lg:space-x-8">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`relative text-sm font-light uppercase tracking-wider cursor-pointer ${
                  isActive(item.href) ? 'text-primary' : 
                  !scrolled && !forceDarkMode ? 'text-white' : forceDarkMode ? (isDarkMode ? 'text-white' : 'text-foreground') : isDarkMode ? 'text-white' : 'text-foreground'
                } hover:text-primary transition-colors duration-300`}
                onMouseEnter={() => handleIconMouseEnter(index)}
                onMouseLeave={handleIconMouseLeave}
                onMouseDown={() => handleIconMouseDown(index)}
                onMouseUp={handleIconMouseUp}
                onClick={(e) => handleSectionLinkClick(e, item.href, item.isSection)}
              >
                {item.name}
                <motion.span
                  className="absolute -bottom-1 left-0 h-[1px] bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: isActive(item.href) ? '100%' : hoveredIcon === index ? '100%' : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Navigation - Separate from header with AnimatePresence for smooth transitions */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="sm:hidden">
            {/* Dark overlay with animation */}
            <motion.div 
              className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
              initial="closed"
              animate="open"
              exit="closed"
              variants={overlayVariants}
              onClick={toggleMobileMenu}
            ></motion.div>
            
            {/* Menu content with animation */}
            <motion.div 
              className={`fixed inset-0 z-50 pt-16 ${
                forceDarkMode ? (isDarkMode ? 'bg-background/95' : 'bg-white/95') : isDarkMode ? 'bg-background/95' : 'bg-white/95'
              }`}
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
            >
              {/* Close button */}
              <button
                className="absolute top-4 right-5 p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors duration-300 z-50 cursor-pointer"
                onClick={toggleMobileMenu}
                aria-label="Close menu"
              >
                <X className="w-6 h-6 text-primary" />
              </button>
              
              <nav className="flex flex-col items-center justify-center h-full">
                {navItems.map((item, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={itemVariants}
                    className="w-full text-center py-4"
                  >
                    <Link
                      href={item.href}
                      className={`text-lg font-light uppercase tracking-wider ${
                        isActive(item.href) ? 'text-primary' :
                        forceDarkMode ? (isDarkMode ? 'text-white' : 'text-foreground') : isDarkMode ? 'text-white' : 'text-foreground'
                      } hover:text-primary transition-all duration-300 cursor-pointer inline-block`}
                      onClick={(e) => handleSectionLinkClick(e, item.href, item.isSection)}
                    >
                      {item.name}
                    </Link>
                    <div className={`h-[1px] ${
                      forceDarkMode ? (isDarkMode ? 'bg-white/10' : 'bg-foreground/10') : isDarkMode ? 'bg-white/10' : 'bg-foreground/10'
                    } w-16 mx-auto mt-4`}></div>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
