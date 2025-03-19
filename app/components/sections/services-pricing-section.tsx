'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

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
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 11l-2.25 2.25l6.5-6.5m-4.5 4.5l6.5 6.5" />
      </svg>
    )
  },
  {
    id: 'psychotherapy',
    name: 'Individual Psychotherapy',
    description: 'Using cognitive-behavioral therapy to increase awareness of thinking and behavioral patterns, developing skills for a more relaxed, creative, and flexible mind.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  },
  {
    id: 'integration',
    name: 'Psychedelic Integration',
    description: 'Support for processing insights from psychedelic experiences, creating individualized integration plans to help you gain long-term benefits and personal transformation.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 11l-2.25 2.25l6.5-6.5m-4.5 4.5l6.5 6.5" />
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
    <section id="services-pricing" className="py-16 md:py-24 bg-background" data-section>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-foreground">
            Our <span className="text-primary">Services</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Comprehensive mental wellness services tailored to your unique needs and goals
          </p>
        </div>

        {/* Services Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {services.map((service) => (
            <motion.div 
              key={service.id}
              className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:border-primary/30 transition-all duration-300 group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              onClick={() => setActiveServiceTab(service.id)}
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-medium text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                {service.name}
              </h3>
              <p className="text-foreground/70 text-sm">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Service Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            className={`px-4 py-2 rounded-full text-sm transition-all ${
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
              className={`px-4 py-2 rounded-full text-sm transition-all ${
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
                    : 'bg-card shadow-md'
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
                    className={`w-full py-2 rounded-lg transition-all duration-300 ${
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
    </section>
  );
}
