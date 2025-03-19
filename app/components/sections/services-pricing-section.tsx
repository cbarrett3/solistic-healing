'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { SectionScrollArrow } from '../ui';

interface ServiceItem {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
  serviceType: string;
}

// Service data
const services: ServiceItem[] = [
  {
    id: 'kap',
    name: 'Ketamine-Assisted Psychotherapy',
    description: 'A transformative approach combining ketamine medicine with psychotherapy to help treat depression, anxiety, PTSD, and other conditions resistant to traditional treatments.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    id: 'psychotherapy',
    name: 'Individual Psychotherapy',
    description: 'Using cognitive-behavioral therapy, mindfulness, and somatic approaches to increase awareness of thinking patterns and develop skills for a more relaxed, creative, and flexible mind.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )
  },
  {
    id: 'integration',
    name: 'Psychedelic Integration',
    description: 'Support for processing insights from psychedelic experiences, creating individualized integration plans to help you gain long-term benefits and personal transformation.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
      </svg>
    )
  },
];

// Pricing plans data
const pricingPlans: PricingPlan[] = [
  {
    id: 'kap-intro',
    name: 'KAP Introduction',
    price: '$250',
    description: 'Initial ketamine-assisted psychotherapy session',
    serviceType: 'Ketamine-Assisted Psychotherapy',
    features: [
      '90-minute initial consultation',
      'Medical screening',
      'Treatment planning',
      'Introduction to ketamine therapy',
      'Preparation guidance'
    ]
  },
  {
    id: 'kap-session',
    name: 'KAP Session',
    price: '$400',
    description: 'Full ketamine-assisted psychotherapy session',
    serviceType: 'Ketamine-Assisted Psychotherapy',
    features: [
      '3-hour guided session',
      'Ketamine administration',
      'Therapeutic support',
      'Integration planning',
      'Follow-up resources'
    ],
    popular: true
  },
  {
    id: 'psychotherapy-session',
    name: 'Therapy Session',
    price: '$150',
    description: 'Individual psychotherapy session',
    serviceType: 'Individual Psychotherapy',
    features: [
      '50-minute session',
      'Personalized approach',
      'Cognitive-behavioral techniques',
      'Mindfulness practices',
      'Progress tracking'
    ]
  },
  {
    id: 'integration-session',
    name: 'Integration Session',
    price: '$175',
    description: 'Psychedelic integration support',
    serviceType: 'Psychedelic Integration',
    features: [
      '60-minute session',
      'Experience processing',
      'Meaning-making support',
      'Integration planning',
      'Practical application guidance'
    ]
  }
];

