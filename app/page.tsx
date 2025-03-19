"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Import from organized component directories
import { Navbar } from "./components/layout";
import { SectionHeading, TherapistCard, SectionScrollArrow } from "./components/ui";
import { 
  MissionSection, 
  ConditionsSection, 
  MediaShowcase, 
  AutoScrollPosts,
  ServicesPricingSection,
  FAQSection,
  ContactSection
} from "./components/sections";

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
      {/* Navigation Bar */}
      <Navbar onMobileMenuToggle={handleMobileMenuToggle} />

      {/* Hero Section */}
      <section id="hero" data-section className="h-screen w-full overflow-hidden relative flex items-center">
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
        
        <div className="container mx-auto px-4 relative pt-16">
          {/* Main Content Container - For better organization */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
            {/* Left Side Content */}
            <div className="w-full md:w-1/2 lg:w-1/2">
              {/* Subtitle */}
              <div className="text-white/80 text-xs uppercase tracking-[0.25em]">
                SOLISTIC HEALING - MENTAL WELLNESS
              </div>
              
              {/* Main content */}
              <div className="max-w-[600px] mt-3">
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
            <div className="hidden md:block md:w-1/2 lg:w-1/2 relative md:pt-0">
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
                <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg overflow-hidden transition-colors duration-300">
                  <div className="p-4 sm:p-5">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium text-black dark:text-white text-sm">Core Services</h3>
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-[#F2FED7] dark:bg-primary/20 text-black dark:text-white p-3 rounded-lg text-sm hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors cursor-pointer">
                        Ketamine-Assisted Psychotherapy
                      </div>
                      <div className="bg-[#F2FED7] dark:bg-primary/20 text-black dark:text-white p-3 rounded-lg text-sm hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors cursor-pointer">
                        Individual Psychotherapy
                      </div>
                      <div className="bg-[#F2FED7] dark:bg-primary/20 text-black dark:text-white p-3 rounded-lg text-sm hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors cursor-pointer">
                        Psychedelic Integration
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-[120px] overflow-hidden relative">
                    <Image 
                      src="/practice.jpeg"
                      alt="Solistic Healing Practice"
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
        
        {/* Scroll Arrow to Transforming Lives Section */}
        <SectionScrollArrow 
          targetSectionId="transforming-lives" 
          offset={-60}
          nextSectionName="Our Approach" 
        />
      </section>

      {/* Transforming Lives Section - Separate section for better structure */}
      <section id="transforming-lives" data-section className="w-full py-8 md:py-12 bg-background relative">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-screen-xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Left Column */}
              <div className="flex flex-col h-full">
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
                  className="mt-5 flex-1 flex flex-col"
                >
                  <TherapistCard
                    name="Eric Peterson"
                    title="Therapist, Solistic Healing"
                    bio={[
                      "I received my M.A in Counseling and Psychological Services from Saint Mary's University of Minnesota with a Graduate Certificate in Addiction Studies.",
                      "My approach to healing is informed by cognitive-behavioral therapy, transpersonal psychology, person-centered therapy, & somatic and mindfulness-based therapies."
                    ]}
                    imageSrc="/eric-cutout.png"
                  />
                </motion.div>
              </div>
              
              {/* Right Column */}
              <div className="flex flex-col h-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="flex-1 flex flex-col h-full"
                >
                  <MissionSection
                    title="Our Mission & Approach"
                    points={[
                      {
                        title: "Holistic Healing",
                        description: "We believe in treating the whole person, not just symptoms. Our approach integrates mind, body, and spirit for complete wellness, addressing the interconnected nature of psychological, physical, and emotional health to create lasting transformation."
                      },
                      {
                        title: "Evidence-Based Practices",
                        description: "Our therapeutic methods are grounded in rigorous research and proven techniques, ensuring effective and reliable care. We continuously update our approaches based on the latest advancements in neuroscience, psychology, and integrative medicine to provide optimal outcomes."
                      },
                      {
                        title: "Personalized Care",
                        description: "We recognize that each individual's journey is unique. Our treatment plans are carefully tailored to your specific needs, goals, and circumstances, honoring your personal history and creating a collaborative healing partnership that respects your autonomy and lived experience."
                      }
                    ]}
                  />
                </motion.div>
              </div>
            </div>
          </div>
          
          {/* Scroll Arrow to Conditions Section */}
          <SectionScrollArrow 
            targetSectionId="conditions" 
            offset={-60}
            nextSectionName="Conditions" 
          />
        </div>
      </section>

      {/* Conditions We Treat Section */}
      <section id="conditions" data-section className="relative">
        <ConditionsSection />
      </section>
      
      {/* Media Showcase Section */}
      <section id="media" data-section className="relative">
        <MediaShowcase />
        {/* Scroll Arrow to Blog Section */}
        <SectionScrollArrow 
          targetSectionId="blog" 
          offset={-60}
          nextSectionName="Blog" 
        />
      </section>
      
      {/* Blog Showcase Section */}
      <section id="blog" data-section className="relative">
        <AutoScrollPosts />
        {/* Scroll Arrow to Services Section */}
        <SectionScrollArrow 
          targetSectionId="services-pricing" 
          offset={-60}
          nextSectionName="Services" 
        />
      </section>
      
      {/* Services & Pricing Section */}
      <section id="services-pricing" data-section className="relative">
        <ServicesPricingSection />
      </section>
      
      {/* FAQ Section */}
      <section id="faq" data-section className="relative">
        <FAQSection />
      </section>
      
      {/* Contact Section */}
      <section id="contact" data-section className="relative">
        <ContactSection />
      </section>
    </div>
  );
}
