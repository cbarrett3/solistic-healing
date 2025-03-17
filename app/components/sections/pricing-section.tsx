'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: '$99',
    description: 'Perfect for those just starting their healing journey',
    features: [
      '1 healing session per month',
      'Email support',
      'Access to guided meditations',
      'Monthly wellness newsletter'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$199',
    description: 'Our most popular plan for dedicated healing',
    features: [
      '2 healing sessions per month',
      'Priority email & phone support',
      'Access to all guided meditations',
      'Personalized wellness plan',
      'Bi-weekly check-ins'
    ],
    popular: true
  },
  {
    id: 'ultimate',
    name: 'Ultimate',
    price: '$299',
    description: 'The complete healing experience for transformation',
    features: [
      '4 healing sessions per month',
      '24/7 priority support',
      'Access to all resources',
      'Personalized wellness plan',
      'Weekly check-ins',
      'Monthly wellness workshops'
    ]
  }
];

export default function PricingSection() {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
  };

  return (
    <section id="pricing" className="py-16 md:py-24 bg-background" data-section>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-foreground">
            Healing <span className="text-primary">Plans</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect healing plan that aligns with your journey and wellness goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingPlans.map((plan) => (
            <div 
              key={plan.id} 
              className="group h-full relative"
              onMouseEnter={() => setHoveredPlan(plan.id)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {/* Hover effect container - maintains size */}
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
                transition={{ duration: 0.5, delay: pricingPlans.findIndex(p => p.id === plan.id) * 0.1 }}
                style={{
                  transform: 'translate3d(0, 0, 0)',
                  transformStyle: 'preserve-3d'
                }}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-bl-lg z-10">
                    BEST VALUE
                  </div>
                )}
                <div className="p-6 md:p-8 flex flex-col h-full">
                  <div className="mb-auto">
                    <h3 className="text-xl font-medium text-foreground mb-2">{plan.name}</h3>
                    <div className="flex items-baseline mb-4">
                      <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                      <span className="text-muted-foreground ml-2 text-sm">/month</span>
                    </div>
                    <p className="text-muted-foreground mb-6">{plan.description}</p>
                    
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <motion.div
                            className="text-primary flex-shrink-0 mr-2"
                            animate={{ 
                              scale: hoveredPlan === plan.id ? [1, 1.2, 1] : 1,
                            }}
                            transition={{ 
                              duration: 1.5, 
                              repeat: hoveredPlan === plan.id ? Infinity : 0, 
                              repeatType: "reverse" 
                            }}
                          >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </motion.div>
                          <span className="text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <motion.button
                    onClick={() => handleSelectPlan(plan.id)}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-300 ${
                      selectedPlan === plan.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-primary/10 text-primary hover:bg-primary/20'
                    }`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Choose Plan
                  </motion.button>
                </div>
                
                {/* Shadow and border effect on hover */}
                <motion.div 
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  initial={{ boxShadow: "0 0 0 0 rgba(0,0,0,0), 0 0 0 0 rgba(0,0,0,0)" }}
                  animate={{ 
                    boxShadow: hoveredPlan === plan.id 
                      ? "0 16px 30px rgba(0, 0, 0, 0.15), 0 0 0 2px var(--primary)" 
                      : "0 0 0 0 rgba(0,0,0,0), 0 0 0 0 rgba(0,0,0,0)" 
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
