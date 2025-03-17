"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./components/section-heading";
import TherapistCard from "./components/therapist-card";
import MissionSection from "./components/mission-section";
import ConditionsSection from "./components/conditions-section";
import MediaShowcase from "./components/media-showcase";
import PricingSection from "./components/pricing-section";
import Navbar from "./components/navbar";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Add effect to handle body overflow when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle mobile menu toggle from Navbar component
  const handleMobileMenuToggle = (isOpen: boolean) => {
    setMobileMenuOpen(isOpen);
  };

  return (
    <div className="min-h-screen relative">
      {/* Navigation Bar - Now using the Navbar component */}
      <Navbar onMobileMenuToggle={handleMobileMenuToggle} />

      {/* Hero Section */}
      <section data-section className="h-screen w-full overflow-hidden relative flex items-center">
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
                  <span className="block text-primary">Transformative</span>
                  <span className="block">Ketamine-Assisted</span>
                  <span className="block">Psychotherapy</span>
                </h2>
                <div className="w-[80px] sm:w-[100px] h-[1px] bg-white/40 my-3"></div>
                <p className="text-white/90 max-w-[500px] mb-5 text-base font-light leading-relaxed">
                  Offering individual psychotherapy, ketamine-assisted psychotherapy, and psychedelic integration services to help you find healing, purpose, and a renewed sense of self.
                </p>
                <button className="bg-primary text-black uppercase font-medium px-8 py-3 rounded-full text-sm tracking-[0.15em] relative overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(var(--color-primary-rgb)/0.7)] active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-black/20 cursor-pointer">
                  <span className="relative z-10">LEARN MORE</span>
                  <span className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-colors duration-300"></span>
                  <span className="absolute bottom-0 left-0 w-full h-0 bg-black/10 group-hover:w-full transition-all duration-300 ease-in-out"></span>
                </button>
                
                <div className="mt-8">
                  <div className="text-sm text-white tracking-wide">
                    <span className="font-semibold">Roseville, MN</span> | Transformative Mental Health Care
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
                <a 
                  href="https://www.youtube.com/watch?v=_uLNBoyzA8I" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="relative group"
                >
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/80 hover:border-primary group-hover:border-primary transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_0_15px_rgba(var(--color-primary-rgb)/0.6)] active:scale-95">
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 z-10 rounded-full"></div>
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <div className="w-6 h-6 bg-black/50 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    <div 
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: "url('https://i.ytimg.com/vi/_uLNBoyzA8I/hqdefault.jpg')" }}
                    ></div>
                  </div>
                </a>
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
            
            {/* Mobile-only Watch Story Element - Positioned at bottom of screen */}
            <div className="flex md:hidden items-center justify-end fixed bottom-10 right-4 z-10">
              <div className="mr-3 text-sm text-white text-right tracking-wide font-light drop-shadow-md">
                Watch Our Story
              </div>
              <a 
                href="https://www.youtube.com/watch?v=_uLNBoyzA8I" 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative group"
              >
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/80 hover:border-primary group-hover:border-primary transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_0_15px_rgba(var(--color-primary-rgb)/0.6)] active:scale-95">
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 z-10 rounded-full"></div>
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="w-6 h-6 bg-black/50 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: "url('https://i.ytimg.com/vi/_uLNBoyzA8I/hqdefault.jpg')" }}
                  ></div>
                </div>
              </a>
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
          
          {/* Mobile-only Watch Story Element - Positioned at bottom of screen */}
          <div className="flex md:hidden items-center justify-end fixed bottom-10 right-4 z-10">
            <div className="mr-3 text-sm text-white text-right tracking-wide font-light drop-shadow-md">
              Watch Our Story
            </div>
            <a 
              href="https://www.youtube.com/watch?v=_uLNBoyzA8I" 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative group"
            >
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/80 hover:border-primary group-hover:border-primary transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_0_15px_rgba(var(--color-primary-rgb)/0.6)] active:scale-95">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 z-10 rounded-full"></div>
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="w-6 h-6 bg-black/50 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: "url('https://i.ytimg.com/vi/_uLNBoyzA8I/hqdefault.jpg')" }}
                ></div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section data-section className="w-full py-8 md:py-12 about-us-section flex items-center min-h-[600px] lg:min-h-[650px] xl:min-h-[700px] 2xl:min-h-[750px]">
        <div className="container mx-auto px-4 about-us-content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-screen-xl mx-auto about-us-grid">
            {/* Left Column */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <SectionHeading 
                  title="Transforming Lives Through Care" 
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="mt-5"
              >
                <TherapistCard
                  name="Eric Peterson"
                  title="Therapist, Solistic Healing"
                  bio={[
                    "I received my M.A in Counseling and Psychological Services from Saint Mary's University of Minnesota with a Graduate Certificate in Addiction Studies.",
                    "My approach to healing is informed by cognitive-behavioral therapy, transpersonal psychology, person-centered therapy, & somatic and mindfulness-based therapies."
                  ]}
                  imageSrc="/eric.jpeg"
                />
              </motion.div>
            </div>
            
            {/* Right Column */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <MissionSection
                  title="Our Mission & Approach"
                  points={[
                    {
                      title: "Holistic Healing",
                      description: "We believe in treating the whole person, not just symptoms. Our approach integrates mind, body, and spirit for complete wellness."
                    },
                    {
                      title: "Evidence-Based Practices",
                      description: "Our therapeutic methods are grounded in research and proven techniques, ensuring effective and reliable care."
                    },
                    {
                      title: "Personalized Care",
                      description: "We recognize that each individual's journey is unique. Our treatment plans are tailored to your specific needs and goals."
                    }
                  ]}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Conditions We Treat Section */}
      <ConditionsSection />
      
      {/* Media Showcase Section */}
      <MediaShowcase />
      
      {/* Pricing Section */}
      <PricingSection />
      
      {/* Ketamine Education Section */}
      <section data-section className="w-full py-16 md:py-24 bg-black/30 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
              <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-lg">
                <div className="relative w-full h-full bg-neutral-900 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <div className="text-center px-4 mb-6">
                      <h3 className="text-xl font-medium mb-2">Ketamine-Assisted Psychotherapy</h3>
                      <p className="text-sm text-white/70">Click to watch our story</p>
                    </div>
                    <a 
                      href="https://www.youtube.com/watch?v=_uLNBoyzA8I" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center cursor-pointer hover:bg-primary transition-colors duration-300 hover:scale-110 transform"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 md:pl-12">
              <h2 className="text-3xl md:text-4xl font-light text-white mb-4">Understanding KAP</h2>
              <div className="w-[60px] h-[1px] bg-primary mb-6"></div>
              <p className="text-white/80 mb-6 leading-relaxed">
                Ketamine-Assisted Psychotherapy (KAP) combines the therapeutic effects of ketamine with professional psychotherapy to create a unique healing experience for treatment-resistant conditions.
              </p>
              <p className="text-white/80 mb-6 leading-relaxed">
                KAP works by allowing people to take a break from their everyday thinking patterns. The ketamine experience creates a window of neuroplasticity, helping patients gain new insights and make meaningful behavioral changes with the guidance of a trained therapist.
              </p>
              <a 
                href="https://www.youtube.com/watch?v=_uLNBoyzA8I" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block text-primary border border-primary px-6 py-2 rounded-full text-sm hover:bg-primary hover:text-black transition-all duration-300 cursor-pointer"
              >
                Watch Our Story
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How KAP Works Section */}
      <section data-section className="w-full py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4 text-center">How Ketamine-Assisted Psychotherapy Works</h2>
            <div className="w-[60px] h-[1px] bg-primary mx-auto mb-10"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:border-primary/30 transition-all duration-300">
                <h3 className="text-xl font-medium text-foreground mb-3">Confronting Fears</h3>
                <p className="text-foreground/70">
                  Ketamine can help you accept thoughts, emotions, memories, and sensations that normally would be avoided. It helps you confront your fears and learn that certain things do not need to be avoided.
                </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:border-primary/30 transition-all duration-300">
                <h3 className="text-xl font-medium text-foreground mb-3">Increasing Motivation</h3>
                <p className="text-foreground/70">
                  Ketamine can help to increase motivation to maintain new learned behaviors that are more suited for your goals and needs.
                </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:border-primary/30 transition-all duration-300">
                <h3 className="text-xl font-medium text-foreground mb-3">Reducing Threat Response</h3>
                <p className="text-foreground/70">
                  Ketamine can help to reduce the threat response that is attached to certain emotions, thoughts, beliefs, body sensations, and images.
                </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:border-primary/30 transition-all duration-300">
                <h3 className="text-xl font-medium text-foreground mb-3">Creating New Thoughts</h3>
                <p className="text-foreground/70">
                  Speaking new thoughts into existence and realizing those thoughts are more gentle, relaxing, and helpful to use when talking to yourself.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section data-section className="w-full py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-foreground mb-3">Our Services</h2>
            <div className="w-[60px] h-[1px] bg-primary mx-auto mb-4"></div>
            <p className="text-foreground/70 max-w-[600px] mx-auto">
              Comprehensive mental wellness services tailored to your unique needs and goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Service 1 */}
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:border-primary/30 transition-all duration-300 group cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 11l-2.25 2.25l6.5-6.5m-4.5 4.5l6.5 6.5" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-foreground mb-2 group-hover:text-primary transition-colors duration-300">Ketamine-Assisted Psychotherapy</h3>
              <p className="text-foreground/70 text-sm">
                A transformative approach combining ketamine medicine with psychotherapy to help treat depression, anxiety, PTSD, and other conditions resistant to traditional treatments.
              </p>
            </div>
            
            {/* Service 2 */}
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:border-primary/30 transition-all duration-300 group cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-foreground mb-2 group-hover:text-primary transition-colors duration-300">Individual Psychotherapy</h3>
              <p className="text-foreground/70 text-sm">
                Using cognitive-behavioral therapy to increase awareness of thinking and behavioral patterns, developing skills for a more relaxed, creative, and flexible mind.
              </p>
            </div>
            
            {/* Service 3 */}
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:border-primary/30 transition-all duration-300 group cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 11l-2.25 2.25l6.5-6.5m-4.5 4.5l6.5 6.5" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-foreground mb-2 group-hover:text-primary transition-colors duration-300">Psychedelic Integration</h3>
              <p className="text-foreground/70 text-sm">
                Support for processing insights from psychedelic experiences, creating individualized integration plans to help you gain long-term benefits and personal transformation.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link href="/services" className="inline-block text-primary border border-primary px-6 py-2 rounded-full text-sm hover:bg-primary hover:text-black transition-all duration-300 cursor-pointer">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section data-section className="w-full py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">Begin Your Healing Journey Today</h2>
            <div className="w-[60px] h-[1px] bg-primary mx-auto mb-6"></div>
            <p className="text-foreground/70 max-w-[700px] mx-auto mb-8">
              Take the first step toward mental wellness. Contact us to schedule a free 15-minute consultation and learn how our services can help you achieve lasting positive change.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex items-center gap-2 text-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+1 612-412-4873</span>
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2" />
                </svg>
                <span>ericpeterson@solistichealing.org</span>
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>1611 County Road B West, Suite 214, Roseville, MN, 55113</span>
              </div>
            </div>
            <div className="mt-8">
              <Link href="/contact" className="bg-primary text-black uppercase font-medium px-8 py-3 rounded-full text-sm tracking-[0.15em] relative overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(var(--color-primary-rgb)/0.7)] active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-black/20 cursor-pointer">
                <span className="relative z-10">CONTACT US</span>
                <span className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-colors duration-300"></span>
                <span className="absolute bottom-0 left-0 w-full h-0 bg-black/10 group-hover:h-full transition-all duration-300 ease-in-out"></span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
