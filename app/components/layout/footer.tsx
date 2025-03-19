'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  // Footer navigation items
  const footerLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about' },
    { name: 'Services', href: '/#services' },
    { name: 'Conditions', href: '/conditions' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/#contact' }
  ];

  // Social media links
  const socialLinks = [
    { name: 'Instagram', href: 'https://instagram.com', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="4" strokeWidth="1.5" />
        <circle cx="18" cy="6" r="1" fill="currentColor" />
      </svg>
    )},
    { name: 'Facebook', href: 'https://facebook.com', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" strokeWidth="1.5" />
      </svg>
    )},
    { name: 'Twitter', href: 'https://twitter.com', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" strokeWidth="1.5" />
      </svg>
    )}
  ];

  return (
    <footer className="w-full bg-background/90 backdrop-blur-sm border-t border-white/10 dark:border-white/5 py-8 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and description */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="mr-3 transition-transform duration-500 ease-out">
                <div className="w-8 h-8 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-8 h-8 text-primary">
                    <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z" strokeWidth="0.5" fill="currentColor" />
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" strokeWidth="1" />
                  </svg>
                </div>
              </div>
              <span className="text-lg font-light tracking-wider text-foreground">Solistic Healing</span>
            </div>
            <p className="text-sm text-foreground/70 font-light max-w-xs">
              Dedicated to providing holistic healing services that nurture your body, mind, and spirit on your journey to wellness.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm uppercase tracking-wider text-foreground/80 font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link 
                    href={link.href}
                    className="text-sm text-foreground/70 hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact and social */}
          <div>
            <h3 className="text-sm uppercase tracking-wider text-foreground/80 font-medium mb-4">Connect</h3>
            <div className="space-y-2 mb-6">
              <p className="text-sm text-foreground/70">
                <span className="inline-block w-5 mr-2 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                (612) 412-4873
              </p>
              <p className="text-sm text-foreground/70">
                <span className="inline-block w-5 mr-2 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                ericpeterson@solistichealing.org
              </p>
              <p className="text-sm text-foreground/70">
                <span className="inline-block w-5 mr-2 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <span className="inline-block">
                  2855 Anthony Lane South,<br />
                  Suite 140,<br />
                  Saint Anthony MN 55418
                </span>
              </p>
            </div>
            
            {/* Social icons */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 dark:bg-black/20 flex items-center justify-center text-foreground/70 hover:text-primary hover:bg-white/20 dark:hover:bg-black/30 transition-colors duration-200"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-white/5 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-foreground/60 mb-4 sm:mb-0">
            &copy; {currentYear} Solistic Healing. All rights reserved.
          </p>
          <div className="flex space-x-4 text-xs text-foreground/60">
            <Link href="/privacy" className="hover:text-primary transition-colors duration-200">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors duration-200">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
