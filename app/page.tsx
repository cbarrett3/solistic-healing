"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  // State to track which icon is being hovered or pressed
  const [hoveredIcon, setHoveredIcon] = useState<number | null>(null);
  const [pressedIcon, setPressedIcon] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handler functions for icon interactions
  const handleIconMouseEnter = (index: number) => setHoveredIcon(index);
  const handleIconMouseLeave = () => setHoveredIcon(null);
  const handleIconMouseDown = (index: number) => setPressedIcon(index);
  const handleIconMouseUp = () => setPressedIcon(null);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <div className="min-h-screen relative">
      {/* Navigation Bar */}
      <header className="absolute top-0 left-0 right-0 z-40">
        <div className="container mx-auto px-5 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6">
          <div className="flex items-center justify-between">
            {/* Logo and brand */}
            <div className="flex items-center group">
              <div className="mr-3 md:mr-4 transition-transform duration-500 ease-out group-hover:rotate-[360deg]">
                <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center">
                  {/* Sun icon more similar to reference */}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-8 h-8 sm:w-9 sm:h-9 text-primary transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(var(--color-primary-rgb)/0.8)]">
                    <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z" strokeWidth="0.5" fill="currentColor" />
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" strokeWidth="1" />
                  </svg>
                </div>
              </div>
              <h1 className="text-xl sm:text-2xl font-light tracking-[0.25em] sm:tracking-[0.3em] text-white uppercase relative group-hover:text-primary transition-colors duration-300 cursor-pointer">
                SOLISTIC HEALING
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-500 ease-out group-hover:w-full"></span>
              </h1>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden w-12 h-12 flex items-center justify-center text-white focus:outline-none rounded-full relative overflow-hidden transition-all duration-300 hover:text-primary active:scale-95 before:absolute before:inset-0 before:bg-white/0 before:hover:bg-white/10 before:transition-all before:duration-300 before:rounded-full before:scale-0 hover:before:scale-100 before:origin-center cursor-pointer"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform duration-300 rotate-0 hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

            {/* Main Navigation - Desktop */}
            <nav className="hidden lg:flex items-center">
              <Link href="/" className="text-sm uppercase tracking-[0.2em] text-white hover:text-primary px-5 font-light relative group cursor-pointer">
                HOME
                <span className="absolute -bottom-1 left-1/2 w-0 h-[1px] bg-primary transition-all duration-300 ease-out group-hover:w-[70%] group-hover:left-[15%]"></span>
              </Link>
              <Link href="/about" className="text-sm uppercase tracking-[0.2em] text-white hover:text-primary px-5 font-light relative group cursor-pointer">
                ABOUT US
                <span className="absolute -bottom-1 left-1/2 w-0 h-[1px] bg-primary transition-all duration-300 ease-out group-hover:w-[70%] group-hover:left-[15%]"></span>
              </Link>
              <Link href="/services" className="text-sm uppercase tracking-[0.2em] text-white hover:text-primary px-5 font-light relative group cursor-pointer">
                SERVICES
                <span className="absolute -bottom-1 left-1/2 w-0 h-[1px] bg-primary transition-all duration-300 ease-out group-hover:w-[70%] group-hover:left-[15%]"></span>
              </Link>
              <Link href="/page" className="text-sm uppercase tracking-[0.2em] text-white hover:text-primary px-5 font-light relative group cursor-pointer">
                PAGE
                <span className="absolute -bottom-1 left-1/2 w-0 h-[1px] bg-primary transition-all duration-300 ease-out group-hover:w-[70%] group-hover:left-[15%]"></span>
              </Link>
              <Link href="/contact" className="text-sm uppercase tracking-[0.2em] text-white hover:text-primary px-5 font-light relative group cursor-pointer">
                CONTACT US
                <span className="absolute -bottom-1 left-1/2 w-0 h-[1px] bg-primary transition-all duration-300 ease-out group-hover:w-[70%] group-hover:left-[15%]"></span>
              </Link>
              <span className="text-white/30 mx-4">|</span>
            </nav>

            {/* Contact Icons - Desktop */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Phone Icon Button */}
              <button 
                className="w-10 h-10 rounded-full border border-white/30 
                  flex items-center justify-center transition-all duration-300 ease-in-out
                  hover:border-primary hover:scale-105 active:scale-95 hover:bg-primary/10
                  hover:shadow-[0_0_15px_rgba(var(--color-primary-rgb)/0.5)] relative overflow-hidden
                  after:absolute after:inset-0 after:bg-primary/0 after:hover:bg-primary/5 
                  after:transition-all after:duration-500 after:rounded-full after:scale-0 
                  hover:after:scale-150 after:origin-center cursor-pointer"
                onMouseEnter={() => handleIconMouseEnter(0)}
                onMouseLeave={handleIconMouseLeave}
                onMouseDown={() => handleIconMouseDown(0)}
                onMouseUp={handleIconMouseUp}
                onTouchStart={() => handleIconMouseDown(0)}
                onTouchEnd={handleIconMouseUp}
                aria-label="Phone contact"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 text-white transition-all duration-300 group-hover:text-primary relative z-10" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </button>
              
              {/* Email Icon Button */}
              <button 
                className="w-10 h-10 rounded-full border border-white/30 
                  flex items-center justify-center transition-all duration-300 ease-in-out
                  hover:border-primary hover:scale-105 active:scale-95 hover:bg-primary/10
                  hover:shadow-[0_0_15px_rgba(var(--color-primary-rgb)/0.5)] relative overflow-hidden
                  after:absolute after:inset-0 after:bg-primary/0 after:hover:bg-primary/5 
                  after:transition-all after:duration-500 after:rounded-full after:scale-0 
                  hover:after:scale-150 after:origin-center cursor-pointer"
                onMouseEnter={() => handleIconMouseEnter(1)}
                onMouseLeave={handleIconMouseLeave}
                onMouseDown={() => handleIconMouseDown(1)}
                onMouseUp={handleIconMouseUp}
                onTouchStart={() => handleIconMouseDown(1)}
                onTouchEnd={handleIconMouseUp}
                aria-label="Email contact"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 text-white transition-all duration-300 group-hover:text-primary relative z-10" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu - Slide Down */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 bg-black/80 backdrop-blur-sm rounded-xl p-5 animate-slideDown">
              <nav className="flex flex-col space-y-4">
                <Link href="/" className="text-sm uppercase tracking-[0.2em] text-white hover:text-primary py-2 font-light relative group overflow-hidden cursor-pointer">
                  <span className="relative z-10 transition-transform duration-300 group-active:scale-95">HOME</span>
                  <span className="absolute inset-0 w-full h-full bg-primary/0 group-hover:bg-primary/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-0 transition-all duration-300 rounded"></span>
                </Link>
                <Link href="/about" className="text-sm uppercase tracking-[0.2em] text-white hover:text-primary py-2 font-light relative group overflow-hidden cursor-pointer">
                  <span className="relative z-10 transition-transform duration-300 group-active:scale-95">ABOUT US</span>
                  <span className="absolute inset-0 w-full h-full bg-primary/0 group-hover:bg-primary/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-0 transition-all duration-300 rounded"></span>
                </Link>
                <Link href="/services" className="text-sm uppercase tracking-[0.2em] text-white hover:text-primary py-2 font-light relative group overflow-hidden cursor-pointer">
                  <span className="relative z-10 transition-transform duration-300 group-active:scale-95">SERVICES</span>
                  <span className="absolute inset-0 w-full h-full bg-primary/0 group-hover:bg-primary/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-0 transition-all duration-300 rounded"></span>
                </Link>
                <Link href="/page" className="text-sm uppercase tracking-[0.2em] text-white hover:text-primary py-2 font-light relative group overflow-hidden cursor-pointer">
                  <span className="relative z-10 transition-transform duration-300 group-active:scale-95">PAGE</span>
                  <span className="absolute inset-0 w-full h-full bg-primary/0 group-hover:bg-primary/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-0 transition-all duration-300 rounded"></span>
                </Link>
                <Link href="/contact" className="text-sm uppercase tracking-[0.2em] text-white hover:text-primary py-2 font-light relative group overflow-hidden cursor-pointer">
                  <span className="relative z-10 transition-transform duration-300 group-active:scale-95">CONTACT US</span>
                  <span className="absolute inset-0 w-full h-full bg-primary/0 group-hover:bg-primary/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-0 transition-all duration-300 rounded"></span>
                </Link>
              </nav>
              
              {/* Contact Icons - Mobile */}
              <div className="flex items-center space-x-4 mt-5 pt-4 border-t border-white/10">
                <button 
                  className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center transition-all duration-300 ease-in-out hover:border-primary active:scale-95 active:bg-primary/10 relative overflow-hidden cursor-pointer"
                  aria-label="Phone contact"
                >
                  <span className="absolute inset-0 bg-primary/0 hover:bg-primary/10 transform scale-0 hover:scale-100 transition-transform duration-500 rounded-full"></span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 text-white relative z-10" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </button>
                <button 
                  className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center transition-all duration-300 ease-in-out hover:border-primary active:scale-95 active:bg-primary/10 relative overflow-hidden cursor-pointer"
                  aria-label="Email contact"
                >
                  <span className="absolute inset-0 bg-primary/0 hover:bg-primary/10 transform scale-0 hover:scale-100 transition-transform duration-500 rounded-full"></span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 text-white relative z-10" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="h-screen w-full overflow-hidden relative flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1920&auto=format&fit=crop"
            alt="Forest background"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>
        </div>
        
        <div className="relative w-full px-5 sm:px-8 md:px-10 pt-16">
          {/* Main Content Container - For better organization */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
            {/* Left Side Content */}
            <div className="w-full md:w-1/2 lg:w-3/5">
              {/* Subtitle */}
              <div className="ml-0 sm:ml-6 text-white/80 text-xs uppercase tracking-[0.25em]">
                SOLISTIC HEALING - MENTAL WELLNESS
              </div>
              
              {/* Main content */}
              <div className="ml-0 sm:ml-6 max-w-[600px] mt-3">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-light leading-[1.1] text-white mb-4">
                  Your Path to<br />
                  Mental Wellness<br />
                  Starts Here
                </h2>
                <div className="w-[80px] sm:w-[100px] h-[1px] bg-white/40 my-3"></div>
                <p className="text-white/90 max-w-[500px] mb-5 text-base font-light leading-relaxed">
                  Odio cras proin proin sit quis fringilla aliquet. Consectetur elementum viverra egestas egestas nulla ullamcorper varius quam.
                </p>
                <button className="bg-primary text-black uppercase font-medium px-8 py-3 rounded-full text-sm tracking-[0.15em] relative overflow-hidden group transition-all duration-300 hover:shadow-[0_0_20px_rgba(var(--color-primary-rgb)/0.7)] active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-black/20 cursor-pointer">
                  <span className="relative z-10">LEARN MORE</span>
                  <span className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-colors duration-300"></span>
                  <span className="absolute bottom-0 left-0 w-full h-0 bg-black/10 group-hover:h-full transition-all duration-300 ease-in-out"></span>
                </button>
                
                <div className="mt-8">
                  <div className="text-sm text-white tracking-wide">
                    <span className="font-semibold">4.9</span>/5 Rating From Our Clients
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Side Content - Desktop Only */}
            <div className="hidden md:block md:w-1/2 lg:w-2/5 relative md:pt-0">
              {/* Watch Story Element */}
              <div className="flex items-center justify-end mb-6">
                <div className="mr-4 text-sm text-white text-right tracking-wide font-light">
                  Watch Our Story
                </div>
                <div className="relative">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/80 hover:border-primary group transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_0_15px_rgba(var(--color-primary-rgb)/0.6)] active:scale-95">
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 z-10"></div>
                    <Image 
                      src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format&fit=crop"
                      alt="Profile"
                      width={56}
                      height={56}
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
              </div>
              
              {/* Services Card - Desktop Only */}
              <div className="w-[220px] sm:w-[260px] lg:w-[280px] ml-auto">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="p-4 sm:p-5">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium text-black text-sm">Core Services</h3>
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-[#F2FED7] text-black p-3 rounded-lg text-sm hover:bg-primary/20 transition-colors cursor-pointer">
                        Therapy Sessions
                      </div>
                      <div className="bg-[#F2FED7] text-black p-3 rounded-lg text-sm hover:bg-primary/20 transition-colors cursor-pointer">
                        Psychiatric Consultations
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-[120px] bg-amber-400 overflow-hidden relative">
                    <Image 
                      src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=240&auto=format&fit=crop"
                      alt="Therapy session"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile-only Watch Story Element - Positioned at bottom of screen */}
          <div className="flex md:hidden items-center justify-end fixed bottom-10 right-4 z-10">
            <div className="mr-3 text-sm text-white text-right tracking-wide font-light drop-shadow-md">
              Watch Our Story
            </div>
            <div className="relative">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/80 hover:border-primary group transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_0_15px_rgba(var(--color-primary-rgb)/0.6)] active:scale-95">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 z-10"></div>
                <Image 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format&fit=crop"
                  alt="Profile"
                  width={48}
                  height={48}
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>
          </div>
          
          {/* Mobile Services Button - Shows a modal or navigates to services page */}
          <div className="md:hidden fixed bottom-10 left-4 z-10">
            <Link href="/services" className="bg-white text-black rounded-full px-5 py-3 flex items-center shadow-lg group relative overflow-hidden transition-all duration-300 active:scale-95 hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] cursor-pointer">
              <span className="font-medium text-sm relative z-10">View Services</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 relative z-10 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="absolute inset-0 bg-primary/0 group-hover:bg-primary/90 transition-all duration-300"></span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300 ease-out"></span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