export default function ServicesPricingSection() {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>('kap-session');
  const [activeServiceTab, setActiveServiceTab] = useState<string>('all');

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
  };

  // Filter plans based on active service tab
  const filteredPlans = activeServiceTab === 'all' 
    ? pricingPlans 
    : pricingPlans.filter(plan => {
        const service = services.find(s => s.id === activeServiceTab);
        return service && plan.serviceType === service.name;
      });

  return (
    <section id="services-pricing" data-section className="w-full py-16 md:py-24 bg-background relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-foreground">
            Core <span className="text-primary">Services</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Comprehensive mental wellness services tailored to your unique needs and goals
          </p>
        </div>

        {/* Services Overview with Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {/* Left side - Image */}
          <motion.div
            className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 rounded-xl"></div>
            <Image 
              src="/practice.jpeg" 
              alt="Solistic Healing Practice" 
              fill 
              className="object-cover rounded-xl"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute bottom-0 left-0 p-6 md:p-8 z-20">
              <h3 className="text-2xl md:text-3xl font-light text-white mb-2">Healing Environment</h3>
              <p className="text-white/80 max-w-md">
                Our practice provides a safe, comfortable space for your therapeutic journey
              </p>
            </div>
          </motion.div>

          {/* Right side - Services */}
          <div className="grid grid-cols-1 gap-6">
            {services.map((service, index) => (
              <motion.div 
                key={service.id}
                className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:border-primary/30 transition-all duration-300 group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setActiveServiceTab(service.id)}
              >
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4 group-hover:bg-primary/20 transition-colors duration-300 shrink-0">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      {service.name}
                    </h3>
                    <p className="text-foreground/70 text-sm">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Service Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            className={`px-4 py-2 rounded-full text-sm transition-all cursor-pointer ${
              activeServiceTab === 'all'
                ? 'bg-primary text-black'
                : 'bg-white/5 text-foreground hover:bg-white/10'
            }`}
            onClick={() => setActiveServiceTab('all')}
          >
            All Services
          </button>
          {services.map((service) => (
            <button
              key={service.id}
              className={`px-4 py-2 rounded-full text-sm transition-all cursor-pointer ${
                activeServiceTab === service.id
                  ? 'bg-primary text-black'
                  : 'bg-white/5 text-foreground hover:bg-white/10'
              }`}
              onClick={() => setActiveServiceTab(service.id)}
            >
              {service.name}
            </button>
          ))}
        </div>

        {/* Pricing Plans */}
        <div className="text-center mb-10">
          <h3 className="text-2xl md:text-3xl font-light text-foreground">
            Service <span className="text-primary">Options</span>
          </h3>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Choose the service option that aligns with your healing journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {filteredPlans.map((plan) => (
            <div 
              key={plan.id} 
              className="group h-full relative"
              onMouseEnter={() => setHoveredPlan(plan.id)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {/* Hover effect container */}
              <div className="absolute inset-0 transition-transform duration-300 group-hover:-translate-y-4 pointer-events-none"></div>
              
              <motion.div
                className={`relative rounded-xl overflow-hidden h-full flex flex-col transition-all duration-300 pricing-card ${
                  selectedPlan === plan.id
                    ? 'ring-2 ring-primary shadow-lg shadow-primary/20'
                    : 'bg-card shadow-md hover:shadow-lg hover:-translate-y-1'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: filteredPlans.findIndex(p => p.id === plan.id) * 0.1 }}
                style={{
                  transform: 'translate3d(0, 0, 0)',
                  transformStyle: 'preserve-3d'
                }}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-primary text-black text-xs font-medium px-3 py-1 z-10">
                    Popular
                  </div>
                )}
                
                <div className="p-6 flex-grow">
                  <div className="text-sm text-muted-foreground mb-2">{plan.serviceType}</div>
                  <h3 className="text-xl font-medium text-foreground mb-1">{plan.name}</h3>
                  <div className="flex items-baseline mb-4">
                    <span className="text-3xl font-semibold text-foreground">{plan.price}</span>
                    <span className="text-sm text-muted-foreground ml-1">/ session</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
                  
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-5 w-5 text-primary shrink-0 mr-2" 
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                        >
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="p-6 pt-0">
                  <button
                    onClick={() => handleSelectPlan(plan.id)}
                    className={`w-full py-2 rounded-lg transition-all duration-300 cursor-pointer ${
                      selectedPlan === plan.id
                        ? 'bg-primary text-black'
                        : 'bg-primary/10 text-primary hover:bg-primary/20'
                    }`}
                  >
                    Select Plan
                  </button>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <p className="text-muted-foreground mb-4">
            Need more information about our services? Contact us for a free consultation.
          </p>
          <Link href="/contact" className="inline-block text-primary border border-primary px-6 py-2 rounded-full text-sm hover:bg-primary hover:text-black transition-all duration-300 cursor-pointer">
            Schedule Consultation
          </Link>
        </div>
      </div>
      
      {/* Scroll Arrow to FAQ Section */}
      <div className="mt-4">
        <SectionScrollArrow 
          targetSectionId="faq" 
          offset={-60}
          nextSectionName="FAQ" 
          className="z-50"
        />
      </div>
    </section>
  );
}
